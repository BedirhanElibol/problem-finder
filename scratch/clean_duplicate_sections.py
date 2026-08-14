import os
import re

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8", errors="replace") as f:
    html = f.read()

print("Cleaning duplicate sections in landing-page.html...")

# Keep view-landing clean: Header + Main Hero + Pills Row + Trust Strip + Features + How It Works + Pricing + Footer + Video Modal
# Remove old legacy section blocks
html = re.sub(r'<section class="trust-activity-strip"[\s\S]*?</section>\s*<section id="features" class="role-selection-section"[\s\S]*?</section>', '', html)

# Remove any duplicated new sections appended twice
dup_marker = '<!-- 1. VALUE PROPOSITION FEATURE PILLS BANNER ROW'
parts = html.split(dup_marker)
if len(parts) > 2:
    html = parts[0] + dup_marker + parts[1]
    print("Removed duplicate appended sections!")

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("Saved clean non-duplicated landing page structure!")
