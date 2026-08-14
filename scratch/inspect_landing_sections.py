import os
import re

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8", errors="replace") as f:
    html = f.read()

print("Listing all sections and main containers in landing-page.html:")
sections = re.findall(r'<section[\s\S]*?</section>', html)
print(f"Total <section> tags found: {len(sections)}")

for idx, sec in enumerate(sections):
    lines = sec.strip().split('\n')
    print(f"\n--- SECTION {idx+1} ({len(lines)} lines) ---")
    print("\n".join(lines[:6]))
