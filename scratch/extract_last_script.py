import os

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8", errors="replace") as f:
    html = f.read()

import re
matches = list(re.finditer(r'<script>[\s\S]*?</script>', html))

last_script = matches[-1].group(0)
js_code = last_script.replace('<script>', '').replace('</script>', '')

with open("scratch/temp_main_script.js", "w", encoding="utf-8") as f:
    f.write(js_code)

print(f"Saved last script block ({len(js_code)} chars) to scratch/temp_main_script.js")
