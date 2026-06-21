#!/usr/bin/env bash
# Locally regenerate sf.js for inspection/testing.
# Release は GitHub Actions が担当するため、このスクリプトは push しません。
#
# Usage: bash scripts/generate.sh
set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"

SF_VERSION=$(sf version --json 2>/dev/null | python3 -c "import sys,json,re; d=json.load(sys.stdin); m=re.search(r'(\d+\.\d+\.\d+)', d.get('cliVersion','')); print(m.group(1))" 2>/dev/null || sf --version | grep -oE '[0-9]+\.[0-9]+\.[0-9]+' | head -1)

echo "Detected sf CLI version: $SF_VERSION"

sf commands --json 2>/dev/null | grep -v '^\[config\]' > /tmp/sf_commands_clean.json

python3 "$(dirname "$0")/generate.py" \
  --sf-version "$SF_VERSION" \
  --input /tmp/sf_commands_clean.json \
  --output "$REPO_DIR/sf.js"

echo ""
echo "sf.js generated locally for inspection."
echo "Release は GitHub Actions (update.yml) が自動で行います。"
