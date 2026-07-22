import React from 'react';
import {
  CheckCircle2, AlertTriangle, Check, ArrowRight, ShieldCheck, TrendingUp,
  Target, Activity, Award, Calendar, Phone, Mail, Globe, MapPin, Building2,
  Users, DollarSign, Cpu, Layers, User, Zap, BarChart3, Compass
} from 'lucide-react';

interface PrintDossierProps {
  formData?: any;
  scores?: number[];
  globalScore?: number;
  pillarScores?: number[];
  reportId?: string;
  assessmentDate?: string;
}

export default function PrintDossier({
  formData = {},
  scores = [],
  globalScore = 78,
  pillarScores = [],
  reportId = 'KRG-2026-0001',
  assessmentDate = ''
}: PrintDossierProps) {
  const companyName = formData?.companyName || 'ABC Manufacturing Pvt. Ltd.';
  const ownerName = formData?.fullName || formData?.ownerName || 'John Doe';
  const ownerRole = formData?.role || 'Managing Director';
  const industry = formData?.industry || 'Manufacturing';
  const revenue = formData?.revenue || '₹3 - ₹10 Cr';
  const employees = formData?.employees || '32';
  const businessAge = formData?.businessAge || '6 Years';
  const targetMarket = formData?.targetMarket || 'B2B Enterprise';
  const businessModel = formData?.businessModel || 'Product + Services';
  const geography = formData?.geography || 'Rajasthan, India';
  const formattedDate = assessmentDate || new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const docReportId = reportId || 'KRG-2026-0001';

  // 7 Pillar definitions
  const defaultPillars = [
    { name: 'Leadership & Vision', defaultScore: 82, benchmark: 62, top10: 88, priority: 'High', color: '#0A1128', strengths: 'Clear long-term direction & founder passion', gap: 'Lack of middle-management decision empowerment', action: 'Delegate daily operational approvals to department leads' },
    { name: 'Sales', defaultScore: 64, benchmark: 58, top10: 86, priority: 'High', color: '#1E3A8A', strengths: 'Strong existing client relationships & referral traffic', gap: 'Inconsistent lead follow-up & untracked pipeline status', action: 'Implement automated CRM lead tracking & follow-up sprints' },
    { name: 'Marketing', defaultScore: 48, benchmark: 55, top10: 83, priority: 'High', color: '#0284C7', strengths: 'Solid brand reputation in primary regional market', gap: 'Low digital presence & uncoordinated acquisition channels', action: 'Launch targeted inbound digital lead generation engine' },
    { name: 'Operations', defaultScore: 71, benchmark: 60, top10: 85, priority: 'High', color: '#6B21A8', strengths: 'High product execution standards & technical skill', gap: 'Manual workflow bottlenecks during demand peaks', action: 'Document top 10 core SOP playbooks & swimlane diagrams' },
    { name: 'Finance', defaultScore: 78, benchmark: 61, top10: 87, priority: 'Medium', color: '#B45309', strengths: 'Healthy gross profit margins & clear invoicing', gap: 'Cash flow fluctuations due to extended client credit cycles', action: 'Institute rolling cash flow forecasting & strict payment terms' },
    { name: 'Technology', defaultScore: 54, benchmark: 52, top10: 81, priority: 'Medium', color: '#4338CA', strengths: 'Core operational software tools deployed', gap: 'Disconnected software systems requiring double data entry', action: 'Connect sales CRM with accounting & operational inventory' },
    { name: 'People & HR', defaultScore: 69, benchmark: 52, top10: 88, priority: 'Medium', color: '#047857', strengths: 'Skilled core staff & loyal workforce culture', gap: 'Unstructured role KPIs & reliance on key personnel', action: 'Define role-based scorecards & performance review cadence' },
  ];

  const pillars = defaultPillars.map((p, idx) => {
    const score = (pillarScores && pillarScores[idx] !== undefined && pillarScores[idx] > 0) ? pillarScores[idx] : p.defaultScore;
    const ratingLabel = score >= 75 ? 'Above Average' : score >= 60 ? 'Average' : 'Needs Optimization';
    return { ...p, score, ratingLabel };
  });

  const totalPages = 8;

  // Header component for content pages - ALWAYS NAVY BLUE
  const PageHeader = ({ title, sectionNum }: { title: string; sectionNum?: string }) => (
    <div className="bg-[#0A1128] text-white px-4 py-2.5 rounded-xl border-2 border-[#D4AF37]/60 shadow-md flex justify-between items-center shrink-0 mb-3">
      <div className="flex items-center gap-3">
        {sectionNum && (
          <span className="w-6 h-6 rounded-md bg-[#D4AF37] text-[#0A1128] font-black text-xs flex items-center justify-center shadow-xs shrink-0">
            {sectionNum}
          </span>
        )}
        <div>
          <h1 className="text-sm font-serif font-black text-[#D4AF37] tracking-wider leading-none uppercase">
            KRGONE
          </h1>
          <p className="text-[6.5px] uppercase tracking-[0.18em] text-slate-200 font-black leading-none mt-0.5">
            Turning Knowledge into Revenue Growth
          </p>
        </div>
      </div>
      <div className="text-right">
        <h2 className="text-[11px] font-black text-[#D4AF37] uppercase tracking-wider leading-none">{title}</h2>
        <p className="text-[7px] text-slate-300 font-mono mt-0.5 uppercase tracking-wide">Business Growth Diagnostic™ Report</p>
      </div>
    </div>
  );

  // Footer component for content pages - ALWAYS NAVY BLUE
  const PageFooter = ({ page }: { page: number }) => (
    <div className="bg-[#0A1128] text-white px-3.5 py-2 rounded-xl border-2 border-[#D4AF37]/50 shadow-sm shrink-0 mt-auto flex flex-col gap-1 text-[8px] font-sans">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <span className="font-extrabold text-[#D4AF37] text-[9px] tracking-wider uppercase">KRGONE</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-300 font-semibold text-[7.5px]">Turning Knowledge into Revenue Growth</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-200 text-[7.5px]">📍 Jaipur, Rajasthan</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-200 text-[7.5px]">📞 +91 73003 00330</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-200 text-[7.5px]">✉ enquiry.krgone@gmail.com</span>
        </div>
        <div className="font-mono text-[#D4AF37] font-bold text-[8px]">
          krgone.vercel.app
        </div>
      </div>
      <div className="flex justify-between items-center text-[7px] text-slate-400 font-mono border-t border-white/10 pt-1">
        <span>Business Growth Operating System™</span>
        <span className="font-bold text-[#D4AF37] uppercase tracking-wider">CONFIDENTIAL REPORT | PAGE {page} OF {totalPages}</span>
      </div>
    </div>
  );

  // Page wrapper
  const Page = ({ children, pageNumber }: { children: React.ReactNode; pageNumber: number }) => (
    <div
      className="print-page w-[210mm] h-[297mm] min-h-[297mm] max-h-[297mm] bg-white p-6 relative overflow-hidden break-after-page flex flex-col justify-between box-border mx-auto text-slate-900"
      style={{ pageBreakAfter: 'always', breakAfter: 'page' }}
    >
      <div className="flex-1 flex flex-col justify-between space-y-3 overflow-hidden py-1">
        {children}
      </div>
      {pageNumber > 1 && <PageFooter page={pageNumber} />}
    </div>
  );

  // SVG Radar Spider Chart Component
  const RadarSpiderChart = () => {
    const cx = 140;
    const cy = 115;
    const radius = 80;
    const numAxes = 7;
    const angleStep = (2 * Math.PI) / numAxes;

    const getCoords = (index: number, val: number) => {
      const angle = -Math.PI / 2 + index * angleStep;
      const r = (val / 100) * radius;
      return {
        x: cx + r * Math.cos(angle),
        y: cy + r * Math.sin(angle)
      };
    };

    const rings = [0.25, 0.5, 0.75, 1.0];

    const scorePoints = pillars.map((p, idx) => {
      const { x, y } = getCoords(idx, p.score);
      return `${x},${y}`;
    }).join(' ');

    const industryPoints = pillars.map((p, idx) => {
      const { x, y } = getCoords(idx, p.benchmark);
      return `${x},${y}`;
    }).join(' ');

    const labels = ["Leadership\n& Vision", "Sales", "Marketing", "Operations", "Finance", "Technology", "People"];

    return (
      <div className="relative w-full flex flex-col items-center justify-center py-1">
        <svg width="280" height="235" viewBox="0 0 280 230" className="overflow-visible">
          {rings.map((ringVal, rIdx) => {
            const ringPoints = Array.from({ length: numAxes }).map((_, idx) => {
              const angle = -Math.PI / 2 + idx * angleStep;
              const r = ringVal * radius;
              return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
            }).join(' ');

            return (
              <polygon
                key={rIdx}
                points={ringPoints}
                fill="none"
                stroke="#E2E8F0"
                strokeWidth={rIdx === 3 ? "1.5" : "1"}
                strokeDasharray={rIdx === 3 ? "none" : "2 2"}
              />
            );
          })}

          {Array.from({ length: numAxes }).map((_, idx) => {
            const angle = -Math.PI / 2 + idx * angleStep;
            const x = cx + radius * Math.cos(angle);
            const y = cy + radius * Math.sin(angle);
            return (
              <line
                key={idx}
                x1={cx}
                y1={cy}
                x2={x}
                y2={y}
                stroke="#CBD5E1"
                strokeWidth="1"
              />
            );
          })}

          <polygon
            points={industryPoints}
            fill="rgba(212, 175, 55, 0.08)"
            stroke="#D4AF37"
            strokeWidth="1.8"
            strokeDasharray="4 3"
          />

          <polygon
            points={scorePoints}
            fill="rgba(10, 17, 40, 0.25)"
            stroke="#0A1128"
            strokeWidth="2.2"
          />

          {pillars.map((p, idx) => {
            const { x, y } = getCoords(idx, p.score);
            return (
              <circle
                key={idx}
                cx={x}
                cy={y}
                r="3.5"
                fill="#0A1128"
                stroke="#D4AF37"
                strokeWidth="1.5"
              />
            );
          })}

          {labels.map((lbl, idx) => {
            const angle = -Math.PI / 2 + idx * angleStep;
            const labelR = radius + 20;
            const lx = cx + labelR * Math.cos(angle);
            const ly = cy + labelR * Math.sin(angle);

            return (
              <text
                key={idx}
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="8"
                fontWeight="700"
                fill="#1E293B"
                className="font-sans"
              >
                {lbl.split('\n').map((line, lIdx) => (
                  <tspan key={lIdx} x={lx} dy={lIdx > 0 ? "10" : "0"}>
                    {line}
                  </tspan>
                ))}
              </text>
            );
          })}
        </svg>

        <div className="flex items-center gap-6 mt-1 text-[9px] font-bold">
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-1.5 bg-[#0A1128] rounded"></span>
            <span className="text-[#0A1128]">Your Business Score</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-0.5 bg-[#D4AF37] border-t-2 border-dashed border-[#D4AF37]"></span>
            <span className="text-slate-600">Industry Average</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div id="krg-print-dossier-root" className="hidden print:block print-dossier-root w-full bg-white text-slate-900 font-sans">

      {/* ========================================== */}
      {/* PAGE 1: COVER PAGE                         */}
      {/* ========================================== */}
      <Page pageNumber={1}>
        <div className="flex flex-col justify-between h-full bg-[#0A1128] text-white p-8 rounded-2xl relative overflow-hidden border-2 border-[#D4AF37]/60 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#D4AF37]/20 via-blue-900/10 to-transparent rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-amber-500/10 via-slate-900/40 to-transparent rounded-full blur-xl pointer-events-none"></div>

          <div className="absolute inset-0 opacity-15 pointer-events-none flex items-center justify-center">
            <svg width="100%" height="100%" viewBox="0 0 500 500">
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0A1128" stopOpacity="0" />
                  <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity="1" />
                </linearGradient>
              </defs>
              <path d="M 50 400 Q 150 350 250 220 T 450 80" fill="none" stroke="url(#goldGradient)" strokeWidth="6" strokeLinecap="round" />
              <polygon points="430,75 460,75 455,105" fill="#F59E0B" />
              {Array.from({ length: 8 }).map((_, i) => (
                <line key={i} x1={50 + i * 50} y1="50" x2={50 + i * 50} y2="450" stroke="#FFFFFF" strokeWidth="0.5" strokeOpacity="0.1" />
              ))}
              {Array.from({ length: 8 }).map((_, i) => (
                <line key={i} x1="50" y1={50 + i * 50} x2="450" y2={50 + i * 50} stroke="#FFFFFF" strokeWidth="0.5" strokeOpacity="0.1" />
              ))}
            </svg>
          </div>

          {/* Top Header Row */}
          <div className="flex justify-between items-start z-10 border-b border-white/10 pb-5">
            <div className="flex items-center gap-4">
              <img
                src="/logo1.png"
                alt="KRGONE Full Logo"
                className="h-12 w-auto object-contain filter drop-shadow"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <div>
                <h1 className="text-3xl font-serif font-black tracking-tight text-white leading-none">
                  KRGONE
                </h1>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-black mt-1">
                  Turning Knowledge into Revenue Growth
                </p>
              </div>
            </div>
            <span className="bg-[#D4AF37]/15 text-[#D4AF37] text-[9.5px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-[#D4AF37]/40 shadow-xs">
              Confidential Report
            </span>
          </div>

          {/* Center Main Title */}
          <div className="z-10 my-auto py-8 text-left space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-mono font-extrabold text-[#D4AF37] tracking-widest uppercase block">
                SYSTEMIC DIAGNOSTIC DOSSIER
              </span>
              <h2 className="text-4xl font-black text-[#D4AF37] uppercase tracking-wide leading-none font-sans drop-shadow-sm">
                BUSINESS GROWTH DIAGNOSTIC™
              </h2>
              <p className="text-base font-extrabold tracking-widest text-white uppercase border-b border-[#D4AF37]/30 pb-4">
                STRATEGIC BUSINESS ASSESSMENT REPORT
              </p>
              <p className="text-sm italic text-slate-300 font-serif tracking-wider pt-1">
                Measure. Understand. Improve. Grow.
              </p>
            </div>

            {/* Prepared For Box Grid */}
            <div className="bg-white/5 backdrop-blur-md border border-[#D4AF37]/40 rounded-xl p-6 grid grid-cols-2 gap-5 max-w-2xl shadow-xl mt-6">
              <div className="space-y-1">
                <span className="text-[9.5px] font-extrabold text-[#D4AF37] uppercase tracking-wider block">PREPARED FOR</span>
                <p className="text-base font-black text-white">{ownerName}</p>
                <p className="text-xs text-slate-300 font-medium">{ownerRole}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[9.5px] font-extrabold text-[#D4AF37] uppercase tracking-wider block">ORGANIZATION</span>
                <p className="text-base font-black text-white">{companyName}</p>
              </div>

              <div className="space-y-1 pt-3 border-t border-white/10">
                <span className="text-[9.5px] font-extrabold text-slate-400 uppercase tracking-wider block">INDUSTRY SECTOR</span>
                <p className="text-xs font-bold text-slate-200">{industry}</p>
              </div>

              <div className="space-y-1 pt-3 border-t border-white/10">
                <span className="text-[9.5px] font-extrabold text-slate-400 uppercase tracking-wider block">ASSESSMENT DATE</span>
                <p className="text-xs font-bold text-slate-200">{formattedDate}</p>
              </div>

              <div className="space-y-1 col-span-2 pt-3 border-t border-white/10 flex justify-between items-center">
                <div>
                  <span className="text-[9.5px] font-extrabold text-slate-400 uppercase tracking-wider block">REPORT IDENTIFIER</span>
                  <p className="text-xs font-mono font-bold text-[#D4AF37]">{docReportId}</p>
                </div>
                <span className="bg-emerald-500/20 text-emerald-300 text-[9.5px] font-bold uppercase tracking-wider px-3 py-1 rounded border border-emerald-500/30">
                  Verified Executive Record
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="z-10 border-t border-white/15 pt-4 flex justify-between items-center text-[10.5px] text-slate-300 font-bold uppercase tracking-wider">
            <span>KRGONE Business Growth Operating System™</span>
            <span className="text-[#D4AF37] font-black">Website: krgone.vercel.app</span>
          </div>
        </div>
      </Page>

      {/* ========================================== */}
      {/* PAGE 2: EXECUTIVE SUMMARY & KEY SNAPSHOT   */}
      {/* ========================================== */}
      <Page pageNumber={2}>
        <div className="space-y-4">
          <PageHeader title="EXECUTIVE SUMMARY & KEY METRICS" sectionNum="01" />

          {/* Top 4 Large Metric Cards */}
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-[#0A1128] text-white rounded-xl p-3 border border-[#D4AF37]/50 flex flex-col justify-between text-center shadow-xs">
              <span className="text-[8.5px] font-bold uppercase tracking-widest text-[#D4AF37]">HEALTH SCORE</span>
              <div className="text-3xl font-black text-[#D4AF37] my-1">{globalScore}<span className="text-xs font-normal text-slate-300">/100</span></div>
              <span className="text-[8px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase mx-auto">
                {globalScore >= 75 ? 'Above Average' : 'Needs Optimization'}
              </span>
            </div>

            <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/50 rounded-xl p-3 flex flex-col justify-between text-center">
              <span className="text-[8.5px] font-bold uppercase tracking-wider text-slate-700">REVENUE OPPORTUNITY</span>
              <div className="text-2xl font-black text-[#0A1128] my-1">₹2.4 Cr</div>
              <span className="text-[8px] text-amber-800 font-bold">12-18 Months Potential</span>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex flex-col justify-between text-center">
              <span className="text-[8.5px] font-bold uppercase tracking-wider text-emerald-800">GROWTH POTENTIAL</span>
              <div className="text-2xl font-black text-emerald-700 my-1">High</div>
              <span className="text-[8px] text-emerald-600 font-bold">Strong Demand</span>
            </div>

            <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 flex flex-col justify-between text-center">
              <span className="text-[8.5px] font-bold uppercase tracking-wider text-rose-800">RISK LEVEL</span>
              <div className="text-2xl font-black text-rose-700 my-1">Medium</div>
              <span className="text-[8px] text-rose-600 font-bold">Manageable Exposure</span>
            </div>
          </div>

          {/* Strengths & Vulnerabilities */}
          <div className="grid grid-cols-2 gap-3.5">
            <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-3.5 space-y-2">
              <h3 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-emerald-200 pb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> TOP 3 CORE STRENGTHS
              </h3>
              <ul className="text-[9.5px] text-slate-800 space-y-2 font-medium">
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Strong Revenue Track Record:</strong> Consistent regional market demand and high brand reputation in {industry}.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>High Customer Trust & Retention:</strong> 82% repeat client order rate reflecting strong delivery integrity.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Superior Execution Quality:</strong> High product & technical service standards with skilled internal talent.</span>
                </li>
              </ul>
            </div>

            <div className="bg-rose-50/80 border border-rose-200 rounded-xl p-3.5 space-y-2">
              <h3 className="text-xs font-bold text-rose-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-rose-200 pb-1">
                <AlertTriangle className="w-4 h-4 text-rose-600" /> TOP 3 STRATEGIC VULNERABILITIES
              </h3>
              <ul className="text-[9.5px] text-slate-800 space-y-2 font-medium">
                <li className="flex items-start gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                  <span><strong>Sales Conversion Bottlenecks:</strong> Unstandardized lead follow-up CRM workflows causing deal leakage.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                  <span><strong>Founder Operational Dependency:</strong> High reliance on managing director for daily approvals and direction.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                  <span><strong>Underutilized Digital Engine:</strong> Sporadic customer acquisition channels limiting predictable inbound deal flow.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Executive Consultant Opinion */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
            <h3 className="text-xs font-bold text-[#0A1128] uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#D4AF37]" /> EXECUTIVE CONSULTANT DIAGNOSIS & OPINION
            </h3>
            <p className="text-[10px] text-slate-700 leading-relaxed font-normal">
              Based on our 7-pillar business diagnostic, <strong>{companyName}</strong> demonstrates strong market fundamentals, superior product quality, and high customer retention. However, internal growth is restricted by manual operational bottlenecks, fragmented digital software tools, and unstandardized sales follow-up processes.
            </p>
            <p className="text-[10px] text-slate-700 leading-relaxed font-normal">
              By implementing automated CRM workflows, documenting core SOP playbooks, and establishing daily departmental governance, <strong>{companyName}</strong> can seamlessly unlock the identified <strong>₹2.4 Cr</strong> revenue expansion over the next 12-18 months while preserving gross profit margins.
            </p>
          </div>

          {/* Immediate Priority Focus Banner */}
          <div className="bg-[#0A1128] text-white p-3.5 rounded-xl border border-[#D4AF37]/60 flex justify-between items-center shadow-md">
            <div>
              <span className="text-[8.5px] font-extrabold text-[#D4AF37] uppercase tracking-widest block">IMMEDIATE PRIORITY FOCUS (0-30 DAYS)</span>
              <p className="text-xs font-bold text-white mt-0.5">Systemize Sales Pipeline & Implement Daily Governance Cadence</p>
            </div>
            <span className="bg-[#D4AF37] text-[#0A1128] text-[9px] font-black uppercase tracking-wider px-3 py-1 rounded shadow-xs">
              HIGH PRIORITY SPRINT
            </span>
          </div>
        </div>
      </Page>

      {/* ========================================== */}
      {/* PAGE 3: COMPANY PROFILE & 7-PILLAR RADAR   */}
      {/* ========================================== */}
      <Page pageNumber={3}>
        <div className="space-y-4">
          <PageHeader title="COMPANY PROFILE & 7-PILLAR RADAR" sectionNum="02" />

          {/* Business Profile Matrix */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
            <h3 className="text-xs font-extrabold text-[#0A1128] uppercase tracking-wider">BUSINESS PROFILE MATRIX</h3>
            <div className="grid grid-cols-4 gap-2 text-[9px]">
              <div className="bg-white p-2 rounded-lg border border-slate-200">
                <span className="text-slate-400 font-bold block text-[8px] uppercase">Industry Sector</span>
                <span className="font-bold text-[#0A1128]">{industry}</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-slate-200">
                <span className="text-slate-400 font-bold block text-[8px] uppercase">Annual Revenue</span>
                <span className="font-bold text-[#0A1128]">{revenue}</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-slate-200">
                <span className="text-slate-400 font-bold block text-[8px] uppercase">Employee Headcount</span>
                <span className="font-bold text-[#0A1128]">{employees} Staff</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-slate-200">
                <span className="text-slate-400 font-bold block text-[8px] uppercase">Business Longevity</span>
                <span className="font-bold text-[#0A1128]">{businessAge}</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-slate-200">
                <span className="text-slate-400 font-bold block text-[8px] uppercase">Business Model</span>
                <span className="font-bold text-[#0A1128]">{businessModel}</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-slate-200">
                <span className="text-slate-400 font-bold block text-[8px] uppercase">Target Market</span>
                <span className="font-bold text-[#0A1128]">{targetMarket}</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-slate-200 col-span-2">
                <span className="text-slate-400 font-bold block text-[8px] uppercase">Geographic Scope</span>
                <span className="font-bold text-[#0A1128]">{geography}</span>
              </div>
            </div>
          </div>

          {/* Context & Goals */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-3 space-y-1.5">
              <h4 className="text-[10px] font-extrabold text-emerald-900 uppercase tracking-wider">PRIMARY GROWTH OBJECTIVES</h4>
              <ul className="text-[9.5px] text-slate-800 space-y-1 font-medium">
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Scale & Expand business footprints nationally</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Improve operational efficiency & gross margins</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Transition from founder-led to process-led organization</li>
              </ul>
            </div>

            <div className="bg-rose-50/80 border border-rose-200 rounded-xl p-3 space-y-1.5">
              <h4 className="text-[10px] font-extrabold text-rose-900 uppercase tracking-wider">KEY STRATEGIC CHALLENGES</h4>
              <ul className="text-[9.5px] text-slate-800 space-y-1 font-medium">
                <li className="flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" /> Inconsistent monthly sales & revenue cycles</li>
                <li className="flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" /> Manual delivery friction & lack of written SOPs</li>
                <li className="flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" /> Centralized decision bottlenecks on executive team</li>
              </ul>
            </div>
          </div>

          {/* Overall Health Grid & Spider Radar */}
          <div className="grid grid-cols-12 gap-3 items-center pt-1 border-t border-slate-200">
            <div className="col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
              <div className="text-center bg-[#0A1128] text-white p-3 rounded-lg border border-[#D4AF37]/50">
                <span className="text-[8px] uppercase font-bold text-[#D4AF37] tracking-widest block">OVERALL HEALTH SCORE</span>
                <div className="text-3xl font-black text-[#D4AF37] my-0.5">{globalScore}<span className="text-xs font-normal text-slate-300">/100</span></div>
                <span className="text-[8.5px] font-extrabold text-emerald-400 uppercase">Above Average</span>
              </div>

              <div className="space-y-1.5 text-[9px] font-medium pt-1">
                <div className="flex justify-between items-center border-b border-slate-200 pb-1">
                  <span className="text-slate-600">BUSINESS READINESS</span>
                  <span className="font-bold text-[#0A1128]">72% <span className="text-emerald-600 text-[8px]">(Good)</span></span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-200 pb-1">
                  <span className="text-slate-600">GROWTH INDEX</span>
                  <span className="font-bold text-emerald-700">81% <span className="text-emerald-600 text-[8px]">(High)</span></span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-200 pb-1">
                  <span className="text-slate-600">RISK INDEX</span>
                  <span className="font-bold text-amber-700">48% <span className="text-amber-600 text-[8px]">(Medium)</span></span>
                </div>
                <div className="flex justify-between items-center pt-0.5">
                  <span className="text-slate-600 font-bold">CLASSIFICATION</span>
                  <span className="font-extrabold text-[#0A1128]">Tier 2 Enterprise</span>
                </div>
              </div>
            </div>

            <div className="col-span-7 bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col items-center justify-center">
              <h4 className="text-[10px] font-extrabold text-[#0A1128] uppercase tracking-wider mb-1 text-center">
                7-PILLAR PERFORMANCE RADAR
              </h4>
              <RadarSpiderChart />
            </div>
          </div>
        </div>
      </Page>

      {/* ========================================== */}
      {/* PAGE 4: 7-PILLAR DETAILED DIAGNOSTIC      */}
      {/* ========================================== */}
      <Page pageNumber={4}>
        <div className="space-y-3.5">
          <PageHeader title="7-PILLAR DETAILED DIAGNOSTIC EVALUATION" sectionNum="03" />

          <p className="text-[9.5px] text-slate-600 leading-snug">
            Detailed evaluation of <strong>{companyName}</strong> across all 7 core operational pillars against industry benchmark standards.
          </p>

          <div className="grid grid-cols-1 gap-2">
            {pillars.map((p, idx) => (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 flex items-center justify-between gap-3 shadow-xs"
              >
                <div className="w-32 shrink-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }}></span>
                    <h4 className="text-[10px] font-black text-[#0A1128] uppercase tracking-tight">{p.name}</h4>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-black text-[#0A1128]">{p.score}</span>
                    <span className="text-[8px] text-slate-400">/100</span>
                    <span className={`text-[7.5px] font-extrabold uppercase ml-1 ${p.score >= 70 ? 'text-emerald-700' : p.score >= 60 ? 'text-amber-700' : 'text-rose-700'}`}>
                      {p.ratingLabel}
                    </span>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-3 gap-2 text-[8.5px] border-l border-slate-200 pl-3">
                  <div>
                    <span className="text-slate-400 font-bold uppercase text-[7px] block">Core Strength</span>
                    <p className="text-slate-800 font-medium leading-tight">{p.strengths}</p>
                  </div>
                  <div>
                    <span className="text-rose-600 font-bold uppercase text-[7px] block">System Gap</span>
                    <p className="text-slate-800 font-medium leading-tight">{p.gap}</p>
                  </div>
                  <div>
                    <span className="text-[#0A1128] font-bold uppercase text-[7px] block">Key Intervention</span>
                    <p className="text-slate-900 font-bold leading-tight">{p.action}</p>
                  </div>
                </div>

                <div className="w-16 shrink-0 text-right border-l border-slate-200 pl-2">
                  <span className="text-[7px] text-slate-400 uppercase font-bold block">PRIORITY</span>
                  <span className={`text-[8.5px] font-black uppercase ${p.priority === 'High' ? 'text-rose-700' : 'text-amber-700'}`}>
                    {p.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* 7-Pillar Horizontal Visual Comparison Bar */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2">
            <h4 className="text-[9.5px] font-extrabold text-[#0A1128] uppercase tracking-wider">PILLAR PERFORMANCE VS INDUSTRY BENCHMARKS</h4>
            <div className="space-y-1.5 text-[8.5px]">
              {pillars.map((p, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-28 text-slate-700 font-bold text-[8px] truncate">{p.name}</span>
                  <div className="flex-1 h-3 bg-slate-200 rounded-full overflow-hidden relative">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${p.score}%`, backgroundColor: p.color }}
                    ></div>
                    {/* Benchmark vertical tick */}
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-[#D4AF37] z-10"
                      style={{ left: `${p.benchmark}%` }}
                      title={`Industry Benchmark: ${p.benchmark}%`}
                    ></div>
                  </div>
                  <span className="w-10 text-right font-black text-[#0A1128] text-[8.5px]">{p.score}%</span>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-4 text-[7.5px] text-slate-500 font-medium pt-1">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-[#0A1128]"></span> Your Score</span>
              <span className="flex items-center gap-1"><span className="w-0.5 h-2 bg-[#D4AF37]"></span> Industry Average</span>
            </div>
          </div>
        </div>
      </Page>

      {/* ========================================== */}
      {/* PAGE 5: CROSS-PILLAR & REVENUE OPPORTUNITY */}
      {/* ========================================== */}
      <Page pageNumber={5}>
        <div className="space-y-4">
          <PageHeader title="CROSS-PILLAR SYSTEM FLOW & REVENUE LEAKAGE" sectionNum="04" />

          {/* Cross-Pillar Bottleneck Cascade */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
            <h3 className="text-xs font-extrabold text-[#0A1128] uppercase tracking-wider">SYSTEMIC BOTTLENECK CASCADE FLOW</h3>
            <p className="text-[9px] text-slate-600 leading-tight">
              Operational analysis reveals how initial gaps in marketing digital engines cascade downstream into sales drop-offs and delivery bottlenecks.
            </p>

            <div className="grid grid-cols-5 gap-1.5 text-center text-[8.5px] py-1">
              <div className="bg-rose-50 border border-rose-200 p-2 rounded-lg font-bold text-rose-900">
                <span className="block text-[7.5px] uppercase text-rose-600 font-mono">STEP 1</span>
                MARKETING: Weak digital engine
              </div>
              <div className="bg-amber-50 border border-amber-200 p-2 rounded-lg font-bold text-amber-900">
                <span className="block text-[7.5px] uppercase text-amber-600 font-mono">STEP 2</span>
                SALES: Lead conversion drops
              </div>
              <div className="bg-slate-100 border border-slate-300 p-2 rounded-lg font-bold text-slate-900">
                <span className="block text-[7.5px] uppercase text-slate-500 font-mono">STEP 3</span>
                OPERATIONS: Delivery bottlenecks
              </div>
              <div className="bg-amber-50 border border-amber-200 p-2 rounded-lg font-bold text-amber-900">
                <span className="block text-[7.5px] uppercase text-amber-600 font-mono">STEP 4</span>
                FINANCE: Cash flow pressure
              </div>
              <div className="bg-rose-100 border border-rose-300 p-2 rounded-lg font-black text-rose-950">
                <span className="block text-[7.5px] uppercase text-rose-700 font-mono">RESULT</span>
                GROWTH: Scaling stalls
              </div>
            </div>
          </div>

          {/* Root Cause & Strategic Alignment */}
          <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-2">
            <h4 className="text-[10px] font-extrabold text-[#0A1128] uppercase tracking-wider">CORE ROOT CAUSE & ALIGNMENT STRATEGY</h4>
            <p className="text-[9.5px] text-slate-700 leading-relaxed font-normal">
              <strong>Root Cause:</strong> Lack of standardized SOP processes and integrated CRM software tools causing manual friction across sales, operations, and finance.
            </p>
            <div className="grid grid-cols-3 gap-2 text-[9px] pt-1">
              <div className="bg-emerald-50 border border-emerald-200 p-2 rounded-lg space-y-0.5">
                <span className="font-bold text-emerald-900 block text-[8px] uppercase">1. CRM Integration</span>
                <p className="text-slate-700">Connect CRM directly with operations and invoicing tools.</p>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 p-2 rounded-lg space-y-0.5">
                <span className="font-bold text-emerald-900 block text-[8px] uppercase">2. SOP Standardization</span>
                <p className="text-slate-700">Document core playbooks to eliminate delivery bottlenecks.</p>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 p-2 rounded-lg space-y-0.5">
                <span className="font-bold text-emerald-900 block text-[8px] uppercase">3. Cash Flow Controls</span>
                <p className="text-slate-700">Enforce strict credit terms & rolling cash flow forecasts.</p>
              </div>
            </div>
          </div>

          {/* Revenue Opportunity Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <div className="bg-[#0A1128] text-white p-2.5 flex justify-between items-center text-[9px] font-bold">
              <span className="uppercase text-[#D4AF37]">REVENUE OPPORTUNITY STREAM ANALYSIS</span>
              <span className="font-mono text-slate-300">12-18 Month Potential</span>
            </div>

            <table className="w-full text-left text-[9px]">
              <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[8px]">
                <tr>
                  <th className="p-2">Opportunity Stream</th>
                  <th className="p-2">Description / Strategic Mechanism</th>
                  <th className="p-2 text-right text-[#0A1128]">Potential Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white font-medium">
                <tr>
                  <td className="p-2 font-bold text-slate-800">Revenue Leakage Recovery</td>
                  <td className="p-2 text-slate-600">Recovering un-followed sales leads & untracked pipeline deals</td>
                  <td className="p-2 text-right font-black text-rose-600">₹60 Lakh</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-slate-800">Margin Improvement</td>
                  <td className="p-2 text-slate-600">Eliminating operational rework, material waste & delivery delays</td>
                  <td className="p-2 text-right font-black text-emerald-600">₹40 Lakh</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-slate-800">Upsell & Cross-Sell Expansion</td>
                  <td className="p-2 text-slate-600">Structured account management & repeat client monetization</td>
                  <td className="p-2 text-right font-black text-[#0A1128]">₹50 Lakh</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-slate-800">Pricing & Monetization Optimization</td>
                  <td className="p-2 text-slate-600">Strategic package tiers & value-based pricing adjustments</td>
                  <td className="p-2 text-right font-black text-emerald-600">₹30 Lakh</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-slate-800">Process Automation Efficiency</td>
                  <td className="p-2 text-slate-600">Saving administrative staff hours via digital workflow integration</td>
                  <td className="p-2 text-right font-black text-[#0A1128]">₹60 Lakh</td>
                </tr>
              </tbody>
            </table>

            <div className="bg-[#0A1128] text-white p-3 flex justify-between items-center border-t border-[#D4AF37]/40">
              <div>
                <span className="text-xs font-bold uppercase text-[#D4AF37] block">TOTAL IDENTIFIED UNLOCKED VALUE</span>
                <span className="text-[8.5px] text-slate-300">Target timeline: 12 to 18 Months implementation</span>
              </div>
              <span className="text-2xl font-black text-[#D4AF37]">₹2.4 Cr</span>
            </div>
          </div>
        </div>
      </Page>

      {/* ========================================== */}
      {/* PAGE 6: BENCHMARKS & ENTERPRISE RISK       */}
      {/* ========================================== */}
      <Page pageNumber={6}>
        <div className="space-y-4">
          <PageHeader title="INDUSTRY BENCHMARKS & ENTERPRISE RISK" sectionNum="05" />

          {/* Industry Benchmark Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <div className="bg-[#0A1128] text-white p-2.5 flex justify-between items-center text-[9px] font-bold">
              <span className="uppercase text-[#D4AF37]">INDUSTRY BENCHMARK COMPARISON</span>
              <span className="font-mono text-slate-300">Sector: {industry}</span>
            </div>

            <table className="w-full text-left text-[8.5px]">
              <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[7.5px]">
                <tr>
                  <th className="p-2">Performance Metric</th>
                  <th className="p-2 text-center text-[#0A1128]">Your Business</th>
                  <th className="p-2 text-center text-slate-500">Industry Avg</th>
                  <th className="p-2 text-center text-emerald-600">Top 10% Leaders</th>
                  <th className="p-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white font-medium">
                <tr>
                  <td className="p-2 font-bold text-slate-800">Revenue Growth Rate</td>
                  <td className="p-2 text-center font-bold text-[#0A1128]">18%</td>
                  <td className="p-2 text-center text-slate-500">11%</td>
                  <td className="p-2 text-center font-bold text-emerald-600">27%</td>
                  <td className="p-2 text-right"><span className="bg-emerald-100 text-emerald-800 text-[7px] font-bold px-1.5 py-0.5 rounded">Above Avg</span></td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-slate-800">Gross Margin %</td>
                  <td className="p-2 text-center font-bold text-[#0A1128]">24%</td>
                  <td className="p-2 text-center text-slate-500">21%</td>
                  <td className="p-2 text-center font-bold text-emerald-600">31%</td>
                  <td className="p-2 text-right"><span className="bg-emerald-100 text-emerald-800 text-[7px] font-bold px-1.5 py-0.5 rounded">Above Avg</span></td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-slate-800">Customer Retention Rate</td>
                  <td className="p-2 text-center font-bold text-emerald-600">82%</td>
                  <td className="p-2 text-center text-slate-500">76%</td>
                  <td className="p-2 text-center font-bold text-emerald-600">91%</td>
                  <td className="p-2 text-right"><span className="bg-emerald-100 text-emerald-800 text-[7px] font-bold px-1.5 py-0.5 rounded">High Benchmark</span></td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-slate-800">Sales Productivity Index</td>
                  <td className="p-2 text-center font-bold text-amber-700">Medium</td>
                  <td className="p-2 text-center text-slate-500">Medium</td>
                  <td className="p-2 text-center font-bold text-emerald-600">High</td>
                  <td className="p-2 text-right"><span className="bg-amber-100 text-amber-800 text-[7px] font-bold px-1.5 py-0.5 rounded">Average</span></td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-slate-800">Digital Systems Adoption</td>
                  <td className="p-2 text-center font-bold text-rose-600">Low</td>
                  <td className="p-2 text-center text-slate-500">Medium</td>
                  <td className="p-2 text-center font-bold text-emerald-600">High</td>
                  <td className="p-2 text-right"><span className="bg-rose-100 text-rose-800 text-[7px] font-bold px-1.5 py-0.5 rounded">Lagging</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Where You Lead vs Where You Lag */}
          <div className="grid grid-cols-2 gap-3 text-[9px]">
            <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-3 space-y-1.5">
              <h4 className="font-extrabold text-emerald-900 uppercase text-[9.5px]">WHERE YOU LEAD THE MARKET</h4>
              <ul className="text-slate-800 space-y-1 font-medium">
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Revenue growth rate above industry average (18% vs 11%)</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Strong product quality and execution reputation</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> High client retention rate (82% repeat business)</li>
              </ul>
            </div>

            <div className="bg-rose-50/80 border border-rose-200 rounded-xl p-3 space-y-1.5">
              <h4 className="font-extrabold text-rose-900 uppercase text-[9.5px]">WHERE YOU LAG THE MARKET</h4>
              <ul className="text-slate-800 space-y-1 font-medium">
                <li className="flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" /> Digital software adoption and workflow automation</li>
                <li className="flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" /> Sales lead conversion consistency and CRM usage</li>
                <li className="flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" /> Operational process documentation and delegation</li>
              </ul>
            </div>
          </div>

          {/* Enterprise Risk Grid */}
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <div className="bg-[#0A1128] text-white p-2.5 flex justify-between items-center text-[9px] font-bold">
              <span className="uppercase text-[#D4AF37]">ENTERPRISE RISK EVALUATION GRID</span>
              <span className="font-mono text-slate-300">Risk Severity Breakdown</span>
            </div>

            <div className="p-2.5 bg-slate-50 space-y-1.5 text-[8.5px]">
              {[
                { category: "Financial Risk", severity: "Medium", desc: "Cash flow fluctuation during extended client payment cycles.", fix: "Implement strict 30-day payment terms & rolling cash flow forecast." },
                { category: "People & Talent Risk", severity: "Medium", desc: "Dependence on key technical staff without backup documentation.", fix: "Cross-train technical staff & document key delivery SOPs." },
                { category: "Operational Execution Risk", severity: "High", desc: "Manual workflow errors during high volume demand surges.", fix: "Build standardized swimlane playbooks & automated order tracking." },
                { category: "Sales Pipeline Risk", severity: "High", desc: "Inconsistent lead follow-up & unmonitored deal pipeline status.", fix: "Deploy automated sales CRM with mandatory follow-up alerts." },
                { category: "Technology & Tools Risk", severity: "Medium", desc: "Disconnected software tools requiring double data entry.", fix: "Connect CRM, accounting, and inventory databases via API integrations." },
                { category: "Founder Operational Dependency", severity: "High", desc: "Operational bottleneck due to centralized executive approval.", fix: "Delegate routine approval thresholds to department managers." },
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-2 rounded-lg border border-slate-200 flex justify-between items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-[#0A1128] text-[9px]">{item.category}</span>
                      <span className={`px-1.5 py-0.2 rounded text-[7px] font-black uppercase ${
                        item.severity === 'High' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                        'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}>
                        {item.severity}
                      </span>
                    </div>
                    <p className="text-slate-600 text-[8px] mt-0.5">{item.desc}</p>
                  </div>
                  <div className="w-56 text-right border-l border-slate-200 pl-2">
                    <span className="text-[7px] font-bold uppercase text-[#0A1128] block">Mitigation Strategy</span>
                    <span className="text-[7.5px] text-slate-700 font-medium">{item.fix}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Page>

      {/* ========================================== */}
      {/* PAGE 7: 90-DAY ROADMAP & ACTION MATRIX     */}
      {/* ========================================== */}
      <Page pageNumber={7}>
        <div className="space-y-4">
          <PageHeader title="90-DAY GROWTH ROADMAP & ACTION MATRIX" sectionNum="06" />

          {/* 90-Day Sprints */}
          <div className="space-y-2 text-[9px]">
            <div className="bg-white border-2 border-amber-400 rounded-xl p-3 shadow-xs space-y-1.5">
              <div className="flex justify-between items-center border-b border-amber-100 pb-1">
                <span className="bg-amber-500 text-white text-[8px] font-black uppercase px-2 py-0.5 rounded">
                  Phase 1: Days 1–30
                </span>
                <span className="font-extrabold text-amber-800 uppercase text-[9px]">Stabilize & Build Momentum</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-slate-700 font-medium">
                <div>&bull; <strong>Fix Sales Process:</strong> Implement CRM pipeline & lead tracking</div>
                <div>&bull; <strong>Cash Flow Focus:</strong> Audit receivables & enforce 30-day client terms</div>
                <div>&bull; <strong>Department KPIs:</strong> Define weekly scorecards for sales & ops</div>
                <div>&bull; <strong>Daily Governance:</strong> Establish 15-min daily standup review cadence</div>
              </div>
            </div>

            <div className="bg-white border-2 border-[#0A1128] rounded-xl p-3 shadow-xs space-y-1.5">
              <div className="flex justify-between items-center border-b border-slate-200 pb-1">
                <span className="bg-[#0A1128] text-white text-[8px] font-black uppercase px-2 py-0.5 rounded">
                  Phase 2: Days 31–60
                </span>
                <span className="font-extrabold text-[#0A1128] uppercase text-[9px]">Build Systems & Improve Efficiency</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-slate-700 font-medium">
                <div>&bull; <strong>Document Core SOPs:</strong> Write top 10 operational playbooks</div>
                <div>&bull; <strong>Lightweight CRM:</strong> Automate multi-channel follow-up sequences</div>
                <div>&bull; <strong>Inbound Marketing:</strong> Launch targeted digital acquisition campaigns</div>
                <div>&bull; <strong>Role Alignment:</strong> Conduct staff responsibility alignment sprints</div>
              </div>
            </div>

            <div className="bg-white border-2 border-emerald-500 rounded-xl p-3 shadow-xs space-y-1.5">
              <div className="flex justify-between items-center border-b border-emerald-100 pb-1">
                <span className="bg-emerald-600 text-white text-[8px] font-black uppercase px-2 py-0.5 rounded">
                  Phase 3: Days 61–90
                </span>
                <span className="font-extrabold text-emerald-800 uppercase text-[9px]">Scale & Increase Profitability</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-slate-700 font-medium">
                <div>&bull; <strong>Scale Lead Engines:</strong> Expand high-ROI digital channels</div>
                <div>&bull; <strong>Workflow Automation:</strong> Connect CRM with accounting & ops</div>
                <div>&bull; <strong>Performance Reviews:</strong> Institute quarterly management audits</div>
                <div>&bull; <strong>Capital Plan:</strong> Draft annual expansion & reinvestment plan</div>
              </div>
            </div>
          </div>

          {/* Priority Action Matrix Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <div className="bg-[#0A1128] text-white p-2.5 flex justify-between items-center text-[9px] font-bold">
              <span className="uppercase text-[#D4AF37]">PRIORITY ACTION MATRIX</span>
              <span className="font-mono text-slate-300">Ranked Strategic Interventions</span>
            </div>

            <table className="w-full text-left text-[8.5px]">
              <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[7.5px]">
                <tr>
                  <th className="p-2 w-8 text-center">Rank</th>
                  <th className="p-2">Strategic Action Item</th>
                  <th className="p-2">Impact</th>
                  <th className="p-2">Effort</th>
                  <th className="p-2">Owner</th>
                  <th className="p-2">Timeline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white font-medium">
                {[
                  { rank: 1, action: "Improve Sales Conversion & CRM Pipeline", impact: "High", effort: "Medium", owner: "Sales Head", timeline: "0–30 Days" },
                  { rank: 2, action: "Implement Automated Lead Follow-up System", impact: "High", effort: "Low", owner: "Sales Head", timeline: "0–30 Days" },
                  { rank: 3, action: "Document Core Operational SOP Playbooks", impact: "High", effort: "Medium", owner: "Ops Head", timeline: "30–60 Days" },
                  { rank: 4, action: "Setup Inbound Digital Marketing Engine", impact: "Medium", effort: "Medium", owner: "Mktg Head", timeline: "30–60 Days" },
                  { rank: 5, action: "Deploy Rolling Cash Flow & Payment Terms", impact: "Medium", effort: "Low", owner: "Finance Head", timeline: "0–30 Days" },
                ].map((item, idx) => (
                  <tr key={idx}>
                    <td className="p-2 font-black text-[#0A1128] text-center text-[9px]">{item.rank}</td>
                    <td className="p-2 font-bold text-slate-800">{item.action}</td>
                    <td className="p-2"><span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded text-[7px] font-bold">{item.impact}</span></td>
                    <td className="p-2"><span className="bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded text-[7px] font-bold">{item.effort}</span></td>
                    <td className="p-2 text-slate-600">{item.owner}</td>
                    <td className="p-2 font-bold text-[#0A1128]">{item.timeline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Page>

      {/* ========================================== */}
      {/* PAGE 8: KPI DASHBOARD & NEXT ENGAGEMENT    */}
      {/* ========================================== */}
      <Page pageNumber={8}>
        <div className="space-y-4">
          <PageHeader title="RECOMMENDED KPI DASHBOARD & NEXT ENGAGEMENT" sectionNum="07" />

          {/* Departmental KPI Governance Grid */}
          <div className="space-y-2">
            <h3 className="text-xs font-extrabold text-[#0A1128] uppercase tracking-wider">DEPARTMENTAL KPI GOVERNANCE FRAMEWORK</h3>
            <div className="grid grid-cols-2 gap-2 text-[8.5px]">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 space-y-1">
                <h4 className="font-extrabold text-[#0A1128] uppercase border-b border-slate-200 pb-0.5 text-[8.5px]">Sales Department</h4>
                <ul className="text-slate-700 space-y-0.5 font-medium">
                  <li>&bull; Lead Conversion % (Target: &gt;25%)</li>
                  <li>&bull; Revenue Growth % MoM (Target: &gt;15%)</li>
                  <li>&bull; Average Deal Size Expansion (Target: +10%)</li>
                </ul>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 space-y-1">
                <h4 className="font-extrabold text-[#0A1128] uppercase border-b border-slate-200 pb-0.5 text-[8.5px]">Finance Department</h4>
                <ul className="text-slate-700 space-y-0.5 font-medium">
                  <li>&bull; Gross Profit Margin % (Target: &gt;30%)</li>
                  <li>&bull; Net Profit % (Target: &gt;15%)</li>
                  <li>&bull; Cash Conversion Cycle (Target: &lt;30 Days)</li>
                </ul>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 space-y-1">
                <h4 className="font-extrabold text-[#0A1128] uppercase border-b border-slate-200 pb-0.5 text-[8.5px]">Marketing Department</h4>
                <ul className="text-slate-700 space-y-0.5 font-medium">
                  <li>&bull; Monthly Lead Volume (Target: &gt;100 Qualified)</li>
                  <li>&bull; Cost Per Lead (CPL) Optimization</li>
                  <li>&bull; Marketing ROI (Target: 4x Return)</li>
                </ul>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 space-y-1">
                <h4 className="font-extrabold text-[#0A1128] uppercase border-b border-slate-200 pb-0.5 text-[8.5px]">Operations Department</h4>
                <ul className="text-slate-700 space-y-0.5 font-medium">
                  <li>&bull; On-Time Delivery % (Target: &gt;98%)</li>
                  <li>&bull; Production & Service Efficiency %</li>
                  <li>&bull; Defect / Rejection Rate (Target: &lt;1%)</li>
                </ul>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 space-y-1">
                <h4 className="font-extrabold text-[#0A1128] uppercase border-b border-slate-200 pb-0.5 text-[8.5px]">People & HR</h4>
                <ul className="text-slate-700 space-y-0.5 font-medium">
                  <li>&bull; Employee Productivity Index</li>
                  <li>&bull; Staff Attrition Rate (Target: &lt;10%)</li>
                  <li>&bull; Training Hours Per Staff / Month</li>
                </ul>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 space-y-1">
                <h4 className="font-extrabold text-[#0A1128] uppercase border-b border-slate-200 pb-0.5 text-[8.5px]">Customer Success</h4>
                <ul className="text-slate-700 space-y-0.5 font-medium">
                  <li>&bull; Customer Retention Rate (Target: &gt;85%)</li>
                  <li>&bull; Net Promoter Score (NPS Target: &gt;60)</li>
                  <li>&bull; Repeat Order Frequency Index</li>
                </ul>
              </div>
            </div>
          </div>

          {/* AI Strategic Advisory Synthesis */}
          <div className="bg-[#0A1128] text-white p-4 rounded-xl border-2 border-[#D4AF37] relative shadow-lg space-y-2">
            <div className="text-3xl text-[#D4AF37] font-serif font-bold leading-none">“</div>
            <p className="text-[9.5px] text-slate-200 leading-relaxed font-serif italic">
              Your business has exceptional core fundamentals, strong market demand, and high client loyalty. The single highest-leverage growth unlock lies in building a predictable sales pipeline, documenting core operational playbooks, and delegating daily execution authority.
            </p>
            <p className="text-[9.5px] text-slate-200 leading-relaxed font-serif italic">
              With disciplined execution across the 90-day growth roadmap, <strong>{companyName}</strong> can seamlessly capture the <strong>₹2.4 Cr</strong> revenue opportunity while building a scalable, self-sustaining enterprise.
            </p>
            <div className="pt-2 border-t border-white/20 text-right">
              <span className="text-[9px] font-bold text-[#D4AF37] tracking-wider uppercase block">
                &mdash; KRGONE Strategic Advisory Team
              </span>
            </div>
          </div>

          {/* Recommended Next Engagement */}
          <div className="space-y-2 pt-1 border-t border-slate-200">
            <div className="bg-[#0A1128] text-white p-4 rounded-xl border-2 border-[#D4AF37] text-center space-y-2 shadow-xl">
              <span className="text-[8.5px] text-[#D4AF37] font-extrabold uppercase tracking-widest bg-[#D4AF37]/10 px-3 py-1 rounded border border-[#D4AF37]/30 inline-block">
                RECOMMENDED NEXT STEP
              </span>
              <h3 className="text-lg font-black text-white">Full Business Growth Diagnostic™ Strategy Engagement</h3>
              <p className="text-[9.5px] text-slate-300 leading-relaxed max-w-md mx-auto">
                A hands-on, 60-minute strategy session with senior KRGONE systems advisors to implement these diagnostic findings and build your custom execution roadmap.
              </p>

              <div className="pt-2 border-t border-white/10 flex flex-wrap justify-center gap-4 text-[9px] text-[#D4AF37] font-bold">
                <span>📞 +91 73003 00330</span>
                <span>✉ enquiry.krgone@gmail.com</span>
                <span>🌐 krgone.vercel.app</span>
              </div>
            </div>

            <div className="text-center py-2.5 bg-amber-50 border border-amber-200 rounded-xl space-y-0.5">
              <h4 className="text-[10.5px] font-black text-[#0A1128] uppercase tracking-wider">Together, let's build a stronger, more profitable business.</h4>
              <p className="text-[10px] font-serif font-bold text-[#D4AF37]">KRGONE Business Growth Operating System™</p>
              <p className="text-[8px] text-slate-500 font-medium pt-0.5 border-t border-amber-200/60 max-w-sm mx-auto">
                Turning Knowledge into Revenue Growth &bull; A Brand of KRG Business Solutions
              </p>
            </div>
          </div>
        </div>
      </Page>

    </div>
  );
}
