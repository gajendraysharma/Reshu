import React from 'react';
import { Cpu, Sparkles, Coins, Info, Download, PhoneCall, ChevronRight } from 'lucide-react';

interface ExecutiveAdvisoryTabProps {
  formData: Record<string, any>;
  globalScore: number;
  pillarScores: number[];
  lowestPillar: { name: string; score: number };
  handlePrintPDF: () => void;
  setActiveTab: (tab: string) => void;
  isGeneratingPDF?: boolean;
  pdfStatusMessage?: string;
}

const PILLARS = [
  "Leadership & Vision",
  "Sales & Revenue",
  "Marketing & Customer Growth",
  "Operations & Process",
  "Finance & Business Performance",
  "People & Leadership",
  "Technology & Business Innovation"
];

export const ExecutiveAdvisoryTab: React.FC<ExecutiveAdvisoryTabProps> = ({
  formData = {},
  globalScore = 70,
  pillarScores = [],
  lowestPillar = { name: 'Operations & Process', score: 58 },
  handlePrintPDF,
  setActiveTab,
  isGeneratingPDF = false,
  pdfStatusMessage = '',
}) => {
  const compName = formData?.companyName || 'ABC Manufacturing Pvt. Ltd.';
  const ownerName = formData?.fullName || 'Gajendra Kumar Sharma';
  const industryType = formData?.industry || 'Manufacturing';
  const revenueTier = formData?.revenue || '₹ 5 – 20 Cr';
  const employeeCount = formData?.employees || '50 – 100';
  const selectedChallenges = formData?.challenges && formData.challenges.length > 0 
    ? formData.challenges 
    : ['High Operational Costs', 'Manual Dependency', 'Inconsistent Lead Generation'];
  const primaryChallenge = selectedChallenges.join(', ');
  const businessGoals = formData?.goals && formData.goals.length > 0 
    ? formData.goals.join(', ') 
    : 'Increase Profit Margins & Scale Operations';

  // Find highest scoring pillar
  let highestIndex = 0;
  let highestScore = -1;
  pillarScores.forEach((score, idx) => {
    if (score > highestScore) {
      highestScore = score;
      highestIndex = idx;
    }
  });
  const highestPillar = {
    name: PILLARS[highestIndex] || 'Finance & Business Performance',
    score: highestScore > -1 ? highestScore : 80
  };

  const aiConfidenceScore = globalScore >= 80 ? 96 : globalScore >= 60 ? 94 : 91;

  // Multi-Paragraph Macro Diagnosis Analysis
  const renderMacroDiagnosis = () => {
    if (globalScore < 70) {
      return (
        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium bg-amber-50/50 p-5 rounded-2xl border border-amber-200/80">
          <p>
            <strong className="text-amber-950 font-black uppercase tracking-wide block mb-1">
              Structural Systemic Volatility:
            </strong>
            An analytical review of <strong>{compName}</strong> operating within the <strong>{industryType}</strong> vertical indicates that your organization has hit a structural scaling ceiling. While your market position allows you to cross revenue targets in the <strong>{revenueTier}</strong> bracket, your operational foundation relies almost exclusively on manual execution. The lack of standard automation frameworks means that scaling up will directly increase operational friction, leading to severe profit margin leakage and high staff burnout.
          </p>
          <p>
            <strong className="text-amber-950 font-black uppercase tracking-wide block mb-1">
              The Owner-Dependency Barrier:
            </strong>
            Your assessment answers reveal a critical operational dependency on the founder layer under <strong>{ownerName}</strong>'s oversight. Because daily validation, strategic planning, and performance management require your constant personal oversight, your team is restricted to running routine tasks. This lack of decentralization caps your ultimate enterprise valuation, as a company dependent on its owner cannot be easily scaled, sold, or institutionalized. Primary friction points in <strong>{lowestPillar?.name ?? 'Operations'}</strong> ({lowestPillar?.score ?? 0}%) must be systematically resolved.
          </p>
        </div>
      );
    } else if (globalScore >= 85) {
      return (
        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium bg-emerald-50/50 p-5 rounded-2xl border border-emerald-200/80">
          <p>
            <strong className="text-emerald-950 font-black uppercase tracking-wide block mb-1">
              Enterprise Maturity Evaluation:
            </strong>
            <strong>{compName}</strong> displays an elite operational framework, placing it in the top tier of maturity models for the <strong>{industryType}</strong> sector with a score of <strong>{globalScore}%</strong>. By decoupling core day-to-day functions from manual founder oversight, you have cleared the initial growth bottlenecks that stall most MSMEs. Your business systems show solid baseline efficiency and consistent delivery parameters across {employeeCount} team members.
          </p>
          <p>
            <strong className="text-emerald-950 font-black uppercase tracking-wide block mb-1">
              Strategic Capital Allocation Matrix:
            </strong>
            The objective for your enterprise must shift from protective management to aggressive market dominance. With an established core framework in <strong>{highestPillar?.name ?? 'Leadership'}</strong> ({highestPillar?.score ?? 0}%), you are prime to utilize your internal stability to deploy high-yield automation models, acquire market share from lower-tier competitors, and execute structured expansions into new regional verticals toward your goal of <em>"{businessGoals}"</em>.
          </p>
        </div>
      );
    } else {
      return (
        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium bg-indigo-50/50 p-5 rounded-2xl border border-indigo-200/80">
          <p>
            <strong className="text-indigo-950 font-black uppercase tracking-wide block mb-1">
              Mid-Tier Operational Transition:
            </strong>
            An analytical review of <strong>{compName}</strong> operating within the <strong>{industryType}</strong> vertical indicates a solid operational baseline of <strong>{globalScore}%</strong> that is beginning to show stress under higher volume. While generating consistent revenue in the <strong>{revenueTier}</strong> bracket, your core processes remain partially dependent on manual execution and key-person knowledge in <strong>{lowestPillar?.name ?? 'Operations'}</strong> ({lowestPillar?.score ?? 0}%).
          </p>
          <p>
            <strong className="text-indigo-950 font-black uppercase tracking-wide block mb-1">
              Systemization & Scaling Roadmap:
            </strong>
            To transition from mid-tier stability to elite market leadership, <strong>{compName}</strong> must codify its operational workflows, establish automated pipeline conversion systems, and transition to objective KPI-based governance under <strong>{ownerName}</strong>'s leadership to address key bottlenecks ({primaryChallenge}).
          </p>
        </div>
      );
    }
  };

  // 5 Detailed Technical Recommendations with 3-Layer Narrative Containers
  const topRecommendations = [
    {
      id: "rec-1",
      number: "Recommendation #1",
      title: "Develop Core Standard Operating Procedures (SOPs)",
      pillar: "Operations & Process",
      frictionPoint: `Your business functions rely on tribal employee memory rather than clear documented systems, leading to high processing errors, unpredictable client delivery quality, and extended onboarding timelines for new hires at ${compName}.`,
      intervention: "Document a unified digital blueprint for your absolute highest-leverage processes across sales, operations, and finance. Map out visual step-by-step swimlane diagrams and set explicit processing speed rules for every department.",
      deployment: "KRG ONE Partner Deployment: We deploy senior systems consultants directly into your firm to audit your workflows, write your custom operational playbooks, and build an interactive digital wiki database. This secures execution quality and helps insulate your profit margins.",
      urgency: "Immediate Turnaround",
      urgencyColor: "bg-rose-500/10 text-rose-700 border-rose-200"
    },
    {
      id: "rec-2",
      number: "Recommendation #2",
      title: "Automated Pipeline & CRM Conversion Architecture",
      pillar: "Sales & Revenue",
      frictionPoint: `Inconsistent lead qualification and manual follow-up sequences in the ${industryType} market cause prime sales prospects to drop off, increasing customer acquisition costs and reducing lifetime value in the ${revenueTier} tier.`,
      intervention: "Deploy an automated CRM pipeline that nurtures incoming inquiries, routes high-value leads automatically, and sends instant automated follow-up sequences across WhatsApp, Email, and SMS.",
      deployment: "KRG ONE Partner Deployment: Our engineering team builds and integrates custom sales pipelines with automated multi-channel follow-ups, giving your sales team real-time conversion dashboards and preventing lead leakage.",
      urgency: "High Revenue Leverage",
      urgencyColor: "bg-amber-500/10 text-amber-700 border-amber-200"
    },
    {
      id: "rec-3",
      number: "Recommendation #3",
      title: "EOD KPI Cockpit & Executive Founder Decoupling",
      pillar: "Leadership & Governance",
      frictionPoint: `Executive validation required for routine operations binds ${ownerName}'s focus to daily troubleshooting instead of high-value strategic growth initiatives, capping overall enterprise valuation.`,
      intervention: "Transition middle management to a standardized End-of-Day (EOD) KPI reporting cockpit, shifting performance evaluation to objective daily output metrics and formal delegation boundaries.",
      deployment: "KRG ONE Partner Deployment: We configure an automated executive dashboard and train department leads to run weekly accountability huddles without requiring continuous founder oversight.",
      urgency: "Core Scalability",
      urgencyColor: "bg-indigo-500/10 text-indigo-700 border-indigo-200"
    },
    {
      id: "rec-4",
      number: "Recommendation #4",
      title: "Dynamic Cash Flow & Unit Margin Analytics Engine",
      pillar: "Finance & Business Health",
      frictionPoint: "Trailing financial reports and unmonitored overhead creep trap working capital, creating artificial funding bottlenecks that restrict capital deployment for expansion.",
      intervention: "Establish a rolling 13-week cash flow forecasting model integrated with weekly accounts receivable aging triggers and product-line unit margin audits.",
      deployment: "KRG ONE Partner Deployment: We institute automated financial reporting templates and conduct quarterly margin audits to optimize working capital and maximize net cash retention.",
      urgency: "Capital Protection",
      urgencyColor: "bg-emerald-500/10 text-emerald-700 border-emerald-200"
    },
    {
      id: "rec-5",
      number: "Recommendation #5",
      title: "Integrated Digital Software Stack & API Automation",
      pillar: "Digital & Technology",
      frictionPoint: "Disconnected software tools force redundant double-entry of customer data, draining employee productivity and introducing data transcription errors across operations.",
      intervention: "Consolidate core operational databases into a single source of truth using secure API integrations and automated intake workflows.",
      deployment: "KRG ONE Partner Deployment: Our tech architecture team audits your software tools, eliminates redundant subscriptions, and connects your data pipelines to automate routine administrative tasks.",
      urgency: "Efficiency Multiplier",
      urgencyColor: "bg-purple-500/10 text-purple-700 border-purple-200"
    }
  ];

  // Section 3: Expected Business Impact
  const impactKPIs = [
    {
      label: "Revenue Growth Velocity",
      value: globalScore < 70 ? "▲ +18% to +35%" : "▲ +10% to +18%",
      subtext: "Pipeline Conversion Lift"
    },
    {
      label: "Profit Margin Retained",
      value: globalScore < 70 ? "▲ +12% Margin" : "▲ +8% Margin",
      subtext: "Cost Leakage Sealed"
    },
    {
      label: "Owner Hours Decoupled",
      value: globalScore < 70 ? "▼ -35% Overhead" : "▼ -20% Overhead",
      subtext: "Founder Freedom Gained"
    },
    {
      label: "Operational Throughput",
      value: globalScore < 70 ? "▲ +27% Capacity" : "▲ +18% Capacity",
      subtext: "Workflow Speed Gain"
    }
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* PAGE TITLE BAR */}
      <div className="bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white rounded-2xl p-6 border border-slate-800 shadow-md relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest bg-amber-400 text-slate-950 font-mono">
              EXECUTIVE ADVISORY DOSSIER
            </span>
            <span className="text-[10px] font-bold text-slate-400 font-mono">KRG ONE AI Architecture v4.2</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white flex items-center gap-2">
            <Cpu className="w-6 h-6 text-amber-400" />
            AI GROWTH ADVISORY™
          </h2>
          <p className="text-xs text-slate-300 font-medium">
            Strategic Enterprise Blueprint for {compName}
          </p>
        </div>
        <div className="relative z-10 flex items-center gap-3">
          <div className="bg-slate-800/80 border border-slate-700/80 px-3.5 py-2 rounded-xl text-right">
            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block">AI Model Confidence</span>
            <span className="text-lg font-black text-amber-400 font-mono">{aiConfidenceScore}%</span>
          </div>
        </div>
      </div>

      {/* SECTION 1: MACRO DIAGNOSIS (MULTI-PARAGRAPH ANALYSIS) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></div>
            <h3 className="text-xs font-black text-slate-950 uppercase tracking-widest">
              Executive Observation & Macro Diagnosis
            </h3>
          </div>
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase bg-slate-100 px-2.5 py-1 rounded-md">
            Sector: {industryType}
          </span>
        </div>

        {/* Multi-paragraph rendered diagnosis */}
        {renderMacroDiagnosis()}
      </div>

      {/* SECTION 2: TOP 5 STRATEGIC TECHNICAL RECOMMENDATIONS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h3 className="text-xs font-black text-slate-950 uppercase tracking-widest">
              Top 5 Strategic Technical Recommendations
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Deep Problem-Solution-Support Architecture</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {topRecommendations.map((item) => (
            <div key={item.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:border-slate-300 transition-all space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 font-mono">
                    {item.number}
                  </span>
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">
                    {item.title}
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-slate-400 font-bold">Pillar: {item.pillar}</span>
                  <span className={`text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded border font-mono ${item.urgencyColor}`}>
                    {item.urgency}
                  </span>
                </div>
              </div>

              {/* 3-Layer Narrative Container */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 text-xs">
                {/* Layer 1: Friction Point */}
                <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-100 space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-rose-800 block">
                    The Friction Point
                  </span>
                  <p className="text-slate-700 font-medium leading-relaxed">
                    {item.frictionPoint}
                  </p>
                </div>

                {/* Layer 2: Strategic Intervention */}
                <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-indigo-800 block">
                    The Strategic Intervention
                  </span>
                  <p className="text-slate-700 font-medium leading-relaxed">
                    {item.intervention}
                  </p>
                </div>

                {/* Layer 3: KRG ONE Partner Deployment */}
                <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block">
                    KRG ONE Partner Deployment
                  </span>
                  <p className="text-slate-200 font-medium leading-relaxed">
                    {item.deployment}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: EXPECTED BUSINESS IMPACT */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Coins className="w-4 h-4 text-emerald-600" />
          <h3 className="text-xs font-black text-slate-950 uppercase tracking-widest">
            Targeted Enterprise Financial & Operational Lift
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {impactKPIs.map((kpi, idx) => (
            <div key={idx} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm text-center space-y-1">
              <span className="text-[9px] font-mono font-black text-slate-400 uppercase tracking-wider block">
                {kpi.label}
              </span>
              <span className="text-xl sm:text-2xl font-black text-emerald-700 block font-mono">
                {kpi.value}
              </span>
              <span className="text-[9.5px] text-slate-500 font-bold block">
                {kpi.subtext}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 4: ACTION CTA BUTTONS */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-black text-slate-950 uppercase tracking-tight">
            Ready to Deploy Your Growth Architecture?
          </h4>
          <p className="text-xs text-slate-500 font-medium">
            Download the comprehensive PDF dossier or schedule an executive strategy session with senior systems partners.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handlePrintPDF}
            disabled={isGeneratingPDF}
            className="flex-1 sm:flex-none px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {isGeneratingPDF ? (
              <>
                <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
                <span>{pdfStatusMessage || 'Generating Dossier...'}</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-amber-400" />
                <span>Download Advisory Dossier</span>
              </>
            )}
          </button>
          <button
            onClick={() => setActiveTab('booking')}
            className="flex-1 sm:flex-none px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Book Strategy Session</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveAdvisoryTab;
