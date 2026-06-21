import os
import re

components_dir = "src/features/inventory/components"

for filename in os.listdir(components_dir):
    if filename.endswith(".tsx"):
        path = os.path.join(components_dir, filename)
        with open(path, "r") as f:
            content = f.read()

        # Fix InventoryService.create*(request, () => { if (onSuccess) onSuccess(); });
        pattern1 = r"await InventoryService\.([a-zA-Z0-9_]+)\(request,\s*\(\)\s*=>\s*\{\s*if\s*\(onSuccess\)\s*(?:\{)?\s*onSuccess\(\);\s*(?:\})?\s*\}\);"
        content = re.sub(pattern1, r"await InventoryService.\1(request);\n      if (onSuccess) onSuccess();", content)

        with open(path, "w") as f:
            f.write(content)
