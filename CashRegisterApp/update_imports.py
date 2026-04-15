import os
import re
import pathlib

mappings = [
    (r"contexts/AuthContext", r"features/auth/contexts/AuthContext"),
    (r"services/userService", r"features/users/api/userService"),
    (r"services/authServices", r"features/auth/api/authServices"),
    (r"services/personService", r"features/person/api/personService"),
    (r"api/api", r"lib/api"),
    (r"Components/Person/Interfaces", r"features/person/components/Interfaces"),
    (r"Components/Person/PersonForm", r"features/person/components/PersonForm"),
    (r"Components/Person/PersonSelect", r"features/person/components/PersonSelect"),
    (r"Components", r"components/Layout"),
    (r"pages/User", r"features/users/pages"),
    (r"pages/Login", r"features/auth/pages"),
    (r"pages/Settings", r"features/settings/pages"),
    (r"pages/Inventory", r"features/inventory/pages"),
    (r"pages/Sales", r"features/sales/pages"),
    (r"pages/Financial", r"features/financial/pages"),
    (r"pages/Main", r"features/main/pages"),
]

src_dir = pathlib.Path("src").resolve()

def resolve_import_path(file_path, import_str):
    if import_str.startswith("."):
        abs_target = (file_path.parent / import_str).resolve()
        try:
            rel_to_src = abs_target.relative_to(src_dir).as_posix()
        except ValueError:
            return import_str
    else:
        return import_str

    mapped = rel_to_src
    for old, new in mappings:
        if mapped.startswith(old):
            mapped = mapped.replace(old, new, 1)
            break
            
    new_abs_target = src_dir / mapped
    
    try:
        new_rel = os.path.relpath(new_abs_target, file_path.parent).replace('\\', '/')
        if not new_rel.startswith('.'):
            new_rel = './' + new_rel
        return new_rel
    except ValueError:
        return import_str

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    def replacer(match):
        prefix = match.group(1)
        import_str = match.group(2)
        
        new_import_str = resolve_import_path(filepath, import_str)
        # remove .tsx or .ts if added somehow, but our logic just deals with paths
        return f'{prefix}"{new_import_str}"'

    pattern = re.compile(r'(import\s+.*?from\s+|import\s+|export\s+.*?from\s+)["\']([^"\']+)["\']')
    new_content = pattern.sub(replacer, content)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, _, files in os.walk("src"):
    for file in files:
        if file.endswith(('.ts', '.tsx')):
            process_file(pathlib.Path(root) / file)
