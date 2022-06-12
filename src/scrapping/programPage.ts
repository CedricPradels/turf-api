import { Page } from "puppeteer";

export const programPage = (page: Page) => ({
  async findRaceUrl(query: string) {
    const programHrefs = await page.evaluate(() => {
      return Array.from(document.querySelectorAll("a"), (e) => e.href);
    });

    const raceUrl = programHrefs.find((href) =>
      href.match(
        new RegExp(query.replace(/\(.+/, "").replace(/[ ']/g, "-"), "i")
      )
    );

    return raceUrl ?? null;
  },
});
