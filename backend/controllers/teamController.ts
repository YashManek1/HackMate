import { Request, Response } from "express";
import {
  createTeam,
  updateTeam,
  getTeam,
  deleteTeam,
  joinTeam,
} from "../services/teamService";

export const teamController = {
  // Create a new team
  async createTeam(req: Request, res: Response) {
    const { name, description, lookingForMembers } = req.body;
    const userId = req.user.id; // Get userId from authMiddleware

    try {
      const team = await createTeam({
        name,
        description,
        leaderId: userId, // Use userId as the leaderId
        lookingForMembers,
      });
      res.status(201).json(team);
    } catch (error: any) {
      console.error("❌ Error creating team:", error.message);
      res.status(500).json({ error: "Failed to create team." });
    }
  },

  // Update a team
  async updateTeam(req: Request, res: Response) {
    const { id: teamId } = req.params; // Get teamId from route params
    const updates = req.body;

    try {
      const updatedTeam = await updateTeam(teamId, updates);
      res.json(updatedTeam);
    } catch (error: any) {
      console.error("❌ Error updating team:", error.message);
      res.status(500).json({ error: "Failed to update team." });
    }
  },

  // Get a team by ID
  async getTeam(req: Request, res: Response) {
    const { id: teamId } = req.params; // Get teamId from route params

    try {
      const team = await getTeam(teamId);
      res.json(team);
    } catch (error: any) {
      console.error("❌ Error fetching team:", error.message);
      res.status(404).json({ error: "Team not found." });
    }
  },

  // Delete a team
  async deleteTeam(req: Request, res: Response) {
    const { id: teamId } = req.params; // Get teamId from route params

    try {
      await deleteTeam(teamId);
      res.status(204).send();
    } catch (error: any) {
      console.error("❌ Error deleting team:", error.message);
      res.status(500).json({ error: "Failed to delete team." });
    }
  },

  // Join a team
  async joinTeam(req: Request, res: Response) {
    const { teamCode } = req.body;
    const userId = req.user.id; // Get userId from authMiddleware

    try {
      const team = await joinTeam(teamCode, userId);
      res.json(team);
    } catch (error: any) {
      console.error("❌ Error joining team:", error.message);
      res.status(400).json({ error: error.message || "Failed to join team." });
    }
  },
};
