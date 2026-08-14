import os

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8", errors="replace") as f:
    html = f.read()

print("Fixing Purple Ban in landing-page.html...")

html = html.replace('bg-purple-500/20', 'bg-amber-500/20')
html = html.replace('border-purple-500/30', 'border-amber-500/30')
html = html.replace('text-purple-400', 'text-amber-400')
html = html.replace('purple', 'amber')

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("Saved Purple Ban fix!")
