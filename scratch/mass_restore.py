import os
import json
import urllib.parse
import shutil

appdata = os.environ.get('APPDATA')
history_dirs = [
    os.path.join(appdata, 'Antigravity', 'User', 'History'),
    os.path.join(appdata, 'Code', 'User', 'History')
]
project_root = r"d:\Coding\website RSUD Bagas Waras\frontend rsud"
# 2026-04-20 12:00:00 local time approx
CUTOFF = 1776661000000 

valid_versions = {}

for history_dir in history_dirs:
    if not os.path.exists(history_dir):
        continue
    for root, dirs, files in os.walk(history_dir):
        if 'entries.json' in files:
            with open(os.path.join(root, 'entries.json'), 'r', encoding='utf-8') as f:
                try:
                    data = json.load(f)
                    resource = urllib.parse.unquote(data.get('resource', ''))
                    
                    if 'src/pages/' in resource and resource.endswith('.jsx'):
                        entries = data.get('entries', [])
                        # Filtering entries before the cleanup
                        pre_cleanup_entries = [e for e in entries if e.get('timestamp', 0) < CUTOFF]
                        if not pre_cleanup_entries:
                            continue
                        
                        # Get newest one before cutoff
                        pre_cleanup_entries.sort(key=lambda x: x.get('timestamp', 0), reverse=True)
                        best_entry = pre_cleanup_entries[0]
                        
                        # Map to local path
                        local_path = resource.replace("file:///", "").replace("/", "\\")
                        if project_root.lower() in local_path.lower():
                            ts = best_entry.get('timestamp', 0)
                            if local_path not in valid_versions or ts > valid_versions[local_path]['ts']:
                                valid_versions[local_path] = {
                                    'ts': ts,
                                    'path': os.path.join(root, best_entry.get('id'))
                                }
                except: pass

count = 0
for local_path, info in valid_versions.items():
    if os.path.exists(info['path']):
        print(f"Restoring {local_path} (TS: {info['ts']})")
        os.makedirs(os.path.dirname(local_path), exist_ok=True)
        shutil.copy2(info['path'], local_path)
        count += 1

print(f"Restored {count} files to state before 12 PM.")
