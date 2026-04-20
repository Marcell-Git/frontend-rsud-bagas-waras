import os
import json
import urllib.parse

appdata = os.environ.get('APPDATA')
history_dirs = [
    os.path.join(appdata, 'Code', 'User', 'History'),
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
                    resource = urllib.parse.unquote(data.get('resource', ''))
                    if 'benturankepentingan' in resource.lower():
                        print(f"Found in {history_dir}: {resource}")
                        for entry in data.get('entries', []):
                            content_path = os.path.join(root, entry.get('id'))
                            if os.path.exists(content_path):
                                with open(content_path, 'r', encoding='utf-8', errors='ignore') as cf:
                                    content = cf.read()
                                    is_recon = 'direkonstruksi' in content.lower()
                                    print(f"  Timestamp: {entry.get('timestamp')}, Size: {len(content)}, Recon: {is_recon}")
                except:
                    pass
