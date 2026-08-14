import os

index_path = os.path.join("src", "index.js")
if os.path.exists(index_path):
    with open(index_path, "r", encoding="utf-8", errors="replace") as f:
        code = f.read()

    print(f"Inspecting src/index.js ({len(code)} chars)...")
    roles = ['ogretmen', 'carelog', 'veli', 'yonetici']
    for role in roles:
        count = code.lower().count(role)
        print(f"Occurrences of '{role}' in index.js: {count}")

    # Search for switchAppRole or role rendering logic
    lines = [line.strip()[:140] for line in code.split('\n') if 'switch' in line.lower() or 'role' in line.lower() or 'render' in line.lower()]
    print(f"\nMatching lines in index.js: {len(lines)}")
    for l in lines[:15]:
        print(f"  -> {l}")
