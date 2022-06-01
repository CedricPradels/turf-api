import puppeteer from "puppeteer";
import { racePage } from "./models/scrapping/racePage";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url =
    "https://www.turfoo.fr/programmes-courses/190728/reunion1-deauville/course1-prix-du-clos-fleuri/";

  console.log("start scrapping from ", url);

  await page.goto(url, { waitUntil: "networkidle0" });

  // GET HORSES URLS
  const horsesUrl = await page.evaluate(() => {
    const horsesDetailsUrl = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(
        ".table-horses > tbody > tr > td:first-child > a"
      ),
      (e) => e.href
    );

    return horsesDetailsUrl;
  });

  console.log("get horses urls", horsesUrl);

  // GET HORSE NAME
  const horsesNames = [];

  for (const horseUrl of horsesUrl) {
    console.log("go to horse details page", horseUrl);

    await page.goto(horseUrl, { waitUntil: "networkidle0" });
    const name = await page.evaluate(() => {
      const horseName = Array.from(
        document.querySelectorAll<HTMLHeadingElement>("h1"),
        (e) => e.innerText
      )[0];

      return horseName;
    });

    console.log("scrap data for horse ", name);

    let oldRacesData: {
      dateString: string;
      reunionName: string;
      courseName: string;
    }[] = [];
    let isLastPage = false;
    let pageNumber = 1;
    while (!isLastPage) {
      console.log("scrap data for horse ", name);

      const horsePaginateUrl = `${horseUrl}${pageNumber}`;
      console.log(horsePaginateUrl);
      await page.goto(horsePaginateUrl, {
        waitUntil: "networkidle0",
      });

      const lines = await page.evaluate(() => {
        const lines = Array.from(
          document.querySelectorAll(".informationscourse"),
          (e) => [e.childNodes[0].textContent!, e.childNodes[2].textContent!]
        );

        return lines;
      });

      const tmpOldRacesData = lines.map(([first, second]) => {
        const [date, reunionName] = first.split("-");
        const [day, month, year] = date.split(" ");
        const parser: { [k in string]: string } = {
          JANVIER: "01",
          FEVRIER: "02",
          MARS: "03",
          AVRIL: "04",
          MAI: "05",
          JUIN: "06",
          JUILLET: "07",
          AOUT: "08",
          SEPTEMBRE: "09",
          OCTOBRE: "10",
          NOVEMBRE: "11",
          DECEMBRE: "12",
        };
        const courseName = second.split("-")[0];

        return {
          dateString: `${year.slice(-2)}${parser[month]}${day}`,
          reunionName,
          courseName,
        };
      });

      oldRacesData = oldRacesData.concat(tmpOldRacesData);

      isLastPage = await page.evaluate(() => {
        return Array.from(
          document.querySelectorAll("a"),
          (e) => e.innerText
        ).every((x) => x !== "Page suivante");
      });
      pageNumber++;
    }
    // Get real races data

    const history = [];
    for (const oldRaceData of oldRacesData) {
      // Search real race page
      const realOldRacesUrl = `https://www.turfoo.fr/programmes-courses/${oldRaceData.dateString}/`;
      await page.goto(realOldRacesUrl, { waitUntil: "networkidle0" });
      // record data
      const programHrefs = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("a"), (e) => e.href);
      });

      const raceUrl = programHrefs.find((href) =>
        href.match(
          new RegExp(
            oldRaceData.courseName.replace(/\(.+/, "").replace(/[ ']/g, "-"),
            "i"
          )
        )
      );

      if (typeof raceUrl !== "undefined") {
        await page.goto(raceUrl, { waitUntil: "networkidle0" });
        console.group("HISTORY");
        console.log("scrap history");
        console.log(raceUrl);
        // GET RACE NAME
        const raceName = await racePage(page).getRaceName();

        // GET RACE NUMBER
        const raceNumber = await racePage(page).getRaceNumber();

        // GET MEETING NAME
        const meetingName = await racePage(page).getMeetingName();

        // GET MEETING NUMBER
        const meetingNumber = await racePage(page).getMeetingNumber();

        // GET DATE
        const date = await racePage(page).getDate();

        // GET RESULTS
        const results = await racePage(page).getResult();

        // ADD HISTORY
        history.push({
          date,
          meeting: { name: meetingName, number: meetingNumber },
          race: {
            name: raceName,
            number: raceNumber,
          },
          results,
        });

        console.groupEnd();
      }

      console.log("history", history);
    }

    horsesNames.push({ name });
  }

  // GET ALL PREVIEWS RACES

  await browser.close();
})();
