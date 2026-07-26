import React from 'react';
import { 
  Sparkles, Download, ShieldCheck, Target, 
  TrendingUp, Zap, PhoneCall, Lightbulb, Briefcase,
  XCircle, Check, AlertTriangle, Compass, UserCheck, Layers, Cpu, Building2, BarChart2, ShieldAlert,
  ArrowRight, Activity
} from 'lucide-react';

interface ExecutiveAdvisoryTabProps {
  report: any; // UnifiedReport
  formData: any; // Form profile metrics
  handlePrintPDF: () => void;
  setActiveTab: (tab: string) => void;
  isGeneratingPDF?: boolean;
  pdfStatusMessage?: string;
}

export const ExecutiveAdvisoryTab: React.FC<ExecutiveAdvisoryTabProps> = ({
  report,
  formData,
  handlePrintPDF,
  setActiveTab,
  isGeneratingPDF = false,
  pdfStatusMessage = '',
}) => {
  const compName = report?.profile?.company?.companyName || formData?.companyName || 'Your Enterprise';
  const industry = report?.profile?.business?.industry || formData?.industry || 'Commercial Vertical';
  const revenue = report?.profile?.size?.annualRevenueRange || formData?.revenue || 'Not Specified';
  
  const globalScore = report?.overallScore ?? 72;
  const isElite = globalScore >= 85;
  const isMid = globalScore >= 70 && globalScore < 85;
  
  // Calculate recommended actions based on score and challenges
  const topChallenges = formData?.challenges && formData.challenges.length > 0 
    ? formData.challenges 
    : ["Operational Inefficiency & Lack of Systems", "Inconsistent Sales & Revenue Growth", "High Dependency on the Founder"];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* ---------------------------------------------------- */}
      {/* 1. HEADER SECTION                                    */}
      {/* ---------------------------------------------------- */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Cpu className="w-32 h-32 text-indigo-600" />
        </div>
        <div className="relative z-10">
          <h2 className="text-xl font-black text-slate-900 mb-1">AI Growth Advisory™</h2>
          <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest">AI Should Solve Business Problems — Not Create More Complexity</p>
          <p className="text-sm text-slate-500 mt-4 max-w-2xl leading-relaxed font-medium">
            Artificial Intelligence is most effective when aligned with your business priorities. Based on your <strong>Business Growth Assessment™</strong>, KRGONE has identified where AI can deliver measurable business value.
          </p>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 2. AI READINESS SCORE                                */}
      {/* ---------------------------------------------------- */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-indigo-600" />
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">AI Readiness Score</h3>
          </div>
          <div className="bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-sm">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">Status:</span>
            <span className="text-xs font-black text-emerald-600 uppercase tracking-tight">AI-Ready Foundation</span>
          </div>
        </div>
        
        <div className="p-6 flex flex-col md:flex-row gap-8 items-center">
          <div className="shrink-0 relative">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="58"
                stroke="currentColor"
                strokeWidth="10"
                fill="transparent"
                className="text-slate-100"
              />
              <circle
                cx="64"
                cy="64"
                r="58"
                stroke="currentColor"
                strokeWidth="10"
                fill="transparent"
                strokeDasharray={364.4}
                strokeDashoffset={364.4 * (1 - 0.68)}
                strokeLinecap="round"
                className="text-indigo-600 transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-slate-900 leading-none">68</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">/ 100</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-black text-slate-900 mb-1 flex items-center gap-2">
                <Compass className="w-4 h-4 text-indigo-600" /> Recommendation
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                Your business is ready to begin targeted AI adoption. Focus on practical business improvements before investing in advanced AI solutions.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase rounded-lg border border-emerald-100">Low Technical Debt</span>
              <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase rounded-lg border border-indigo-100">Digital Baseline Established</span>
              <span className="px-2.5 py-1 bg-amber-50 text-amber-700 text-[10px] font-black uppercase rounded-lg border border-amber-100">Ready for Automation</span>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 3. AI GROWTH PRIORITIES                              */}
      {/* ---------------------------------------------------- */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-100 flex items-center gap-2">
          <Zap className="w-5 h-5 text-indigo-600" />
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">AI Growth Priorities</h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Priority 1 */}
            <div className="border border-slate-200 rounded-2xl p-5 hover:border-indigo-300 transition-all shadow-sm bg-slate-50/30 group">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[13px] font-black text-slate-900 uppercase tracking-tight">Priority 1</h4>
                  <p className="text-[11px] font-bold text-indigo-600 uppercase">Improve Revenue Growth</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Use AI to:</h5>
                  <ul className="space-y-2">
                    {["Identify high-potential leads", "Automate customer follow-ups", "Improve sales forecasting"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-700 font-bold">
                        <Check className="w-3.5 h-3.5 text-emerald-500" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-indigo-50/50 rounded-xl p-3 border border-indigo-100">
                  <h5 className="text-[10px] font-black text-indigo-700 uppercase tracking-widest mb-1">Expected Impact</h5>
                  <p className="text-xs text-indigo-900 font-bold leading-relaxed">Higher conversion rates and faster sales cycles.</p>
                </div>
              </div>
            </div>

            {/* Priority 2 */}
            <div className="border border-slate-200 rounded-2xl p-5 hover:border-indigo-300 transition-all shadow-sm bg-slate-50/30 group">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[13px] font-black text-slate-900 uppercase tracking-tight">Priority 2</h4>
                  <p className="text-[11px] font-bold text-indigo-600 uppercase">Improve Operational Efficiency</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Use AI to:</h5>
                  <ul className="space-y-2">
                    {["Reduce repetitive administrative work", "Standardize SOP execution", "Automate routine workflows"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-700 font-bold">
                        <Check className="w-3.5 h-3.5 text-emerald-500" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-indigo-50/50 rounded-xl p-3 border border-indigo-100">
                  <h5 className="text-[10px] font-black text-indigo-700 uppercase tracking-widest mb-1">Expected Impact</h5>
                  <p className="text-xs text-indigo-900 font-bold leading-relaxed">Lower operating costs and improved team productivity.</p>
                </div>
              </div>
            </div>

            {/* Priority 3 */}
            <div className="border border-slate-200 rounded-2xl p-5 hover:border-indigo-300 transition-all shadow-sm bg-slate-50/30 group">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                  <BarChart2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[13px] font-black text-slate-900 uppercase tracking-tight">Priority 3</h4>
                  <p className="text-[11px] font-bold text-indigo-600 uppercase">Better Business Decisions</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Use AI to:</h5>
                  <ul className="space-y-2">
                    {["Monitor KPIs in real time", "Generate management insights", "Predict performance trends"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-700 font-bold">
                        <Check className="w-3.5 h-3.5 text-emerald-500" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-indigo-50/50 rounded-xl p-3 border border-indigo-100">
                  <h5 className="text-[10px] font-black text-indigo-700 uppercase tracking-widest mb-1">Expected Impact</h5>
                  <p className="text-xs text-indigo-900 font-bold leading-relaxed">Faster and more informed decision-making.</p>
                </div>
              </div>
            </div>

            {/* Priority 4 */}
            <div className="border border-slate-200 rounded-2xl p-5 hover:border-indigo-300 transition-all shadow-sm bg-slate-50/30 group">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[13px] font-black text-slate-900 uppercase tracking-tight">Priority 4</h4>
                  <p className="text-[11px] font-bold text-indigo-600 uppercase">Build a Scalable Business</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Use AI to:</h5>
                  <ul className="space-y-2">
                    {["Create repeatable business systems", "Strengthen knowledge management", "Support future business expansion"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-700 font-bold">
                        <Check className="w-3.5 h-3.5 text-emerald-500" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-indigo-50/50 rounded-xl p-3 border border-indigo-100">
                  <h5 className="text-[10px] font-black text-indigo-700 uppercase tracking-widest mb-1">Expected Impact</h5>
                  <p className="text-xs text-indigo-900 font-bold leading-relaxed">A business that grows with less dependence on manual effort.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 4. BOTTOM ACTION FOOTER BANNER                       */}
      {/* ---------------------------------------------------- */}
      <div className="bg-[#0f172a] text-white p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 transition-transform duration-500">
          <Cpu className="w-48 h-48" />
        </div>
        <div className="space-y-2 text-center sm:text-left relative z-10">
          <span className="inline-block bg-indigo-500/20 text-indigo-300 text-[10px] font-black px-2.5 py-0.5 rounded border border-indigo-500/30 uppercase tracking-widest mb-1">
            AI Implementation Partnership
          </span>
          <h4 className="text-base sm:text-lg font-black uppercase tracking-wide text-white">Scale Your Enterprise With AI</h4>
          <p className="text-sm text-slate-300 font-medium max-w-xl leading-relaxed">
            Download your full AI Strategy Dossier or speak with an AI Deployment Partner to discuss how we can build these systems for you.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0 relative z-10">
          <button
            onClick={handlePrintPDF}
            disabled={isGeneratingPDF}
            className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-indigo-400 hover:from-indigo-400 hover:to-indigo-300 text-white font-black text-[12px] uppercase tracking-wider py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-50"
          >
            <Download className="w-4 h-4 text-white" />
            <span>{isGeneratingPDF ? 'Preparing PDF...' : 'Download AI Roadmap'}</span>
          </button>
          <button
            onClick={() => setActiveTab('booking')}
            className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-[12px] uppercase tracking-wider py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            <PhoneCall className="w-4 h-4 text-indigo-400" />
            <span>Book AI Strategy Call</span>
          </button>
        </div>
      </div>
    </div>
  );
};
