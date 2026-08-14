with open("scratch/temp_script_check.js", "r", encoding="utf-8") as f:
    lines = f.readlines()

for idx in range(525, len(lines)):
    print(f"Line {idx + 1}: {lines[idx].strip()[:140]}")
