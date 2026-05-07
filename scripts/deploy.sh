#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if [ ! -f .env ]; then
  cp .env.example .env
  echo "Created .env from .env.example. Please fill API keys before running again."
  exit 1
fi

docker compose build
docker compose up -d gateway

echo "agent-market gateway is running. View logs with: docker compose logs -f gateway"
