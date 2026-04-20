import os
import json
import urllib.parse
import time

appdata = os.environ.get('APPDATA')
history_dir = os.path.join(appdata, 'Antigravity', 'User', 'History')
target_file = "alurpelayanan.jsx"

for root, dirs, files in os.walk(history_dir):
    if 'entries.json' in files:
        with open(os.path.join(root, 'entries.json'), 'r', encoding='utf-8') as f:
            try:
                data = json.load(f)
                resource = urllib.parse.unquote(data.get('resource', '')).lower()
                if target_file in resource and 'src/pages/viewer' in resource:
                    print(f"File: {resource}")
                    for entry in sorted(data.get('entries', []), key=lambda x: x.get('timestamp', 0)):
                        path = os.path.join(root, entry.get('id'))
                        if os.path.exists(path):
                            with open(path, 'r', encoding='utf-8', errors='ignore') as cf:
                                content = cf.read()
                                is_placeholder = 'Sedang Diperbarui' in content
                                print(f"  TS: {entry.get('timestamp')}, Size: {len(content)}, Placeholder: {is_placeholder}")
            except: pass
