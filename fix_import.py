import re

with open("src/App.tsx", "r") as f:
    content = f.read()

# Add ArrowLeft to lucide-react import
content = re.sub(r'import\s+\{([^}]+)\}\s+from\s+["\']lucide-react["\'];', lambda m: 'import {' + m.group(1) + (', ArrowLeft' if 'ArrowLeft' not in m.group(1) else '') + '} from "lucide-react";', content)

with open("src/App.tsx", "w") as f:
    f.write(content)
