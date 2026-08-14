import os

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8", errors="replace") as f:
    lines = f.readlines()

for idx, line in enumerate(lines):
    if "heroTitle" in line or "heroSub" in line:
        safe_line = line.encode('ascii', errors='ignore').decode('ascii')
        print(f"Line {idx + 1}: {safe_line.strip()[:140]}")
