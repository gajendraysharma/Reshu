import re

with open('src/components/DashboardReport.tsx', 'r') as f:
    content = f.read()

# Replace the text on Page 5
old_title = "Ready to Unlock Your Complete Business Growth Plan?"
new_title = "Let's Solve Your Business Problems Together"

old_desc = """The Executive Business Snapshot™ provides a high-level understanding of your performance. 
                      The <strong className="text-[#0B2545]">Business Growth Diagnostic™</strong> identifies the root causes behind your challenges and delivers a personalized implementation strategy."""
new_desc = """Your report highlights critical leaks in your operations. Do not try to fix these complex issues alone. Book a 1-on-1 Growth Strategy Session with a senior KRG ONE advisor today for just ₹1,499 (Regular Price: ₹9,999). We will sit with you online, map out your written rules, and build your custom step-by-step scaling plan."""

content = content.replace(old_title, new_title)
content = content.replace(old_desc, new_desc)

with open('src/components/DashboardReport.tsx', 'w') as f:
    f.write(content)
