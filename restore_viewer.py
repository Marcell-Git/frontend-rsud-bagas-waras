import os
import json
import urllib.parse

appdata = os.environ.get('APPDATA')
history_dir = os.path.join(appdata, 'Code', 'User', 'History')
target_base = r"d:\Coding\website RSUD Bagas Waras\frontend rsud\src\pages\viewer"

valid_versions = {}

for root, dirs, files in os.walk(history_dir):
    if 'entries.json' in files:
        with open(os.path.join(root, 'entries.json'), 'r', encoding='utf-8') as f:
            try:
                data = json.load(f)
                resource = urllib.parse.unquote(data.get("resource", ""))
                
                # Check if this file belongs to the affected directory and ends with .jsx
                if "frontend rsud/src/pages/viewer" in resource and resource.endswith(".jsx"):
                    idx = resource.find("src/pages/viewer/")
                    if idx != -1:
                        rel_path = resource[idx + len("src/pages/viewer/"):]
                        entries = data.get("entries", [])
                        if not entries:
                            continue
                        
                        entries.sort(key=lambda x: x.get("timestamp", 0), reverse=True)
                        
                        # Find the newest entry that does NOT contain "Sedang Diperbarui"
                        target_full = os.path.join(target_base, rel_path.replace("/", "\\"))
                        
                        for entry in entries:
                            content_path = os.path.join(root, entry.get("id"))
                            if os.path.exists(content_path):
                                with open(content_path, "r", encoding="utf-8", errors="ignore") as content_file:
                                    content = content_file.read()
                                    if "Sedang Diperbarui" not in content:
                                        # Compare if this found entry is newer than what we already stored for the file
                                        if target_full not in valid_versions or entry.get("timestamp", 0) > valid_versions[target_full]["timestamp"]:
                                            valid_versions[target_full] = {
                                                "timestamp": entry.get("timestamp", 0),
                                                "content_path": content_path
                                            }
                                        break # Found the newest valid version for this history folder
            except Exception as e:
                pass

for target_file, info in valid_versions.items():
    print(f"Restoring {target_file}")
    source_file = info["content_path"]
    os.makedirs(os.path.dirname(target_file), exist_ok=True)
    try:
        with open(source_file, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()
            
        with open(target_file, "w", encoding="utf-8") as f:
            f.write(content)
    except Exception as e:
        print(f"Failed to restore {target_file}: {e}")

print(f"Restored {len(valid_versions)} files.")
