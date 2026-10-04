# Brand

## The mark

A cube over three ripples: the thing, and the echo of it. It is drawn in
strokes only, at `viewBox="0 0 80 80"`, and takes its color from
`currentColor` — so it is legible on either theme without a second file.

| File | Use |
|---|---|
| [`mark.svg`](./mark.svg) | Inline in a page header. Inherits `currentColor`. |
| [`logo.svg`](./logo.svg) | Standalone: README, og image, anywhere the SVG is `<img>`-ed and has no text color to inherit. |
| [`favicon.svg`](./favicon.svg) | Tab icon. Same mark, heavier strokes and more spread, because at 16px the thin version fills in. |

Rules, such as they are:

- **Don't re-tint it.** It is `currentColor` on purpose. A brand-blue version on
  a dark header is one more thing to keep in step.
- **Don't set it below 24px** except as a favicon — the ripples merge.
- **Don't pair it with a second mark.** A project site's identity is the project
  name in mono next to this; the emoji-per-project habit (🔀, 🧠, …) is what
  this repo exists to end.

## Color

The palette is [cubeui](https://github.com/cubicecho/cubeui)'s, under its names
and with its default light and dark values — `tokens/palette.mjs` there is the
source, so a project's site and its app are the same colors. Tokens live in
[`tokens.css`](./tokens.css), and [`theme/cubesite.css`](../theme/cubesite.css)
already includes them. A value changes in cubeui first, then here.

| Token | Light | Dark | Role |
|---|---|---|---|
| `--background` | `#ffffff` | `#0a0a0a` | The page. |
| `--foreground` | `#0a0a0a` | `#fafafa` | Body text, headings, the mark. |
| `--secondary` | `#fafafa` | `#262626` | A surface raised off the page: cards. |
| `--neutral` | `#171717` | `#e5e5e5` | The primary button. Its text is `--neutral-foreground`. |
| `--hover` | `#d4eaf0` | `#2a454c` | The fill under a pointer, on the secondary button. |
| `--active` | `#2d6d7e` | `#69a2b3` | The focus ring. |
| `--info` | `#0369a1` | `#0ea5e9` | Links. |
| `--positive` | `#15803d` | `#22c55e` | Unused by the theme; there for a project that needs to say it. |
| `--warning` | `#b45309` | `#f59e0b` | As above. |
| `--negative` | `#e7000b` | `#ff6467` | As above. |

The hex is for reading; the files carry cubeui's `oklch()` values.

**Nothing is a quieter copy of another token.** Muted text — taglines, nav,
captions — is `--foreground` at 60%, a border is `--foreground` at 10%, and the
fill behind code is `--foreground` at 10%, each written as
`color-mix(in oklab, var(--foreground) 60%, transparent)`.

The older names (`--bg`, `--fg`, `--muted`, `--line`, `--card`, `--accent`,
`--accent-fg`) are still defined, as aliases of the above, so a project's
`site.css` written against them keeps working. Don't use them in new rules.

If a project wants another color, it belongs in that project's `site.css` as a
one-off, not in the tokens.

## Type

System sans for prose. **Mono for names** — project titles, card headings, the
wordmark on a project site — because every one of these names is also something
you type. That contrast is most of the identity; keep it.

## Voice

Lowercase package names as they are published (`mcp-router`, not "MCP Router")
everywhere the name is a name. One-line taglines say what the thing *is*, in
plain words, without "blazing-fast", "seamless", or a leading "A powerful".
