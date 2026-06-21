#!/usr/bin/env bash
# Regenerate sf.js from the locally installed sf CLI, then commit and release.
# Usage: bash scripts/generate.sh
set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"

SF_VERSION=$(sf version --json 2>/dev/null | python3 -c "import sys,json,re; d=json.load(sys.stdin); m=re.search(r'(\d+\.\d+\.\d+)', d.get('cliVersion','')); print(m.group(1))" 2>/dev/null || sf --version | grep -oE '[0-9]+\.[0-9]+\.[0-9]+' | head -1)

echo "Detected sf CLI version: $SF_VERSION"

# Check if this version is already released
if git -C "$REPO_DIR" tag | grep -qx "v$SF_VERSION"; then
  echo "v$SF_VERSION is already released. Nothing to do."
  exit 0
fi

# Dump commands (skip warning lines)
sf commands --json 2>/dev/null | grep -v '^\[config\]' > /tmp/sf_commands_clean.json

# Regenerate sf.js
python3 "$(dirname "$0")/generate.py" \
  --sf-version "$SF_VERSION" \
  --input /tmp/sf_commands_clean.json \
  --output "$REPO_DIR/sf.js"

# Update version in package.json
python3 -c "
import json
path = '$REPO_DIR/package.json'
d = json.load(open(path))
d['version'] = '$SF_VERSION'
open(path, 'w').write(json.dumps(d, indent=2) + '\n')
"

# Commit, tag, push, release
cd "$REPO_DIR"
git add sf.js package.json
git commit -m "sf $SF_VERSION"
git tag "v$SF_VERSION"
git push origin main
git push origin "v$SF_VERSION"

gh release create "v$SF_VERSION" sf.js \
  --title "sf $SF_VERSION" \
  --notes "$(cat << EOF
## Salesforce CLI $SF_VERSION completion spec for Kiro

### Installation
1. Download \`sf.js\` from this release
2. Copy it into your Kiro Specs folder (Kiro → Settings → Editor → Specs Folder)
3. Reload Kiro

### Coverage
Generated from \`sf commands --json\` on Salesforce CLI v$SF_VERSION.
EOF
)"

echo ""
echo "✓ Released v$SF_VERSION → https://github.com/arcmanagement/kiro-sf-completion/releases/tag/v$SF_VERSION"
