# kiro-sf-completion

Kiro completion spec for **Salesforce CLI (`sf`)**.

The spec version tracks the Salesforce CLI version — `v2.136.8` of this repo was generated from `sf` CLI `2.136.8`.

## Installation

1. Download `sf.js` from the [latest release](https://github.com/arcmanagement/kiro-sf-completion/releases/latest).
2. Open Kiro → **Settings** → **Editor** → **Specs Folder** and note the path.
3. Copy `sf.js` into that folder.
4. Reload Kiro. `sf` completions will appear in the terminal.

## Features

- All **228 commands** across 33 topic groups (`agent`, `apex`, `data`, `org`, `project`, `package`, …)
- Dynamic `--target-org` / `--target-dev-hub` completions powered by `sf org list`
- Enum suggestions for flags like `--test-level`, `--wait`, `--type`, etc.
- Short aliases (e.g. `-o` for `--target-org`) included

## Versioning

This repo's releases are pinned to the Salesforce CLI version they were generated from.

| Release | SF CLI version |
|---------|---------------|
| [v2.136.8](https://github.com/arcmanagement/kiro-sf-completion/releases/tag/v2.136.8) | 2.136.8 |

## Regenerating (for maintainers)

```bash
# Upgrade sf CLI first, then:
bash scripts/generate.sh
git add sf.js package.json
git commit -m "sf X.Y.Z"
git tag vX.Y.Z
gh release create vX.Y.Z sf.js --title "sf X.Y.Z" --notes "Generated from Salesforce CLI vX.Y.Z"
```

## License

MIT
