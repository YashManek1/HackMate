// src/config/auth.ts
import dotenv from "dotenv";

dotenv.config();

export const authConfig = {
  jwt: {
    secret: process.env.JWT_SECRET || "your-jwt-secret",
    expiresIn: "1h" as const,
    refreshExpiresIn: "7d" as const,
  },
  github: {
    clientID: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    callbackURL: process.env.GITHUB_CALLBACK_URL!,
  },
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: process.env.GOOGLE_CALLBACK_URL!,
  },
};
