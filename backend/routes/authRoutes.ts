// src/routes/authRoutes.ts
import { Router } from "express";
import { authController } from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// Normal Signup & Login
router.post("/signup", authController.signup);
router.post("/login", authController.login);

// Google Authentication
router.get("/google", authController.googleAuth);
router.get("/google/callback", authController.googleCallback);

// GitHub Authentication
router.get("/github", authController.githubAuth);
router.get("/github/callback", authController.githubCallback);

// Logout
router.post("/logout", authController.logout);

// Refresh Token
router.post("/refresh-token", authController.refreshToken);

// Email Verification
router.post(
  "/verify-email",
  authMiddleware,
  authController.sendEmailVerification
);
router.get("/verify-email/:token", authController.verifyEmail);

export default router;
