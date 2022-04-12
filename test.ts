import { assertEquals, path } from "./deps.ts";
import { clone, createDestPath } from "./mod.ts";

Deno.test("clone", async () => {
  const root = await Deno.makeTempDir();
  const repo = "https://github.com/bentruyman/empty.git";

  await clone(root, repo);

  const readmePath = path.join(root, "github.com/bentruyman/empty/README.md");
  const readmeContents = await Deno.readTextFile(readmePath);

  assertEquals(readmeContents, "# empty\n");
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
