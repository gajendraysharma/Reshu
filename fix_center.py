import re

with open('src/AssessmentEngine.tsx', 'r') as f:
    content = f.read()

old_block = """          {/* Center Dynamic Question Module */}
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-[24px] p-8 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-6">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black tracking-widest text-[#d4af37] font-mono uppercase mb-1">
                    Question {currentQuestionIdx + 1} of 21
                  </span>
                  <h4 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                    {pillars[activePillarIdx]}
                  </h4>
                </div>
                <span className="text-xs font-mono font-black text-white bg-slate-900 px-3 py-1 rounded-md">{Math.round(((currentQuestionIdx)/21)*100)}% DONE</span>
              </div>

              <div className="my-8 bg-slate-50 border border-slate-100 p-6 rounded-2xl">
                <p className="text-sm font-bold text-slate-800 leading-relaxed text-center">{allQuestions[currentQuestionIdx]}</p>
              </div>

              <div className="space-y-2 mt-8">
                <span className="text-[10px] font-black tracking-wider text-slate-400 font-mono uppercase text-center block mb-2">Select Matrix Evaluation Score</span>
                <div className="grid grid-cols-5 gap-2">
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
                      className={`py-3 px-1 flex flex-col items-center justify-center rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] ${
                        splashingOption === val 
                          ? 'bg-amber-400 text-white shadow-[0_0_15px_rgba(251,191,36,0.6)] border-amber-300 scale-105' 
                          : scores[currentQuestionIdx] === val 
                            ? 'bg-amber-500 text-white shadow-md' 
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                      }`}
                    >
                      <span className="font-mono font-black text-sm">{val}</span>
                      <span className="text-[9px] sm:text-[10px] font-bold mt-1 opacity-80 text-center leading-tight">{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-8 border-t border-slate-100 mt-8">
              <button type="button" onClick={() => currentQuestionIdx > 0 && setCurrentQuestionIdx(prev => prev - 1)} disabled={currentQuestionIdx === 0} className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-slate-700 disabled:opacity-30">← Previous</button>
              {currentQuestionIdx < 20 ? (
                <button type="button" onClick={() => setCurrentQuestionIdx(prev => prev + 1)} className="px-5 py-2.5 bg-slate-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-800 transform transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]">Next Question →</button>
              ) : (
                <button type="button" onClick={() => setView('RESULTS')} className="px-6 py-3 bg-[#d4af37] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#c29e2f] shadow-md shadow-amber-500/10 transform transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]">Compile All Results →</button>
              )}
            </div>
          </div>"""

new_block = """          {/* Center Dynamic Question Module */}
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

content = content.replace(old_block, new_block)

with open('src/AssessmentEngine.tsx', 'w') as f:
    f.write(content)
