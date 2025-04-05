import { PrismaClient, User } from "@prisma/client";
import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import hackathonRoutes from "./routes/hackathonRoutes";
import githubRoutes from "./routes/githubRoutes";

import { errorMiddleware } from "./middlewares/errorMiddleware";
import "./utils/passport";

import "./jobs/githubSyncJob";

dotenv.config();

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*", credentials: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/github", githubRoutes);
app.use("/hackathon", hackathonRoutes);

// Error handling
app.use(errorMiddleware);

// Graceful shutdown
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export { app };
