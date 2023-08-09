import { flags } from "./deps.ts";
import { clone } from "./mod.ts";
import { VERSION } from "./version.ts";
import { DirectoryAlreadyExistsError } from "./errors/DirectoryAlreadyExistsError.ts";

const NAME = "clone";

function help() {
  console.log(`${NAME} ${VERSION}
To clone a repository:

  ${NAME} https://github.com/bentruyman/quick-clone.git
  ${NAME} git@github.com:bentruyman/quick-clone.git

USAGE:
    ${NAME} [OPTIONS] <REPO>

OPTIONS:
    -h, --help
            Print help information

ENVIRONMENT VARIABLES:
    SRC_ROOT    root directory to clone repositories into (default:
                "$HOME/Development/src")`);
}

async function main() {
  const result = flags.parseFlags(Deno.args, {
    allowEmpty: true,
    stopEarly: true,
    flags: [{
      name: "help",
      aliases: ["h"],
      standalone: true,
    }],
  });

  const repo = result.unknown[0];

  if (result.flags.help === true || Deno.args.length === 0) {
    return help();
  } else if (repo == null || result.unknown.length > 1) {
    console.log(`Too many arguments: ${Deno.args}\n`);
    return help();
  }

  try {
    const dest = await clone(repo);
    const editor = Deno.env.get("VISUAL") ?? Deno.env.get("EDITOR");

    if (editor !== undefined) {
      const p = Deno.run({ cmd: [editor, dest] });
      await p.status();
    }
  } catch (e) {
    if (e instanceof DirectoryAlreadyExistsError) {
      return console.log(e.message);
    }
  }
}

main();
