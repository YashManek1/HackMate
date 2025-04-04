import axios from "axios";
import { PrismaClient } from "@prisma/client";
import { decrypt } from "../utils/crypto";

const prisma = new PrismaClient();

interface GitHubRepo {
  full_name: string;
  stargazers_count: number;
}

interface GitHubUser {
  login: string;
}

interface GitHubProfile {
  followers: number;
  public_repos: number;
  public_gists: number;
}

class GitHubService {
  private languageToSkillMap: Record<string, string> = {
    TypeScript: "TypeScript",
    JavaScript: "JavaScript",
    Python: "Python",
    HTML: "Frontend",
    CSS: "Frontend",
    Java: "Java",
    C: "C",
    "C++": "C++",
    Go: "Go",
    Rust: "Rust",
    PHP: "PHP",
  };

  private async getAccessToken(token: string) {
    return decrypt(token);
  }

  async getUserRepos(token: string): Promise<GitHubRepo[]> {
    const accessToken = await this.getAccessToken(token);
    const res = await axios.get<GitHubRepo[]>(
      "https://api.github.com/user/repos?per_page=100",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return res.data;
  }

  async getRepoLanguages(
    token: string,
    repoFullName: string
  ): Promise<Record<string, number>> {
    const accessToken = await this.getAccessToken(token);
    const res = await axios.get<Record<string, number>>(
      `https://api.github.com/repos/${repoFullName}/languages`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return res.data;
  }

  async getRepoCommits(token: string, repoFullName: string) {
    const accessToken = await this.getAccessToken(token);
    const res = await axios.get(
      `https://api.github.com/repos/${repoFullName}/commits`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return res.data;
  }

  async getCommitSnippet(token: string, repoFullName: string, sha: string) {
    const accessToken = await this.getAccessToken(token);
    const res = await axios.get(
      `https://api.github.com/repos/${repoFullName}/commits/${sha}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    const data = res.data as any;
    return data.files?.map((file: any) => ({
      filename: file.filename,
      patch: file.patch,
    }));
  }

  async autoTagSkills(userId: string, token: string) {
    const accessToken = await this.getAccessToken(token);
    const repos = await this.getUserRepos(token);
    const languageUsage: Record<string, number> = {};

    for (const repo of repos) {
      const langs = await this.getRepoLanguages(token, repo.full_name);
      for (const lang in langs) {
        languageUsage[lang] = (languageUsage[lang] || 0) + langs[lang];
      }
    }

    const detectedSkills = Object.keys(languageUsage)
      .map((lang) => this.languageToSkillMap[lang])
      .filter((skill) => skill);

    await prisma.user.update({
      where: { id: userId },
      data: {
        skills: {
          connectOrCreate: detectedSkills.map((skill) => ({
            where: { name: skill },
            create: { name: skill },
          })),
        },
      },
    });

    return detectedSkills;
  }

  async storeGitHubStats(userId: string, token: string) {
    const accessToken = await this.getAccessToken(token);

    const userRes = await axios.get<GitHubUser>("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const username = userRes.data.login;

    const profileRes = await axios.get<GitHubProfile>(
      `https://api.github.com/users/${username}`
    );

    const reposRes = await axios.get<GitHubRepo[]>(
      `https://api.github.com/users/${username}/repos`
    );

    const stats = {
      followers: profileRes.data.followers,
      public_repos: profileRes.data.public_repos,
      public_gists: profileRes.data.public_gists,
      total_stars: reposRes.data.reduce(
        (acc: number, repo) => acc + repo.stargazers_count,
        0
      ),
    };

    await prisma.user.update({
      where: { id: userId },
      data: {
        githubStats: stats,
      },
    });

    return stats;
  }

  async syncGitHubData(userId: string, encryptedToken: string) {
    const skills = await this.autoTagSkills(userId, encryptedToken);
    const stats = await this.storeGitHubStats(userId, encryptedToken);
    return { skills, stats };
  }
}

export const githubService = new GitHubService();
