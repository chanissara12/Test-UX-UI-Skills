# Bonsai Kyo — Design Guide

เว็บ enterprise ขายต้นบอนไซ โทนญี่ปุ่นแบบ wabi-sabi: เรียบ สงบ เว้นที่ว่างมาก ใช้สีน้อย
Stack: plain HTML + Tailwind CDN · Token อยู่ที่ [tokens.js](tokens.js) (แก้ที่นั่นที่เดียว)

## หลักการ

1. **เรียบก่อน** ไม่ใช้ gradient, เงาหนัก หรือมุมโค้งมาก ใช้เส้นขอบบาง ๆ แทนเงา
2. **สีเน้นใช้น้อย** แดงชูใช้เป็นจุดเล็ก ๆ เท่านั้น (ตราประทับ, ตัวเลขข้อ, ปุ่ม CTA ในส่วนมืด)
3. **เว้นว่างให้หายใจ** section ห่างกัน `py-16`–`py-20`, container `max-w-6xl px-5`
4. **เข้าถึงได้เป็นพื้นฐาน** contrast ≥ 4.5:1, focus ชัด, ปุ่มสูงอย่างน้อย 44px

## สี

| Token | Hex | ใช้กับ |
|---|---|---|
| `surface` / `washi` | `#F7F4EC` | พื้นหลังหลัก |
| `surface-muted` / `kinari` | `#EDE8DA` | พื้นรอง, หัวตาราง, การ์ดสรุป |
| `text` / `sumi` | `#1F2421` | ตัวอักษรหลัก, พื้น section มืด |
| `text-muted` / `nezumi` | `#5A5F58` | ตัวอักษรรอง, คำอธิบาย |
| `primary` / `matcha` | `#4F6140` | ปุ่มหลัก, ลิงก์, สถานะ "พร้อมขาย" |
| `primary-hover` / `matcha-dark` | `#3B4A30` | hover ของปุ่มหลัก |
| `accent` / `shu` | `#A8402D` | จุดเน้น, สถานะ "จองแล้ว" |
| `accent-hover` / `shu-dark` | `#8F3524` | hover ของ accent |
| `border` / `line` | `#D9D3C2` | เส้นขอบ, เส้นแบ่ง |

**ห้าม** ใช้ `text-muted` บนพื้นสี `primary`/`accent` และห้ามใช้เทาอ่อนกว่า `text-muted` กับข้อความเนื้อหา
บนพื้นมืด (`sumi`) ใช้ `washi` หรือ `washi/75` เป็นข้อความรอง

## ตัวอักษร

| บทบาท | Class | หมายเหตุ |
|---|---|---|
| หัวข้อ | `font-serif` (Shippori Mincho + Noto Sans Thai) | ให้ความรู้สึกแบบหนังสือญี่ปุ่น |
| เนื้อหา | `font-sans` (Noto Sans Thai + Noto Sans JP) | `leading-relaxed` |

สเกล: H1 `text-4xl md:text-5xl` · H2 `text-3xl` · H3 `text-xl`/`text-lg` · เนื้อหา `text-base` · คำอธิบาย `text-sm`
Eyebrow (ข้อความเล็กเหนือหัวข้อ): `text-sm tracking-[0.3em] text-accent`
ตัวเลขในตาราง: `tabular-nums` และชิดขวา

## Component

**ปุ่มหลัก** `min-h-[44px] px-6 bg-primary text-text-inverse hover:bg-primary-hover transition-colors duration-200`
**ปุ่มรอง** `border border-text hover:bg-text hover:text-text-inverse` (ขนาดเท่าปุ่มหลัก)
**ปุ่ม CTA บนพื้นมืด** ใช้ `bg-accent hover:bg-accent-hover`
**มุม** เหลี่ยม ไม่ใช้ `rounded` ยกเว้นตราโลโก้วงกลม
**การ์ด** `bg-surface border border-border p-6/7` · hover เปลี่ยนสีเส้นเป็น `border-primary`
**ช่องกรอก** มี `<label for>` เสมอ, `min-h-[44px]`, `border border-border`
**Badge สถานะ** เส้นขอบ + พื้นโปร่ง 10% ของสีนั้น และมีข้อความกำกับเสมอ (ไม่ใช้สีอย่างเดียว)

| สถานะ | สไตล์ |
|---|---|
| พร้อมขาย | `bg-matcha/10 text-matcha-dark border-matcha/40` |
| จองแล้ว | `bg-shu/10 text-shu border-shu/40` |
| กำลังเตรียม | `bg-kinari text-nezumi border-line` |

**ตาราง** ห่อด้วย `overflow-x-auto`, `min-w` กันบีบ, หัวคอลัมน์เป็นปุ่มเรียงลำดับพร้อม `aria-sort`, มี `<caption class="sr-only">`, มีสถานะว่าง "ไม่พบรายการ"

## ไอคอนและภาพ

- ไอคอน SVG เส้น 24×24, `stroke-width 1.5`, `w-8 h-8` สีโทน `primary` — ห้ามใช้ emoji
- ตัวอักษรคันจิ (盆 松 楓 榕 梅 一二三四) ใช้เป็นลวดลายประดับ ใส่ `aria-hidden="true"`
- ภาพประกอบเป็น SVG วาดเอง สีจาก token; ถ้าใช้รูปถ่ายจริงต้องมี `alt` และ `loading="lazy"`

## Interaction

- ทุกอย่างที่คลิกได้ใส่ `cursor-pointer`
- transition `duration-200` เฉพาะสี/ขอบ ห้ามใช้ scale ที่ทำให้ layout ขยับ
- focus: `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2` สีตามปุ่ม
- เคารพ `prefers-reduced-motion` (ปิด transition และ smooth scroll)
- มีลิงก์ "ข้ามไปยังเนื้อหา" ที่หัวหน้า

## Responsive

เช็คที่ 375 / 768 / 1024 / 1440px · ห้ามมี horizontal scroll ของทั้งหน้า (ตารางเลื่อนเฉพาะกล่องตัวเอง)
กริด: มือถือ 1 คอลัมน์ → `sm:grid-cols-2` → `lg:grid-cols-4` ตามจำนวนการ์ด

## เพิ่มหน้าใหม่

1. ใส่ `<script src="https://cdn.tailwindcss.com"></script>` ตามด้วย `<script src="tokens.js"></script>`
2. ใช้ header/footer และ container เดียวกับหน้าที่มีอยู่
3. ใช้ชื่อสี semantic (`bg-primary`, `text-text-muted`) สำหรับโค้ดใหม่ ห้าม hard-code hex
4. ก่อนส่งงาน เช็ค: contrast, focus, ขนาดปุ่ม 44px, ไม่มี emoji, ไม่มี horizontal scroll

## ไฟล์ในโปรเจกต์

| ไฟล์ | หน้าที่ |
|---|---|
| [tokens.js](tokens.js) | design token + Tailwind config |
| [bonsai-landing.html](bonsai-landing.html) | landing page |
| [bonsai-inventory.html](bonsai-inventory.html) | หน้าตารางสต็อกสินค้า |
