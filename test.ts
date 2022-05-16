import { assertEquals, assertRejects, fs, path } from "./deps.ts";
import { CloneFailureError } from "./errors/CloneFailureError.ts";
import { DirectoryAlreadyExistsError } from "./errors/DirectoryAlreadyExistsError.ts";
import { InvalidRepositoryPathError } from "./errors/InvalidRepositoryPath.ts";
import { clone, createDestPath } from "./mod.ts";

Deno.test("clone", async () => {
  const root = await Deno.makeTempDir();
  const repo = "https://github.com/bentruyman/empty.git";

  await clone(repo, root);

  const readmePath = path.join(root, "github.com/bentruyman/empty/README.md");
  const readmeContents = await Deno.readTextFile(readmePath);

  assertEquals(readmeContents, "# empty\n");
});

Deno.test("clone - target directory already exists", async () => {
  const root = await Deno.makeTempDir();
  const repo = "https://github.com/bentruyman/empty.git";

  await fs.ensureDir(path.join(root, "github.com/bentruyman/empty"));

  await assertRejects(
    async () => await clone(repo, root),
    DirectoryAlreadyExistsError,
  );
});

Deno.test("clone - repo fails to clone", async () => {
  const root = await Deno.makeTempDir();
  const repo = "https://github.com/bentruyman/empty.git";

  await Deno.chmod(root, 0e444);

  await assertRejects(
    async () => await clone(repo, root),
    CloneFailureError,
  );
});

Deno.test("clone - invalid repo path", async () => {
  const root = await Deno.makeTempDir();

  await assertRejects(
    async () => await clone("invalid/path", root),
    InvalidRepositoryPathError,
  );
  await assertRejects(
    async () => await clone("file://invalid/path", root),
    InvalidRepositoryPathError,
  );
});

Deno.test("createDestPath", () => {
  // github.com
  assertEquals(
    createDestPath(
      "/home/src",
      "https://github.com/bentruyman/quick-clone.git",
    ),
    "/home/src/github.com/bentruyman/quick-clone",
  );

  assertEquals(
    createDestPath(
      "/home/src",
      "git@github.com:bentruyman/quick-clone.git",
    ),
    "/home/src/github.com/bentruyman/quick-clone",
  );

  // github.custom.host.com
  assertEquals(
    createDestPath(
      "/home/src",
      "https://github.custom.host.com/bentruyman/quick-clone.git",
    ),
    "/home/src/github.custom.host.com/bentruyman/quick-clone",
  );

  assertEquals(
    createDestPath(
      "/home/src",
      "git@github.custom.host.com:bentruyman/quick-clone.git",
    ),
    "/home/src/github.custom.host.com/bentruyman/quick-clone",
  );
});
