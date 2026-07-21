import re

with open('src/components/DashboardReport.tsx', 'r') as f:
    content = f.read()

# Replace KPIs
content = content.replace("'Revenue Opp'", "'Sales Growth Potential'")
content = content.replace("'Ops Maturity'", "'Daily Operations Strength'")
content = content.replace("'Growth Readiness'", "'Ready to Scale'")

# Replace Executive Analysis Text
old_biggest_opp = "<strong>Biggest Opportunity:</strong> The highest immediate return on investment lies in formalizing operational processes. By standardizing workflows and establishing clear accountability, the business can reduce profit leakage and increase fulfillment capacity without proportionally increasing headcount."
new_biggest_opp = "<strong>Biggest Opportunity:</strong> You can quickly make more money and reduce daily stress by writing down simple rules (SOPs) for your staff. When your team has clear instructions, they make fewer mistakes, waste less time, and can handle more customers without needing you to hire more people immediately."

old_biggest_risk = "<strong>Biggest Risk:</strong> Over-reliance on founder-led decision making poses the greatest threat to scalability and valuation. This centralized leadership model creates bottlenecks, slows down execution, and risks severe disruption if key personnel are unavailable."
new_biggest_risk = "<strong>Biggest Problem:</strong> The business depends too much on you, the owner. Because you have to make every single day-to-day decision, it slows down your daily work, creates pressure, and stops your company from expanding."

old_exec_rec = "Shift focus immediately from ad-hoc problem solving to deliberate systems architecture. Prioritize the documentation of core revenue-generating processes and begin decentralizing day-to-day operational decisions to empowered team members."
new_exec_rec = "Our Top Advice: Stop spending all your time fixing daily small fires. Start writing down clear steps and simple rules (SOPs) for your daily sales, marketing, and office operations. Train your staff so they can manage daily work without needing you for every single approval."

content = content.replace(old_biggest_opp, new_biggest_opp)
content = content.replace(old_biggest_risk, new_biggest_risk)
content = content.replace(old_exec_rec, new_exec_rec)

with open('src/components/DashboardReport.tsx', 'w') as f:
    f.write(content)

