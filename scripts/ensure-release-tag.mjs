import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import process from "node:process";

const packageJson = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8"),
);
const expectedTag = `v${packageJson.version}`;

if (
  process.env.GITHUB_ACTIONS === "true" &&
  process.env.GITHUB_REF_TYPE === "tag" &&
  process.env.GITHUB_REF_NAME === expectedTag
) {
  process.exit(0);
}

function git(args) {
  return execFileSync("git", args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

try {
  git(["rev-parse", "--verify", "--quiet", `refs/tags/${expectedTag}`]);
} catch {
  fail(`Expected release tag ${expectedTag} does not exist.`);
}

const head = git(["rev-parse", "HEAD"]);
const tagCommit = git(["rev-list", "-n", "1", expectedTag]);

if (tagCommit !== head) {
  fail(`Expected release tag ${expectedTag} to point at HEAD ${head}.`);
}
