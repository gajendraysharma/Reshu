
import React, { useState } from "react";
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, User, Target, BarChart3, PieChart, LayoutGrid, 
  Lightbulb, Briefcase, TrendingUp, AlertTriangle, CheckCircle2, 
  ArrowRight, ShieldCheck, Download, Printer, Compass, 
  Activity, Star, Zap, Anchor, LineChart, ChevronRight, Settings,
  Clock, Calendar, Layers, Map, Network, Users, DollarSign,
  FileText, ChevronDown, ChevronUp, Check, Award, Sparkles, Rocket, Loader2
} from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer, Tooltip as RechartsTooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  BarChart, Bar, Legend, Cell
} from 'recharts';

interface DashboardReportProps {
  formData: any;
  scores: number[];
}

export default function DashboardReport({ formData, scores }: DashboardReportProps) {
  const [activeTab, setActiveTab] = useState('OVERVIEW');
  
  const [expandedPillar, setExpandedPillar] = useState<number | null>(0);
  const [expandedPhase, setExpandedPhase] = useState<number | null>(1);
  
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

  const getScoreColor = (score: number) => {
    if (score >= 90) return "#16A34A"; 
    if (score >= 75) return "#22C55E"; 
    if (score >= 60) return "#F59E0B"; 
    if (score >= 40) return "#F97316"; 
    return "#DC2626"; 
  };

  const confidenceScore = (scores[21] || 0) * 20; 

  const radarData = pillars.map((name, i) => ({
    pillar: name.split(" & ")[0], 
    score: getPillarScore(i),
    industryAvg: 65,
    target: 90
  }));

  const sortedPillars = [...pillars].map((name, i) => ({ name, score: getPillarScore(i), idx: i }))
    .sort((a, b) => b.score - a.score);
  
  const topStrengths = sortedPillars.slice(0, 3);
  const improvementAreas = sortedPillars.slice(-3).reverse();
  const handlePrint = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.print();
  };

  const tabs = [
    { id: 'OVERVIEW', label: 'Executive Overview', icon: <LayoutGrid className="w-4 h-4" /> },
    { id: '7_PILLARS', label: '7 Pillar Analysis', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'OPPORTUNITIES', label: 'Growth Opportunities', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'AI_ADVISORY', label: 'AI Growth Advisory™', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'ROADMAP', label: '90-Day Growth Plan', icon: <Map className="w-4 h-4" /> },
  ];

  const companyName = formData.companyName || "Your Business";
  const industry = formData.industry || "your industry";

  return (
    <div className="bg-[#F7F8FA] print:bg-white min-h-screen font-sans text-slate-800 flex flex-col md:flex-row animate-in fade-in duration-1000">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex-shrink-0 sticky top-0 md:h-screen overflow-y-auto z-40 hidden md:flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] print:hidden">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#0B2545] rounded-xl flex items-center justify-center shadow-md">
            <ShieldCheck className="text-[#D4AF37] w-6 h-6" />
          </div>
          <div>
            <span className="font-black tracking-widest text-[#0B2545] block text-sm">KRG ONE</span>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Intelligence</span>
          </div>
        </div>
        
        <div className="p-4 flex-grow">
          <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 pl-3">Dashboards</div>
          <nav className="space-y-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-[12px] text-sm font-semibold transition-all duration-200 ${
                  activeTab === tab.id 
                    ? 'bg-[#0B2545] text-white shadow-[0_4px_12px_rgba(11,37,69,0.2)]' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-[#0B2545]'
                }`}
              >
                <span className={activeTab === tab.id ? 'text-[#D4AF37]' : 'text-slate-400'}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
          
          <div className="mt-12 border-t border-slate-100 pt-6">
            <div className="bg-slate-50 rounded-[16px] p-5 border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Prepared For</div>
              <div className="font-bold text-[#0B2545] text-sm truncate">{companyName}</div>
              <div className="text-xs text-slate-500 mt-1 truncate">{formData.fullName || 'Executive'}</div>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-slate-100">
          <button 
            type="button"
            id="krgone-pdf-trigger"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log("PDF Generation Triggered Manually");
              // @ts-ignore
              window.print() || alert("If the print window did not open, click the 'Open in New Tab' or 'Remix' button at the top right of the screen to test it outside the developer sandbox wrapper!");
            }}
            className="w-full sm:w-auto px-8 py-4 bg-[#d4af37] hover:bg-[#c29e2f] text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-md transition execution-btn cursor-pointer relative z-50"
          >
            Export PDF Button →
          </button>
        </div>
      </aside>

      {/* Mobile Nav (Top) */}
      <div className="md:hidden bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm print:hidden">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-[#0B2545] w-6 h-6" />
            <span className="font-black tracking-widest text-[#0B2545]">KRG ONE</span>
          </div>
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log("PDF Generation Triggered Manually");
              // @ts-ignore
              window.print() || alert("If the print window did not open, click the 'Open in New Tab' or 'Remix' button at the top right of the screen to test it outside the developer sandbox wrapper!");
            }}
            className="text-[#0B2545]"
          >
            <Download className="w-5 h-5" />
          </button>
        </div>
        <div className="flex overflow-x-auto px-4 pb-3 gap-2 no-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-[12px] text-xs font-bold transition-colors ${
                activeTab === tab.id ? 'bg-[#0B2545] text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main id="report-content" className="flex-grow p-4 md:p-8 lg:p-10 w-full overflow-x-hidden print:p-0">
        
        {/* PRINT ONLY: Page 1 Header & Profile */}
        <div className="hidden print:flex flex-col items-center justify-center min-h-[800px] text-center page-break-after-always pb-32">
          <div className="w-24 h-24 bg-[#0B2545] rounded-2xl flex items-center justify-center mb-8 mx-auto shadow-2xl">
            <ShieldCheck className="text-[#D4AF37] w-12 h-12" />
          </div>
          <h1 className="text-[48px] font-black text-[#0B2545] tracking-tight mb-4 leading-tight">
            KRG ONE™ | Business Growth Maturity Report
          </h1>
          <p className="text-[20px] font-medium text-slate-500 mb-16">
            Confidential Diagnostic Assessment
          </p>
          
          <div className="w-full max-w-2xl bg-[#F7F8FA] border border-slate-200 rounded-[24px] p-10 text-left">
            <h3 className="text-[14px] font-black uppercase text-slate-400 tracking-widest mb-8 border-b border-slate-200 pb-4">Client Profile</h3>
            <div className="grid grid-cols-2 gap-y-8 gap-x-12">
              <div>
                <div className="text-[11px] font-black uppercase text-slate-400 tracking-widest mb-1">Full Name</div>
                <div className="text-[18px] font-bold text-[#0B2545]">{formData.name}</div>
              </div>
              <div>
                <div className="text-[11px] font-black uppercase text-slate-400 tracking-widest mb-1">Company Name</div>
                <div className="text-[18px] font-bold text-[#0B2545]">{formData.company}</div>
              </div>
              <div>
                <div className="text-[11px] font-black uppercase text-slate-400 tracking-widest mb-1">Email Address</div>
                <div className="text-[18px] font-bold text-[#0B2545]">{formData.email}</div>
              </div>
              <div>
                <div className="text-[11px] font-black uppercase text-slate-400 tracking-widest mb-1">Mobile Number</div>
                <div className="text-[18px] font-bold text-[#0B2545]">{formData.phone}</div>
              </div>
              <div className="col-span-2 pt-4 border-t border-slate-200">
                <div className="text-[11px] font-black uppercase text-slate-400 tracking-widest mb-1">Revenue Bracket</div>
                <div className="text-[18px] font-bold text-[#0B2545]">{formData.revenue}</div>
              </div>
            </div>
          </div>
        </div>
        {/* Header Area */}
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 print:hidden">
          <div>
            <h1 className="text-3xl md:text-[36px] font-black text-[#0B2545] tracking-tight">Business Growth Intelligence™</h1>
            <p className="text-[15px] font-medium text-slate-500 mt-2 flex items-center gap-2">
              <Clock className="w-4 h-4" /> Generated for {companyName} • {new Date().toLocaleDateString()}
            </p>
          </div>
        </header>

        <div className="print:hidden">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: OVERVIEW */}
          {(activeTab === 'OVERVIEW' || true) && ( 
            <motion.div 
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`space-y-8 ${activeTab !== 'OVERVIEW' ? 'hidden print:block' : 'print:block'}`}
            >
              {/* Executive Hero Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Growth Score Card */}
                <div className="bg-white p-6 rounded-[20px] border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] print:shadow-none print:border-slate-300 flex flex-col items-center justify-center relative overflow-hidden transition-transform hover:-translate-y-1 group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#0B2545]/5 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/4"></div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Business Growth Score™</h3>
                  <div className="relative w-32 h-32 flex items-center justify-center mb-2">
                     <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                       <path className="text-slate-100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                       <path stroke={getScoreColor(globalScore)} strokeDasharray={`${globalScore}, 100`} strokeWidth="3" fill="none" strokeLinecap="round" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                     </svg>
                     <span className="text-[42px] font-black text-[#0B2545]">{globalScore}</span>
                  </div>
                  <div className="px-4 py-1.5 rounded-[12px] bg-slate-50 border border-slate-100 text-sm font-bold mt-2 shadow-sm" style={{ color: getScoreColor(globalScore) }}>
                    {getMaturityLevel(globalScore)}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-[20px] border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] print:shadow-none print:border-slate-300 transition-transform hover:-translate-y-1 flex flex-col justify-between group">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-xs font-black uppercase tracking-widest text-slate-400">Revenue Opportunity</span>
                      <div className="p-2 bg-[#16A34A]/10 text-[#16A34A] rounded-[10px] group-hover:bg-[#16A34A]/20 transition-colors"><TrendingUp className="w-5 h-5" /></div>
                    </div>
                    <h3 className="text-3xl font-black text-[#0B2545] mb-1">High</h3>
                    <div className="flex items-center gap-1 text-[#D4AF37]">
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 text-slate-200" />
                    </div>
                  </div>
                  <p className="text-[13px] font-medium text-slate-500 mt-4 border-t border-slate-100 pt-4">Substantial upside in scaling {topStrengths[0]?.name || 'Operations'}.</p>
                </div>

                <div className="bg-white p-6 rounded-[20px] border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] print:shadow-none print:border-slate-300 transition-transform hover:-translate-y-1 flex flex-col justify-between group">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-xs font-black uppercase tracking-widest text-slate-400">Growth Readiness</span>
                      <div className="p-2 bg-[#2563EB]/10 text-[#2563EB] rounded-[10px] group-hover:bg-[#2563EB]/20 transition-colors"><Target className="w-5 h-5" /></div>
                    </div>
                    <h3 className="text-3xl font-black text-[#0B2545] mb-1">{confidenceScore}%</h3>
                    <p className="text-[13px] font-bold text-slate-600">Goal achievement probability</p>
                  </div>
                  <p className="text-[13px] font-medium text-slate-500 mt-4 border-t border-slate-100 pt-4">Based on structural alignment towards growth.</p>
                </div>

                <div className="bg-white p-6 rounded-[20px] border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] print:shadow-none print:border-slate-300 transition-transform hover:-translate-y-1 flex flex-col justify-between group">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-xs font-black uppercase tracking-widest text-slate-400">Immediate Priority</span>
                      <div className="p-2 bg-[#DC2626]/10 text-[#DC2626] rounded-[10px] group-hover:bg-[#DC2626]/20 transition-colors"><AlertTriangle className="w-5 h-5" /></div>
                    </div>
                    <h3 className="text-[18px] font-black text-[#0B2545] leading-tight mb-1">{improvementAreas[0]?.name || 'N/A'}</h3>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[8px] bg-[#DC2626]/10 text-[#DC2626] text-[10px] font-bold mt-2 uppercase tracking-wide">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#DC2626] animate-pulse"></div> Critical Risk
                    </div>
                  </div>
                  <p className="text-[13px] font-medium text-slate-500 mt-4 border-t border-slate-100 pt-4">Requires stabilization in next 30 days.</p>
                </div>
              </div>

              {/* Executive Summary & Profile Split */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                <div className="lg:col-span-2 bg-white rounded-[24px] border border-slate-100 p-8 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative overflow-hidden print:shadow-none print:border-slate-300">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#0B2545]/5 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
                  
                  <h3 className="text-[26px] font-black text-[#0B2545] mb-8 flex items-center gap-3 relative z-10">
                    <FileText className="w-6 h-6 text-[#D4AF37]" /> Executive Summary
                  </h3>
                  
                  <div className="space-y-8 text-slate-700 text-[16px] leading-relaxed relative z-10">
                    <div className="space-y-3">
                      <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400">Current Business Position</h4>
                      <p className="font-medium">
                        Based on our comprehensive 7-pillar diagnostic, <strong>{companyName}</strong> is operating at a <strong style={{ color: getScoreColor(globalScore) }}>{getMaturityLevel(globalScore)}</strong> maturity level with an Overall Business Growth Score™ of <strong>{globalScore}%</strong>. Within the {industry} sector, this indicates a business that has established core competencies but is experiencing friction in scaling operations predictably. The current configuration suggests that while top-line revenue may be functional, bottom-line profitability and operational efficiency are likely constrained by manual dependencies and misaligned systems.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400">Strategic Strengths & Bottlenecks</h4>
                      <p className="font-medium">
                        Your primary operational advantage lies in <strong>{topStrengths[0]?.name}</strong> (Scoring {topStrengths[0]?.score}%), demonstrating a strong foundation that can be leveraged for market differentiation. However, this advantage is being actively neutralized by systemic vulnerabilities in <strong>{improvementAreas[0]?.name}</strong> (Scoring {improvementAreas[0]?.score}%). This critical gap creates a "growth ceiling"—meaning any new revenue generated will likely increase operational chaos rather than proportional profit margins. 
                      </p>
                    </div>
                    
                    <div className="bg-[#F7F8FA] p-6 rounded-[20px] border-l-[6px] border-[#0B2545] shadow-sm">
                      <h4 className="text-[11px] font-black uppercase tracking-widest text-[#0B2545] mb-2">Executive Recommendation</h4>
                      <p className="text-[#0B2545] font-bold text-[15px]">
                        To achieve your stated objective of <strong>"{formData.goal || 'Sustainable growth and optimization'}"</strong>, immediate leadership focus must shift away from localized problem-solving towards structural fortification. We recommend a 90-day stabilization phase targeting {improvementAreas[0]?.name}, followed by aggressive scaling of your {topStrengths[0]?.name} capabilities. Failure to address these operational leaks prior to scaling will compound existing risks and diminish long-term enterprise value.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-[24px] border border-slate-100 p-8 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] print:shadow-none print:border-slate-300">
                  <h3 className="text-[26px] font-black text-[#0B2545] mb-8 flex items-center gap-3">
                    <Building2 className="w-6 h-6 text-[#D4AF37]" /> Business Profile
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="bg-[#F7F8FA] p-4 rounded-[16px] border border-slate-100">
                      <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Executive Owner</div>
                      <div className="text-base font-black text-[#0B2545]">{formData.fullName || 'Not specified'}</div>
                    </div>
                    
                    <div className="bg-[#F7F8FA] p-4 rounded-[16px] border border-slate-100">
                      <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Company Name</div>
                      <div className="text-base font-black text-[#0B2545]">{companyName}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-[#F7F8FA] p-4 rounded-[16px] border border-slate-100">
                        <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Scale</div>
                        <div className="text-[15px] font-black text-[#0B2545]">{formData.businessSize || 'N/A'}</div>
                      </div>
                      <div className="bg-[#F7F8FA] p-4 rounded-[16px] border border-slate-100">
                        <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Revenue</div>
                        <div className="text-[15px] font-black text-[#0B2545]">{formData.revenue || 'N/A'}</div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Primary Objective</div>
                      <div className="bg-[#0B2545] p-4 rounded-[16px] shadow-md text-[14px] font-bold text-white leading-relaxed">
                        {formData.goal || 'Sustainable growth and optimization'}
                      </div>
                    </div>

                    <div className="pt-2">
                      <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Key Challenges</div>
                      <div className="bg-[#DC2626]/10 p-4 rounded-[16px] border border-[#DC2626]/20 text-[14px] font-bold text-[#DC2626] leading-relaxed">
                        {formData.challenges && formData.challenges.length > 0 ? formData.challenges.join(', ') : 'Identifying operational bottlenecks'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: 7 PILLARS */}
          {(activeTab === '7_PILLARS' || true) && (
            <motion.div
              key="7_pillars"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`space-y-8 ${activeTab !== '7_PILLARS' ? 'hidden print:block print:mt-12' : 'print:mt-12'}`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Radar Chart Card */}
                <div className="lg:col-span-1 bg-white rounded-[24px] border border-slate-100 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col print:shadow-none print:border-slate-300">
                  <h3 className="text-[26px] font-black text-[#0B2545] mb-2 flex items-center gap-3">
                    <Compass className="w-6 h-6 text-[#D4AF37]" /> Diagnostics Map
                  </h3>
                  <p className="text-[14px] text-slate-500 mb-8 font-medium">Visual mapping of your 7 business capabilities against industry benchmark targets.</p>
                  
                  <div className="flex-grow w-full min-h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                        <PolarGrid stroke="#F7F8FA" strokeWidth={2} />
                        <PolarAngleAxis dataKey="pillar" tick={{ fill: '#0B2545', fontSize: 11, fontWeight: 700 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar name="Your Score" dataKey="score" stroke="#0B2545" strokeWidth={3} fill="#0B2545" fillOpacity={0.15} />
                        <Radar name="Industry Target" dataKey="target" stroke="#D4AF37" strokeDasharray="5 5" fill="transparent" strokeWidth={2} />
                        <RechartsTooltip 
                          contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} 
                          itemStyle={{ fontWeight: 700, color: '#0B2545' }}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="flex justify-center gap-6 mt-6 pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-2"><span className="w-3 h-3 bg-[#0B2545] rounded-sm"></span><span className="text-xs font-bold text-slate-600">Your Score</span></div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 border-2 border-[#D4AF37] border-dashed rounded-sm"></span><span className="text-xs font-bold text-slate-600">Benchmark Target</span></div>
                  </div>
                </div>

                {/* Pillar Deep Dive List */}
                <div className="lg:col-span-2 space-y-4">
                   <h3 className="text-[26px] font-black text-[#0B2545] mb-2 px-2">Detailed Pillar Analysis</h3>
                   <p className="text-[14px] text-slate-500 mb-6 font-medium px-2">Expand each section for deep-dive executive observations and strategic recommendations.</p>
                   
                   {sortedPillars.map((pillar) => {
                     const isExpanded = expandedPillar === pillar.idx;
                     const scoreColor = getScoreColor(pillar.score);
                     const isCritical = pillar.score < 50;
                     
                     return (
                       <div key={pillar.idx} className={`bg-white rounded-[20px] border ${isExpanded ? 'border-[#0B2545]/20 shadow-[0_8px_30px_rgba(0,0,0,0.06)]' : 'border-slate-100 shadow-[0_4px_15px_rgba(0,0,0,0.02)]'} overflow-hidden transition-all duration-300`}>
                         <button 
                           onClick={() => setExpandedPillar(isExpanded ? null : pillar.idx)}
                           className="w-full px-6 py-5 flex items-center justify-between focus:outline-none hover:bg-slate-50/50"
                         >
                           <div className="flex items-center gap-4">
                             <div className="w-14 h-14 rounded-[16px] flex items-center justify-center font-black text-xl shadow-inner" style={{ backgroundColor: `${scoreColor}15`, color: scoreColor }}>
                               {pillar.score}
                             </div>
                             <div className="text-left">
                               <h4 className="text-[18px] font-black text-[#0B2545]">{pillar.name}</h4>
                               <div className="flex items-center gap-3 mt-1.5">
                                 <span className="text-[11px] font-black uppercase tracking-widest" style={{ color: scoreColor }}>
                                   {pillar.score >= 75 ? 'Leading Maturity' : pillar.score >= 50 ? 'Developing' : 'Critical Risk'}
                                 </span>
                                 {isCritical && (
                                   <span className="flex items-center gap-1 text-[10px] font-bold text-[#DC2626] bg-[#DC2626]/10 px-2 py-0.5 rounded-md">
                                     <AlertTriangle className="w-3 h-3" /> Urgent
                                   </span>
                                 )}
                               </div>
                             </div>
                           </div>
                           <div className="flex items-center gap-6">
                             <div className="hidden md:block w-40 h-2.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                               <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${pillar.score}%`, backgroundColor: scoreColor }}></div>
                             </div>
                             <div className={`p-2 rounded-full ${isExpanded ? 'bg-slate-100' : 'bg-transparent'}`}>
                               {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-600" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                             </div>
                           </div>
                         </button>
                         
                         <AnimatePresence>
                           {isExpanded && (
                             <motion.div
                               initial={{ height: 0, opacity: 0 }}
                               animate={{ height: 'auto', opacity: 1 }}
                               exit={{ height: 0, opacity: 0 }}
                               transition={{ duration: 0.3 }}
                               className="border-t border-slate-100 bg-[#F7F8FA]"
                             >
                               <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                                 <div className="space-y-6">
                                   <div>
                                     <h5 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2.5">Executive Observation</h5>
                                     <p className="text-[14px] font-medium text-slate-700 leading-relaxed">
                                       {pillar.score >= 75 
                                         ? `Your capability in ${pillar.name} demonstrates high maturity. The systems and processes here are functioning as a strategic advantage for ${companyName}. The focus should shift from building to optimizing and leveraging this strength to pull other weaker areas forward.`
                                         : pillar.score >= 50
                                         ? `Performance in ${pillar.name} is functional but inconsistent. While basic operations exist, they lack the robust systematization required for scale. You are heavily reliant on manual intervention, which will break under rapid growth.`
                                         : `Critical vulnerability detected in ${pillar.name}. The current state presents immediate commercial risk. Without foundational restructuring, this area will actively block your ability to achieve your goal of "${formData.goal}".`}
                                     </p>
                                   </div>
                                   <div>
                                     <h5 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2.5">Commercial Impact</h5>
                                     <div className="bg-white p-5 rounded-[16px] border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] text-[14px] font-bold text-[#0B2545]">
                                       {isCritical 
                                         ? "Direct loss of revenue potential, high operational friction, and increased executive fatigue."
                                         : "Moderate inefficiencies causing margin compression and delayed strategic execution."}
                                     </div>
                                   </div>
                                 </div>
                                 
                                 <div className="space-y-6">
                                   <div className="bg-[#2563EB]/5 border border-[#2563EB]/20 rounded-[20px] p-6 h-full flex flex-col">
                                     <h5 className="text-[10px] font-black uppercase text-[#2563EB] tracking-widest mb-4 flex items-center gap-1.5 bg-white w-fit px-3 py-1 rounded-full shadow-sm">
                                       <Sparkles className="w-3.5 h-3.5" /> AI Recommendation
                                     </h5>
                                     <p className="text-[15px] font-bold text-[#0B2545] leading-relaxed mb-6 flex-grow">
                                       {isCritical 
                                         ? `Implement an immediate 30-day turnaround protocol for ${pillar.name}. Audit all existing workflows, remove bottlenecks, and establish rigid KPIs.`
                                         : `Standardize the top 20% of activities driving 80% of results in ${pillar.name}. Introduce automation where applicable to free up capacity.`}
                                     </p>
                                     <div className="grid grid-cols-2 gap-4 border-t border-[#2563EB]/10 pt-4">
                                       <div className="bg-white/60 p-3 rounded-[12px]">
                                         <span className="text-[9px] uppercase text-slate-500 font-black tracking-widest block mb-1">Effort</span>
                                         <span className="text-[13px] font-black text-[#0B2545]">{isCritical ? 'High / Strategic' : 'Medium / Operational'}</span>
                                       </div>
                                       <div className="bg-white/60 p-3 rounded-[12px]">
                                         <span className="text-[9px] uppercase text-slate-500 font-black tracking-widest block mb-1">Expected ROI</span>
                                         <span className="text-[13px] font-black text-[#16A34A]">{isCritical ? 'Transformative' : 'Incremental'}</span>
                                       </div>
                                     </div>
                                   </div>
                                 </div>
                               </div>
                             </motion.div>
                           )}
                         </AnimatePresence>
                       </div>
                     );
                   })}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: OPPORTUNITIES */}
          {(activeTab === 'OPPORTUNITIES' || true) && (
            <motion.div
              key="opportunities"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`space-y-8 ${activeTab !== 'OPPORTUNITIES' ? 'hidden print:block print:mt-12' : 'print:mt-12'}`}
            >
              <div className="bg-white rounded-[24px] border border-slate-100 p-8 md:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.04)] print:shadow-none print:border-slate-300">
                <div className="max-w-3xl mb-12">
                  <h3 className="text-[26px] font-black text-[#0B2545] mb-4 flex items-center gap-3">
                    <TrendingUp className="w-7 h-7 text-[#D4AF37]" /> Value Creation Opportunities
                  </h3>
                  <p className="text-[16px] text-slate-600 font-medium leading-relaxed">
                    Based on your diagnostic profile, we have quantified specific areas where operational optimization will directly translate into commercial value for <strong>{companyName}</strong>. 
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-[#F7F8FA] rounded-[24px] p-8 border border-slate-100 hover:border-[#16A34A]/30 hover:shadow-[0_8px_30px_rgba(22,163,74,0.06)] transition-all group">
                    <div className="w-14 h-14 bg-white rounded-[16px] shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <DollarSign className="w-7 h-7 text-[#16A34A]" />
                    </div>
                    <h4 className="text-[18px] font-black text-[#0B2545] mb-3">Revenue Velocity</h4>
                    <p className="text-[14px] font-medium text-slate-600 mb-8 leading-relaxed">
                      By resolving friction in {improvementAreas[0]?.name}, you can accelerate your sales cycle and improve conversion rates without increasing marketing spend.
                    </p>
                    <div className="bg-white p-4 rounded-[16px] border border-slate-100 shadow-sm">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1.5">Impact Potential</span>
                      <span className="text-[15px] font-black text-[#16A34A]">High Commercial Value</span>
                    </div>
                  </div>

                  <div className="bg-[#F7F8FA] rounded-[24px] p-8 border border-slate-100 hover:border-[#2563EB]/30 hover:shadow-[0_8px_30px_rgba(37,99,235,0.06)] transition-all group">
                    <div className="w-14 h-14 bg-white rounded-[16px] shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Users className="w-7 h-7 text-[#2563EB]" />
                    </div>
                    <h4 className="text-[18px] font-black text-[#0B2545] mb-3">Operational Leverage</h4>
                    <p className="text-[14px] font-medium text-slate-600 mb-8 leading-relaxed">
                      Standardizing processes within {improvementAreas[1]?.name || 'Operations'} will decouple your revenue growth from headcount growth, dramatically improving profit margins.
                    </p>
                    <div className="bg-white p-4 rounded-[16px] border border-slate-100 shadow-sm">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1.5">Impact Potential</span>
                      <span className="text-[15px] font-black text-[#2563EB]">Margin Expansion</span>
                    </div>
                  </div>

                  <div className="bg-[#F7F8FA] rounded-[24px] p-8 border border-slate-100 hover:border-[#D4AF37]/30 hover:shadow-[0_8px_30px_rgba(212,175,55,0.06)] transition-all group">
                    <div className="w-14 h-14 bg-white rounded-[16px] shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Building2 className="w-7 h-7 text-[#D4AF37]" />
                    </div>
                    <h4 className="text-[18px] font-black text-[#0B2545] mb-3">Enterprise Valuation</h4>
                    <p className="text-[14px] font-medium text-slate-600 mb-8 leading-relaxed">
                      Transitioning from a founder-dependent model to a systematized operation ({topStrengths[0]?.name}) instantly increases the transferable value of the organization.
                    </p>
                    <div className="bg-white p-4 rounded-[16px] border border-slate-100 shadow-sm">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1.5">Impact Potential</span>
                      <span className="text-[15px] font-black text-[#D4AF37]">Strategic Multiplier</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Growth Priority Matrix */}
              <div className="bg-white rounded-[24px] border border-slate-100 p-8 md:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.04)] print:shadow-none print:border-slate-300">
                <h3 className="text-[26px] font-black text-[#0B2545] mb-8 flex items-center gap-3">
                  <LayoutGrid className="w-6 h-6 text-[#D4AF37]" /> Strategic Intervention Matrix
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="border-t-4 border-[#DC2626] bg-[#F7F8FA] p-8 rounded-b-[20px] rounded-t-sm shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-6">
                      <h4 className="text-[12px] font-black uppercase tracking-widest text-[#0B2545]">Fix First</h4>
                      <span className="bg-[#DC2626] text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider">Urgent</span>
                    </div>
                    <h5 className="text-[20px] font-black text-[#0B2545] mb-3">{improvementAreas[0]?.name || 'Financial Structuring'}</h5>
                    <p className="text-[14px] text-slate-600 font-medium mb-6 leading-relaxed">Immediate risk mitigation required to prevent operational failure during scaling. Focus on creating rigid, repeatable processes.</p>
                    <div className="flex gap-6 border-t border-slate-200 pt-6">
                      <div className="bg-white px-4 py-2 rounded-[12px] border border-slate-100"><span className="text-[9px] text-slate-400 font-black block uppercase tracking-widest mb-1">ROI</span><span className="text-[15px] font-black text-[#0B2545]">High</span></div>
                      <div className="bg-white px-4 py-2 rounded-[12px] border border-slate-100"><span className="text-[9px] text-slate-400 font-black block uppercase tracking-widest mb-1">Effort</span><span className="text-[15px] font-black text-[#0B2545]">High</span></div>
                    </div>
                  </div>

                  <div className="border-t-4 border-[#F59E0B] bg-[#F7F8FA] p-8 rounded-b-[20px] rounded-t-sm shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-6">
                      <h4 className="text-[12px] font-black uppercase tracking-widest text-[#0B2545]">Optimize Next</h4>
                      <span className="bg-[#F59E0B] text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider">Strategic</span>
                    </div>
                    <h5 className="text-[20px] font-black text-[#0B2545] mb-3">{improvementAreas[1]?.name || 'Process Automation'}</h5>
                    <p className="text-[14px] text-slate-600 font-medium mb-6 leading-relaxed">Cross-team alignment and workflow optimization to improve margin efficiency and decouple revenue from direct headcount.</p>
                    <div className="flex gap-6 border-t border-slate-200 pt-6">
                      <div className="bg-white px-4 py-2 rounded-[12px] border border-slate-100"><span className="text-[9px] text-slate-400 font-black block uppercase tracking-widest mb-1">ROI</span><span className="text-[15px] font-black text-[#0B2545]">Medium</span></div>
                      <div className="bg-white px-4 py-2 rounded-[12px] border border-slate-100"><span className="text-[9px] text-slate-400 font-black block uppercase tracking-widest mb-1">Effort</span><span className="text-[15px] font-black text-[#0B2545]">Medium</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: AI ADVISORY */}
          {(activeTab === 'AI_ADVISORY' || true) && (
            <motion.div
              key="advisory"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`space-y-8 ${activeTab !== 'AI_ADVISORY' ? 'hidden print:block print:mt-12' : 'print:mt-12'}`}
            >
              <div className="bg-[#F0F5FF] rounded-[24px] border border-[#2563EB]/20 p-10 md:p-14 relative overflow-hidden print:bg-none print:bg-white print:border-slate-300">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#2563EB]/10 rounded-full blur-[80px] translate-x-1/3 -translate-y-1/3 print:hidden"></div>
                
                <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-[#2563EB]/20 mb-8 relative z-10">
                  <Sparkles className="w-5 h-5 text-[#2563EB]" />
                  <span className="text-[11px] font-black uppercase tracking-widest text-[#2563EB]">Generated by KRG ONE AI Growth Advisory™</span>
                </div>

                <h3 className="text-[32px] md:text-[40px] font-black text-[#0B2545] mb-8 relative z-10 max-w-4xl leading-tight">
                  Strategic Advisory & Leadership Perspective
                </h3>
                
                <div className="text-[16px] md:text-[18px] text-slate-700 font-medium leading-relaxed relative z-10 max-w-4xl space-y-6">
                  <p>
                    Operating within the {industry} sector at your scale, achieving your goal of "{formData.goal}" requires a fundamental paradigm shift from operator-led activity to system-led growth. 
                  </p>
                  <p>
                    Your overall score of {globalScore}% indicates that while core competencies exist, execution inconsistencies in <strong className="text-[#0B2545]">{improvementAreas[0]?.name}</strong> are actively suppressing profitability and capping your growth potential. The business is currently overly dependent on key personnel or manual oversight.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-[24px] border border-slate-100 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all group">
                  <div className="w-14 h-14 bg-[#0B2545] rounded-[16px] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                    <AlertTriangle className="w-6 h-6 text-[#DC2626]" />
                  </div>
                  <h4 className="text-[20px] font-black text-[#0B2545] mb-4">Critical Business Risk</h4>
                  <p className="text-[14px] text-slate-600 font-medium leading-relaxed">
                    Lack of standardized, documented protocols in {improvementAreas[0]?.name} is causing revenue leakage. Every new client or project currently increases operational friction linearly.
                  </p>
                </div>
                
                <div className="bg-white rounded-[24px] border border-slate-100 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all group">
                  <div className="w-14 h-14 bg-[#0B2545] rounded-[16px] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                    <Award className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <h4 className="text-[20px] font-black text-[#0B2545] mb-4">Strategic Advantage</h4>
                  <p className="text-[14px] text-slate-600 font-medium leading-relaxed">
                    Your existing capability in {topStrengths[0]?.name} is highly mature. Rather than building new features, package and systemize this strength to create an unassailable moat against competitors.
                  </p>
                </div>

                <div className="bg-white rounded-[24px] border border-slate-100 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all group">
                  <div className="w-14 h-14 bg-[#D4AF37] rounded-[16px] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                    <Target className="w-6 h-6 text-[#0B2545]" />
                  </div>
                  <h4 className="text-[20px] font-black text-[#0B2545] mb-4">Top Executive Decision</h4>
                  <p className="text-[14px] text-slate-600 font-medium leading-relaxed">
                    Stop competing on operational heroics. Invest the next quarter exclusively in building the management infrastructure for {improvementAreas[0]?.name} before attempting to scale sales.
                  </p>
                </div>
              </div>

              <div className="bg-[#0B2545] rounded-[32px] p-12 md:p-16 text-center mt-16 relative overflow-hidden print:hidden shadow-[0_20px_50px_rgba(11,37,69,0.3)]">
                 <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9InRyYW5zcGFyZW50Ii8+PGxpbmUgeDE9IjAiIHkxPSI0IiB4Mj0iNCIgeTI9IjAiIHN0cm9rZT0iIzFmMjkzNyIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+')] opacity-10"></div>
                 <h3 className="text-[36px] md:text-[42px] font-black text-white mb-6 relative z-10 tracking-tight">Translate Insights into Action</h3>
                 <p className="text-slate-300 font-medium mb-12 max-w-3xl mx-auto relative z-10 text-[18px] leading-relaxed">
                   Book a comprehensive 90-minute Live Business Growth Diagnostic™ with a Senior Executive Consultant to customize this strategic roadmap to your exact organizational context.
                 </p>
                 <button onClick={() => alert("Redirecting to booking...")} className="relative z-10 bg-[#D4AF37] text-[#0B2545] px-12 py-5 rounded-[16px] font-black uppercase tracking-widest text-[14px] hover:bg-white transition-colors shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                   Book Executive Diagnostic (₹1,499)
                 </button>
              </div>
            </motion.div>
          )}

          {/* TAB 5: ROADMAP */}
          {(activeTab === 'ROADMAP' || true) && (
            <motion.div
              key="roadmap"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`space-y-8 ${activeTab !== 'ROADMAP' ? 'hidden print:block print:mt-12 print:break-before-page' : 'print:mt-12'}`}
            >
              <div className="bg-white rounded-[24px] border border-slate-100 p-8 md:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.04)] print:shadow-none print:border-slate-300">
                <div className="max-w-4xl mb-12">
                  <h3 className="text-[26px] font-black text-[#0B2545] mb-4 flex items-center gap-3">
                    <Map className="w-7 h-7 text-[#D4AF37]" /> 90-Day Execution Roadmap
                  </h3>
                  <p className="text-[16px] text-slate-600 font-medium leading-relaxed">
                    A phased, strategic consulting approach designed to stabilize critical vulnerabilities and scale your {industry} business. Tailored for your current scale ({formData.businessSize || 'SME'}, {formData.revenue || 'Undisclosed Revenue'}) to achieve "{formData.goal || 'Sustainable growth and optimization'}".
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      idx: 1,
                      id: 'Phase 1',
                      timeline: 'Days 1 - 30',
                      title: 'Quick Wins & Stabilization',
                      priority: 'High Priority',
                      priorityColor: '#DC2626',
                      priorityIcon: <AlertTriangle className="w-3 h-3" />,
                      icon: <Zap className="w-6 h-6" />,
                      color: '#D4AF37',
                      objective: `Arrest immediate operational leakage in ${improvementAreas[0]?.name || 'Core Operations'} to prepare the foundation for scaling.`,
                      focus: 'Process Standardization & Immediate Risk Mitigation',
                      actions: [
                        `Audit the top 3 workflows causing friction in ${improvementAreas[0]?.name || 'operations'}.`,
                        `Implement emergency standard operating procedures (SOPs) for client onboarding/delivery.`,
                        `Establish a weekly leadership war room to track addressing "${formData.challenges?.[0] || 'operational challenges'}".`
                      ],
                      kpi: 'Zero critical operational failures; 100% SOP adherence.',
                      impact: 'Stops revenue leakage, reduces executive firefighting.'
                    },
                    {
                      idx: 2,
                      id: 'Phase 2',
                      timeline: 'Days 31 - 60',
                      title: 'Business Improvements',
                      priority: 'Medium Priority',
                      priorityColor: '#D97706',
                      priorityIcon: <TrendingUp className="w-3 h-3" />,
                      icon: <Settings className="w-6 h-6" />,
                      color: '#0B2545',
                      objective: `Optimize ${improvementAreas[1]?.name || 'Secondary Systems'} to increase margin efficiency and team output.`,
                      focus: 'Automation & Cross-Departmental Alignment',
                      actions: [
                        `Deploy basic automation (CRM, ERP, or Zapier) to reduce manual data entry by 30%.`,
                        `Restructure reporting lines to ensure clear accountability across the team.`,
                        `Launch a performance dashboard to track leading indicators of success.`
                      ],
                      kpi: '15% reduction in task completion time; 100% data visibility.',
                      impact: 'Increases operational leverage and expands profit margins.'
                    },
                    {
                      idx: 3,
                      id: 'Phase 3',
                      timeline: 'Days 61 - 90',
                      title: 'Scale & Growth Initiatives',
                      priority: 'Strategic',
                      priorityColor: '#16A34A',
                      priorityIcon: <Star className="w-3 h-3" />,
                      icon: <Rocket className="w-6 h-6" />,
                      color: '#16A34A',
                      objective: `Aggressively scale your core competency in ${topStrengths[0]?.name || 'Sales'} to capture new market share safely.`,
                      focus: 'Revenue Velocity & Market Expansion',
                      actions: [
                        `Activate outbound sales campaigns targeting high-LTV ${industry} accounts.`,
                        `Implement an up-sell/cross-sell matrix for existing key accounts.`,
                        `Review quarterly P&L to ensure growth is translating to bottom-line profit.`
                      ],
                      kpi: '20% increase in qualified pipeline; 10% lift in ACV.',
                      impact: 'Accelerates revenue velocity without breaking fulfillment.'
                    }
                  ].map((phase) => {
                    const isExpanded = expandedPhase === phase.idx;
                    const scoreColor = phase.color;
                    
                    return (
                      <div key={phase.idx} className={`bg-white rounded-[20px] border ${isExpanded ? 'border-[#0B2545]/20 shadow-[0_8px_30px_rgba(0,0,0,0.06)]' : 'border-slate-100 shadow-[0_4px_15px_rgba(0,0,0,0.02)]'} overflow-hidden transition-all duration-300`}>
                        <button 
                          onClick={() => setExpandedPhase(isExpanded ? null : phase.idx)}
                          className="w-full px-6 py-5 flex items-center justify-between focus:outline-none hover:bg-slate-50/50"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-[16px] flex items-center justify-center font-black text-xl shadow-inner text-white" style={{ backgroundColor: scoreColor }}>
                              {phase.icon}
                            </div>
                            <div className="text-left">
                              <div className="flex items-center gap-2 mb-1.5">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{phase.id} • {phase.timeline}</span>
                              </div>
                              <h4 className="text-[18px] font-black text-[#0B2545]">{phase.title}</h4>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest" style={{ color: phase.priorityColor, backgroundColor: `${phase.priorityColor}15` }}>
                              {phase.priorityIcon} {phase.priority}
                            </div>
                            <div className={`p-2 rounded-full ${isExpanded ? 'bg-slate-100' : 'bg-transparent'}`}>
                              {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-600" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                            </div>
                          </div>
                        </button>
                        
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="border-t border-slate-100 bg-[#F7F8FA]"
                            >
                              <div className="p-6 md:p-8">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                  <div className="space-y-6">
                                    <div>
                                      <h5 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2.5 flex items-center gap-1.5"><Target className="w-3.5 h-3.5" /> Objective</h5>
                                      <p className="text-[14px] font-medium text-slate-700 leading-relaxed">
                                        {phase.objective}
                                      </p>
                                    </div>
                                    <div>
                                      <h5 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2.5 flex items-center gap-1.5"><Layers className="w-3.5 h-3.5" /> Key Focus Area</h5>
                                      <div className="bg-white p-4 rounded-[16px] border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] text-[14px] font-bold text-[#0B2545]">
                                        {phase.focus}
                                      </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div className="bg-white p-4 rounded-[16px] border border-slate-100 shadow-sm">
                                        <h5 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1.5">Success KPIs</h5>
                                        <div className="text-[13px] font-bold text-[#0B2545] leading-relaxed">{phase.kpi}</div>
                                      </div>
                                      <div className="bg-white p-4 rounded-[16px] border border-slate-100 shadow-sm">
                                        <h5 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1.5">Business Impact</h5>
                                        <div className="text-[13px] font-bold text-[#16A34A] leading-relaxed">{phase.impact}</div>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-6">
                                    <div className="bg-white border border-slate-100 rounded-[20px] p-6 md:p-8 h-full shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                                      <h5 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-5 flex items-center gap-1.5">
                                        <Check className="w-3.5 h-3.5" /> Action Items
                                      </h5>
                                      <ul className="space-y-5">
                                        {phase.actions.map((action, i) => (
                                          <li key={i} className="flex items-start gap-4">
                                            <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-sm" style={{ backgroundColor: `${scoreColor}15`, color: scoreColor }}>
                                              <span className="text-[12px] font-black">{i + 1}</span>
                                            </div>
                                            <span className="text-[14px] font-medium text-slate-700 leading-relaxed pt-0.5">{action}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
        {/* PRINT ONLY: Pages 2 & 3 */}
        <div className="hidden print:block w-full bg-white pb-32">
          
          {/* Page 2: Scores Layout Grid */}
          <div className="page-break-after-always pt-12 pb-32">
            <h2 className="text-[32px] font-black text-[#0B2545] tracking-tight mb-12 border-b-2 border-slate-100 pb-4">
              Growth Score & 7 Pillar Breakdown
            </h2>
            
            <div className="flex flex-col gap-12">
              <div className="flex flex-col items-center justify-center p-12 rounded-[24px] border border-slate-300">
                <h3 className="text-[14px] font-black uppercase tracking-widest text-slate-400 mb-8">Total Business Growth Score™</h3>
                <div className="relative w-48 h-48 flex items-center justify-center mb-6">
                   <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                     <path className="text-slate-100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                     <path stroke={getScoreColor(globalScore)} strokeDasharray={`${globalScore}, 100`} strokeWidth="3" fill="none" strokeLinecap="round" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                   </svg>
                   <span className="text-[64px] font-black text-[#0B2545]">{globalScore}</span>
                </div>
                <div className="px-6 py-2 rounded-full border border-slate-300 text-[18px] font-bold" style={{ color: getScoreColor(globalScore) }}>
                  {getMaturityLevel(globalScore)}
                </div>
              </div>

              <div className="w-full">
                <h3 className="text-[14px] font-black uppercase tracking-widest text-slate-400 mb-6">7 Growth Areas Analysis</h3>
                <div className="space-y-4">
                  {pillars.map((pillar, idx) => {
                    const score = getPillarScore(idx);
                    return (
                      <div key={idx} className="flex items-center justify-between border-b border-slate-200 pb-4">
                        <span className="text-[18px] font-bold text-[#0B2545]">{pillar}</span>
                        <div className="flex items-center gap-4">
                          <div className="w-64 h-3 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${score}%`, backgroundColor: getScoreColor(score) }}></div>
                          </div>
                          <span className="text-[18px] font-black w-12 text-right" style={{ color: getScoreColor(score) }}>{score}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Page 3: 90-Day Execution Plan */}
          <div className="pt-12 relative min-h-[800px]">
            <h2 className="text-[32px] font-black text-[#0B2545] tracking-tight mb-12 border-b-2 border-slate-100 pb-4">
              90-Day Execution Roadmap
            </h2>
            
            <div className="space-y-12">
              {[
                {
                  timeline: 'Days 1 - 30',
                  title: 'Quick Wins & Stabilization',
                  objective: `Arrest immediate operational leakage in ${improvementAreas[0]?.name || 'Core Operations'} to prepare the foundation for scaling.`,
                  actions: [
                    `Audit the top 3 workflows causing friction in ${improvementAreas[0]?.name || 'operations'}.`,
                    `Implement emergency standard operating procedures (SOPs) for client onboarding/delivery.`,
                    `Establish a weekly leadership war room to track addressing "${formData.challenges?.[0] || 'operational challenges'}".`
                  ],
                },
                {
                  timeline: 'Days 31 - 60',
                  title: 'Business Improvements',
                  objective: `Optimize ${improvementAreas[1]?.name || 'Secondary Systems'} to increase margin efficiency and team output.`,
                  actions: [
                    `Deploy basic automation (CRM, ERP, or Zapier) to reduce manual data entry by 30%.`,
                    `Restructure reporting lines to ensure clear accountability across the team.`,
                    `Launch a performance dashboard to track leading indicators of success.`
                  ],
                },
                {
                  timeline: 'Days 61 - 90',
                  title: 'Scale & Growth Initiatives',
                  objective: `Aggressively scale your core competency in ${topStrengths[0]?.name || 'Sales'} to capture new market share safely.`,
                  actions: [
                    `Activate outbound sales campaigns targeting high-LTV ${industry} accounts.`,
                    `Implement an up-sell/cross-sell matrix for existing key accounts.`,
                    `Review quarterly P&L to ensure growth is translating to bottom-line profit.`
                  ],
                }
              ].map((phase, idx) => (
                <div key={idx} className="border border-slate-300 rounded-[24px] p-8">
                  <div className="mb-6 pb-6 border-b border-slate-200">
                    <div className="text-[14px] font-black uppercase text-slate-400 tracking-widest mb-2">{phase.timeline}</div>
                    <h3 className="text-[24px] font-black text-[#0B2545]">{phase.title}</h3>
                  </div>
                  
                  <div className="mb-8">
                    <div className="text-[12px] font-black uppercase text-slate-400 tracking-widest mb-2">Primary Objective</div>
                    <p className="text-[16px] font-bold text-slate-700">{phase.objective}</p>
                  </div>
                  
                  <div>
                    <div className="text-[12px] font-black uppercase text-slate-400 tracking-widest mb-4">Key Action Items</div>
                    <ul className="space-y-4">
                      {phase.actions.map((act, i) => (
                        <li key={i} className="flex items-start gap-4">
                          <div className="w-6 h-6 rounded border-2 border-slate-300 flex-shrink-0 mt-0.5"></div>
                          <span className="text-[16px] text-slate-800">{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Print Footer */}
            <div className="fixed bottom-0 left-0 right-0 w-full text-center border-t border-slate-300 bg-white pt-4 pb-2 print:block hidden">
              <p className="text-[12px] font-black text-[#0B2545] uppercase tracking-widest mb-1">
                Next Step: Book your 1-on-1 Growth Consultation call at the special rate of ₹1,499.
              </p>
              <p className="text-[12px] font-bold text-slate-500">
                Email: enquiry.krgone@gmail.com | Phone: +91 73003 00330
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
