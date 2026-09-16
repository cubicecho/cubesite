#!/usr/bin/env node
/**
 * Write a cubesite-shaped site into a project repo.
 *
 *   node scripts/scaffold.mjs ../mcp-actual            # full scaffold
 *   node scripts/scaffold.mjs ../mcp-router --theme    # theme + brand only
 *
 * Full scaffold writes site/ from template/ (with __SLUG__ replaced by the
 * repo's directory name) and .github/workflows/pages.yml from workflows/.
 *
 * --theme writes only the files this repo owns outright — the stylesheet, the
 * mark, the favicon — which is what a repo that already has a hand-written
 * site wants. Those four paths are overwritten; nothing else ever is. A file
 * that already exists and is not owned here is left alone and reported, so
 * running this twice is safe and running it on a half-migrated repo is too.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, dirname, resolve, basename, relative } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");

const args = process.argv.slice(2);
const themeOnly = args.includes("--theme");
const target = args.find((a) => !a.startsWith("--"));

if (!target) {
  console.error("usage: node scripts/scaffold.mjs <repo-path> [--theme]");
  process.exit(1);
}

const repo = resolve(target);
if (!existsSync(repo)) {
  console.error(`no such directory: ${repo}`);
  process.exit(1);
}
if (!existsSync(join(repo, ".git"))) {
  console.error(`${repo} is not a git repo — point this at a project checkout`);
  process.exit(1);
}

const slug = basename(repo);

// Paths cubesite owns: always overwritten, because they are vendored copies and
// a local edit to one is a change that was supposed to happen upstream.
const vendored = [
  ["theme/cubesite.css", "site/src/css/cubesite.css"],
  ["brand/favicon.svg", "site/src/assets/favicon.svg"],
  ["brand/logo.svg", "site/src/assets/logo.svg"],
  ["template/src/_includes/mark.njk", "site/src/_includes/mark.njk"],
];

const vendoredDests = new Set(vendored.map(([, to]) => to));

let written = 0;
let kept = 0;

/** Copy `from` (relative to cubesite) to `to` (relative to the repo). */
function copy(from, to, { overwrite = false, substitute = false } = {}) {
  const dest = join(repo, to);
  const existed = existsSync(dest);
  if (existed && !overwrite) {
    kept++;
    console.log(`  kept    ${to}`);
    return;
  }
  let body = readFileSync(join(root, from));
  if (substitute) body = Buffer.from(body.toString("utf8").replaceAll("__SLUG__", slug));
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, body);
  written++;
  console.log(`  ${existed ? "synced" : "wrote "}  ${to}`);
}

/** Every file under `dir`, relative to it, depth-first. */
function walk(dir, base = dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full, base) : [relative(base, full)];
  });
}

console.log(`${themeOnly ? "Syncing theme into" : "Scaffolding"} ${slug} (${repo})\n`);

if (!themeOnly) {
  for (const file of walk(join(root, "template"))) {
    const to = join("site", file);
    // Vendored paths are handled below, where they are overwritten rather than
    // kept — a stale copy of the theme is the one thing a re-run must fix.
    if (vendoredDests.has(to)) continue;
    copy(join("template", file), to, { substitute: true });
  }
  copy("workflows/pages.yml", ".github/workflows/pages.yml");
}

for (const [from, to] of vendored) copy(from, to, { overwrite: true });

console.log(`\n${written} written, ${kept} left alone.`);
if (!themeOnly) {
  console.log(`
Next:
  1. cd ${repo}/site && npm install && npm run dev
  2. Fill in the TODOs in src/_data/site.js and src/index.njk.
  3. Commit site/ and .github/workflows/pages.yml (site/package-lock.json too —
     the workflow runs npm ci).
  4. Settings → Pages → Source: "GitHub Actions". Push, and it deploys.`);
}
