import re

with open('src/AssessmentEngine.tsx', 'r') as f:
    content = f.read()

# 1. Update initial scores state
old_scores = """  const [scores, setScores] = useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('krgone_scores');
      if (saved) return JSON.parse(saved);
    }
    return new Array(28).fill(3);
  });"""

new_scores = """  const [scores, setScores] = useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('krgone_scores');
      if (saved) return JSON.parse(saved);
    }
    return new Array(28).fill(0);
  });"""

content = content.replace(old_scores, new_scores)

# 2. Replace the radar panel
old_panel = """          {/* Right Live Polygon Preview */}
          <div className="lg:col-span-3 bg-[#0a1128] border border-slate-800 rounded-[24px] p-6 text-white flex flex-col justify-between shadow-xl min-h-[340px]">
            <div>
              <span className="text-[9px] font-bold text-slate-400 font-mono tracking-widest block">RADAR PREVIEW</span>
              <h5 className="text-xs font-black text-[#d4af37] uppercase mt-0.5">Live Core Alignment</h5>
            </div>
            <div className="my-6 flex justify-center">
              <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="1" />
                <circle cx="50" cy="50" r="20" fill="none" stroke="#1e293b" strokeWidth="1" />
                <polygon 
                  points={`
                    50,${50 - (getPillarScore(0)/100)*40} 
                    ${50 + (getPillarScore(1)/100)*35},${50 - (getPillarScore(1)/100)*15} 
                    ${50 + (getPillarScore(2)/100)*35},${50 + (getPillarScore(2)/100)*25} 
                    50,${50 + (getPillarScore(3)/100)*40} 
                    ${50 - (getPillarScore(4)/100)*35},${50 + (getPillarScore(4)/100)*25} 
                    ${50 - (getPillarScore(5)/100)*35},${50 - (getPillarScore(5)/100)*15}
                  `} 
                  fill="rgba(212, 175, 55, 0.15)" stroke="#d4af37" strokeWidth="1.5"
                />
              </svg>
            </div>
            <span className="text-[9px] font-mono text-slate-500 text-center tracking-wider block uppercase">Updates Live Instantly</span>
          </div>"""

new_panel = """          {/* Right Live Polygon Preview */}
          <div className="lg:col-span-3 bg-[#0a1128] border border-slate-800 rounded-[24px] p-6 text-white flex flex-col shadow-xl">
            <div>
              <span className="text-[9px] font-bold text-slate-400 font-mono tracking-widest block mb-2">LIVE TRACKING</span>
              <h5 className="text-sm font-black text-white uppercase mt-0.5">Business Growth Snapshot™</h5>
            </div>
            
            <div className="my-6 flex justify-center">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="1" />
                <circle cx="50" cy="50" r="20" fill="none" stroke="#1e293b" strokeWidth="1" />
                <polygon 
                  points={[0, 1, 2, 3, 4, 5, 6].map(i => {
                    const angle = (i * 360) / 7;
                    const r = (getPillarScore(i) / 100) * 40;
                    const x = 50 + r * Math.cos((angle * Math.PI) / 180);
                    const y = 50 + r * Math.sin((angle * Math.PI) / 180);
                    return `${x},${y}`;
                  }).join(' ')}
                  fill="rgba(212, 175, 55, 0.2)" 
                  stroke="#d4af37" 
                  strokeWidth="1.5" 
                />
              </svg>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <span className="text-xs text-slate-400">Business Growth Score™</span>
                <span className="text-xs font-bold text-[#d4af37]">{currentQuestionIdx === 0 ? 'Pending' : `${getGlobalScore()}%`}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <span className="text-xs text-slate-400">Questions Completed</span>
                <span className="text-xs font-bold text-white">{currentQuestionIdx} / 28</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <span className="text-xs text-slate-400">Estimated Time Left</span>
                <span className="text-xs font-bold text-white">{Math.max(1, Math.ceil((28 - currentQuestionIdx) / 4))} min</span>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-slate-400">Your Progress</span>
                  <span className="text-xs font-bold text-white">{Math.round((currentQuestionIdx / 28) * 100)}%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#d4af37] h-full transition-all duration-300" style={{ width: `${(currentQuestionIdx / 28) * 100}%` }}></div>
                </div>
              </div>
            </div>
          </div>"""

content = content.replace(old_panel, new_panel)

# 3. Add confidence message at the bottom
# Look for the last </div> before final </div> of component
# "      )}
#    </div>
#  );"
old_footer = """      )}

    </div>
  );"""

new_footer = """      )}

      <div className="max-w-7xl mx-auto mt-12 mb-4 text-center">
        <p className="text-[10px] text-slate-400 font-medium">All responses remain confidential under KRG ONE's NDA & Confidentiality Commitment.</p>
      </div>

    </div>
  );"""

content = content.replace(old_footer, new_footer)

with open('src/AssessmentEngine.tsx', 'w') as f:
    f.write(content)
