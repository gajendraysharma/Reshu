import re

with open('src/components/DashboardReport.tsx', 'r') as f:
    content = f.read()

# Replace Root Cause and Business Impact
content = content.replace('<h5 className="text-[10px] uppercase font-bold text-slate-400 mb-1">Business Impact</h5>', '<h5 className="text-[10px] uppercase font-bold text-slate-400 mb-1">Business Impact</h5>')

# Wait, let's just do a regex replace on the block
block_pattern = r'<div>\s*<h5 className="text-\[10px\] uppercase font-bold text-slate-400 mb-1">Business Impact</h5>.*?<div>\s*<h5 className="text-\[10px\] uppercase font-bold text-[#D4AF37] mb-1">Strategic Solution</h5>'

new_block = """<div className="col-span-2">
                                     <h5 className="text-[10px] uppercase font-bold text-slate-400 mb-1">THE CRITICAL PROBLEM</h5>
                                     <p className="text-xs text-slate-700 leading-relaxed break-words">
                                        {getPillarInsights(pillar, score).problem} {getPillarInsights(pillar, score).impact}
                                     </p>
                                  </div>
                               </div>
                               <div>
                                  <h5 className="text-[10px] uppercase font-bold text-[#D4AF37] mb-1">THE SYSTEMATIC SOLUTION</h5>"""

content = re.sub(r'<div>\s*<h5 className="text-\[10px\] uppercase font-bold text-slate-400 mb-1">Business Impact</h5>.*?<div>\s*<h5 className="text-\[10px\] uppercase font-bold text-\[\#D4AF37\] mb-1">Strategic Solution</h5>', new_block, content, flags=re.DOTALL)

content = content.replace("KRG ONE EXECUTION PARTNER PATHWAY", "THE KRG ONE SUPPORT HUB")

with open('src/components/DashboardReport.tsx', 'w') as f:
    f.write(content)
