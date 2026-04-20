import os
import glob
import json
import shutil
from urllib.parse import unquote

history_dir = os.path.join(os.environ['APPDATA'], 'Code', 'User', 'History')

found_records = {}

for entries_path in glob.glob(os.path.join(history_dir, '**', 'entries.json'), recursive=True):
    try:
        with open(entries_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
            # check the resource path
            resource = unquote(data.get('resource', ''))
            
            # case insensitive match
            res_lower = resource.lower()
            if 'website rsud bagas waras' in res_lower and 'frontend rsud/src/pages' in res_lower:
                # normalize path safely 
                norm_res = resource.replace('file:///', '').replace('/', '\\')
                # on windows drive letter might be like d:/ => we want d:\
                
                # entries has 'entries' list. The last one is the latest
                entries = data.get('entries', [])
                if not entries:
                    continue
                
                folder_path = os.path.dirname(entries_path)
                
                best_entry_file = None
                for entry in reversed(entries):
                    file_id = entry.get('id')
                    cached_file = os.path.join(folder_path, file_id)
                    if os.path.exists(cached_file) and os.path.getsize(cached_file) > 100:
                        with open(cached_file, 'r', encoding='utf-8') as cf:
                            cc = cf.read()
                        if "Sedang Diperbarui" not in cc and "Halaman Sedang Direkonstruksi" not in cc and "Isi Halaman" not in cc:
                            best_entry_file = cached_file
                            break
                            
                if best_entry_file:
                    found_records[norm_res] = best_entry_file
    except Exception as e:
        pass

print(f"Found local history for {len(found_records)} files!")
for original_path, backup_path in found_records.items():
    print(f"Restoring: {original_path}")
    os.makedirs(os.path.dirname(original_path), exist_ok=True)
    shutil.copy2(backup_path, original_path)

print("Done restoring from VSCode history.")
