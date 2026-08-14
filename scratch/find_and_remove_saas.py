import os

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8", errors="replace") as f:
    lines = f.readlines()

print("Searching for 'SaaS' occurrences in landing-page.html...")
for idx, line in enumerate(lines):
    if "saas" in line.lower():
        print(f"Line {idx+1}: {line.strip()[:140]}")
