import puppeteer from "puppeteer";

export async function scrapeDevfolioPage(url: string): Promise<string> {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0" });

  const html = await page.content();
  await browser.close();
  return html;
}
