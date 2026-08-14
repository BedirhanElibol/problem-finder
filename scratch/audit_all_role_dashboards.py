import os
import re

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8", errors="replace") as f:
    html = f.read()

print("Auditing all 4 Role Dashboards in landing-page.html...")

roles = ['ogretmen', 'carelog', 'veli', 'yonetici']
for role in roles:
    print(f"\n==================== ROLE: {role.upper()} ====================")
    # Search for role-specific view or elements
    matches = [line.strip() for line in html.split('\n') if role in line.lower() and ('view' in line.lower() or 'dashboard' in line.lower() or 'table' in line.lower() or 'form' in line.lower() or 'button' in line.lower())]
    print(f"Total matching elements/lines: {len(matches)}")
    for m in matches[:8]:
        print(f"  -> {m[:130]}")
