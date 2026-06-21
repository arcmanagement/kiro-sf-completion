#!/usr/bin/env bash
# Regenerate sf.js from the locally installed sf CLI.
# Run this whenever you upgrade sf CLI, then commit + tag the new version.
set -euo pipefail

SF_VERSION=$(sf version --json 2>/dev/null | python3 -c "import sys,json,re; d=json.load(sys.stdin); m=re.search(r'(\d+\.\d+\.\d+)', d.get('cliVersion','')); print(m.group(1))" 2>/dev/null || sf --version | grep -oE '[0-9]+\.[0-9]+\.[0-9]+' | head -1)

echo "Detected sf CLI version: $SF_VERSION"

# Dump commands (skip first warning line if present)
sf commands --json 2>/dev/null | grep -v '^\[config\]' > /tmp/sf_commands_clean.json

python3 "$(dirname "$0")/generate.py" \
  --sf-version "$SF_VERSION" \
  --input /tmp/sf_commands_clean.json \
  --output "$(dirname "$0")/../sf.js"

echo ""
echo "Done. Next steps:"
echo "  git add sf.js package.json"
echo "  git commit -m \"sf $SF_VERSION\""
echo "  git tag v$SF_VERSION"
echo "  gh release create v$SF_VERSION sf.js --title \"sf $SF_VERSION\" --notes \"Generated from Salesforce CLI v$SF_VERSION\""
