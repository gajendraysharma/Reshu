import React from 'react';
import {
  User,
  TrendingUp,
  Megaphone,
  Settings,
  Coins,
  Users,
  Monitor,
  Trophy,
  AlertTriangle,
  Landmark,
  CheckCircle2,
  Compass,
  Building2,
  BarChart2,
  Check,
  XCircle
} from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';

interface PillarsAnalysisTabProps {
  formData?: Record<string, any>;
  globalScore?: number;
  pillarScores?: number[];
  lowestPillar?: { name: string; score: number };
  setActiveTab?: (tab: string) => void;
}

interface PillarData {
  id: number;
  title: string;
  defaultScore: number;
  benchmarkScore: number;
  badge: string;
  iconBg: string;
  iconColor: string;
  icon: React.ElementType;
  strength: string;
  gap: string;
  action: string;
}

const DEFAULT_PILLARS: PillarData[] = [
  {
    id: 1,
    title: "1. Leadership & Vision",
    defaultScore: 82,
    benchmarkScore: 68,
    badge: "Good",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    icon: User,
    strength: "Clear vision and strong leadership direction",
    gap: "High daily operational dependency on founder",
    action: "Delegate authority & build middle-management bench"
  },
  {
    id: 2,
    title: "2. Sales & Revenue",
    defaultScore: 48,
    benchmarkScore: 58,
    badge: "Needs Attention",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    icon: TrendingUp,
    strength: "Strong existing customer repeat relationship",
    gap: "Inconsistent and manual pipeline conversions",
    action: "Implement formal CRM playbook & pipeline tracking"
  },
  {
    id: 3,
    title: "3. Marketing & Customer Growth",
    defaultScore: 61,
    benchmarkScore: 54,
    badge: "Average",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    icon: Megaphone,
    strength: "Solid brand reputation in primary local market",
    gap: "Limited multi-channel digital lead engine",
    action: "Build automated digital capture & referral channels"
  },
  {
    id: 4,
    title: "4. Operations & Process",
    defaultScore: 65,
    benchmarkScore: 62,
    badge: "Average",
    iconBg: "bg-teal-50",
    iconColor: "text-teal-600",
    icon: Settings,
    strength: "Core operating procedures are partially defined",
    gap: "Workflows rely on tribal memory rather than written SOPs",
    action: "Document digital SOP wiki & standardize checklists"
  },
  {
    id: 5,
    title: "5. Finance & Business Health",
    defaultScore: 79,
    benchmarkScore: 66,
    badge: "Good",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    icon: Coins,
    strength: "Healthy gross margins & solid core revenue",
    gap: "Trailing financial reports limit forward cash forecasting",
    action: "Implement bi-weekly dynamic cash flow forecasting"
  },
  {
    id: 6,
    title: "6. People & Organization",
    defaultScore: 42,
    benchmarkScore: 52,
    badge: "Needs Attention",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    icon: Users,
    strength: "Committed core staff and loyal team foundation",
    gap: "Overlapping role scopes & subjective performance reviews",
    action: "Define objective job scorecards & KPI alignment"
  },
  {
    id: 7,
    title: "7. Digital & Technology",
    defaultScore: 58,
    benchmarkScore: 48,
    badge: "Average",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    icon: Monitor,
    strength: "Basic software tools deployed across core functions",
    gap: "Disconnected systems require manual data re-entry",
    action: "Integrate core platforms via APIs & automate intake"
  }
];

export const PillarsAnalysisTab: React.FC<PillarsAnalysisTabProps> = ({
  formData = {},
  pillarScores,
  setActiveTab
}) => {
  const industryName = formData.industry || formData.industryType || "Manufacturing";
  const companyName = formData.companyName || "ABC Manufacturing Pvt. Ltd.";

  const pillars = DEFAULT_PILLARS.map((p, index) => {
    const score = (pillarScores && pillarScores[index] !== undefined) ? pillarScores[index] : p.defaultScore;
    const benchmark = p.benchmarkScore;
    const variance = score - benchmark;

    let badge = "Average";
    if (score >= 70) badge = "Good";
    else if (score < 50) badge = "Needs Attention";

    return {
      ...p,
      score,
      benchmark,
      variance,
      badge
    };
  });

  const totalScore = pillars.reduce((acc, p) => acc + p.score, 0);
  const avgScore = Math.round(totalScore / pillars.length);

  const totalBenchmark = pillars.reduce((acc, p) => acc + p.benchmark, 0);
  const avgBenchmark = Math.round(totalBenchmark / pillars.length);
  const netVariance = avgScore - avgBenchmark;

  const strongest = [...pillars].sort((a, b) => b.score - a.score)[0];
  const weakest = [...pillars].sort((a, b) => a.score - b.score)[0];

  return (
    <div className="space-y-6 font-sans">

      {/* HEADER BANNER WITH EXPLICIT INDUSTRY NAME */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white border border-slate-800 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Building2 className="w-4 h-4 text-amber-400" />
              <span className="text-[11px] font-black uppercase tracking-widest text-amber-400">
                Industry Benchmark Analysis — {industryName} Sector
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">
              7-Pillar Maturity vs. {industryName} Industry Benchmark
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Granular performance comparison for <strong className="text-white">{companyName}</strong> evaluating your 7 operational pillars directly against average benchmarks in the <strong className="text-amber-300">{industryName}</strong> industry segment.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-xl border border-white/15 shrink-0 text-center">
            <span className="text-[10px] font-mono text-slate-300 uppercase tracking-widest block">Sector Variance</span>
            <span className={`text-2xl font-black ${netVariance >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {netVariance >= 0 ? `+${netVariance}%` : `${netVariance}%`}
            </span>
            <span className="text-[10px] font-bold text-amber-300 block">vs {industryName} Avg</span>
          </div>
        </div>
      </div>

      {/* SUMMARY METRICS GRID */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
        
        {/* Col 1: Your Avg Score */}
        <div className="flex items-center justify-between pr-0 sm:pr-4">
          <div className="space-y-0.5">
            <span className="text-xs font-semibold text-slate-500">Your Average Score</span>
            <div className="text-3xl font-extrabold text-slate-900 leading-tight">
              {avgScore}%
            </div>
            <span className={`text-xs font-semibold ${
              avgScore >= 70 ? 'text-emerald-600' : avgScore >= 50 ? 'text-amber-600' : 'text-rose-600'
            }`}>
              {avgScore >= 70 ? 'Strong Performance' : avgScore >= 50 ? 'Moderate Maturity' : 'Critical Gaps'}
            </span>
          </div>

          <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
            <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-100"
                strokeWidth="4"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={avgScore >= 70 ? 'text-emerald-500' : avgScore >= 50 ? 'text-amber-500' : 'text-rose-500'}
                strokeWidth="4"
                strokeDasharray={`${avgScore}, 100`}
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
          </div>
        </div>

        {/* Col 2: Industry Benchmark Score */}
        <div className="flex items-center gap-3 pt-4 sm:pt-0 sm:pl-4 pr-0 sm:pr-4">
          <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 block">{industryName} Benchmark</span>
            <span className="text-2xl font-black text-indigo-900 block leading-tight">{avgBenchmark}%</span>
            <span className="text-[10px] text-slate-400 font-bold">Sector Average Baseline</span>
          </div>
        </div>

        {/* Col 3: Strongest Pillar */}
        <div className="flex items-center gap-3 pt-4 lg:pt-0 sm:pl-4 pr-0 sm:pr-4">
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 block">Strongest Pillar</span>
            <span className="text-sm font-bold text-emerald-600 block line-clamp-1">{strongest.title.replace(/^\d+\.\s*/, '')}</span>
            <span className="text-sm font-extrabold text-slate-800">{strongest.score}% <span className="text-[10px] font-normal text-slate-400">(Benchmark: {strongest.benchmark}%)</span></span>
          </div>
        </div>

        {/* Col 4: Weakest Pillar */}
        <div className="flex items-center gap-3 pt-4 lg:pt-0 sm:pl-4">
          <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 block">Primary Bottleneck</span>
            <span className="text-sm font-bold text-rose-600 block line-clamp-1">{weakest.title.replace(/^\d+\.\s*/, '')}</span>
            <span className="text-sm font-extrabold text-slate-800">{weakest.score}% <span className="text-[10px] font-normal text-slate-400">(Benchmark: {weakest.benchmark}%)</span></span>
          </div>
        </div>

      </div>

      {/* 7-PILLAR PERFORMANCE RADAR CHART COMPARISON */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-500" />
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">
                7-Pillar Performance Radar — {companyName} vs. {industryName} Industry Benchmark
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Visual polygon overlay contrasting your actual operational scores against established {industryName} sector standards.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold shrink-0">
            <span className="flex items-center gap-1.5 text-amber-600">
              <span className="w-3 h-3 rounded-full bg-amber-500 border border-amber-600 inline-block"></span>
              {companyName} ({avgScore}%)
            </span>
            <span className="flex items-center gap-1.5 text-indigo-600">
              <span className="w-3 h-3 rounded-full bg-indigo-500 border border-indigo-600 inline-block"></span>
              {industryName} Benchmark ({avgBenchmark}%)
            </span>
          </div>
        </div>

        <div className="w-full h-[340px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={pillars.map(p => ({
              pillar: p.title.replace(/^\d+\.\s*/, ''),
              'Your Score': p.score,
              'Industry Benchmark': p.benchmark
            }))}>
              <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" />
              <PolarAngleAxis dataKey="pillar" tick={{ fill: '#334155', fontSize: 11, fontWeight: 700 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#cbd5e1" tick={{ fill: '#64748b', fontSize: 10 }} />
              <Radar name={`${companyName} Score`} dataKey="Your Score" stroke="#d4af37" fill="#d4af37" fillOpacity={0.4} strokeWidth={2.5} />
              <Radar name={`${industryName} Benchmark`} dataKey="Industry Benchmark" stroke="#6366f1" fill="#6366f1" fillOpacity={0.15} strokeWidth={2} strokeDasharray="4 4" />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px', fontWeight: 'bold' }} />
              <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px', fontWeight: 'bold' }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* EXECUTIVE PILLAR VS INDUSTRY BENCHMARK MATRIX TABLE */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-amber-500" />
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">
              Executive Pillar vs. {industryName} Industry Benchmark Matrix
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400 uppercase">Sector: {industryName}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 uppercase text-[9.5px] font-black tracking-wider">
                <th className="py-2.5 px-3">Operational Pillar</th>
                <th className="py-2.5 px-3 text-center">Your Score</th>
                <th className="py-2.5 px-3 text-center">{industryName} Benchmark</th>
                <th className="py-2.5 px-3 text-center">Variance</th>
                <th className="py-2.5 px-3 text-center">Sector Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {pillars.map((p) => {
                const isAbove = p.variance >= 0;
                return (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-3 font-bold text-slate-900">
                      {p.title}
                    </td>
                    <td className="py-3 px-3 text-center font-black text-slate-900">
                      <span className={`inline-block px-2.5 py-0.5 rounded font-mono ${
                        p.score >= 70 ? 'bg-emerald-50 text-emerald-700' :
                        p.score >= 50 ? 'bg-amber-50 text-amber-700' :
                        'bg-rose-50 text-rose-700'
                      }`}>
                        {p.score}%
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center font-bold font-mono text-slate-600 bg-slate-50/40">
                      {p.benchmark}%
                    </td>
                    <td className="py-3 px-3 text-center font-black font-mono">
                      <span className={isAbove ? 'text-emerald-600' : 'text-rose-600'}>
                        {isAbove ? `+${p.variance}%` : `${p.variance}%`}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${
                        isAbove
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border-rose-200'
                      }`}>
                        {isAbove ? <Check className="w-3 h-3 stroke-[3]" /> : <XCircle className="w-3 h-3 stroke-[2.5]" />}
                        {isAbove ? `Above ${industryName} Benchmark` : `Below ${industryName} Benchmark`}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 7 PILLARS DETAILED CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          const isGood = pillar.score >= 70;
          const isNeedsAttention = pillar.score < 50;

          const scoreTextColor = isGood ? 'text-emerald-600' : isNeedsAttention ? 'text-rose-600' : 'text-amber-500';
          const barBgColor = isGood ? 'bg-emerald-500' : isNeedsAttention ? 'bg-rose-500' : 'bg-amber-500';
          const badgeStyle = isGood
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
            : isNeedsAttention
            ? 'bg-rose-50 text-rose-600 border-rose-200'
            : 'bg-amber-50 text-amber-600 border-amber-200';

          const isAboveBenchmark = pillar.variance >= 0;

          return (
            <div
              key={pillar.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-all duration-200 relative overflow-hidden"
            >
              {/* Pillar Card Header */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-9 h-9 rounded-full ${pillar.iconBg} ${pillar.iconColor} flex items-center justify-center shrink-0`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${badgeStyle}`}>
                    {pillar.badge}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm leading-snug">
                  {pillar.title}
                </h3>

                {/* DUAL SCORE COMPARISON DISPLAY */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-mono text-slate-400 uppercase block">Your Current Score</span>
                      <span className={`text-2xl font-black ${scoreTextColor}`}>
                        {pillar.score}%
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] font-mono text-slate-400 uppercase block">{industryName} Benchmark</span>
                      <span className="text-2xl font-black text-slate-700 font-mono">
                        {pillar.benchmark}%
                      </span>
                    </div>
                  </div>

                  {/* Variance Pill */}
                  <div className="pt-1.5 border-t border-slate-200/60 flex items-center justify-between text-[10px] font-extrabold">
                    <span className="text-slate-500">Benchmark Gap:</span>
                    <span className={isAboveBenchmark ? 'text-emerald-700' : 'text-rose-600'}>
                      {isAboveBenchmark ? `+${pillar.variance}% Above` : `${pillar.variance}% Below`} Benchmark
                    </span>
                  </div>
                </div>

                {/* Progress Bar with Benchmark Line Marker */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[9px] font-bold text-slate-400">
                    <span>Your Score</span>
                    <span>Industry Benchmark ({pillar.benchmark}%)</span>
                  </div>
                  <div className="relative w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    {/* User Score Bar */}
                    <div
                      className={`h-full ${barBgColor} rounded-full transition-all duration-500`}
                      style={{ width: `${pillar.score}%` }}
                    />
                    {/* Industry Benchmark Marker Line */}
                    <div
                      className="absolute top-0 bottom-0 w-1 bg-slate-900 shadow-sm z-10"
                      style={{ left: `${pillar.benchmark}%` }}
                      title={`Industry Benchmark for ${industryName}: ${pillar.benchmark}%`}
                    />
                  </div>
                </div>
              </div>

              {/* 3 Detail Rows: Strength, Gap, Action */}
              <div className="space-y-2.5 pt-3 border-t border-slate-100 text-xs">
                {/* Strength */}
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-bold text-slate-900 shrink-0">Strength</span>
                    <span className="text-slate-600 font-normal leading-tight">{pillar.strength}</span>
                  </div>
                </div>

                {/* Gap */}
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-bold text-slate-900 shrink-0">Gap</span>
                    <span className="text-slate-600 font-normal leading-tight">{pillar.gap}</span>
                  </div>
                </div>

                {/* Action */}
                <div className="flex items-start gap-2">
                  <Compass className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-bold text-slate-900 shrink-0">Action</span>
                    <span className="text-slate-600 font-normal leading-tight">{pillar.action}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

