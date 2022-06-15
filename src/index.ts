import puppeteer, { Browser, ElementHandle, Page } from "puppeteer";
import { DBRace, DBRaceSchema, RaceModel } from "./models/course";
import { onProgramPage } from "./scrapping/onProgramPage";
import { onRaceResultPage } from "./scrapping/onRaceResultPage";
import { onRaceProgramPage } from "./scrapping/onRaceProgramPage";
import { connectDB } from "./utils/connectDB";

(async () => {
  await connectDB();
  const browser = await puppeteer.launch({ timeout: 60000 });

  const url =
    "https://www.turfoo.fr/programmes-courses/190728/reunion1-deauville/course1-prix-du-clos-fleuri/";

  const dbRace = await getRaceData(url, browser);
  await DBRaceSchema.validate(dbRace);
  await RaceModel.create(dbRace);
  console.log("new DB entry");
  await browser.close();
})();

async function getRaceData(url: string, browser: Browser): Promise<DBRace> {
  const racePage = await browser.newPage();

  console.log("start scrapping race: ", url);

  await racePage.goto(url, { waitUntil: "networkidle0", timeout: 60000 });

  const raceName = await onRaceProgramPage(racePage).getRaceName();
  const meetingName = await onRaceProgramPage(racePage).getMeetingName();
  const raceNumber = await onRaceProgramPage(racePage).getRaceNumber();
  const meetingNumber = await onRaceProgramPage(racePage).getMeetingNumber();
  const date = await onRaceProgramPage(racePage).getDate();

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

  const partants = await Promise.all(
    horsesHandler.map((horseHandler) =>
      getHorseData(horseHandler, racePage, browser)
    )
  );
  dbRace.partants = partants;

  await racePage.close();

  return dbRace;
}

async function getHorseData<T extends HTMLElement>(
  horseHandler: ElementHandle<T>,
  racePage: Page,
  browser: Browser
): Promise<DBRace["partants"][number]> {
  const horsePage = await browser.newPage();

  const horseUrl = await racePage.evaluate(
    (e: HTMLAnchorElement) => e.href,
    horseHandler
  );
  console.log("go to horse details page", horseUrl);

  await horsePage.goto(horseUrl, { waitUntil: "networkidle0", timeout: 60000 });

  const horseNumber = await racePage.evaluate((anchor: HTMLAnchorElement) => {
    return anchor.innerText.split(" - ")[0];
  }, horseHandler);

  const horseName = await horsePage.$eval(
    "h1",
    (e) => (e as HTMLHeadingElement).innerText
  );
  console.log("get horse name: ", horseName);

  const history = await getHistory(horseUrl, horsePage, browser);

  const partant: DBRace["partants"][number] = {
    history,
    name: horseName,
    number: horseNumber,
  };

  await horsePage.close();

  return partant;
}

async function getHistory(
  horseUrl: string,
  horsePage: Page,
  browser: Browser
): Promise<DBRace["partants"][number]["history"]> {
  let history: DBRace["partants"][number]["history"] = [];

  const hasHistory = (await horsePage.$("#record > center")) !== null;

  if (hasHistory) {
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
        timeout: 60000,
      });

      const previewRacesHandler = await horsePage.$$(`tr .informationscourse`);

      history = history.concat(
        (
          await Promise.all(
            previewRacesHandler.map((previewRaceHandler) =>
              getPreviewRaceData(browser, horsePage, previewRaceHandler)
            )
          )
        ).filter(<T>(x: T | null): x is T => x !== null)
      );

      // for (let previewRaceHandler of previewRacesHandler) {
      //   const previewRaceData = await getPreviewRaceData(
      //     browser,
      //     horsePage,
      //     previewRaceHandler
      //   );
      //   previewRaceData !== null && history.push(previewRaceData);
      // }
    }
  }

  return history;
}

async function getPreviewRaceData(
  browser: Browser,
  horsePage: Page,
  previewRaceHandler: ElementHandle
) {
  const previewRacePage = await browser.newPage();

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
    timeout: 60000,
  });

  const raceUrl = await onProgramPage(previewRacePage).findRaceUrl(_raceName);

  if (raceUrl !== null) {
    console.log("preview race url: ", raceUrl);
    await previewRacePage.goto(raceUrl, {
      waitUntil: "networkidle0",
      timeout: 60000,
    });

    const raceName = await onRaceResultPage(previewRacePage).getRaceName();
    const raceNumber = await onRaceResultPage(previewRacePage).getRaceNumber();
    const meetingName = await onRaceResultPage(
      previewRacePage
    ).getMeetingName();
    const meetingNumber = await onRaceResultPage(
      previewRacePage
    ).getMeetingNumber();
    const date = await onRaceResultPage(previewRacePage).getDate();
    const results = await onRaceResultPage(previewRacePage).getResult();

    const previewRaceData = {
      date,
      meeting: { name: meetingName, number: meetingNumber },
      race: {
        name: raceName,
        number: raceNumber,
      },
      results,
    };

    return previewRaceData;
  }
  await previewRacePage.close();

  return null;
}
