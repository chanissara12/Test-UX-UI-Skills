# Northwind — design system (set A)

Professional modern, blue. Own `styles.css`, does not use `shared/`.

- Fonts: Plus Jakarta Sans
- Files: set-a/tokens.css · set-a/styles.css
- Themes: light and dark (`data-theme="dark"` on `<html>`, toggle `#theme`, `localStorage` key `t`, default follows the system)

## Architecture: three layers

```
Primitive  raw values, no meaning, never themed        --blue-600, --space-4
   ↓
Semantic   purpose aliases; the ONLY layer themed      --primary, --text, --bg
   ↓
Component  per-component hooks built from semantic     --btn-radius, --chip-bg
```

Rules:
1. Components (`set-a/styles.css`) use semantic or component tokens. No raw hex.
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
| Blue | `--blue-300` #93C5FD · `--blue-400` #60A5FA · `--blue-600` #2563EB |
| Green | `--green-400` #4ADE80 · `--green-700` #15803D |
| Slate | `--slate-50` #F8FAFC · `--slate-100` #F1F5F9 · `--slate-200` #E2E8F0 · `--slate-300` #CBD5E1 · `--slate-600` #475569 · `--slate-800` #1E293B |
| Other | `--white` #FFFFFF · `--ice-100` #E9EFF8 |
| Navy (dark) | `--navy-950` #0B1220 · `--navy-900` #131C2E · `--navy-800` #1B2740 · `--navy-700` #26324A · `--navy-600` #3A4A68 · `--navy-300` #A3B1C6 |
| Radius | `--radius-1` 10px · `--radius-2` 12px · `--radius-3` 16px · `--radius-4` 24px · `--radius-full` 99px |
| Misc | `--duration` .2s · `--container` 1160px · `--font-sans` Plus Jakarta Sans |

### Semantic

| Token | Light | Dark |
|---|---|---|
| `--bg` | slate-50 | navy-950 |
| `--card` | white | navy-900 |
| `--muted-bg` | ice-100 | navy-800 |
| `--border` | slate-200 | navy-700 |
| `--border-strong` | slate-300 | navy-600 |
| `--text` | slate-800 | slate-100 |
| `--muted` | slate-600 | navy-300 |
| `--primary` | blue-600 | blue-400 |
| `--on-primary` | white | navy-950 |
| `--ring` | blue-600 | blue-300 |
| `--ok` | green-700 | green-400 |
| `--glass` | rgba(248,250,252,.8) | rgba(11,18,32,.8) |

Shadows (same in both themes): `--shadow-lg` (product mock), `--shadow-hover` (card hover), `--shadow-menu` (dropdown).

### Component

| Component | Tokens |
|---|---|
| Button | `--btn-height` 44px · `--btn-radius` radius-1 · `--btn-border` · `--btn-primary-bg/fg` |
| Card | `--card-radius` radius-3 · `--card-border` |
| Input | `--input-height` 44px · `--input-radius` · `--input-border` · `--input-bg` |
| Table | `--table-radius` radius-3 · `--table-head-bg` |
| Chip | `--chip-bg` · `--chip-border` |
| Badge | `--badge-radius` full · `--badge-bg` |

## Adding or changing tokens

1. New raw value: add to the set's primitive block, with a descriptive name (`--zinc-925`, not `--dark-card`).
2. New meaning: add a semantic alias; if it differs per theme, override it in `:root[data-theme="dark"]`.
3. New component need: add a component token that references semantic tokens; use it in the component CSS.
4. Do not write hex, or px/rem for spacing and type, directly in component CSS.
