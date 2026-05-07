# Text & Layout Module

> Tra cứu khi cần chọn bố cục text, hierarchy, shapes, decorative elements cho prompt thumbnail.

---

## Text Layout Variants

Chọn variant phù hợp với **mục đích nội dung** — không cố định 1 form.

| # | Variant | Khi nào dùng |
|---|---------|-------------|
| 1 | **Multi-Zone (A+B+C)** | Giáo dục, phỏng vấn, listicle — nhiều thông tin |
| 2 | **Minimal Impact** | Dramatic, warning, lifestyle — ấn tượng mạnh |
| 3 | **Big Number Anchor** | Tech, data, thống kê, "top X", "bao nhiêu %" |
| 4 | **Question Hook** | Educational, curiosity-gap, "tại sao", "làm sao" |
| 5 | **Stacked Headlines** | So sánh, before/after, 2 ý tương phản |
| 6 | **Checklist Card** | Tips, hướng dẫn, "X điều cần biết" |

> Có thể mix variant — ví dụ Stacked Headlines ở Zone A + CTA Bar ở bottom.

---

### Variant 1 — Multi-Zone (A+B+C)

```
Text:
  [Zone A - Title Block]
  "[LABEL]" in font-weight 700 white uppercase on solid [màu] banner, [vị trí];
  "[HEADLINE]" in font-weight 900 [màu] condensed, large, below banner;
  "[LABEL TÙY CHỌN]" (Tuỳ chọn) in font-weight 900 [màu] inside rounded pill badge, below headline;
  "[PHỤ ĐỀ]" in font-weight 600 [màu] italic, beside label badge;

  [Zone B - Feature Row]
  three feature items in horizontal row below title, each containing:
    small circular [màu] badge with white pictogram + label below;
  item 1: [icon] + "[FEATURE 1]" font-weight 600 [màu] small;
  item 2: [icon] + "[FEATURE 2]" font-weight 600 [màu] small;
  item 3: [icon] + "[FEATURE 3]" font-weight 600 [màu] small;

  [Zone C - CTA Bar]
  full-width semi-transparent [màu] frosted bar at bottom,
  [icon] + "[TAGLINE]" font-weight 600 [màu] small,
  "[KEYWORD]" in italic [màu accent];

  render exact text only.
```

---

### Variant 2 — Minimal Impact

```
Text:
  "[HEADLINE]" in font-weight 900 [màu] condensed sans-serif,
  [stroke], hard drop shadow, very large, placed on [vị trí] negative space;

  "[SUBTITLE]" in font-weight 600 [màu nhạt hơn], smaller, below headline;

  render exact text only.
```

---

### Variant 3 — Big Number Anchor

```
Text:
  "[SỐ]" in oversized font-weight 900 [màu accent],
  approximately 3× taller than headline, left-anchored;

  "[HEADLINE]" in font-weight 900 [màu] condensed, [stroke],
  stacked beside or below the large number;

  "[SUBTITLE]" in font-weight 600 [màu nhạt], smaller,
  with thin [màu] divider line above, below headline;

  render exact text only.
```

---

### Variant 4 — Question Hook

```
Text:
  "[CÂU HỎI]?" in font-weight 900 [màu] condensed, large,
  placed on [vị trí] negative space;

  "[GỢI MỞ / CONTEXT]" in font-weight 600 [màu nhạt] italic,
  smaller, below question;

  render exact text only.
```

---

### Variant 5 — Stacked Headlines

```
Text:
  "[DÒNG 1]" in font-weight 900 [màu 1] condensed, large,
  placed on [vị trí];

  "[DÒNG 2]" in font-weight 900 [màu 2 — khác màu 1] condensed,
  large, stacked directly below, creating visual contrast;

  "[DETAIL NHỎ]" in font-weight 600 [màu] smaller, below;

  render exact text only.
```

---

### Variant 6 — Checklist Card

```
Text:
  "[HEADLINE]" in font-weight 900 [màu] condensed, large,
  placed on [vị trí];

  "[LABEL]" (Tuỳ chọn) in font-weight 900 [màu accent]
  inside rounded pill badge, below headline;

  three checkmark lines:
  "✓ [item 1]" / "✓ [item 2]" / "✓ [item 3]"
  in font-weight 600 [màu] small, below badge;

  render exact text only.
```

---

## Hệ thống 3 Tầng Phân Cấp (Text Hierarchy)

> Áp dụng cho MỌI variant. Không để tất cả chữ cùng kích thước, cùng màu.

```
[Tầng 1 — Label / Badge]       Nhỏ, nền màu khối, gây chú ý trước
        ↓
[Tầng 2 — Headline]            To nhất, font-weight 900, màu nổi nhất
        ↓
[Tầng 3 — Supporting / Detail] Nhỏ hơn, màu nhạt hơn, bổ sung thông tin
```

---

## Text Background Shapes

| Shape | Keyword | Dùng khi nào |
|-------|---------|-------------|
| **Solid Banner** | `solid [màu] rectangular banner behind text, full-width` | Label tầng 1, tiêu đề phụ |
| **Pill Badge** | `rounded pill-shaped [màu] badge behind text, padding 8px` | Tag, label nhỏ |
| **Diagonal Slash** | `angled diagonal [màu] banner slash across left side` | Accent mạnh, cảnh báo |
| **Highlight Bar** | `thick [màu] horizontal highlight underline bar beneath headline` | Gạch chân tiêu đề |
| **Semi-transparent** | `[màu] semi-transparent frosted overlay panel, 70% opacity` | Nền phức tạp, text cần nổi |
| **Drop Shadow Panel** | `dark navy drop-shadow box behind text group, offset 6px` | Corporate, giáo dục |

---

## Accent Text Elements

| Element | Keyword | Hiệu ứng |
|---------|---------|----------|
| **Số lớn** | `"50+" in oversized font-weight 900 [màu], ~2× taller than headline` | Neo thị giác |
| **Label/Year Badge** | `"[LABEL]" in font-weight 900 [màu] inside rounded pill badge` | (Tuỳ chọn) Signaling cập nhật |
| **Checklist mini** | `"✓ [text]" / "✓ [text]" / "✓ [text]" in font-weight 600 small` | Liệt kê lợi ích |
| **Highlight Word** | `one word "[TỪ]" in bright [accent] to contrast rest in white` | Nhấn từ khóa |
| **Divider Line** | `thin 2px [màu] horizontal rule between label and headline` | Tách tầng |
| **Arrow** | `small right-pointing arrow "→" in [màu] before key word` | Urgency, CTA |

---

## Icon-Text Feature Row (Zone B)

**Icon Badge styles:**

| Kiểu | Keyword |
|------|--------|
| Tròn đặc | `small circular [màu] badge with white [icon] pictogram inside` |
| Vuông bo | `small rounded-square [màu] badge with white [icon] symbol` |
| Tròn viền | `small circle with [màu] outline, [icon] pictogram inside` |

**Icon Dictionary:**

| Niche | Icons |
|-------|-------|
| Phỏng vấn / HR | clipboard-list, speech-bubble, handshake, star, user-check |
| IT / Data | code-bracket, database, bar-chart, gear, terminal |
| Tài chính | coin-stack, trending-up-arrow, calculator, shield-check |
| Giáo dục | book-open, lightbulb, graduation-cap, pencil |
| Y tế | heart-pulse, stethoscope, shield-check, pill-capsule |
| Marketing | megaphone, target-bullseye, trending-up, globe |

---

## CTA / Tagline Bar (Zone C)

| Kiểu | Keyword | Dùng khi |
|------|---------|---------|
| **Frosted** | `full-width semi-transparent frosted [màu] bar at bottom` | Nền phức tạp |
| **Solid** | `solid [màu] horizontal bar full width at bottom` | Accent mạnh |
| **Gradient** | `gradient bar from [màu] to transparent at bottom` | Premium |
| **Accent Line** | `thin 3px [màu] accent line above bottom text` | Tối giản |

---

## Decorative Elements

> Thêm 1-2 element để nâng cấp từ "tạm được" → "chuyên nghiệp".

| Element | Keyword |
|---------|--------|
| **Accent Dots** | `three small [màu] dots vertically beside headline` |
| **Corner Lines** | `thin [màu] geometric lines at corner, 2 parallel 45°` |
| **Glow Halo** | `soft [màu] ambient glow behind headline` |
| **Thick Underline** | `thick 4px [màu] underline beneath "[TỪ]"` |
| **Divider Dots** | `dot separator "•" between tagline phrases` |
| **Icon Scatter** | `tiny scattered [icon] at 8% opacity in text background` |

---

## Layout & Composition Quick Ref

| Yêu cầu | Keyword |
|---------|--------|
| Text bên trái | `subject on the right, wide empty negative space on the left` |
| Text bên phải | `subject on the left, clean negative space on the right` |
| Text giữa | `center-framed subject, clean background at top/bottom for text` |
| Nền mờ nổi text | `shallow depth of field f/1.8, blurred background` |
