import os

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8", errors="replace") as f:
    html = f.read()

import re
matches = list(re.finditer(r'<script[\s\S]*?</script>', html))
print(f"Total script blocks found: {len(matches)}")
for idx, m in enumerate(matches):
    content = m.group(0)
    print(f"\n--- SCRIPT BLOCK {idx+1} ({len(content)} chars) ---")
    print(content[:150])
