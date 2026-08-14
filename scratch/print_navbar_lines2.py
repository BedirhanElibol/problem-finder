import os

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

for idx in range(475, 540):
    if idx < len(lines):
        line = lines[idx].strip()
        # safe ascii print
        safe_line = line.encode('ascii', errors='ignore').decode('ascii')
        print(f"Line {idx + 1}: {safe_line[:140]}")
