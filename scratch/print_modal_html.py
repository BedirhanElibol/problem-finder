import os
import re

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8", errors="replace") as f:
    html = f.read()

idx = html.find('id="modal-role-gateway"')
if idx != -1:
    end_idx = html.find('</div>\n    </div>\n  </div>', idx)
    print("MODAL HTML snippet:")
    modal_str = html[idx:idx+2500]
    # Replace non-ascii for safe console printing
    safe_str = modal_str.encode('ascii', 'xmlcharrefreplace').decode('ascii')
    print(safe_str)
