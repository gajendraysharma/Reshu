import re

with open('src/components/DashboardReport.tsx', 'r') as f:
    content = f.read()

pattern = r'<div className="col-span-2">\s*<h5 className="text-\[10px\] uppercase font-bold text-slate-400 mb-1">THE CRITICAL PROBLEM</h5>\s*<p className="text-xs text-slate-700 leading-relaxed break-words">\s*\{getPillarInsights\(pillar, score\)\.problem\} \{getPillarInsights\(pillar, score\)\.impact\}\s*</p>\s*</div>\s*</div>\s*<div>\s*<h5 className="text-\[10px\] uppercase font-bold text-\[\#D4AF37\] mb-1">THE SYSTEMATIC SOLUTION</h5>\s*<p className="text-xs text-slate-700 leading-relaxed break-words">\s*\{getPillarInsights\(pillar, score\)\.solution\}\s*</p>\s*</div>\s*\{score < 70 && \(\s*<div className="mt-4 p-4 bg-\[\#D4AF37\]/5 border-l-2 border-\[\#D4AF37\] rounded-r-xl">\s*<span className="inline-block text-\[9px\] font-black uppercase tracking-widest text-\[\#D4AF37\] mb-2 bg-\[\#D4AF37\]/10 px-2 py-1 rounded">\s*THE KRG ONE SUPPORT HUB\s*</span>\s*<p className="text-xs text-slate-800 leading-relaxed font-medium break-words">\s*\{getPillarInsights\(pillar, score\)\.intervention\}\s*</p>\s*</div>\s*\)\}'

new_block = """<div className="col-span-2">
                                     <h5 className="text-[10px] uppercase font-bold text-slate-400 mb-1">{getPillarInsights(pillar, score).problemTitle}</h5>
                                     <p className="text-xs text-slate-700 leading-relaxed break-words">
                                        {getPillarInsights(pillar, score).problem}
                                     </p>
                                  </div>
                               </div>
                               <div>
                                  <h5 className="text-[10px] uppercase font-bold text-[#D4AF37] mb-1">{getPillarInsights(pillar, score).solutionTitle}</h5>
                                  <p className="text-xs text-slate-700 leading-relaxed break-words">
                                     {getPillarInsights(pillar, score).solution}
                                  </p>
                               </div>
                               
                               <div className={`mt-4 p-4 ${score >= 85 ? 'bg-amber-100/50 border-l-4 border-[#D4AF37]' : 'bg-[#D4AF37]/5 border-l-2 border-[#D4AF37]'} rounded-r-xl`}>
                                  <span className="inline-block text-[9px] font-black uppercase tracking-widest text-[#D4AF37] mb-2 bg-[#D4AF37]/10 px-2 py-1 rounded">
                                     {getPillarInsights(pillar, score).interventionTitle}
                                  </span>
                                  <p className="text-xs text-slate-800 leading-relaxed font-medium break-words">
                                     {getPillarInsights(pillar, score).intervention}
                                  </p>
                               </div>"""

content = re.sub(pattern, new_block, content, flags=re.DOTALL)

with open('src/components/DashboardReport.tsx', 'w') as f:
    f.write(content)

