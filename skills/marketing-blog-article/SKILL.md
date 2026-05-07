---
name: marketing-blog-article
description: "Draft, rewrite, and improve marketing blog posts, long-form SEO articles, social posts, captions, hooks, landing page copy, website posts, platform ad-style posts, and product-led copy with clear structure, useful substance, and source-safe claims."
version: 0.2.4
author: Hermes Agent
license: MIT
metadata:
  hermes:
    tags: [Marketing, Blog, Article, SEO, Writing]
---

# Marketing Blog Article

Use this skill as the mandatory production skill for all marketing/content/creative writing outputs after the orchestration workflow has completed brief and research steps. This includes blog posts, long-form marketing articles, social posts, captions, hooks, landing page copy, website posts, platform ad-style posts, scripts, briefs, creative concepts, prompt drafts, product-led posts, rewrites, polish, adaptations, and other text-first marketing or creative copy.

This is a writer skill, not an independent SEO audit skill. It may include a light self-check before returning the draft, but its main job is to produce useful, publishable text-first marketing content in the requested format. For short social formats, do not force long-form article structure; preserve the requested platform shape while applying the same source-safety and quality standards.

## Source Note

The SEO writing framework in this skill is adapted from the community skill `seo-content-writer` in:

- Repository: `sickn33/antigravity-awesome-skills`
- Source URL: https://github.com/sickn33/antigravity-awesome-skills/blob/main/skills/seo-content-writer/SKILL.md
- Source metadata from copied skill: `source: community`, `date_added: 2026-02-27`, `risk: unknown`

Adaptation notes:

- The original framework was useful for SEO content writing, but has been tightened for this marketing workflow.
- Keyword density is treated as a soft diagnostic, not a rigid target.
- E-E-A-T elements must be grounded in user-provided context or research; never invent firsthand experience, expert quotes, cases, statistics, or citations.
- Research/source notes remain required for factual or market claims when the article depends on evidence.

## Inputs

Before drafting, prefer a brief with:

- Request type and target deliverable.
- Goal.
- Audience.
- Channel/platform and format.
- Primary keyword or topic.
- Secondary keywords or semantic terms, if available.
- Search intent: informational, commercial, transactional, navigational, or mixed.
- Reader problem or question.
- Desired article angle and reader benefit.
- Tone.
- CTA.
- Product, brand, or offer context.
- Required sources, reference URLs, research summary, or claims that must be supported.
- Whether reference URLs should appear inside the article body, at the end as a references list, or only in notes.
- Image requirements if any: thumbnail, cover, inline image count, suggested placements, alt text/captions, or placeholders for `marketing-image`.
- Internal pages/products to link to, if available.
- Length and formatting constraints.
- Platform-specific formatting preferences, including whether light emoji/icons are appropriate.

If key inputs are missing, make a reasonable assumption only when the task is low-risk and the content can still be useful. Otherwise ask one focused clarification question.

Do not reject a task because it is not literally a blog or article. If the output is text-first marketing or creative work, adapt this skill's structure to the requested platform and produce the best usable draft for that format.

## Workflow

1. Confirm the article angle, reader benefit, and search intent.
2. Identify the primary keyword/topic and related semantic coverage needed.
3. **If the brief includes SEO-specific fields** (primary keyword, search intent, competitor URLs, desired length), output the full **SEO Brief Output Format** before writing the article.
4. **Check brand folder for post-template**: Always check if `~/.hermes/brands/{brand-slug}/post-template.md` exists. If it exists, read the required fields and **ALWAYS include Publish-Ready Fields in the output** (even if user didn't explicitly ask for publish). This gives user the option to publish later.
5. Create a clear structure with scannable H2/H3 headings.
6. Write an introduction of roughly 50-100 words when suitable:
   - Hook the reader immediately.
   - Name the reader problem or desired outcome.
   - State the value proposition or promise of the article.
   - Include the primary keyword naturally if it fits.
5. Develop concrete, useful body sections:
   - Cover the topic comprehensively enough for the intended reader.
   - Use logical progression, not a list of disconnected tips.
   - Include examples, steps, comparisons, or practical details where helpful.
   - Use semantic keyword variations naturally.
   - Avoid generic filler and unsupported claims.
6. Add SEO publishing elements when relevant.
7. For social-style posts or Facebook-ready adaptations, add light emoji/icons when they improve scannability and match the brand tone.
8. Add a CTA aligned with the user's goal.
9. Review factual claims against provided research, user context, or source notes.
10. Decide reference display before returning:
   - Include a `References` / `Tài liệu tham khảo` section when checked sources materially inform the final answer, support factual/trend/market/statistical claims, or the output is a blog/website/article/guide/report/SEO content, public-facing educational content, thought-leadership piece, comparison, or hiring/career advice based on external sources.
   - Use Notes-only source disclosure for short social posts, captions, hooks, rewrites, Slack/internal updates, scripts, briefs, or creative concepts where a full references section would hurt the format; still include `Research basis` and `Reference URLs used` when checked sources shaped the content.
   - Omit references entirely when no external/user-provided sources were checked, the task is purely stylistic/formatting, or the final content is based only on user-provided context/memory/general reasoning.
11. Return a clean draft plus concise notes that make assumptions, source use, and next steps clear.

## Platform-Specific Text Copy

When writing multi-platform product copy, match the format to the channel instead of forcing every deliverable into a blog article shape:

- Facebook/social posts: start with a reader-relevant hook, keep paragraphs short, use light emojis/icons only when useful, and end with a clear CTA.
- Website posts: use a clear title, intro, scannable sections, concrete benefits, and a closing CTA. Include SEO elements when relevant.
- Landing page copy: write modular sections such as hero, problem, solution, how it works, benefits, audience/use cases, proof/source-safe notes if available, and final CTA.
- Scripts/briefs/concepts/prompts: make the idea usable, concrete, and execution-ready; include the hook, audience intent, key message, structure, and CTA or next action when relevant.
- Platform ad-style posts: keep claims tight, benefit-led, and source-safe; avoid unsupported superlatives.

For multi-format requests, produce separate finished drafts for each requested platform and make sure each one has its own structure, hook, and CTA.

## SEO Article Structure

When writing SEO-focused long-form content, prefer:

### Introduction

- 50-100 words as a default, unless the platform or article style needs otherwise.
- Strong hook.
- Clear reader problem.
- Clear promise or value proposition.
- Natural use of the primary keyword.
- Sets expectations for what the reader will learn or be able to do.

### Body Content

- Logical H2/H3 progression.
- Comprehensive topic coverage without bloating the article.
- Short paragraphs, usually 2-3 sentences when possible.
- Bullets, numbered steps, tables, or examples where they improve scanning.
- Supporting data, citations, reference URLs, or examples only when available from research or user context.
- Natural keyword placement and semantic variations.
- Practical, actionable advice instead of vague best-practice language.

### Conclusion

- Briefly summarize the key point or decision.
- Reinforce the value delivered.
- Include a clear CTA when appropriate.

## SEO Content Package

When the user asks for a publish-ready SEO article, include as relevant:

- Full article.
- SEO title or H1.
- 3-5 title variations when useful.
- Meta description, ideally around 150-160 characters when no platform constraint is given.
- Key takeaways or summary bullets for long articles.
- Suggested slug if useful.
- Internal linking suggestions when site/product context is known.
- FAQ section when it matches search intent.
- CTA.
- References/Tài liệu tham khảo section with source URLs when the article is intended for a blog/website and relies on reference links.

Do not force every item into every output. Match the package to the user's request and publishing context.

## SEO Brief Output Format

When the brief includes SEO-specific fields (primary keyword, search intent, competitor URLs), output a complete SEO brief before writing the article:

```markdown
## SEO Brief

### Thông tin cơ bản

- **Từ khóa trọng tâm**: [keyword]
- **Từ khóa liên quan**: [secondary keywords]
- **Search intent**: [informational/commercial/transactional/mixed]
- **Độ dài mong muốn**: [length]
- **Ngôn ngữ**: [Vietnamese/English/...]

### Cấu trúc Outline

#### H1: [Tiêu đề bài viết]

**Mô tả**: [2-3 câu mô tả mục tiêu đoạn và lợi ích cho người đọc]

##### H2: [Tiêu đề H2 thứ nhất]

- **Mô tả**: [2-3 câu]
- **Từ khóa gắn**: [keyword mapping]
- **Độ dài gợi ý**: [số từ]

###### H3: [Câu hỏi phổ biến / Câu trả lời mẫu]
- **Mô tả**: [1-2 câu]
- **Từ khóa gắn**: [keyword mapping]

##### H2: [Tiêu đề H2 thứ hai]
[...]

### Meta Tags

**Meta Title** (2 phương án, dưới 60 kí tự):

1. [Option 1 - XX ký tự]
2. [Option 2 - XX ký tự]

**Meta Description** (3 phương án, dưới 160 kí tự):

1. [Option 1 - XX ký tự]
2. [Option 2 - XX ký tự]
3. [Option 3 - XX ký tự]

### Chiến lược Link

**Internal links** (gợi ý theo cụm chủ đề):

- [URL] - [Lý do chọn: 1 câu]
- [URL] - [Lý do chọn: 1 câu]

**External links** (đến nguồn uy tín):

- [URL] - [Lý do chọn: 1 câu]
- [URL] - [Lý do chọn: 1 câu]

### Gap Analysis (nếu có URL đối thủ)

**Gap 1**: [Mô tả gap]
- **Cách triển khai**: [2-3 câu]

**Gap 2**: [Mô tả gap]
- **Cách triển khai**: [2-3 câu]

[...]

### Checklist viết bài

| H2 | Độ dài gợi ý | Góc nhìn | Ví dụ/Số liệu cần chèn |
|----|---------------|----------|------------------------|
| [Tên H2] | [X từ] | [First person/Third person] | [Ví dụ cụ thể] |
| [Tên H2] | [X từ] | [First person/Third person] | [Ví dụ cụ thể] |

### Mở bài và Kết luận

**Mở bài** (súc tích):
- [2-3 câu nêu vấn đề và lý do người đọc nên quan tâm]

**Kết luận** (gọn gàng):
- [1-2 câu tóm tắt + CTA phù hợp với intent]
```

When competitor URLs are provided, analyze and list 3-5 important content gaps that need to be filled. Explain briefly how to address each gap.

For the meta description, ensure each option:
- Contains the primary keyword naturally
- Is under 160 characters
- Has a clear value proposition
- Avoids clickbait language

The checklist should include suggested word count, perspective (first person vs third person), and specific examples or data points to insert for each H2 section.

## Basic SEO Checklist

Include when relevant:

- One clear H1 or SEO title.
- Primary keyword used naturally in title/H1, intro, and body where appropriate.
- Related/semantic terms where helpful.
- Logical H2/H3 heading structure.
- Meta description that is specific, not generic.
- Clear reader benefit.
- Internal link suggestions.
- FAQ section for question-led or informational intent.
- CTA aligned with business goal and reader stage.

## E-E-A-T and Trust Signals

Use E-E-A-T signals only when they are supported. Helpful signals include:

- Firsthand or company-specific experience provided by the user.
- Specific examples, workflows, screenshots, data, or cases from supplied context.
- Credible research citations for factual, market, or statistical claims.
- Expert perspective when an expert/source is actually provided.
- Practical advice that shows real operational understanding.

Never fabricate:

- Firsthand experience.
- Customer stories.
- Expert quotes.
- Statistics.
- Case studies.
- Citations.
- Awards, rankings, credentials, or partnerships.

## SEO Quality Guardrails

- Match search intent before optimizing for keywords.
- Write for humans first; optimize for search second.
- Treat keyword density as a soft diagnostic only. Do not force a 0.5-1.5% density if it hurts clarity or readability.
- Avoid keyword stuffing, repetitive phrasing, and robotic SEO language.
- Prefer concrete examples over broad claims.
- Keep paragraphs short and scannable.
- Use bullets/tables only when they make the article easier to use.
- For blog/website articles based on reference links, include checked source URLs in a References/Tài liệu tham khảo section or clearly state why they are only in notes.
- Do not cite sources that were not checked.
- Do not overclaim from weak, vendor-biased, outdated, or indirect evidence.

## Platform Formatting and Icons

When the output is suitable for social platforms such as Facebook, LinkedIn, community posts, or short promotional post adaptations:

- Use light emoji/icons to make the post more lively and scannable when it fits the brand tone and audience.
- Prefer purposeful icons for structure: hooks, bullets, warnings, benefits, steps, or CTA.
- Do not overuse emojis; clarity and credibility come first.
- Avoid emojis/icons for formal, technical, legal, medical, finance, crisis, or executive communication unless the user asks for a warmer style.
- For blog/website articles, keep emojis minimal by default; use them only if the requested tone is casual or the platform style supports it.
- If the user provides a no-emoji/no-icon preference, follow it.

## Reference URL Handling

Use references based on whether sources were actually checked and whether showing them fits the final format.

### Include a References / Tài liệu tham khảo section when:

- Checked external or user-provided sources materially informed the final answer.
- The draft uses sources to support factual, trend, market, statistical, competitor, legal/financial/medical, hiring/career/interview, or technical claims.
- The output is a blog, website article, SEO article, guide, report, public educational content, thought-leadership piece, comparison, career/interview advice, or source-backed explainer.
- The user explicitly asks for sources, citations, references, research basis, or URLs.

### Use Notes-only source disclosure when:

- The output is a short social post, caption, hook set, rewrite, Slack/internal update, script, brief, creative concept, or prompt where a full references section would disrupt the format.
- Checked sources shaped the content, but the final copy should stay clean. In this case, add a concise `Notes` line such as `Reference URLs used: ...` or `Research basis: ...` after the copy.

### Omit references when:

- No external/user-provided sources were checked.
- The task is purely stylistic, formatting-only, grammar polish, tone adjustment, or summarizing only user-provided text without needing outside support.
- The final content is based only on user-provided context, memory, or general reasoning and does not make source-sensitive claims.

Reference rules:

Reference selection rules:

- Include only references that materially informed or support the final answer; do not list every page opened during research.
- For practical educational outputs such as “10 IT interview questions and answers”, include references if external research was used to shape the advice, definitions, role expectations, or technical/career claims. A compact `Tài liệu tham khảo` section at the end is appropriate.
- For purely creative copy, tone rewrites, grammar fixes, headline variants, or formatting-only edits, do not add references unless the user explicitly asks.
- When references are included, keep them concise and useful: normally 2-5 strong sources, with source name/title, URL, and what it supports.

- Prefer this format when showing references: `[Source title or name](URL) — supports: [claim/topic]`.
- Do not include unchecked, inaccessible, or unverified URLs as supporting sources. If a user-provided URL could not be checked or extracted, mention it in `Notes` instead.
- Do not create fake bibliographies, generic source lists, or references from memory.
- Do not silently omit checked sources that materially shaped a source-backed output; show them either in References or Notes depending on format.

## Output Format

Prefer this when drafting a full article:

```markdown
## Final Draft

[content - bản markdown]

## Platform Format Version (xuất 2 bản khi cần)

Khi brand folder có post-template yêu cầu format đặc biệt (ví dụ: HTML), Xuất BẤT KỲ content nào khác markdown.

### Content Versions

**Markdown Version:**
[content gốc - format markdown]

**Platform Version:** [tên platform - ví dụ: x-interview HTML]
[content đã convert sang format yêu cầu]

### Convert sang HTML (nếu platform yêu cầu)

Markdown → HTML conversion sử dụng thư viện Python markdown:

```python
import markdown

# Convert markdown to HTML
html_content = markdown.markdown(markdown_content, extensions=['extra', 'codehilite'])
```

Các thẻ HTML được hỗ trợ: h1, h2, h3, h4, p, strong, em, ul, ol, li, blockquote, pre, code, a, img, hr

## SEO Elements

- SEO title/H1: [title]
- Meta description: [description]
- Suggested slug: [slug, if useful]
- Title variations: [3-5 options, if useful]
- Internal link suggestions: [if context is known]
- FAQ: [if useful]

## Publish-Ready Fields (khi brand folder có post-template)

**Luôn output phần này khi brand folder tồn tại với file post-template.md**, bất kể user có request publish hay không. Điều này giúp user có option để publish sau.

**QUAN TRỌNG:** Nếu post-template yêu cầu format đặc biệt (ví dụ: HTML), sử dụng **Platform Version** (đã convert) cho field `content` thay vì Markdown Version.

### Required Fields
| Field | Value | Notes |
|-------|-------|-------|
| title | [Tiêu đề bài viết] | max 255 ký tự |
| slug | [URL slug] | unique, max 255 ký tự |
| content | [Nội dung - DÙNG Platform Version nếu template yêu cầu HTML] | |
| status | 1 | 0=Draft, 1=Published |
| published_at | [YYYY-MM-DD] | |
| meta_title | [SEO title] | max 60 ký tự |
| meta_description | [SEO description] | |

### Optional Fields
| Field | Value | Notes |
|-------|-------|-------|
| excerpt | [Tóm tắt ngắn] | max 500 ký tự |
| author_id | [ID tác giả] | nếu có |
| meta_keywords | [SEO keywords] | comma-separated |
| tags | ["tag1", "tag2"] | array |
| thumbnail | [đường dẫn file] | nếu có |

### API Config
- Brand: [brand-name]
- Post template: [~/.hermes/brands/{brand}/post-template.md]
- API key: [từ handoff hoặc user cung cấp]
- Content-Type: [từ template - ví dụ: multipart/form-data]
- Content Format: [markdown / html / text]

## References

- [Source title or name](URL) — supports: [claim/topic]. Include when the draft is for blog/website publishing and uses checked reference links.

## Notes

- Assumptions: [brief list]
- Research basis: [brief list or "User-provided context only"]
- Reference URLs used: [brief list or "None"]
- Source-sensitive claims: [brief list or "None"]
- Suggested next step: [one concrete action]
- Publish intent: [Yes/No - từ handoff]
- Content version used for publish: [Markdown / Platform Version]
```

For shorter rewrites or improvements, return only the useful parts. Do not bloat the answer with unnecessary SEO sections.

## Hard Rules

- Do not invent unsupported claims, statistics, quotes, citations, URLs, or firsthand experience.
- Do not over-optimize keywords at the expense of readability.
- Do not treat this skill as a substitute for a dedicated SEO audit when the user asks to evaluate an existing page.
- Do not refuse or route away a text-first creative/writing output just because it is not a blog/article; adapt the workflow and write for the requested format.
- If checked sources materially informed a source-backed blog/website/article/guide/report/public educational output, include a References/Tài liệu tham khảo section unless the user explicitly asks not to.
- For short/social/internal formats that used checked sources, disclose source use in Notes instead of forcing a full References section.
- Do not create a References/Tài liệu tham khảo section when no source URLs were provided or checked, when the task is purely stylistic, or when the output is based only on user-provided context/general reasoning.
- Do not default to Vietnamese from the user's chat language. Write in the language explicitly confirmed in the brief.
