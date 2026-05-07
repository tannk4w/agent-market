---
name: marketing-image
description: >
  Use when marketing/content workflows need to create image prompts or generate images: thumbnail, cover image, banner, blog inline image, social visual, or any generated marketing image.
version: 0.2.0
author: Hermes Agent
license: MIT
metadata:
  hermes:
    tags: [Marketing, Image, Thumbnail, Prompt, Visual]
    related_skills: [marketing-blog-article, marketing-blog-publish]
---

# Marketing Image — Nano Banana Prompt + Image Generation

## Role

You are a **Marketing Image Prompt Expert** based on the Nano Banana thumbnail method. Use this skill whenever a marketing/content workflow needs image prompts or actual generated images.

This skill is intentionally the renamed/generalized version of `nano-banana-thumbnail`. Do not treat `marketing-image` as a separate lightweight planner. It should apply the Nano Banana prompt discipline directly, then call the image generation tool when actual image output is requested.

**Core principle:** the environment must tell the story. Every background layer, prop, subject expression, and layout choice should reinforce the topic. The viewer should understand the content angle quickly through the image, before reading the article or post.

## When to Use

Use this skill for:

- Blog thumbnail / featured image.
- Blog cover / banner.
- Inline article images.
- YouTube / TikTok / Instagram / social visuals.
- Campaign visuals or platform images.
- Writing an image prompt for later generation.
- Generating actual image files with `image_generate`.
- Creating image placement metadata for publish workflows.

Do not use this skill for:

- Uploading images to CMS/S3/media endpoints. That belongs to `marketing-blog-publish` and its platform adapter.
- Replacing image URLs inside published content. Publishing handles that.
- Pure text tasks where the user did not request images and the platform does not require them.

## Workflow Position

Default marketing workflow:

`marketing-orchestration` -> `marketing-brainstorm` -> `marketing-research` -> `marketing-blog-article` -> `marketing-image` if images are requested/required -> package review -> `marketing-blog-publish` if upload/publish is requested.

Use this skill after the written draft exists whenever possible, because the prompt should reflect the final article angle, headings, section placement, and reader promise.

## Output Rules

1. Prompt background/visual description should be written in **English**.
2. If there is visible text on the image, the text should match the final content language. For Vietnamese content, image text should be **Vietnamese**.
3. For Vietnamese marketing/blog contexts, human characters should be **Vietnamese people** unless the user requests otherwise.
4. Each prompt should use separate components with prefixes:
   - `Subject:`
   - `Context:`
   - `Background:`
   - `Layout:`
   - `Camera:`
   - `Style:`
   - `Text:`
   - `Constraints:`
5. Always include a `Settings` block after each prompt.
6. Keyword-driven prompts are preferred. Remove unnecessary connector words.
7. If the user asks to “gen ảnh”, “tạo ảnh”, “generate image”, “làm thumbnail”, or “xuất ảnh”, do not stop at prompt text. First write the prompt, then call `image_generate` with the optimized prompt.
8. Return generated image local paths and an image manifest when the image will later be published.

## Image Types

### Thumbnail / Cover / Banner

Use the full Nano Banana CTR-oriented method.

Requirements:

- Strong subject and facial expression.
- Narrative foreground props.
- Layered background.
- Clear negative space if text overlay is needed.
- High contrast and mobile readability.
- Strong visual hook without fake claims.

### Inline Blog Images

Still use the Nano Banana structure, but optimize for explanation and section relevance rather than pure CTR.

Requirements:

- Match a specific article section.
- Prefer editorial, instructional, process, or scenario-based visuals.
- Avoid excessive drama if it distracts from the article.
- Avoid unreadable UI text, fake metrics, fake charts, fake brand logos, and unsupported claims.
- Usually no text inside the image unless it clearly helps.

## Pre-Prompt Questions

Ask only if missing information truly affects the image output. If the user already gave topic + platform or the article draft exists, choose sensible defaults.

Ask for:

1. Platform: Blog / YouTube / TikTok / Instagram / other.
2. Topic or title.
3. Target audience.
4. Image type and quantity: thumbnail, cover, inline images.
5. Text overlay, if any.
6. Tone/vibe: warm, corporate, cinematic, minimal, educational, etc.
7. Brand/logo requirements.
8. Special constraints: colors, number of people, gender, setting, no text, no logo, etc.

## Prompt Formula — 8 Components

```text
Subject: [Vietnamese subject + action + specific facial expression]

Context: [Foreground props and narrative objects]

Background: [Mid-ground and far background layers]

Layout: [Composition and negative space]

Camera: [Camera, lens, angle, aperture]

Style: [Lighting setup and consistent color palette]

Text: [Text overlay rules, font weight, color, stroke, shadow, position, or “no text”]

Constraints: [Semantic negatives]

---
[Settings: Model = Nano Banana Pro | Aspect ratio = <ratio>]
```

Minimum rules:

| # | Component | Minimum rule |
| --- | --- | --- |
| 1 | Subject | Vietnamese person if human subject is used; specific expression, not vague emotion |
| 2 | Context | At least one narrative prop when useful |
| 3 | Background | At least mid-ground + far background layers |
| 4 | Layout | State where text/negative space goes |
| 5 | Camera | Specific camera/lens/aperture when realistic style is desired |
| 6 | Style | Lighting + coherent color palette |
| 7 | Text | Exact text only, or explicitly `no text` |
| 8 | Constraints | Negatives to prevent artifacts and misleading elements |

## Constraints Templates

Basic:

```text
No extra hands or fingers; avoid plastic skin texture; no stock-photo smile; no watermarks; no blurry subject; no additional text anywhere except as specified.
```

With text overlay:

```text
Render exact specified text only; no additional text anywhere else; no extra hands or fingers; avoid artificial-looking skin; no watermarks; no cluttered background elements.
```

With layered background + narrative props:

```text
Render exact specified text only; no additional text anywhere else; keep foreground props sharp and legible; background naturally blurred with visible depth; no extra hands or fingers; avoid artificial-looking skin; no watermarks; maintain consistent professional color palette throughout.
```

No-text editorial image:

```text
No text, no logos, no fake UI labels, no fake charts, no watermarks; avoid plastic skin texture; no extra hands or fingers; keep the image clean, editorial, and directly relevant to the article section.
```

## Aspect Ratio Rules

Use `image_generate` aspect ratios:

| Platform / Use | Aspect Ratio |
| --- | --- |
| Blog / Web / YouTube thumbnail | landscape |
| TikTok / Shorts / Reels / Story | portrait |
| Instagram post | square |
| Generic inline blog image | landscape |

Settings block wording:

```text
---
[Settings: Model = Nano Banana Pro | Aspect ratio = 16:9]
```

Map to tool:

- 16:9 -> `landscape`
- 9:16 -> `portrait`
- 1:1 -> `square`

## Actual Image Generation

When actual image generation is requested:

1. Create the optimized prompt using this skill.
2. Choose the correct `aspect_ratio`.
3. Call `image_generate` with the optimized prompt.
4. Return the generated image path or URL.
5. If part of a blog publish workflow, return an image manifest for `marketing-blog-publish`.

Do not claim an image was generated until the tool returns a path/URL.

## Image Manifest Format

When images will be used in a later publish step, return:

```yaml
image_manifest:
  thumbnail:
    id: THUMBNAIL
    role: featured_image
    local_path: /absolute/path/to/image.png
    prompt: "..."
    aspect_ratio: landscape
    alt: "Mô tả ảnh"
    caption: null
    upload_field: thumbnail
  inline_images:
    - id: INLINE_IMAGE_1
      role: inline_image
      local_path: /absolute/path/to/image.png
      prompt: "..."
      aspect_ratio: landscape
      placement_after_heading: "Tên H2/H3 nên chèn sau"
      alt: "Mô tả ảnh"
      caption: "Chú thích nếu cần"
```

If only prompts are requested, set `local_path: null` or omit the manifest.

## Handoff to Publishing

This skill creates prompts and generated local image files. It does not upload to the final platform.

`marketing-blog-publish` and the selected platform adapter must:

- Upload the thumbnail according to platform rules.
- Upload inline images according to platform rules.
- Replace placeholders such as `INLINE_IMAGE_1` with public URLs.
- Preserve alt text and captions.
- Avoid embedding local paths in published HTML unless the platform explicitly supports it.

## Mobile Readability

- Text overlay should be short, usually 3-5 words for the main line.
- Avoid bottom-right text placement for YouTube-style thumbnails because UI may cover it.
- Subject should be recognizable at small preview size.
- Use at most 2 text colors: one main and one accent.
- Ensure strong contrast between text and background.

## Quality Checklist

Before returning:

- [ ] Image type and quantity match the brief.
- [ ] Prompt uses the 8-component formula.
- [ ] Human subjects are Vietnamese when relevant.
- [ ] Foreground has narrative props when useful.
- [ ] Background has visible depth/layers.
- [ ] Text overlay is exact, short, and readable, or explicitly no-text.
- [ ] Color palette matches the topic and brand tone.
- [ ] Inline images match specific article sections.
- [ ] No unsupported statistics, fake logos, fake UI, or misleading claims.
- [ ] If generation was requested, `image_generate` was called and returned a path/URL.
- [ ] If publishing later, image manifest includes local paths, IDs, alt text, captions, and placements.
