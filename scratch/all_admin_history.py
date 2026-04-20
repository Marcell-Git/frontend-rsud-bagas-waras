import os
import json
import urllib.parse

appdata = os.environ.get('APPDATA')
history_dir = os.path.join(appdata, 'Antigravity', 'User', 'History')

history_files = set()

for root, dirs, files in os.walk(history_dir):
    if 'entries.json' in files:
        with open(os.path.join(root, 'entries.json'), 'r', encoding='utf-8') as f:
            try:
                data = json.load(f)
                resource = urllib.parse.unquote(data.get('resource', ''))
                if 'src/pages/admin' in resource and resource.endswith('.jsx'):
                    history_files.add(resource)
            except: pass

for hf in sorted(list(history_files)):
    print(hf)
