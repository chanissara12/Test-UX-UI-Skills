# Nexora IT — Design Guide (แบบ B: Data-Dense Dashboard)

เว็บ enterprise ขายอุปกรณ์คอมพิวเตอร์ เน้น "เห็นข้อมูลเยอะในที่เดียว" สำหรับฝ่ายจัดซื้อและทีม IT ที่เปรียบเทียบรายการเป็นหลัก
Stack: plain HTML + Tailwind CDN · Token อยู่ที่ [hardware-b-tokens.js](hardware-b-tokens.js) (แก้ที่นั่นที่เดียว)

## ที่มา (ผลจาก ui-ux-pro-max)

| หัวข้อ | ผลที่ skill ให้ | ที่ใช้ |
|---|---|---|
| Pattern | Enterprise Gateway | ใช้ครบ: Hero → อุตสาหกรรม → บทบาท → โลโก้ลูกค้า → Contact Sales (เพิ่มแถว KPI และหมวดสินค้า) |
| Style | Data-Dense Dashboard | ใช้: padding น้อย, KPI card, ตารางหนาแน่น, row highlight, ตัวกรองและเรียงลำดับ |
| Colors | B2B Service: Primary `#0F172A`, Secondary `#334155`, CTA `#0369A1`, BG `#F8FAFC`, Text `#020617`, Border `#E2E8F0` | ใช้ค่าเดิมทุกตัว |
| Fonts | Dashboard Data: Fira Code (หัวข้อ/ตัวเลข) + Fira Sans (เนื้อหา) | ใช้ตามนั้น + Noto Sans Thai เป็น fallback |
| Anti-pattern | Ornate design, No filtering | ไม่ตกแต่งเกินจำเป็น, grid มีค้นหา/กรอง/เรียงลำดับ |

ส่วนที่ปรับเพิ่มจากค่าของ skill: `border-strong` `#64748B` (ขอบช่องกรอกต้อง ≥ 3:1), สีสถานะ 3 สี

## หลักการ

1. **ข้อมูลหนาแน่นแต่อ่านง่าย** padding `p-3`–`p-4`, แถวตาราง `py-2`, ตัวอักษรตาราง `text-sm`
2. **สีเดียวสำหรับการกระทำ** `primary` (ฟ้า) ใช้กับปุ่ม ไอคอนหมวด และ focus เท่านั้น
3. **ตัวเลขเป็นพระเอก** KPI และราคาใช้ Fira Code + `tabular-nums`
4. **เข้าถึงได้เป็นพื้นฐาน** contrast ≥ 4.5:1, focus ชัด, ปุ่มสูงอย่างน้อย 44px (แม้ในหน้าหนาแน่น)

## สี

| Token | Hex | ใช้กับ |
|---|---|---|
| `surface` | `#F8FAFC` | พื้นหลังหน้า |
| `surface-raised` | `#FFFFFF` | การ์ด, ตาราง, ช่องกรอก |
| `surface-muted` | `#F1F5F9` | หัวตาราง, hover แถว/ปุ่ม |
| `surface-inverse` | `#0F172A` | section Contact Sales |
| `text` | `#020617` | ตัวอักษรหลัก (19.3:1 บน surface) |
| `text-muted` | `#334155` | คำอธิบาย (9.9:1 บน surface, 10.4:1 บนขาว, 9.5:1 บน muted) |
| `text-inverse` | `#FFFFFF` | ข้อความบน primary / inverse (5.9:1 / 17.9:1) |
| `border` | `#E2E8F0` | เส้นขอบตกแต่ง, เส้นแบ่ง |
| `border-strong` | `#64748B` | ขอบช่องกรอก ปุ่มรอง ป้ายรับรอง (4.8:1 บนขาว, 4.6:1 บน surface) |
| `primary` / `primary-hover` | `#0369A1` / `#075985` | ปุ่มหลัก, ไอคอน, focus (ขาวบน primary 5.9:1, บน hover 7.6:1) |
| `success` | `#166534` | "มีสินค้า" (6.5:1 บน muted) |
| `warning` | `#92400E` | "สั่งจอง" (6.5:1) |
| `danger` | `#991B1B` | "หมด" (7.6:1) |

**ห้าม** hard-code hex หรือชื่อสี Tailwind ตรง ๆ ให้ใช้ชื่อ semantic · บนพื้น `surface-inverse` ข้อความรองใช้ `text-text-inverse/80` (11.7:1)

## ตัวอักษร

หัวข้อและตัวเลข `Fira Code` (class `font-heading`, และตั้ง `h1–h3` ใน `<style>`) · เนื้อหา `Fira Sans` · fallback `Noto Sans Thai`

| บทบาท | Class |
|---|---|
| H1 | `text-3xl md:text-4xl font-bold leading-tight tracking-tight` |
| H2 | `text-xl md:text-2xl font-semibold tracking-tight` |
| H3 | `font-semibold` |
| เนื้อหา | `leading-relaxed text-text-muted` · คำอธิบายการ์ด `text-sm` |
| Eyebrow / label | `font-heading text-xs font-medium uppercase tracking-widest text-text-muted` |
| KPI | `font-heading text-2xl font-semibold tabular-nums` (label `text-xs text-text-muted`) |
| SKU | `font-heading text-xs text-text-muted` |

## Component

**ปุ่มหลัก** `inline-flex min-h-[44px] items-center rounded-md bg-primary px-5 font-medium text-text-inverse hover:bg-primary-hover transition-colors`
**ปุ่มรอง** `rounded-md border border-border-strong bg-surface-raised hover:border-text`
**KPI card** `rounded-lg border border-border bg-surface-raised p-3/p-4` ใน `<dl>` (`dt` = label, `dd` = ตัวเลข)
**การ์ด** `rounded-lg border border-border bg-surface-raised p-4` · ลิงก์ hover `hover:border-primary`
**ช่องกรอก / select** `min-h-[44px] rounded-md border border-border-strong bg-surface-raised px-3 text-sm` + `<label class="sr-only" for>`
**Focus** `focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`

**สถานะสต็อก** จุด `●` (`aria-hidden`) + ข้อความ — ห้ามใช้สีอย่างเดียว: มีสินค้า `text-success` · สั่งจอง `text-warning` · หมด `text-danger`

**ตาราง (Data-Dense)** ห่อ `overflow-x-auto rounded-lg border border-border`, `min-w-[720px]`, `<caption class="sr-only">`, เซลล์ `px-4 py-2`, หัว `bg-surface-muted text-xs`
- หัวคอลัมน์เป็น `<button class="min-h-[44px]">` ใน `<th scope="col" aria-sort>` คลิกเพื่อเรียงลำดับ (▲ ▼ ใส่ `aria-hidden`)
- แถว `hover:bg-surface-muted` · สถานะว่าง "ไม่พบสินค้าที่ตรงเงื่อนไข"
- KPI ด้านบนนับตามตัวกรองปัจจุบัน · ปุ่ม "ล้างตัวกรอง" · จำนวนผลลัพธ์ใน `role="status" aria-live="polite"`

## ไอคอน

SVG เส้น 24×24, `stroke-width 1.6`, `h-5`–`h-6`, `currentColor`, `aria-hidden="true"` — ห้ามใช้ emoji

## Layout

- Container `mx-auto max-w-7xl px-4 sm:px-6`
- Header แบบลอย `sticky top-4 z-50 mx-4 mt-4` + nav `h-14 rounded-lg border bg-surface-raised/90 backdrop-blur`
- Section `py-12` แบ่งด้วย `border-t border-border` · Hero สองคอลัมน์ (ข้อความ + ตารางสต็อกตัวอย่าง) `lg:grid-cols-2`
- CTA: Contact Sales (หลัก) + เข้าสู่ระบบ (รอง) ใน header
- โลโก้ลูกค้าและป้ายรับรองเป็น placeholder ต้องแทนด้วยของจริง
- กริดการ์ด `gap-3` · 1 → `sm:grid-cols-2` → `lg:grid-cols-4`
- เช็คที่ 375 / 768 / 1024 / 1440px · ห้ามมี horizontal scroll ทั้งหน้า

## Interaction

- ทุกอย่างที่คลิกได้ใส่ `cursor-pointer` และ `min-h-[44px]`
- transition เฉพาะสี/ขอบ ห้าม scale ที่ทำให้ layout ขยับ
- เคารพ `prefers-reduced-motion` · มีลิงก์ "ข้ามไปยังเนื้อหา"

## เพิ่มหน้าใหม่

1. Tailwind CDN + Google Fonts (Fira Code, Fira Sans, Noto Sans Thai) ตามด้วย `<script src="hardware-b-tokens.js"></script>`
2. `<body class="bg-surface text-text font-sans antialiased">` + `<style>h1, h2, h3, .font-heading { font-family: 'Fira Code', 'Noto Sans Thai', monospace; }</style>`
3. ใช้ header/footer เดียวกับหน้าที่มี · ใช้ชื่อ semantic เท่านั้น
4. ก่อนส่งงาน เช็ค: contrast, focus, ปุ่มสูง ≥ 44px, ไม่มี emoji, ไม่มี horizontal scroll

## ไฟล์

| ไฟล์ | หน้าที่ |
|---|---|
| [hardware-b-tokens.js](hardware-b-tokens.js) | design token + Tailwind config |
| [hardware-b-landing.html](hardware-b-landing.html) | landing page |
| [hardware-b-grid.html](hardware-b-grid.html) | แคตตาล็อก (KPI, ค้นหา, กรอง, เรียงลำดับ) |
