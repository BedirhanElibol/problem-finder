import os

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8", errors="replace") as f:
    html = f.read()

print("Updating static HTML defaults to Turkish (TR)...")

# 1. Update lang button static HTML default to TR
html = html.replace('<span id="lang-btn-label">EN</span>', '<span id="lang-btn-label">TR</span>')
html = html.replace('<span id="lang-btn-flag"></span>', '<span id="lang-btn-flag">🇹🇷</span>')

# 2. Update static hero title and subtitle in HTML to TR
old_h1 = '''<h1 class="hero-h1">
        KinderLog & CareLog: Transformative Care & Communication for Childcare & Senior Facilities
      </h1>'''

new_h1 = '''<h1 class="hero-h1" data-i18n="heroTitle">
        KinderLog & CareLog: Kreş ve Huzurevleri İçin Yeni Nesil Şeffaf Bakım & İletişim Platformu
      </h1>'''

old_sub = '''<p class="hero-subtitle">
        Empower Staff with Easy Recording, Delight Families with Transparent Updates.<br>Say Goodbye to WhatsApp Chaos and Paper Forms!
      </p>'''

new_sub = '''<p class="hero-subtitle" data-i18n="heroSub">
        Personelinizi 2 tıkla hızlı kayıtla güçlendirin, aileleri anlık şeffaf raporlarla sevindirin.<br>WhatsApp karmaşasına ve kağıt formlara son verin!
      </p>'''

html = html.replace(old_h1, new_h1)
html = html.replace(old_sub, new_sub)

# 3. Ensure window.currentLangKey defaults to TR
html = html.replace("window.currentLangKey = 'en';", "window.currentLangKey = localStorage.getItem('app_lang') || 'tr';")

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("Saved static HTML defaults to Turkish!")
