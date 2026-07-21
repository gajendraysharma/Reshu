import re

with open('src/components/DashboardReport.tsx', 'r') as f:
    content = f.read()

strengths_block = r'\{pillars\.map\(\(p,i\) => \(\{name: p, score: getPillarScore\(i\)\}\)\)\.sort\(\(a,b\)=>b\.score-a\.score\)\.slice\(0,2\)\.map\(\(s,i\) => \(\s*<span key=\{i\} className="text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-1\.5 rounded-lg border border-emerald-100">\{s\.name\}</span>\s*\)\)\}'
strengths_new = r'''{(() => {
                                  const strengths = pillars.map((p,i) => ({name: p, score: getPillarScore(i)})).filter(s => s.score >= 85).sort((a,b)=>b.score-a.score);
                                  return strengths.length > 0 ? strengths.map((s,i) => (
                                      <span key={i} className="text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg border border-emerald-100">{s.name}</span>
                                  )) : <span className="text-xs font-bold text-slate-400 italic">No pillars currently operating at an elite level.</span>;
                               })()}'''

weakness_block = r'\{pillars\.map\(\(p,i\) => \(\{name: p, score: getPillarScore\(i\)\}\)\)\.sort\(\(a,b\)=>a\.score-b\.score\)\.slice\(0,2\)\.map\(\(s,i\) => \(\s*<span key=\{i\} className="text-xs font-bold bg-red-50 text-red-700 px-3 py-1\.5 rounded-lg border border-red-100">\{s\.name\}</span>\s*\)\)\}'
weakness_new = r'''{(() => {
                                  const weaknesses = pillars.map((p,i) => ({name: p, score: getPillarScore(i)})).filter(s => s.score < 70).sort((a,b)=>a.score-b.score);
                                  return weaknesses.length > 0 ? weaknesses.map((s,i) => (
                                      <span key={i} className="text-xs font-bold bg-red-50 text-red-700 px-3 py-1.5 rounded-lg border border-red-100">{s.name}</span>
                                  )) : <span className="text-xs font-bold text-slate-400 italic">Core foundations are structurally secure.</span>;
                               })()}'''

content = re.sub(strengths_block, strengths_new, content)
content = re.sub(weakness_block, weakness_new, content)

with open('src/components/DashboardReport.tsx', 'w') as f:
    f.write(content)
