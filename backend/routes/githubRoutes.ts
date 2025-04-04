import { Router } from "express";
import { GitHubController } from "../controllers/githubController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// Repo & analytics routes
router.get("/repos", authMiddleware, GitHubController.getRepos);
router.get(
  "/languages/:repoName",
  authMiddleware,
  GitHubController.getLanguages
);
router.get("/commits/:repoName", authMiddleware, GitHubController.getCommits);
router.get(
  "/commit-snippet/:repoName/:sha",
  authMiddleware,
  GitHubController.getCommitSnippet
);

// Skill tagging & stats
router.get("/skills", authMiddleware, GitHubController.autoTagSkills);
router.get("/github-stats", authMiddleware, GitHubController.storeGitHubStats);
router.get("/sync", authMiddleware, GitHubController.syncGitHubData);

export default router;

/**
 * GitHub Routes – Fetch and sync GitHub data for logged-in users
 *
 * 🛡️ All routes require `authMiddleware` → sets `req.user` with user's ID and GitHub tokens.
 *
    
 * 📁 REPOS & ANALYTICS
 *
 * 1. GET /github/repos
 *    → Fetches all repositories of the logged-in GitHub user.
 *    → Useful for showing repo list, selecting repos, analytics, etc.
 *    → Response: [{ id, name, full_name, stargazers_count, ... }]
 *
 * 2. GET /github/languages/:repoName
 *    → Gets languages used in a specific repo (e.g., JavaScript, HTML, etc.).
 *    → Input: :repoName (like username/repo-name)
 *    → Response: { JavaScript: 14324, HTML: 2399, ... }
 *
 * 3. GET /github/commits/:repoName
 *    → Fetches commit history of a given repo.
 *    → Input: :repoName
 *    → Response: [
 *        { sha, commit: { message, author: { name, date } }, ... },
 *        ...
 *      ]
 *    → This route is **required** before using `/commit-snippet` to fetch `sha`.
 *
 * 4. GET /github/commit-snippet/:repoName/:sha
 *    → Fetches changed code (diff/patch) for a specific commit.
 *    → Input: :repoName, :sha
 *    → Use `GET /commits/:repoName` first to get valid `sha` values.
 *    → Response: [
 *        { filename: "src/index.ts", patch: "diff content..." },
 *        ...
 *      ]
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * 🧠 SKILL TAGGING & STATS
 *
 * 5. GET /github/skills
 *    → Detects user's skills by analyzing languages used in their repos.
 *    → Saves these skills into your DB (`user.skills`).
 *    → Response: [ "JavaScript", "TypeScript", "Frontend", ... ]
 *
 * 6. GET /github/github-stats
 *    → Collects and stores GitHub stats like followers, stars, public repos/gists.
 *    → Data saved in DB under `user.githubStats`.
 *    → Response: {
 *         followers: 10,
 *         public_repos: 5,
 *         public_gists: 2,
 *         total_stars: 42
 *       }
 *
 * 7. GET /github/sync
 *    → Runs both:
 *         • GET /github/skills
 *         • GET /github/github-stats
 *    → Use for full GitHub data sync (manual or via cron).
 *    → Response:
 *       {
 *         skills: [...],
 *         stats: { ... }
 *       }
 *
 * 🔁 Suggested Flow (e.g., for showing commit patch of a repo):
 *    Step 1: Call GET /github/repos → get repo list
 *    Step 2: Choose a repo, call GET /github/commits/:repoName → get list of commits (and SHA)
 *    Step 3: Choose a commit SHA and call GET /github/commit-snippet/:repoName/:sha → get diff
 *
 * 🧪 All routes return data directly from GitHub APIs and update local DB as needed.
 * 💡 Ideal for dashboards, GitHub contribution analytics, skill insights, and more.
 */
