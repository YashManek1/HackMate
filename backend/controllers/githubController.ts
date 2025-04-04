import { Request, Response } from "express";
import { githubService } from "../services/githubService";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GitHubController = {
  async getRepos(req: Request, res: Response) {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user?.gitHubAccessToken)
      return res.status(401).send("GitHub not linked");

    const repos = await githubService.getUserRepos(user.gitHubAccessToken);
    res.json(repos);
  },

  async getLanguages(req: Request, res: Response) {
    const { repoName } = req.params;
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user?.gitHubAccessToken)
      return res.status(401).send("GitHub not linked");

    const languages = await githubService.getRepoLanguages(
      user.gitHubAccessToken,
      repoName
    );
    res.json(languages);
  },

  async getCommits(req: Request, res: Response) {
    const { repoName } = req.params;
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user?.gitHubAccessToken)
      return res.status(401).send("GitHub not linked");

    const commits = await githubService.getRepoCommits(
      user.gitHubAccessToken,
      repoName
    );
    res.json(commits);
  },

  async getCommitSnippet(req: Request, res: Response) {
    const { repoName, sha } = req.params;
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user?.gitHubAccessToken)
      return res.status(401).send("GitHub not linked");

    const snippet = await githubService.getCommitSnippet(
      user.gitHubAccessToken,
      repoName,
      sha
    );
    res.json(snippet);
  },

  async autoTagSkills(req: Request, res: Response) {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user?.gitHubAccessToken)
      return res.status(401).send("GitHub not linked");

    const skills = await githubService.autoTagSkills(
      req.user.id,
      user.gitHubAccessToken
    );
    res.json({ message: "Skills updated", skills });
  },

  async storeGitHubStats(req: Request, res: Response) {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user?.gitHubAccessToken)
      return res.status(401).send("GitHub not linked");

    const stats = await githubService.storeGitHubStats(
      req.user.id,
      user.gitHubAccessToken
    );
    res.json({ message: "GitHub stats updated", stats });
  },

  async syncGitHubData(req: Request, res: Response) {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user?.gitHubAccessToken)
      return res.status(401).send("GitHub not linked");

    const result = await githubService.syncGitHubData(
      req.user.id,
      user.gitHubAccessToken
    );
    res.json({ message: "GitHub data synced", ...result });
  },
};
