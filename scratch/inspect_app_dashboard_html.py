import os

html_path = os.path.join("src", "components", "landing-page.html")
with open(html_path, "r", encoding="utf-8", errors="replace") as f:
    html = f.read()

idx = html.find('id="view-app-dashboard"')
if idx != -1:
    print(f"Found view-app-dashboard at char {idx}!")
    snippet = html[idx:idx+3500]
    safe_str = snippet.encode('ascii', 'xmlcharrefreplace').decode('ascii')
    print("VIEW APP DASHBOARD HTML SNIPPET:\n" + safe_str)
else:
    print("NOT FOUND! Searching for saas-layout or dashboard...")
    idx2 = html.find('class="saas-layout"')
    if idx2 != -1:
        print(f"Found saas-layout at char {idx2}!")
        snippet = html[idx2:idx2+3500]
        safe_str = snippet.encode('ascii', 'xmlcharrefreplace').decode('ascii')
        print("SAAS LAYOUT HTML SNIPPET:\n" + safe_str)
