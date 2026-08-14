import os
import re

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8", errors="replace") as f:
    html = f.read()

print("Searching for broken footer & kinellog in landing-page.html...")
matches = [line.strip()[:140] for line in html.split('\n') if 'kinellog' in line.lower() or 'contact info:' in line.lower() or ('img' in line.lower() and 'kinde' in line.lower())]
print(f"Total matching lines: {len(matches)}")
for m in matches:
    print("  ->", m)
