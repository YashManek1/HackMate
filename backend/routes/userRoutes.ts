// src/routes/userRoutes.ts
import express from "express";
import { userController } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/me", authMiddleware, userController.getMe);
router.put("/me", authMiddleware, userController.updateMe);
router.get("/:id", authMiddleware, userController.getUser);

export default router;
