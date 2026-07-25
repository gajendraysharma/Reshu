import React from 'react';
import { 
  Sparkles, Download, ArrowRight, ShieldCheck, Target, 
  TrendingUp, CheckCircle2, Zap, Building2, ChevronRight, 
  Coins, AlertTriangle, UserCheck, PhoneCall, Lightbulb, Briefcase, FileText,
  XCircle, Check, Clock, Compass, Activity, ShieldAlert, BarChart2
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

  return (
    <div className="space-y-6 font-sans pb-8">
      
      {/* ---------------------------------------------------- */}
      {/* 1. EXECUTIVE HEADER BANNER WITH PDF CTA              */}
      {/* ---------------------------------------------------- */}
      <div className="bg-[#0f172a] text-white p-5 sm:p-6 rounded-2xl shadow-lg border border-slate-800 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-amber-500/20 via-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
        
        <div className="relative z-10 space-y-2 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-amber-500/20 border border-amber-500/30 px-3 py-0.5 rounded-full text-amber-300 text-[11px] font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> AI Growth Advisory Blueprint
            </span>
            <span className="text-[11px] text-slate-300 font-semibold bg-slate-800/90 px-2.5 py-0.5 rounded-full border border-slate-700">
              {industry}
            </span>
            <span className="text-[11px] text-amber-300 font-bold bg-slate-800/90 px-2.5 py-0.5 rounded-full border border-slate-700">
              {revenue}
            </span>
          </div>

          <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight">
            Strategic Business Growth Diagnostic for <span className="text-amber-400">{compName}</span>
          </h2>
          
          <p className="text-xs text-slate-300 font-medium leading-relaxed max-w-2xl">
            A high-level executive briefing on systemized scaling. Detailed swimlane SOP playbooks & 90-day execution roadmaps are generated in your full 30+ page PDF Dossier.
          </p>
        </div>

        {/* Action CTAs */}
        <div className="relative z-10 w-full md:w-auto flex flex-col sm:flex-row md:flex-col items-stretch sm:items-center gap-2.5 shrink-0">
          <button
            onClick={handlePrintPDF}
            disabled={isGeneratingPDF}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-60"
          >
            <Download className="w-4 h-4 text-slate-950" />
            <span>{isGeneratingPDF ? (pdfStatusMessage || 'Generating...') : 'Download Full PDF Dossier'}</span>
          </button>

          <button
            onClick={() => setActiveTab('booking')}
            className="w-full bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
            <span>Book Partner Review</span>
          </button>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 2. WHAT MAKES A BUSINESS GROW? (4 CORE DRIVERS)      */}
      {/* ---------------------------------------------------- */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-600" />
            <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider">
              1. What Makes a Business Grow Predictably?
            </h3>
          </div>
          <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">The 4 Foundations</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          
          <div className="bg-slate-50/70 rounded-xl p-4 border border-slate-200/80 space-y-2 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200/60">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-tight">Systemized Process SOPs</h4>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                Decouples daily execution from founder memory into documented digital playbooks for consistent delivery.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200/60 text-[10px] font-bold text-amber-700">
              Outcome: Reclaims founder time & simplifies hiring.
            </div>
          </div>

          <div className="bg-slate-50/70 rounded-xl p-4 border border-slate-200/80 space-y-2 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-200/60">
                <Target className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-tight">Predictable Sales Pipeline</h4>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                Replaces word-of-mouth with CRM stage-gate rules and automated SLA reminders to capture leads consistently.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200/60 text-[10px] font-bold text-indigo-700">
              Outcome: Accelerates closing velocity by +18%.
            </div>
          </div>

          <div className="bg-slate-50/70 rounded-xl p-4 border border-slate-200/80 space-y-2 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200/60">
                <Coins className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-tight">Financial Unit Economics</h4>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                Shifts from retrospective tax accounting to 13-week rolling cash forecasts and margin leak audits.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200/60 text-[10px] font-bold text-emerald-700">
              Outcome: Expands gross profit margins by +3-5%.
            </div>
          </div>

          <div className="bg-slate-50/70 rounded-xl p-4 border border-slate-200/80 space-y-2 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-200/60">
                <UserCheck className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-tight">Autonomous Governance</h4>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                Empowers department leads with clear KPI scorecards and delegation matrix boundaries.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200/60 text-[10px] font-bold text-purple-700">
              Outcome: Elevates business valuation & scale.
            </div>
          </div>

        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 3. DIAGNOSIS IMPORTANCE & RISKS OF NEGLECT (2 COLS)  */}
      {/* ---------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* WHY DIAGNOSIS IS CRUCIAL */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
              <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider">
                2. Why Business Diagnosis Is Crucial
              </h3>
            </div>

            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Most founders attempt to solve growth plateaus by spending more on marketing or working longer hours. A 7-pillar business diagnostic uncovers the true root bottlenecks before deploying capital.
            </p>

            <ul className="space-y-2 text-xs font-semibold text-slate-700">
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3] mt-0.5 shrink-0" />
                <span><strong>Plugs Invisible Margin Leaks:</strong> Identifies unbilled scope creep and inefficient operational COGS.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3] mt-0.5 shrink-0" />
                <span><strong>Targeted Capital Allocation:</strong> Focuses investment on high-return process and sales automation.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3] mt-0.5 shrink-0" />
                <span><strong>Establishes Valuation Baseline:</strong> Quantifies operational readiness for institutional scaling or exit.</span>
              </li>
            </ul>
          </div>

          <div className="bg-amber-50/70 border border-amber-200/80 p-3 rounded-xl text-[11px] text-amber-900 font-bold">
            Insight: Solving root operational causes prevents wasting revenue on surface-level symptoms.
          </div>
        </div>

        {/* WHAT IF BUSINESS OWNERS NEGLECT THIS STEP? */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
              <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider">
                3. What If Owners Neglect Diagnosis?
              </h3>
            </div>

            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Operating without a diagnostic blueprint locks companies in the "Founder Dependency Trap", leading to severe profit erosion and stalled growth.
            </p>

            <ul className="space-y-2 text-xs font-semibold text-slate-700">
              <li className="flex items-start gap-2">
                <XCircle className="w-3.5 h-3.5 text-rose-500 mt-0.5 shrink-0" />
                <span><strong>Founder Burnout:</strong> 60+ hour workweeks where every daily decision escalates to the owner layer.</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-3.5 h-3.5 text-rose-500 mt-0.5 shrink-0" />
                <span><strong>15-25% Margin Leakage:</strong> Manual errors, unbilled hours, and unmonitored vendor cost creep.</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-3.5 h-3.5 text-rose-500 mt-0.5 shrink-0" />
                <span><strong>Zero Enterprise Value:</strong> A business that cannot run without its founder has minimal sale value.</span>
              </li>
            </ul>
          </div>

          <div className="bg-rose-50/70 border border-rose-200/80 p-3 rounded-xl text-[11px] text-rose-900 font-bold">
            Risk: Unsystemized businesses hit a hard revenue ceiling and suffer high staff turnover.
          </div>
        </div>

      </div>

      {/* ---------------------------------------------------- */}
      {/* 4. HOW KRG ONE HELPS BOOST BUSINESS GROWTH           */}
      {/* ---------------------------------------------------- */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-slate-900 shrink-0" />
            <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider">
              4. How KRG ONE Boosts Your Enterprise Growth
            </h3>
          </div>
          <span className="text-[11px] font-bold text-slate-400 uppercase">Hands-On Partner Execution</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-slate-900 font-black text-xs uppercase">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                <span>SOP Playbooks</span>
              </div>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                We write custom operational playbooks and build an interactive digital SOP wiki to guarantee quality control.
              </p>
            </div>
            <span className="text-[10px] font-bold text-amber-700 block pt-2 border-t border-slate-200">
              Reclaims 40% team capacity
            </span>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-slate-900 font-black text-xs uppercase">
                <TrendingUp className="w-4 h-4 text-amber-500" />
                <span>CRM Sales Engine</span>
              </div>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                We configure your automated CRM pipeline and train staff on stage-gate deal closing discipline.
              </p>
            </div>
            <span className="text-[10px] font-bold text-indigo-700 block pt-2 border-t border-slate-200">
              Boosts conversions +18-22%
            </span>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-slate-900 font-black text-xs uppercase">
                <Coins className="w-4 h-4 text-amber-500" />
                <span>Fractional CFO</span>
              </div>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                Our CFO advisors deploy 13-week rolling cash flow forecasts and unit margin audits to protect net income.
              </p>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 block pt-2 border-t border-slate-200">
              Expands margins +3-5%
            </span>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-slate-900 font-black text-xs uppercase">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Cloud Stack Integration</span>
              </div>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                We connect sales, billing, and ops tools via cloud webhooks to eliminate manual data re-entry.
              </p>
            </div>
            <span className="text-[10px] font-bold text-purple-700 block pt-2 border-t border-slate-200">
              Zero manual re-entry
            </span>
          </div>

        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 5. BOTTOM ACTION FOOTER BANNER                       */}
      {/* ---------------------------------------------------- */}
      <div className="bg-[#0f172a] text-white p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <span className="inline-block bg-amber-500/20 text-amber-300 text-[10px] font-black px-2.5 py-0.5 rounded border border-amber-500/30 uppercase tracking-widest">
            Full Diagnostic Available
          </span>
          <h4 className="text-sm sm:text-base font-black uppercase tracking-wide text-white">Get Your 30+ Page Custom PDF Dossier</h4>
          <p className="text-xs text-slate-300 font-medium max-w-xl">
            Contains detailed swimlane SOP diagrams, 90-day time-phased execution sprints, and unit margin benchmarks.
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0">
          <button
            onClick={handlePrintPDF}
            disabled={isGeneratingPDF}
            className="flex-1 sm:flex-none bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-50"
          >
            <Download className="w-4 h-4 text-slate-950" />
            <span>{isGeneratingPDF ? 'Preparing PDF...' : 'Download Full PDF Dossier'}</span>
          </button>

          <button
            onClick={() => setActiveTab('booking')}
            className="flex-1 sm:flex-none bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
            <span>Book Partner Call</span>
          </button>
        </div>
      </div>

    </div>
  );
};
