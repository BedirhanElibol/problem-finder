import os

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8", errors="replace") as f:
    lines = f.readlines()

print("--- Launch Function Lines ---")
for idx, line in enumerate(lines):
    if "launchDedicatedRoleApp" in line or "view-app-dashboard" in line or "saas-sidebar-brand" in line:
        print(f"Line {idx + 1}: {line.strip()[:140]}")
