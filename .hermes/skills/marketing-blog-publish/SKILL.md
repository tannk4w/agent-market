---
name: marketing-blog-publish
description: "Use when a completed marketing/blog content package must be prepared for upload or pushed to a website/CMS/API, using a platform adapter instead of hard-coded platform logic."
version: 0.3.0
author: Hermes Agent
license: MIT
metadata:
  hermes:
    tags: [Marketing, Blog, Publish, CMS, API]
    related_skills: [marketing-blog-article, marketing-image]
---

# Marketing Blog Publish

## Overview

Use this skill as the publishing and publish-preparation step for completed blog/content packages. It receives final content from `marketing-blog-article`, optional image assets from `marketing-image`, then prepares or pushes the package to a destination platform.

This skill should stay platform-neutral. Do not hard-code one platform's API rules in the main `SKILL.md`. For each destination, load the matching platform adapter from `references/platforms/` and follow that adapter's instructions.

## When to Use

Use when the user asks to:

- Upload, publish, push, or create a draft on a website/platform/CMS.
- Prepare final API/CMS fields for a specific destination.
- Convert a completed blog draft into a platform-ready content package.
- Upload thumbnail and inline images as part of a publish flow.

Do not use when:

- The user only asks for a draft and does not want platform-ready fields.
- The content is not ready; return to `marketing-blog-article` first.
- Images still need to be generated; use `marketing-image` first.

## Workflow Position

Default order:

`marketing-orchestration` -> `marketing-brainstorm` -> `marketing-research` -> `marketing-blog-article` -> `marketing-image` if images are requested/required -> package review -> `marketing-blog-publish` if upload/publish is requested.

Publishing receives completed text and generated image assets. It should not invent the article angle, write image prompts, or generate images. It may upload images and replace placeholders according to the platform adapter.

## Platform Adapter Rule

Before publishing or preparing platform-specific fields:

1. Identify the destination platform from the user request, handoff, API endpoint, or brand/post template.
2. Load the matching adapter from `references/platforms/{platform}.md` with `skill_view(name='marketing-blog-publish', file_path='references/platforms/{platform}.md')`.
3. Follow the adapter exactly for:
   - API endpoint.
   - authentication.
   - required fields.
   - content format.
   - thumbnail upload.
   - inline image upload.
   - error handling.
   - known pitfalls.
4. If no adapter exists, do not guess. Ask for platform API docs or offer to create a new adapter file.

Current adapter:

- `references/platforms/x-interview.md` — x-interview API, thumbnail field, CKEditor inline image upload, HTML formatting, auth header, status mapping.

Supporting references:

- `references/x-interview-successful-blog-publish-2026-05-06.md` — compact known-good example of a successful x-interview draft publish with thumbnail plus CKEditor inline image upload.

## Input Contract

Expected handoff from orchestration/article/image steps:

```yaml
platform: x-interview
publish_intent: draft | publish | prepare_only
title: "..."
slug: "..."
content_markdown: "optional markdown source"
content_html: "preferred final HTML if already converted"
excerpt: "..."
status: 0
published_at: YYYY-MM-DD
meta_title: "..."
meta_description: "..."
meta_keywords: "..."
tags: ["..."]
author_id: null
image_manifest:
  thumbnail:
    local_path: /absolute/path/to/thumbnail.png
    alt: "..."
  inline_images:
    - id: INLINE_IMAGE_1
      local_path: /absolute/path/to/image.png
      alt: "..."
      caption: "..."
api_key_env: X-INTERVIEW-KEY
```

Minimum required fields for API publishing are platform-dependent, but usually include:

- title
- slug
- content
- status/publish state
- published_at or schedule date
- meta_title
- meta_description
- authentication source

## General Publish Procedure

1. Validate that the content package is complete.
2. Load the destination platform adapter.
3. Normalize publish intent:
   - `prepare_only`: produce fields but do not call API.
   - `draft`: create draft / status=0 when supported.
   - `publish`: publish live / status=1 when supported.
4. Prepare content format required by the adapter:
   - HTML, Markdown, JSON blocks, or platform-specific rich text.
5. Handle images according to the adapter:
   - Upload thumbnail if platform expects a file field or media ID.
   - Upload inline images to the platform media endpoint if local files are present.
   - Replace placeholders such as `INLINE_IMAGE_1` with public URLs.
   - Preserve alt text and captions.
6. Build the request body/fields.
7. Call the API only if user requested upload/publish.
8. Parse response and return a concise result.
9. Never expose API keys in the final response.

## Image Handling Boundary

`marketing-image` generates or plans images.

`marketing-blog-publish` uploads/maps images.

This skill may:

- Read the image manifest.
- Upload local image files according to adapter instructions.
- Replace placeholders in content with uploaded public URLs.
- Send thumbnail files/IDs as part of the platform request.

This skill must not:

- Create new visual concepts when images are missing.
- Write thumbnail prompts.
- Call image generation tools unless the user explicitly asks for a combined emergency shortcut and `marketing-image` is unavailable.
- Embed local paths directly into published content unless the adapter explicitly supports it.

## Prepare-Only Mode

Use prepare-only mode when the user says:

- “chuẩn bị để tôi tự upload”
- “export fields”
- “đưa tôi payload”
- “chưa upload”

Return:

- Platform name and adapter used.
- Required fields table.
- Content format.
- Image manifest and upload notes.
- API payload preview with secrets redacted.
- Missing fields, if any.

Do not call the API in prepare-only mode.

## Publish Output Format

For successful API publish/create:

```markdown
# Publish Result

- Success: true
- Platform: [platform]
- Adapter used: references/platforms/[platform].md
- Blog ID: [id]
- Title: [title]
- Slug: [slug]
- URL: [url]
- Status: draft/published
- Published at: YYYY-MM-DD

Notes:
- Thumbnail uploaded: yes/no
- Inline images uploaded: [count]
- API key: not shown
```

For errors:

```markdown
# Publish Error

- Platform: [platform]
- Adapter used: references/platforms/[platform].md
- HTTP status: [status]
- Error summary: [message]
- Field errors: [specific 422 errors if available]
- Suggested fix: [next action]
```

## Common Pitfalls

1. Hard-coding a platform endpoint in this main skill. Put platform-specific rules in `references/platforms/{platform}.md`.
2. Publishing before the article package and image manifest are ready.
3. Generating images inside publish instead of using `marketing-image` first.
4. Uploading thumbnail but forgetting inline images need separate handling on many platforms.
5. Chèn local file path vào HTML content. Upload local files first and replace with public URLs.
6. Exposing API keys in logs or final responses.
7. Treating every platform as HTML + multipart. Always load the adapter.
8. Guessing a new platform API instead of asking for docs or creating an adapter.

## Verification Checklist

- [ ] Destination platform identified.
- [ ] Matching platform adapter loaded.
- [ ] Required fields validated.
- [ ] Content format matches adapter.
- [ ] Publish intent is clear: prepare_only, draft, or publish.
- [ ] Image manifest handled according to adapter.
- [ ] Thumbnail and inline images are not confused.
- [ ] API key is read from the approved source and not exposed.
- [ ] 401/403/422/500 errors are parsed into useful messages.
- [ ] Final response includes ID/slug/URL/status on success.
