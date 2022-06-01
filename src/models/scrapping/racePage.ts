import { Page } from "puppeteer";

export const racePage = (page: Page) => ({
  async getDate() {
    const { year, month, day } = await page.evaluate(() => {
      const details = document.querySelector("h1+span");

      const date = details?.textContent?.split(" - ")[0]?.split("/")!;

      return { year: date[2], month: date[1], day: date[0] };
    });
    const date = new Date(
      parseInt(year, 10),
      parseInt(month, 10) - 1, // months are 0 indexed
      parseInt(day, 10)
    );

    return date;
  },
  async getMeetingNumber() {
    const meetingNumber = await page.evaluate(() => {
      const h1 = document.querySelector("h1");
      const number = h1?.childNodes[1].textContent
        ?.split(" - ")[0]
        .replace("R", "");

      return number;
    });

    return meetingNumber;
  },

  async getMeetingName() {
    const meetingName = await page.evaluate(() => {
      const details = document.querySelector("h1+span");

      const name = details?.textContent?.split(" • ")[2];

      return name;
    });

    return meetingName;
  },
  async getRaceNumber() {
    const raceNumber = await page.evaluate(() => {
      const h1 = document.querySelector("h1");
      const number = h1?.childNodes[1].textContent
        ?.split(" - ")[1]
        .replace("C", "");

      return number;
    });

    return raceNumber;
  },

  async getRaceName() {
    const raceName = await page.evaluate(() => {
      const h1 = document.querySelector("h1");

      const name = h1?.childNodes[0].textContent
        ?.replace(/résultat quinté /i, "")
        .trim();

      return name;
    });

    return raceName;
  },

  async getResult() {
    const nbrResults = await page.evaluate(() => {
      return document.querySelectorAll("section > div.h3 > div:first-child")
        .length;
    });
    const results: { name: string; position: number; isOut: boolean }[] = [];

    for (let i = 0; i < nbrResults; i++) {
      const lineSelector = `section > div.h3:nth-child(${
        i + 1
      }) > div:first-child`;

      const position = await page.evaluate((sel: string) => {
        const strPosition = document.querySelector(`${sel} span:nth-child(1)`)
          ?.textContent!;
        return parseInt(strPosition, 10);
      }, lineSelector);
      const isOut = isNaN(position);
      const name = await page.evaluate((sel: string) => {
        return document.querySelector(`${sel} span:nth-child(3)`)?.textContent!;
      }, lineSelector);

      results.push({
        name,
        position: isOut ? 0 : position,
        isOut,
      });
    }

    return results;
  },
});
