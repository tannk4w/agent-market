# AGENTS.md

## Project Purpose

This project contains the reusable Hermes marketing/content workflow package.

The primary workflow is designed for marketing strategy, content planning, research-backed writing, product-led copy, social posts, hooks, captions, rewrites, review, and other text-first creative/marketing tasks.

## Primary Entrypoint

Use `marketing-orchestration` as the main entrypoint for marketing and content requests.

For writing/creative deliverables, the default workflow is:

1. `marketing-brainstorm`
2. `marketing-research`
3. `marketing-blog-article` or another explicitly matching writing/planning specialist
4. self-review

Research-only requests may stop after `marketing-research`.

## Workflow Rules

- Do not direct-answer marketing/content/creative writing requests when the workflow applies.
- Do not skip brainstorm, research, or writing-specialist steps for content creation, rewriting, polish, hooks, captions, social posts, product-led copy, or website/landing copy.
- Always confirm the requested writing language during brainstorm before drafting or handing off to research/writing.
- Do not infer the final content language from the language the user used to chat.
- For product-led or brand-led content, request enough product/brand context before drafting unless reliable reusable context already exists.
- Do not invent product facts, claims, metrics, sources, customer stories, awards, or URLs.
- If research is weak or unavailable, continue only with clearly labeled assumptions and softened claims.

## Skill Files

Marketing workflow skills live under `.hermes/skills/`:

- `.hermes/skills/marketing-orchestration/SKILL.md`
- `.hermes/skills/marketing-brainstorm/SKILL.md`
- `.hermes/skills/marketing-research/SKILL.md`
- `.hermes/skills/marketing-blog-article/SKILL.md`
- `.hermes/skills/marketing-slack/SKILL.md`

## Profile Files

Reusable profile context lives in `.hermes/`:

- `.hermes/SOUL.md` — persona, style, content taste, and operating principles.
- `.hermes/memories/MEMORY.md` — reusable workflow facts and conventions only.
- `.hermes/AGENTS.md` — project-level agent instructions.

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
