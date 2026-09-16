# AGENTS.md — cubesite

The websites-and-branding repo for the cubicecho org. It owns three things and
nothing else:

1. **The brand** — `brand/` and `theme/cubesite.css`.
2. **The floor** — `template/` and `workflows/pages.yml`: what a repo with no
   site gets, and what "has a site" means.
3. **Its own site** — `src/`, published at `cubicecho.github.io/cubesite/`,
   which is also the distribution: `theme/` and `brand/` are copied through
   verbatim so any file here is fetchable and diffable.

## Quickstart

```sh
npm install
npm run dev                             # this site, live-reloading on :3000
npm run build                           # → _site/
npm run audit                           # org repos with no Pages site (needs gh)

node scripts/scaffold.mjs ../<repo>     # add site/ + pages.yml to a project
node scripts/scaffold.mjs ../<repo> --theme   # re-sync theme + brand only
```

## Why this exists

The cubeui argument, one layer out. Before this repo, four projects had a
`site/` and each had written its own stylesheet, its own `base.njk`, its own
header — one of them wearing a 🔀 as its logo. Nothing made them look like the
same org, so they didn't. Meanwhile most repos had no site at all, which meant
the only public face of a library like `agent-core` was a README in GitHub's
chrome.

A change here is worth making when it **removes a decision** from the next repo.
A theme rule that every project site wants belongs in `theme/cubesite.css`; a
rule one project wants belongs in that project's `site/src/css/site.css`. The
failure mode to watch for is the second one migrating into the first, because
then the shared file stops being shareable and every repo inherits a shape it
did not ask for.

## Staying on task

- **Vendored, not linked.** Project sites carry a *copy* of `cubesite.css` and
  the mark. They must not `<link>` at `cubicecho.github.io/cubesite/` — a
  project's site going down with this one would be a self-inflicted outage, for
  a 6KB file. `scripts/scaffold.mjs --theme` is how a copy gets updated.
- **The scaffold only overwrites what this repo owns.** That list is the
  `vendored` array in `scripts/scaffold.mjs`. Everything else is written once
  and then left alone forever, so re-running it on a live repo is safe. Keep it
  that way.
- **No network at build time.** `npm run build` must work offline. `audit.mjs`
  talks to GitHub and is therefore a script you run, never a build step and
  never a CI gate on a deploy.
- **The floor is one page.** The template is a hero, three cards, an install
  block, and a pointer to the README. Resist growing it: every field added to
  the template is a TODO that thirty repos have to answer.
- **`| url` on every internal link.** Project sites are served under
  `/<repo>/`. A bare `/css/site.css` works in dev and 404s in production, which
  is the worst way for it to break.

## Layout

| Path | What it is |
|---|---|
| `brand/` | Mark, logo, favicon, tokens, and the usage rules. |
| `theme/cubesite.css` | The shared stylesheet. The one file most likely to be edited here. |
| `template/` | The `site/` a repo gets from a full scaffold. `__SLUG__` is replaced with the repo's directory name. |
| `workflows/pages.yml` | The canonical deploy, copied to `.github/workflows/pages.yml`. |
| `scripts/scaffold.mjs` | Writes the template in, or re-syncs the vendored files. |
| `scripts/audit.mjs` | Asks GitHub which org repos still have no Pages site. |
| `src/` | This repo's own site: home, `/adopt/`, `/brand/`. |

## The standard this repo enforces

Every non-archived repo under `cubicecho` has a Pages site at
`https://cubicecho.github.io/<repo>/`, its repo *Website* field set to that URL,
and a card on [cubicecho.com](https://cubicecho.com). `npm run audit` reports
the first of those and exits non-zero while any repo is missing one.

Enabling Pages (Settings → Pages → Source: **GitHub Actions**) is manual and
always will be — a workflow cannot turn on the feature it deploys to. That step
is in the scaffold's closing instructions and on `/adopt/`; don't let it fall
out of either.
