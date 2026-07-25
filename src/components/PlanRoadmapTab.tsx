import React, { useState } from 'react';
import { 
  Target, CheckCircle2, Calendar, 
  ShieldAlert, Award, Download, PhoneCall, FileText 
} from 'lucide-react';
import { PillarRecommendationResult } from '../business-engine/recommendation-engine/interfaces';

interface PlanRoadmapTabProps {
  report: any; // UnifiedReport
  formData: any; // Form profile metrics
  handlePrintPDF?: () => void;
  setActiveTab?: (tab: string) => void;
  isGeneratingPDF?: boolean;
  pdfStatusMessage?: string;
}

export const PlanRoadmapTab: React.FC<PlanRoadmapTabProps> = ({ 
  report, 
  formData,
  handlePrintPDF,
  setActiveTab,
  isGeneratingPDF = false,
  pdfStatusMessage = '',
}) => {
  const [activePillar, setActivePillar] = useState<string>(
    Object.keys(report?.recommendations?.pillarRecommendations || {})[0] || 'p1'
  );
  
  const recommendations: Record<string, PillarRecommendationResult> = report?.recommendations?.pillarRecommendations || {};
  const currentRec = recommendations[activePillar];

  const compName = report?.profile?.company?.companyName || formData?.companyName || 'Your Enterprise';
  const industry = report?.profile?.business?.industry || formData?.industry || 'Commercial Vertical';
  const selectedChallenge = formData?.challenges && formData.challenges.length > 0 
    ? formData.challenges.join(', ') 
    : 'Core Operational Leakage';

  return (
    <div className="space-y-6 font-sans">
      
      {/* ---------------------------------------------------- */}
      {/* 1. COMPACT TOP HEADER BANNER WITH DOWNLOAD PDF BUTTON */}
      {/* ---------------------------------------------------- */}
      <div className="bg-[#0f172a] text-white p-5 sm:p-6 rounded-2xl shadow-md border border-slate-800 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-amber-500/15 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
        
        <div className="relative z-10 space-y-2 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-amber-500/20 border border-amber-500/30 px-2.5 py-0.5 rounded-full text-amber-300 text-[11px] font-bold uppercase tracking-wider">
              <Calendar className="w-3 h-3 text-amber-400" /> Master 90-Day Execution Plan
            </span>
            <span className="text-[11px] text-slate-400 font-semibold">
              Industry: <span className="text-slate-200 font-bold">{industry}</span>
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            90-Day Operational Roadmap for <span className="text-amber-400">{compName}</span>
          </h2>
          
          <p className="text-xs text-slate-300 font-medium leading-relaxed max-w-xl">
            A time-phased execution roadmap designed to systematically plug operational leakage, build SOP playbooks, and scale unit economics. Full technical playbooks are available in your PDF report.
          </p>
        </div>

        {/* Action Buttons Header Block */}
        <div className="relative z-10 w-full md:w-auto flex flex-col sm:flex-row md:flex-col items-stretch sm:items-center gap-2.5 shrink-0">
          {handlePrintPDF && (
            <button
              onClick={handlePrintPDF}
              disabled={isGeneratingPDF}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-60"
            >
              <Download className="w-4 h-4 text-slate-950" />
              <span>{isGeneratingPDF ? (pdfStatusMessage || 'Generating PDF...') : 'Download PDF Report'}</span>
            </button>
          )}

          {setActiveTab && (
            <button
              onClick={() => setActiveTab('booking')}
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>Book Diagnostic Call</span>
            </button>
          )}
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 2. SUMMARY BOX WITH PROMINENT PDF DOWNLOAD BUTTON    */}
      {/* ---------------------------------------------------- */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-600 shrink-0" />
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              90-Day Execution Summary
            </h3>
          </div>
          <p className="text-xs text-slate-600 font-semibold leading-relaxed">
            Detailed sprint schedules, individual staff responsibility matrices (RACI), and swimlane SOP diagrams are formatted inside your complete downloadable PDF dossier.
          </p>
        </div>

        {handlePrintPDF && (
          <button
            onClick={handlePrintPDF}
            disabled={isGeneratingPDF}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 px-3.5 py-2 rounded-xl transition-all cursor-pointer shrink-0 disabled:opacity-50"
          >
            <Download className="w-4 h-4 text-amber-600" />
            <span>Download Report</span>
          </button>
        )}
      </div>

      {/* ---------------------------------------------------- */}
      {/* 3. 3-PHASE TIME-PHASED ROADMAP CARDS (DETAILED DIRECTIVES) */}
      {/* ---------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* PHASE 1: DAYS 1-30 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3.5 flex flex-col justify-between hover:shadow-md transition-all">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="bg-rose-50 border border-rose-200 text-rose-700 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md">
                Days 1–30 • Emergency Risk Mitigation & Stabilization
              </span>
              <ShieldAlert className="w-4 h-4 text-rose-600" />
            </div>

            <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-tight">
              Emergency Risk Mitigation & Stabilization Sprints
            </h3>

            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Isolate and plug immediate cash flow leakages and severe operational friction points. Deploy basic end-of-day daily tracking templates for all operational staff members. Set up absolute tracking metrics for the primary user challenge selected: <strong>{selectedChallenge}</strong>. Stop daily administrative tasks from reaching the executive founder layer by establishing a strict delegation rule.
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-bold">
            <span>Focus: Leakage Containment</span>
            <span className="text-rose-700 font-extrabold">Days 1–30</span>
          </div>
        </div>

        {/* PHASE 2: DAYS 31-60 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3.5 flex flex-col justify-between hover:shadow-md transition-all">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md">
                Days 31–60 • Process Standardization & Architecture
              </span>
              <Target className="w-4 h-4 text-amber-600" />
            </div>

            <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-tight">
              Process Standardization & Workflow Architecture Sprints
            </h3>

            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Begin the formal drafting and deployment of step-by-step Standard Operating Procedures (SOPs) across your lowest-performing operational pillars. Build clean cloud-based tracking systems to monitor team output, optimize customer acquisition channels, and map customer retention journeys to maximize your lifetime client value metrics.
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-bold">
            <span>Focus: Operational Codification</span>
            <span className="text-amber-700 font-extrabold">Days 31–60</span>
          </div>
        </div>

        {/* PHASE 3: DAYS 61-90 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3.5 flex flex-col justify-between hover:shadow-md transition-all">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md">
                Days 61–90 • System Optimization & Capital Scaling
              </span>
              <Award className="w-4 h-4 text-emerald-600" />
            </div>

            <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-tight">
              System Optimization & Capital Scaling Sprints
            </h3>

            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Integrate scalable automation tools and modern business software models. Transition your management team to a formal weekly performance review cycle based on concrete KPIs rather than personal feelings. Review the unit profit margins across all core product lines to maximize revenue efficiency.
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-bold">
            <span>Focus: Automated Scaling</span>
            <span className="text-emerald-700 font-extrabold">Days 61–90</span>
          </div>
        </div>

      </div>

      {/* ---------------------------------------------------- */}
      {/* 4. PILLAR-SPECIFIC SPRINT OBJECTIVES                 */}
      {/* ---------------------------------------------------- */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Pillar-Specific Tactical Actions</h3>
            <p className="text-[11px] text-slate-400 font-semibold mt-0.5">Filter by business pillar to view targeted 30/60/90-day action items.</p>
          </div>
          <span className="text-[10px] font-bold text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full self-start sm:self-auto">
            Interactive Sprint Matrix
          </span>
        </div>

        {/* Pillar Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {Object.values(recommendations).map((rec: PillarRecommendationResult) => (
            <button
              key={rec.pillarId}
              onClick={() => setActivePillar(rec.pillarId)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                activePillar === rec.pillarId 
                  ? 'bg-slate-900 border-slate-900 text-amber-400 shadow-sm font-black' 
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200'
              }`}
            >
              {rec.entry.pillarName}
            </button>
          ))}
        </div>

        {/* Selected Pillar Details */}
        {currentRec && (
          <div className="space-y-4 animate-fade-in pt-1">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wide">{currentRec.entry.title}</h4>
                <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Pillar Code: {currentRec.entry.recommendationCode}</p>
              </div>
              <div className="flex flex-wrap gap-2 text-[10px] font-bold">
                <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-md text-slate-700 shadow-2xs">
                  Score Band: {currentRec.entry.scoreBand}
                </span>
                <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-md text-slate-700 shadow-2xs">
                  Maturity: {currentRec.entry.maturityBand}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              
              <div className="bg-white border-l-4 border-l-rose-500 rounded-xl p-3.5 shadow-2xs border border-slate-200 space-y-2">
                <h5 className="font-black text-slate-900 uppercase tracking-wide text-[10px] flex items-center gap-1.5 text-rose-600">
                  Immediate Sprint
                </h5>
                <ul className="space-y-1.5 text-[11px] text-slate-600 font-semibold">
                  {currentRec.entry.immediateActions.map((action, i) => (
                    <li key={i} className="flex items-start gap-1.5 leading-snug">
                      <CheckCircle2 className="w-3 h-3 text-rose-500 shrink-0 mt-0.5" />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border-l-4 border-l-amber-500 rounded-xl p-3.5 shadow-2xs border border-slate-200 space-y-2">
                <h5 className="font-black text-slate-900 uppercase tracking-wide text-[10px] flex items-center gap-1.5 text-amber-600">
                  30-Day Target
                </h5>
                <ul className="space-y-1.5 text-[11px] text-slate-600 font-semibold">
                  {currentRec.entry.plan30Days.map((action, i) => (
                    <li key={i} className="flex items-start gap-1.5 leading-snug">
                      <CheckCircle2 className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border-l-4 border-l-blue-500 rounded-xl p-3.5 shadow-2xs border border-slate-200 space-y-2">
                <h5 className="font-black text-slate-900 uppercase tracking-wide text-[10px] flex items-center gap-1.5 text-blue-600">
                  60-Day Target
                </h5>
                <ul className="space-y-1.5 text-[11px] text-slate-600 font-semibold">
                  {currentRec.entry.plan60Days.map((action, i) => (
                    <li key={i} className="flex items-start gap-1.5 leading-snug">
                      <CheckCircle2 className="w-3 h-3 text-blue-500 shrink-0 mt-0.5" />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border-l-4 border-l-emerald-500 rounded-xl p-3.5 shadow-2xs border border-slate-200 space-y-2">
                <h5 className="font-black text-slate-900 uppercase tracking-wide text-[10px] flex items-center gap-1.5 text-emerald-600">
                  90-Day Target
                </h5>
                <ul className="space-y-1.5 text-[11px] text-slate-600 font-semibold">
                  {currentRec.entry.plan90Days.map((action, i) => (
                    <li key={i} className="flex items-start gap-1.5 leading-snug">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        )}
      </div>

      {/* ---------------------------------------------------- */}
      {/* 5. BOTTOM ACTION CTA BAR WITH DOWNLOAD PDF BUTTON    */}
      {/* ---------------------------------------------------- */}
      <div className="bg-[#0f172a] text-white p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-sm font-black uppercase tracking-wide text-white">Download Complete 90-Day Roadmap</h4>
          <p className="text-xs text-slate-300 font-medium">
            Get your comprehensive PDF dossier or schedule a 1-on-1 strategy call with a KRG ONE senior advisor.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
          {handlePrintPDF && (
            <button
              onClick={handlePrintPDF}
              disabled={isGeneratingPDF}
              className="flex-1 sm:flex-none bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <Download className="w-4 h-4 text-slate-950" />
              <span>{isGeneratingPDF ? 'Preparing PDF...' : 'Download PDF Report'}</span>
            </button>
          )}

          {setActiveTab && (
            <button
              onClick={() => setActiveTab('booking')}
              className="flex-1 sm:flex-none bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>Book Call</span>
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
