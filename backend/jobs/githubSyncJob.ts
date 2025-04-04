import cron from "node-cron";
import { PrismaClient } from "@prisma/client";
import { githubService } from "../services/githubService";

const prisma = new PrismaClient();

// Run every day at 3:00 AM
cron.schedule("0 3 * * *", async () => {
  console.log("Running daily GitHub sync...");
  const users = await prisma.user.findMany({
    where: {
      gitHubAccessToken: { not: null },
    },
  });

  for (const user of users) {
    try {
      await githubService.syncGitHubData(user.id, user.gitHubAccessToken!);
      console.log(`Synced GitHub data for ${user.name}`);
    } catch (err) {
      console.error(`Failed to sync for ${user.name}`, err);
    }
  }
});
