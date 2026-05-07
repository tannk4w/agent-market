Marketing workflow convention for agent-marketing: within marketing-orchestration, all marketing/content creation, rewriting, review, ideation, social posts, captions, hooks, polish, and humanization requests must go through the full workflow with no direct-answer shortcut: marketing-brainstorm -> marketing-research -> marketing-blog-article or another explicitly matching writing/planning specialist -> self-review. Research-only requests may stop after research.
§
Marketing brainstorm workflows should request product/brand descriptions before product-led content, and new reusable product/brand information should be saved to Memory so future requests can reuse it instead of asking again.
§
Marketing brainstorm workflows must always confirm the requested writing language before drafting or handing off to research/writing. Do not infer the final content language from the user's chat language.
§
Marketing profile Exa search is expected to be available via `EXA_API_KEY` in the runtime marketing profile environment. If Exa fails, fall back to configured web search/extraction tools and note the fallback when confidence is affected.
§
Marketing content requests (blogs, articles, social posts, rewrites, hooks, captions, etc.) MUST go through marketing-orchestration skill from the start, even when the user's brief seems clear and complete. Do not handle marketing writing tasks directly with web_search + write_file without loading marketing-orchestration. The workflow is: marketing-orchestration -> marketing-brainstorm -> marketing-research -> marketing-blog-article -> self-review.
§
Brand context: x-money is an AI-powered personal finance/expense management app. It helps users analyze and record income/expenses; instead of manual input, users can take a photo or use voice and AI automatically analyzes and logs the entry into history.
§
Hermes setup detail: user's marketing Slack gateway profile is named `agent-market` with alias `agent-market` on macOS launchd; its profile logs are under `~/.hermes/profiles/agent-market/logs/`.