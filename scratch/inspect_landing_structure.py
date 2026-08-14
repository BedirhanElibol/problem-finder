import os

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8", errors="replace") as f:
    lines = f.readlines()

print(f"Total lines in landing-page.html: {len(lines)}")
for idx in range(0, 50):
    print(f"Line {idx+1}: {lines[idx].strip()[:120]}")
