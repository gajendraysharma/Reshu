import React from 'react';
import { 
  Sparkles, Download, ShieldCheck, Target, 
  TrendingUp, Zap, PhoneCall, Lightbulb, Briefcase,
  XCircle, Check, AlertTriangle, Compass, UserCheck, Layers, Cpu, Building2, BarChart2, ShieldAlert
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
  const isLowScore = globalScore < 70;

  // Strategic 5 Technical Recommendations for Low and High score brackets
  const recommendations = isLowScore ? [
    {
      num: 1,
      title: "Develop Core Standard Operating Procedures (SOPs)",
      badge: "Process Standardization",
      friction: "Your business functions rely on tribal employee memory rather than clear documented systems, leading to high processing errors, unpredictable client delivery quality, and extended onboarding timelines for new hires.",
      intervention: "Document a unified digital blueprint for your absolute highest-leverage processes across sales, operations, and finance. Map out visual step-by-step swimlane diagrams and set explicit processing speed rules for every department.",
      deployment: "We deploy senior systems consultants directly into your firm to audit your workflows, write your custom operational playbooks, and build an interactive digital wiki database. This secures execution quality and helps insulate your profit margins."
    },
    {
      num: 2,
      title: "Automate Sales & CRM Stage-Gate Pipelines",
      badge: "Revenue Velocity",
      friction: "High volumes of valuable pipeline prospects are leaking daily due to manual follow-up dependencies and lack of automated stage-gate lead qualification.",
      intervention: "Architect an automated, multi-channel customer relationship management (CRM) infrastructure. Trigger behavior-based email and SMS sequences, and establish programmatic lead scoring to maximize conversions.",
      deployment: "Our revenue operations division completely restructures your CRM platform, designs custom conversion sequences, and implements a predictive pipeline monitoring cockpit to capture lost revenue."
    },
    {
      num: 3,
      title: "Institute 13-Week Cash Flow & Unit Margin Audits",
      badge: "Financial Control",
      friction: "Decisions are frequently guided by gross revenue numbers rather than net unit profitability. This lack of granular visibility obscures high-volume cost leaks, leaving your monthly cash flow vulnerable.",
      intervention: "Deploy a real-time financial reporting cockpit to monitor unit economics including Gross Margin, Customer Acquisition Cost (CAC), and Lifetime Value (LTV) through a strict weekly executive audit cycle.",
      deployment: "We embed professional CFO capabilities to restructure your accounting frameworks, design live Business Intelligence dashboard grids, and optimize your working capital allocations."
    },
    {
      num: 4,
      title: "Decentralize Executive Decision-Making & Governance",
      badge: "Founder Decoupling",
      friction: "The executive founder layer acts as a structural bottleneck for both high-level strategies and daily administrative approvals, paralyzing middle-management speed and capping company capacity.",
      intervention: "Formulate an outcome-oriented Accountability Chart. Define explicit, measurable Key Performance Indicators (KPIs) for each department lead and grant them structured budget autonomy.",
      deployment: "We run structured delegation workshops, rewrite managerial role definitions, and establish a high-performance leadership cadence to free up the founder for high-leverage strategic expansion."
    },
    {
      num: 5,
      title: "Deploy Cloud Software & Automation Webhook Stacks",
      badge: "Tech Integration",
      friction: "Siloed, non-integrated software tools force team members into redundant manual data entry, increasing human error and slowing operational execution speed across departments.",
      intervention: "Architect a unified cloud stack connecting sales, customer onboarding, project execution, and billing through automated API webhooks.",
      deployment: "Our technology integration team designs, tests, and deploys custom cloud workflows, eliminating manual data entry and reclaiming up to 40% of staff operational capacity."
    }
  ] : [
    {
      num: 1,
      title: "Institutionalize Enterprise Workflow Architecture",
      badge: "Process Optimization",
      friction: "While basic procedures are documented, cross-departmental handoffs experience minor latency and lack real-time telemetry tracing, preventing maximum operational velocity.",
      intervention: "Upgrade existing SOP playbooks into a continuous workflow database with embedded performance metrics and real-time SLA event tracking across all business units.",
      deployment: "KRG ONE partners embed automated workflow tracing tools and set up live executive dashboard grids to maintain maximum operational delivery speed."
    },
    {
      num: 2,
      title: "Deploy Predictive Sales Analytics & Account Expansion",
      badge: "Growth Dominance",
      friction: "Conversion sequences are stable but rely on standard lead cadences rather than predictive behavior models, missing opportunities for expansion within key accounts.",
      intervention: "Implement predictive account scoring and dynamic customer retention workflows to maximize client lifetime value and automated referral generation.",
      deployment: "We integrate enterprise revenue intelligence platforms and configure specialized account growth programs to aggressively expand high-yield revenue streams."
    },
    {
      num: 3,
      title: "Deploy Forward-Looking Capital Allocation Models",
      badge: "Capital Efficiency",
      friction: "Capital allocation models remain protective rather than aggressive, missing high-yield investment opportunities and regional market expansion pathways.",
      intervention: "Design forward-looking cash flow forecast tools to model multi-scenario expansion pathways, pricing adjustments, and strategic acquisition models.",
      deployment: "Our financial advisory team structures capital deployment blueprints, tax-efficient investment frameworks, and external funding strategies for rapid market expansion."
    },
    {
      num: 4,
      title: "Align Autonomous Leadership & Executive Incentive Schemes",
      badge: "Enterprise Valuation",
      friction: "Middle-management operates autonomously but lacks equity-aligned strategic incentives to drive aggressive enterprise valuation growth.",
      intervention: "Align leadership compensation directly with long-term company valuation targets and execute quarterly strategic expansion sprints.",
      deployment: "We structure performance-based partner bonus plans, long-term incentive frameworks, and facilitate quarterly strategic planning cycles."
    },
    {
      num: 5,
      title: "Architect Next-Gen AI Automation & API Infrastructure",
      badge: "AI Infrastructure",
      friction: "Core operations use standard software models rather than customized AI agent automations, leaving potential efficiency gains untapped.",
      intervention: "Deploy custom AI workflows and automated decision models across sales outreach, customer onboarding, and operational reporting.",
      deployment: "Our technology team architects custom AI agent pipelines and integrates proprietary LLM automation nodes directly into your operations stack."
    }
  ];

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
      {/* SECTION A: EXECUTIVE OBSERVATION & MACRO DIAGNOSIS  */}
      {/* ---------------------------------------------------- */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-amber-600" />
            <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider">
              Section A: Executive Observation & Macro Diagnosis
            </h3>
          </div>
          <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ${
            isLowScore ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
          }`}>
            {isLowScore ? 'Immediate Turnaround Required' : 'Elite Scaling Architecture'}
          </span>
        </div>

        {isLowScore ? (
          <div className="space-y-4 text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
            <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-2">
              <h4 className="font-bold text-slate-900 flex items-center gap-2 text-xs uppercase tracking-wide">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                Structural Systemic Volatility
              </h4>
              <p>
                An analytical review of <strong>{compName}</strong> operating within the <strong>{industry}</strong> vertical indicates that your organization has hit a structural scaling ceiling. While your market position allows you to cross revenue targets in the <strong>{revenue}</strong> bracket, your operational foundation relies almost exclusively on manual execution. The lack of standard automation frameworks means that scaling up will directly increase operational friction, leading to severe profit margin leakage and high staff burnout.
              </p>
            </div>

            <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-2">
              <h4 className="font-bold text-slate-900 flex items-center gap-2 text-xs uppercase tracking-wide">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                The Owner-Dependency Barrier
              </h4>
              <p>
                Your assessment answers reveal a critical operational dependency on the founder layer. Because daily validation, strategic planning, and performance management require your constant personal oversight, your team is restricted to running routine tasks. This lack of decentralization caps your ultimate enterprise valuation, as a company dependent on its owner cannot be easily scaled, sold, or institutionalized.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
            <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-2">
              <h4 className="font-bold text-slate-900 flex items-center gap-2 text-xs uppercase tracking-wide">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                Enterprise Maturity Evaluation
              </h4>
              <p>
                <strong>{compName}</strong> displays an elite operational framework, placing it in the top tier of maturity models for the <strong>{industry}</strong> sector. By decoupling core day-to-day functions from manual founder oversight, you have cleared the initial growth bottlenecks that stall most MSMEs. Your business systems show solid baseline efficiency and consistent delivery parameters.
              </p>
            </div>

            <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-2">
              <h4 className="font-bold text-slate-900 flex items-center gap-2 text-xs uppercase tracking-wide">
                <TrendingUp className="w-4 h-4 text-indigo-600 shrink-0" />
                Strategic Capital Allocation Matrix
              </h4>
              <p>
                The objective for your enterprise must shift from protective management to aggressive market dominance. With an established core framework, you are prime to utilize your internal stability to deploy high-yield automation models, acquire market share from lower-tier competitors, and execute structured expansions into new regional verticals.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ---------------------------------------------------- */}
      {/* SECTION B: TOP 5 STRATEGIC TECHNICAL RECOMMENDATIONS  */}
      {/* ---------------------------------------------------- */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-amber-600" />
            <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider">
              Section B: Top 5 Strategic Technical Recommendations
            </h3>
          </div>
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Three-Layer Consulting Grid</span>
        </div>

        <div className="space-y-4">
          {recommendations.map((rec) => (
            <div 
              key={rec.num}
              className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-5 space-y-3.5 hover:border-amber-400/60 transition-all shadow-2xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 pb-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-amber-400 text-xs font-black flex items-center justify-center shrink-0">
                    {rec.num}
                  </span>
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wide">
                    {rec.title}
                  </h4>
                </div>
                <span className="text-[10px] font-bold text-amber-800 bg-amber-100/80 border border-amber-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {rec.badge}
                </span>
              </div>

              {/* Three-Layer Narrative Container */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5 text-xs">
                {/* 1. The Friction Point */}
                <div className="p-3.5 bg-rose-50/60 border border-rose-200/80 rounded-xl space-y-1.5">
                  <span className="text-[10px] font-black text-rose-800 uppercase tracking-wider block">
                    1. The Friction Point
                  </span>
                  <p className="text-slate-700 font-medium leading-relaxed">
                    {rec.friction}
                  </p>
                </div>

                {/* 2. The Strategic Intervention */}
                <div className="p-3.5 bg-amber-50/60 border border-amber-200/80 rounded-xl space-y-1.5">
                  <span className="text-[10px] font-black text-amber-800 uppercase tracking-wider block">
                    2. The Strategic Intervention
                  </span>
                  <p className="text-slate-700 font-medium leading-relaxed">
                    {rec.intervention}
                  </p>
                </div>

                {/* 3. KRG ONE Partner Deployment */}
                <div className="p-3.5 bg-emerald-50/60 border border-emerald-200/80 rounded-xl space-y-1.5">
                  <span className="text-[10px] font-black text-emerald-800 uppercase tracking-wider block">
                    3. KRG ONE Partner Deployment
                  </span>
                  <p className="text-slate-700 font-medium leading-relaxed">
                    {rec.deployment}
                  </p>
                </div>
              </div>
            </div>
          ))}
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
                <Building2 className="w-4 h-4" />
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
                <Building2 className="w-4 h-4 text-amber-500" />
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
