import os
import shutil

school_dir = r"c:\Users\Bedirhan\Desktop\school"
finder_dir = r"c:\Users\Bedirhan\Desktop\problem-finder"

print("Integrating KinderLog & CareLog App into school project...")

school_public = os.path.join(school_dir, "public")
school_src_comp = os.path.join(school_dir, "src", "components")

os.makedirs(school_public, exist_ok=True)
os.makedirs(school_src_comp, exist_ok=True)

# Correct source landing HTML path
src_landing = os.path.join(school_src_comp, "landing-page.html")

if os.path.exists(src_landing):
    dst_index = os.path.join(school_dir, "index.html")
    dst_public_landing = os.path.join(school_public, "landing-page.html")
    
    shutil.copy2(src_landing, dst_index)
    shutil.copy2(src_landing, dst_public_landing)
    print("Copied complete KinderLog & CareLog App HTML to school/index.html and school/public/landing-page.html")

# Remove any leftover landing-page.html from problem-finder
finder_landing = os.path.join(finder_dir, "src", "components", "landing-page.html")
if os.path.exists(finder_landing):
    os.remove(finder_landing)
    print("Removed landing-page.html from problem-finder/")

print("Full Integration Completed Successfully!")
