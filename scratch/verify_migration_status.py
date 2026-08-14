import os

finder_dir = r"c:\Users\Bedirhan\Desktop\problem-finder"
school_dir = r"c:\Users\Bedirhan\Desktop\school"

print("==================== PROBLEM-FINDER FOLDER ====================")
finder_files = [f for f in os.listdir(finder_dir) if not f.startswith('.')]
print("Files in problem-finder:", finder_files[:15])

if os.path.exists(os.path.join(finder_dir, "src")):
    src_files = os.listdir(os.path.join(finder_dir, "src"))
    print("Files in problem-finder/src:", src_files)

print("\n==================== SCHOOL FOLDER ====================")
school_files = [f for f in os.listdir(school_dir) if not f.startswith('.')]
print("Files in school:", school_files[:15])

if os.path.exists(os.path.join(school_dir, "public", "landing-page.html")):
    size = os.path.getsize(os.path.join(school_dir, "public", "landing-page.html"))
    print(f"school/public/landing-page.html exists! ({size} bytes)")

if os.path.exists(os.path.join(school_dir, "src", "components", "landing-page.html")):
    size2 = os.path.getsize(os.path.join(school_dir, "src", "components", "landing-page.html"))
    print(f"school/src/components/landing-page.html exists! ({size2} bytes)")
