import os

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

import re
meta_match = re.search(r'const langMeta = \{([\s\S]*?)\};', html)
if meta_match:
    print("langMeta content:")
    print(meta_match.group(1))
else:
    print("langMeta regex match failed!")
