export class InvalidRepositoryPathError extends Error {
  constructor(path: string) {
    super(`Invalid repository path: ${path}`);
  }
}
