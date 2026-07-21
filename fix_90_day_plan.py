import re

with open('src/components/DashboardReport.tsx', 'r') as f:
    content = f.read()

days_1_30 = r'''<div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 border-l-4 border-l-\[\#D4AF37\]">\s*<h4 className="text-sm font-bold text-\[\#0B2545\] uppercase tracking-widest mb-1">Days 1–30</h4>.*?</div>\s*</div>\s*</div>'''
days_1_30_new = r'''<div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 border-l-4 border-l-[#D4AF37]">
                      <h4 className="text-sm font-bold text-[#0B2545] uppercase tracking-widest mb-1">Days 1–30: Emergency Risk Mitigation & Stabilization Sprints</h4>
                      <p className="text-xs text-slate-500 mb-4">Objective: Isolate and plug immediate cash flow leakages and severe operational friction points.</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">Detailed Directives</span>
                            <ul className="space-y-2">
                               <li className="text-xs text-slate-700 flex gap-2 items-start"><CheckCircle className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" /> Deploy basic end-of-day daily tracking templates for all operational staff members.</li>
                               <li className="text-xs text-slate-700 flex gap-2 items-start"><CheckCircle className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" /> Set up absolute tracking metrics for the primary user challenge selected: {formData.challenges && formData.challenges.length > 0 ? formData.challenges.join(', ') : 'Core Operational Leakage'}.</li>
                               <li className="text-xs text-slate-700 flex gap-2 items-start"><CheckCircle className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" /> Stop daily administrative tasks from reaching the executive founder layer by establishing a strict delegation rule.</li>
                            </ul>
                         </div>
                         <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Expected Outcome</span>
                            <p className="text-xs text-slate-800 mb-3 font-medium">Clear visibility into process gaps and immediate short-term fixes identified. Cash flow leakages plugged.</p>
                            <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Success Indicator</span>
                            <p className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded inline-block">Completion of emergency workflow controls.</p>
                         </div>
                      </div>
                   </div>'''

days_31_60 = r'''<div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 border-l-4 border-l-\[\#0B2545\]">\s*<h4 className="text-sm font-bold text-\[\#0B2545\] uppercase tracking-widest mb-1">Days 31–60</h4>.*?</div>\s*</div>\s*</div>'''
days_31_60_new = r'''<div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 border-l-4 border-l-[#0B2545]">
                      <h4 className="text-sm font-bold text-[#0B2545] uppercase tracking-widest mb-1">Days 31–60: Process Standardization & Workflow Architecture Sprints</h4>
                      <p className="text-xs text-slate-500 mb-4">Objective: Begin the formal drafting and deployment of step-by-step Standard Operating Procedures (SOPs).</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">Detailed Directives</span>
                            <ul className="space-y-2">
                               <li className="text-xs text-slate-700 flex gap-2 items-start"><CheckCircle className="w-3.5 h-3.5 text-[#0B2545] shrink-0 mt-0.5" /> Draft SOPs across your lowest-performing operational pillars.</li>
                               <li className="text-xs text-slate-700 flex gap-2 items-start"><CheckCircle className="w-3.5 h-3.5 text-[#0B2545] shrink-0 mt-0.5" /> Build clean cloud-based tracking systems to monitor team output.</li>
                               <li className="text-xs text-slate-700 flex gap-2 items-start"><CheckCircle className="w-3.5 h-3.5 text-[#0B2545] shrink-0 mt-0.5" /> Optimize customer acquisition channels and map customer retention journeys.</li>
                            </ul>
                         </div>
                         <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Expected Outcome</span>
                            <p className="text-xs text-slate-800 mb-3 font-medium">Reduced reliance on founder for daily problem solving. Lifetime client value metrics mapped.</p>
                            <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Success Indicator</span>
                            <p className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded inline-block">First successful weekly KPI review meeting.</p>
                         </div>
                      </div>
                   </div>'''

days_61_90 = r'''<div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 border-l-4 border-l-emerald-500">\s*<h4 className="text-sm font-bold text-\[\#0B2545\] uppercase tracking-widest mb-1">Days 61–90</h4>.*?</div>\s*</div>\s*</div>'''
days_61_90_new = r'''<div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 border-l-4 border-l-emerald-500">
                      <h4 className="text-sm font-bold text-[#0B2545] uppercase tracking-widest mb-1">Days 61–90: System Optimization & Capital Scaling Sprints</h4>
                      <p className="text-xs text-slate-500 mb-4">Objective: Integrate scalable automation tools and modern business software models.</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">Detailed Directives</span>
                            <ul className="space-y-2">
                               <li className="text-xs text-slate-700 flex gap-2 items-start"><CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" /> Transition management to a formal weekly performance review cycle based on concrete KPIs.</li>
                               <li className="text-xs text-slate-700 flex gap-2 items-start"><CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" /> Review the unit profit margins across all core product lines.</li>
                               <li className="text-xs text-slate-700 flex gap-2 items-start"><CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" /> Maximize revenue efficiency and prepare for capital scaling.</li>
                            </ul>
                         </div>
                         <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Expected Outcome</span>
                            <p className="text-xs text-slate-800 mb-3 font-medium">Business operates predictably. Foundation is set to confidently acquire new market share and scale aggressively.</p>
                            <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Success Indicator</span>
                            <p className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded inline-block">Measurable increase in operational capacity and profit margins.</p>
                         </div>
                      </div>
                   </div>'''

content = re.sub(days_1_30, days_1_30_new, content, flags=re.DOTALL)
content = re.sub(days_31_60, days_31_60_new, content, flags=re.DOTALL)
content = re.sub(days_61_90, days_61_90_new, content, flags=re.DOTALL)

with open('src/components/DashboardReport.tsx', 'w') as f:
    f.write(content)

