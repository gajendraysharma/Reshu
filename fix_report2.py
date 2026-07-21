import re

with open('src/components/DashboardReport.tsx', 'r') as f:
    content = f.read()

# Replace the Pillar evaluation block
# We will inject a helper function inside the component or outside. Let's just put it outside.
helper_code = """
const getPillarInsights = (pillarTitle: string, score: number) => {
  let problem = "";
  let impact = "";
  let solution = "";

  if (pillarTitle === "Leadership & Vision") {
    problem = "Your business cannot run for even a single week without you. Every small decision requires the owner's signature or approval.";
    impact = "This slows down your daily operations, stresses you out, and stunts your company's growth.";
    solution = "We work directly with you to create a clear daily management chart, assign responsibilities to your team leaders, and give you back your freedom.";
  } else if (pillarTitle === "Sales & Revenue") {
    problem = "You do not have a steady, automated system to get new customer inquiries every month. You rely mostly on random word-of-mouth recommendations.";
    impact = "Making your monthly cash flow unpredictable and causing stress when sales drop unexpectedly.";
    solution = "We set up a simple digital sales track that continuously brings high-quality leads into your business month after month.";
  } else if (pillarTitle === "Marketing & Customers") {
    problem = "Your business blends in with competitors, and there is no simple way to track customer satisfaction or repeat business.";
    impact = "You are likely losing past customers to competitors and spending too much effort fighting for every single sale on price.";
    solution = "We help you build a simple follow-up system that keeps customers happy and coming back to you automatically.";
  } else if (pillarTitle === "Operations & Process") {
    problem = "Your staff handles tasks based on memory rather than a written system.";
    impact = "This leads to frequent calculation mistakes, customer complaints, and wasted inventory.";
    solution = "We help you build simple, clear, step-by-step checklists and SOPs in basic English so that even new employees can do the work perfectly without asking you questions.";
  } else if (pillarTitle === "Finance & Performance") {
    problem = "You only check the bank account balance and do not have a clear view of your exact daily profits and cash flow delays.";
    impact = "This creates cash shortages when paying suppliers or salaries and hides areas where you are losing cash/profits.";
    solution = "We set up a simple, one-page daily cash tracker so you always know exactly how much money you made today and where it went.";
  } else if (pillarTitle === "People & Organisation") {
    problem = "Employees are not clear on their exact daily goals, and training depends entirely on you shadowing them.";
    impact = "Staff leaving causes huge disruptions, and mistakes happen often because nobody is held accountable.";
    solution = "We create simple job scorecards and a quick 10-minute weekly meeting rule to keep everyone on track without micro-managing.";
  } else if (pillarTitle === "Technology & Business Innovation") {
    problem = "You are either using too much paper or disconnected softwares (like Excel, WhatsApp, and books) that don't talk to each other.";
    impact = "This forces you to do double data entry, wastes hours of admin time, and causes you to lose important customer details.";
    solution = "We help you select and set up one simple software tool that organizes all your bills, customers, and inventory in one place.";
  } else {
    problem = "Your business processes in this area rely heavily on manual effort and memory rather than clear systems.";
    impact = "This increases the chance of daily errors and keeps you stuck working in the business instead of growing it.";
    solution = "We will sit with you to document your best practices and train your team to follow them consistently.";
  }
  
  return { problem, impact, solution };
};
"""

# Now replace the <ExpandableCard> content.
old_card_content = """<div className="md:col-span-3 space-y-4">
                               <div>
                                  <h5 className="text-[10px] uppercase font-bold text-slate-400 mb-1">Business Impact</h5>
                                  <p className="text-xs text-slate-700 leading-relaxed">
                                     {score >= 70 ? 'Acting as a strong foundation, driving stability and enabling scale in this domain.'
                                       : score >= 50 ? 'Functioning adequately, but inefficiencies are causing mild friction in daily operations.'
                                       : 'Critical bottleneck. Severely limiting overall business performance and revenue generation potential.'}
                                  </p>
                               </div>
                               <div>
                                  <h5 className="text-[10px] uppercase font-bold text-slate-400 mb-1">Action Priority</h5>
                                  <span className="text-xs font-bold px-2 py-1 rounded text-white" style={{ backgroundColor: color }}>
                                     {score >= 70 ? 'Low / Monitor' : score >= 50 ? 'Medium / Optimize' : 'High / Remediate Immediate'}
                                  </span>
                               </div>
                            </div>"""

new_card_content = """<div className="md:col-span-3 space-y-4">
                               <div className="space-y-3">
                                  <div>
                                    <h5 className="text-[10px] uppercase font-bold text-slate-400 mb-1">THE PROBLEM</h5>
                                    <p className="text-sm text-slate-700 leading-relaxed font-semibold">
                                       {getPillarInsights(pillar, score).problem}
                                    </p>
                                  </div>
                                  <div>
                                    <h5 className="text-[10px] uppercase font-bold text-red-500 mb-1">THE IMPACT</h5>
                                    <p className="text-sm text-red-700 leading-relaxed">
                                       {getPillarInsights(pillar, score).impact}
                                    </p>
                                  </div>
                                  <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-lg">
                                    <h5 className="text-[10px] uppercase font-bold text-emerald-700 mb-1">THE KRG ONE SOLUTION</h5>
                                    <p className="text-sm text-emerald-800 leading-relaxed font-medium">
                                       {getPillarInsights(pillar, score).solution}
                                    </p>
                                  </div>
                               </div>
                            </div>"""

content = content.replace(old_card_content, new_card_content)

# Inject the helper code after the imports
content = content.replace("import React, { useState } from 'react';", "import React, { useState } from 'react';\n" + helper_code)


with open('src/components/DashboardReport.tsx', 'w') as f:
    f.write(content)
