import os

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

# Ensure default language reads app_lang from localStorage or defaults to 'tr'
html = html.replace("window.currentLangKey = 'en';", "window.currentLangKey = localStorage.getItem('app_lang') || 'tr';")
html = html.replace("var currentLangKey = 'en';", "var currentLangKey = window.currentLangKey || 'tr';")
html = html.replace("let currentLangKey = 'en';", "let currentLangKey = window.currentLangKey || 'tr';")

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("Updated initial language settings in landing-page.html!")
