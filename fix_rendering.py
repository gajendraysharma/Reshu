import re

with open('src/AssessmentEngine.tsx', 'r') as f:
    content = f.read()

pattern = r'<div className="space-y-3 mt-8">.*?<div className="relative z-10 flex justify-between items-center pt-8 border-t border-slate-200/80 mt-8" style=\{\{ transform: \'translateZ\(10px\)\' \}\}>'

new_logic = """<div className="space-y-3 mt-8">
                {currentQuestionIdx < 21 ? (
                  <>
                    <span className="text-[10px] font-black tracking-wider text-slate-400 font-mono uppercase text-center block mb-3 drop-shadow-[0_1px_1px_rgba(255,255,255,1)]">Select Matrix Evaluation Score</span>
                    <div className="grid grid-cols-3 gap-2 md:gap-4">
                      {[
                        { val: 1, label: 'Average' },
                        { val: 2, label: 'Good' },
                        { val: 3, label: 'Excellent' }
                      ].map(({ val, label }) => (
                        <button 
                          key={val} 
                          type="button" 
                          onClick={() => handleScoreSelect(val)} 
                          className={`py-4 px-2 flex flex-col items-center justify-center rounded-xl transition-all duration-300 transform hover:-translate-y-1 active:translate-y-1 active:shadow-inner ${
                            splashingOption === val 
                              ? 'bg-gradient-to-b from-amber-400 to-amber-500 text-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.6),0_8px_15px_rgba(251,191,36,0.4)] border-t-2 border-l-2 border-b-4 border-r-4 border-t-amber-300 border-l-amber-300 border-b-amber-700 border-r-amber-700 z-10' 
                              : scores[currentQuestionIdx] === val 
                                ? 'bg-[#d4af37] text-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.6),4px_6px_10px_rgba(212,175,55,0.3)] border-t-2 border-l-2 border-b-4 border-r-4 border-t-amber-300 border-l-amber-300 border-b-amber-700 border-r-amber-700' 
                                : 'bg-white/60 hover:bg-white border-t-2 border-l-2 border-b-4 border-r-4 border-t-white border-l-white border-b-slate-300 border-r-slate-300 hover:border-b-amber-200 hover:border-r-amber-200 text-slate-600 hover:text-amber-700 shadow-[4px_6px_10px_rgba(0,0,0,0.05),inset_0_2px_5px_rgba(255,255,255,1)] hover:shadow-[6px_8px_15px_rgba(212,175,55,0.15)] backdrop-blur-sm'
                          }`}
                        >
                          <span className="font-mono font-black text-xl md:text-2xl">{val}</span>
                          <span className={`text-[10px] sm:text-xs font-bold mt-2 text-center tracking-widest uppercase leading-tight ${scores[currentQuestionIdx] === val || splashingOption === val ? 'text-amber-50' : ''}`}>{label}</span>
                        </button>
                      ))}
                    </div>
                  </>
                ) : currentQuestionIdx === 21 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {["Increasing Sales Revenue", "Customer Acquisition", "Customer Retention", "Cash Flow Management", "Profitability Improvement", "Business Expansion"].map(challenge => (
                      <button
                        key={challenge}
                        type="button"
                        onClick={() => handleChallengeToggle(challenge)}
                        className={`p-4 text-left rounded-xl border-2 transition-all ${
                          formData.challenges.includes(challenge)
                            ? 'border-[#d4af37] bg-amber-50 text-amber-900 shadow-md'
                            : 'border-slate-200 bg-white hover:border-amber-200 hover:bg-amber-50/30 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded border flex items-center justify-center ${formData.challenges.includes(challenge) ? 'bg-[#d4af37] border-[#d4af37] text-white' : 'border-slate-300'}`}>
                            {formData.challenges.includes(challenge) && <CheckSquare className="w-3.5 h-3.5" />}
                          </div>
                          <span className="text-sm font-bold">{challenge}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : currentQuestionIdx === 22 ? (
                  <div className="grid grid-cols-1 gap-3">
                    {["Increase Revenue", "Improve Profitability", "Scale Business", "Optimize Operations", "Reduce Owner Dependency"].map(priority => (
                      <button
                        key={priority}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, priority }))}
                        className={`p-4 text-left rounded-xl border-2 transition-all ${
                          formData.priority === priority
                            ? 'border-[#d4af37] bg-amber-50 text-amber-900 shadow-md'
                            : 'border-slate-200 bg-white hover:border-amber-200 hover:bg-amber-50/30 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${formData.priority === priority ? 'border-[#d4af37] border-4' : 'border-slate-300'}`}>
                          </div>
                          <span className="text-sm font-bold">{priority}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : currentQuestionIdx === 23 ? (
                  <div className="grid grid-cols-1 gap-3">
                    {["More Sales", "Better Profit Margins", "Better Cash Flow", "Market Leadership", "Higher Business Valuation"].map(opp => (
                      <button
                        key={opp}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, opportunity: opp }))}
                        className={`p-4 text-left rounded-xl border-2 transition-all ${
                          formData.opportunity === opp
                            ? 'border-[#d4af37] bg-amber-50 text-amber-900 shadow-md'
                            : 'border-slate-200 bg-white hover:border-amber-200 hover:bg-amber-50/30 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${formData.opportunity === opp ? 'border-[#d4af37] border-4' : 'border-slate-300'}`}>
                          </div>
                          <span className="text-sm font-bold">{opp}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="relative z-10 flex justify-between items-center pt-8 border-t border-slate-200/80 mt-8" style={{ transform: 'translateZ(10px)' }}>"""

content = re.sub(pattern, new_logic, content, flags=re.DOTALL)

# Now fix the Next Question / Compile button logic
next_button_pattern = r'\{currentQuestionIdx < 21 \? \(\s*<button type="button" onClick=\{.*?Next Question →</button>\s*\) : \(\s*<button type="button" onClick=\{\(\) => setView\(\'RESULTS\'\)\}.*?Compile All Results →</button>\s*\)\}'
new_next_button = """{currentQuestionIdx < 23 ? (
                <button type="button" onClick={() => setCurrentQuestionIdx(prev => prev + 1)} className="px-6 py-2.5 bg-white border-t-2 border-l-2 border-b-4 border-r-4 border-t-white border-l-white border-b-slate-300 border-r-slate-300 text-slate-800 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-50 shadow-[4px_6px_10px_rgba(0,0,0,0.05)] transform transition-all duration-200 hover:-translate-y-1 active:translate-y-1 active:border-b-2 active:border-r-2 active:border-t-4 active:border-l-4 active:shadow-inner">Next Question →</button>
              ) : (
                <button type="button" onClick={() => setView('RESULTS')} className="px-6 py-3 bg-gradient-to-r from-[#d4af37] to-[#b38f25] text-white text-xs font-black uppercase tracking-wider rounded-xl hover:brightness-110 shadow-[4px_6px_15px_rgba(212,175,55,0.4)] border-t-2 border-l-2 border-b-4 border-r-4 border-t-amber-200 border-l-amber-200 border-b-amber-700 border-r-amber-700 transform transition-all duration-200 hover:-translate-y-1 active:translate-y-1 active:border-b-2 active:border-r-2 active:border-t-4 active:border-l-4">Compile All Results →</button>
              )}"""

content = re.sub(next_button_pattern, new_next_button, content, flags=re.DOTALL)

with open('src/AssessmentEngine.tsx', 'w') as f:
    f.write(content)

print("Updated rendering logic")
