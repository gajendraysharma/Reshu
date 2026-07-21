import re

with open('src/components/DashboardReport.tsx', 'r') as f:
    content = f.read()

overview_block = r'\{\/\* PAGE 1: EXECUTIVE OVERVIEW \*\/\}.*?\{\/\* PAGE 2: BUSINESS HEALTH DASHBOARD \*\/\}'

new_overview = r'''{/* PAGE 1: EXECUTIVE OVERVIEW */}
          {activeTab === 'OVERVIEW' && (
             <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6 relative z-10">
                {/* Header Grid: Data Matrix */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
                   {/* Left: Overall Diagnostic Score */}
                   <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 flex flex-col items-center justify-center text-center relative z-10">
                      <h2 className="text-xl font-bold text-[#0B2545] mb-2">Overall Growth Score</h2>
                      <p className="text-xs text-slate-500 mb-8 max-w-xs">A comprehensive evaluation of your operational maturity based on the 7-Pillar framework.</p>
                      
                      <div className="relative w-48 h-48 mb-4">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                           {/* Background circle */}
                           <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                           {/* Foreground circle */}
                           <circle 
                              cx="50" cy="50" r="45" 
                              fill="none" 
                              stroke={globalScore >= 70 ? '#10b981' : globalScore >= 50 ? '#d4af37' : '#ef4444'} 
                              strokeWidth="8"
                              strokeDasharray={`${(globalScore / 100) * 283} 283`}
                              strokeLinecap="round"
                              className="transition-all duration-1000 ease-out"
                           />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                           <span className="text-4xl font-black text-[#0B2545]">{globalScore}</span>
                           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">/ 100</span>
                        </div>
                      </div>
                      
                      <div className="inline-flex flex-col items-center gap-1 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
                         <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Diagnostic State</span>
                         <span className="text-sm font-black text-[#0B2545]">
                            {globalScore >= 85 ? 'Elite Scaling' : globalScore >= 70 ? 'Operational Transition' : 'Structural Volatility'}
                         </span>
                      </div>
                   </div>

                   {/* Right: Full Data Capture Mapping Matrix */}
                   <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 relative z-10">
                      <h2 className="text-xl font-bold text-[#0B2545] border-b border-slate-100 pb-3 mb-4">Executive Profile</h2>
                      
                      <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-6">
                         <div>
                             <span className="block text-[9px] uppercase font-bold text-slate-400 mb-1">Company Name</span>
                             <span className="text-xs font-bold text-slate-800">{formData.companyName || 'Not Provided'}</span>
                         </div>
                         <div>
                             <span className="block text-[9px] uppercase font-bold text-slate-400 mb-1">Founder / Leader</span>
                             <span className="text-xs font-bold text-slate-800">{formData.fullName || 'Not Provided'}</span>
                         </div>
                         <div>
                             <span className="block text-[9px] uppercase font-bold text-slate-400 mb-1">Industry</span>
                             <span className="text-xs font-bold text-slate-800">{formData.industry || 'Not Provided'}</span>
                         </div>
                         <div>
                             <span className="block text-[9px] uppercase font-bold text-slate-400 mb-1">Business Size</span>
                             <span className="text-xs font-bold text-slate-800">{formData.businessSize || 'Not Provided'}</span>
                         </div>
                         <div className="col-span-2">
                             <span className="block text-[9px] uppercase font-bold text-slate-400 mb-1">Annual Revenue Bracket</span>
                             <span className="text-xs font-bold text-slate-800">{formData.revenue || 'Not Provided'}</span>
                         </div>
                      </div>

                      <div className="border-t border-slate-100 pt-4 space-y-4">
                         <div>
                             <span className="block text-[9px] uppercase font-bold text-slate-400 mb-1">Immediate Priority</span>
                             <span className="text-xs font-bold text-[#D4AF37] bg-amber-50 px-2 py-1 rounded inline-block border border-amber-100">{formData.priority || 'Not Provided'}</span>
                         </div>
                         <div>
                             <span className="block text-[9px] uppercase font-bold text-slate-400 mb-1">Primary Growth Opportunity</span>
                             <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded inline-block border border-emerald-100">{formData.opportunity || 'Not Provided'}</span>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Segment A: The Core Diagnostic Snapshot */}
                <div className="bg-[#0B2545] rounded-2xl p-6 md:p-8 text-white relative overflow-hidden shadow-lg border border-[#0B2545] z-10">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 blur-[80px] rounded-full pointer-events-none"></div>
                   <div className="relative z-10">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest mb-4 border border-[#D4AF37]/30">
                         <Activity className="w-3 h-3" /> Diagnostic Verdict
                      </span>
                      {(() => {
                         if (globalScore >= 85) {
                             return <p className="text-sm md:text-base text-slate-300 leading-relaxed font-medium"><strong className="text-white">{formData.companyName || 'Your organization'}</strong> shows exceptional maturity across its primary functions, setting a benchmark for the <strong className="text-white">{formData.industry || 'target'}</strong> industry. Having moved past the initial manual survival stage, your baseline framework is solid. Your core opportunity now is to leverage this internal stability to aggressively capture market share and optimize long-term enterprise valuation. The goal of <strong className="text-white">{formData.priority || 'growth'}</strong> is entirely achievable with optimized capital deployment.</p>;
                         } else {
                             return <p className="text-sm md:text-base text-slate-300 leading-relaxed font-medium">An in-depth evaluation of <strong className="text-white">{formData.companyName || 'your organization'}</strong> within the <strong className="text-white">{formData.industry || 'target'}</strong> sector reveals that while you have built an enterprise operating in the <strong className="text-white">{formData.revenue || 'current'}</strong> bracket, you are currently restricted by a structural ceiling. Your answers show that your selected goal—<strong className="text-[#D4AF37]">{formData.priority || 'growth'}</strong>—is directly blocked by operational volatility. Because daily workflows are dependent on the memory and active involvement of the founder layer, your team is stuck in a state of reactive firefighting rather than predictable execution.</p>;
                         }
                      })()}
                   </div>
                </div>

                {/* Segment B: The Strategic Priority Matrix */}
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 z-10 relative">
                   <h3 className="text-xl font-bold text-[#0B2545] mb-6">Strategic Priority Matrix</h3>
                   
                   <div className="mb-6">
                      <span className="block text-[10px] uppercase font-bold text-slate-400 mb-3">Identified Friction Points</span>
                      <div className="flex flex-wrap gap-2">
                         {formData.challenges && formData.challenges.length > 0 ? (
                            formData.challenges.map((ch: string, i: number) => (
                               <span key={i} className="bg-red-50 text-red-700 px-4 py-2 rounded-lg text-xs font-bold border border-red-100 flex items-center gap-2">
                                  <AlertCircle className="w-3.5 h-3.5" /> {ch}
                               </span>
                            ))
                         ) : (
                            <span className="bg-red-50 text-red-700 px-4 py-2 rounded-lg text-xs font-bold border border-red-100 flex items-center gap-2">
                               <AlertCircle className="w-3.5 h-3.5" /> Core Operational Leakage
                            </span>
                         )}
                      </div>
                   </div>

                   <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                      <h4 className="text-sm font-bold text-[#0B2545] uppercase tracking-widest mb-3 flex items-center gap-2">
                         <Target className="w-4 h-4 text-[#D4AF37]" /> Friction Analysis
                      </h4>
                      <p className="text-sm text-slate-700 leading-relaxed mb-4">
                         Your primary challenge (<strong>{formData.challenges && formData.challenges.length > 0 ? formData.challenges[0] : 'Operational Bottlenecks'}</strong>) combined with your choice of <strong>{formData.priority || 'growth'}</strong> as an immediate focus indicates severe systemic leakage. Trying to grow your numbers while your operations remain unstandardized is mathematically inefficient.
                      </p>
                      <p className="text-sm text-slate-700 leading-relaxed">
                         Every rupee spent on acquisition will be wasted through operational bottlenecks, low team productivity, and tracking gaps. The data proves that you cannot out-market or out-sell a broken operational baseline.
                      </p>
                   </div>
                </div>

                {/* Segment C: The KRG ONE Partner Pathway */}
                <div className="bg-gradient-to-br from-amber-50 to-white rounded-2xl p-6 md:p-10 shadow-md border-2 border-[#D4AF37] relative overflow-hidden z-10">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 blur-[60px] rounded-full pointer-events-none"></div>
                   <div className="relative z-10 text-center max-w-3xl mx-auto">
                      <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm border border-amber-200 mb-6">
                         <Zap className="w-8 h-8 text-[#D4AF37]" />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#0B2545] mb-6">How KRG ONE Eliminates Your Growth Friction</h2>
                      <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-8">
                         The data shows exactly <em>what</em> is bottlenecking your business, but fixing it requires physical implementation. As your strategic execution partner, KRG ONE steps in to do the heavy lifting for you. We don't just give you a list of advice; we deploy senior process optimization consultants directly into your firm to audit your workflows, write your custom Standard Operating Procedures (SOPs), build your digital operations dashboards, and train your management layer. We systematically remove the structural drag that is capping your cash flow, freeing the founder to focus purely on high-level strategy.
                      </p>
                      
                      <button className="w-full md:w-auto px-8 py-4 bg-[#0B2545] hover:bg-[#1a365d] text-white font-bold text-sm rounded-xl shadow-lg shadow-[#0B2545]/20 transition-all duration-200 transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3 mx-auto">
                         Secure Your Live 1-on-1 Business Growth Diagnostic Audit (Special Rate: ₹1,499) <ArrowRight className="w-4 h-4" />
                      </button>
                   </div>
                </div>
             </div>
          )}

          {/* PAGE 2: BUSINESS HEALTH DASHBOARD */}'''

content = re.sub(overview_block, new_overview, content, flags=re.DOTALL)

with open('src/components/DashboardReport.tsx', 'w') as f:
    f.write(content)

