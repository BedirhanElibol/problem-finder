import os
import base64
import json

brain_dir = r"C:\Users\Bedirhan\.gemini\antigravity-ide\brain\15d9f643-d00e-4b92-9c79-43f304384e90"

avatar_files = [
    "kindergarten_teacher_avatar_1786654816944.png",
    "senior_caregiver_avatar_1786654829719.png",
    "family_parent_avatar_1786654841637.png",
    "facility_director_avatar_1786654853363.png"
]

base64_dict = {}
for file in avatar_files:
    full_path = os.path.join(brain_dir, file)
    if os.path.exists(full_path):
        with open(full_path, "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
            base64_dict[file] = f"data:image/png;base64,{encoded_string}"
        print(f"Loaded base64 for {file}")
    else:
        print(f"File not found: {full_path}")

with open("scratch/avatar_base64.json", "w", encoding="utf-8") as json_file:
    json.dump(base64_dict, json_file)

print("Saved avatar_base64.json!")
