import os

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

# Clean up duplicate script tags
html = html.replace('</script>\n  // EarthGuard Interactive Logic', '\n  // EarthGuard Interactive Logic')
html = html.replace('</script>\n</script>', '</script>')

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("Cleaned up duplicate script tags!")
