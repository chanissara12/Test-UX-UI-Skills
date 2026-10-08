// Bonsai Kyo design tokens — single source of truth.
// Load after the Tailwind CDN script: <script src="tokens.js"></script>

const primitive = {
  washi:  '#F7F4EC', // กระดาษวาชิ: พื้นหลังหลัก
  kinari: '#EDE8DA', // สีครีมไม่ฟอก: พื้นรอง
  sumi:   '#1F2421', // หมึกซูมิ: ตัวอักษร
  nezumi: '#5A5F58', // เทาหนู: ตัวอักษรรอง (contrast 5.9:1 บน washi)
  matcha: { DEFAULT: '#4F6140', dark: '#3B4A30' }, // เขียวมัตฉะ: สีหลัก
  shu:    { DEFAULT: '#A8402D', dark: '#8F3524' }, // แดงชู: สีเน้น
  line:   '#D9D3C2', // เส้นขอบ
};

// Semantic aliases: ใช้ชื่อเหล่านี้ใน component ใหม่ ๆ
const semantic = {
  surface:         primitive.washi,
  'surface-muted': primitive.kinari,
  'surface-inverse': primitive.sumi,
  text:            primitive.sumi,
  'text-muted':    primitive.nezumi,
  'text-inverse':  primitive.washi,
  border:          primitive.line,
  primary:         primitive.matcha.DEFAULT,
  'primary-hover': primitive.matcha.dark,
  accent:          primitive.shu.DEFAULT,
  'accent-hover':  primitive.shu.dark,
};

tailwind.config = {
  theme: { extend: {
    colors: { ...primitive, ...semantic },
    fontFamily: {
      serif: ['"Shippori Mincho"', '"Noto Sans Thai"', 'serif'],
      sans:  ['"Noto Sans Thai"', '"Noto Sans JP"', 'sans-serif'],
    },
  } },
};
