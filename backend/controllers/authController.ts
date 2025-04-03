// src/controllers/authController.ts
import { Request, Response, NextFunction } from "express";
import { authService } from "../services/authService";
import passport from "passport";
import { User } from "@prisma/client"; // Import User type from Prisma

class AuthController {
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        email,
        password,
        name,
        githubId,
        linkedinId,
        portfolioUrl,
        bio,
        avatarUrl,
        skills,
        experience,
        interests,
        timeZone,
      } = req.body;
      const user = await authService.signup(
        email,
        password,
        name,
        githubId,
        linkedinId,
        portfolioUrl,
        bio,
        avatarUrl,
        skills,
        experience,
        interests,
        timeZone
      );
      res.status(201).json({ message: "User created", user });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const { accessToken, refreshToken } = await authService.login(
        email,
        password
      );
      res.json({ accessToken, refreshToken });
    } catch (error) {
      next(error);
    }
  }

  googleAuth(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("google", { scope: ["profile", "email"] })(
      req,
      res,
      next
    );
  }

  googleCallback(req: Request, res: Response, next: NextFunction) {
    passport.authenticate(
      "google",
      { session: false },
      async (err: Error | null, user: User | false | null) => {
        if (err || !user) return next(err || new Error("Google auth failed"));
        const { accessToken, refreshToken } = await authService.generateTokens(
          user
        );
        res.redirect(
          `/auth/success?accessToken=${accessToken}&refreshToken=${refreshToken}`
        );
      }
    )(req, res, next);
  }

  githubAuth(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("github", { scope: ["user:email"] })(req, res, next);
  }

  githubCallback(req: Request, res: Response, next: NextFunction) {
    passport.authenticate(
      "github",
      { session: false },
      async (err: Error | null, user: User | false | null) => {
        if (err || !user) return next(err || new Error("GitHub auth failed"));
        const { accessToken, refreshToken } = await authService.generateTokens(
          user
        );
        res.redirect(
          `/auth/success?accessToken=${accessToken}&refreshToken=${refreshToken}`
        );
      }
    )(req, res, next);
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id; // From authMiddleware
      await authService.logout(userId);
      res.json({ message: "Logged out successfully" });
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      const tokens = await authService.refreshToken(refreshToken);
      res.json(tokens);
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
