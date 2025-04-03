// src/controllers/userController.ts
import { Request, Response, NextFunction } from "express";
import { userService } from "../services/userService";

class UserController {
  async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id; // From authMiddleware
      const user = await userService.getUserById(userId);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async updateMe(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const updates = req.body; // e.g., { bio, skills, avatarUrl }
      const updatedUser = await userService.updateUser(userId, updates);
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
