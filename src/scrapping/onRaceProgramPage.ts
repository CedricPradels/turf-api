import { Page } from "puppeteer";

export const onRaceProgramPage = (page: Page) => ({
  async getDate() {
    const { year, month, day } = await page.evaluate(() => {
      const details = document.querySelector(".header__nav-middle > *+span");

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
      const h1 = document.querySelector(".header__nav-middle > *");
      const number = h1?.childNodes[1].textContent
        ?.split(" - ")[0]
        .replace("R", "");

      return number;
    });

    return meetingNumber!;
  },

  async getMeetingName() {
    const meetingName = await page.evaluate(() => {
      const details = document.querySelector(".header__nav-middle > *+span");

      const name = details?.textContent?.split(" • ")[2];

      return name;
    });

    return meetingName!;
  },
  async getRaceNumber() {
    const raceNumber = await page.evaluate(() => {
      const h1 = document.querySelector(".header__nav-middle > *");
      const number = h1?.childNodes[1].textContent
        ?.split(" - ")[1]
        .replace("C", "");

      return number;
    });

    return raceNumber!;
  },

  async getRaceName() {
    const raceName = await page.evaluate(() => {
      const h1 = document.querySelector(".header__nav-middle > *");

      const name = h1?.childNodes[0].textContent
        ?.replace(/pronostic /i, "")
        .trim();

      return name!;
    });

    return raceName;
  },
});
