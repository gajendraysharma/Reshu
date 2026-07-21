import re

with open('src/components/PrintDossier.tsx', 'r') as f:
    content = f.read()

strengths_block = r'\{pillars\.map\(\(p: string, i: number\) => \(\{name: p, score: getPillarScore\(i\)\}\)\)\.sort\(\(a: any, b: any\) => b\.score - a\.score\)\.slice\(0, 3\)\.map\(\(s: any, idx: number\) => \(\s*<div key=\{idx\} className="flex justify-between text-sm mb-2">\s*<span className="font-medium text-emerald-900">\{s\.name\}</span>\s*<span className="font-bold text-emerald-700">\{s\.score\}%</span>\s*</div>\s*\)\)\}'
strengths_new = r'''{(() => {
                    const strengths = pillars.map((p: string, i: number) => ({name: p, score: getPillarScore(i)})).filter((s: any) => s.score >= 85).sort((a: any, b: any) => b.score - a.score);
                    return strengths.length > 0 ? strengths.map((s: any, idx: number) => (
                        <div key={idx} className="flex justify-between text-sm mb-2">
                           <span className="font-medium text-emerald-900">{s.name}</span>
                           <span className="font-bold text-emerald-700">{s.score}%</span>
                        </div>
                    )) : <div className="text-xs font-bold text-slate-400 italic">No pillars currently operating at an elite level.</div>;
                 })()}'''

weakness_block = r'\{pillars\.map\(\(p: string, i: number\) => \(\{name: p, score: getPillarScore\(i\)\}\)\)\.sort\(\(a: any, b: any\) => a\.score - b\.score\)\.slice\(0, 3\)\.map\(\(s: any, idx: number\) => \(\s*<div key=\{idx\} className="flex justify-between text-sm mb-2">\s*<span className="font-medium text-red-900">\{s\.name\}</span>\s*<span className="font-bold text-red-700">\{s\.score\}%</span>\s*</div>\s*\)\)\}'
weakness_new = r'''{(() => {
                    const weaknesses = pillars.map((p: string, i: number) => ({name: p, score: getPillarScore(i)})).filter((s: any) => s.score < 70).sort((a: any, b: any) => a.score - b.score);
                    return weaknesses.length > 0 ? weaknesses.map((s: any, idx: number) => (
                        <div key={idx} className="flex justify-between text-sm mb-2">
                           <span className="font-medium text-red-900">{s.name}</span>
                           <span className="font-bold text-red-700">{s.score}%</span>
                        </div>
                    )) : <div className="text-xs font-bold text-slate-400 italic">Core foundations are structurally secure.</div>;
                 })()}'''

content = re.sub(strengths_block, strengths_new, content)
content = re.sub(weakness_block, weakness_new, content)

with open('src/components/PrintDossier.tsx', 'w') as f:
    f.write(content)
