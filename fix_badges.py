import re
import sys

with open('src/components/DashboardReport.tsx', 'r') as f:
    content = f.read()

# Fix KPI status badge to prevent bleeding
old_kpi_badge = '<span className="text-[9px] font-bold px-2 py-1 rounded bg-slate-100 text-slate-600 uppercase tracking-wider">{kpi.status}</span>'
new_kpi_badge = '<span className="text-[9px] font-bold px-2 py-1 rounded bg-slate-100 text-slate-600 uppercase tracking-wider whitespace-nowrap truncate max-w-[120px] text-right">{kpi.status}</span>'
content = content.replace(old_kpi_badge, new_kpi_badge)

with open('src/components/DashboardReport.tsx', 'w') as f:
    f.write(content)

print("Fixed badges!")
