import os

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

for idx in range(1840, 1865):
    if idx < len(lines):
        line = lines[idx].encode('ascii', errors='ignore').decode('ascii')
        print(f"Line {idx + 1}: {line.strip()[:140]}")
