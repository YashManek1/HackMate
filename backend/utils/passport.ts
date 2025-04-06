import passport from "passport";
import {
  Strategy as GoogleStrategy,
  Profile as GoogleProfile,
} from "passport-google-oauth20";
import {
  Strategy as GitHubStrategy,
  Profile as GitHubProfile,
} from "passport-github2";
import { PrismaClient, User } from "@prisma/client";
import { authConfig } from "../config/auth";
import { Request } from "express";
import { encrypt } from "../utils/crypto";

const prisma = new PrismaClient();

type VerifyCallback = (error: any, user?: User | false) => void;

// Serialize User
passport.serializeUser((user, done) => {
  done(null, (user as User).id);
});

// Deserialize User
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return done(null, false); // Handle user not found case
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: authConfig.google.clientID,
      clientSecret: authConfig.google.clientSecret,
      callbackURL: authConfig.google.callbackURL,
      passReqToCallback: true,
    },
    async (
      req,
      accessToken,
      refreshToken,
      profile: GoogleProfile,
      done: VerifyCallback
    ) => {
      try {
        const encryptedAccessToken = encrypt(accessToken);
        const encryptedRefreshToken = refreshToken
          ? encrypt(refreshToken)
          : null;

        const email = profile.emails?.[0]?.value || "default@example.com";
        const name = profile.displayName || "Unknown";
        const avatarUrl = profile.photos?.[0]?.value || null;
        const googleId = profile.id;

        const json = profile._json as any;
        // Extract other available info if present
        const bio = json.ne || json.tagline || null;
        const timeZone = json.timeZone || null;
        const googleProfileUrl = json.url || null;

        let user = await prisma.user.findUnique({
          where: { googleId },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              googleId,
              email,
              name,
              avatarUrl,
              bio,
              timeZone,
              portfolioUrl: googleProfileUrl, // Optional, if you want
              googleAccessToken: encryptedAccessToken,
              googleRefreshToken: encryptedRefreshToken,
              isEmailVerified: true,
              lastLogin: new Date(),
              interests: [], // Empty array as default
              status: "active",
            },
          });
        } else {
          await prisma.user.update({
            where: { id: user.id },
            data: {
              avatarUrl,
              bio,
              timeZone,
              googleAccessToken: encryptedAccessToken,
              googleRefreshToken: encryptedRefreshToken,
              lastLogin: new Date(),
            },
          });
        }

        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

// GitHub OAuth Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: authConfig.github.clientID,
      clientSecret: authConfig.github.clientSecret,
      callbackURL: authConfig.github.callbackURL,
      passReqToCallback: true,
      scope: ["user:email", "read:user", "repo"],
    },
    async (
      req: Request,
      accessToken: string,
      refreshToken: string | undefined,
      profile: GitHubProfile,
      done: VerifyCallback
    ) => {
      try {
        let user = await prisma.user.findUnique({
          where: { githubId: profile.id },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              githubId: profile.id,
              email: profile.emails?.[0]?.value || "default@example.com",
              name: profile.displayName || profile.username || "Unknown",
              avatarUrl: profile.photos?.[0]?.value,
              isEmailVerified: true,
              status: "active",
            },
          });
        }

        (user as any).gitHubAccessToken = accessToken;
        (user as any).gitHubRefreshToken = refreshToken;

        return done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

export default passport;
