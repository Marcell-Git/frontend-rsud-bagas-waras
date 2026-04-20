import os
import json
import shutil
import glob
import urllib.parse

appdata = os.environ.get('APPDATA')
history_dir = os.path.join(appdata, 'Code', 'User', 'History')
target_base = r"d:\Coding\website RSUD Bagas Waras\frontend rsud\src\pages"

latest_versions = {}

for root, dirs, files in os.walk(history_dir):
    if 'entries.json' in files:
        with open(os.path.join(root, 'entries.json'), 'r', encoding='utf-8') as f:
            try:
                data = json.load(f)
                resource = urllib.parse.unquote(data.get("resource", ""))
                
                # Check if this file belongs to the affected directory and ends with .jsx
                if "frontend rsud/src/pages" in resource and resource.endswith(".jsx"):
                    # Extract the relative path from src/pages
                    # e.g., file:///d:/Coding/website RSUD Bagas Waras/frontend rsud/src/pages/admin/content/Berita.jsx
                    idx = resource.find("src/pages/")
                    if idx != -1:
                        rel_path = resource[idx + len("src/pages/"):]
                        # Find the latest entry
                        entries = data.get("entries", [])
                        if not entries:
                            continue
                        # Sort entries by timestamp descending
                        entries.sort(key=lambda x: x.get("timestamp", 0), reverse=True)
                        latest_entry = entries[0]
                        latest_id = latest_entry.get("id")
                        content_path = os.path.join(root, latest_id)
                        
                        target_full = os.path.join(target_base, rel_path.replace("/", "\\"))
                        
                        # We only keep the very latest revision globally for a given file
                        # if there are multiple history folders for the same file.
                        if target_full not in latest_versions or latest_entry.get("timestamp", 0) > latest_versions[target_full]["timestamp"]:
                            latest_versions[target_full] = {
                                "timestamp": latest_entry.get("timestamp", 0),
                                "content_path": content_path
                            }
            except Exception as e:
                pass

for target_file, info in latest_versions.items():
    print(f"Restoring {target_file}")
    source_file = info["content_path"]
    os.makedirs(os.path.dirname(target_file), exist_ok=True)
    # Filter out TableSkeleton import
    try:
        with open(source_file, "r", encoding="utf-8", errors="ignore") as f:
            lines = f.readlines()
        
        lines = [line for line in lines if "import TableSkeleton" not in line]
        
        with open(target_file, "w", encoding="utf-8") as f:
            f.writelines(lines)
    except Exception as e:
        print(f"Failed to restore {target_file}: {e}")

print(f"Restored {len(latest_versions)} files.")
