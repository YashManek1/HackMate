// src/services/authService.ts
import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { authConfig } from "../config/auth";
import moment from "moment-timezone";

const prisma = new PrismaClient();

export class AuthService {
  async signup(
    email: string,
    password: string | null,
    name: string,
    githubId?: string,
    linkedinId?: string,
    portfolioUrl?: string,
    bio?: string,
    avatarUrl?: string,
    skills?: string[],
    experience?: any,
    interests?: string[],
    timeZone?: string
  ) {
    // If password exists, hash it (for normal signup)
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    // Auto-detect time zone if not provided
    const userTimeZone = timeZone || moment.tz.guess();

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        githubId,
        linkedinId,
        portfolioUrl,
        bio,
        avatarUrl,
        skills: {
          connectOrCreate:
            skills?.map((skill) => ({
              where: { name: skill },
              create: { name: skill },
            })) || [],
        },
        experience,
        interests: interests || [],
        timeZone: userTimeZone,
        isEmailVerified: false,
        status: "active",
        lastLogin: new Date(),
      },
    });

    return user;
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (
      !user ||
      !user.password ||
      !(await bcrypt.compare(password, user.password))
    ) {
      throw new Error("Invalid credentials");
    }
    return this.generateTokens(user);
  }

  async generateTokens(user: User) {
    const payload: { id: string } = { id: user.id };
    const secret: Secret = authConfig.jwt.secret;
    const accessOptions: SignOptions = { expiresIn: authConfig.jwt.expiresIn };
    const refreshOptions: SignOptions = {
      expiresIn: authConfig.jwt.refreshExpiresIn,
    };

    const accessToken = jwt.sign(payload, secret, accessOptions);
    const refreshToken = jwt.sign(payload, secret, refreshOptions);

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken, lastLogin: new Date() },
    });

    return { accessToken, refreshToken };
  }

  async logout(userId: string) {
    await prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
  }

  async refreshToken(refreshToken: string) {
    const decoded = jwt.verify(refreshToken, authConfig.jwt.secret) as {
      id: string;
    };
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user || user.refreshToken !== refreshToken)
      throw new Error("Invalid refresh token");

    return this.generateTokens(user);
  }
}

export const authService = new AuthService();
