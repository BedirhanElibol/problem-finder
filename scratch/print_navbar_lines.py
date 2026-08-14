import os

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

for idx in range(450, 520):
    if idx < len(lines):
        print(f"Line {idx + 1}: {lines[idx].strip()[:140]}")
