import re

with open('src/AssessmentEngine.tsx', 'r') as f:
    content = f.read()

# Replace activePlanTab states
old_tab_state = "const [activePlanTab, setActivePlanTab] = useState<'GENERAL' | '30_DAY' | '60_DAY' | '90_DAY' | 'PILLARS'>('GENERAL');"
new_tab_state = "const [activePlanTab, setActivePlanTab] = useState<'EXECUTIVE_SUMMARY' | 'PRIORITY_MATRIX' | 'ROADMAP' | 'PILLARS'>('EXECUTIVE_SUMMARY');"
content = content.replace(old_tab_state, new_tab_state)

# Identify the window 4 section
start_w4 = content.find("{/* WINDOW 4: AUTOMATIC AI PLAN PORTAL */}")
end_w4 = content.find("      {/* Footer */}", start_w4)

new_w4 = """      {/* WINDOW 4: AUTOMATIC AI PLAN PORTAL */}
      {view === 'GROWTH_PLAN' && (
        <div className="max-w-6xl mx-auto mt-4 pb-20">
          
          {/* Dashboard Control Headers */}
          <div className="bg-white border border-slate-200 p-6 md:p-10 rounded-[32px] shadow-2xl">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-b border-slate-100 pb-8 mb-8">
              <div>
                <span className="text-[10px] font-black text-[#d4af37] font-mono tracking-widest block uppercase drop-shadow-[0_1px_1px_rgba(255,255,255,1)]">KRG ONE DASHBOARD</span>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mt-1">Business Growth Dashboard™</h2>
                <p className="text-sm text-slate-500 mt-2 font-medium">Prepared for <strong className="text-slate-800">{formData.companyName || "Your Organization"}</strong></p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <button type="button" onClick={() => alert("Downloading PDF Report...")} className="px-6 py-3 bg-slate-900 text-white text-xs font-black uppercase tracking-wider rounded-xl hover:bg-slate-800 transform transition-all duration-200 hover:-translate-y-1 active:translate-y-1 shadow-[4px_6px_10px_rgba(0,0,0,0.1)]">Download PDF Report</button>
              </div>
            </div>

            {/* Dynamic Content Tab Selection Rails */}
            <div className="flex flex-wrap bg-slate-100/80 p-2 rounded-2xl gap-2 mb-8">
              {[
                { id: 'EXECUTIVE_SUMMARY', label: 'Executive Summary™' },
                { id: 'PRIORITY_MATRIX', label: 'Growth Priority Matrix™' },
                { id: 'ROADMAP', label: '90-Day Roadmap™' },
                { id: 'PILLARS', label: 'Pillar Analysis' }
              ].map(tab => (
                <button key={tab.id} type="button" onClick={() => setActivePlanTab(tab.id as any)} className={`flex-1 min-w-[140px] py-3 px-4 text-center text-xs font-black uppercase tracking-wider rounded-xl transition-all duration-300 ${activePlanTab === tab.id ? 'bg-white text-slate-900 shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-slate-200/50' : 'text-slate-500 hover:text-slate-800 hover:bg-white/50 border border-transparent'}`}>{tab.label}</button>
              ))}
            </div>

            {/* Tab Copy Display Anchors */}
            <div className="min-h-[400px]">
              {activePlanTab === 'EXECUTIVE_SUMMARY' && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  <div className="md:col-span-8 space-y-8">
                    <div>
                      <h3 className="text-xl font-black text-slate-900 mb-3 border-b-2 border-slate-100 pb-2">Executive Summary™</h3>
                      <p className="text-[14px] text-slate-600 leading-relaxed font-medium">
                        Based on the assessment, {formData.companyName || "your company"} has achieved a Growth Maturity Level™ of <strong className="text-[#d4af37]">{getMaturityLevel(getGlobalScore())}</strong>. 
                        Your overall Business Growth Score™ is {getGlobalScore()}/100. This indicates {getGlobalScore() < 50 ? "significant operational friction that requires immediate structural intervention" : getGlobalScore() < 75 ? "a solid foundation with clear opportunities for optimization and scale" : "a highly optimized operation ready for aggressive market expansion"}.
                      </p>
                    </div>

                    <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
                      <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2"><div className="w-2 h-2 bg-[#d4af37] rounded-full"></div> Confidence Gap Analysis™</h4>
                      <p className="text-sm text-slate-600 mb-4">Comparing your perceived readiness (Question 22) against your audited Business Growth Score™.</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-xl border border-slate-100 text-center shadow-sm">
                          <span className="block text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Perception (Q22)</span>
                          <span className="text-lg font-black text-slate-800">{scores[21] === 1 ? 'Very Low' : scores[21] === 2 ? 'Low' : scores[21] === 3 ? 'Moderate' : scores[21] === 4 ? 'High' : scores[21] === 5 ? 'Very High' : 'N/A'}</span>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-100 text-center shadow-sm">
                          <span className="block text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Audited Reality</span>
                          <span className="text-lg font-black text-[#d4af37]">{getMaturityLevel(getGlobalScore())}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 font-medium mt-4 text-center">
                        {scores[21] * 20 > getGlobalScore() + 15 ? "Warning: Your confidence exceeds your audited capabilities. Risk of blindspots." : scores[21] * 20 < getGlobalScore() - 15 ? "Note: Your business infrastructure is stronger than your current confidence level." : "Alignment: Your perceived readiness aligns accurately with your audited capabilities."}
                      </p>
                    </div>
                  </div>
                  <div className="md:col-span-4">
                    <div className="bg-[#0a1128] rounded-2xl p-6 text-white border-t-2 border-l-2 border-b-4 border-r-4 border-t-slate-700/50 border-l-slate-700/50 border-b-black border-r-black shadow-xl flex flex-col items-center text-center">
                      <span className="text-[10px] font-bold text-slate-400 font-mono tracking-widest uppercase mb-4">Business Growth Score™</span>
                      <div className="relative mb-4">
                        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="8" />
                          <circle cx="50" cy="50" r="45" fill="none" stroke="#d4af37" strokeWidth="8" strokeDasharray="282.7" strokeDashoffset={282.7 - (282.7 * getGlobalScore()) / 100} className="transition-all duration-1000" strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                          <span className="text-3xl font-black">{getGlobalScore()}</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#d4af37] bg-amber-900/30 px-3 py-1 rounded-full border border-amber-700/50 uppercase tracking-widest mb-2">{getMaturityLevel(getGlobalScore())}</span>
                    </div>
                  </div>
                </div>
              )}

              {activePlanTab === 'PRIORITY_MATRIX' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 mb-3 border-b-2 border-slate-100 pb-2">Growth Priority Matrix™</h3>
                    <p className="text-[14px] text-slate-600 leading-relaxed font-medium">Critical focus areas automatically derived from your lowest and highest performing pillars.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6">
                      <h4 className="text-sm font-black text-emerald-900 uppercase tracking-wider mb-4 flex items-center gap-2"><div className="w-2 h-2 bg-emerald-500 rounded-full"></div> Top Strengths</h4>
                      <ul className="space-y-3">
                        {[0,1,2,3,4,5,6].map(i => ({ i, score: getPillarScore(i) })).sort((a,b) => b.score - a.score).slice(0,3).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 bg-white/60 p-3 rounded-xl border border-emerald-100/50">
                            <span className="text-emerald-500 font-black text-sm">0{idx+1}.</span>
                            <div>
                              <span className="text-xs font-bold text-slate-800 block">{pillars[item.i]}</span>
                              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider">{item.score}% Optimised</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-rose-50 border border-rose-100 rounded-2xl p-6">
                      <h4 className="text-sm font-black text-rose-900 uppercase tracking-wider mb-4 flex items-center gap-2"><div className="w-2 h-2 bg-rose-500 rounded-full"></div> Top Improvement Areas</h4>
                      <ul className="space-y-3">
                        {[0,1,2,3,4,5,6].map(i => ({ i, score: getPillarScore(i) })).sort((a,b) => a.score - b.score).slice(0,3).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 bg-white/60 p-3 rounded-xl border border-rose-100/50">
                            <span className="text-rose-500 font-black text-sm">0{idx+1}.</span>
                            <div>
                              <span className="text-xs font-bold text-slate-800 block">{pillars[item.i]}</span>
                              <span className="text-[10px] font-black text-rose-600 uppercase tracking-wider">Requires Attention ({item.score}%)</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
                    <h4 className="text-sm font-black text-amber-900 uppercase tracking-wider mb-4 flex items-center gap-2"><div className="w-2 h-2 bg-amber-500 rounded-full"></div> Top Recommendations™</h4>
                    <div className="space-y-3">
                      {[0,1,2,3,4,5,6].map(i => ({ i, score: getPillarScore(i) })).sort((a,b) => a.score - b.score).slice(0,3).map((item, idx) => (
                        <div key={idx} className="flex gap-3 items-center bg-white p-4 rounded-xl border border-amber-100/50 shadow-sm">
                          <div className="w-8 h-8 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center font-black text-xs shrink-0">{idx+1}</div>
                          <div>
                            <span className="text-[10px] font-black text-amber-600 tracking-widest uppercase block mb-0.5">{pillars[item.i]} Intervention</span>
                            <span className="text-xs text-slate-700 font-medium">{item.score < 50 ? `Implement strict procedural documentation and metrics tracking for ${pillars[item.i]}.` : `Optimize and automate existing workflows within ${pillars[item.i]}.`}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activePlanTab === 'ROADMAP' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 mb-3 border-b-2 border-slate-100 pb-2">90-Day Business Growth Roadmap™</h3>
                    <p className="text-[14px] text-slate-600 leading-relaxed font-medium">A phased execution plan based on your lowest scoring pillars.</p>
                  </div>
                  
                  <div className="relative border-l-2 border-slate-200 ml-4 md:ml-6 space-y-8 pb-4">
                    {(() => {
                      const lowest = [0,1,2,3,4,5,6].map(i => ({ i, score: getPillarScore(i) })).sort((a,b) => a.score - b.score).slice(0,3);
                      return lowest.map((item, idx) => (
                        <div key={idx} className="relative pl-6 md:pl-8">
                          <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-4 border-[#d4af37]"></div>
                          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                            <span className="text-[10px] font-black text-[#d4af37] uppercase tracking-widest mb-1 block">Month {idx + 1}: {idx === 0 ? 'Foundation' : idx === 1 ? 'Optimization' : 'Scale'}</span>
                            <h4 className="text-sm font-bold text-slate-900 mb-2">Resolve {pillars[item.i]} ({item.score}%)</h4>
                            <p className="text-xs text-slate-600 leading-relaxed">
                              Focus leadership attention exclusively on building standard operating procedures and metric tracking for this pillar. Establish weekly KPIs to measure compliance and effectiveness.
                            </p>
                          </div>
                        </div>
                      ));
                    })()}
                  </div>
                </div>
              )}

              {activePlanTab === 'PILLARS' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 mb-3 border-b-2 border-slate-100 pb-2">Pillar Analysis & 7-Pillar Radar Chart</h3>
                    <p className="text-[14px] text-slate-600 leading-relaxed font-medium">Visual representation of your business framework balance.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="bg-[#0a1128] rounded-3xl p-8 flex justify-center border-t-2 border-l-2 border-b-4 border-r-4 border-t-slate-700/50 border-l-slate-700/50 border-b-black border-r-black shadow-2xl relative overflow-hidden">
                       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#d4af37]/10 blur-[50px] rounded-full pointer-events-none"></div>
                       <svg className="w-full max-w-[280px] aspect-square transform -rotate-90 relative z-10 drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2,2" />
                        <circle cx="50" cy="50" r="28" fill="none" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="1,3" />
                        <circle cx="50" cy="50" r="16" fill="none" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="1,3" />
                        <line x1="50" y1="5" x2="50" y2="95" stroke="#1e293b" strokeWidth="0.5" />
                        <line x1="5" y1="50" x2="95" y2="50" stroke="#1e293b" strokeWidth="0.5" />
                        <polygon 
                          points={[0, 1, 2, 3, 4, 5, 6].map(i => {
                            const angle = (i * 360) / 7;
                            const r = (getPillarScore(i) / 100) * 40;
                            const x = 50 + r * Math.cos((angle * Math.PI) / 180);
                            const y = 50 + r * Math.sin((angle * Math.PI) / 180);
                            return `${x},${y}`;
                          }).join(' ')}
                          fill="rgba(212, 175, 55, 0.3)" 
                          stroke="#d4af37" 
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                    
                    <div className="space-y-3">
                      {pillars.map((name, idx) => (
                        <div key={idx} className="bg-white p-3 border border-slate-100 rounded-xl flex flex-col shadow-sm group hover:border-[#d4af37]/40 transition-colors">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-bold text-slate-800">{name}</span>
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{getPillarScore(idx)} / 100</span>
                          </div>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div className={`h-full transition-all duration-700 ${getPillarScore(idx) < 50 ? 'bg-rose-500' : getPillarScore(idx) < 75 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${getPillarScore(idx)}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Call to Action */}
            <div className="mt-12 bg-gradient-to-br from-[#0a1128] to-slate-900 rounded-3xl p-8 md:p-12 text-center text-white border-t-2 border-l-2 border-b-4 border-r-4 border-t-slate-700/50 border-l-slate-700/50 border-b-black border-r-black shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/10 blur-[80px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
               <h3 className="text-2xl md:text-3xl font-black mb-4 tracking-tight relative z-10">Ready to accelerate your growth?</h3>
               <p className="text-sm text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed relative z-10">
                 Your Business Growth Assessment™ reveals clear opportunities. Book a consultation with KRG ONE to translate this diagnostic into a custom execution strategy.
               </p>
               <button type="button" onClick={() => alert("Redirecting to Consultation Booking...")} className="relative z-10 px-8 py-4 bg-gradient-to-r from-[#d4af37] to-[#b38f25] text-white text-sm font-black uppercase tracking-wider rounded-xl hover:brightness-110 shadow-[4px_6px_15px_rgba(212,175,55,0.4)] border-t-2 border-l-2 border-b-4 border-r-4 border-t-amber-200 border-l-amber-200 border-b-amber-700 border-r-amber-700 transform transition-all duration-200 hover:-translate-y-1 active:translate-y-1">
                 Book Business Growth Consultation™
               </button>
            </div>
          </div>
        </div>
      )}"""

content = content[:start_w4] + new_w4 + content[end_w4:]

with open('src/AssessmentEngine.tsx', 'w') as f:
    f.write(content)

