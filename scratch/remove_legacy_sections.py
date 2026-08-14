import os

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8", errors="replace") as f:
    html = f.read()

legacy_start = html.find('<section class="trust-activity-strip"')
if legacy_start != -1:
    legacy_end = html.find('</div>\n      </div>\n    </section>', legacy_start) + len('</div>\n      </div>\n    </section>')
    html = html[:legacy_start] + html[legacy_end:]
    print("Removed legacy section blocks!")

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("Saved clean landing page without legacy sections!")
