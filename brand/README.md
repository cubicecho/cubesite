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

Tokens live in [`tokens.css`](./tokens.css), and
[`theme/cubesite.css`](../theme/cubesite.css) already includes them.

| Token | Light | Dark | Role |
|---|---|---|---|
| `--bg` | `#fafaf9` | `#111113` | Page background. Warm off-white, not `#fff`. |
| `--fg` | `#1a1a1a` | `#ececec` | Body text, headings, the mark. |
| `--muted` | `#6b6b6b` | `#9a9a9a` | Taglines, nav, captions, table headers. |
| `--line` | `#e5e5e3` | `#26262a` | Borders and rules. |
| `--card` | `#ffffff` | `#1a1a1d` | Cards, code blocks, inline code. |
| `--accent` | `#2563eb` | `#7aa6ff` | Links and the primary button. |
| `--accent-fg` | `#ffffff` | `#0c0c0e` | Text on the accent. |

Both accents clear 4.5:1 against their own `--bg`. If a project wants another
color, it belongs in that project's `site.css` as a one-off, not in the tokens.

## Type

System sans for prose. **Mono for names** — project titles, card headings, the
wordmark on a project site — because every one of these names is also something
you type. That contrast is most of the identity; keep it.

## Voice

Lowercase package names as they are published (`mcp-router`, not "MCP Router")
everywhere the name is a name. One-line taglines say what the thing *is*, in
plain words, without "blazing-fast", "seamless", or a leading "A powerful".
