import os

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8", errors="replace") as f:
    html = f.read()

print("Removing all user-facing occurrences of 'SaaS'...")

# Replace user-facing SaaS strings
html = html.replace('>SaaS Care Platform<', '>Çocuk & Yaşlı Bakım Platformu<')
html = html.replace('& CareLog SaaS', '& CareLog Platformu')
html = html.replace('SaaS Care Platform', 'Çocuk & Yaşlı Bakım Platformu')
html = html.replace('Enterprise SaaS Web App', 'Dijital Bakım Platformu')
html = html.replace('Ultra-Clean Modern SaaS', 'Ultra-Clean Modern Bakım Platformu')
html = html.replace('Modern SaaS', 'Modern Bakım Platformu')

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("Saved clean landing-page.html without user-facing 'SaaS' words!")
