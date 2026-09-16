# cubesite

The website half of the cubicecho projects: one brand, one stylesheet, one Pages
workflow — and the standard that **every repo in the org has a site at
`https://cubicecho.github.io/<repo>/`**, even the ones whose whole story is a
paragraph and an install line.

```sh
# from a project repo, once
node ../cubesite/scripts/scaffold.mjs .
git add site .github/workflows/pages.yml && git commit -m "Add a project site"
```

That writes `site/` (an Eleventy site, already branded) and
`.github/workflows/pages.yml` (the deploy). Turn Pages on — Settings → Pages →
Source: **GitHub Actions** — push, and the site is live.

## Why this exists

The same argument as [cubeui](https://github.com/cubicecho/cubeui), one layer
out. Four repos had a `site/` before this one existed — `mcp-router`,
`mcp-skills-manager`, `auto-cal`, `cubeui` — and each had written its own
stylesheet, its own `base.njk`, its own header. They do not look like the same
org, because nothing made them. `mcp-router`'s mark is a 🔀 emoji;
`cubicecho.com`'s is the cube-over-ripples logo. Nobody decided that either.

The other half is coverage. Most repos had no site at all, which means the only
public face of, say, `agent-core` is a README rendered in GitHub's chrome — fine
for someone already on GitHub, nothing at all for a link in a chat or a search
result. A one-page site is cheap. It was just never anybody's job.

So this repo owns two things:

1. **The brand** — [`brand/`](./brand) (logo, wordmark, tokens) and
   [`theme/cubesite.css`](./theme/cubesite.css), the stylesheet every project
   site uses. Published at `https://cubicecho.github.io/cubesite/` so it can be
   fetched and diffed, and **vendored** into each repo by the scaffold so no
   project site has a runtime dependency on this one.
2. **The floor** — [`template/`](./template) and
   [`workflows/pages.yml`](./workflows/pages.yml): what a repo gets when it has
   nothing, and what "has a site" means when someone checks.

## What a project site is

One page, usually. A hero with the name and the one-line pitch, what it does,
how to run it, and links out to the repo, the package, the image. Anything
longer than that belongs in the README — the site points at the README, not the
other way round.

Repos with more to say (`mcp-router`, `mcp-skills-manager`) add `get-started`
and `docs` pages on top of the same layout. That is the ceiling, not the floor.

## Layout

| Path | What it is |
|---|---|
| [`brand/`](./brand) | Logo, mark, wordmark, color tokens, and the rules for using them. |
| [`theme/cubesite.css`](./theme/cubesite.css) | The shared stylesheet. Vendored into each project site as `site/src/css/cubesite.css`. |
| [`template/`](./template) | The `site/` a repo gets when it has none. |
| [`workflows/pages.yml`](./workflows/pages.yml) | The canonical Pages deploy, copied to `.github/workflows/pages.yml`. |
| [`scripts/scaffold.mjs`](./scripts/scaffold.mjs) | Writes the template into a repo, or re-syncs the theme in one that already has a site. |
| [`scripts/audit.mjs`](./scripts/audit.mjs) | Asks GitHub which org repos still have no Pages site. |
| [`src/`](./src) | This repo's own site — the docs you are reading, plus the brand page. |

## Commands

```sh
npm install
npm run dev            # this repo's site, live-reloading on :3000
npm run build          # → _site/ (includes theme/ and brand/ verbatim)
npm run audit          # which org repos are missing a Pages site (needs gh)

node scripts/scaffold.mjs <repo-path>          # add site/ + pages.yml
node scripts/scaffold.mjs <repo-path> --theme  # re-sync theme + brand only
```

## Adopting it in a repo that already has a site

Don't re-scaffold — `--theme` copies `theme/cubesite.css` and the brand assets
in and leaves your pages alone. Then swap your stylesheet link for
`cubesite.css`, keep whatever project-specific rules you had in `site.css`
after it, and replace the emoji in the header with the mark from
`brand/mark.svg`. The theme expects the markup in
[`template/src/_includes/base.njk`](./template/src/_includes/base.njk).

## License

MIT — see [LICENSE](./LICENSE).
