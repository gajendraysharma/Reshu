const fs = require('fs');

const content = `import React, { useState } from 'react';
import { 
  Building2, Target, BarChart3, Lightbulb, Cpu, ShieldCheck, Download,
  AlertTriangle, CheckCircle, ArrowUpRight, TrendingUp, Activity, Zap,
  Globe, Users, Briefcase, HelpCircle, Calendar, FileText, User, Phone,
  ChevronDown, ChevronUp, ArrowRight, PieChart, DollarSign, TrendingDown,
  Layers, MapPin, Clock, Lock, Mail, Star, LineChart, Server, Fingerprint,
  Award
} from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface DashboardReportProps {
  formData: any;
  scores: number[];
}

function ExpandableCard({ title, preview, children, icon, defaultExpanded = false, badge = null, className = "" }: any) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  return (
    <div className={\`border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm mb-4 transition-all hover:border-slate-300 \${className}\`}>
       <div className="p-4 md:p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50/50" onClick={() => setIsExpanded(!isExpanded)}>
          <div className="flex items-center gap-4">
             {icon && <div className="w-10 h-10 rounded-full bg-[#0B2545]/5 flex items-center justify-center text-[#0B2545] shrink-0">{icon}</div>}
             <div>
                <h4 className="font-bold text-[#0B2545] text-sm">{title}</h4>
                {preview && <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">{preview}</p>}
             </div>
          </div>
          <div className="flex items-center gap-3 pl-4">
            {badge && <span className="hidden sm:inline-block text-[10px] font-bold px-2 py-1 rounded bg-slate-100 text-slate-600 whitespace-nowrap">{badge}</span>}
            <button className="text-[#D4AF37] text-xs font-bold flex items-center gap-1 whitespace-nowrap">
               <span className="hidden sm:inline">{isExpanded ? 'Hide Details' : 'View Details'}</span> 
               {isExpanded ? <ChevronUp className="w-4 h-4"/> : <ChevronDown className="w-4 h-4"/>}
            </button>
          </div>
       </div>
       {isExpanded && (
         <div className="p-5 border-t border-slate-100 bg-white animate-in slide-in-from-top-2 duration-200">
           {children}
         </div>
       )}
    </div>
  );
}

export default function DashboardReport({ formData, scores }: DashboardReportProps) {
  const [activeTab, setActiveTab] = useState('OVERVIEW');

  const pillars = [
    'Leadership & Vision',
    'Sales & Revenue',
    'Marketing & Customers',
    'Operations & Process',
    'Finance & Performance',
    'People & Organisation',
    'Technology & Innovation'
  ];

  const getPillarScore = (index: number) => {
    if (!scores || scores.length === 0) return 0;
    const startIdx = index * 3;
    const pillarScores = scores.slice(startIdx, startIdx + 3).filter(s => typeof s === 'number' && !isNaN(s) && s > 0);
    if (pillarScores.length === 0) return 0;
    const sum = pillarScores.reduce((a, b) => a + b, 0);
    return Math.round((sum / (pillarScores.length * 5)) * 100);
  };

  const getGlobalScore = () => {
    if (!scores || scores.length === 0) return 0;
    const weights = [0.15, 0.20, 0.15, 0.15, 0.15, 0.10, 0.10];
    let sum = 0;
    for (let i = 0; i < 7; i++) { sum += getPillarScore(i) * weights[i]; }
    return Math.round(sum);
  };

  const globalScore = getGlobalScore();
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10B981'; // Success Green
    if (score >= 60) return '#F59E0B'; // Warning Amber
    return '#EF4444'; // Risk Red
  };

  const getScoreStatus = (score: number) => {
    if (score >= 80) return 'Strong';
    if (score >= 60) return 'Needs Attention';
    return 'Critical';
  };

  const radarData = pillars.map((pillar, index) => ({
    subject: pillar.replace(' & ', ' &\\n'),
    Client: getPillarScore(index) || 0,
    Industry: 62, // Static industry average for demo
    fullMark: 100,
  }));

  const menuItems = [
    { id: 'OVERVIEW', label: 'Executive Overview™', icon: <Globe className="w-4 h-4" /> },
    { id: 'HEALTH', label: 'Business Health Dashboard™', icon: <Activity className="w-4 h-4" /> },
    { id: 'ADVISORY', label: 'AI Growth Advisory™', icon: <Cpu className="w-4 h-4" /> },
    { id: 'PLAN', label: 'Opportunities & 90-Day Plan™', icon: <Calendar className="w-4 h-4" /> },
    { id: 'NEXT_STEP', label: 'Diagnostic Booking', icon: <Target className="w-4 h-4" /> },
  ];

  const reportId = \`KRG-\${Math.random().toString(36).substring(2, 8).toUpperCase()}\`;
  const assessmentDate = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  const kpis = [
    { title: 'Growth Readiness', value: \`\${Math.round(globalScore * 0.9)}%\`, status: getScoreStatus(Math.round(globalScore * 0.9)), color: getScoreColor(Math.round(globalScore * 0.9)), icon: <Zap className="w-5 h-5 text-white" /> },
    { title: 'Revenue Opp', value: 'High', status: 'Strong', color: '#10B981', icon: <TrendingUp className="w-5 h-5 text-white" /> },
    { title: 'Ops Maturity', value: \`\${getPillarScore(3)}%\`, status: getScoreStatus(getPillarScore(3)), color: getScoreColor(getPillarScore(3)), icon: <Activity className="w-5 h-5 text-white" /> },
    { title: 'Leadership Score', value: \`\${getPillarScore(0)}%\`, status: getScoreStatus(getPillarScore(0)), color: getScoreColor(getPillarScore(0)), icon: <Star className="w-5 h-5 text-white" /> },
    { title: 'Overall Risk', value: globalScore >= 70 ? 'Low' : globalScore >= 50 ? 'Moderate' : 'High', status: globalScore >= 70 ? 'Strong' : globalScore >= 50 ? 'Needs Attention' : 'Critical', color: getScoreColor(globalScore), icon: <ShieldCheck className="w-5 h-5 text-white" /> },
    { title: 'AI Confidence', value: '94%', status: 'Strong', color: '#8B5CF6', icon: <Cpu className="w-5 h-5 text-white" /> }, // AI Purple
  ];

  const handlePrint = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.print();
  };

  return (
    <div className="absolute top-0 left-0 w-full min-h-screen bg-[#F8FAFC] text-slate-900 font-sans grid grid-cols-1 xl:grid-cols-12 gap-6 p-4 md:p-6 items-stretch z-50">
      
      {/* SIDEBAR NAVIGATION - Navy #0B2545 */}
      <div className="hidden xl:flex flex-col bg-[#0B2545] text-slate-300 border border-[#0B2545] sticky top-6 h-[calc(100vh-3rem)] overflow-y-auto hide-scrollbar rounded-[20px] xl:col-span-3 shadow-2xl">
        <div className="p-8 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="font-serif font-bold text-2xl tracking-tight text-white">KRG <span className="text-[#D4AF37]">ONE</span></span>
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] mt-2 font-semibold">Executive Business Snapshot™</p>
        </div>
        
        <div className="px-6 py-6 border-b border-white/10 space-y-4">
            <div>
                <span className="block text-[9px] uppercase tracking-widest text-slate-500 mb-1">Company</span>
                <span className="text-sm font-bold text-white truncate block">{formData.companyName || 'Confidential Client'}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <span className="block text-[9px] uppercase tracking-widest text-slate-500 mb-1">Report ID</span>
                    <span className="text-xs font-mono text-slate-300">{reportId}</span>
                </div>
                <div>
                    <span className="block text-[9px] uppercase tracking-widest text-slate-500 mb-1">Date</span>
                    <span className="text-xs font-mono text-slate-300">{assessmentDate}</span>
                </div>
            </div>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-1">
          {menuItems.map((item, idx) => (
            <button 
              key={idx} 
              onClick={() => setActiveTab(item.id)}
              className={\`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-xs font-bold transition-all duration-200 \${activeTab === item.id ? 'bg-[#D4AF37] text-[#0B2545] shadow-[0_4px_12px_rgba(212,175,55,0.3)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}\`}
            >
              <div className={activeTab === item.id ? "text-[#0B2545]" : "text-slate-500"}>{item.icon}</div>
              {item.label}
            </button>
          ))}
        </nav>
        
        <div className="p-6 border-t border-white/10 space-y-3">
          <button 
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold transition-all text-slate-300 hover:text-white hover:bg-white/5 border border-slate-700 hover:border-slate-500"
              onClick={handlePrint}
            >
              <Download className="w-4 h-4" /> Download PDF
          </button>
          <button onClick={() => setActiveTab('NEXT_STEP')} className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#D4AF37] to-[#C59B27] text-[#0B2545] font-black text-xs uppercase tracking-wider rounded-xl hover:brightness-110 transition-all shadow-[0_0_15px_rgba(212,175,55,0.4)]">
              <Phone className="w-3.5 h-3.5" /> Book Diagnostic
          </button>
        </div>
      </div>

      {/* MAIN CONTENT WORKSPACE */}
      <div className="col-span-1 xl:col-span-9 flex flex-col h-[calc(100vh-3rem)]">
        {/* Top Header Mobile/Tablet */}
        <div className="xl:hidden bg-[#0B2545] rounded-xl p-5 mb-4 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <span className="font-serif font-bold text-xl tracking-tight text-white block">KRG <span className="text-[#D4AF37]">ONE</span></span>
                <p className="text-[9px] uppercase tracking-[0.2em] text-[#D4AF37] mt-1 font-semibold">Executive Business Snapshot™</p>
            </div>
            <select 
                value={activeTab} 
                onChange={(e) => setActiveTab(e.target.value)}
                className="bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            >
                {menuItems.map(m => <option key={m.id} value={m.id} className="text-slate-900">{m.label}</option>)}
            </select>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto hide-scrollbar pb-20">
          <div className="max-w-5xl mx-auto space-y-6">

          {/* PAGE 1: EXECUTIVE OVERVIEW */}
          {activeTab === 'OVERVIEW' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
              
              {/* Header block */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200">
                  <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
                      {/* Left: Score Gauge */}
                      <div className="flex flex-col items-center justify-center bg-slate-50 p-6 rounded-xl border border-slate-100 min-w-[240px]">
                        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 text-center">Overall Business Growth Score™</h3>
                        <div className="relative w-40 h-40 flex items-center justify-center mb-4">
                            <svg className="absolute inset-0 w-full h-full transform -rotate-180" viewBox="0 0 36 36">
                                <path className="text-slate-200" strokeWidth="3" stroke="currentColor" fill="none" strokeDasharray="75, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                <path stroke={getScoreColor(globalScore)} strokeDasharray={\`\${(globalScore / 100) * 75}, 100\`} strokeWidth="3.5" fill="none" strokeLinecap="round" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                            </svg>
                            <div className="flex flex-col items-center absolute bg-white rounded-full w-[120px] h-[120px] justify-center shadow-sm border border-slate-50">
                                <span className="text-5xl font-black text-[#0B2545]">{globalScore}</span>
                                <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Score</span>
                            </div>
                        </div>
                        <div className="w-full space-y-2">
                           <div className="flex justify-between items-center text-[11px] font-bold">
                              <span className="text-slate-500 uppercase">Grade</span>
                              <span style={{color: getScoreColor(globalScore)}}>{getScoreStatus(globalScore)}</span>
                           </div>
                           <div className="flex justify-between items-center text-[11px] font-bold">
                              <span className="text-slate-500 uppercase">Stage</span>
                              <span className="text-[#0B2545]">{globalScore >= 70 ? 'Scale' : globalScore >= 50 ? 'Optimization' : 'Stabilization'}</span>
                           </div>
                        </div>
                      </div>

                      {/* Right: Business Profile */}
                      <div className="flex-1 w-full">
                         <h2 className="text-xl font-bold text-[#0B2545] border-b border-slate-100 pb-3 mb-4">Business Profile</h2>
                         <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
                            <div>
                                <span className="block text-[9px] uppercase font-bold text-slate-400 mb-1">Company Name</span>
                                <span className="text-xs font-bold text-slate-800">{formData.companyName || 'Not Provided'}</span>
                            </div>
                            <div>
                                <span className="block text-[9px] uppercase font-bold text-slate-400 mb-1">Owner / Leader</span>
                                <span className="text-xs font-bold text-slate-800">{formData.fullName || 'Not Provided'}</span>
                            </div>
                            <div>
                                <span className="block text-[9px] uppercase font-bold text-slate-400 mb-1">Designation</span>
                                <span className="text-xs font-bold text-slate-800">{formData.designation || 'Owner/Founder'}</span>
                            </div>
                            <div>
                                <span className="block text-[9px] uppercase font-bold text-slate-400 mb-1">Industry</span>
                                <span className="text-xs font-bold text-slate-800">{formData.industry || 'Not Provided'}</span>
                            </div>
                            <div>
                                <span className="block text-[9px] uppercase font-bold text-slate-400 mb-1">Business Size</span>
                                <span className="text-xs font-bold text-slate-800">{formData.businessSize || 'Not Provided'}</span>
                            </div>
                            <div>
                                <span className="block text-[9px] uppercase font-bold text-slate-400 mb-1">Annual Revenue</span>
                                <span className="text-xs font-bold text-slate-800">{formData.revenue || 'Not Provided'}</span>
                            </div>
                         </div>
                         <div className="mt-4 pt-4 border-t border-slate-100 space-y-4">
                            <div>
                                <span className="block text-[9px] uppercase font-bold text-slate-400 mb-1">Primary Business Goal</span>
                                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded inline-block">{formData.goal || 'Not Provided'}</span>
                            </div>
                            <div>
                                <span className="block text-[9px] uppercase font-bold text-slate-400 mb-1">Primary Challenge</span>
                                <span className="text-xs font-bold text-red-700 bg-red-50 px-2 py-1 rounded inline-block">{formData.challenges?.length > 0 ? formData.challenges[0] : 'Leadership Dependency'}</span>
                            </div>
                         </div>
                      </div>
                  </div>
              </div>

              {/* Executive Business Summary */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200">
                  <h3 className="text-sm font-bold text-[#0B2545] uppercase tracking-widest mb-4 flex items-center gap-2">
                     <FileText className="w-4 h-4 text-[#D4AF37]" /> Executive Business Summary™
                  </h3>
                  <div className="prose prose-sm max-w-none text-slate-600 space-y-4">
                     <p>
                        Based on the KRG ONE Business Growth Assessment™, <strong>{formData.companyName || 'your business'}</strong> currently operates with an overall Growth Score of <strong>{globalScore}/100</strong>, indicating a <strong>{getScoreStatus(globalScore).toLowerCase()}</strong> state of operational readiness and market positioning.
                     </p>
                     <p>
                        <strong>Current Business Position & Growth Outlook:</strong> The business demonstrates foundational capabilities in its core service/product delivery. However, the trajectory is significantly constrained by inconsistent internal frameworks. The outlook suggests that without systemic intervention, the business will face a ceiling on its revenue potential, driven primarily by operational friction rather than market demand.
                     </p>
                     <p>
                        <strong>Biggest Opportunity:</strong> The highest immediate return on investment lies in formalizing operational processes. By standardizing workflows and establishing clear accountability, the business can reduce profit leakage and increase fulfillment capacity without proportionally increasing headcount.
                     </p>
                     <p>
                        <strong>Biggest Risk:</strong> Over-reliance on founder-led decision making poses the greatest threat to scalability and valuation. This centralized leadership model creates bottlenecks, slows down execution, and risks severe disruption if key personnel are unavailable.
                     </p>
                     <div className="bg-[#F8FAFC] border-l-4 border-[#D4AF37] p-4 rounded-r-lg mt-4">
                        <strong className="text-[#0B2545] text-xs uppercase tracking-widest block mb-1">Executive Recommendation</strong>
                        <p className="text-sm m-0">Shift focus immediately from ad-hoc problem solving to deliberate systems architecture. Prioritize the documentation of core revenue-generating processes and begin decentralizing day-to-day operational decisions to empowered team members.</p>
                     </div>
                  </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                 {kpis.map((kpi, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col transition-all hover:shadow-md">
                        <div className="flex justify-between items-start mb-4">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{backgroundColor: kpi.color}}>{kpi.icon}</div>
                          <span className="text-[9px] font-bold px-2 py-1 rounded bg-slate-100 text-slate-600 uppercase tracking-wider">{kpi.status}</span>
                        </div>
                        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{kpi.title}</h3>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-black text-[#0B2545]">{kpi.value}</span>
                        </div>
                    </div>
                ))}
              </div>

            </div>
          )}

          {/* PAGE 2: BUSINESS HEALTH DASHBOARD */}
          {activeTab === 'HEALTH' && (
             <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
                
                {/* Health Summary & Radar */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                   <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
                      <h3 className="text-sm font-bold text-[#0B2545] uppercase tracking-widest mb-6">Business Health Summary</h3>
                      
                      <div className="space-y-6">
                         <div>
                            <h4 className="text-[10px] uppercase font-bold text-emerald-600 mb-2 flex items-center gap-1"><CheckCircle className="w-3 h-3"/> Top Strengths</h4>
                            <div className="flex gap-2 flex-wrap">
                               {pillars.map((p,i) => ({name: p, score: getPillarScore(i)})).sort((a,b)=>b.score-a.score).slice(0,2).map((s,i) => (
                                  <span key={i} className="text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg border border-emerald-100">{s.name}</span>
                               ))}
                            </div>
                         </div>
                         <div>
                            <h4 className="text-[10px] uppercase font-bold text-red-600 mb-2 flex items-center gap-1"><AlertTriangle className="w-3 h-3"/> Top Improvement Areas</h4>
                            <div className="flex gap-2 flex-wrap">
                               {pillars.map((p,i) => ({name: p, score: getPillarScore(i)})).sort((a,b)=>a.score-b.score).slice(0,2).map((s,i) => (
                                  <span key={i} className="text-xs font-bold bg-red-50 text-red-700 px-3 py-1.5 rounded-lg border border-red-100">{s.name}</span>
                               ))}
                            </div>
                         </div>

                         <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                               <span className="block text-[9px] uppercase font-bold text-slate-500 mb-1">Health Rating</span>
                               <span className="text-sm font-bold text-[#0B2545]">{getScoreStatus(globalScore)}</span>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                               <span className="block text-[9px] uppercase font-bold text-slate-500 mb-1">Growth Stage</span>
                               <span className="text-sm font-bold text-[#0B2545]">{globalScore >= 70 ? 'Scale' : globalScore >= 50 ? 'Optimization' : 'Stabilization'}</span>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                               <span className="block text-[9px] uppercase font-bold text-slate-500 mb-1">Est. Potential</span>
                               <span className="text-sm font-bold text-emerald-600">High (+25%)</span>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                               <span className="block text-[9px] uppercase font-bold text-slate-500 mb-1">Risk Assessment</span>
                               <span className="text-sm font-bold" style={{color: getScoreColor(globalScore)}}>{globalScore >= 70 ? 'Low Risk' : globalScore >= 50 ? 'Moderate Risk' : 'High Risk'}</span>
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col">
                      <h3 className="text-sm font-bold text-[#0B2545] uppercase tracking-widest mb-2">Maturity Radar</h3>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-4">Client vs Industry Average</p>
                      <div className="flex-1 w-full min-h-[250px] relative -ml-4">
                          <ResponsiveContainer width="100%" height="100%">
                              <RadarChart cx="50%" cy="50%" outerRadius="65%" data={radarData}>
                                  <PolarGrid stroke="#e2e8f0" />
                                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }} />
                                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                  <Radar name="Your Score" dataKey="Client" stroke="#0B2545" strokeWidth={2.5} fill="#0B2545" fillOpacity={0.15} />
                                  <Radar name="Industry" dataKey="Industry" stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="3 3" fill="none" />
                              </RadarChart>
                          </ResponsiveContainer>
                      </div>
                      <div className="flex justify-center gap-4 mt-2">
                         <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-[#0B2545]/20 border border-[#0B2545]"></div><span className="text-xs font-bold text-slate-600">Your Score</span></div>
                         <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm border-2 border-dashed border-slate-400"></div><span className="text-xs font-bold text-slate-600">Industry Avg</span></div>
                      </div>
                   </div>
                </div>

                {/* 7-Pillar Scorecard */}
                <h3 className="text-lg font-bold text-[#0B2545] border-b border-slate-200 pb-2 mt-8 mb-4">7-Pillar Business Scorecard</h3>
                <div className="space-y-4">
                   {pillars.map((pillar, idx) => {
                      const score = getPillarScore(idx);
                      const status = getScoreStatus(score);
                      const color = getScoreColor(score);
                      return (
                      <ExpandableCard 
                         key={idx} 
                         title={pillar} 
                         badge={\`Score: \${score}/100\`}
                         icon={<Layers className="w-4 h-4"/>}
                      >
                         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="md:col-span-3 space-y-4">
                               <div>
                                  <h5 className="text-[10px] uppercase font-bold text-slate-400 mb-1">Business Impact</h5>
                                  <p className="text-xs text-slate-700 leading-relaxed">
                                     {score >= 70 ? 'Acting as a strong foundation, driving stability and enabling scale in this domain.' 
                                      : score >= 50 ? 'Functioning adequately, but inefficiencies are causing mild friction in daily operations.' 
                                      : 'Critical bottleneck. Severely limiting overall business performance and revenue generation potential.'}
                                  </p>
                               </div>
                               <div>
                                  <h5 className="text-[10px] uppercase font-bold text-slate-400 mb-1">Action Priority</h5>
                                  <span className="text-xs font-bold px-2 py-1 rounded text-white" style={{ backgroundColor: color }}>
                                     {score >= 70 ? 'Low / Monitor' : score >= 50 ? 'Medium / Optimize' : 'High / Remediate Immediate'}
                                  </span>
                               </div>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col justify-center">
                               <span className="block text-[9px] uppercase font-bold text-slate-500 mb-2 text-center">Industry Benchmark</span>
                               <div className="flex items-center justify-center gap-3">
                                  <div className="text-center">
                                     <span className="block text-2xl font-black text-[#0B2545]">{score}</span>
                                     <span className="block text-[9px] font-bold text-slate-400 uppercase">You</span>
                                  </div>
                                  <div className="h-8 w-px bg-slate-300"></div>
                                  <div className="text-center">
                                     <span className="block text-2xl font-black text-slate-400">62</span>
                                     <span className="block text-[9px] font-bold text-slate-400 uppercase">Avg</span>
                                  </div>
                               </div>
                            </div>
                         </div>
                      </ExpandableCard>
                   )})}
                </div>

             </div>
          )}

          {/* PAGE 3: ADVISORY */}
          {activeTab === 'ADVISORY' && (
             <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
                
                {/* Hero Advisory Card */}
                <div className="bg-[#0B2545] rounded-2xl p-6 md:p-8 text-white relative overflow-hidden shadow-lg border border-[#0B2545]">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 blur-[80px] rounded-full pointer-events-none"></div>
                   <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                      <div className="flex-1">
                         <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B5CF6]/20 text-[#C4B5FD] text-[10px] font-bold uppercase tracking-widest mb-4 border border-[#8B5CF6]/30">
                            <Cpu className="w-3 h-3" /> Signature AI Insights
                         </span>
                         <h3 className="text-xl font-serif font-bold text-[#D4AF37] mb-3">Executive Observation & Diagnosis</h3>
                         <p className="text-sm text-slate-300 leading-relaxed mb-4">
                            The diagnostic engine has identified a systemic misalignment between your revenue goals and your operational framework. The business is heavily reliant on manual oversight, creating a fragile growth ecosystem. 
                         </p>
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                               <h4 className="text-[10px] uppercase font-bold text-[#D4AF37] mb-1">Key Business Risk</h4>
                               <p className="text-xs text-slate-300">Stalled scale due to undocumented knowledge residing solely with key individuals.</p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                               <h4 className="text-[10px] uppercase font-bold text-emerald-400 mb-1">Primary Opportunity</h4>
                               <p className="text-xs text-slate-300">Systematizing delivery can unlock immediate capacity to handle 30% more volume.</p>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                      <h4 className="text-sm font-bold text-[#0B2545] uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">Leadership & Sales Insights</h4>
                      <div className="space-y-4">
                         <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Leadership</span>
                            <p className="text-xs text-slate-700 leading-relaxed">Vision is clear, but execution is hampered by a lack of delegated authority. Managers act as task executors rather than decision-makers.</p>
                         </div>
                         <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Sales</span>
                            <p className="text-xs text-slate-700 leading-relaxed">Conversion rates suffer from inconsistent follow-up cadences and the absence of a defined, repeatable sales playbook.</p>
                         </div>
                         <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Customer Retention</span>
                            <p className="text-xs text-slate-700 leading-relaxed">High risk of churn due to reactive rather than proactive client management and onboarding experiences.</p>
                         </div>
                      </div>
                   </div>
                   <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                      <h4 className="text-sm font-bold text-[#0B2545] uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">Ops, Finance & Tech Insights</h4>
                      <div className="space-y-4">
                         <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Operations</span>
                            <p className="text-xs text-slate-700 leading-relaxed">Service delivery quality fluctuates depending on the assigned personnel. Standardization is urgently required.</p>
                         </div>
                         <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Finance</span>
                            <p className="text-xs text-slate-700 leading-relaxed">Lack of forward-looking cash flow forecasting limits strategic investments and creates reactive financial management.</p>
                         </div>
                         <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Technology</span>
                            <p className="text-xs text-slate-700 leading-relaxed">Existing tools are siloed. Data entry is duplicated across systems, leading to inefficiencies and reporting delays.</p>
                         </div>
                      </div>
                   </div>
                </div>

                {/* AI Strategic Recommendations */}
                <h3 className="text-lg font-bold text-[#0B2545] border-b border-slate-200 pb-2 mt-8 mb-4">Top 5 Strategic Recommendations</h3>
                <div className="space-y-4">
                   {[
                      {
                         title: "Develop Core Standard Operating Procedures (SOPs)",
                         impact: "High", priority: "Critical",
                         result: "Immediate reduction in service errors and reduced training time for new hires."
                      },
                      {
                         title: "Implement a Centralized CRM Dashboard",
                         impact: "High", priority: "High",
                         result: "Visibility into the sales pipeline and automated follow-up cadences."
                      },
                      {
                         title: "Establish Weekly Leadership Accountability Meetings",
                         impact: "Medium", priority: "Critical",
                         result: "Shift from reactive fire-fighting to proactive strategic management."
                      },
                      {
                         title: "Restructure Pricing & Packaging",
                         impact: "High", priority: "Medium",
                         result: "Immediate margin improvement without requiring additional client acquisition."
                      },
                      {
                         title: "Launch Proactive Client Check-in Protocol",
                         impact: "Medium", priority: "Medium",
                         result: "Increased lifetime value and reduced unexpected churn rates."
                      }
                   ].map((rec, i) => (
                      <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 justify-between items-start">
                         <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-[#0B2545] text-[#D4AF37] font-black text-sm flex items-center justify-center shrink-0">{i+1}</div>
                            <div>
                               <h4 className="text-sm font-bold text-[#0B2545] mb-2">{rec.title}</h4>
                               <p className="text-xs text-slate-600"><span className="font-bold text-slate-800">Expected Result:</span> {rec.result}</p>
                            </div>
                         </div>
                         <div className="flex flex-row md:flex-col gap-2 shrink-0">
                            <span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-100 text-slate-600 uppercase tracking-widest text-center border border-slate-200">Impact: {rec.impact}</span>
                            <span className="text-[10px] font-bold px-2 py-1 rounded bg-red-50 text-red-700 uppercase tracking-widest text-center border border-red-100">Priority: {rec.priority}</span>
                         </div>
                      </div>
                   ))}
                </div>

             </div>
          )}

          {/* PAGE 4: PLAN */}
          {activeTab === 'PLAN' && (
             <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
                
                <h3 className="text-lg font-bold text-[#0B2545] border-b border-slate-200 pb-2 mb-4">Business Opportunity Snapshot™</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                   {[
                      { label: "Revenue", value: "+15-25%" },
                      { label: "Profitability", value: "+8-12%" },
                      { label: "Retention", value: "+20-30%" },
                      { label: "Ops Efficiency", value: "+25-40%" },
                      { label: "Tech Leverage", value: "+10-15%" },
                   ].map((item, i) => (
                      <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center flex flex-col justify-center min-h-[100px]">
                         <span className="block text-[10px] uppercase font-bold text-slate-500 mb-1">{item.label}</span>
                         <span className="text-lg font-black text-emerald-600">{item.value}</span>
                      </div>
                   ))}
                </div>

                <h3 className="text-lg font-bold text-[#0B2545] border-b border-slate-200 pb-2 mt-8 mb-4">90-Day Business Growth Plan™</h3>
                <div className="space-y-6">
                   <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 border-l-4 border-l-[#D4AF37]">
                      <h4 className="text-sm font-bold text-[#0B2545] uppercase tracking-widest mb-1">First 30 Days</h4>
                      <p className="text-xs text-slate-500 mb-4">Objective: Stabilization & Discovery</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">Action Items</span>
                            <ul className="space-y-2">
                               <li className="text-xs text-slate-700 flex gap-2 items-start"><CheckCircle className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" /> Map out core delivery workflow.</li>
                               <li className="text-xs text-slate-700 flex gap-2 items-start"><CheckCircle className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" /> Audit current sales pipeline.</li>
                               <li className="text-xs text-slate-700 flex gap-2 items-start"><CheckCircle className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" /> Identify primary operational bottlenecks.</li>
                            </ul>
                         </div>
                         <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Expected Outcome</span>
                            <p className="text-xs text-slate-800 mb-3 font-medium">Clear visibility into process gaps and immediate short-term fixes identified.</p>
                            <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Success Indicator</span>
                            <p className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded inline-block">Completion of process audit document.</p>
                         </div>
                      </div>
                   </div>

                   <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 border-l-4 border-l-[#0B2545]">
                      <h4 className="text-sm font-bold text-[#0B2545] uppercase tracking-widest mb-1">Days 31–60</h4>
                      <p className="text-xs text-slate-500 mb-4">Objective: Implementation & Standardization</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">Action Items</span>
                            <ul className="space-y-2">
                               <li className="text-xs text-slate-700 flex gap-2 items-start"><CheckCircle className="w-3.5 h-3.5 text-[#0B2545] shrink-0 mt-0.5" /> Draft and deploy top 3 SOPs.</li>
                               <li className="text-xs text-slate-700 flex gap-2 items-start"><CheckCircle className="w-3.5 h-3.5 text-[#0B2545] shrink-0 mt-0.5" /> Roll out standardized sales follow-up.</li>
                               <li className="text-xs text-slate-700 flex gap-2 items-start"><CheckCircle className="w-3.5 h-3.5 text-[#0B2545] shrink-0 mt-0.5" /> Assign KPI ownership to team leads.</li>
                            </ul>
                         </div>
                         <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Expected Outcome</span>
                            <p className="text-xs text-slate-800 mb-3 font-medium">Reduced reliance on founder for daily problem solving. Consistent execution begins.</p>
                            <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Success Indicator</span>
                            <p className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded inline-block">First successful weekly KPI review meeting.</p>
                         </div>
                      </div>
                   </div>

                   <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 border-l-4 border-l-emerald-500">
                      <h4 className="text-sm font-bold text-[#0B2545] uppercase tracking-widest mb-1">Days 61–90</h4>
                      <p className="text-xs text-slate-500 mb-4">Objective: Optimization & Scale Preparation</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">Action Items</span>
                            <ul className="space-y-2">
                               <li className="text-xs text-slate-700 flex gap-2 items-start"><CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" /> Review and refine newly implemented processes.</li>
                               <li className="text-xs text-slate-700 flex gap-2 items-start"><CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" /> Introduce automated tech tools for reporting.</li>
                               <li className="text-xs text-slate-700 flex gap-2 items-start"><CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" /> Launch proactive client retention program.</li>
                            </ul>
                         </div>
                         <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Expected Outcome</span>
                            <p className="text-xs text-slate-800 mb-3 font-medium">Business operates predictably. Foundation is set to confidently acquire new market share.</p>
                            <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Success Indicator</span>
                            <p className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded inline-block">Measurable increase in operational capacity.</p>
                         </div>
                      </div>
                   </div>
                </div>

             </div>
          )}

          {/* PAGE 5: NEXT STEP */}
          {activeTab === 'NEXT_STEP' && (
             <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
                
                <div className="text-center max-w-2xl mx-auto py-8">
                   <h2 className="text-2xl font-serif font-bold text-[#0B2545] mb-4">Ready to Unlock Your Complete Business Growth Plan?</h2>
                   <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      The Executive Business Snapshot™ provides a high-level understanding of your performance. 
                      The <strong className="text-[#0B2545]">Business Growth Diagnostic™</strong> identifies the root causes behind your challenges and delivers a personalized implementation strategy.
                   </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden max-w-4xl mx-auto">
                   <div className="bg-[#0B2545] p-8 text-center relative">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 blur-[80px] rounded-full pointer-events-none"></div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest mb-4 border border-[#D4AF37]/30">
                         Limited-Time Introductory Offer
                      </span>
                      <h3 className="text-2xl font-bold text-white mb-2">KRG ONE Business Growth Diagnostic™</h3>
                      <p className="text-slate-300 text-sm mb-6 flex items-center justify-center gap-2"><Clock className="w-4 h-4" /> 60–90 Minutes (Online or In-Person)</p>
                      
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                         <div className="text-center">
                            <span className="block text-[10px] uppercase font-bold text-slate-400 mb-1 line-through">Regular Consulting Fee</span>
                            <span className="text-xl font-bold text-slate-400 line-through">₹9,999</span>
                         </div>
                         <div className="hidden sm:block w-px h-12 bg-white/20"></div>
                         <div className="text-center bg-[#D4AF37]/10 px-6 py-2 rounded-xl border border-[#D4AF37]/30">
                            <span className="block text-[10px] uppercase font-black text-[#D4AF37] mb-1">Special Launch Price</span>
                            <span className="text-4xl font-black text-[#D4AF37]">₹1,499</span>
                         </div>
                      </div>
                   </div>
                   
                   <div className="p-8">
                      <h4 className="text-sm font-bold text-[#0B2545] uppercase tracking-widest mb-6 text-center border-b border-slate-100 pb-4">What You Will Receive</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                         {[
                            "Detailed review of the Business Growth Assessment™",
                            "Root Cause Analysis",
                            "Industry Benchmarking",
                            "Personalized Growth Opportunities",
                            "Revenue Improvement Recommendations",
                            "Customer Retention Strategy",
                            "Sales & Operational Improvement Suggestions",
                            "90-Day Strategic Action Plan",
                            "Live Q&A with a KRG ONE Business Growth Consultant"
                         ].map((item, i) => (
                            <div key={i} className="flex gap-3 items-start">
                               <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                               <span className="text-sm text-slate-700 font-medium">{item}</span>
                            </div>
                         ))}
                      </div>

                      <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mb-8 flex items-center gap-4">
                         <div className="w-12 h-12 rounded-full bg-[#0B2545] flex items-center justify-center shrink-0">
                            <Award className="w-6 h-6 text-[#D4AF37]" />
                         </div>
                         <div>
                            <span className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Deliverable</span>
                            <p className="text-sm text-[#0B2545] font-bold">A personalized Business Growth Diagnostic Summary with practical recommendations.</p>
                         </div>
                      </div>

                      <div className="flex flex-col items-center gap-6">
                         <button className="w-full sm:w-auto px-12 py-4 bg-gradient-to-r from-[#D4AF37] to-[#C59B27] text-[#0B2545] font-black text-sm uppercase tracking-wider rounded-xl hover:brightness-110 transition-all shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                             Book Your Diagnostic Today
                         </button>
                         
                         <div className="flex flex-col sm:flex-row items-center gap-6 text-sm font-bold text-[#0B2545]">
                            <a href="tel:7300300330" className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors"><Phone className="w-4 h-4" /> 7300300330</a>
                            <a href="mailto:enquiry.krgone@gmail.com" className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors"><Mail className="w-4 h-4" /> enquiry.krgone@gmail.com</a>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="max-w-2xl mx-auto mt-8 bg-slate-50 border border-slate-200 rounded-xl p-6 text-center">
                   <Lock className="w-5 h-5 text-slate-400 mx-auto mb-3" />
                   <h4 className="text-xs font-bold text-[#0B2545] uppercase tracking-widest mb-2">Confidentiality Commitment</h4>
                   <p className="text-xs text-slate-500 leading-relaxed">
                      Every engagement is protected by a professional Non-Disclosure Agreement (NDA). All business information, financial data, and strategic discussions remain strictly confidential.
                   </p>
                </div>

             </div>
          )}

          </div>
        </div>
      </div>
    </div>
  );
}
`
fs.writeFileSync('src/components/DashboardReport.tsx', content);
