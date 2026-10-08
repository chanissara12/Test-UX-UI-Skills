// Nexora IT — แบบ C: Dark Mode (OLED) (ui-ux-pro-max: style Dark Mode OLED + palette Developer Tool)
// Load after the Tailwind CDN script: <script src="hardware-c-tokens.js"></script>

const semantic = {
  surface:           '#0A0E27', // skill OLED: midnight blue
  'surface-raised':  '#0F172A', // skill Developer Tool: Background
  'surface-muted':   '#1E293B', // skill: Secondary
  'surface-inverse': '#020617',
  text:              '#F1F5F9', // skill: Text
  'text-muted':      '#CBD5E1',
  'text-inverse':    '#FFFFFF',
  border:            '#334155', // skill: Border
  'border-strong':   '#94A3B8', // ขอบ UI ต้อง ≥ 3:1
  primary:           '#2563EB', // skill: CTA (ขาวบน primary 5.2:1)
  'primary-hover':   '#1D4ED8',
  accent:            '#60A5FA', // ข้อความ/ไอคอนเน้นบนพื้นมืด
  success:           '#4ADE80',
  warning:           '#FBBF24',
  danger:            '#FCA5A5',
};

tailwind.config = { theme: { extend: {
  colors: semantic,
  fontFamily: {
    sans:    ['"IBM Plex Sans"', '"Noto Sans Thai"', 'sans-serif'],
    heading: ['"JetBrains Mono"', '"Noto Sans Thai"', 'monospace'],
  },
} } };
