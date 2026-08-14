import os
import shutil

src_dir = r"c:\Users\Bedirhan\Desktop\problem-finder"
dst_dir = r"c:\Users\Bedirhan\Desktop\school"

print(f"Transferring KinderLog & CareLog App Files from {src_dir} to {dst_dir}...")

# 1. Copy landing-page.html to school src/components/ and public/
src_html = os.path.join(src_dir, "src", "components", "landing-page.html")
dst_html1 = os.path.join(dst_dir, "src", "components", "landing-page.html")
dst_html2 = os.path.join(dst_dir, "public", "landing-page.html")

os.makedirs(os.path.dirname(dst_html1), exist_ok=True)
os.makedirs(os.path.dirname(dst_html2), exist_ok=True)

if os.path.exists(src_html):
    shutil.copy2(src_html, dst_html1)
    shutil.copy2(src_html, dst_html2)
    print("Copied landing-page.html to school/src/components/ and school/public/")

# 2. Copy scratch directory to school/scratch
src_scratch = os.path.join(src_dir, "scratch")
dst_scratch = os.path.join(dst_dir, "scratch")

if os.path.exists(src_scratch):
    if os.path.exists(dst_scratch):
        shutil.rmtree(dst_scratch)
    shutil.copytree(src_scratch, dst_scratch)
    print("Copied scratch/ scripts and screenshots to school/scratch/")

# 3. Clean landing-page.html from problem-finder (so problem-finder is purely scrapers/analysis)
if os.path.exists(src_html):
    os.remove(src_html)
    print("Removed landing-page.html from problem-finder/ (problem-finder is now purely problem scraper app!)")

print("Migration Completed Successfully!")
