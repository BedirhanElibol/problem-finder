with open("scratch/temp_script_check.js", "r", encoding="utf-8") as f:
    lines = f.readlines()

for idx in range(525, len(lines)):
    safe_line = lines[idx].encode('ascii', errors='ignore').decode('ascii')
    print(f"Line {idx + 1}: {safe_line.strip()[:140]}")
