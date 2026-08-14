import os
import re

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8", errors="replace") as f:
    html = f.read()

print("Applying 100% Sharp HD Background Fix...")

# 1. Update video-overlay CSS in <head> for crystal clear sharpness
new_sharp_css = '''
    .video-overlay-sharp {
      background: 
        radial-gradient(circle at 60% 45%, rgba(255, 107, 107, 0.08) 0%, transparent 55%),
        linear-gradient(to bottom, rgba(15, 23, 42, 0.65) 0%, transparent 20%, transparent 80%, rgba(15, 23, 42, 0.9) 100%),
        linear-gradient(to right, rgba(15, 23, 42, 0.7) 0%, rgba(15, 23, 42, 0.35) 45%, transparent 75%);
    }
'''

if '.video-overlay-sharp' not in html:
    html = html.replace('.video-overlay {', new_sharp_css.strip() + '\n    .video-overlay {')

# 2. Update Video element & Overlay class in landing-page.html
html = html.replace('class="absolute inset-0 video-overlay"></div>', 'class="absolute inset-0 video-overlay-sharp"></div>')
html = html.replace('class="absolute inset-0 w-full h-full object-cover scale-105 transition-transform duration-1000 ease-out"', 'class="absolute inset-0 w-full h-full object-cover filter brightness-110 contrast-105 transition-transform duration-1000 ease-out"')

# 3. Add crystal glass backdrop container around left typography column for ultra crisp text & 100% background visibility
old_left_col = '<div class="lg:col-span-7 xl:col-span-6 space-y-6">'
new_left_col = '<div class="lg:col-span-7 xl:col-span-6 space-y-6 backdrop-blur-md bg-slate-900/35 p-6 sm:p-8 lg:p-10 rounded-3xl border border-white/10 shadow-2xl">'

if old_left_col in html:
    html = html.replace(old_left_col, new_left_col, 1)

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("Saved 100% Sharp HD Background Fix!")
