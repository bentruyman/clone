import { path } from "./deps.ts";

const homeDir = Deno.env.get("HOME")!;

const GITHUB_HOST = "github.com";
const SRC_ROOT = path.join(homeDir, "Development/src");

export { GITHUB_HOST, SRC_ROOT };
