---
name: marketing-orchestration
description: "Primary entrypoint for marketing, creative, and content creation workflows: clarify goals, generate ideas, shape angles, plan content direction, draft or improve copy, review creative outputs, and coordinate specialist skills across text-first content, campaigns, personal brand, social, video, image, and multimedia briefs."
version: 0.2.3
author: Hermes Agent
license: MIT
metadata:
  hermes:
    tags: [Marketing, Creative, Content, Orchestration]
    related_skills: [marketing-brainstorm, marketing-research, marketing-blog-article, marketing-image, marketing-blog-publish]
---

# Marketing Orchestration

Use this skill when the user asks to create, plan, brainstorm, improve, or review marketing, creative, or content work. This includes text-first content, personal brand content, social content, campaign concepts, video or image briefs, hooks, angles, messaging directions, content ideas, and creative review.

This is the primary entrypoint for the marketing, creative, and content creation skill package. It decides which specialist skill should be used, in what order, what context must be collected, and what quality gates must pass before returning work to the user.

## Supported Capabilities

Current scope:

- Content and creative brief development.
- Campaign concepts, content directions, messaging angles, hooks, and idea generation.
- Personal brand, social, community, and platform-native content.
- Blog posts and long-form marketing articles when relevant.
- Landing page copy, website posts, platform posts, promotional posts, ad-style text copy, product-led copy, and email outreach copy or sequences prepared for import into an external sending tool.
- Rewrites, outlines, structure improvements, and creative review.
- Topic research, competitor/context research, and source-backed summaries.
- Video, image, and multimedia planning outputs: briefs, scripts, storyboards, shot lists, prompt drafts, and creative direction.
- Short copy improvements: clarity, tone, structure, voice, CTA, and audience fit.

Out of current scope unless a matching specialist or tool exists:

- Sending, scheduling, publishing, or operating email campaigns directly.
- Full email newsletter operations, deliverability management, unsubscribe/compliance systems, domain warm-up, bounce handling, or inbox tracking setup.
- Full paid ad campaign systems, media plans, bidding strategy, or analytics optimization.
- Full campaign packs.
- Multi-post calendars, platform-optimized social campaigns, scheduling, or analytics.
- CMS, browser, publishing, scheduling, or upload actions.
- Advanced design production beyond available tools. Basic marketing image generation is supported through `marketing-image` when an image generation tool is available.
- Purely technical, analytical, administrative, automation setup, or tooling tasks unrelated to content creation.

If the user asks for out-of-scope work, explain the limitation and offer the closest supported planning, writing, brief, script, storyboard, prompt, or creative direction alternative.

## Operating Modes

Use one mandatory workflow for all marketing, creative, and content creation or rewriting requests. Do not choose a lighter direct-answer path for short posts, captions, hooks, simple rewrites, or apparently low-risk drafts.

1. **Full content workflow mode — mandatory default**
   - Use for every request that asks to create, draft, write, rewrite, improve, review, brainstorm, ideate, polish, humanize, localize, adapt, or shape marketing/content/creative output.
   - Required path for all writing or creative deliverables: `marketing-brainstorm` -> `marketing-research` -> `marketing-blog-article` -> `marketing-image` when images are requested/needed -> self-review/package review -> `marketing-blog-publish` when upload/publish is explicitly requested.
   - `marketing-blog-article` is the mandatory writing/creative production skill for all final text deliverables. Do not substitute another writing skill unless the user explicitly asks for a non-text deliverable with a dedicated specialist, and even then use `marketing-blog-article` for any final written copy included in the answer.
   - For short social posts, captions, hooks, personal posts, product posts, promotional copy, landing page sections, website posts, creative concepts, scripts, briefs, captions, and platform adaptations, still route through `marketing-brainstorm`, then `marketing-research`, then `marketing-blog-article` before returning the final draft.
   - Calling `marketing-research` is mandatory before writing, even when the brief looks clear.
   - The research step may return useful findings, weak findings, no useful findings, or a fallback note; that outcome belongs to `marketing-research`.
   - Orchestration must not skip the brainstorm, research, or `marketing-blog-article` step. It may proceed after each required step completes, using whatever outcome is available.
   - If research returns no useful evidence after an attempted search, continue to `marketing-blog-article` with clearly labeled assumptions and AI-generated reasoning, but do not present invented claims as researched facts.

2. **Research-only mode — only when the user explicitly asks only for research**
   - Use `marketing-brainstorm` first if the research purpose is unclear.
   - Then use `marketing-research`.
   - Do not draft final marketing copy unless the user asks for it afterward; if they do, start the full workflow from the clarified brief and research handoff.

3. **Out-of-scope or unsupported mode**
   - If no writing/planning specialist can support the requested deliverable, block and offer the closest supported text-based alternative.
   - Do not replace a missing specialist with an ad-hoc direct answer.

Hard rule: there is no direct-answer shortcut for marketing/content/creative writing tasks. Any request involving creative output, writing, rewriting, polishing, reviewing, adapting, hooks, captions, posts, scripts, website copy, landing page copy, concepts, angles, or briefs must go through `marketing-brainstorm` -> `marketing-research` -> `marketing-blog-article` -> self-review unless the user explicitly asks for research-only or the request is clearly unrelated to marketing/content/creative work.

## Core Workflow

For every marketing/content/creative creation, writing, rewriting, review, adaptation, polish, or ideation request, run the workflow in this order. Do not use a partial subset as a shortcut. The only exception is an explicit research-only request, which stops after the research step and does not produce final copy.

1. **Clarify with `marketing-brainstorm`**
   - Understand the user's goal, audience, offer, channel, tone, format, constraints, and definition of success.
   - Do not draft final content from a vague brief.
   - If critical inputs are missing, ask focused questions before continuing.

2. **Research with `marketing-research` before writing**
   - Always use `marketing-research` to gather and synthesize information before drafting any marketing/content output.
   - If user-provided reference materials exist, research those first, then use Exa/web search to verify or fill gaps unless the references fully satisfy the task.
   - If no reference materials exist, go directly to Exa/web research.
   - After research completes, use the research outcome as the basis for drafting when useful.
   - If research returns weak/no useful evidence, proceed with clearly labeled assumptions and AI-generated reasoning.
   - Do not invent facts, statistics, quotes, sources, or citations.

3. **Draft or shape the deliverable with `marketing-blog-article`**
   - Always use `marketing-blog-article` for creative, writing, rewriting, polishing, adaptation, review outputs, hooks, captions, posts, scripts, briefs, landing page copy, website copy, product-led copy, promotional copy, social copy, platform copy, and any other final text deliverable.
   - Do not choose a different writing/planning specialist for final text just because the format is short, creative, informal, multi-platform, or not a blog/article. `marketing-blog-article` is the mandatory production skill for all text-first creative/writing outputs.
   - Use `marketing-slack` only when the final deliverable is specifically a Slack/internal update, but still use `marketing-blog-article` for any accompanying public-facing or marketing copy.
   - For video, image, or multimedia requests, still pass through the full workflow and use `marketing-blog-article` to produce text-based planning assets such as briefs, scripts, storyboards, shot lists, prompts, captions, or creative direction unless an actual generation tool is explicitly required.
   - Do not draft directly inside orchestration without first using `marketing-blog-article`.
   - Operational enforcement: before writing any final text, explicitly load `marketing-blog-article` with `skill_view` if it has not already been loaded in the current turn, then apply that skill's workflow/checklist to produce the draft. Loading the skill is not sufficient by itself; the final draft must be written from the handoff fields and reviewed against `marketing-blog-article` rules.

4. **Generate visuals with `marketing-image` when requested or required**
   - Use `marketing-image` after the article/draft is ready whenever the user asks for thumbnail, cover image, banner, inline images, or generated visuals.
   - For thumbnail/cover/banner prompts, `marketing-image` must use `nano-banana-thumbnail` before calling image generation.
   - For inline article images, generate section-aware visuals, alt text, captions, and an image manifest with stable placeholders such as `INLINE_IMAGE_1`.
   - Do not hide image concepting inside publish. Publishing should upload/map images, not invent the visual direction.

5. **Self-review / package review before publishing or returning**
   - Review the article, SEO fields, source safety, image manifest, image placement, alt text, captions, and publish-ready fields when present.
   - If no publish is requested, return the final content package after this review.

6. **Publish to website with `marketing-blog-publish`** (optional - only when user explicitly requests publishing/uploading)
   - Use `marketing-blog-publish` only when the user explicitly asks to publish/push/upload the blog to a website or platform via API.
   - Requires the blog content and any generated image manifest to be ready.
   - The publish skill must select and load the platform adapter (for example `references/platforms/x-interview.md`) instead of relying on hard-coded platform logic.
   - Use the handoff contract to pass required fields to the publish skill.
   - Do not publish if the user only asks for content creation/drafting.

7. **Final self-review before final response**
   - Provide the final content or publish result.
   - Include a short note summarizing assumptions, research basis, image handling, and recommended next step if useful.

## Routing Rules

Use this routing table:

| User request | Route |
| --- | --- |
| Any creative, writing, drafting, rewriting, polishing, humanizing, reviewing, adapting, ideating, hook, caption, post, article, blog, website, landing page, script, brief, prompt, concept, social, or product-led text request | `marketing-brainstorm` -> `marketing-research` -> `marketing-blog-article` -> self-review |
| Blog/article with explicit publish request | `marketing-brainstorm` -> `marketing-research` -> `marketing-blog-article` -> `marketing-image` if images are requested/required -> package review -> `marketing-blog-publish` -> self-review |
| "Research this topic" with no requested draft/output copy | `marketing-brainstorm` if the goal is unclear -> `marketing-research` |
| Image generation request for marketing/content assets | `marketing-brainstorm` as needed -> `marketing-research` if factual claims are needed -> `marketing-blog-article` for any written brief/copy -> `marketing-image` -> self-review |
| Email outreach copy, cold email sequences, newsletter copy, or CSV-ready email body/subject/follow-up templates prepared for import into a sending tool | `marketing-brainstorm` -> `marketing-research` -> `marketing-blog-article` -> self-review; do not send or schedule emails directly |
| Publishing, pushing to website, or uploading blog via API | `marketing-blog-publish` (requires completed blog from `marketing-blog-article`; use `marketing-image` first if images need generation) |

## Brainstorm Gate

Before delegating to writing, classify missing brief fields as critical or optional.

Critical fields:

- Goal or purpose.
- Audience.
- Channel or content type.
- Topic, product, or offer.
- Language.

Optional fields:

- Tone.
- CTA.
- Length.
- Keywords.
- Sources.
- Brand rules.
- Claims to avoid.
- Deadline.
- Reference examples.

Rules:

- Ask only if a critical field is missing.
- Ask at most 3 focused clarification questions at a time.
- Do not block on optional fields.
- If the user asks to proceed quickly, proceed with clearly labeled assumptions.
- Do not ask questions that are not needed for the current deliverable.

## Brand and Profile Context Gate

Before writing final content, check whether the user supplied:

- Brand or product description.
- Target market and customer pain points.
- Offer, differentiators, and proof points.
- Voice, style, or compliance constraints.
- Existing source material or references.

If these are missing but essential, ask for them. If they are helpful but not essential, proceed with clearly labeled assumptions.

## Handoff Contract

When handing work to `marketing-blog-article`, use this template:

```markdown
Use skill: marketing-blog-article

Request type:
Objective:
Audience:
Channel:
Format:
Topic/product/offer:
Brand/profile context:
Tone:
Emoji/icon preference if platform-appropriate:
CTA:
Constraints:
Sources/user-provided material:
Reference URLs checked:
Reference display decision: [References section / Notes only / Omit because no checked sources]
Research summary:
Claims safe to use:
Claims to avoid:
Assumptions:
Language:

Success criteria:
- Match brief and language.
- Use only supported claims.
- Do not publish, schedule, upload, or configure external systems.
- State assumptions clearly.

Do not:
- Fabricate facts, metrics, quotes, sources, URLs, product capabilities, or brand claims.
```

Do not hand off vague requests. Do not make specialist skills rediscover context that orchestration already has.

### Handoff to `marketing-blog-publish`

When handing work to `marketing-blog-publish` (after blog content is ready), use this template:

```markdown
Use skill: marketing-blog-publish

# Blog Content (từ marketing-blog-article)

## All Fields (từ API_BLOG.md)

| Field | Type | Required | Value |
|-------|------|----------|-------|
| title | string | Yes | [Tiêu đề bài viết - max 255 ký tự] |
| slug | string | Yes | [URL slug - max 255 ký tự, DUY NHẤT] |
| content | string | Yes | [Nội dung HTML đầy đủ] |
| excerpt | string | No | [Tóm tắt ngắn - max 500 ký tự] |
| status | integer | Yes | [0 = Draft, 1 = Published] |
| published_at | date | Yes | [Ngày đăng - format YYYY-MM-DD] |
| author_id | integer | No | [ID tác giả - exists in blog_authors table] |
| meta_title | string | Yes | [SEO title - max 60 ký tự] |
| meta_description | string | Yes | [SEO description] |
| meta_keywords | string | No | [SEO keywords - max 255 ký tự] |
| tags[] | array | No | [Array of tags, ví dụ: ["marketing", "2026"]] |
| thumbnail | file | No | [Đường dẫn file ảnh - jpeg,png,jpg,gif,svg, max 2MB] |

## API Configuration
api_key: [API key để xác thực]

## Success Criteria
- Blog created successfully với status 201
- Trả về blog ID và URL published
- Handle errors: 401 (auth), 422 (validation), 500 (server)

Do not:
- Expose API key trong response
- Publish duplicate slug (validate trước khi gọi API)
```


## Research and Citation Policy

Research is mandatory before substantial content creation or substantial rewriting.

Use `marketing-research` after the brainstorm/brief step and before any writing skill or final draft. This applies even when the brief appears clear, because research should gather, verify, and synthesize usable context first.

Research flow:

1. If the user provided reference materials, send them to `marketing-research` first.
2. `marketing-research` should inspect those references before open web search.
3. Then use Exa/web search to verify, fill gaps, or add external context.
4. If no reference materials exist, go directly to Exa/web research.
5. After `marketing-research` completes, use its output if it contains useful findings.
6. If research produces weak/no useful findings, continue to writing with clearly labeled assumptions and AI-generated reasoning.
7. Do not block writing just because research had no useful result; the mandatory requirement is that the research step was attempted before writing.

Research must not be skipped for marketing/content/creative creation, writing, rewriting, adaptation, or review tasks, including:

- Purely stylistic edits, short copy polish, headline/CTA tweaks, or humanization requests.
- Short social posts, captions, hooks, and very short internal drafts.
- Requests that appear obvious, low-risk, or already well-briefed.

If the research step produces no useful external evidence, record that outcome and continue with clearly labeled assumptions instead of skipping the step.

When research is used:

- Keep source names and URLs when available.
- Classify reference display before drafting:
  - **References section required** when checked sources materially inform the final answer, support factual/trend/market/statistical/technical claims, or the output is a blog/website/article/guide/report/SEO content, public-facing educational content, thought-leadership piece, comparison, interview Q&A, or hiring/career advice based on external sources.
  - **Notes-only references acceptable** for short social posts, captions, hooks, rewrites, Slack/internal updates, scripts, briefs, or creative concepts where showing sources would hurt the format; still mention `Research basis` and `Reference URLs used` in Notes when checked sources shaped the content.
  - **No references section** when no external/user-provided sources were checked, the task is purely stylistic/formatting, or the final content is based only on user-provided context/memory/general reasoning. Do not invent a bibliography.
- For blog/website drafts based on reference links, pass the checked URLs to `marketing-blog-article` and require a References/Tài liệu tham khảo section in the final output unless the user asks otherwise.
- For non-blog outputs that still relied on checked sources, require either a compact References section or a Notes line listing `Reference URLs used`; do not silently omit checked sources.
- For practical educational deliverables such as interview question-and-answer sets, tutorials, checklists, or career guidance, include a compact `References` / `Tài liệu tham khảo` section when external sources shaped the substance. Do not add references for purely stylistic rewrites or general creative variants.
- Separate verified facts from interpretation.
- Do not cite anything that was not actually checked.
- If evidence is weak or missing, say so and soften claims.
- If writing proceeds without useful research results, state that the draft is based on assumptions/AI reasoning rather than verified evidence.

## Quality Gates

Before returning any deliverable, verify:

- The output matches the clarified brief.
- The language matches the language explicitly confirmed during brainstorm; do not default to Vietnamese from the user's chat language.
- The CTA is clear when a CTA is needed.
- Unsupported factual claims are removed, softened, or labeled as assumptions.
- The structure is scannable for the target channel.
- For Facebook/social-style posts, light emoji/icons are used when they improve readability and match the requested tone; they are avoided for formal or sensitive content.
- Reference display matches the source-use decision: checked sources are shown in References or Notes when they materially informed the output; no fake references are added when no sources were checked.
- The final answer does not expose API keys, internal config, or hidden chain-of-thought.

### Blog Article Quality Checklist

Before returning a blog/article, verify:

- The title matches search intent and reader benefit.
- The introduction states the problem and promise clearly.
- Headings are scannable and logically ordered.
- The article contains concrete, useful points instead of generic filler.
- Basic SEO is covered when relevant: primary keyword, related terms, meta description, and heading structure.
- If the draft is for a blog/website and used reference links, source URLs are included in a References/Tài liệu tham khảo section.
- CTA is clear and aligned with the user's goal.
- Unsupported claims are removed, softened, or labeled as assumptions.

### Blog Publish Quality Checklist

Before returning publish result, verify:

- All required API fields are present (title, slug, content, status, published_at, meta_title, meta_description).
- Slug is unique and URL-safe.
- Status is correct (0 = Draft, 1 = Published).
- published_at is in YYYY-MM-DD format.
- meta_title does not exceed 60 characters (SEO warning if exceeded).
- For errors: parse 422 validation errors to show specific field issues.
- Do not expose API keys in response.

## Blocked Response Format

If the request cannot proceed safely, respond with:

```markdown
## Blocked

Reason: [what is missing or out of scope]

Supported routes:
- Blog/article draft: `marketing-blog-article`
- Research summary: `marketing-research`
- Brief/content ideas: `marketing-brainstorm` or orchestration
- Simple content edits, hooks, angles, briefs, scripts, prompts, or creative direction: full workflow via `marketing-brainstorm` -> `marketing-research` -> writing/planning specialist -> self-review

Needed from you:
- [specific input or decision]

Supported alternative:
- [closest useful text-based output]
```

Use this format for missing critical context, unavailable generation tools, unsupported large deliverables without a matching specialist, or requests that require unavailable tools.

## Output Formats

For long-form content tasks, prefer this final structure:

```markdown
## Final Draft

[content]

## Notes

- Assumptions: [brief list]
- Research basis: [brief list or "User-provided context only"]
- Reference URLs used: [brief list or "None"]
- Suggested next step: [one concrete action]
```

For research-only tasks, prefer:

```markdown
## Research Summary

[findings]

## Sources

[source names and URLs]

## Safe Claims

[claims that can be used]

## Claims to Avoid or Soften

[claims that need caution]
```

For short content tasks, return only the final copy plus a concise note if needed.

## Hard Rules

- Do not skip clarification when a critical field is missing.
- Ask at most 3 focused clarification questions at a time.
- Do not block on optional fields.
- Do not skip `marketing-brainstorm`, `marketing-research`, or `marketing-blog-article` before any marketing/content/creative writing, creation, rewriting, review, adaptation, polish, or ideation deliverable.
- Do not use direct-answer mode for marketing/content/creative writing tasks, even for short posts, captions, hooks, polish, humanization requests, concepts, briefs, scripts, website copy, or landing page copy.
- Do not fabricate research, sources, statistics, quotes, or brand claims.
- Do not cite sources that were not actually checked.
- Do not omit checked reference URLs when they materially informed the output: use a References/Tài liệu tham khảo section for source-backed blog/website/article/guide/report/public educational content, interview Q&A, career guidance, technical explainers, or a concise Notes line for short/social/internal formats where a full references section would be awkward.
- Do not add a References section when no sources were checked, when the task is purely stylistic, or when the answer is based only on user-provided context/general reasoning.
- If research finds weak/no useful evidence, continue with clearly labeled assumptions/AI-generated reasoning after the research step has been attempted.
- Do not configure, create, or expose API keys.
- Do not claim to generate final video or design files unless a matching tool or specialist is actually available. For images, use `marketing-image` and only claim generation after the image tool returns a file/path.
- Do not silently imitate a missing specialist for large deliverables.
- Do not over-orchestrate simple edits or narrow requests.
- Use emoji/icons only when platform-appropriate and useful; do not add them to formal, sensitive, or credibility-heavy content unless requested.
- Do not default to Vietnamese from the user's chat language. Use the content language explicitly confirmed during brainstorm.
