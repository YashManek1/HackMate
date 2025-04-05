import { Request, Response } from 'express';
import * as teamService from '../services/teamService';

export const createTeam = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, leaderId, lookingForMembers } = req.body;
    const team = await teamService.createTeam({ name, description, leaderId, lookingForMembers });
    res.status(201).json({ success: true, data: team });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTeam = async (req: Request, res: Response): Promise<void> => {
  try {
    const { teamId } = req.params;
    const updates = req.body;
    const updatedTeam = await teamService.updateTeam(teamId, updates);
    res.status(200).json({ success: true, data: updatedTeam });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTeam = async (req: Request, res: Response): Promise<void> => {
  try {
    const { teamId } = req.params;
    const team = await teamService.getTeam(teamId);
    res.status(200).json({ success: true, data: team });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTeam = async (req: Request, res: Response): Promise<void> => {
  try {
    const { teamId } = req.params;
    await teamService.deleteTeam(teamId);
    res.status(200).json({ success: true, message: 'Team deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const joinTeam = async (req: Request, res: Response): Promise<void> => {
  try {
    const { teamCode, userId } = req.body;
    const team = await teamService.joinTeam(teamCode, userId);
    res.status(200).json({ success: true, data: team });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};