// Nexora IT — แบบ B: Data-Dense Dashboard (ui-ux-pro-max: B2B Service palette)
// Load after the Tailwind CDN script: <script src="hardware-b-tokens.js"></script>

const semantic = {
  surface:           '#F8FAFC',
  'surface-raised':  '#FFFFFF',
  'surface-muted':   '#F1F5F9',
  'surface-inverse': '#0F172A', // skill: Primary
  text:              '#020617', // skill: Text
  'text-muted':      '#334155', // skill: Secondary
  'text-inverse':    '#FFFFFF',
  border:            '#E2E8F0', // skill: Border
  'border-strong':   '#64748B', // ขอบ UI ต้อง ≥ 3:1
  primary:           '#0369A1', // skill: CTA
  'primary-hover':   '#075985',
  success:           '#166534',
  warning:           '#92400E',
  danger:            '#991B1B',
};

tailwind.config = { theme: { extend: {
  colors: semantic,
  fontFamily: {
    sans:    ['"Fira Sans"', '"Noto Sans Thai"', 'sans-serif'],
    heading: ['"Fira Code"', '"Noto Sans Thai"', 'monospace'],
  },
} } };
