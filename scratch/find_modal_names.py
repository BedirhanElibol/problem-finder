import os

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

import re
modals = re.findall(r'id=["\'](modal-[^"\']+)["\']', html)
functions = re.findall(r'function\s+([a-zA-Z0-9_]+Modal[a-zA-Z0-9_]*)', html)

print("Modals found:", modals)
print("Modal functions found:", functions)
