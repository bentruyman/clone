import { flags } from "./deps.ts";
import { clone } from "./mod.ts";
import { VERSION } from "./version.ts";

const NAME = "quick-clone";

function help() {
  console.log(`${NAME} ${VERSION}

To clone a repository:

  quick-clone https://github.com/bentruyman/quick-clone.git
  quick-clone git@github.com:bentruyman/quick-clone.git

USAGE:
    ${NAME} [OPTIONS] <REPO>

OPTIONS:
    -h, --help
            Print help information

ENVIRONMENT VARIABLES:
    GITHUB_HOST    GitHub host to use when using the shorthand syntax (default:
                   "github.com")
    SRC_ROOT       root directory to clone repositories into (default:
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

  if (result.flags.help === true) {
    return help();
  } else if (repo == null || result.unknown.length > 1) {
    console.log(`Too many arguments: ${Deno.args}\n`);
    return help();
  }

  const dest = await clone(repo);

  Deno.chdir(dest);
}

main();
