# Nexora IT — Design Guide (แบบ A: Monochrome)

เว็บ enterprise ขายอุปกรณ์คอมพิวเตอร์ให้องค์กร โทน professional เรียบ น่าเชื่อถือ ใช้สีเดียว (โมโนโครม)
Stack: plain HTML + Tailwind CDN · Token อยู่ที่ [hardware-tokens.js](hardware-tokens.js) (แก้ที่นั่นที่เดียว)

## หลักการ

1. **เรียบและตรงไปตรงมา** ไม่ใช้ gradient, เงาหนัก หรือสีสด ใช้เส้นขอบบาง ๆ แทนเงา
2. **ไม่มีสี accent** ลำดับความสำคัญใช้ขนาดและน้ำหนักตัวอักษร ไม่ใช้สี (สีมีไว้บอกสถานะเท่านั้น)
3. **ข้อมูลมาก่อนตกแต่ง** ตัวเลข ตาราง และสเปกต้องอ่านง่ายก่อนสวย
4. **เข้าถึงได้เป็นพื้นฐาน** contrast ≥ 4.5:1, focus ชัด, ปุ่มสูงอย่างน้อย 44px

## สี

| Token | Hex | ใช้กับ |
|---|---|---|
| `surface` | `#FAFAF9` | พื้นหลังหน้า |
| `surface-raised` | `#FFFFFF` | การ์ด, ตาราง, ช่องกรอก, แถบตัวเลข |
| `surface-muted` | `#F5F5F4` | หัวตาราง, hover แถว/ปุ่มบนพื้นขาว |
| `surface-inverse` | `#1C1917` | พื้น section มืด |
| `text` | `#0C0A09` | ตัวอักษรหลัก |
| `text-muted` | `#57534E` | คำอธิบาย, ข้อความรอง (7.3:1 บน surface, 7.6:1 บนขาว) |
| `text-inverse` | `#FFFFFF` | ข้อความบนพื้นมืด/primary |
| `border` | `#E7E5E4` | เส้นขอบ, เส้นแบ่ง |
| `border-strong` | `#78716C` | ขอบช่องกรอก ปุ่มรอง ป้ายรับรอง (4.8:1 บนขาว — ขอบ UI ต้อง ≥ 3:1) |
| `primary` / `primary-hover` | `#1C1917` / `#44403C` | ปุ่มหลัก |
| `success` | `#166534` | สต็อก "มีสินค้า" (7.1:1) |
| `warning` | `#92400E` | สต็อก "สั่งจอง" (7.1:1) |
| `danger` | `#991B1B` | สต็อก "หมด" (8.3:1) |

**ห้าม** hard-code hex หรือใช้ชื่อสี Tailwind ตรง ๆ (`stone-600`) ในหน้า ให้ใช้ชื่อ semantic
**ห้าม** ใช้สีทอง `#CA8A04` เป็นข้อความหรือพื้นปุ่มขาว เพราะ contrast ~3.3:1 ไม่ผ่าน
บนพื้นมืดใช้ `text-text-inverse` หรือ `text-text-inverse/75` เป็นข้อความรอง

## ตัวอักษร

ฟอนต์เดียว: `font-sans` = Inter + Noto Sans Thai (ใช้ทั้งหัวข้อและเนื้อหา)

| บทบาท | Class |
|---|---|
| H1 | `text-4xl md:text-5xl font-bold tracking-tight leading-tight` |
| H2 | `text-2xl md:text-3xl font-bold tracking-tight` |
| H3 | `font-semibold` |
| เนื้อหา | `text-base leading-relaxed text-text-muted` (ลีด: `text-lg`) |
| คำอธิบาย | `text-sm text-text-muted` |
| Eyebrow | `text-sm font-medium uppercase tracking-widest text-text-muted` |
| ตัวเลขเด่น | `text-3xl font-bold` · ในตาราง `tabular-nums` ชิดขวา |
| SKU | `font-mono text-text-muted` |

## Component

**ขนาดคลิก** ทุกปุ่มและลิงก์ใน nav ต้อง `min-h-[44px]`
**ปุ่มหลัก** `rounded-md bg-primary text-text-inverse hover:bg-primary-hover px-6 py-3 font-medium transition-colors`
**ปุ่มรอง** `rounded-md border border-border-strong bg-surface-raised hover:border-text` (ขนาดเท่าปุ่มหลัก)
**ปุ่มบนพื้นมืด** `bg-surface-raised text-text hover:bg-surface-muted`
**มุม** `rounded-md` ปุ่ม/ช่องกรอก · `rounded-lg` การ์ดและตาราง
**การ์ด** `rounded-lg border border-border bg-surface-raised p-6` · hover `hover:border-text`
**ช่องกรอก** มี `<label for>` เสมอ (ซ่อนด้วย `sr-only` ได้ถ้ามี placeholder อธิบาย), `px-4 py-3`, `border border-border-strong bg-surface-raised`
**Focus** `focus:outline-none focus-visible:ring-2 focus-visible:ring-text focus-visible:ring-offset-2` (บนพื้นมืด ring เป็น `surface-raised`)

**สถานะสต็อก** จุด `●` (`aria-hidden`) + ข้อความ สีตาม token — ห้ามใช้สีอย่างเดียว

| สถานะ | สี |
|---|---|
| มีสินค้า | `text-success` |
| สั่งจอง | `text-warning` |
| หมด | `text-danger` |

**ตาราง** ห่อ `overflow-x-auto rounded-lg border border-border bg-surface-raised`, `min-w-[720px]`, `<caption class="sr-only">`, หัว `bg-surface-muted` + `scope="col"`, แถว `divide-border hover:bg-surface-muted`, มีสถานะว่าง "ไม่พบสินค้าที่ตรงเงื่อนไข", จำนวนผลลัพธ์ใน `role="status" aria-live="polite"`

## ไอคอน

SVG เส้น 24×24, `stroke-width 1.6`, `h-7 w-7`, `currentColor`, `aria-hidden="true"` — ห้ามใช้ emoji

## Layout

- Container `mx-auto max-w-7xl px-6` ทุกหน้า
- ลำดับ section ของ landing (pattern Enterprise Gateway): Hero → ตัวเลข → อุตสาหกรรม → หมวดสินค้า → บทบาท → โลโก้ลูกค้า/การรับรอง → Contact Sales
- CTA: Contact Sales (หลัก) + เข้าสู่ระบบ (รอง) ใน header
- โลโก้ลูกค้าและป้ายรับรองในไฟล์เป็น placeholder ต้องแทนด้วยของจริง
- Section `py-20` (hero `py-20 md:py-28`), แบ่ง section ด้วย `border-y border-border` สลับพื้น `surface` / `surface-raised`
- Header แบบลอย `sticky top-4 z-50 mx-4 mt-4` + nav `h-16 rounded-lg border border-border bg-surface-raised/90 backdrop-blur` (ไม่ชิดขอบจอ)
- กริดการ์ด: `gap-6` · 1 คอลัมน์ → `sm:grid-cols-2` → `lg:grid-cols-4`
- เช็คที่ 375 / 768 / 1024 / 1440px · ห้ามมี horizontal scroll ทั้งหน้า (ตารางเลื่อนเฉพาะกล่องตัวเอง)

## Interaction

- ทุกอย่างที่คลิกได้ใส่ `cursor-pointer`
- transition เฉพาะสี/ขอบ (`transition-colors`, ค่าเริ่มต้น 150ms) ห้าม scale ที่ทำให้ layout ขยับ
- เคารพ `prefers-reduced-motion` (ปิด transition และ smooth scroll)
- มีลิงก์ "ข้ามไปยังเนื้อหา" ที่หัวหน้า

## เพิ่มหน้าใหม่

1. ใส่ Tailwind CDN + Google Fonts (Inter, Noto Sans Thai) ตามด้วย `<script src="hardware-tokens.js"></script>`
2. `<body class="bg-surface text-text font-sans antialiased">` + header/footer เดียวกับหน้าที่มี
3. ใช้ชื่อ semantic เท่านั้น
4. ก่อนส่งงาน เช็ค: contrast, focus, ปุ่มสูง ≥ 44px, ไม่มี emoji, ไม่มี horizontal scroll

## ไฟล์

| ไฟล์ | หน้าที่ |
|---|---|
| [hardware-tokens.js](hardware-tokens.js) | design token + Tailwind config |
| [hardware-landing.html](hardware-landing.html) | landing page |
| [hardware-grid.html](hardware-grid.html) | แคตตาล็อก (ตาราง ค้นหา กรอง) |

## แบบอื่นที่เทียบกัน

โครงหน้าและ component เหมือนกัน ต่างที่ token กับฟอนต์: [แบบ B Trust Blue](hardware-b-design.md) · [แบบ C Dark Tech](hardware-c-design.md)
