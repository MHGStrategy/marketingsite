#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [[ "${DEPLOY_SKIP_BUILD:-}" != "1" ]]; then
  echo "==> Building static export (NODE_ENV=production)..."
  NODE_ENV=production npm run build
else
  echo "==> Skipping build (DEPLOY_SKIP_BUILD=1)"
  if [[ ! -f out/index.html ]]; then
    echo "Missing out/index.html — run without DEPLOY_SKIP_BUILD=1" >&2
    exit 1
  fi
fi

# Optional credentials: copy .env.deploy.example to .env.deploy.local and set SSHPASS
if [[ -f .env.deploy.local ]]; then
  set -a
  # shellcheck disable=SC1091
  source .env.deploy.local
  set +a
elif [[ -f .env.deploy ]]; then
  set -a
  # shellcheck disable=SC1091
  source .env.deploy
  set +a
fi

DEPLOY_HOST="${DEPLOY_HOST:-mhgstrategy}"
# Use public_html/ (no leading ~) — bash expands ~ to local home when sourcing .env
DEPLOY_PATH="${DEPLOY_PATH:-public_html/}"
DEPLOY_SSH_PORT="${DEPLOY_SSH_PORT:-6543}"

# Resolve SSH config alias (e.g. mhgstrategy → user@hostname)
SSH_TARGET="$DEPLOY_HOST"
if [[ "$DEPLOY_HOST" != *"@"* ]] && command -v ssh >/dev/null 2>&1; then
  RESOLVED="$(ssh -G "$DEPLOY_HOST" 2>/dev/null | awk '/^user /{u=$2} /^hostname /{h=$2} END{if(h) print u"@"h}')"
  [[ -n "$RESOLVED" ]] && SSH_TARGET="$RESOLVED"
fi

RSYNC_SSH=(ssh -p "$DEPLOY_SSH_PORT")
if [[ -n "${SSHPASS:-}" ]]; then
  RSYNC_SSH+=(
    -o IdentitiesOnly=yes
    -o IdentityFile=/dev/null
    -o PreferredAuthentications=password
    -o PubkeyAuthentication=no
  )
fi

RSYNC_CMD=(
  rsync -avz --delete
  --exclude 'scrapped/'
  -e "${RSYNC_SSH[*]}"
  "./out/"
  "${SSH_TARGET}:${DEPLOY_PATH}"
)

if [[ -n "${SSHPASS:-}" ]] && command -v sshpass >/dev/null 2>&1; then
  SSHPASS="$SSHPASS" sshpass -e "${RSYNC_CMD[@]}"
else
  "${RSYNC_CMD[@]}"
fi

echo "Deploy complete: https://www.mhgstrategy.com/"
