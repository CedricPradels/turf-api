import puppeteer from "puppeteer";
import { DBRace, RaceModel } from "./models/course";
import { programPage } from "./scrapping/programPage";
import { onRacePage } from "./scrapping/racePage";

(async () => {
  const browser = await puppeteer.launch();
  const racePage = await browser.newPage();
  const horsePage = await browser.newPage();
  const previewRacePage = await browser.newPage();

  const url =
    "https://www.turfoo.fr/programmes-courses/190728/reunion1-deauville/course1-prix-du-clos-fleuri/";

  console.log("start scrapping race: ", url);

  await racePage.goto(url, { waitUntil: "networkidle0" });

  const raceName = await onRacePage(racePage).getRaceName();
  const meetingName = await onRacePage(racePage).getMeetingName();
  const raceNumber = await onRacePage(racePage).getRaceNumber();
  const meetingNumber = await onRacePage(racePage).getMeetingNumber();
  const date = await onRacePage(racePage).getDate();

  const horsesHandler = await racePage.$$<HTMLAnchorElement>(
    ".table-horses > tbody > tr > td:first-child > a"
  );

  const dbRace: DBRace = {
    date,
    race: {
      name: raceName,
      number: raceNumber,
    },
    meeting: {
      name: meetingName,
      number: meetingNumber,
    },
    partants: [],
  };

  for (let horseHandler of horsesHandler) {
    const horseUrl = await racePage.evaluate(
      (e: HTMLAnchorElement) => e.href,
      horseHandler
    );
    console.log("go to horse details page", horseUrl);

    await horsePage.goto(horseUrl, { waitUntil: "networkidle0" });

    const horseNumber = await racePage.evaluate((anchor: HTMLAnchorElement) => {
      return anchor.innerText.split(" - ")[0];
    }, horseHandler);

    const name = await horsePage.$eval(
      "h1",
      (e) => (e as HTMLHeadingElement).innerText
    );
    console.log("get horse name: ", name);

    const partant: DBRace["partants"][number] = {
      history: [],
      name,
      number: horseNumber,
    };

    const noHistory = (await horsePage.$("#record > center")) === null;

    if (noHistory) continue;

    const horseHistoryTotalPages = parseInt(
      (
        await horsePage.$eval(
          "#record > center",
          (e) => e.childNodes[0].textContent
        )
      )?.match(/Page n°\d+\/(\d+)/)?.[1] ?? "1",
      10
    );

    for (
      let horseHistoryPage = 1;
      horseHistoryPage <= horseHistoryTotalPages;
      horseHistoryPage++
    ) {
      const horsePaginateUrl = `${horseUrl}${horseHistoryPage}`;
      console.log("process history page:", horsePaginateUrl);
      await horsePage.goto(horsePaginateUrl, {
        waitUntil: "networkidle0",
      });

      const previewRacesHandler = await horsePage.$$(`tr .informationscourse`);

      for (let previewRaceHandler of previewRacesHandler) {
        const _raceName = await horsePage.evaluate(
          (e: HTMLDataElement) => e.childNodes[2].textContent?.split("-")[0]!,
          previewRaceHandler
        );

        const dateString = await (async () => {
          const [day, month, year] = await horsePage.evaluate(
            (e: HTMLDataElement) =>
              e.childNodes[0].textContent?.split("-")[0]?.split(" ")!,
            previewRaceHandler
          );
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

          return `${year.slice(-2)}${parser[month]}${day}`;
        })();

        const historyProgramUrl = `https://www.turfoo.fr/programmes-courses/${dateString}/`;
        await previewRacePage.goto(historyProgramUrl, {
          waitUntil: "networkidle0",
        });

        const raceUrl = await programPage(previewRacePage).findRaceUrl(
          _raceName
        );

        if (raceUrl !== null) {
          console.log("found preview race url: ", raceUrl);
          await previewRacePage.goto(raceUrl, { waitUntil: "networkidle0" });

          const raceName = await onRacePage(previewRacePage).getRaceName();
          const raceNumber = await onRacePage(previewRacePage).getRaceNumber();
          const meetingName = await onRacePage(
            previewRacePage
          ).getMeetingName();
          const meetingNumber = await onRacePage(
            previewRacePage
          ).getMeetingNumber();
          const date = await onRacePage(previewRacePage).getDate();
          const results = await onRacePage(previewRacePage).getResult();

          partant.history.push({
            date,
            meeting: { name: meetingName, number: meetingNumber },
            race: {
              name: raceName,
              number: raceNumber,
            },
            results,
          });
        }
      }
    }
    dbRace.partants.push(partant);
  }

  await RaceModel.create(dbRace);
  await browser.close();
})();
