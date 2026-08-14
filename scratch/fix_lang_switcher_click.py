import os

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8", errors="replace") as f:
    html = f.read()

print("Fixing selectGlobalLang in landing-page.html...")

old_select_lang = '''function selectGlobalLang(lang) {
      if (window.setGlobalLang) {
        window.setGlobalLang(lang);
      }
      const menu = document.getElementById('lang-menu');
      if (menu) menu.classList.add('hidden');
    }'''

new_select_lang = '''function selectGlobalLang(lang) {
      if (window.setGlobalLang) {
        window.setGlobalLang(lang);
      }
      const flagMap = { en: '🇺🇸', tr: '🇹🇷', es: '🇪🇸', zh: '🇨🇳' };
      const labelMap = { en: 'EN', tr: 'TR', es: 'ES', zh: 'ZH' };
      const flagEl = document.getElementById('lang-btn-flag');
      const labelEl = document.getElementById('lang-btn-label');
      if (flagEl && flagMap[lang]) flagEl.innerText = flagMap[lang];
      if (labelEl && labelMap[lang]) labelEl.innerText = labelMap[lang];
      const menu = document.getElementById('lang-menu');
      if (menu) menu.classList.add('hidden');
    }'''

if old_select_lang in html:
    html = html.replace(old_select_lang, new_select_lang)
    print("Replaced selectGlobalLang cleanly!")

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("Saved selectGlobalLang fix!")
