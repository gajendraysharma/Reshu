import re

with open('src/components/DashboardReport.tsx', 'r') as f:
    content = f.read()

# Make sure DOSSIER_TEMPLATES is imported
if "import { DOSSIER_TEMPLATES }" not in content:
    content = content.replace("import React, { useState } from 'react';", "import React, { useState } from 'react';\nimport { DOSSIER_TEMPLATES } from '../utils/dossierTemplates';")

advisory_block = r'\{\/\* PAGE 3: ADVISORY \*\/\}.*?\{\/\* PAGE 4: PLAN \*\/\}'

new_advisory = r'''{/* PAGE 3: ADVISORY */}
          {activeTab === 'ADVISORY' && (
             <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
                
                {/* Section A: The Executive Observation & Macro Diagnosis */}
                <div className="bg-[#0B2545] rounded-2xl p-6 md:p-8 text-white relative overflow-hidden shadow-lg border border-[#0B2545]">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 blur-[80px] rounded-full pointer-events-none"></div>
                   <div className="relative z-10 flex flex-col gap-6">
                      <div>
                         <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B5CF6]/20 text-[#C4B5FD] text-[10px] font-bold uppercase tracking-widest mb-4 border border-[#8B5CF6]/30">
                            <Cpu className="w-3 h-3" /> Section A: Macro Diagnosis
                         </span>
                         <h3 className="text-xl font-serif font-bold text-[#D4AF37] mb-3">{DOSSIER_TEMPLATES.getMacroDiagnosis(globalScore, formData.companyName, formData.industry, formData.revenue).title}</h3>
                         <p className="text-sm text-slate-300 leading-relaxed mb-6">
                            {DOSSIER_TEMPLATES.getMacroDiagnosis(globalScore, formData.companyName, formData.industry, formData.revenue).body}
                         </p>
                         <h3 className="text-xl font-serif font-bold text-[#D4AF37] mb-3">{DOSSIER_TEMPLATES.getMacroDiagnosis(globalScore, formData.companyName, formData.industry, formData.revenue).title2}</h3>
                         <p className="text-sm text-slate-300 leading-relaxed mb-4">
                            {DOSSIER_TEMPLATES.getMacroDiagnosis(globalScore, formData.companyName, formData.industry, formData.revenue).body2}
                         </p>
                      </div>
                   </div>
                </div>

                {/* Section B: Top Strategic Technical Recommendations (7-Pillar Scorecard) */}
                <h3 className="text-lg font-bold text-[#0B2545] border-b border-slate-200 pb-2 mt-8 mb-4">Section B: Strategic Technical Recommendations</h3>
                <div className="space-y-4 relative z-10">
                   {pillars.map((pillar, idx) => {
                      const score = getPillarScore(idx);
                      return (
                      <ExpandableCard 
                         key={idx} 
                         title={pillar} 
                         badge={`Score: ${score}/100`}
                         icon={<Layers className="w-4 h-4"/>}
                      >
                         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
                            <div className="md:col-span-3 space-y-4">
                               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div className="col-span-2">
                                     <h5 className="text-[10px] uppercase font-bold text-slate-400 mb-1">{DOSSIER_TEMPLATES.getPillarDossier(pillar, score).problemTitle}</h5>
                                     <p className="text-xs text-slate-700 leading-relaxed break-words">
                                        {DOSSIER_TEMPLATES.getPillarDossier(pillar, score).problem}
                                     </p>
                                  </div>
                               </div>
                               <div>
                                  <h5 className="text-[10px] uppercase font-bold text-[#D4AF37] mb-1">{DOSSIER_TEMPLATES.getPillarDossier(pillar, score).solutionTitle}</h5>
                                  <p className="text-xs text-slate-700 leading-relaxed break-words">
                                     {DOSSIER_TEMPLATES.getPillarDossier(pillar, score).solution}
                                  </p>
                               </div>
                               
                               <div className={`mt-4 p-4 ${score >= 85 ? 'bg-amber-100/50 border-l-4 border-[#D4AF37]' : 'bg-[#D4AF37]/5 border-l-2 border-[#D4AF37]'} rounded-r-xl relative z-10`}>
                                  <span className="inline-block text-[9px] font-black uppercase tracking-widest text-[#D4AF37] mb-2 bg-[#D4AF37]/10 px-2 py-1 rounded">
                                     {DOSSIER_TEMPLATES.getPillarDossier(pillar, score).interventionTitle}
                                  </span>
                                  <p className="text-xs text-slate-800 leading-relaxed font-medium break-words">
                                     {DOSSIER_TEMPLATES.getPillarDossier(pillar, score).intervention}
                                  </p>
                               </div>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col justify-center relative z-10">
                               <span className="block text-[9px] uppercase font-bold text-slate-500 mb-2 text-center">Industry Benchmark</span>
                               <div className="flex items-center justify-center gap-3">
                                  <div className="flex flex-col items-center">
                                     <span className="text-xl font-black text-[#0B2545]">{score}</span>
                                     <span className="text-[8px] text-slate-400 uppercase">You</span>
                                  </div>
                                  <div className="w-px h-8 bg-slate-200"></div>
                                  <div className="flex flex-col items-center opacity-50">
                                     <span className="text-lg font-bold text-slate-500">62</span>
                                     <span className="text-[8px] text-slate-400 uppercase">Avg</span>
                                  </div>
                               </div>
                            </div>
                         </div>
                      </ExpandableCard>
                      )
                   })}
                </div>
             </div>
          )}

          {/* PAGE 4: PLAN */}'''

content = re.sub(advisory_block, new_advisory, content, flags=re.DOTALL)

with open('src/components/DashboardReport.tsx', 'w') as f:
    f.write(content)

