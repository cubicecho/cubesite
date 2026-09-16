#!/usr/bin/env node
/**
 * Which cubicecho repos still have no Pages site?
 *
 *   npm run audit
 *
 * Needs the `gh` CLI, authenticated. This is a local check, never a build step:
 * it asks GitHub about every repo in the org, which is the sort of thing that
 * should not stand between a commit and a deploy.
 */

import { execFileSync } from "node:child_process";

const gh = (args) => execFileSync("gh", args, { encoding: "utf8" });

let repos;
try {
  repos = JSON.parse(gh(["repo", "list", "cubicecho", "--limit", "200", "--json", "name,isArchived"]))
    .filter((r) => !r.isArchived)
    .map((r) => r.name)
    .sort();
} catch {
  console.error("could not list the org — is `gh` installed and authenticated?");
  process.exit(1);
}

const withSite = [];
const without = [];

for (const name of repos) {
  let url = null;
  try {
    url = gh(["api", `repos/cubicecho/${name}/pages`, "--jq", ".html_url"]).trim();
  } catch {
    // 404 from the Pages endpoint is the answer, not an error: no site.
  }
  (url ? withSite : without).push([name, url]);
}

for (const [name, url] of withSite) console.log(`  ✓ ${name.padEnd(34)} ${url}`);
for (const [name] of without) console.log(`  · ${name.padEnd(34)} no site`);

console.log(`\n${withSite.length}/${repos.length} repos have a Pages site.`);
if (without.length) {
  console.log(`Scaffold one:  node scripts/scaffold.mjs ../<repo>`);
  process.exitCode = 1;
}
