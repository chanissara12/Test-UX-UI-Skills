# Blockwise — design system (set C)

Soft brutalist: warm paper, ink borders, hard offset shadows, one muted pink. Tokens are in `set-c/tokens.css`; components are styled in `set-c/styles.css`.

- Fonts: Space Grotesk, Space Mono
- Files: set-c/tokens.css · set-c/styles.css
- Themes: light and dark (`data-theme="dark"` on `<html>`, toggle `#theme`, `localStorage` key `t`, default follows the system)

## Architecture: three layers

```
Primitive  raw values, no meaning, never themed        --pink-300, --space-4
   ↓
Semantic   purpose aliases; the ONLY layer themed      --accent, --text, --bg
   ↓
Component  per-component hooks built from semantic     --shadow-btn, --chip-bg
```

Rules:
1. Components (`set-c/styles.css`) use semantic or component tokens. No raw hex.
2. Dark mode overrides **semantic** tokens only. Primitives never change.
3. Spacing (`padding`, `margin`, `gap`) and `font-size` use the scales below. Exceptions: 1–3px hairlines and offsets.

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
| Ink / stone | `--ink-950` #1C1917 · `--stone-600` #57534E |
| Paper | `--paper-50` #F7F4EE · `--paper-100` #F1ECE2 · `--paper-200` #ECE6DA · `--paper-300` #D6CFC4 |
| Pink / rose | `--pink-100` #F3DCE6 · `--pink-300` #F1B9D1 · `--rose-300` #F4A6C6 · `--rose-700` #B4235F |
| Night (dark) | `--night-950` #161412 · `--night-900` #1F1C19 · `--night-850` #27231F · `--night-800` #2A2622 · `--night-750` #37332E · `--plum-900` #3A2430 |
| Sand (dark text) | `--sand-100` #F5F0E8 · `--sand-300` #CFC8BC · `--sand-400` #B8B0A4 |
| Other | `--black` #000 · `--white` #FFF · `--border-w` 2px · `--offset` 4px |
| Fonts | `--font-sans` Space Grotesk · `--font-mono` Space Mono |

### Semantic

| Token | Light | Dark |
|---|---|---|
| `--bg` | paper-50 | night-950 |
| `--card` | white | night-900 |
| `--text` | ink-950 | sand-100 |
| `--muted` | stone-600 | sand-400 |
| `--line` | ink-950 | sand-300 |
| `--accent` (text) | rose-700 | rose-300 |
| `--ring` | ink-950 | sand-100 |
| `--btn` / `--on-btn` | pink-300 / ink-950 | pink-300 / ink-950 |
| `--btn-line` | ink-950 | pink-300 |
| `--tint` | pink-100 | plum-900 |
| `--tint2` | paper-200 | night-800 |
| `--hover` | paper-100 | night-850 |
| `--rowc` | paper-300 | night-750 |
| `--shadow-color` | ink-950 | black |

### Component

`--font`, `--mono`, `--radius` (0), `--bw` (2px), `--rowline` (1px), `--shadow` (4px hard offset), `--shadow-btn` (3px), `--shadow-btn-hover` (4px), `--chip-bg` (= tint), `--chip-radius` (0), `--thead` (= tint2).

## Contrast (measured)

Ratios against the page background: body text 15.9:1 light / 16.2:1 dark; muted text 6.9:1 / 8.6:1; accent on card 6.3:1 / 9:1; button text on button fill 10.5:1 in both themes.

## Adding or changing tokens

1. New raw value: add to the set's primitive block, with a descriptive name (`--zinc-925`, not `--dark-card`).
2. New meaning: add a semantic alias; if it differs per theme, override it in `:root[data-theme="dark"]`.
3. New component need: add a component token that references semantic tokens; use it in the component CSS.
4. Do not write hex, or px/rem for spacing and type, directly in component CSS.
