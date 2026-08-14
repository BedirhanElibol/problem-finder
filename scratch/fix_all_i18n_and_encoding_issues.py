import os
import re

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8", errors="replace") as f:
    html = f.read()

print("Fixing i18n, Default Language, Encoding & Data-i18n Bindings...")

# 1. Fix default language initialization to read from localStorage or default to 'tr'
html = html.replace("window.currentLangKey = 'en';", "window.currentLangKey = localStorage.getItem('app_lang') || 'tr';")
html = html.replace("var currentLangKey = 'en';", "var currentLangKey = window.currentLangKey;")

# 2. Fix corrupted Turkish characters (REPLACE corrupted glyphs with proper Turkish letters)
corrupted_replacements = {
    "Melis retmen": "Melis Öğretmen",
    "Melis retmen'in": "Melis Öğretmen'in",
    "Hemire Aye": "Hemşire Ayşe",
    "Ahmet Ylmaz": "Ahmet Yılmaz",
    "Aye Hanm": "Ayşe Hanım",
    "retmen": "Öğretmen",
    "Hemire": "Hemşire",
    "Mdr": "Müdür",
    "Bakc": "Bakıcı",
    "Ak": "Akışı",
    "Ylmaz": "Yılmaz",
    "Trke": "Türkçe",
    "Espaol": "Español"
}

for old_str, new_str in corrupted_replacements.items():
    html = html.replace(old_str, new_str)

# 3. Save preferred language to localStorage inside selectGlobalLang
html = html.replace("currentLangKey = lang;", "currentLangKey = lang;\n  localStorage.setItem('app_lang', lang);")

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("Saved updated landing-page.html!")
