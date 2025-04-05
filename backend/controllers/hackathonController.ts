import { Request, Response } from "express";
import { scrapeDevfolioPage } from "../services/scraperService";
import { extractHackathonData } from "../services/geminiService";
import { storeHackathonData } from "../services/hackathonService";

export async function handleScrapeAndStore(req: Request, res: Response) {
  const { url } = req.body;

  try {
    const html = await scrapeDevfolioPage(url);
    const data = await extractHackathonData(html);

    if (!data) return res.status(400).json({ error: "Failed to extract data" });

    const stored = await storeHackathonData(data);
    res.json({ message: "Hackathon saved", stored });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Error" });
  }
}
