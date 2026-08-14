import os

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8", errors="replace") as f:
    html = f.read()

print("Fixing userMap character encoding and explicit initial setGlobalLang call...")

# 1. Clean userMap block
old_user_map_snippet = '''const userMap = {
    ogretmen: { name: currentLangKey === 'tr' ? 'Melis Teacher' : 'Teacher Melis', role: tDict.ogretmen, avatar: 'M', workspaceId: 'role-workspace-ogretmen' },
    carelog: { name: currentLangKey === 'tr' ? 'Nurse Ayse' : 'Nurse Ayse', role: tDict.carelog, avatar: 'A', workspaceId: 'role-workspace-carelog' },
    veli: { name: currentLangKey === 'tr' ? 'Ahmet Yilmaz (Veli)' : 'Ahmet Yilmaz (Parent)', role: tDict.veli, avatar: 'V', workspaceId: 'role-workspace-veli' },
    yonetici: { name: currentLangKey === 'tr' ? 'Ayse Hanim (Manager)' : 'Ayse Hanim (Manager)', role: tDict.yonetici, avatar: 'Y', workspaceId: 'role-workspace-yonetici' }
  };'''

clean_user_map = '''const userMap = {
    ogretmen: { name: currentLangKey === 'tr' ? 'Melis Öğretmen' : 'Teacher Melis', role: tDict.ogretmen, avatar: 'M', workspaceId: 'role-workspace-ogretmen' },
    carelog: { name: currentLangKey === 'tr' ? 'Hemşire Ayşe' : 'Nurse Ayşe', role: tDict.carelog, avatar: 'A', workspaceId: 'role-workspace-carelog' },
    veli: { name: currentLangKey === 'tr' ? 'Ahmet Yılmaz (Veli)' : 'Ahmet Yılmaz (Parent)', role: tDict.veli, avatar: 'V', workspaceId: 'role-workspace-veli' },
    yonetici: { name: currentLangKey === 'tr' ? 'Ayşe Hanım (Müdür)' : 'Ayşe Hanım (Manager)', role: tDict.yonetici, avatar: 'Y', workspaceId: 'role-workspace-yonetici' }
  };'''

# Replace all corrupted character patterns
corrupted_map = {
    "Melis retmen": "Melis Öğretmen",
    "Hemire Aye": "Hemşire Ayşe",
    "Ahmet Ylmaz": "Ahmet Yılmaz",
    "Aye Hanm": "Ayşe Hanım",
    "(Mdr)": "(Müdür)",
    "setGlobalLang(currentLangKey);": "const initialSavedLang = localStorage.getItem('app_lang') || 'tr';\n  setGlobalLang(initialSavedLang);"
}

for old_k, new_k in corrupted_map.items():
    html = html.replace(old_k, new_k)

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("Saved clean userMap and initial setGlobalLang call!")
