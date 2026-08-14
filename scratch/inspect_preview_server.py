import os

preview_path = os.path.join(".agent", "scripts", "preview_server.js")
if os.path.exists(preview_path):
    with open(preview_path, "r", encoding="utf-8", errors="replace") as f:
        code = f.read()
    print("preview_server.js content:")
    print(code)
