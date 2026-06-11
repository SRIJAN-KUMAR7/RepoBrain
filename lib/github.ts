import { Octokit } from "octokit";

// Initialize Octokit with a Personal Access Token
// In local development, add GITHUB_TOKEN to .env.local
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export interface RepoTreeItem {
  path: string;
  type: string;
  sha: string;
  size?: number;
}

/**
 * Fetches the complete file tree of a repository recursively.
 */
export async function getRepoTree(owner: string, repo: string) {
  try {
    // 1. Get the default branch
    const { data: repoData } = await octokit.rest.repos.get({
      owner,
      repo,
    });

    const defaultBranch = repoData.default_branch;

    // 2. Get the tree recursively
    const { data: treeData } = await octokit.rest.git.getTree({
      owner,
      repo,
      tree_sha: defaultBranch,
      recursive: "true",
    });

    return {
      tree: treeData.tree as RepoTreeItem[],
      info: {
        stars: repoData.stargazers_count,
        language: repoData.language,
        description: repoData.description,
      },
    };
  } catch (error: any) {
    console.error("Error fetching repo tree:", error.message);
    throw new Error(`Failed to fetch repository: ${error.message}`);
  }
}

/**
 * Fetches open issues for a repository.
 */
export async function getRepoIssues(owner: string, repo: string) {
  try {
    const { data: issues } = await octokit.rest.issues.listForRepo({
      owner,
      repo,
      state: "open",
      per_page: 50,
    });

    return issues.map((issue) => ({
      number: issue.number,
      title: issue.title,
      body: issue.body,
      labels: issue.labels.map((l: any) => (typeof l === "string" ? l : l.name)),
      state: issue.state,
    }));
  } catch (error: any) {
    console.error("Error fetching issues:", error.message);
    return [];
  }
}
