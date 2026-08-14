import os

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8", errors="replace") as f:
    html = f.read()

print("Inspecting view-app-dashboard structure...")
start_idx = html.find('id="view-app-dashboard"')
print(f"view-app-dashboard found at pos {start_idx}, length of HTML: {len(html)}")
