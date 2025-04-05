import { Router } from "express";
import { handleScrapeAndStore } from "../controllers/hackathonController";

const router = Router();
router.post("/scrape", handleScrapeAndStore);
export default router;
