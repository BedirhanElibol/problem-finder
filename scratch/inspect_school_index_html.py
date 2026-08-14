import os

school_index_path = r"c:\Users\Bedirhan\Desktop\school\index.html"
if os.path.exists(school_index_path):
    with open(school_index_path, "r", encoding="utf-8", errors="replace") as f:
        content = f.read()
    print("c:\\Users\\Bedirhan\\Desktop\\school\\index.html content:")
    print(content[:600])
else:
    print("school index.html not found!")
