import os
import json
import urllib.parse

appdata = os.environ.get('APPDATA')
history_dirs = [
    os.path.join(appdata, 'Antigravity', 'User', 'History')
]

for history_dir in history_dirs:
    if not os.path.exists(history_dir):
        continue
    for root, dirs, files in os.walk(history_dir):
        if 'entries.json' in files:
            with open(os.path.join(root, 'entries.json'), 'r', encoding='utf-8') as f:
                try:
                    data = json.load(f)
                    resource = urllib.parse.unquote(data.get('resource', '')).lower()
                    if 'src/pages/admin/pengaduan/' in resource:
                        print(f"File: {resource}")
                except:
                    pass
