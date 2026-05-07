# agent-market

Reusable Hermes marketing/content agent profile with Docker deployment support.

This repo stores only portable, non-secret Hermes profile files:

- `.hermes/AGENTS.md`
- `.hermes/SOUL.md`
- `.hermes/skills/*`
- `.hermes/config.template.yaml`
- `.hermes/memories/*.template.md`
- Docker runtime files

Real secrets, auth tokens, sessions, logs, and local memory are intentionally ignored by Git.

## Quick start locally with Docker

```bash
cp .env.example .env
# Fill API keys in .env

docker compose build
docker compose run --rm hermes
```

Run one prompt:

```bash
docker compose run --rm hermes hermes chat -q "Viết 5 ý tưởng blog cho x-money"
```

## Deploy gateway on server

```bash
git clone <YOUR_REPO_URL> agent-market
cd agent-market
cp .env.example .env
# Fill .env

./scripts/deploy.sh
```

View logs:

```bash
docker compose logs -f gateway
```

Stop:

```bash
docker compose down
```

Update after pushing new skills/config templates:

```bash
git pull
docker compose build
docker compose up -d gateway
```

## Required environment variables

At least one model provider key is required:

- `OPENROUTER_API_KEY`
- `ANTHROPIC_API_KEY`
- `OPENAI_API_KEY`
- `GOOGLE_API_KEY`

Marketing workflow variables:

- `EXA_API_KEY` for marketing research, optional but recommended
- `X_INTERVIEW_KEY` for publishing blog drafts to x-interview

## Important security rule

Never commit these files:

- `.env`
- `.hermes/.env`
- `.hermes/config.yaml`
- `.hermes/auth.json`
- `.hermes/sessions/`
- `.hermes/logs/`
- real `.hermes/memories/MEMORY.md`

Before pushing, check:

```bash
git status
git diff --cached
```

Optional secret scan:

```bash
docker run --rm -v "$PWD:/repo" zricethezav/gitleaks:latest detect --source /repo
```

## Native install without Docker

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
mkdir -p ~/.hermes
cp .hermes/config.template.yaml ~/.hermes/config.yaml
cp .hermes/AGENTS.md ~/.hermes/AGENTS.md
cp .hermes/SOUL.md ~/.hermes/SOUL.md
cp -r .hermes/skills ~/.hermes/skills
hermes
```
