# MEMORY template

Use this file as a starting point only. Do not commit real user/session memory, API keys, credentials, private customer data, or runtime logs.

Reusable workflow facts for this profile:
- Primary entrypoint: marketing-orchestration.
- Default Vietnamese blog workflow: marketing-orchestration -> marketing-brainstorm -> marketing-research -> marketing-blog-article -> marketing-blog-publish.
- Blog publishing target: x-interview API draft mode, endpoint configured by skill/template, API key via X_INTERVIEW_KEY.
- Marketing research can use EXA_API_KEY when available and should fall back to web research if Exa is unavailable.
