import os
import re

logs_dir = r"C:\Users\xmewt\.gemini\antigravity\brain"
target_dir = r"d:\Coding\website RSUD Bagas Waras\frontend rsud\src\pages"

file_versions = {}

for root, _, files in os.walk(logs_dir):
    for fn in files:
        if fn.endswith('.txt') or fn.endswith('.log'):
            path = os.path.join(root, fn)
            try:
                with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
            except:
                continue
            
            # Find all view_file blocks
            blocks = content.split("File Path: `file:///")
            for i in range(1, len(blocks)):
                block = blocks[i]
                
                # Extract file path
                filepath_end = block.find("`")
                if filepath_end == -1: continue
                filepath = block[:filepath_end]
                filepath = filepath.replace("%20", " ")
                
                # Check if it belongs to target_dir
                # e.g., d:/Coding/website RSUD Bagas Waras/frontend rsud/src/pages/admin/content/Berita.jsx
                if "src/pages" not in filepath: continue
                if not filepath.endswith(".jsx"): continue
                
                # Format to Windows path
                win_filepath = filepath.replace("/", "\\")
                
                # Check if it was wiped (size is 0)
                if not os.path.exists(win_filepath) or os.path.getsize(win_filepath) == 0:
                    pass
                else:
                    # we don't restore files that already have content, unless they were wiped.
                    # wait, they WERE all wiped! So they all have size 0 anyway.
                    pass
                
                # Find start of code
                marker = "The following code has been modified to include a line number before every line, in the format: <line_number>: <original_line>. Please note that any changes targeting the original code should remove the line number, colon, and leading space."
                start_idx = block.find(marker)
                if start_idx == -1: continue
                start_idx += len(marker)
                
                # Find end of code
                end_marker = "The above content shows the entire, complete file contents of the requested file."
                end_idx = block.find(end_marker, start_idx)
                if end_idx == -1: continue
                
                code_lines = block[start_idx:end_idx].strip().split('\n')
                
                real_code = []
                valid = True
                for line in code_lines:
                    # Remove "1: "
                    match = re.match(r"^\d+:\s(.*)", line)
                    if match:
                        real_code.append(match.group(1))
                    elif line.strip() == "":
                        real_code.append("")
                    else:
                        match = re.match(r"^\d+:(.*)", line)
                        if match:
                            real_code.append(match.group(1))
                        else:
                            # Might be multiline output or something weird, but usually view_file is strict.
                            real_code.append(line)
                            
                code_str = "\n".join(real_code)
                
                # Keep the longest or latest one (latest is in later logs, but simple approach: just keep longest, or keep latest by file mod time, but logs don't have that easily. 
                # Let's just track by latest block in newest conversation?
                # For now, just save the one with highest line count or if same, override.
                if win_filepath not in file_versions:
                    file_versions[win_filepath] = []
                file_versions[win_filepath].append(code_str)

for fpath, versions in file_versions.items():
    # Pick the longest text (most code) as a heuristic for the most complete file
    best_version = max(versions, key=lambda x: len(x))
    
    # Filter out TableSkeleton
    final_lines = [line for line in best_version.split('\n') if "import TableSkeleton" not in line]
    final_code = "\n".join(final_lines)
    
    try:
        os.makedirs(os.path.dirname(fpath), exist_ok=True)
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(final_code)
        print("Restored", fpath)
    except Exception as e:
        print("Error restoring", fpath, e)

print(f"Recovered {len(file_versions)} files.")
