# Nexora IT — Design Guide (แบบ C: Dark Mode OLED)

เว็บ enterprise ขายอุปกรณ์คอมพิวเตอร์ให้ทีม IT / infrastructure โทนมืดลึก อ่านสบายตา เน้นความรู้สึกเทคนิค
Stack: plain HTML + Tailwind CDN · Token อยู่ที่ [hardware-c-tokens.js](hardware-c-tokens.js) (แก้ที่นั่นที่เดียว)

## ที่มา (ผลจาก ui-ux-pro-max)

| หัวข้อ | ผลที่ skill ให้ | ที่ใช้ |
|---|---|---|
| Pattern | Feature-Rich Showcase: Hero → Features → CTA | ใช้ครบ: Hero, Features (หมวดสินค้า + เหตุผลเลือกเรา + ตัวเลข), CTA |
| Style | ค้นรวมได้ "Vibrant & Block-based" (เล่นสนุก เหมาะ startup/เกม) แต่ค้นสไตล์ตรง ๆ ได้ **Dark Mode (OLED)**: พื้นดำ/midnight, glow น้อย, อ่านง่าย, focus ชัด | **เลือก Dark Mode (OLED)** เพราะ Vibrant ขัดกับงานองค์กร |
| Colors | Developer Tool: Primary `#3B82F6`, Secondary `#1E293B`, CTA `#2563EB`, BG `#0F172A`, Text `#F1F5F9`, Border `#334155` | ใช้ทั้งชุด + พื้นหน้า `#0A0E27` (midnight ของสไตล์ OLED) + `accent` `#60A5FA` |
| Fonts | JetBrains Mono (หัวข้อ) + IBM Plex Sans (เนื้อหา) | ใช้ตามนั้น + Noto Sans Thai เป็น fallback |
| Anti-pattern | Flat design without depth, Text-heavy pages | แยกชั้นด้วยพื้น 3 ระดับ + เส้นขอบ, ข้อความสั้น |

## หลักการ

1. **มืดทั้งหน้า** ไม่มีโหมดสว่าง ความลึกมาจากพื้น `surface` → `surface-raised` → `surface-muted` ไม่ใช้เงา
2. **Glow น้อยที่สุด** ใช้ `.glow` (text-shadow 12px) กับคำเน้นในหัวข้อ hero เพียงจุดเดียว
3. **ฟ้าอ่อน = เน้น, ฟ้าเข้ม = ปุ่ม** `accent` สำหรับข้อความ/ไอคอน, `primary` สำหรับพื้นปุ่ม (ข้อความขาว)
4. **เข้าถึงได้เป็นพื้นฐาน** contrast ≥ 4.5:1, focus ชัด, ปุ่มสูงอย่างน้อย 44px

## สี

| Token | Hex | ใช้กับ |
|---|---|---|
| `surface` | `#0A0E27` | พื้นหลังหน้า |
| `surface-raised` | `#0F172A` | nav, การ์ด section, ตาราง, ช่องกรอก |
| `surface-muted` | `#1E293B` | หัวตาราง, hover แถว, ปุ่มที่เลือก |
| `surface-inverse` | `#020617` | สำรอง (ยังไม่ใช้ในหน้า) |
| `text` | `#F1F5F9` | ตัวอักษรหลัก (17.4:1 บน surface, 13.4:1 บน muted) |
| `text-muted` | `#CBD5E1` | คำอธิบาย, placeholder (12.8:1 บน surface, 12.0:1 บน raised, 9.9:1 บน muted) |
| `text-inverse` | `#FFFFFF` | ข้อความบนปุ่ม primary |
| `border` | `#334155` | เส้นขอบตกแต่ง, เส้นแบ่ง (ตกแต่งเท่านั้น 1.7:1) |
| `border-strong` | `#94A3B8` | ขอบช่องกรอก ปุ่มรอง ป้ายรับรอง (7.0:1 บน raised) |
| `primary` / `primary-hover` | `#2563EB` / `#1D4ED8` | พื้นปุ่มหลัก (ขาวบน primary 5.2:1, บน hover 6.7:1) |
| `accent` | `#60A5FA` | ข้อความเน้น, ไอคอน, eyebrow, focus ring (7.5:1 บน surface, 5.8:1 บน muted) |
| `success` | `#4ADE80` | "มีสินค้า" (8.4:1 บน muted) |
| `warning` | `#FBBF24` | "สั่งจอง" (8.8:1) |
| `danger` | `#FCA5A5` | "หมด" (7.7:1) |

**ห้าม** hard-code hex หรือชื่อสี Tailwind ตรง ๆ · **ห้าม** ใช้ `danger` `#F87171` (3.7:1 บนแถว hover) · **ห้าม** ใช้ `border` เป็นขอบของช่องกรอกหรือปุ่ม (ใช้ `border-strong`)

## ตัวอักษร

หัวข้อและตัวเลข `JetBrains Mono` (class `font-heading`, และตั้ง `h1–h3` ใน `<style>`) · เนื้อหา `IBM Plex Sans` · fallback `Noto Sans Thai`

| บทบาท | Class |
|---|---|
| H1 | `text-4xl md:text-6xl font-bold leading-tight tracking-tight` (คำเน้น `glow text-accent`) |
| H2 | `text-2xl md:text-3xl font-bold tracking-tight` |
| H3 | `font-semibold` |
| เนื้อหา | `text-lg leading-relaxed text-text-muted` (hero) · `text-sm text-text-muted` (การ์ด) |
| Eyebrow | `font-heading text-sm font-medium tracking-widest text-accent` เขียนนำด้วย `// ` |
| ตัวเลขเด่น | `font-heading text-3xl font-bold tabular-nums` |
| Spec chip | `rounded border border-border px-2 py-1 font-heading text-xs` |
| SKU / ราคา | `font-heading` (SKU `text-text-muted`, ราคา `tabular-nums` ชิดขวา) |

## Component

**ปุ่มหลัก** `inline-flex min-h-[44px] items-center rounded-md bg-primary px-6 font-medium text-text-inverse hover:bg-primary-hover transition-colors`
**ปุ่มรอง** `rounded-md border border-border-strong hover:border-accent hover:text-accent`
**การ์ดหมวด** `rounded-lg border border-border bg-surface p-6` บนพื้น section `surface-raised` · hover `hover:border-accent` · มี spec chip ท้ายการ์ด
**แผงสเปกใน hero** การ์ด `font-heading text-sm` เลียนแบบเทอร์มินัล ใส่ `aria-hidden="true"` (ตกแต่ง — ข้อมูลจริงอยู่ที่แคตตาล็อก)
**Pill กรองหมวด** `<button aria-pressed>` ใน `role="group"`; เลือก = `border-accent bg-surface-muted text-accent`, ไม่เลือก = `border-border-strong text-text-muted`
**ช่องค้นหา** `min-h-[44px] border border-border-strong bg-surface-raised px-4 placeholder:text-text-muted` + `<label class="sr-only">`
**Focus** `focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface` (บนการ์ด `surface-raised` ใช้ `ring-offset-surface-raised`)

**สถานะสต็อก** จุด `●` (`aria-hidden`) + ข้อความ — มีสินค้า `text-success` · สั่งจอง `text-warning` · หมด `text-danger`

**ตาราง** ห่อ `overflow-x-auto rounded-lg border border-border bg-surface-raised`, `min-w-[720px]`, `<caption class="sr-only">`, หัว `bg-surface-muted text-text-muted` + `scope="col"`, เซลล์ `px-4 py-3`, แถว `hover:bg-surface-muted`, สถานะว่าง "ไม่พบสินค้าที่ตรงเงื่อนไข", จำนวนผลลัพธ์ใน `role="status" aria-live="polite"`

## ไอคอน

SVG เส้น 24×24, `stroke-width 1.6`, `h-6`–`h-7`, สี `text-accent`, `aria-hidden="true"` — ห้ามใช้ emoji

## Layout

- Container `mx-auto max-w-7xl px-6`
- Header แบบลอย `sticky top-4 z-50 mx-4 mt-4` + nav `h-16 rounded-lg border bg-surface-raised/90 backdrop-blur`; โลโก้เป็นข้อความ `nexora.it` (`.it` สี accent)
- ลำดับ section (Feature-Rich Showcase): Hero (`lg:grid-cols-[1.2fr_1fr]`, `py-20 lg:py-28`) → หมวดสินค้า (แถบ `surface-raised`) → เหตุผล 3 ข้อ + ตัวเลข → CTA ในกล่อง
- ช่องว่างใหญ่ตามสไตล์: section `py-20`, ระยะหัวข้อถึงเนื้อหา `mt-12`, กริด `gap-6`–`gap-12`
- CTA: ขอใบเสนอราคา (หลัก) ใน header, hero และท้ายหน้า · ป้ายรับรองเป็น placeholder ต้องแทนด้วยของจริง
- เช็คที่ 375 / 768 / 1024 / 1440px · ห้ามมี horizontal scroll ทั้งหน้า

## Interaction

- ทุกอย่างที่คลิกได้ใส่ `cursor-pointer` และ `min-h-[44px]`
- transition เฉพาะสี/ขอบ ห้าม scale ที่ทำให้ layout ขยับ
- เคารพ `prefers-reduced-motion` · มีลิงก์ "ข้ามไปยังเนื้อหา"

## เพิ่มหน้าใหม่

1. Tailwind CDN + Google Fonts (JetBrains Mono, IBM Plex Sans, Noto Sans Thai) ตามด้วย `<script src="hardware-c-tokens.js"></script>`
2. `<body class="bg-surface text-text font-sans antialiased">` + `<style>h1, h2, h3, .font-heading { font-family: 'JetBrains Mono', 'Noto Sans Thai', monospace; }</style>`
3. ใช้ header/footer เดียวกับหน้าที่มี · ใช้ชื่อ semantic เท่านั้น
4. ก่อนส่งงาน เช็ค: contrast (โดยเฉพาะสีสถานะบนแถว hover), focus มองเห็นบนพื้นมืด, ปุ่มสูง ≥ 44px, ไม่มี emoji, ไม่มี horizontal scroll

## ไฟล์

| ไฟล์ | หน้าที่ |
|---|---|
| [hardware-c-tokens.js](hardware-c-tokens.js) | design token + Tailwind config |
| [hardware-c-landing.html](hardware-c-landing.html) | landing page |
| [hardware-c-grid.html](hardware-c-grid.html) | แคตตาล็อก (ค้นหา, pill กรองหมวด) |
