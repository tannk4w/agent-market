FROM python:3.11-slim

ENV DEBIAN_FRONTEND=noninteractive \
    HERMES_HOME=/home/hermes/.hermes \
    PYTHONUNBUFFERED=1 \
    PATH=/home/hermes/.local/bin:/home/hermes/.cargo/bin:${PATH}

RUN apt-get update && apt-get install -y --no-install-recommends \
    bash \
    build-essential \
    ca-certificates \
    curl \
    git \
    jq \
    nodejs \
    npm \
    openssh-client \
    tmux \
    && rm -rf /var/lib/apt/lists/*

RUN useradd -m -s /bin/bash hermes

USER hermes
WORKDIR /home/hermes

RUN curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash

WORKDIR /workspace

COPY --chown=hermes:hermes docker/entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
CMD ["hermes"]
