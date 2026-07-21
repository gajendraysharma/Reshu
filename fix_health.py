import re

with open('src/components/DashboardReport.tsx', 'r') as f:
    content = f.read()

# Remove the old 7-Pillar scorecard from Health tab
old_scorecard = r'\{\/\* 7-Pillar Scorecard \*\/\}\s*<h3 className="text-lg font-bold text-\[\#0B2545\] border-b border-slate-200 pb-2 mt-8 mb-4">7-Pillar Business Scorecard</h3>\s*<div className="space-y-4">\s*\{pillars\.map\(\(pillar, idx\) => \{.*?\}\)\}\s*</div>'

content = re.sub(old_scorecard, '', content, flags=re.DOTALL)

with open('src/components/DashboardReport.tsx', 'w') as f:
    f.write(content)

