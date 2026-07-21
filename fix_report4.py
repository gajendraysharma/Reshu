import re

with open('src/components/DashboardReport.tsx', 'r') as f:
    content = f.read()

# Fix layout for the overlapping text issue
old_score_text = """<div className="w-full space-y-2">
                           <div className="flex justify-between items-center text-[11px] font-bold">
                              <span className="text-slate-500 uppercase">Grade</span>"""
new_score_text = """<div className="w-full space-y-2 relative z-10 bg-slate-50 mt-2 p-2 rounded">
                           <div className="flex justify-between items-center text-[11px] font-bold">
                              <span className="text-slate-500 uppercase">Grade</span>"""

content = content.replace(old_score_text, new_score_text)

# Also fix the AI Growth Advisory text (Page 3) to sound simple
old_ai_adv_text = """<h3 className="text-xl font-serif font-bold text-[#D4AF37] mb-3">Executive Observation & Diagnosis</h3>
                         <p className="text-sm text-slate-300 leading-relaxed mb-4">
                            The diagnostic engine has identified a systemic misalignment between your revenue goals and your operational framework. The business is heavily reliant on manual oversight, creating a fragile growth ecosystem. 
                         </p>"""
new_ai_adv_text = """<h3 className="text-xl font-serif font-bold text-[#D4AF37] mb-3">Executive Observation & Diagnosis</h3>
                         <p className="text-sm text-slate-300 leading-relaxed mb-4">
                            We have noticed a major gap between the income you want to make and how your business runs today. Your company relies entirely on you constantly watching over everyone, which means it will break if you try to grow faster.
                         </p>"""
content = content.replace(old_ai_adv_text, new_ai_adv_text)

with open('src/components/DashboardReport.tsx', 'w') as f:
    f.write(content)
