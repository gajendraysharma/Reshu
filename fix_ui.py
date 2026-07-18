with open('src/AssessmentEngine.tsx', 'r') as f:
    content = f.read()

# Replace header
old_header = """                <div>
                  <span className="text-[9px] font-black tracking-widest text-slate-400 font-mono uppercase">Growth Area: {pillars[activePillarIdx]}</span>
                  <h4 className="text-base font-black text-slate-900 mt-0.5">Question {currentQuestionIdx + 1} of 28</h4>
                </div>"""

new_header = """                <div>
                  <h4 className="text-xl font-black text-slate-900 mb-0.5">{pillars[activePillarIdx]}</h4>
                  <span className="text-xs font-bold text-slate-400 tracking-wide">Question {currentQuestionIdx + 1} of 28</span>
                </div>"""

content = content.replace(old_header, new_header)

# Replace buttons
old_buttons = """                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5].map(val => (
                    <button 
                      key={val} 
                      type="button" 
                      onClick={() => handleScoreSelect(val)} 
                      className={`py-4 text-center rounded-xl font-mono font-black transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] text-sm ${
                        splashingOption === val 
                          ? 'bg-amber-400 text-white shadow-[0_0_15px_rgba(251,191,36,0.6)] border-amber-300 scale-105' 
                          : scores[currentQuestionIdx] === val 
                            ? 'bg-amber-500 text-white shadow-md' 
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-bold font-mono px-1 pt-1">
                  <span>1: Very Poor / Major Problems</span>
                  <span>5: Excellent / World Class</span>
                </div>"""

new_buttons = """                <div className="grid grid-cols-5 gap-2">
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
                </div>"""

content = content.replace(old_buttons, new_buttons)

with open('src/AssessmentEngine.tsx', 'w') as f:
    f.write(content)
