---
name: marketing-research
description: "Research marketing topics and summarize evidence without fabricating sources. Prioritizes user-provided reference materials before web/Exa search, then returns a compact research handoff for orchestration."
version: 0.2.0
author: Hermes Agent
license: MIT
metadata:
  hermes:
    tags: [Marketing, Research, Evidence, Sources]
---

# Marketing Research

Use this skill when marketing content needs factual support, market context, competitor context, trends, statistics, sources, or citations.

This skill is usually called after `marketing-brainstorm` has produced a working brief and `marketing-orchestration` needs evidence before drafting or refining content.

## Core Principle

Research should support the content brief, not replace it.

Use the brief from orchestration/brainstorm as the source of intent: objective, audience, channel, topic, angle, CTA, reference materials, safe claims, claims to avoid, and open questions.

Do not turn every request into broad market research. Answer the specific research need that helps the next writing step.

## Input Contract from Orchestration

Expect a compact handoff with some or all of these fields:

- Objective.
- Audience.
- Channel/format.
- Topic/offer.
- Recommended angle.
- Reference materials.
- Research question.
- Safe claims.
- Claims to avoid.
- Assumptions.
- Language.

## HARD-GATE

Do NOT proceed with research if:

- The research question is missing or vague.
- The intended content use is unclear.

You MUST ask exactly ONE focused clarification question before continuing.

Do not research a vague topic if the result would be generic, unfocused, or unusable for the next writing step.

## Source Priority

Follow this order:

1. **User-provided reference materials first**
   - If the brainstorm/orchestration handoff includes reference materials, inspect those materials before searching the open web.
   - Reference materials can include pasted text, URLs, documents, notes, excerpts, competitor pages, product docs, reports, or source lists.
   - Extract only claims relevant to the brief.
   - Preserve source names, URLs, titles, dates, and quoted/paraphrased evidence when available.
   - Mark what is directly supported by the reference material versus interpretation.

2. **Web/Exa search second**
   - After reviewing provided references, use configured search tooling, including Exa when available, to fill gaps, verify claims, find fresher sources, or add external context.
   - If no reference materials are provided, go directly to web/Exa research.
   - Prefer official/primary sources, product documentation, original reports, reputable publications, and recent sources when recency matters.

3. **Synthesis last**
   - Combine reference findings and web findings into one research summary for orchestration.
   - Highlight conflicts, weak evidence, outdated sources, and claims that should be softened.


## Reference Display Decision Rules

Research should decide whether sources must be visible in the user's final deliverable. Do not treat every researched output the same.

Add visible references when:

- The final deliverable teaches, advises, or explains a factual topic for public use, such as career guidance, interview Q&A, hiring advice, industry explainers, educational guides, reports, comparisons, or SEO/blog content.
- The draft relies on external facts, definitions, standards, market context, trend claims, salary/career claims, technical claims, statistics, legal/financial/medical claims, or anything a reader may reasonably want to verify.
- The user explicitly asks for references, citations, research basis, URLs, or source-backed content.

Use notes-only references when:

- The source research shaped a short/social/internal/creative output but a full references section would make the format awkward.
- The final answer needs to stay clean, but the user should still know which URLs informed it.

Omit references when:

- No source was actually checked.
- The task is purely stylistic: grammar, tone, shortening, formatting, headline variants, hook variations, or rewriting user-provided text without adding source-sensitive claims.
- The answer is based only on the user's provided context, reusable memory, or general reasoning and does not present verifiable factual claims.

Choose sources selectively. Include only sources that materially support the final content, not every search result opened. Prefer 2-5 strong references for standard articles/guides; use more only for reports, comparisons, or broad research summaries.

## Exa Usage Rules (Enforced)

When Exa is available:

- You MUST use Exa for web research unless the task is fully satisfied by user-provided references.
- You MUST retrieve at least 3 results for validation when doing web research.
- You MUST use highlights when available to capture dense excerpts.
- You MUST NOT rely on a single source for important claims.
- You MUST prefer primary/official sources when verifying factual, product, market, competitor, or statistical claims.

Operational pattern:

- Use `type: auto` for normal marketing research.
- Use `contents.highlights` when available.
- Use 3-8 results for standard research; use more only when the brief requires comparison or broad context.
- Use domain filters only when the brief asks for specific sources, competitors, official docs, or reference-first validation.
- If Exa fails or is unavailable, fall back to other configured web search/extraction tools and note the fallback in `Source Notes` or `Handoff to Orchestration` if it affects confidence.

Do not expose API keys or raw tool configuration in the final output.

## Workflow

1. Read the orchestration/brainstorm handoff.
2. Identify the exact research question and intended content use.
   - If either is missing or vague, stop and ask exactly ONE focused clarification question.
3. Check whether reference materials are present.
4. If references are present:
   - Inspect them first.
   - Extract relevant evidence, source details, and constraints.
   - Note missing information that still needs web verification.
5. Search the web with Exa or configured search tools:
   - Verify important claims.
   - Fill evidence gaps.
   - Add market/context/competitor/trend data only when needed.
6. Evaluate source quality:
   - Primary/official > reputable reports/publications > secondary commentary > unsourced claims.
   - Recent sources matter for fast-changing topics.
7. Separate:
   - Confirmed facts.
   - Reasonable interpretations.
   - Assumptions.
   - Unsupported or risky claims.
8. Recommend how sources should be displayed in the final output:
   - `References section` for source-backed blog/website/article/guide/report/public educational content, career/hiring/interview guidance, comparisons, or factual/trend/statistical/technical claims.
   - `Notes only` for short/social/internal/creative formats where references would disrupt the final copy but checked sources shaped the content.
   - `No references needed` only when no external/user-provided sources were checked, the task was purely stylistic, or research produced no usable source-backed findings.
   - List only the strongest material sources that should be shown; do not dump every URL checked.
9. Return a compact research handoff to orchestration.

## Reference Materials Handling

When references are supplied, do not ignore them and start with generic web search.

Use this handling logic:

- Pasted text: summarize the relevant evidence and preserve exact wording for important claims.
- URLs: open/extract the URL if tools allow; otherwise search the title/domain and mark extraction limitations.
- Documents/reports: extract the sections relevant to the brief; do not summarize the whole document unless asked.
- Competitor examples: identify messaging patterns, proof points, positioning, and claims; avoid copying language.
- Product docs: treat as primary context for product facts, but still verify market claims externally if needed.

If references conflict with web sources, report the conflict clearly and recommend the safer claim.

## Research Output for Orchestration

Return this structure by default:

```md
## Research Summary

[Short synthesis focused on the content brief.]

## Findings

- [Finding] — [source/support]
- [Finding] — [source/support]

## Source Notes

### User-Provided References
- [Source/title/URL]: [what it supports]

### Web/Exa Sources
- [Source/title/URL]: [what it supports]

## Safe Claims

- [Claim that can be used in draft]

## Claims to Avoid or Soften

- [Unsupported/risky/overbroad claim and why]

## Open Questions

- [Only if needed]

## Handoff to Orchestration

Research basis: [User references only / Web only / User references + Web]
Confidence: [High/Medium/Low with short reason]
Recommended content use: [how the next writer should use the evidence]
Reference display recommendation: [References section / Notes only / No references needed, with reason]
Suggested visible references: [2-5 strongest titles + URLs only when references/notes should be shown]
```

Keep the output compact. The goal is to help orchestration/writing, not produce a full report unless the user asked for one.

## Quality Rules

- Prioritize relevance to the brief over volume of sources.
- Keep source names and URLs when available.
- Separate verified facts from interpretation.
- Use direct quotes sparingly and only when the wording matters.
- Soften claims when evidence is indirect, old, vendor-biased, or based on a small sample.
- Do not cite anything that was not actually checked.
- Do not invent facts, statistics, quotes, source titles, authors, URLs, dates, competitors, customers, or case studies.
- Do not treat search snippets as enough support for important factual claims if extraction is possible.
- Do not default to Vietnamese from the user's chat language. Use the content/research language explicitly provided in the brief.

## Common Pitfalls

- Ignoring reference materials and doing generic web research first.
- Researching too broadly instead of answering the brief's specific evidence need.
- Mixing product facts from user docs with external market claims without labeling the difference.
- Treating competitor copy as truth instead of positioning.
- Using outdated statistics for fast-changing topics.
- Citing sources from memory or from search snippets that were not checked.
- Returning a long research dump that orchestration cannot easily use.
- Failing to flag weak, conflicting, or unsupported evidence.

## Verification Checklist

Before returning, confirm:

- The research question and content use are clear; otherwise exactly ONE focused clarification question was asked.
- User-provided references, if any, were checked before web/Exa search.
- Exa was used for web research when available, unless user-provided references fully satisfied the task.
- At least 3 web results were retrieved for validation when web research was needed.
- Important claims do not rely on a single source.
- Sources are named and include URLs when available.
- Findings are separated from interpretation and assumptions.
- Safe claims are usable by the next writing skill.
- Risky claims are listed under claims to avoid or soften.
- Output is compact enough for orchestration to use directly.
