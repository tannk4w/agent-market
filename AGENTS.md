# AGENTS.md

## Project Purpose

This project contains the reusable Hermes marketing/content workflow package.

The primary workflow is designed for marketing strategy, content planning, research-backed writing, product-led copy, social posts, hooks, captions, rewrites, review, marketing image generation, and blog publishing preparation/API publishing.

## Primary Entrypoint

Use `marketing-orchestration` as the main entrypoint for marketing and content requests.

For writing/creative deliverables, the default workflow is:

1. `marketing-brainstorm`
2. `marketing-research`
3. `marketing-blog-article` or another explicitly matching writing/planning specialist
4. `marketing-image` when images are requested or required
5. self-review / package review
6. `marketing-blog-publish` only when upload/publish is explicitly requested

Research-only requests may stop after `marketing-research`.

## Workflow Rules

- Do not direct-answer marketing/content/creative writing requests when the workflow applies.
- Do not skip brainstorm, research, or writing-specialist steps for content creation, rewriting, polish, hooks, captions, social posts, product-led copy, or website/landing copy.
- Use `marketing-image` after the text package is ready when the user requests thumbnails, covers, banners, inline blog images, or generated marketing visuals.
- Use `marketing-blog-publish` only after the content package and any image manifest are ready, and only when the user explicitly asks to upload/publish/prepare platform fields.
- Publishing must use the relevant platform adapter under `skills/marketing-blog-publish/references/platforms/`; do not hard-code API behavior in orchestration.
- Always confirm the requested writing language during brainstorm before drafting or handing off to research/writing.
- Do not infer the final content language from the language the user used to chat.
- For product-led or brand-led content, request enough product/brand context before drafting unless reliable reusable context already exists.
- Do not invent product facts, claims, metrics, sources, customer stories, awards, or URLs.
- If research is weak or unavailable, continue only with clearly labeled assumptions and softened claims.

## Skill Files

Marketing workflow skills live under `skills/` in this reusable profile package:

- `skills/marketing-orchestration/SKILL.md`
- `skills/marketing-brainstorm/SKILL.md`
- `skills/marketing-research/SKILL.md`
- `skills/marketing-blog-article/SKILL.md`
- `skills/marketing-image/SKILL.md`
- `skills/marketing-blog-publish/SKILL.md`
- `skills/marketing-slack/SKILL.md`

Publishing adapters and publish references live under:

- `skills/marketing-blog-publish/references/platforms/`
- `skills/marketing-blog-publish/references/`

## Profile Files

Reusable profile context in this package:

- `SOUL.md` — persona, style, content taste, and operating principles.
- `AGENTS.md` — project-level agent instructions.
- Runtime memory files, when present, should contain reusable workflow facts and conventions only.

Do not include brand-specific memory in these reusable files unless the project intentionally becomes brand-specific.
Examples of brand-specific information to exclude:

- individual app/product descriptions
- campaign details
- brand CTAs
- proprietary claims
- customer-specific notes

## Quality Standards

Good marketing/content output should be:

- clear
- specific
- audience-aware
- useful
- scannable
- source-safe
- appropriate for the target channel

Avoid:

- vague hype
- generic AI-sounding copy
- unsupported superlatives
- fabricated proof
- invented image details, fake UI, fake logos, or unsupported visual claims
- publishing without explicit user intent
- overlong explanations when a finished draft is expected

## Validation

This is the canonical location for Hermes marketing profile. 

After editing skill files, validate basic SKILL.md structure:

```bash
python3 - <<'PY'
import pathlib, re, yaml
for p in pathlib.Path('skills').glob('*/SKILL.md'):
    content = p.read_text()
    assert content.startswith('---'), p
    m = re.search(r'\n---\s*\n', content[3:])
    assert m, p
    fm = yaml.safe_load(content[3:m.start()+3])
    assert fm.get('name') and fm.get('description'), p
    assert len(fm['description']) <= 1024, p
print('validated')
PY
```
