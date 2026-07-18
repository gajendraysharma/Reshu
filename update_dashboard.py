import re

with open('src/components/DashboardReport.tsx', 'r') as f:
    content = f.read()

# Replace the entire file
new_content = """import React from 'react';
import { motion } from 'motion/react';
import { 
  Building2, User, Target, BarChart3, PieChart, LayoutGrid, 
  Lightbulb, Briefcase, TrendingUp, AlertTriangle, CheckCircle2, 
  ArrowRight, ShieldCheck, Download, Printer, Compass, 
  Activity, Star, Zap, Anchor, LineChart
} from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer, Tooltip 
} from 'recharts';

interface DashboardReportProps {
  formData: any;
  scores: number[];
}

export default function DashboardReport({ formData, scores }: DashboardReportProps) {
  
  const pillars = [
    "Leadership & Vision",
    "Sales & Revenue",
    "Marketing & Customer Growth",
    "Operations & Process",
    "Finance & Business Performance",
    "People & Leadership",
    "Technology & Business Innovation"
  ];

  const getPillarScore = (pillarIdx: number): number => {
    const start = pillarIdx * 3;
    const total = (scores[start] || 0) + (scores[start+1] || 0) + (scores[start+2] || 0);
    return Math.round((total / 15) * 100);
  };

  const globalScore = Math.round(
    [0, 1, 2, 3, 4, 5, 6].reduce((acc, curr) => acc + getPillarScore(curr), 0) / 7
  );

  const getMaturityLevel = (score: number) => {
    if (score < 40) return "Critical";
    if (score < 60) return "Developing";
    if (score < 75) return "Stable";
    if (score < 90) return "Growing";
    return "High Performing";
  };

  const confidenceScore = (scores[21] || 0) * 20; // Last question is 21 (1-5 scaled to 100)

  const radarData = pillars.map((name, i) => ({
    pillar: name,
    score: getPillarScore(i),
    industryAvg: 65,
  }));

  const sortedPillars = [...pillars].map((name, i) => ({ name, score: getPillarScore(i) }))
    .sort((a, b) => b.score - a.score);
  
  const topStrengths = sortedPillars.slice(0, 3);
  const improvementAreas = sortedPillars.slice(-3).reverse();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-[#050a1f] min-h-screen pb-20 font-sans print:bg-white print:pb-0 animate-in fade-in duration-1000">
      
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-50 bg-[#0a1128] text-white py-4 px-6 md:px-12 shadow-[0_4px_20px_rgba(0,0,0,0.6)] border-b border-[#d4af37]/30 flex justify-between items-center print:hidden">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#d4af37] to-[#b38f25] rounded-xl flex items-center justify-center shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_4px_8px_rgba(0,0,0,0.5)] border-t border-l border-white/40">
            <ShieldCheck className="text-[#050a1f] w-6 h-6" />
          </div>
          <span className="font-black tracking-widest text-lg text-[#d4af37] drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">KRG ONE</span>
        </div>
        <div className="flex gap-4">
          <button onClick={handlePrint} className="flex items-center gap-2 text-sm font-bold bg-[#050a1f] text-[#d4af37] px-5 py-2.5 rounded-xl hover:bg-black transition-colors border-t-2 border-l-2 border-b-4 border-r-4 border-t-[#1a2340] border-l-[#1a2340] border-b-black border-r-black shadow-[4px_4px_10px_rgba(0,0,0,0.5)] transform hover:-translate-y-0.5 active:translate-y-0.5">
            <Printer className="w-4 h-4" /> Print Report
          </button>
        </div>
      </div>

      <div className="max-w-[1050px] mx-auto pt-10 px-4 md:px-6 space-y-12 print:space-y-8 print:p-0">
        
        {/* Cover / Header */}
        <div className="text-center space-y-6 mb-16 print:mb-8 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-32 bg-[#d4af37]/10 blur-[100px] rounded-full pointer-events-none"></div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] relative z-10">Business Growth <br className="md:hidden" />Intelligence Dashboard™</h1>
          <div className="inline-block bg-[#0a1128] border border-[#d4af37]/50 px-8 py-3 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.15)] relative z-10">
            <p className="text-[#d4af37] font-black tracking-widest uppercase text-sm md:text-base">Executive Consulting Report</p>
          </div>
        </div>

        {/* PAGE 1: Business Profile & Snapshot */}
        <section className="bg-[#0a1128] rounded-3xl shadow-[10px_15px_30px_rgba(0,0,0,0.6)] border-t-2 border-l-2 border-b-4 border-r-4 border-t-[#1a2340] border-l-[#1a2340] border-b-black border-r-black p-8 md:p-12 print:shadow-none print:border-none print:p-0 print:break-after-page print:bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="mb-10 border-b-2 border-[#d4af37]/20 pb-4 relative z-10">
            <h2 className="text-2xl font-black text-white flex items-center gap-3 print:text-black">
              <span className="w-8 h-8 rounded-full bg-[#d4af37] text-[#0a1128] flex items-center justify-center text-sm">1</span> 
              Business Profile Summary™
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-12 relative z-10">
            <div className="space-y-4">
              <div className="flex flex-col border-b border-white/10 pb-3 print:border-black/10">
                <span className="text-[#d4af37] font-bold text-xs uppercase tracking-widest mb-1">Company Name</span>
                <span className="text-white font-black text-lg print:text-black">{formData.companyName || 'N/A'}</span>
              </div>
              <div className="flex flex-col border-b border-white/10 pb-3 print:border-black/10">
                <span className="text-[#d4af37] font-bold text-xs uppercase tracking-widest mb-1">Business Owner</span>
                <span className="text-white font-black text-lg print:text-black">{formData.fullName || 'N/A'}</span>
              </div>
              <div className="flex flex-col border-b border-white/10 pb-3 print:border-black/10">
                <span className="text-[#d4af37] font-bold text-xs uppercase tracking-widest mb-1">Designation</span>
                <span className="text-white font-black text-lg print:text-black">{formData.role || 'N/A'}</span>
              </div>
              <div className="flex flex-col border-b border-white/10 pb-3 print:border-black/10">
                <span className="text-[#d4af37] font-bold text-xs uppercase tracking-widest mb-1">Industry</span>
                <span className="text-white font-black text-lg print:text-black">{formData.industry || 'N/A'}</span>
              </div>
              <div className="flex flex-col border-b border-white/10 pb-3 print:border-black/10">
                <span className="text-[#d4af37] font-bold text-xs uppercase tracking-widest mb-1">Business Size</span>
                <span className="text-white font-black text-lg print:text-black">{formData.businessSize || 'N/A'}</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col border-b border-white/10 pb-3 print:border-black/10">
                <span className="text-[#d4af37] font-bold text-xs uppercase tracking-widest mb-1">Annual Revenue</span>
                <span className="text-white font-black text-lg print:text-black">{formData.revenue || 'N/A'}</span>
              </div>
              <div className="flex flex-col border-b border-white/10 pb-3 print:border-black/10">
                <span className="text-[#d4af37] font-bold text-xs uppercase tracking-widest mb-1">Business Goal</span>
                <span className="text-white font-black text-lg print:text-black">{formData.goal || 'N/A'}</span>
              </div>
              <div className="flex flex-col border-b border-white/10 pb-3 print:border-black/10">
                <span className="text-[#d4af37] font-bold text-xs uppercase tracking-widest mb-1">Challenges</span>
                <span className="text-white font-black text-lg print:text-black">{formData.challenges?.join(', ') || 'N/A'}</span>
              </div>
              <div className="flex flex-col border-b border-white/10 pb-3 print:border-black/10">
                <span className="text-[#d4af37] font-bold text-xs uppercase tracking-widest mb-1">Assessment Date</span>
                <span className="text-white font-black text-lg print:text-black">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex flex-col border-b border-white/10 pb-3 print:border-black/10">
                <span className="text-[#d4af37] font-bold text-xs uppercase tracking-widest mb-1">Assessment ID</span>
                <span className="text-white font-black text-lg font-mono print:text-black">KRG-{Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
              </div>
            </div>
          </div>

          <div className="bg-[#050a1f] rounded-2xl p-8 border-t-2 border-l-2 border-b-4 border-r-4 border-t-white/5 border-l-white/5 border-b-black border-r-black mb-12 shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)] relative z-10 print:bg-white print:border-black/20">
            <h3 className="text-xl font-black text-white mb-4 flex items-center gap-3 print:text-black">
              <Star className="w-6 h-6 text-[#d4af37]" /> Executive Business Summary™
            </h3>
            <p className="text-slate-300 leading-relaxed text-sm md:text-base font-medium print:text-slate-700">
              Based on the diagnostic parameters evaluated, <strong className="text-white print:text-black">{formData.companyName || "the organization"}</strong> is currently positioned at a <strong className="text-[#d4af37]">{getMaturityLevel(globalScore)}</strong> stage with an Overall Business Growth Score™ of <strong className="text-[#d4af37]">{globalScore}%</strong>. The primary growth outlook suggests substantial upside potential if foundational operational systems are fortified. The biggest opportunity lies in scaling <strong className="text-white print:text-black">{topStrengths[0]?.name || 'Operations'}</strong>, where existing capabilities can be leveraged for market advantage. However, the most critical concern is identified within <strong className="text-white print:text-black">{improvementAreas[0]?.name || 'Finance'}</strong>, which currently poses a structural risk to sustainable expansion. Our executive recommendation is to immediately stabilize these core vulnerabilities while executing a phased 90-day integration plan to align strategic execution with the primary goal of <strong className="text-white print:text-black">{formData.goal || "sustainable growth"}</strong>.
            </p>
          </div>

          <h3 className="text-xl font-black text-white mb-6 relative z-10 print:text-black">Business Snapshot Cards</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-5 relative z-10">
            <div className="bg-gradient-to-br from-[#d4af37] to-[#b38f25] text-[#050a1f] p-5 rounded-2xl shadow-[4px_6px_15px_rgba(212,175,55,0.2)] border-t border-l border-white/40 flex flex-col items-center justify-center text-center transform hover:-translate-y-1 transition-transform">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">Growth Score™</span>
              <span className="text-4xl font-black">{globalScore}%</span>
            </div>
            <div className="bg-[#050a1f] border-t-2 border-l-2 border-b-4 border-r-4 border-t-white/10 border-l-white/10 border-b-black border-r-black p-5 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center print:bg-white print:border-black/20">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] mb-2">Maturity Level™</span>
              <span className="text-lg font-black text-white print:text-black">{getMaturityLevel(globalScore)}</span>
            </div>
            <div className="bg-[#050a1f] border-t-2 border-l-2 border-b-4 border-r-4 border-t-white/10 border-l-white/10 border-b-black border-r-black p-5 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center print:bg-white print:border-black/20">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] mb-2">Confidence</span>
              <span className="text-3xl font-black text-white print:text-black">{confidenceScore}%</span>
            </div>
            <div className="bg-[#050a1f] border-t-2 border-l-2 border-b-4 border-r-4 border-t-white/10 border-l-white/10 border-b-black border-r-black p-5 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center print:bg-white print:border-black/20">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] mb-2">Business Health</span>
              <span className={`text-lg font-black ${globalScore >= 75 ? 'text-white' : globalScore >= 50 ? 'text-[#d4af37]' : 'text-slate-400'}`}>
                {globalScore >= 75 ? 'Optimal' : globalScore >= 50 ? 'Moderate' : 'At Risk'}
              </span>
            </div>
            <div className="bg-[#050a1f] border-t-2 border-l-2 border-b-4 border-r-4 border-t-white/10 border-l-white/10 border-b-black border-r-black p-5 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center print:bg-white print:border-black/20">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] mb-2">Industry Benchmark</span>
              <span className="text-2xl font-black text-white print:text-black">65%</span>
            </div>
          </div>
        </section>

        {/* PAGE 2: Growth Analysis */}
        <section className="bg-[#0a1128] rounded-3xl shadow-[10px_15px_30px_rgba(0,0,0,0.6)] border-t-2 border-l-2 border-b-4 border-r-4 border-t-[#1a2340] border-l-[#1a2340] border-b-black border-r-black p-8 md:p-12 print:shadow-none print:border-none print:p-0 print:break-after-page print:bg-white relative overflow-hidden">
          <div className="mb-10 border-b-2 border-[#d4af37]/20 pb-4 relative z-10">
            <h2 className="text-2xl font-black text-white flex items-center gap-3 print:text-black">
              <span className="w-8 h-8 rounded-full bg-[#d4af37] text-[#0a1128] flex items-center justify-center text-sm">2</span> 
              Business Growth Analysis™
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16 relative z-10">
            <div>
              <h3 className="text-xl font-black text-white mb-8 flex items-center gap-3 print:text-black">
                <BarChart3 className="w-6 h-6 text-[#d4af37]" /> Pillar Performance
              </h3>
              <div className="space-y-6">
                {pillars.map((pillar, i) => {
                  const score = getPillarScore(i);
                  const status = score >= 75 ? 'Strong' : score >= 50 ? 'Developing' : 'Action Required';
                  const priority = score < 50 ? 'High' : score < 75 ? 'Medium' : 'Low';
                  
                  return (
                    <div key={i} className="flex flex-col gap-2">
                      <div className="flex justify-between items-end">
                        <span className="text-sm font-bold text-white print:text-black">{i + 1}. {pillar}</span>
                        <span className="text-sm font-black text-[#d4af37]">{score}%</span>
                      </div>
                      <div className="w-full h-3 bg-[#050a1f] rounded-full overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] print:bg-slate-200">
                        <div className={`h-full ${score >= 75 ? 'bg-gradient-to-r from-white to-slate-200' : score >= 50 ? 'bg-gradient-to-r from-[#d4af37] to-[#b38f25]' : 'bg-gradient-to-r from-slate-600 to-slate-800'}`} style={{ width: `${score}%` }}></div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Status: <span className="text-white print:text-black">{status}</span></span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Priority: <span className="text-white print:text-black">{priority}</span></span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="bg-[#050a1f] rounded-3xl p-8 border-t-2 border-l-2 border-b-4 border-r-4 border-t-white/5 border-l-white/5 border-b-black border-r-black h-full flex flex-col justify-center shadow-[inset_0_10px_30px_rgba(0,0,0,0.8)] print:bg-white print:border-black/20 print:shadow-none">
              <h3 className="text-sm font-black text-white mb-6 text-center uppercase tracking-widest print:text-black">Interactive Radar Chart™</h3>
              <div className="w-full aspect-square max-h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                    <PolarGrid stroke="#1e293b" />
                    <PolarAngleAxis dataKey="pillar" tick={{ fill: '#94a3b8', fontSize: 9, fontWeight: 700 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar name="Your Score" dataKey="score" stroke="#ffffff" strokeWidth={2} fill="#ffffff" fillOpacity={0.1} />
                    <Radar name="Industry Average" dataKey="industryAvg" stroke="#d4af37" strokeDasharray="3 3" fill="transparent" />
                    <Tooltip contentStyle={{ backgroundColor: '#0a1128', borderColor: '#1e293b', color: '#fff' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-8 mt-6">
                <div className="flex items-center gap-2"><span className="w-4 h-4 bg-white/20 border border-white rounded-sm"></span><span className="text-xs font-bold text-slate-300 print:text-slate-700">Your Score</span></div>
                <div className="flex items-center gap-2"><span className="w-4 h-4 border border-[#d4af37] border-dashed rounded-sm"></span><span className="text-xs font-bold text-slate-300 print:text-slate-700">Industry Avg</span></div>
              </div>
            </div>
          </div>

          <div className="relative z-10">
             <h3 className="text-xl font-black text-white mb-8 flex items-center gap-3 print:text-black">
                <LayoutGrid className="w-6 h-6 text-[#d4af37]" /> Growth Priority Matrix™
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#050a1f] border-t-2 border-l-2 border-b-4 border-r-4 border-t-white/10 border-l-white/10 border-b-black border-r-black p-6 rounded-2xl shadow-lg relative overflow-hidden print:bg-white print:border-black/20">
                  <div className="absolute top-0 left-0 w-1 h-full bg-white"></div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-white mb-4 pl-2 print:text-black">High Impact / Quick Wins</h4>
                  <ul className="space-y-3 pl-2">
                    <li className="text-sm font-bold text-slate-300 flex items-start gap-3 print:text-slate-700"><CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5 print:text-black"/> {improvementAreas[0]?.name || 'N/A'} Optimization</li>
                    <li className="text-sm font-bold text-slate-300 flex items-start gap-3 print:text-slate-700"><CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5 print:text-black"/> Process Standardization</li>
                  </ul>
                </div>
                <div className="bg-[#050a1f] border-t-2 border-l-2 border-b-4 border-r-4 border-t-white/10 border-l-white/10 border-b-black border-r-black p-6 rounded-2xl shadow-lg relative overflow-hidden print:bg-white print:border-black/20">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#d4af37]"></div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-[#d4af37] mb-4 pl-2">High Impact / Strategic</h4>
                  <ul className="space-y-3 pl-2">
                    <li className="text-sm font-bold text-slate-300 flex items-start gap-3 print:text-slate-700"><CheckCircle2 className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5"/> {improvementAreas[1]?.name || 'N/A'} Integration</li>
                    <li className="text-sm font-bold text-slate-300 flex items-start gap-3 print:text-slate-700"><CheckCircle2 className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5"/> Leadership Alignment</li>
                  </ul>
                </div>
                <div className="bg-[#050a1f] border-t-2 border-l-2 border-b-4 border-r-4 border-t-white/5 border-l-white/5 border-b-black border-r-black p-6 rounded-2xl shadow-lg relative overflow-hidden print:bg-white print:border-black/20">
                  <div className="absolute top-0 left-0 w-1 h-full bg-slate-500"></div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 pl-2 print:text-slate-600">Medium Priority</h4>
                  <ul className="space-y-3 pl-2">
                    <li className="text-sm font-bold text-slate-300 flex items-start gap-3 print:text-slate-700"><CheckCircle2 className="w-5 h-5 text-slate-500 shrink-0 mt-0.5"/> {topStrengths[1]?.name || 'N/A'} Enhancement</li>
                  </ul>
                </div>
                <div className="bg-[#050a1f] border-t-2 border-l-2 border-b-4 border-r-4 border-t-white/5 border-l-white/5 border-b-black border-r-black p-6 rounded-2xl shadow-lg relative overflow-hidden opacity-80 print:bg-white print:border-black/20 print:opacity-100">
                  <div className="absolute top-0 left-0 w-1 h-full bg-slate-700 print:bg-slate-300"></div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4 pl-2 print:text-slate-500">Monitor</h4>
                  <ul className="space-y-3 pl-2">
                    <li className="text-sm font-bold text-slate-400 flex items-start gap-3 print:text-slate-600"><CheckCircle2 className="w-5 h-5 text-slate-600 shrink-0 mt-0.5 print:text-slate-400"/> {topStrengths[0]?.name || 'N/A'} Maintenance</li>
                  </ul>
                </div>
              </div>
          </div>
        </section>

        {/* PAGE 3: AI Growth Advisory */}
        <section className="bg-[#0a1128] rounded-3xl shadow-[10px_15px_30px_rgba(0,0,0,0.6)] border-t-2 border-l-2 border-b-4 border-r-4 border-t-[#1a2340] border-l-[#1a2340] border-b-black border-r-black p-8 md:p-12 print:shadow-none print:border-none print:p-0 print:break-after-page print:bg-white relative overflow-hidden">
          <div className="mb-10 border-b-2 border-[#d4af37]/20 pb-4 relative z-10">
            <h2 className="text-2xl font-black text-white flex items-center gap-3 print:text-black">
              <span className="w-8 h-8 rounded-full bg-[#d4af37] text-[#0a1128] flex items-center justify-center text-sm">3</span> 
              KRG ONE AI Growth Advisory™
            </h2>
          </div>
          
          <div className="bg-[#050a1f] border-t-2 border-l-2 border-b-4 border-r-4 border-t-[#d4af37]/30 border-l-[#d4af37]/30 border-b-black border-r-black p-8 rounded-2xl mb-12 shadow-[0_10px_30px_rgba(0,0,0,0.8)] relative overflow-hidden print:bg-white print:border-black/20 print:shadow-none z-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/4 print:hidden"></div>
            <h3 className="text-xl font-black text-[#d4af37] mb-4 flex items-center gap-2"><Zap className="w-5 h-5"/> Executive Observation</h3>
            <p className="text-slate-200 print:text-slate-700 font-medium leading-relaxed relative z-10 text-lg">
              Operating within the {formData.industry || "current"} sector at your revenue scale of {formData.revenue || "current revenue"}, achieving your primary goal requires a fundamental shift from operator-led activity to system-led growth. Your Assessment Score of <strong className="text-white print:text-black">{globalScore}%</strong> indicates that while core competencies exist, execution inconsistencies are suppressing profitability.
            </p>
          </div>

          <h3 className="text-xl font-black text-white mb-6 relative z-10 print:text-black">Immediate Priorities</h3>
          <div className="space-y-6 mb-16 relative z-10">
            {[1, 2, 3].map((num, idx) => (
              <div key={num} className="bg-[#050a1f] border-t-2 border-l-2 border-b-4 border-r-4 border-t-white/10 border-l-white/10 border-b-black border-r-black rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start print:bg-slate-50 print:border-black/20">
                <div className="w-14 h-14 bg-gradient-to-br from-white to-slate-400 text-[#050a1f] rounded-2xl flex items-center justify-center font-black text-2xl shrink-0 shadow-[4px_4px_10px_rgba(0,0,0,0.5)] border-t border-l border-white print:bg-white print:border-slate-300">
                  {num}
                </div>
                <div className="w-full">
                  <h4 className="text-lg font-black text-white mb-4 print:text-black">Priority Area: <span className="text-[#d4af37]">{improvementAreas[idx]?.name || pillars[idx]} Stabilisation</span></h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-[#0a1128] p-4 rounded-xl border border-white/5 print:bg-white print:border-slate-200">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#d4af37] block mb-2">Why</span>
                      <p className="text-sm text-slate-300 font-medium print:text-slate-700">Critical vulnerability inhibiting current operational capacity and scaling.</p>
                    </div>
                    <div className="bg-[#0a1128] p-4 rounded-xl border border-white/5 print:bg-white print:border-slate-200">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#d4af37] block mb-2">Business Impact</span>
                      <p className="text-sm text-slate-300 font-medium print:text-slate-700">Prevents revenue leakage and establishes a baseline for controlled expansion.</p>
                    </div>
                    <div className="bg-[#0a1128] p-4 rounded-xl border border-white/5 print:bg-white print:border-slate-200">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#d4af37] block mb-2">Expected Result</span>
                      <p className="text-sm text-white font-black print:text-black">Immediate margin recovery and improved baseline stability.</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-black text-white mb-6 relative z-10 print:text-black">AI Strategic Insights™</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16 relative z-10">
            {['Revenue', 'Customers', 'Leadership', 'Operations', 'Finance', 'Technology'].map((domain, i) => (
              <div key={i} className="flex gap-4 items-start bg-[#050a1f] border-t border-l border-b-2 border-r-2 border-t-white/10 border-l-white/10 border-b-black border-r-black p-5 rounded-2xl print:bg-slate-50 print:border-black/20">
                <div className="p-2 bg-[#0a1128] rounded-lg border border-white/5 print:bg-white print:border-slate-200">
                  <Compass className="w-5 h-5 text-[#d4af37]" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white mb-2 print:text-black">{domain}</h4>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed print:text-slate-600">Structural alignment required to integrate {domain.toLowerCase()} metrics directly with daily execution targets.</p>
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-black text-white mb-8 border-t border-white/10 pt-10 relative z-10 print:text-black print:border-black/10">AI Recommended Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            <div className="bg-[#050a1f] border-t-2 border-l-2 border-b-4 border-r-4 border-t-white/10 border-l-white/10 border-b-black border-r-black rounded-2xl p-6 shadow-lg print:bg-white print:border-black/20">
              <h4 className="text-sm font-black text-white mb-5 border-b border-white/10 pb-3 print:text-black print:border-black/10">This Week</h4>
              <ul className="space-y-4">
                <li className="text-sm font-medium text-slate-300 flex items-start gap-3 print:text-slate-700"><ArrowRight className="w-4 h-4 text-[#d4af37] mt-0.5 shrink-0"/> Identify primary cash flow bottlenecks.</li>
                <li className="text-sm font-medium text-slate-300 flex items-start gap-3 print:text-slate-700"><ArrowRight className="w-4 h-4 text-[#d4af37] mt-0.5 shrink-0"/> Communicate Q3 targets to leadership.</li>
                <li className="text-sm font-medium text-slate-300 flex items-start gap-3 print:text-slate-700"><ArrowRight className="w-4 h-4 text-[#d4af37] mt-0.5 shrink-0"/> Standardize client intake documentation.</li>
              </ul>
            </div>
            <div className="bg-[#050a1f] border-t-2 border-l-2 border-b-4 border-r-4 border-t-[#d4af37]/30 border-l-[#d4af37]/30 border-b-black border-r-black rounded-2xl p-6 shadow-lg relative overflow-hidden print:bg-white print:border-black/20">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#d4af37]/10 rounded-full blur-[20px]"></div>
              <h4 className="text-sm font-black text-[#d4af37] mb-5 border-b border-white/10 pb-3 relative z-10 print:border-black/10">Next 30 Days</h4>
              <ul className="space-y-4 relative z-10">
                <li className="text-sm font-medium text-slate-300 flex items-start gap-3 print:text-slate-700"><ArrowRight className="w-4 h-4 text-[#d4af37] mt-0.5 shrink-0"/> Deploy centralized operational tracking.</li>
                <li className="text-sm font-medium text-slate-300 flex items-start gap-3 print:text-slate-700"><ArrowRight className="w-4 h-4 text-[#d4af37] mt-0.5 shrink-0"/> Audit current marketing acquisition costs.</li>
                <li className="text-sm font-medium text-slate-300 flex items-start gap-3 print:text-slate-700"><ArrowRight className="w-4 h-4 text-[#d4af37] mt-0.5 shrink-0"/> Establish weekly executive sync protocols.</li>
              </ul>
            </div>
            <div className="bg-[#050a1f] border-t-2 border-l-2 border-b-4 border-r-4 border-t-white/10 border-l-white/10 border-b-black border-r-black rounded-2xl p-6 shadow-lg print:bg-white print:border-black/20">
              <h4 className="text-sm font-black text-white mb-5 border-b border-white/10 pb-3 print:text-black print:border-black/10">Next 90 Days</h4>
              <ul className="space-y-4">
                <li className="text-sm font-medium text-slate-300 flex items-start gap-3 print:text-slate-700"><ArrowRight className="w-4 h-4 text-white mt-0.5 shrink-0 print:text-black"/> Systematize leadership delegation structures.</li>
                <li className="text-sm font-medium text-slate-300 flex items-start gap-3 print:text-slate-700"><ArrowRight className="w-4 h-4 text-white mt-0.5 shrink-0 print:text-black"/> Launch automated performance dashboards.</li>
                <li className="text-sm font-medium text-slate-300 flex items-start gap-3 print:text-slate-700"><ArrowRight className="w-4 h-4 text-white mt-0.5 shrink-0 print:text-black"/> Finalize scalable revenue generation framework.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* PAGE 4: Opportunity & Benchmark */}
        <section className="bg-[#0a1128] rounded-3xl shadow-[10px_15px_30px_rgba(0,0,0,0.6)] border-t-2 border-l-2 border-b-4 border-r-4 border-t-[#1a2340] border-l-[#1a2340] border-b-black border-r-black p-8 md:p-12 print:shadow-none print:border-none print:p-0 print:break-after-page print:bg-white relative overflow-hidden">
          <div className="mb-10 border-b-2 border-[#d4af37]/20 pb-4 relative z-10">
            <h2 className="text-2xl font-black text-white flex items-center gap-3 print:text-black">
              <span className="w-8 h-8 rounded-full bg-[#d4af37] text-[#0a1128] flex items-center justify-center text-sm">4</span> 
              Business Opportunity Snapshot™
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16 relative z-10">
            <div className="bg-[#050a1f] rounded-2xl p-8 border border-white/5 shadow-lg print:bg-slate-50 print:border-black/10">
              <h3 className="text-sm font-black uppercase tracking-widest text-[#d4af37] mb-6 flex items-center gap-3">
                <TrendingUp className="w-5 h-5" /> Top Strengths
              </h3>
              <div className="space-y-4">
                {topStrengths.map((s, i) => (
                  <div key={i} className="bg-[#0a1128] border-l-4 border-[#d4af37] p-4 rounded-lg flex justify-between items-center shadow-md print:bg-white print:border-slate-200 print:border-l-[#d4af37]">
                    <span className="text-sm font-bold text-white print:text-black">{s.name}</span>
                    <span className="text-lg font-black text-[#d4af37]">{s.score}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#050a1f] rounded-2xl p-8 border border-white/5 shadow-lg print:bg-slate-50 print:border-black/10">
              <h3 className="text-sm font-black uppercase tracking-widest text-white mb-6 flex items-center gap-3 print:text-black">
                <AlertTriangle className="w-5 h-5 text-white print:text-black" /> Top Improvement Areas
              </h3>
              <div className="space-y-4">
                {improvementAreas.map((s, i) => (
                  <div key={i} className="bg-[#0a1128] border-l-4 border-white p-4 rounded-lg flex justify-between items-center shadow-md print:bg-white print:border-slate-200 print:border-l-black">
                    <span className="text-sm font-bold text-slate-300 print:text-slate-700">{s.name}</span>
                    <span className="text-lg font-black text-white print:text-black">{s.score}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <h3 className="text-xl font-black text-white mb-8 relative z-10 print:text-black">Estimated Growth Potential</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16 relative z-10">
            {[
              { label: 'Revenue Growth', val: '15-25%' },
              { label: 'Profitability', val: '8-12%' },
              { label: 'Customer Retention', val: '10-15%' },
              { label: 'Operational Efficiency', val: '20-30%' }
            ].map((metric, i) => (
              <div key={i} className="bg-[#050a1f] border-t-2 border-l-2 border-b-4 border-r-4 border-t-white/10 border-l-white/10 border-b-black border-r-black p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-lg print:bg-white print:border-black/20">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">{metric.label}</span>
                <span className="text-2xl md:text-3xl font-black text-white print:text-black">{metric.val}</span>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-black text-white mb-8 relative z-10 print:text-black">Industry Benchmark™</h3>
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#050a1f] shadow-xl relative z-10 print:bg-white print:border-black/20">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0a1128] border-b border-white/10 print:bg-slate-100 print:border-black/20">
                  <th className="p-5 text-xs font-black uppercase tracking-widest text-slate-400 print:text-slate-600">Area</th>
                  <th className="p-5 text-xs font-black uppercase tracking-widest text-[#d4af37]">Your Score</th>
                  <th className="p-5 text-xs font-black uppercase tracking-widest text-slate-400 print:text-slate-600">Industry Avg</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 print:divide-black/10">
                {pillars.map((pillar, i) => {
                  const score = getPillarScore(i);
                  return (
                    <tr key={i} className="hover:bg-[#0a1128] transition-colors print:hover:bg-slate-50">
                      <td className="p-5 text-sm font-bold text-white print:text-black">{pillar}</td>
                      <td className="p-5 text-sm font-black text-[#d4af37]">{score}%</td>
                      <td className="p-5 text-sm font-bold text-slate-400 print:text-slate-600">65%</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* PAGE 5: 90-Day Growth Plan */}
        <section className="bg-[#0a1128] rounded-3xl shadow-[10px_15px_30px_rgba(0,0,0,0.6)] border-t-2 border-l-2 border-b-4 border-r-4 border-t-[#1a2340] border-l-[#1a2340] border-b-black border-r-black p-8 md:p-12 print:shadow-none print:border-none print:p-0 print:break-after-page print:bg-white relative overflow-hidden">
          <div className="mb-10 border-b-2 border-[#d4af37]/20 pb-4 relative z-10">
            <h2 className="text-2xl font-black text-white flex items-center gap-3 print:text-black">
              <span className="w-8 h-8 rounded-full bg-[#d4af37] text-[#0a1128] flex items-center justify-center text-sm">5</span> 
              90-Day Business Growth Plan™
            </h2>
            <p className="text-sm font-medium text-slate-400 mt-3 print:text-slate-600">Strategic execution roadmap aligned to your goal of <strong className="text-white print:text-black">{formData.goal || "sustainable growth"}</strong></p>
          </div>
          
          <div className="relative border-l-2 border-white/20 ml-6 md:ml-10 space-y-16 pb-6 relative z-10 print:border-black/20">
            {/* First 30 Days */}
            <div className="relative pl-10 md:pl-12">
              <div className="absolute -left-[13px] top-1 w-6 h-6 rounded-full bg-[#0a1128] border-4 border-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.5)] print:bg-white"></div>
              <div className="bg-[#050a1f] border-t-2 border-l-2 border-b-4 border-r-4 border-t-white/10 border-l-white/10 border-b-black border-r-black rounded-2xl p-8 hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-shadow print:bg-slate-50 print:border-black/20">
                <span className="text-[10px] font-black text-[#d4af37] uppercase tracking-widest block mb-3">Phase 1</span>
                <h3 className="text-xl font-black text-white mb-6 print:text-black">First 30 Days: Foundation & Quick Wins</h3>
                <div className="space-y-6">
                  <div><span className="text-xs font-black uppercase text-slate-500 block mb-1">Objective</span><p className="text-base font-medium text-slate-200 print:text-slate-800">Stabilize core operations and resolve immediate vulnerabilities.</p></div>
                  <div><span className="text-xs font-black uppercase text-slate-500 block mb-1">Actions</span><p className="text-base font-medium text-slate-200 print:text-slate-800">Establish standard operating procedures for <strong className="text-white print:text-black">{improvementAreas[0]?.name || 'Operations'}</strong>. Document current bottlenecks.</p></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 bg-[#0a1128] p-5 rounded-xl border border-white/5 print:bg-white print:border-slate-200">
                    <div><span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Expected Outcome</span><p className="text-sm font-bold text-[#d4af37]">Operational baseline established.</p></div>
                    <div><span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Success Indicator</span><p className="text-sm font-bold text-[#d4af37]">100% compliance on new protocol.</p></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next 30 Days */}
            <div className="relative pl-10 md:pl-12">
              <div className="absolute -left-[13px] top-1 w-6 h-6 rounded-full bg-[#0a1128] border-4 border-white shadow-[0_0_10px_rgba(255,255,255,0.3)] print:bg-white print:border-black"></div>
              <div className="bg-[#050a1f] border-t-2 border-l-2 border-b-4 border-r-4 border-t-white/10 border-l-white/10 border-b-black border-r-black rounded-2xl p-8 hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-shadow print:bg-slate-50 print:border-black/20">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3 print:text-slate-500">Phase 2</span>
                <h3 className="text-xl font-black text-white mb-6 print:text-black">Next 30 Days (Day 31-60): Business Improvements</h3>
                <div className="space-y-6">
                  <div><span className="text-xs font-black uppercase text-slate-500 block mb-1">Objective</span><p className="text-base font-medium text-slate-200 print:text-slate-800">Integrate improvements across cross-functional teams.</p></div>
                  <div><span className="text-xs font-black uppercase text-slate-500 block mb-1">Actions</span><p className="text-base font-medium text-slate-200 print:text-slate-800">Deploy updated metrics tracking. Train leadership team on new execution standards.</p></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 bg-[#0a1128] p-5 rounded-xl border border-white/5 print:bg-white print:border-slate-200">
                    <div><span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Expected Outcome</span><p className="text-sm font-bold text-white print:text-black">Improved cross-department efficiency.</p></div>
                    <div><span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Success Indicator</span><p className="text-sm font-bold text-white print:text-black">15% reduction in process time.</p></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Final 30 Days */}
            <div className="relative pl-10 md:pl-12">
              <div className="absolute -left-[13px] top-1 w-6 h-6 rounded-full bg-[#0a1128] border-4 border-white shadow-[0_0_10px_rgba(255,255,255,0.3)] print:bg-white print:border-black"></div>
              <div className="bg-[#050a1f] border-t-2 border-l-2 border-b-4 border-r-4 border-t-white/10 border-l-white/10 border-b-black border-r-black rounded-2xl p-8 hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-shadow print:bg-slate-50 print:border-black/20">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3 print:text-slate-500">Phase 3</span>
                <h3 className="text-xl font-black text-white mb-6 print:text-black">Final 30 Days (Day 61-90): Growth Initiatives</h3>
                <div className="space-y-6">
                  <div><span className="text-xs font-black uppercase text-slate-500 block mb-1">Objective</span><p className="text-base font-medium text-slate-200 print:text-slate-800">Scale the stabilized model for sustained revenue impact.</p></div>
                  <div><span className="text-xs font-black uppercase text-slate-500 block mb-1">Actions</span><p className="text-base font-medium text-slate-200 print:text-slate-800">Initiate scaling strategies leveraging established <strong className="text-white print:text-black">{topStrengths[0]?.name || 'Strengths'}</strong> assets.</p></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 bg-[#0a1128] p-5 rounded-xl border border-white/5 print:bg-white print:border-slate-200">
                    <div><span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Expected Outcome</span><p className="text-sm font-bold text-white print:text-black">Revenue generating activities accelerated.</p></div>
                    <div><span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Success Indicator</span><p className="text-sm font-bold text-white print:text-black">Measured increase in margin.</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL PAGE: CTA */}
        <section className="bg-gradient-to-br from-[#0a1128] to-[#050a1f] rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-t-2 border-l-2 border-b-4 border-r-4 border-t-[#d4af37] border-l-[#d4af37] border-b-black border-r-black p-10 md:p-16 text-white relative overflow-hidden print:bg-white print:border-4 print:border-black print:text-black">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d4af37]/10 blur-[120px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3 print:hidden"></div>
          
          <div className="relative z-10 text-center max-w-4xl mx-auto mb-14">
            <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] print:text-black print:drop-shadow-none">Ready to Unlock Your Complete Business Growth Plan?</h2>
            <p className="text-slate-300 print:text-slate-700 text-xl font-medium leading-relaxed mb-6">
              The Executive Business Snapshot™ provides a high-level understanding of your business performance.
            </p>
            <p className="text-slate-400 print:text-slate-600 text-base font-medium leading-relaxed max-w-3xl mx-auto">
              The Business Growth Diagnostic™ helps you identify the root causes behind business challenges and provides a practical implementation strategy tailored to your business.
            </p>
          </div>

          <div className="relative z-10 bg-[#050a1f] print:bg-slate-50 rounded-3xl p-10 max-w-3xl mx-auto shadow-[0_10px_40px_rgba(0,0,0,0.6)] border-t-2 border-l-2 border-b-4 border-r-4 border-t-white/10 border-l-white/10 border-b-black border-r-black print:shadow-none print:border print:border-slate-300">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 border-b border-white/10 pb-10 gap-8 print:border-black/10">
              <div>
                <h3 className="text-3xl font-black text-white mb-3 print:text-black">Business Growth Diagnostic™</h3>
                <div className="flex items-center gap-3 text-sm font-bold text-slate-400 print:text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#d4af37] shadow-[0_0_8px_rgba(212,175,55,0.8)]"></span> Live 60–90 Minutes
                </div>
              </div>
              <div className="text-right bg-[#0a1128] px-6 py-4 rounded-2xl border border-white/5 print:bg-white print:border-slate-200">
                <span className="text-sm font-bold text-slate-500 line-through block mb-1">Rs. 9,999</span>
                <span className="text-4xl font-black text-[#d4af37] tracking-tight">₹1,499</span>
              </div>
            </div>

            <div className="mb-10">
              <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6 print:text-slate-600">Deliverables</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['Review of Assessment Results', 'Root Cause Analysis', 'Business Discussion', 'Priority Identification', 'Strategic Recommendations', 'Customized Growth Roadmap', 'Live Q&A'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-base font-bold text-slate-200 print:text-slate-800">
                    <CheckCircle2 className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <button type="button" onClick={() => alert("Redirecting to Checkout...")} className="w-full py-6 bg-gradient-to-r from-[#d4af37] to-[#b38f25] hover:brightness-110 text-[#050a1f] text-xl font-black uppercase tracking-widest rounded-2xl shadow-[0_10px_30px_rgba(212,175,55,0.4)] transform transition-transform hover:-translate-y-1 active:translate-y-1 border-t-2 border-l-2 border-b-4 border-r-4 border-t-white/40 border-l-white/40 border-b-black/40 border-r-black/40 print:hidden">
              Book Business Growth Diagnostic™
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
"""

with open('src/components/DashboardReport.tsx', 'w') as f:
    f.write(new_content)
