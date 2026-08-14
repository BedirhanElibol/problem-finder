import os

preview_path = os.path.join(".agent", "scripts", "preview_server.js")
if os.path.exists(preview_path):
    with open(preview_path, "r", encoding="utf-8", errors="replace") as f:
        code = f.read()

    new_code = code.replace(
        "path.join(__dirname, '../../src/components/landing-page.html')",
        "path.join('C:', 'Users', 'Bedirhan', 'Desktop', 'school', 'public', 'landing-page.html')"
    )

    with open(preview_path, "w", encoding="utf-8") as f:
        f.write(new_code)

    print("Updated preview_server.js to serve from c:\\Users\\Bedirhan\\Desktop\\school\\public\\landing-page.html!")
