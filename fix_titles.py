import re

with open('src/components/DashboardReport.tsx', 'r') as f:
    content = f.read()

content = content.replace("Primary Challenge", "Identified Challenges")

with open('src/components/DashboardReport.tsx', 'w') as f:
    f.write(content)
