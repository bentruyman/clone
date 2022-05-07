export class CloneFailureError extends Error {
  constructor(repo: string) {
    super(`Failed to clone repository: ${repo}`);
  }
}
