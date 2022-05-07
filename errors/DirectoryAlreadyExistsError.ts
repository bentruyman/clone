export class DirectoryAlreadyExistsError extends Error {
  constructor(dir: string) {
    super(`Directory already exists: ${dir}`);
  }
}
