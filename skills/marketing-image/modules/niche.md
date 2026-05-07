# Niche & Style Module

> Tra cứu background, props, lighting, camera, color palette theo niche.

---

## Environmental Layering — 3 Lớp Nền

```
[Layer 1 - Foreground]     Đạo cụ trên bàn / tay nhân vật
[Layer 2 - Mid-ground]     Môi trường xung quanh (kệ sách, tường, thiết bị)
[Layer 3 - Far Background] Cảnh xa: cửa sổ + skyline / tường texture
```

**Viết trong prompt:**
```
Background: [Mid-ground cụ thể], [Far background cụ thể],
[ánh sáng từ background ảnh hưởng lên subject]
```

### Background theo Niche

| Niche | Background |
|-------|-----------|
| Pháp lý | Mid: walnut bookshelf + law binders. Far: glass window, city skyline, golden hour |
| Tài chính | Mid: glass-walled office, blurred professionals. Far: financial district at dusk |
| IT / Tech | Mid: server rack / monitors + dashboards. Far: dark room, LED strips, blue glow |
| Giáo dục | Mid: whiteboard + formulas, certificates. Far: classroom window, warm light |
| Lifestyle | Mid: cozy cafe, string lights. Far: window + street view, golden afternoon |
| Y tế | Mid: medical equipment, anatomy posters. Far: hospital corridor, natural light |

---

## Narrative Props

> BẮT BUỘC ≥1 narrative prop có chữ/nhãn trong `Context:`.

```
a nameplate reading "[CHỦ ĐỀ]"
books with visible spine titles "[TÊN]"
a laptop screen displaying "[NỘI DUNG]"
a whiteboard with "[NỘI DUNG]"
a document with header "[TIÊU ĐỀ]"
```

| Niche | Props gợi ý |
|-------|------------|
| Pháp lý | Nameplate, sách luật, scales of justice, legal folder |
| Tài chính | Nameplate, laptop profit chart, calculator, gold coins |
| IT / Data | Monitor: Python/Jupyter, nameplate, book "Machine Learning" |
| Giáo dục | Textbook, whiteboard "CÔNG THỨC", red pen |
| Y tế | Clipboard "BỆNH ÁN", prescription pad, stethoscope |
| Marketing | Laptop: Analytics, presentation slide, business card |

---

## Lighting

| Thể loại | Keyword |
|----------|--------|
| Chuyên nghiệp | `three-point softbox, 5600K, key 45° upper-left, fill 30% right` |
| Dramatic / Tech | `Chiaroscuro, harsh single hard key light, deep shadows` |
| Lifestyle | `golden hour backlighting, warm 3200K, soft rim light` |
| Minimal | `even flat studio lighting, white backdrop, no shadows` |
| Corporate | `warm ambient, tungsten 3400K overhead, soft window sidelight` |

---

## Camera

| Mục tiêu | Keyword |
|----------|--------|
| Warm, film-like | `Fujifilm X-T5, natural film color science` |
| Professional portrait | `Sony A7R V, 85mm, f/1.8` |
| Vlog / lifestyle | `Canon EOS R6, 35mm, f/2.0, handheld` |
| Editorial | `Hasselblad medium format, ultra-sharp` |
| Corporate | `Canon EOS R5, 50mm, f/2.8, eye-level` |

---

## Color Psychology

| Niche | Palette | Lý do |
|-------|---------|-------|
| Tài chính | Deep green + gold | Thịnh vượng |
| Công nghệ / AI | Electric blue + orange | High-tech |
| Lifestyle | Warm orange + cream | Gần gũi |
| Warning | Red + black + white | Khẩn cấp |
| Sức khỏe | Soft teal + white | An toàn |
| Giáo dục | Navy blue + yellow | Uy tín |
| Pháp lý | Navy + gold + white | Tin cậy |

---

## Thumbnail Formats

| Format | Khi nào | Layout |
|--------|---------|--------|
| Direct Look | Personal brand | Nhìn thẳng camera, biểu cảm mạnh |
| Reaction | Review, reveal | Nhìn vào object, phản ứng |
| Before/After | How-to | Split trái/phải hoặc arrow |
| Question Hook | Educational | Text câu hỏi, tò mò |
| Warning/Alert | Finance, health | Leaning forward + red accent |
| Two-Person | Phỏng vấn, tư vấn | Chính rõ nét + phụ blurred |

---

## Branding & Logo

1. **Mô tả**: `small blue circular logo at top right corner`
2. **Placeholder**: `leave clean 120x120px empty space at top-right`
3. **Gắn đạo cụ**: `coffee mug featuring [Brand] logo`
4. **Text giả lập**: `"[Brand]" in small corporate sans-serif at top-left`
