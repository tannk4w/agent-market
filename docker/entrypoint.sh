#!/usr/bin/env bash
set -euo pipefail

export HERMES_HOME="${HERMES_HOME:-/home/hermes/.hermes}"
mkdir -p "$HERMES_HOME"

# Load local env when running from the mounted repo.
if [ -f /workspace/.env ]; then
  set -a
  # shellcheck disable=SC1091
  source /workspace/.env
  set +a
fi

# Bootstrap portable Hermes profile files into the runtime volume.
if [ ! -f "$HERMES_HOME/config.yaml" ] && [ -f /workspace/.hermes/config.template.yaml ]; then
  cp /workspace/.hermes/config.template.yaml "$HERMES_HOME/config.yaml"
fi

if [ -d /workspace/.hermes/skills ]; then
  mkdir -p "$HERMES_HOME/skills"
  cp -r /workspace/.hermes/skills/. "$HERMES_HOME/skills/" 2>/dev/null || true
fi

for f in AGENTS.md SOUL.md; do
  if [ -f "/workspace/.hermes/$f" ]; then
    cp "/workspace/.hermes/$f" "$HERMES_HOME/$f"
  fi
done

if [ -d /workspace/.hermes/memories ]; then
  mkdir -p "$HERMES_HOME/memories"
  for f in /workspace/.hermes/memories/*.template.md; do
    [ -e "$f" ] || continue
    base="$(basename "$f" .template.md).md"
    if [ ! -f "$HERMES_HOME/memories/$base" ]; then
      cp "$f" "$HERMES_HOME/memories/$base"
    fi
  done
fi

exec "$@"
