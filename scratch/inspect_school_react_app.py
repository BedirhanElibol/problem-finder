import os

school_dir = r"c:\Users\Bedirhan\Desktop\school"

print("Inspecting React TSX files in school project...")

app_tsx = os.path.join(school_dir, "src", "App.tsx")
if os.path.exists(app_tsx):
    with open(app_tsx, "r", encoding="utf-8", errors="replace") as f:
        code = f.read()
    print("App.tsx content snippet:\n", code[:1000])

mock_ts = os.path.join(school_dir, "src", "data", "mockData.ts")
if os.path.exists(mock_ts):
    with open(mock_ts, "r", encoding="utf-8", errors="replace") as f:
        code = f.read()
    print("\nmockData.ts content snippet:\n", code[:500])
