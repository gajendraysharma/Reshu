import re

with open('src/components/DashboardReport.tsx', 'r') as f:
    content = f.read()

content = content.replace("    { id: 'NEXT_STEP', label: 'Diagnostic Booking', icon: <Target className=\"w-4 h-4\" /> },\n", "")

with open('src/components/DashboardReport.tsx', 'w') as f:
    f.write(content)

