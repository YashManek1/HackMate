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

const prisma = new PrismaClient();

// Explicitly define the type for Passport's done callback
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
        let user = await prisma.user.findUnique({
          where: { googleId: profile.id },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              googleId: profile.id,
              email: profile.emails?.[0]?.value || "default@example.com",
              name: profile.displayName || "Unknown",
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
      passReqToCallback: false,
    },
    async (
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

export default passport;
