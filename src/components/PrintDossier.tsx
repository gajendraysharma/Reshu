import React from 'react';
import {
  CheckCircle2, AlertTriangle, Check
} from 'lucide-react';

export default function PrintDossier({
  formData = {},
  scores = [],
  globalScore = 78,
  pillarScores = [],
  reportId = 'KRG-98421-B',
  assessmentDate = ''
}: {
  formData?: any;
  scores?: number[];
  globalScore?: number;
  pillarScores?: number[];
  reportId?: string;
  assessmentDate?: string;
}) {
  const companyName = formData.companyName || 'ABC Pvt. Ltd.';
  const ownerName = formData.fullName || formData.ownerName || 'Mr. John Doe';
  const industry = formData.industry || 'Manufacturing';
  const revenue = formData.revenue || '₹3.2 Cr';
  const employees = formData.employees || '32';
  const businessAge = formData.businessAge || '6 Years';
  const targetMarket = formData.targetMarket || 'B2B';
  const businessModel = formData.businessModel || 'Product + Services';
  const geography = formData.geography || 'Rajasthan, India';
  const formattedDate = assessmentDate || new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const docReportId = reportId || 'KRG-98421-B';

  const pillarList = [
    { name: 'Leadership & Vision', defaultScore: 76, benchmark: 62, top10: 88, priority: 'High', timeline: '0-30 Days' },
    { name: 'Sales', defaultScore: 72, benchmark: 58, top10: 86, priority: 'High', timeline: '0-30 Days' },
    { name: 'Marketing', defaultScore: 64, benchmark: 55, top10: 83, priority: 'High', timeline: '0-60 Days' },
    { name: 'Operations', defaultScore: 70, benchmark: 60, top10: 85, priority: 'High', timeline: '0-60 Days' },
    { name: 'Finance', defaultScore: 74, benchmark: 61, top10: 87, priority: 'Medium', timeline: '30-60 Days' },
    { name: 'Technology', defaultScore: 62, benchmark: 52, top10: 81, priority: 'Medium', timeline: '30-90 Days' },
    { name: 'People', defaultScore: 69, benchmark: 52, top10: 88, priority: 'Medium', timeline: '30-60 Days' },
  ];

  const pillars = pillarList.map((p, idx) => {
    const score = (pillarScores && pillarScores[idx] !== undefined && pillarScores[idx] > 0) ? pillarScores[idx] : p.defaultScore;
    return { ...p, score };
  });

  const getPageTitle = (page: number) => {
    const titles: Record<number, string> = {
      2: "Executive Summary",
      3: "Company Snapshot",
      4: "Overall Business Health",
      5: "Pillar 1: Leadership & Vision",
      6: "Pillar 2: Sales",
      7: "Pillar 3: Marketing",
      8: "Pillar 4: Operations",
      9: "Pillar 5: Finance",
      10: "Pillar 6: Technology",
      11: "Pillar 7: People",
      12: "Cross-Pillar Insights",
      13: "Revenue Opportunity Analysis",
      14: "Industry Benchmark",
      15: "Business Risk Assessment",
      16: "90-Day Growth Roadmap",
      17: "Priority Action Matrix",
      18: "AI Strategic Advisory",
      19: "KPI Dashboard",
      20: "Final Recommendation & Next Engagement"
    };
    return titles[page] || "Business Growth Diagnostic™ Report";
  };

  const Header = ({ page }: { page: number }) => (
    <div className="flex justify-between items-center border-b-2 border-[#D4AF37] pb-2 mb-3 shrink-0">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-md bg-[#0A1128] border border-[#D4AF37] flex items-center justify-center font-black text-[#D4AF37] text-[10px] shadow-xs">
          KRG
        </div>
        <div>
          <h1 className="text-sm font-serif font-black text-[#0A1128] tracking-tight leading-none">
            KRG <span className="text-[#D4AF37]">ONE</span>
          </h1>
          <p className="text-[7.5px] uppercase tracking-widest text-slate-500 font-extrabold">
            Business Growth Consulting
          </p>
        </div>
      </div>
      <div className="text-right">
        <h2 className="text-[11px] font-bold text-[#0A1128] uppercase tracking-wider">{getPageTitle(page)}</h2>
        <p className="text-[7.5px] text-slate-400 font-mono">Business Growth Diagnostic™ Report</p>
      </div>
    </div>
  );

  const Footer = ({ page }: { page: number }) => (
    <div className="flex justify-between items-center border-t border-slate-200 pt-2 mt-auto shrink-0 text-[8px] text-slate-400 font-mono">
      <div>
        <span className="font-bold text-[#0A1128]">CONFIDENTIAL</span> &bull; KRG ONE Business Growth Operating System™
      </div>
      <div className="flex items-center gap-2">
        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold">Page {page} of 20</span>
      </div>
    </div>
  );

  const Page = ({ children, pageNumber }: { children: React.ReactNode, pageNumber: number }) => (
    <div
      className="print-page w-[210mm] h-[297mm] min-h-[297mm] max-h-[297mm] bg-white p-6 relative overflow-hidden break-after-page flex flex-col justify-between box-border mx-auto"
      style={{ pageBreakAfter: 'always', breakAfter: 'page' }}
    >
      {pageNumber > 1 && <Header page={pageNumber} />}
      <div className="flex-1 flex flex-col justify-between overflow-hidden my-auto py-1">
        {children}
      </div>
      {pageNumber > 1 && <Footer page={pageNumber} />}
    </div>
  );

  const renderPillarPage = (pillarIndex: number, pageNumber: number) => {
    const pillar = pillars[pillarIndex];
    const pName = pillar.name;
    const pScore = pillar.score;
    const benchmark = pillar.benchmark;
    const top10 = pillar.top10;

    const situationalText: Record<number, string> = {
      0: "Clear vision and strong leadership drive business direction, but systemization and delegation frameworks require immediate structure.",
      1: "Good sales team with strong relationships, but sales processes are not fully standardized, leading to conversion leaks.",
      2: "Low digital presence and reliance on referrals make lead acquisition unpredictable across quarter cycles.",
      3: "Operations are functional but not fully standardized or documented, causing delivery bottlenecks during volume surges.",
      4: "Basic financial controls in place with stable gross margins, but cash flow forecasting and budgeting require higher visibility.",
      5: "Limited use of modern automation tools; software systems are disconnected and rely heavily on manual entry.",
      6: "Good team stability and culture, but capability building, performance management, and role clarity need formal frameworks."
    };

    const strengthsList: Record<number, string[]> = {
      0: ["Strong Leadership Vision & Direction", "Founder Commitment & Drive"],
      1: ["Strong Existing Client Relationships", "High Product Trust & Repeat Inquiries"],
      2: ["Strong Word-of-Mouth Brand Reputation", "Existing Loyal Customer Base"],
      3: ["High Product Quality & Delivery Integrity", "Timely Order Execution"],
      4: ["Strict Cost Control Mechanics", "Profitable Base Operations"],
      5: ["Basic Functional Systems in Place", "Receptive to Digital Tools"],
      6: ["Loyal & Experienced Core Staff", "Low Employee Attrition"]
    };

    const weaknessesList: Record<number, string[]> = {
      0: ["High Founder Oversight Dependency", "Limited Delegation Infrastructure"],
      1: ["Inconsistent Sales Follow-up Process", "Low CRM Adoption & Pipeline Tracking"],
      2: ["Underdeveloped Digital Lead Generation", "Lack of Structured Marketing Strategy"],
      3: ["Unwritten SOPs & Process Knowledge", "Capacity Planning Bottlenecks"],
      4: ["Informal Financial Reporting", "Irregular Cash Flow Forecasting"],
      5: ["Manual Data Entry Between Systems", "Lack of Automated Workflows"],
      6: ["Informal Performance Management", "Lack of Structured Training Frameworks"]
    };

    const businessImpact: Record<number, string> = {
      0: "Limits decision speed and restricts growth to personal founder bandwidth.",
      1: "Leads not converted efficiently, resulting in lost revenue opportunities.",
      2: "Restricts business expansion and makes revenue growth unpredictable.",
      3: "Inconsistent delivery timelines and operational scaling friction.",
      4: "Restricts cash flow visibility and delays strategic capital allocation.",
      5: "Low team productivity and higher administrative manual effort.",
      6: "Limits overall execution bandwidth and future leadership pipeline."
    };

    const aiObservation: Record<number, string> = {
      0: "Leadership quality is a key strength. Build delegation systems to scale.",
      1: "Standardize the sales process and adopt CRM tracking to boost conversion.",
      2: "Invest in digital presence and inbound lead engines for steady pipelines.",
      3: "Document core SOPs and improve workflow planning systems.",
      4: "Implement formal financial reporting and rolling cash flow forecasts.",
      5: "Adopt modern cloud tools and workflow automation to boost speed.",
      6: "Build clear performance metrics and invest in continuous training."
    };

    return (
      <Page pageNumber={pageNumber}>
        <div className="space-y-3.5">
          <div className="bg-[#0A1128] text-white rounded-xl p-4 flex justify-between items-center border border-[#D4AF37]/40">
            <div>
              <span className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest">{pName} Assessment</span>
              <div className="text-3xl font-black text-[#D4AF37] mt-0.5">{pScore} <span className="text-xs font-normal text-slate-300">/ 100</span></div>
            </div>
            <div className="text-right space-y-1">
              <span className="text-[10px] text-slate-300 block">Industry Avg: <strong className="text-white">{benchmark}%</strong></span>
              <span className="text-[10px] text-[#D4AF37] block font-bold">Top 10%: {top10}%</span>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1">
            <h3 className="text-xs font-bold text-[#0A1128] uppercase tracking-wider">Current Situation Analysis</h3>
            <p className="text-xs text-slate-700 leading-relaxed">{situationalText[pillarIndex] || "Systems functional but require documentation."}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3.5">
              <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> Core Strengths
              </h4>
              <ul className="text-xs text-slate-700 space-y-1 font-medium">
                {(strengthsList[pillarIndex] || ["Strong Foundation", "Quality Focus"]).map((st, i) => (
                  <li key={i} className="flex items-center gap-1.5">&bull; {st}</li>
                ))}
              </ul>
            </div>

            <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-3.5">
              <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wider mb-2 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" /> Key Weaknesses
              </h4>
              <ul className="text-xs text-slate-700 space-y-1 font-medium">
                {(weaknessesList[pillarIndex] || ["Lack of SOPs", "Manual Friction"]).map((wk, i) => (
                  <li key={i} className="flex items-center gap-1.5">&bull; {wk}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white border border-slate-200 rounded-xl p-3.5">
              <h4 className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Business Impact</h4>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">{businessImpact[pillarIndex]}</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-3.5">
              <h4 className="text-[10px] uppercase font-bold text-slate-400 block mb-1">AI Strategic Advisory</h4>
              <p className="text-xs text-[#0A1128] font-semibold leading-relaxed">{aiObservation[pillarIndex]}</p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex justify-between items-center text-xs">
            <div>
              <span className="text-slate-400 font-bold uppercase text-[9px] block">Strategic Priority</span>
              <span className="font-bold text-rose-600 uppercase">{pillar.priority} Priority</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold uppercase text-[9px] block">Execution Timeline</span>
              <span className="font-bold text-[#0A1128]">{pillar.timeline}</span>
            </div>
          </div>
        </div>
      </Page>
    );
  };

  return (
    <div id="krg-print-dossier-root" className="hidden print:block print-dossier-root w-full bg-white text-slate-900 font-sans">
      {/* Page 1: Cover Page */}
      <Page pageNumber={1}>
        <div className="flex flex-col justify-between h-full border-4 border-[#0A1128] p-7 relative bg-white">
          <div className="flex justify-between items-start border-b border-slate-200 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0A1128] border border-[#D4AF37] flex items-center justify-center font-black text-[#D4AF37] text-sm shadow-md">
                KRG
              </div>
              <div>
                <h1 className="text-2xl font-serif font-black text-[#0A1128] tracking-tight">
                  KRG <span className="text-[#D4AF37]">ONE</span>
                </h1>
                <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500 font-extrabold">
                  Business Growth Consulting
                </p>
              </div>
            </div>
            <span className="bg-[#0A1128] text-[#D4AF37] text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded border border-[#D4AF37]/30">
              Confidential Report
            </span>
          </div>

          <div className="my-auto py-6 text-center space-y-6">
            <div className="inline-block bg-[#0A1128] text-white px-8 py-6 rounded-2xl border-2 border-[#D4AF37] shadow-xl w-full max-w-lg mx-auto">
              <h2 className="text-2xl font-black text-[#D4AF37] uppercase tracking-wider mb-2 font-sans">
                Business Growth Diagnostic™ Report
              </h2>
              <p className="text-xs text-slate-300 font-medium tracking-wide">
                Professional PDF Report & Operational Assessment
              </p>
            </div>

            <div className="max-w-md mx-auto bg-slate-50 border border-slate-200 rounded-xl p-5 text-left space-y-3 shadow-xs">
              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Organization</span>
                <span className="text-sm font-black text-[#0A1128]">{companyName}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Industry Sector</span>
                <span className="text-sm font-bold text-[#0A1128]">{industry}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Assessment Date</span>
                <span className="text-sm font-bold text-[#0A1128]">{formattedDate}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Prepared For</span>
                <span className="text-sm font-bold text-[#0A1128]">{ownerName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500 uppercase">Report Identifier</span>
                <span className="text-xs font-mono font-bold text-slate-600">{docReportId}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-3 flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-wider">
            <span>Business Growth Operating System™</span>
            <span className="text-[#0A1128] font-black">KRG ONE &bull; Jaipur, India</span>
          </div>
        </div>
      </Page>

      {/* Page 2: Executive Summary */}
      <Page pageNumber={2}>
        <div className="space-y-4">
          <div className="grid grid-cols-12 gap-3 items-stretch">
            <div className="col-span-4 bg-[#0A1128] text-white rounded-xl p-4 border border-[#D4AF37]/40 flex flex-col items-center justify-center text-center shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300 mb-1">Business Health Score</span>
              <div className="text-5xl font-black text-[#D4AF37] my-1">{globalScore}<span className="text-xl text-slate-400 font-normal">/100</span></div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase mt-1">
                {globalScore >= 75 ? 'Growth Ready' : globalScore >= 60 ? 'Scaling Ready' : 'Turnaround Needed'}
              </span>
            </div>

            <div className="col-span-8 grid grid-cols-3 gap-2.5">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col justify-center">
                <span className="text-[9px] uppercase font-bold text-slate-400 block mb-1">Revenue Opportunity</span>
                <span className="text-base font-black text-[#0A1128]">₹2.4 Cr</span>
                <span className="text-[8.5px] text-emerald-600 font-semibold mt-0.5">12-18 Mo Potential</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col justify-center">
                <span className="text-[9px] uppercase font-bold text-slate-400 block mb-1">Growth Potential</span>
                <span className="text-base font-black text-emerald-600">High</span>
                <span className="text-[8.5px] text-slate-500 font-medium mt-0.5">Strong Demand</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col justify-center">
                <span className="text-[9px] uppercase font-bold text-slate-400 block mb-1">Risk Level</span>
                <span className="text-base font-black text-amber-600">Medium</span>
                <span className="text-[8.5px] text-slate-500 font-medium mt-0.5">Manageable</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3.5">
              <h3 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Top 3 Strengths
              </h3>
              <ul className="text-xs text-slate-700 space-y-1.5 font-medium">
                <li className="flex items-center gap-1.5">&bull; Strong Revenue Growth Track Record</li>
                <li className="flex items-center gap-1.5">&bull; High Customer Retention & Trust</li>
                <li className="flex items-center gap-1.5">&bull; Superior Product & Service Quality</li>
              </ul>
            </div>

            <div className="bg-rose-50/70 border border-rose-200/80 rounded-xl p-3.5">
              <h3 className="text-xs font-bold text-rose-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600" /> Top 3 Risks
              </h3>
              <ul className="text-xs text-slate-700 space-y-1.5 font-medium">
                <li className="flex items-center gap-1.5">&bull; Sales Conversion Bottlenecks</li>
                <li className="flex items-center gap-1.5">&bull; Founder Operational Dependency</li>
                <li className="flex items-center gap-1.5">&bull; Underutilized Digital Marketing Engine</li>
              </ul>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1.5">
            <h3 className="text-xs font-bold text-[#0A1128] uppercase tracking-wider">Overall Strategic Opinion</h3>
            <p className="text-xs text-slate-700 leading-relaxed font-normal">
              <strong>{companyName}</strong> shows strong growth momentum with significant opportunities to improve systems and scale profitably. Operating in the <strong>{industry}</strong> vertical, your baseline quality and market trust position you well for national expansion.
            </p>
            <p className="text-xs text-slate-700 leading-relaxed font-normal">
              However, operational dependencies on key individuals create friction that caps scaling throughput. By implementing standardized SOPs and an automated sales pipeline, you can decouple growth from personal bandwidth.
            </p>
          </div>

          <div className="bg-[#0A1128] text-white rounded-xl p-3.5 border border-[#D4AF37]/50 flex items-center justify-between">
            <div>
              <span className="text-[9px] text-[#D4AF37] font-bold uppercase tracking-widest block">Immediate Priority Focus</span>
              <p className="text-xs font-bold text-white mt-0.5">Improve Sales System & Operational Efficiency (Days 1–30 Sprints)</p>
            </div>
            <span className="px-3 py-1 bg-[#D4AF37] text-[#0A1128] text-[10px] font-black uppercase rounded shadow-xs">
              High Priority
            </span>
          </div>
        </div>
      </Page>

      {/* Page 3: Company Snapshot */}
      <Page pageNumber={3}>
        <div className="space-y-4">
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <div className="bg-[#0A1128] text-white px-4 py-2 flex justify-between items-center">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">Organization Snapshot Matrix</h3>
              <span className="text-[10px] text-slate-300 font-mono">Confidential Profile</span>
            </div>
            <div className="p-4 bg-slate-50 grid grid-cols-2 gap-3.5">
              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <span className="text-xs text-slate-500 font-bold">Industry Sector</span>
                <span className="text-xs font-bold text-[#0A1128]">{industry}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <span className="text-xs text-slate-500 font-bold">Annual Revenue</span>
                <span className="text-xs font-bold text-[#0A1128]">{revenue}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <span className="text-xs text-slate-500 font-bold">Total Workforce</span>
                <span className="text-xs font-bold text-[#0A1128]">{employees} Staff Members</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <span className="text-xs text-slate-500 font-bold">Business Operating Age</span>
                <span className="text-xs font-bold text-[#0A1128]">{businessAge}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <span className="text-xs text-slate-500 font-bold">Target Market Segment</span>
                <span className="text-xs font-bold text-[#0A1128]">{targetMarket}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <span className="text-xs text-slate-500 font-bold">Primary Business Model</span>
                <span className="text-xs font-bold text-[#0A1128]">{businessModel}</span>
              </div>
              <div className="flex justify-between items-center col-span-2 pt-0.5">
                <span className="text-xs text-slate-500 font-bold">Geographic Footprint</span>
                <span className="text-xs font-bold text-[#0A1128]">{geography}</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-1.5">
            <h3 className="text-xs font-bold text-[#0A1128] uppercase tracking-wider">Business Context & Operating Profile</h3>
            <p className="text-xs text-slate-700 leading-relaxed font-normal">
              Mid-sized {industry.toLowerCase()} enterprise with strong product demand in regional markets looking to scale nationally. The leadership team demonstrates deep domain expertise, but operational workflows require systematic documentation to support team delegation and higher deal volumes.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <div className="bg-amber-50/60 border border-amber-200/80 rounded-xl p-3.5">
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2">Key Growth Objectives</h4>
              <div className="flex flex-wrap gap-1.5">
                {(formData.goals && formData.goals.length > 0 ? formData.goals : ["Scale Operations", "Increase Market Share", "Automate Workflows"]).map((goal: string, idx: number) => (
                  <span key={idx} className="bg-white text-amber-900 border border-amber-300 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                    {goal}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-rose-50/60 border border-rose-200/80 rounded-xl p-3.5">
              <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wider mb-2">Primary Identified Challenges</h4>
              <div className="flex flex-wrap gap-1.5">
                {(formData.challenges && formData.challenges.length > 0 ? formData.challenges : ["High Operational Costs", "Founder Dependency", "Sales Conversion"]).map((ch: string, idx: number) => (
                  <span key={idx} className="bg-white text-rose-900 border border-rose-300 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                    {ch}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Page>

      {/* Page 4: Overall Business Health */}
      <Page pageNumber={4}>
        <div className="space-y-4">
          <div className="bg-[#0A1128] text-white rounded-xl p-4 flex justify-between items-center border border-[#D4AF37]/40">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#D4AF37]">Overall Business Health Score</span>
              <h3 className="text-2xl font-black text-white mt-0.5">{globalScore} / 100 <span className="text-xs font-normal text-emerald-400 ml-2">(Above Average)</span></h3>
            </div>
            <div className="text-right">
              <span className="text-[9px] uppercase text-slate-300 block">Industry Benchmark</span>
              <span className="text-xs font-bold text-[#D4AF37]">Top 10%: 88 / 100</span>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2.5">
            <h3 className="text-xs font-bold text-[#0A1128] uppercase tracking-wider mb-1">7-Pillar Diagnostic Scores vs Industry Benchmark</h3>
            {pillars.map((pillar, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800">{pillar.name}</span>
                  <div className="flex gap-2.5 text-[11px] font-mono">
                    <span className="text-[#0A1128] font-bold">{pillar.score}%</span>
                    <span className="text-slate-400">(Avg: {pillar.benchmark}%)</span>
                  </div>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden flex">
                  <div className="bg-[#0A1128] h-full rounded-full transition-all" style={{ width: `${pillar.score}%` }}></div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-2.5">
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <span className="text-[9px] uppercase font-bold text-slate-400 block">Business Readiness</span>
              <span className="text-base font-black text-[#0A1128] mt-0.5 block">72%</span>
              <span className="text-[8.5px] font-bold text-emerald-600">Good Status</span>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <span className="text-[9px] uppercase font-bold text-slate-400 block">Growth Index</span>
              <span className="text-base font-black text-emerald-600 mt-0.5 block">81%</span>
              <span className="text-[8.5px] font-bold text-emerald-600">High Momentum</span>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <span className="text-[9px] uppercase font-bold text-slate-400 block">Risk Index</span>
              <span className="text-base font-black text-amber-600 mt-0.5 block">48%</span>
              <span className="text-[8.5px] font-bold text-amber-600">Medium Exposure</span>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <span className="text-[9px] uppercase font-bold text-slate-400 block">Overall Rating</span>
              <span className="text-base font-black text-[#0A1128] mt-0.5 block">Above Avg</span>
              <span className="text-[8.5px] font-bold text-slate-500">Tier 2 Enterprise</span>
            </div>
          </div>
        </div>
      </Page>

      {/* Pages 5–11: 7 Pillars */}
      {renderPillarPage(0, 5)}
      {renderPillarPage(1, 6)}
      {renderPillarPage(2, 7)}
      {renderPillarPage(3, 8)}
      {renderPillarPage(4, 9)}
      {renderPillarPage(5, 10)}
      {renderPillarPage(6, 11)}

      {/* Page 12: Cross-Pillar Insights */}
      <Page pageNumber={12}>
        <div className="space-y-4">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
            <h3 className="text-xs font-bold text-[#0A1128] uppercase tracking-wider">Cross-Pillar Systemic Flow</h3>
            <p className="text-xs text-slate-600">How operational vulnerabilities in one pillar create ripple effects across the entire enterprise:</p>

            <div className="grid grid-cols-5 gap-2 text-center text-[10px] font-bold">
              <div className="bg-rose-50 border border-rose-200 p-2.5 rounded-lg text-rose-900">
                <span className="block text-[8px] text-rose-500 font-mono mb-0.5">TRIGGER</span>
                Marketing ROI Decline
              </div>
              <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-lg text-amber-900">
                <span className="block text-[8px] text-amber-500 font-mono mb-0.5">IMPACT</span>
                Sales Conversion Weakness
              </div>
              <div className="bg-slate-100 border border-slate-300 p-2.5 rounded-lg text-slate-900">
                <span className="block text-[8px] text-slate-500 font-mono mb-0.5">CORE FRICTION</span>
                Operational Bottleneck
              </div>
              <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-lg text-amber-900">
                <span className="block text-[8px] text-amber-500 font-mono mb-0.5">FINANCIAL RISK</span>
                Cash Flow Pressure
              </div>
              <div className="bg-rose-50 border border-rose-200 p-2.5 rounded-lg text-rose-900">
                <span className="block text-[8px] text-rose-500 font-mono mb-0.5">CAPITAL IMPACT</span>
                Growth Stagnation
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-1.5">
            <h3 className="text-xs font-bold text-[#0A1128] uppercase tracking-wider">Systemic Root Cause Analysis</h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              Lack of standardized operating procedures and process documentation leading to low efficiency and lost sales opportunities. Because team members rely on verbal instructions, handoffs between sales, operations, and finance incur significant friction, extending turnaround times.
            </p>
          </div>

          <div className="bg-[#0A1128] text-white rounded-xl p-4 border border-[#D4AF37]/40 space-y-2">
            <h3 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">Cross-Pillar Alignment Strategy</h3>
            <ul className="text-xs text-slate-200 space-y-1.5 font-medium">
              <li>&bull; Connect CRM pipeline directly to Operations order processing templates.</li>
              <li>&bull; Establish automated payment milestones to eliminate cash flow lags.</li>
              <li>&bull; Transition founder from daily gatekeeper to weekly KPI auditor.</li>
            </ul>
          </div>
        </div>
      </Page>

      {/* Page 13: Revenue Opportunity Analysis */}
      <Page pageNumber={13}>
        <div className="space-y-4">
          <div className="bg-[#0A1128] text-white rounded-xl p-5 border border-[#D4AF37] text-center shadow-xs">
            <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-widest block mb-1">Total Hidden Revenue Potential</span>
            <div className="text-4xl font-black text-[#D4AF37] my-1">₹2.4 Cr</div>
            <span className="text-xs text-slate-300 font-medium">(Realizable over 12–18 Months Execution)</span>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 border-b border-slate-200 text-[#0A1128] font-bold">
                <tr>
                  <th className="p-3 uppercase">Opportunity Stream</th>
                  <th className="p-3 uppercase">Estimated Value</th>
                  <th className="p-3 uppercase">Primary Driver</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                <tr>
                  <td className="p-3 font-bold text-slate-800">Revenue Leakage Recovery</td>
                  <td className="p-3 font-black text-rose-600">₹60 Lakh</td>
                  <td className="p-3 text-slate-600">Plug lead drop-off & quote follow-up lags</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-800">Margin Improvement</td>
                  <td className="p-3 font-black text-emerald-600">₹40 Lakh</td>
                  <td className="p-3 text-slate-600">Eliminate operational waste & inventory lag</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-800">Upsell Potential</td>
                  <td className="p-3 font-black text-[#0A1128]">₹50 Lakh</td>
                  <td className="p-3 text-slate-600">Structured client expansion offers</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-800">Cross-Sell Potential</td>
                  <td className="p-3 font-black text-[#0A1128]">₹30 Lakh</td>
                  <td className="p-3 text-slate-600">Systematic product recommendations</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-800">Pricing Optimization</td>
                  <td className="p-3 font-black text-emerald-600">₹20 Lakh</td>
                  <td className="p-3 text-slate-600">Value-based pricing adjustments</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-700 leading-relaxed font-medium">
            <strong>Executive Takeaway:</strong> Capturing even 50% of this identified potential (₹1.2 Cr) over the next 12 months requires minimal extra capital expenditure — it relies primarily on enforcing SOPs and CRM discipline.
          </div>
        </div>
      </Page>

      {/* Page 14: Industry Benchmark */}
      <Page pageNumber={14}>
        <div className="space-y-4">
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0A1128] text-white font-bold">
                <tr>
                  <th className="p-3 uppercase">Performance Metric</th>
                  <th className="p-3 uppercase text-amber-400">Your Business</th>
                  <th className="p-3 uppercase">Industry Avg</th>
                  <th className="p-3 uppercase text-emerald-400">Top 10% Leaders</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white font-medium">
                <tr>
                  <td className="p-3 font-bold text-slate-800">Revenue Growth Rate</td>
                  <td className="p-3 font-bold text-[#0A1128]">18%</td>
                  <td className="p-3 text-slate-500">11%</td>
                  <td className="p-3 font-bold text-emerald-600">27%</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-800">Gross Margin %</td>
                  <td className="p-3 font-bold text-[#0A1128]">24%</td>
                  <td className="p-3 text-slate-500">21%</td>
                  <td className="p-3 font-bold text-emerald-600">31%</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-800">Customer Retention Rate</td>
                  <td className="p-3 font-bold text-emerald-600">82%</td>
                  <td className="p-3 text-slate-500">76%</td>
                  <td className="p-3 font-bold text-emerald-600">91%</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-800">Sales Productivity Index</td>
                  <td className="p-3 font-bold text-amber-600">Medium</td>
                  <td className="p-3 text-slate-500">Medium</td>
                  <td className="p-3 font-bold text-emerald-600">High</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-800">Digital Tool Adoption</td>
                  <td className="p-3 font-bold text-rose-600">Low</td>
                  <td className="p-3 text-slate-500">Medium</td>
                  <td className="p-3 font-bold text-emerald-600">High</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3.5">
              <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2">Where You Lead</h4>
              <ul className="text-xs text-slate-700 space-y-1 font-medium">
                <li>&bull; Revenue Growth above industry average</li>
                <li>&bull; Strong Product Quality & Customer Trust</li>
                <li>&bull; Customer Retention Rate (82%)</li>
              </ul>
            </div>

            <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-3.5">
              <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wider mb-2">Where You Lag</h4>
              <ul className="text-xs text-slate-700 space-y-1 font-medium">
                <li>&bull; Digital Tool Adoption & Automation</li>
                <li>&bull; Sales Conversion Consistency</li>
                <li>&bull; Operational Process Standardization</li>
              </ul>
            </div>
          </div>
        </div>
      </Page>

      {/* Page 15: Business Risk Assessment */}
      <Page pageNumber={15}>
        <div className="space-y-4">
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <div className="bg-[#0A1128] text-white p-3 flex justify-between items-center">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">Enterprise Risk Evaluation Grid</h3>
              <span className="text-[9px] font-mono text-slate-300">Severity Assessment</span>
            </div>
            <div className="p-3 bg-slate-50 space-y-2">
              {[
                { category: "Financial Risk", severity: "Medium", desc: "Cash flow fluctuation during delayed client payment cycles." },
                { category: "People Risk", severity: "Medium", desc: "Dependence on key technical staff without backup documentation." },
                { category: "Operational Risk", severity: "High", desc: "Manual workflow errors during volume peaks." },
                { category: "Sales Risk", severity: "High", desc: "Inconsistent lead follow-up & untracked pipeline status." },
                { category: "Technology Risk", severity: "Medium", desc: "Disconnected software tools requiring double data entry." },
                { category: "Customer Risk", severity: "Low", desc: "High client satisfaction and minimal account attrition." },
                { category: "Founder Dependency", severity: "High", desc: "Operational bottleneck due to centralized approval authority." },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-slate-200 text-xs">
                  <div>
                    <span className="font-bold text-[#0A1128] block">{item.category}</span>
                    <span className="text-[10px] text-slate-500">{item.desc}</span>
                  </div>
                  <span className={`px-2.5 py-1 rounded text-[10px] font-black uppercase ${
                    item.severity === 'High' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                    item.severity === 'Medium' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                    'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  }`}>
                    {item.severity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Page>

      {/* Page 16: 90-Day Growth Roadmap */}
      <Page pageNumber={16}>
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="bg-white border-2 border-amber-400 rounded-xl p-4 shadow-xs relative">
              <div className="flex justify-between items-center mb-2">
                <span className="bg-amber-500 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded">
                  Phase 1: Days 1–30
                </span>
                <span className="text-xs font-bold text-amber-800 uppercase">Stabilize & Build Momentum</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 font-medium mt-2">
                <div>&bull; Fix Sales Process & Lead Tracking</div>
                <div>&bull; Quick Wins & Cash Flow Focus</div>
                <div>&bull; Define Core Department KPIs</div>
                <div>&bull; Establish Daily Standup Reviews</div>
              </div>
            </div>

            <div className="bg-white border-2 border-[#0A1128] rounded-xl p-4 shadow-xs relative">
              <div className="flex justify-between items-center mb-2">
                <span className="bg-[#0A1128] text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded">
                  Phase 2: Days 31–60
                </span>
                <span className="text-xs font-bold text-[#0A1128] uppercase">Build Systems & Improve Efficiency</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 font-medium mt-2">
                <div>&bull; Document Top 10 Core SOPs</div>
                <div>&bull; Implement CRM Platform</div>
                <div>&bull; Launch Inbound Marketing Engine</div>
                <div>&bull; Team Role Alignment Sprints</div>
              </div>
            </div>

            <div className="bg-white border-2 border-emerald-500 rounded-xl p-4 shadow-xs relative">
              <div className="flex justify-between items-center mb-2">
                <span className="bg-emerald-600 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded">
                  Phase 3: Days 61–90
                </span>
                <span className="text-xs font-bold text-emerald-800 uppercase">Scale & Increase Profitability</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 font-medium mt-2">
                <div>&bull; Scale Targeted Digital Campaigns</div>
                <div>&bull; Automate Key Workflow Integrations</div>
                <div>&bull; Performance Management Reviews</div>
                <div>&bull; Annual Capital Expansion Plan</div>
              </div>
            </div>
          </div>
        </div>
      </Page>

      {/* Page 17: Priority Action Matrix */}
      <Page pageNumber={17}>
        <div className="space-y-4">
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0A1128] text-white font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3 w-10">Rank</th>
                  <th className="p-3">Strategic Action</th>
                  <th className="p-3">Impact</th>
                  <th className="p-3">Effort</th>
                  <th className="p-3">Owner</th>
                  <th className="p-3">Timeline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white font-medium">
                {[
                  { rank: 1, action: "Improve Sales Conversion Process", impact: "High", effort: "Medium", owner: "Sales Head", timeline: "0–30 Days" },
                  { rank: 2, action: "Implement Lightweight CRM System", impact: "High", effort: "Low", owner: "Sales Head", timeline: "0–30 Days" },
                  { rank: 3, action: "Document Core Operational SOPs", impact: "High", effort: "Medium", owner: "Ops Head", timeline: "30–60 Days" },
                  { rank: 4, action: "Setup Inbound Marketing Engine", impact: "Medium", effort: "Medium", owner: "Mktg Head", timeline: "30–60 Days" },
                  { rank: 5, action: "Deploy Rolling Cash Flow Model", impact: "Medium", effort: "Low", owner: "Finance Head", timeline: "0–30 Days" },
                ].map((item, idx) => (
                  <tr key={idx}>
                    <td className="p-3 font-black text-[#0A1128] text-center">{item.rank}</td>
                    <td className="p-3 font-bold text-slate-800">{item.action}</td>
                    <td className="p-3"><span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">{item.impact}</span></td>
                    <td className="p-3"><span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-[10px] font-bold">{item.effort}</span></td>
                    <td className="p-3 text-slate-600">{item.owner}</td>
                    <td className="p-3 font-bold text-[#0A1128]">{item.timeline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Page>

      {/* Page 18: AI Strategic Advisory */}
      <Page pageNumber={18}>
        <div className="space-y-4 my-auto">
          <div className="bg-[#0A1128] text-white p-7 rounded-2xl border-2 border-[#D4AF37] relative shadow-xl">
            <div className="text-4xl text-[#D4AF37] font-serif mb-3 font-bold">“</div>
            <p className="text-xs text-slate-200 leading-relaxed font-serif italic space-y-2">
              Your business has strong fundamentals and is in a good position to grow. The biggest opportunities lie in building a consistent sales system, improving operational efficiency, and leveraging digital marketing to generate quality leads. Focus on systems, automation, and team performance to unlock the next level of growth.
            </p>
            <p className="text-xs text-slate-200 leading-relaxed font-serif italic mt-3">
              With the right execution, your business can achieve significant revenue and profit growth over the next 12–18 months.
            </p>
            <div className="mt-5 pt-3 border-t border-white/20 text-right">
              <span className="text-xs font-bold text-[#D4AF37] tracking-wider uppercase block">
                &mdash; KRG ONE AI Strategic Advisor
              </span>
            </div>
          </div>
        </div>
      </Page>

      {/* Page 19: KPI Dashboard */}
      <Page pageNumber={19}>
        <div className="space-y-3.5">
          <h3 className="text-xs font-bold text-[#0A1128] uppercase tracking-wider">Recommended KPI Scorecard Matrix</h3>
          <div className="grid grid-cols-2 gap-3.5">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1.5">
              <h4 className="text-xs font-bold text-[#0A1128] uppercase border-b border-slate-200 pb-1">Sales Department</h4>
              <ul className="text-xs text-slate-700 space-y-1 font-medium">
                <li>&bull; Lead Conversion % (Target: &gt;25%)</li>
                <li>&bull; Revenue Growth % MoM (Target: &gt;15%)</li>
                <li>&bull; Average Deal Size (Target: +10%)</li>
              </ul>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1.5">
              <h4 className="text-xs font-bold text-[#0A1128] uppercase border-b border-slate-200 pb-1">Finance Department</h4>
              <ul className="text-xs text-slate-700 space-y-1 font-medium">
                <li>&bull; Gross Margin % (Target: &gt;30%)</li>
                <li>&bull; Net Profit % (Target: &gt;15%)</li>
                <li>&bull; Cash Conversion Cycle (Target: &lt;30 Days)</li>
              </ul>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1.5">
              <h4 className="text-xs font-bold text-[#0A1128] uppercase border-b border-slate-200 pb-1">Marketing Department</h4>
              <ul className="text-xs text-slate-700 space-y-1 font-medium">
                <li>&bull; Monthly Lead Volume (Target: &gt;100 Qualified)</li>
                <li>&bull; Cost Per Lead (CPL) Optimization</li>
                <li>&bull; Marketing ROI (Target: 4x Return)</li>
              </ul>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1.5">
              <h4 className="text-xs font-bold text-[#0A1128] uppercase border-b border-slate-200 pb-1">People Department</h4>
              <ul className="text-xs text-slate-700 space-y-1 font-medium">
                <li>&bull; Employee Productivity Index</li>
                <li>&bull; Attrition Rate % (Target: &lt;10%)</li>
                <li>&bull; Training Hours Per Staff / Month</li>
              </ul>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1.5">
              <h4 className="text-xs font-bold text-[#0A1128] uppercase border-b border-slate-200 pb-1">Operations Department</h4>
              <ul className="text-xs text-slate-700 space-y-1 font-medium">
                <li>&bull; On-Time Delivery % (Target: &gt;98%)</li>
                <li>&bull; Production Efficiency %</li>
                <li>&bull; Defect / Rejection Rate % (Target: &lt;1%)</li>
              </ul>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1.5">
              <h4 className="text-xs font-bold text-[#0A1128] uppercase border-b border-slate-200 pb-1">Customer Success</h4>
              <ul className="text-xs text-slate-700 space-y-1 font-medium">
                <li>&bull; Customer Retention Rate % (Target: &gt;85%)</li>
                <li>&bull; Net Promoter Score (NPS)</li>
                <li>&bull; Repeat Purchase Rate %</li>
              </ul>
            </div>
          </div>
        </div>
      </Page>

      {/* Page 20: Final Recommendation */}
      <Page pageNumber={20}>
        <div className="space-y-4 my-auto">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 grid grid-cols-2 gap-4 text-center">
            <div className="border-r border-slate-200 pr-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Overall Business Rating</span>
              <span className="text-xl font-black text-[#0A1128] mt-1 block">Above Average</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Business Classification</span>
              <span className="text-xl font-black text-emerald-600 mt-1 block">Growth Ready</span>
            </div>
          </div>

          <div className="bg-[#0A1128] text-white p-6 rounded-2xl border-2 border-[#D4AF37] text-center space-y-3.5 shadow-xl">
            <span className="text-[10px] text-[#D4AF37] font-extrabold uppercase tracking-widest bg-[#D4AF37]/10 px-3 py-1 rounded border border-[#D4AF37]/30 inline-block">
              Recommended Next Step
            </span>
            <h3 className="text-2xl font-black text-white">Full Revenue Diagnostic™ (Engagement)</h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
              A hands-on, 60-minute strategy session with senior KRG ONE systems advisors to implement these 20-page diagnostic findings and build your custom execution roadmap.
            </p>

            <div className="pt-2 border-t border-white/10 flex justify-center gap-6 text-xs text-[#D4AF37] font-bold">
              <span>&bull; Phone: +91 7300300330</span>
              <span>&bull; Email: enquiry.krgone@gmail.com</span>
            </div>
          </div>

          <div className="text-center py-3.5 bg-amber-50 border border-amber-200 rounded-xl">
            <h4 className="text-sm font-black text-[#0A1128] uppercase tracking-wider">Together, let's build a stronger, more profitable business.</h4>
            <p className="text-xs font-serif font-bold text-[#D4AF37] mt-0.5">KRG ONE Business Growth Operating System™</p>
          </div>
        </div>
      </Page>
    </div>
  );
}
