// Nexora IT design tokens — single source of truth.
// Load after the Tailwind CDN script: <script src="hardware-tokens.js"></script>

const primitive = {
  stone: { 50: '#FAFAF9', 100: '#F5F5F4', 200: '#E7E5E4', 300: '#D6D3D1', 500: '#78716C', 600: '#57534E', 700: '#44403C', 900: '#1C1917', 950: '#0C0A09' },
  white: '#FFFFFF',
  green: '#166534', // 7.13:1 บนขาว
  amber: '#92400E', // 7.09:1 บนขาว
  red:   '#991B1B', // 8.31:1 บนขาว
};

// Semantic aliases: ใช้ชื่อเหล่านี้ใน component ใหม่ ๆ
const semantic = {
  surface:           primitive.stone[50],
  'surface-raised':  primitive.white,
  'surface-muted':   primitive.stone[100],
  'surface-inverse': primitive.stone[900],
  text:              primitive.stone[950],
  'text-muted':      primitive.stone[600], // 7.3:1 บน surface
  'text-inverse':    primitive.white,
  border:            primitive.stone[200],
  'border-strong':   primitive.stone[500], // 4.8:1 บนขาว (WCAG 1.4.11 ขอบ UI ≥ 3:1)
  primary:           primitive.stone[900],
  'primary-hover':   primitive.stone[700],
  success:           primitive.green,
  warning:           primitive.amber,
  danger:            primitive.red,
};

tailwind.config = {
  theme: { extend: {
    colors: semantic,
    fontFamily: { sans: ['Inter', '"Noto Sans Thai"', 'sans-serif'] },
  } },
};
