#!/usr/bin/env python3
"""Generate Kiro completion spec for Salesforce CLI (sf).

Usage:
  python3 generate_sf_spec.py [--sf-version X.Y.Z] [--input sf_commands.json] [--output sf.js]

The input JSON is produced by:
  sf commands --json 2>/dev/null | tail -n +2 > sf_commands.json
"""

import json
import re
import sys
import argparse
import subprocess

GLOBAL_FLAGS = {'json', 'flags-dir', 'loglevel'}
ORG_FLAGS = {'target-org', 'target-dev-hub'}
FILE_PATH_FLAGS = {
    'output-dir', 'output-file', 'spec', 'manifest', 'source-dir',
    'root-dir', 'file', 'path', 'config-file', 'definition-file',
    'plan-file', 'batch-size',
}

PREAMBLE = '''\
// Kiro completion spec for Salesforce CLI (sf)
// Generated from: sf commands --json
// SF CLI version: {sf_version}
// Spec version:   {sf_version}
//
// Installation:
//   Copy sf.js to your Kiro Specs folder
//   (Kiro → Settings → Editor → Specs Folder)
//
// Source: https://github.com/arcmanagement/kiro-sf-completion

/** Dynamic generator for --target-org and --target-dev-hub flags */
const orgGenerator = {{
  script: ["sf", "org", "list", "--json"],
  postProcess: (out) => {{
    try {{
      const {{ result }} = JSON.parse(out);
      const scratch = (result.scratchOrgs || []).map((o) => ({{
        name: o.alias || o.username,
        description: `scratch • ${{o.username}}`,
        icon: "🧪",
      }}));
      const nonScratch = (result.nonScratchOrgs || []).map((o) => ({{
        name: o.alias || o.username,
        description: `${{o.orgId}} • ${{o.username}}`,
        icon: "☁️",
      }}));
      return [...scratch, ...nonScratch].filter((o) => o.name);
    }} catch {{
      return [];
    }}
  }},
}};

'''


def esc(s):
    """Escape a string for use in a JS double-quoted string."""
    if not s:
        return ''
    s = str(s)
    s = s.replace('\\', '\\\\')
    s = s.replace('"', '\\"')
    s = re.sub(r'\s+', ' ', s).strip()
    return s


def flag_to_option(fname, fdef):
    ftype = fdef.get('type', 'boolean')
    char = fdef.get('char')
    summary = fdef.get('summary') or fdef.get('description') or ''
    enum_values = fdef.get('options')
    multiple = fdef.get('multiple', False)
    required = fdef.get('required', False)

    names = [f'--{fname}']
    if char:
        names.append(f'-{char}')

    opt = {}
    opt['name'] = names if len(names) > 1 else names[0]
    if summary:
        opt['description'] = esc(str(summary))

    if ftype != 'boolean':
        arg = {'name': fname}
        if fname in ORG_FLAGS:
            arg['generators'] = '__ORG_GENERATOR__'
        elif fname in FILE_PATH_FLAGS:
            arg['template'] = 'filepaths'
        elif enum_values:
            arg['suggestions'] = enum_values
        if multiple:
            arg['isVariadic'] = True
        opt['args'] = arg

    if required:
        opt['isRequired'] = True

    return opt


def build_tree(commands):
    tree = {}
    for cmd in commands:
        cid = cmd['id']
        parts = cid.split(':')
        node = tree
        for i, part in enumerate(parts):
            if part not in node:
                node[part] = {'_cmd': None, '_children': {}}
            if i == len(parts) - 1:
                node[part]['_cmd'] = cmd
            node = node[part]['_children']
    return tree


def tree_to_subcommands(tree):
    result = []
    for name, node in sorted(tree.items()):
        entry = {'name': name}
        cmd = node['_cmd']
        children = node['_children']

        if cmd:
            summary = cmd.get('summary') or cmd.get('description') or ''
            if summary:
                entry['description'] = esc(str(summary))

            flags = cmd.get('flags', {})
            options = []
            for fname, fdef in flags.items():
                if fname in GLOBAL_FLAGS:
                    continue
                if fdef.get('hidden'):
                    continue
                options.append(flag_to_option(fname, fdef))
            if options:
                entry['options'] = options

        if children:
            entry['subcommands'] = tree_to_subcommands(children)

        result.append(entry)

    return result


def to_js(obj, indent=0):
    """Serialize a Python object to a JS object literal (not JSON)."""
    pad = '  ' * indent
    pad1 = '  ' * (indent + 1)

    if isinstance(obj, dict):
        if not obj:
            return '{}'
        parts = []
        for k, v in obj.items():
            if v == '__ORG_GENERATOR__':
                parts.append(f'{pad1}{k}: orgGenerator')
            else:
                js_v = to_js(v, indent + 1)
                parts.append(f'{pad1}{k}: {js_v}')
        inner = ',\n'.join(parts)
        return '{\n' + inner + '\n' + pad + '}'

    elif isinstance(obj, list):
        if not obj:
            return '[]'
        items = [pad1 + to_js(v, indent + 1) for v in obj]
        return '[\n' + ',\n'.join(items) + '\n' + pad + ']'

    elif isinstance(obj, bool):
        return 'true' if obj else 'false'

    elif isinstance(obj, str):
        return f'"{obj}"'

    elif obj is None:
        return 'null'

    else:
        return str(obj)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--sf-version', default=None)
    parser.add_argument('--input', default='/tmp/sf_commands_clean.json')
    parser.add_argument('--output', default=None)
    args = parser.parse_args()

    # Detect sf version if not specified
    sf_version = args.sf_version
    if not sf_version:
        try:
            out = subprocess.check_output(['sf', 'version', '--json'], text=True, stderr=subprocess.DEVNULL)
            info = json.loads(out)
            # version field like "@salesforce/cli/2.136.8 darwin-arm64 ..."
            version_str = info.get('cliVersion', '') or info.get('version', '')
            m = re.search(r'(\d+\.\d+\.\d+)', version_str)
            if m:
                sf_version = m.group(1)
        except Exception:
            sf_version = 'unknown'

    print(f"SF CLI version: {sf_version}", file=sys.stderr)

    with open(args.input) as f:
        data = json.load(f)

    visible = [c for c in data if not c.get('hidden') and not c.get('deprecationOptions')]
    print(f"Commands: {len(visible)}", file=sys.stderr)

    tree = build_tree(visible)
    subcommands = tree_to_subcommands(tree)

    spec = {
        'name': 'sf',
        'description': 'Salesforce CLI',
        'subcommands': subcommands,
        'options': [
            {'name': ['--help', '-h'], 'description': 'Show help for sf.'},
            {'name': '--version', 'description': 'Show CLI version.'},
        ],
    }

    preamble = PREAMBLE.format(sf_version=sf_version)
    body = f'const completionSpec = {to_js(spec, 0)};\n\nexport default completionSpec;\n'
    output = preamble + body

    out_path = args.output or f'sf.js'
    with open(out_path, 'w') as f:
        f.write(output)

    size_kb = len(output) // 1024
    print(f"Written {out_path} ({size_kb}KB)", file=sys.stderr)


if __name__ == '__main__':
    main()
