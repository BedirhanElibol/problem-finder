import sys
import os
import subprocess

env = os.environ.copy()
env["PYTHONIOENCODING"] = "utf-8"

res = subprocess.run(
    [sys.executable, ".agent/.shared/ui-ux-pro-max/scripts/search.py", "saas", "--design-system", "-f", "markdown"],
    capture_output=True,
    text=True,
    encoding="utf-8",
    env=env
)

print("STDOUT:")
print(res.stdout.encode('ascii', errors='ignore').decode('ascii')[:3000])
