import os

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

print("Restoring landing-page.html to previous EarthGuard Video Hero Section...")

# Re-run build_earthguard_kinderlog_hero logic
import subprocess
subprocess.run(["python", "scratch/build_earthguard_kinderlog_hero.py"], check=True)
subprocess.run(["node", "scratch/fix_login_btn_class.js"], check=True)

print("Restored landing-page.html to previous EarthGuard version!")
