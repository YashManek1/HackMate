import puppeteer from "puppeteer";

export async function scrapeDevfolioHTML(baseUrl: string): Promise<string> {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(baseUrl, { waitUntil: "networkidle0" });
  const html = await page.content();
  await browser.close();
  return html;
}
