import os

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8", errors="replace") as f:
    html = f.read()

body_end = html.rfind("</body>")
script_end = html.rfind("</script>", 0, body_end)
script_start = html.rfind("<script>", 0, script_end)

script_code = html[script_start+8:script_end]

with open("scratch/temp_main_script.js", "w", encoding="utf-8") as f:
    f.write(script_code)

print(f"Saved main script block ({len(script_code)} chars) to scratch/temp_main_script.js")
