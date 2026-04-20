import os
import json
import urllib.parse

appdata = os.environ.get('APPDATA')
history_dir = os.path.join(appdata, 'Antigravity', 'User', 'History')

for root, dirs, files in os.walk(history_dir):
    if 'entries.json' in files:
        with open(os.path.join(root, 'entries.json'), 'r', encoding='utf-8') as f:
            try:
                data = json.load(f)
                resource = urllib.parse.unquote(data.get('resource', ''))
                if 'src/pages/admin' in resource and resource.endswith('.jsx'):
                    for entry in data.get('entries', []):
                        path = os.path.join(root, entry.get('id'))
                        if os.path.exists(path):
                            with open(path, 'r', encoding='utf-8', errors='ignore') as cf:
                                c = cf.read()
                                if 'Benturan' in c:
                                    print(f"Found 'Benturan' in {resource} (TS: {entry.get('timestamp')})")
                                    print(f"  Recon: {'direkonstruksi' in c.lower()}")
                                    # Print first 200 chars to see what it is
                                    print(f"  Snippet: {c[:200]}")
                                    break
            except: pass
