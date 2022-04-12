import { SRC_ROOT } from "./config.ts";
import { path } from "./deps.ts";

const R_GITHUB_REPO = /\/(.*)\.git$/;
const R_GIT_SSH = /.*@(.*):(.*).git/;

interface RepoPath {
  host: string;
  path: string;
}

export async function clone(repo: string, root = SRC_ROOT): Promise<string> {
  const dest = createDestPath(root, repo);
  const clone = Deno.run({
    cmd: ["git", "clone", repo, dest],
  });

  const status = await clone.status();
  clone.close();

  if (!status.success) {
    throw new Error(`Failed to clone repository: ${repo}`);
  }

  return dest;
}

export function createDestPath(
  root: string,
  repo: string,
): string {
  const repoPath = parseRepoPath(repo);

  return path.join(root, repoPath.host, repoPath.path);
}

function parseRepoPath(repo: string): RepoPath {
  const gitSshMatch = repo.match(R_GIT_SSH);

  if (gitSshMatch === null) {
    const url = new URL(repo);
    const repoPath = url.pathname.match(R_GITHUB_REPO);

    if (repoPath === null) {
      throw new Error(`Invalid repository path: ${repo}`);
    }

    return {
      host: url.host,
      path: repoPath[1],
    };
  }

  return {
    host: gitSshMatch[1],
    path: gitSshMatch[2],
  };
}
