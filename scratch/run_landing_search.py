import subprocess
import os

env = os.environ.copy()
env["PYTHONIOENCODING"] = "utf-8"

cmd = ["python", ".agent/.shared/ui-ux-pro-max/scripts/search.py", "saas landing page modern clean hero", "--design-system", "--format", "markdown"]
result = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", env=env)

with open("scratch/landing_design_system.md", "w", encoding="utf-8") as f:
    f.write(result.stdout)

print("Saved to scratch/landing_design_system.md")
