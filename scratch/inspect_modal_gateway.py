import os
import re

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8", errors="replace") as f:
    html = f.read()

print("Searching for modal-role-gateway in landing-page.html...")
modal_match = re.search(r'id=["\']modal-role-gateway["\'][\s\S]*?</div\s*>\s*</div\s*>\s*</div\s*>', html)
if modal_match:
    print("Found modal-role-gateway!")
    print(modal_match.group(0)[:800])
else:
    print("Not found by exact regex. Searching for role-modal or gateway...")
    matches = [line for line in html.split('\n') if 'gateway' in line.lower() or 'modal-role' in line.lower() or 'ÖğÖğ' in line]
    for m in matches[:10]:
        print(m[:140])
