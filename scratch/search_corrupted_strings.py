import os
import re

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8", errors="replace") as f:
    html = f.read()

print("Searching for corrupted strings in landing-page.html...")

corrupted_patterns = ['ÖğÖğ', 'Akışıış', 'ÖğÖğÖğretmen', 'Veli / Aile Akışıışır', 'Veli / Aile Akışıışı']
for pattern in corrupted_patterns:
    matches = [line.strip()[:140] for line in html.split('\n') if pattern in line]
    print(f"Pattern '{pattern}': {len(matches)} matches")
    for m in matches:
        print(f"  -> {m}")
