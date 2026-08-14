import os

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

import re
tr_match = re.search(r'tr:\s*\{([\s\S]*?)\},\s*es:', html)
if tr_match:
    print("TR Dictionary Content:")
    print(tr_match.group(1)[:600])
else:
    print("TR dictionary regex match failed!")
