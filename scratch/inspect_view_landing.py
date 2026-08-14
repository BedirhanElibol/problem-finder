import os

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

print(f"Total lines: {len(lines)}")
for idx, line in enumerate(lines):
    if "<nav" in line or 'class="navbar"' in line or 'id="view-landing"' in line or 'class="hero-section"' in line or 'class="hero-headline"' in line:
        print(f"Line {idx + 1}: {line.strip()[:150]}")
