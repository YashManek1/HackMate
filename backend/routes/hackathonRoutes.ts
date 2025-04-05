import { Router } from "express";
import { hackathonController } from "../controllers/hackathonController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/scrape", hackathonController.handleScrapeAndStore);
router.get("/:id", hackathonController.getHackathonDetails);
router.get(
  "/userHackathon",
  authMiddleware,
  hackathonController.getUserHackathons
);
// Route to get ongoing hackathons
router.get(
  "/ongoing",
  authMiddleware,
  hackathonController.getOngoingHackathons
);

// Route to get past hackathons
router.get("/past", authMiddleware, hackathonController.getPastHackathons);

// Route to get upcoming hackathons
router.get(
  "/upcoming",
  authMiddleware,
  hackathonController.getUpcomingHackathons
);

export default router;
