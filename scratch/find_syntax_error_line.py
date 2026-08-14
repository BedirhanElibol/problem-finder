import os

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

script_start = html.find("<script>")
script_end = html.rfind("</script>")
script_code = html[script_start+8:script_end]

lines = script_code.split("\n")
print(f"Total script lines: {len(lines)}")

# Save script code to temporary js file to parse with node
with open("scratch/temp_script_check.js", "w", encoding="utf-8") as f:
    f.write(script_code)

print("Saved script code to scratch/temp_script_check.js")
