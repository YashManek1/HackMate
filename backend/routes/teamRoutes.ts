import { Router } from "express";
import { teamController } from "../controllers/teamController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// Create a new team
router.post("/", authMiddleware, teamController.createTeam);

// Update a team
router.put("/:id", authMiddleware, teamController.updateTeam);

// Get a team by ID
router.get("/:id", authMiddleware, teamController.getTeam);

// Delete a team
router.delete("/:id", authMiddleware, teamController.deleteTeam);

// Join a team
router.post("/join", authMiddleware, teamController.joinTeam);

export default router;
