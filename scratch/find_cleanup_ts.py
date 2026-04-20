import os
import json
import urllib.parse

appdata = os.environ.get('APPDATA')
history_dir = os.path.join(appdata, 'Antigravity', 'User', 'History')

found = False
for root, dirs, files in os.walk(history_dir):
    if 'entries.json' in files:
        with open(os.path.join(root, 'entries.json'), 'r', encoding='utf-8') as f:
            try:
                data = json.load(f)
                resource = urllib.parse.unquote(data.get('resource', ''))
                for entry in data.get('entries', []):
                    path = os.path.join(root, entry.get('id'))
                    if os.path.exists(path):
                        with open(path, 'r', encoding='utf-8', errors='ignore') as cf:
                            c = cf.read()
                            if 'Sedang Diperbarui' in c:
                                print(f"Found placeholder in {resource} at TS: {entry.get('timestamp')}")
                                found = True
                                break
                if found: break
            except: pass
