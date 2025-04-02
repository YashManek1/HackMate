import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.get("*", (req: Request, res: Response) => {
  res.send("Hello World!");
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
export { app };
