import os

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

for idx, line in enumerate(lines):
    if "<script" in line or "</script>" in line:
        print(f"Line {idx + 1}: {line.strip()[:140]}")
