import re

with open('src/AssessmentEngine.tsx', 'r') as f:
    content = f.read()

old_block = """          {/* Center Dynamic Question Module */}
          <div className="lg:col-span-6 bg-gradient-to-b from-[#0a1128] to-[#040814] border border-[#1e293b] rounded-[24px] p-8 shadow-[0_0_50px_rgba(10,17,40,0.9)] flex flex-col justify-between relative overflow-hidden" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
            {/* Ambient Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
              <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#d4af37] opacity-10 blur-[120px] rounded-full"></div>
              <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#3b82f6] opacity-[0.04] blur-[120px] rounded-full"></div>
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent"></div>
              {/* Subtle grid line overlay to emphasize "digital" */}
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            </div>

            <div className="relative z-10" style={{ transform: 'translateZ(10px)' }}>
              <div className="flex justify-between items-center border-b border-[#1e293b]/60 pb-4 mb-6">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black tracking-widest text-[#d4af37] font-mono uppercase mb-1 drop-shadow-[0_0_8px_rgba(212,175,55,0.4)] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-pulse"></span>
                    Question {currentQuestionIdx + 1} of 21
                  </span>
                  <h4 className="text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-md">
                    {pillars[activePillarIdx]}
                  </h4>
                </div>
                <span className="text-xs font-mono font-black text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/20 px-3 py-1.5 rounded-md shadow-[0_0_15px_rgba(212,175,55,0.15)] backdrop-blur-sm animate-pulse">{Math.round(((currentQuestionIdx)/21)*100)}% DONE</span>
              </div>

              <div className="my-8 bg-[#ffffff05] border border-white/10 p-6 md:p-8 rounded-2xl backdrop-blur-md shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] relative overflow-hidden group hover:border-[#d4af37]/30 transition-colors duration-500">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#d4af37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 transform -translate-y-full group-hover:translate-y-full ease-in-out"></div>
                <p className="text-sm md:text-base font-medium text-slate-200 leading-relaxed text-center">{allQuestions[currentQuestionIdx]}</p>
              </div>

              <div className="space-y-3 mt-8">
                <span className="text-[10px] font-black tracking-wider text-slate-500 font-mono uppercase text-center block mb-3">Select Matrix Evaluation Score</span>
                <div className="grid grid-cols-5 gap-2 md:gap-3">
                  {[
                    { val: 1, label: 'Very Poor' },
                    { val: 2, label: 'Basic' },
                    { val: 3, label: 'Average' },
                    { val: 4, label: 'Good' },
                    { val: 5, label: 'Excellent' }
                  ].map(({ val, label }) => (
                    <button 
                      key={val} 
                      type="button" 
                      onClick={() => handleScoreSelect(val)} 
                      className={`py-3 md:py-4 px-1 flex flex-col items-center justify-center rounded-xl transition-all duration-300 transform hover:scale-[1.05] active:scale-[0.95] ${
                        splashingOption === val 
                          ? 'bg-gradient-to-b from-amber-400 to-amber-600 text-white shadow-[0_0_20px_rgba(251,191,36,0.6)] border border-amber-300 z-10' 
                          : scores[currentQuestionIdx] === val 
                            ? 'bg-[#d4af37] text-[#0a1128] shadow-[0_0_15px_rgba(212,175,55,0.5)] border border-[#d4af37]' 
                            : 'bg-[#152238]/80 hover:bg-[#1a2b4c] border border-[#1e293b] hover:border-[#d4af37]/40 text-slate-400 hover:text-[#d4af37] shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)] hover:shadow-[0_0_15px_rgba(212,175,55,0.15)] backdrop-blur-sm'
                      }`}
                    >
                      <span className="font-mono font-black text-sm md:text-base">{val}</span>
                      <span className={`text-[8px] sm:text-[10px] font-bold mt-1 text-center leading-tight ${scores[currentQuestionIdx] === val && splashingOption !== val ? 'text-[#0a1128]/80' : ''}`}>{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative z-10 flex justify-between items-center pt-8 border-t border-[#1e293b]/60 mt-8" style={{ transform: 'translateZ(10px)' }}>
              <button type="button" onClick={() => currentQuestionIdx > 0 && setCurrentQuestionIdx(prev => prev - 1)} disabled={currentQuestionIdx === 0} className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-[#d4af37] disabled:opacity-30 disabled:hover:text-slate-500 transition-colors">← Previous</button>
              {currentQuestionIdx < 20 ? (
                <button type="button" onClick={() => setCurrentQuestionIdx(prev => prev + 1)} className="px-6 py-2.5 bg-[#152238] border border-[#1e293b] text-slate-300 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#1a2b4c] hover:text-white hover:border-slate-500 shadow-[0_0_15px_rgba(0,0,0,0.5)] transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">Next Question →</button>
              ) : (
                <button type="button" onClick={() => setView('RESULTS')} className="px-6 py-3 bg-gradient-to-r from-[#d4af37] to-[#b38f25] text-[#0a1128] text-xs font-black uppercase tracking-wider rounded-xl hover:brightness-110 shadow-[0_0_20px_rgba(212,175,55,0.4)] transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">Compile All Results →</button>
              )}
            </div>
          </div>"""

new_block = """          {/* Center Dynamic Question Module */}
          <div className="lg:col-span-6 bg-gradient-to-br from-[#ffffff]/90 via-[#f8f9fa]/90 to-[#e2e8f0]/90 backdrop-blur-3xl border border-white/60 rounded-[24px] p-8 shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),0_20px_50px_rgba(0,0,0,0.15)] flex flex-col justify-between relative overflow-hidden" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
            {/* Ambient Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
              <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-gradient-to-br from-[#d4af37] to-amber-200 opacity-20 blur-[100px] rounded-full mix-blend-multiply"></div>
              <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#94a3b8] opacity-20 blur-[100px] rounded-full mix-blend-multiply"></div>
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-80"></div>
              {/* Subtle grid line overlay to emphasize "digital machine" */}
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            </div>

            <div className="relative z-10" style={{ transform: 'translateZ(10px)' }}>
              <div className="flex justify-between items-center border-b border-slate-200/80 pb-4 mb-6">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black tracking-widest text-[#b38f25] font-mono uppercase mb-1 drop-shadow-[0_1px_1px_rgba(255,255,255,1)] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#d4af37] shadow-[0_0_8px_#d4af37] rounded-full animate-pulse"></span>
                    Question {currentQuestionIdx + 1} of 21
                  </span>
                  <h4 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 drop-shadow-[0_1px_1px_rgba(255,255,255,1)]">
                    {pillars[activePillarIdx]}
                  </h4>
                </div>
                <span className="text-xs font-mono font-black text-[#8f7016] bg-amber-50/80 border border-amber-200/50 px-3 py-1.5 rounded-md shadow-[inset_0_1px_2px_rgba(255,255,255,1),0_2px_10px_rgba(212,175,55,0.15)] backdrop-blur-sm animate-pulse">{Math.round(((currentQuestionIdx)/21)*100)}% DONE</span>
              </div>

              <div className="my-8 bg-white/40 border border-white/80 p-6 md:p-8 rounded-2xl backdrop-blur-md shadow-[inset_0_2px_15px_rgba(0,0,0,0.02),0_10px_30px_rgba(0,0,0,0.05)] relative overflow-hidden group hover:border-amber-200/60 transition-colors duration-500">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 transform -translate-y-full group-hover:translate-y-full ease-in-out"></div>
                <p className="text-sm md:text-base font-bold text-slate-800 leading-relaxed text-center relative z-10 drop-shadow-[0_1px_1px_rgba(255,255,255,1)]">{allQuestions[currentQuestionIdx]}</p>
              </div>

              <div className="space-y-3 mt-8">
                <span className="text-[10px] font-black tracking-wider text-slate-400 font-mono uppercase text-center block mb-3 drop-shadow-[0_1px_1px_rgba(255,255,255,1)]">Select Matrix Evaluation Score</span>
                <div className="grid grid-cols-5 gap-2 md:gap-3">
                  {[
                    { val: 1, label: 'Very Poor' },
                    { val: 2, label: 'Basic' },
                    { val: 3, label: 'Average' },
                    { val: 4, label: 'Good' },
                    { val: 5, label: 'Excellent' }
                  ].map(({ val, label }) => (
                    <button 
                      key={val} 
                      type="button" 
                      onClick={() => handleScoreSelect(val)} 
                      className={`py-3 md:py-4 px-1 flex flex-col items-center justify-center rounded-xl transition-all duration-300 transform hover:scale-[1.05] active:scale-[0.95] ${
                        splashingOption === val 
                          ? 'bg-gradient-to-b from-amber-400 to-amber-500 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_10px_20px_rgba(251,191,36,0.4)] border border-amber-300 z-10' 
                          : scores[currentQuestionIdx] === val 
                            ? 'bg-[#d4af37] text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_8px_15px_rgba(212,175,55,0.4)] border border-amber-400' 
                            : 'bg-white/60 hover:bg-white border border-slate-200 hover:border-amber-300/60 text-slate-600 hover:text-amber-700 shadow-[inset_0_1px_2px_rgba(255,255,255,1),0_2px_5px_rgba(0,0,0,0.02)] hover:shadow-[0_5px_15px_rgba(212,175,55,0.1)] backdrop-blur-sm'
                      }`}
                    >
                      <span className="font-mono font-black text-sm md:text-base">{val}</span>
                      <span className={`text-[8px] sm:text-[10px] font-bold mt-1 text-center leading-tight ${scores[currentQuestionIdx] === val || splashingOption === val ? 'text-amber-50' : ''}`}>{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative z-10 flex justify-between items-center pt-8 border-t border-slate-200/80 mt-8" style={{ transform: 'translateZ(10px)' }}>
              <button type="button" onClick={() => currentQuestionIdx > 0 && setCurrentQuestionIdx(prev => prev - 1)} disabled={currentQuestionIdx === 0} className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-slate-800 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors drop-shadow-[0_1px_1px_rgba(255,255,255,1)]">← Previous</button>
              {currentQuestionIdx < 20 ? (
                <button type="button" onClick={() => setCurrentQuestionIdx(prev => prev + 1)} className="px-6 py-2.5 bg-white border border-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-50 hover:border-slate-300 shadow-[inset_0_1px_2px_rgba(255,255,255,1),0_4px_10px_rgba(0,0,0,0.05)] transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">Next Question →</button>
              ) : (
                <button type="button" onClick={() => setView('RESULTS')} className="px-6 py-3 bg-gradient-to-r from-[#d4af37] to-[#b38f25] text-white text-xs font-black uppercase tracking-wider rounded-xl hover:brightness-110 shadow-[inset_0_1px_2px_rgba(255,255,255,0.3),0_8px_20px_rgba(212,175,55,0.3)] transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">Compile All Results →</button>
              )}
            </div>
          </div>"""

content = content.replace(old_block, new_block)

with open('src/AssessmentEngine.tsx', 'w') as f:
    f.write(content)

