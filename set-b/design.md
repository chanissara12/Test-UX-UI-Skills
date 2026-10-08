# Lumen — design system (set B)

Swiss / minimal: monochrome with one pink accent. Structure comes from `shared/core.css`; this set supplies tokens in `set-b/tokens.css` and look in `set-b/b.css`.

- Fonts: Inter, JetBrains Mono
- Files: set-b/tokens.css · set-b/b.css · shared/
- Themes: light and dark (`data-theme="dark"` on `<html>`, toggle `#theme`, `localStorage` key `t`, default follows the system)

## Architecture: three layers

```
Primitive  raw values, no meaning, never themed        --zinc-900, --space-4
   ↓
Semantic   purpose aliases; the ONLY layer themed      --accent, --text, --bg
   ↓
Component  per-component hooks built from semantic     --radius, --chip-bg
```

Rules:
1. Components (`set-b/b.css`, `shared/core.css`) use semantic or component tokens. No raw hex.
2. Dark mode overrides **semantic** tokens only. Primitives never change.
3. Spacing (`padding`, `margin`, `gap`) and `font-size` use the scales below. Exceptions: 1–3px hairlines and offsets.
4. `shared/core.css` is structure only. Each set in B and C supplies the tokens it reads.

## Scales

### Spacing (4px base)

| Token | Value | Token | Value |
|---|---|---|---|
| `--space-1` | 4px | `--space-8` | 32px |
| `--space-2` | 8px | `--space-10` | 40px |
| `--space-3` | 12px | `--space-12` | 48px |
| `--space-4` | 16px | `--space-16` | 64px |
| `--space-5` | 20px | `--space-20` | 80px |
| `--space-6` | 24px | `--space-24` | 96px |

### Type

| Token | Size | Token | Size |
|---|---|---|---|
| `--text-xs` | .75rem (12px) | `--text-3xl` | 2rem (32px) |
| `--text-sm` | .875rem (14px) | `--text-4xl` | 2.5rem (40px) |
| `--text-base` | 1rem (16px) | `--text-5xl` | 3rem (48px) |
| `--text-lg` | 1.125rem (18px) | `--text-6xl` | 3.75rem (60px) |
| `--text-xl` | 1.25rem (20px) | `--text-7xl` | 5rem (80px) |
| `--text-2xl` | 1.5rem (24px) | | |

Headings use `clamp(min, vw, max)` with scale tokens for min and max.

---


### Primitive

| Group | Tokens |
|---|---|
| Zinc | `--zinc-50` #FAFAFA · `--zinc-100` #F4F4F5 · `--zinc-200` #E4E4E7 · `--zinc-400` #A1A1AA · `--zinc-600` #52525B · `--zinc-800` #27272A · `--zinc-900` #18181B · `--zinc-925` #111113 · `--zinc-950` #09090B |
| Pink | `--pink-400` #F472B6 · `--pink-500` #EC4899 · `--pink-700` #BE185D |
| Other | `--white` #FFFFFF · `--radius-1` 2px · `--border-w` 1px |
| Fonts | `--font-sans` Inter · `--font-mono` JetBrains Mono |

### Semantic

| Token | Light | Dark |
|---|---|---|
| `--bg` | zinc-50 | zinc-950 |
| `--card` | white | zinc-925 |
| `--text` | zinc-950 | zinc-50 |
| `--muted` | zinc-600 | zinc-400 |
| `--line` | zinc-200 | zinc-800 |
| `--strong` | zinc-950 | zinc-50 |
| `--hover` | zinc-100 | zinc-900 |
| `--accent` (text) | pink-700 | pink-400 |
| `--mark` (decorative) | pink-500 | pink-500 |
| `--ring` | zinc-950 | zinc-50 |
| `--btn` / `--on-btn` | zinc-900 / white | zinc-50 / zinc-950 |

### Component

`--font`, `--mono`, `--radius` (2px), `--bw` (1px), `--shadow` (none), `--chip-bg` (= hover), `--chip-radius`, `--thead` (transparent).

## Notes

`--mark` (pink-500) is decorative only: it fails 4.5:1 as text, so text accents use `--accent`. Contrast has not been measured for this set.

## Adding or changing tokens

1. New raw value: add to the set's primitive block, with a descriptive name (`--zinc-925`, not `--dark-card`).
2. New meaning: add a semantic alias; if it differs per theme, override it in `:root[data-theme="dark"]`.
3. New component need: add a component token that references semantic tokens; use it in the component CSS.
4. Do not write hex, or px/rem for spacing and type, directly in component CSS.
