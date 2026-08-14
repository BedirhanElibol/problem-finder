import os
import re

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8", errors="replace") as f:
    html = f.read()

print("Searching for role-workspace- divs in landing-page.html...")
matches = re.findall(r'id=["\']role-workspace-[^"\']*["\']', html)
print(f"Found {len(matches)} role workspace container IDs:")
for m in matches:
    print("  ->", m)
