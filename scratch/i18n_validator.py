import re
import sys
import os

sys.stdout.reconfigure(encoding='utf-8')

def check_i18n(file_path):
    print(f"🌐 Running i18n & Localization Audit on {file_path} ...")
    if not os.path.exists(file_path):
        print(f"❌ File not found: {file_path}")
        return False

    with open(file_path, "r", encoding="utf-8") as f:
        html = f.read()

    # 1. Check for data-i18n attributes on user facing tags
    text_tags = re.findall(r'<(h[1-6]|p|button|span|label|a)\b([^>]*)>(.*?)</\1>', html, re.DOTALL | re.IGNORECASE)
    missing_i18n = []

    for tag, attrs, content in text_tags:
        clean_text = re.sub(r'<[^>]+>', '', content).strip()
        if clean_text and len(clean_text) > 2 and not clean_text.isdigit() and not re.match(r'^(➜|✕|●|▲|▼|✔|📸|🎨|💤|🍽️|💊)$', clean_text):
            if 'data-i18n=' not in attrs and 'id="saas-clock"' not in attrs and 'id="saas-profile-name"' not in attrs and 'class="logo-name"' not in attrs:
                missing_i18n.append(f"<{tag}> {clean_text[:40]}")

    print(f"   ✔ Found {len(missing_i18n)} elements without data-i18n tags")

    # 2. Check fullDictionary completeness for EN, TR, ES, ZH
    keys_en = set(re.findall(r'(\w+):\s*"', html.split('en: {')[1].split('},')[0])) if 'en: {' in html else set()
    keys_tr = set(re.findall(r'(\w+):\s*"', html.split('tr: {')[1].split('},')[0])) if 'tr: {' in html else set()
    keys_es = set(re.findall(r'(\w+):\s*"', html.split('es: {')[1].split('},')[0])) if 'es: {' in html else set()
    keys_zh = set(re.findall(r'(\w+):\s*"', html.split('zh: {')[1].split('}')[0])) if 'zh: {' in html else set()

    print(f"   ✔ Dictionary Keys Count — EN: {len(keys_en)}, TR: {len(keys_tr)}, ES: {len(keys_es)}, ZH: {len(keys_zh)}")

    missing_tr = keys_en - keys_tr
    if missing_tr:
        print(f"⚠️ Missing in TR dictionary: {missing_tr}")

    print("🎉 i18n & Localization Audit Complete!")
    return True

if __name__ == "__main__":
    file_to_check = os.path.join(os.path.dirname(__file__), "..", "src", "components", "landing-page.html")
    check_i18n(file_to_check)
