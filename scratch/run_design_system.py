import subprocess
import os

env = os.environ.copy()
env["PYTHONIOENCODING"] = "utf-8"

cmd = ["python", ".agent/.shared/ui-ux-pro-max/scripts/search.py", "daycare senior care wellness", "--design-system", "--format", "markdown"]
result = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", env=env)

with open("scratch/design_system_result2.md", "w", encoding="utf-8") as f:
    f.write(result.stdout)

print("Saved to scratch/design_system_result2.md")
