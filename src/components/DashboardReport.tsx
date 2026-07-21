import React, { useState, useRef, useEffect } from 'react';
import {
  ShieldCheck, LayoutDashboard, BarChart3, TrendingUp, Cpu, Building2, Calendar, Download, PhoneCall,
  User, Factory, Users, Coins, CheckCircle2, AlertTriangle, ArrowUpRight, Activity, Target, AlertCircle, Clock, Award,
  ChevronRight, Check, Sparkles, Send, Share2, Printer, Briefcase, GitBranch, Star, Shield
} from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export default function DashboardReport({ formData = {}, scores = [] }: any) {
  const [activeTab, setActiveTab] = useState('overview');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [selectedDate, setSelectedDate] = useState('July 24, 2026');
  const [selectedTime, setSelectedTime] = useState('11:30 AM IST');
  const [copiedLink, setCopiedLink] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  const leftSidebarRef = useRef<HTMLElement>(null);
  const rightSidebarRef = useRef<HTMLElement>(null);
  const activeTabContentRef = useRef<HTMLDivElement>(null);

  const [availableSpace, setAvailableSpace] = useState(0);

  useEffect(() => {
    const updateHeights = () => {
      if (!leftSidebarRef.current || !rightSidebarRef.current || !activeTabContentRef.current) return;
      
      const leftHeight = leftSidebarRef.current.offsetHeight || 0;
      const rightHeight = rightSidebarRef.current.offsetHeight || 0;
      const centerHeight = activeTabContentRef.current.offsetHeight || 0;
      
      const maxSidebar = Math.max(leftHeight, rightHeight);
      const space = maxSidebar - centerHeight;
      setAvailableSpace(space > 0 ? space : 0);
    };

    // Run initially after mounting/rendering
    setTimeout(updateHeights, 100);

    const observer = new ResizeObserver(() => {
      updateHeights();
    });

    if (leftSidebarRef.current) observer.observe(leftSidebarRef.current);
    if (rightSidebarRef.current) observer.observe(rightSidebarRef.current);
    if (activeTabContentRef.current) observer.observe(activeTabContentRef.current);

    window.addEventListener('resize', updateHeights);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateHeights);
    };
  }, [activeTab, completedTasks, selectedDate, selectedTime, bookingConfirmed]);

  // Fallback defaults to match the image exactly
  const compName = formData.companyName || 'ABC Manufacturing Pvt. Ltd.';
  const ownerName = formData.fullName || 'Gajendra Kumar Sharma';
  const industryType = formData.industry || 'Manufacturing';
  const revenueTier = formData.revenue || '₹ 5 – 20 Cr';
  const employeeCount = formData.employees || '50 – 100';
  const businessGoal = formData.goals?.join(', ') || 'Increase Sales & Market Share';
  const topChallenge = formData.challenges?.[0] || 'High Operational Costs';

  const PILLARS = [
    "Leadership & Vision",
    "Sales & Revenue",
    "Marketing & Customer Growth",
    "Operations & Process",
    "Finance & Business Performance",
    "People & Leadership",
    "Technology & Business Innovation"
  ];

  // Dynamic Pillar score calculations or high-fidelity defaults matching the image
  const getPillarScores = () => {
    const hasScores = scores && scores.length > 0 && scores.some((s: number) => s > 0);
    if (!hasScores) {
      return [72, 68, 65, 58, 80, 70, 75]; // Matches the image's high-tier profile
    }
    return PILLARS.map((_, i) => {
      const start = i * 3;
      const val1 = scores[start] || 0;
      const val2 = scores[start + 1] || 0;
      const val3 = scores[start + 2] || 0;
      const total = val1 + val2 + val3;
      return Math.round((total / 12) * 100) || 0;
    });
  };

  const pillarScores = getPillarScores();

  const getGlobalScore = () => {
    const hasScores = scores && scores.length > 0 && scores.some((s: number) => s > 0);
    if (!hasScores) return 72; // Sits at the beautiful 72/100 shown in the image
    const weights = [0.18, 0.17, 0.14, 0.16, 0.15, 0.10, 0.10];
    let sum = 0;
    for (let i = 0; i < 7; i++) { sum += pillarScores[i] * weights[i]; }
    return Math.round(sum);
  };

  const globalScore = getGlobalScore();
  const isLowScore = globalScore < 70;
  const isHighScore = globalScore >= 85;

  const radarData = PILLARS.map((pillar, i) => ({
    subject: pillar.replace(' & ', '\n'),
    A: pillarScores[i],
    fullMark: 100,
  }));

  const TABS = [
    { id: 'overview', name: 'Executive Overview', icon: ShieldCheck },
    { id: 'health', name: 'Business Health Dashboard™', icon: LayoutDashboard },
    { id: 'pillars', name: '7-Pillar Analysis', icon: BarChart3 },
    { id: 'opportunities', name: 'Growth Opportunities', icon: TrendingUp },
    { id: 'advisory', name: 'AI Growth Advisor™', icon: Cpu },
    { id: 'benchmark', name: 'Industry Benchmark', icon: Building2 },
    { id: 'plan', name: '90-Day Growth Plan', icon: Calendar },
    { id: 'downloads', name: 'Reports & Downloads', icon: Download }
  ];

  // Dynamic values based on revenue brackets to show real hidden revenue
  const getHiddenRevenue = () => {
    if (revenueTier.includes('< 1')) return '₹ 15 Lakhs';
    if (revenueTier.includes('1 – 5') || revenueTier.includes('1 - 5')) return '₹ 65 Lakhs';
    if (revenueTier.includes('5 – 20') || revenueTier.includes('5 - 20')) return '₹ 1.8 Cr';
    if (revenueTier.includes('20 – 50') || revenueTier.includes('20 - 50')) return '₹ 5.4 Cr';
    return '₹ 12.5 Cr';
  };

  const hiddenRev = getHiddenRevenue();

  // McKinsey/BCG level analytical recommendations mapped to user's selections
  const getTopRecommendations = () => {
    const pool = [
      {
        id: 'sops',
        title: 'Develop Core Standard Operating Procedures (SOPs)',
        friction: 'Your operational execution relies almost entirely on tribal employee memory rather than standardized systems, leading to high processing errors, unpredictable delivery timelines, and massive friction when onboarding new talent.',
        intervention: 'Audit and map out a unified digital blueprint for your highest-leverage workflows across Sales, Operations, and Finance. Design explicit step-by-step swimlane diagrams and set strict departmental Service Level Agreements.',
        deployment: 'We deploy senior systems consultants directly into your firm to audit your workflows, draft custom operational playbooks, and build an interactive digital wiki database to permanently institutionalize your tribal knowledge.',
        triggers: ['Operational Inefficiency', 'High Operational Costs', 'Lack of Systems']
      },
      {
        id: 'leads',
        title: 'Deploy Automated Lead Nurturing Frameworks',
        friction: 'High volumes of valuable pipeline prospects are leaking daily due to manual follow-up dependencies. Sales teams focus strictly on immediate conversions, leaving warm opportunities entirely neglected.',
        intervention: 'Architect an automated, multi-channel customer relationship management (CRM) infrastructure. Trigger behavior-based email and SMS sequences, and establish programmatic lead scoring to maximize conversions.',
        deployment: 'Our revenue operations division completely restructures your CRM platform, designs custom conversion sequences, and implements a predictive pipeline monitoring cockpit to capture lost revenue.',
        triggers: ['Inconsistent Sales', 'Inconsistent Sales Growth', 'Customer Acquisition']
      },
      {
        id: 'finance',
        title: 'Institute Rigid Financial KPI Tracking',
        friction: 'Decisions are frequently guided by gross revenue numbers rather than net unit profitability. This lack of granular visibility obscures high-volume cost leaks, leaving your monthly cash flow vulnerable.',
        intervention: 'Deploy a real-time financial reporting cockpit to monitor unit economics including Gross Margin, Customer Acquisition Cost (CAC), and Lifetime Value (LTV) through a strict weekly executive audit cycle.',
        deployment: 'We embed professional CFO capabilities to restructure your accounting frameworks, design live Business Intelligence dashboard grids, and optimize your working capital allocations.',
        triggers: ['Low Profitability', 'Cash Flow Issues', 'Financial Leakage']
      },
      {
        id: 'delegation',
        title: 'Decentralize Executive Decision Making',
        friction: 'The executive founder layer acts as a structural bottleneck for both high-level strategies and daily administrative approvals, paralyzing middle-management speed and capping company capacity.',
        intervention: 'Formulate an outcome-oriented Accountability Chart. Define explicit, measurable Key Performance Indicators (KPIs) for each department lead and grant them structured budget autonomy.',
        deployment: 'We run structured delegation workshops, rewrite managerial role definitions, and establish a high-performance leadership cadence to free up the founder for high-leverage strategic expansion.',
        triggers: ['Leadership Dependency', 'Team Productivity', 'Founder Burnout']
      },
      {
        id: 'talent',
        title: 'Engineer a Scalable Talent Acquisition Machine',
        friction: 'Hiring remains reactive, triggered by sudden operational crises rather than strategic forecasting. This ad-hoc approach leads to poor cultural fits, high employee turnover, and continuous retraining costs.',
        intervention: 'Treat recruitment with the same rigor as customer acquisition. Build a continuous pipeline of active candidates, enforce scorecard-based interviews, and implement a structured 30-60-90 day onboarding matrix.',
        deployment: 'Our HR optimization consultants design your employer branding assets, integrate advanced Applicant Tracking Systems, and write standard onboarding playbooks to accelerate new-hire productivity.',
        triggers: ['Team Productivity', 'Scaling Challenges', 'Employee Churn']
      }
    ];
    return pool;
  };

  const topRecommendations = getTopRecommendations();

  // Upcoming slots for calendar
  const upcomingDates = [
    { dayName: 'Mon', dayNum: '27', monthName: 'JUL', dateStr: 'July 27, 2026' },
    { dayName: 'Tue', dayNum: '28', monthName: 'JUL', dateStr: 'July 28, 2026' },
    { dayName: 'Wed', dayNum: '29', monthName: 'JUL', dateStr: 'July 29, 2026' },
    { dayName: 'Thu', dayNum: '30', monthName: 'JUL', dateStr: 'July 30, 2026' }
  ];

  const timeSlots = ["10:00 AM IST", "11:30 AM IST", "02:00 PM IST", "04:30 PM IST"];

  const PILLAR_STRENGTH_DESC: Record<string, string> = {
    "Leadership & Vision": "Strong strategic direction and core leadership alignment.",
    "Sales & Revenue": "Solid baseline sales volume and client conversion rates.",
    "Marketing & Customer Growth": "Effective customer reach and market positioning.",
    "Operations & Process": "Stable day-to-day operations and service delivery.",
    "Finance & Business Performance": "Strong working capital control and fiscal discipline.",
    "People & Leadership": "Positive team culture and stable retention metrics.",
    "Technology & Business Innovation": "Successful tool integration and digital-ready workflows."
  };

  const PILLAR_IMPROVEMENT_DESC: Record<string, string> = {
    "Leadership & Vision": "Systemize strategic planning to reduce reliance on founder intuition.",
    "Sales & Revenue": "Deploy multi-channel lead follow-ups to stop pipeline leakage.",
    "Marketing & Customer Growth": "Develop structured client acquisition funnels for predictable scaling.",
    "Operations & Process": "Formulate standard SOPs to eliminate tribal knowledge dependency.",
    "Finance & Business Performance": "Implement weekly unit-economic tracking and gross margin audits.",
    "People & Leadership": "Delegate core operational approvals to senior middle management.",
    "Technology & Business Innovation": "Automate manual data reentry across disparate systems."
  };

  // Dynamically determine Strengths based on top 3 highest scores
  const getDynamicStrengths = () => {
    const list = PILLARS.map((name, idx) => ({ name, score: pillarScores[idx] }));
    return list.sort((a, b) => b.score - a.score).slice(0, 3);
  };

  // Dynamically determine Improvement Areas based on bottom 3 lowest scores
  const getDynamicImprovements = () => {
    const list = PILLARS.map((name, idx) => ({ name, score: pillarScores[idx] }));
    return list.sort((a, b) => a.score - b.score).slice(0, 3);
  };

  const dynamicStrengths = getDynamicStrengths();
  const dynamicImprovements = getDynamicImprovements();

  // Handles browser-based print to generate beautiful PDF files
  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      {/* Dynamic CSS injecting high-impact print layout */}
      <style>{`
        @media print {
          aside { display: none !important; }
          main { padding: 0 !important; width: 100% !important; height: auto !important; overflow: visible !important; }
          .no-print { display: none !important; }
          .print-full { width: 100% !important; max-width: 100% !important; }
          .page-break { page-break-before: always; }
        }
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-none {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>

      {/* LEFT SIDEBAR REMOVED FROM VIEWPORT SIBLING LEVEL */}

      {/* MAIN VIEWPORT */}
      <main className="flex-1 bg-[#F8FAFC] relative z-10 p-6 xl:p-8">
        
        {/* TOP STATUS LINE & EXPORTS */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200/60 no-print">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <h2 className="text-2xl font-black text-[#0F172A] tracking-tight capitalize">
                {activeTab === 'overview' ? 'Executive Overview' : TABS.find(t => t.id === activeTab)?.name || 'Dashboard'}
              </h2>
            </div>
            <p className="text-xs text-slate-500">Your business at a glance</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-xs text-slate-500 bg-white px-3 py-2 rounded-lg border border-slate-200 shadow-sm font-mono">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Assessment Date: <strong>18 July 2026</strong></span>
            </div>
            <button
              onClick={handlePrintPDF}
              className="bg-[#0F172A] hover:bg-slate-800 text-white flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-xs font-bold"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        {/* TOP COMPACT PROFILE METRIC BAR */}
        <div className="bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] rounded-2xl shadow-lg border border-slate-800 p-5 mb-6 grid grid-cols-2 md:grid-cols-5 gap-5 md:gap-4 items-center relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px] pointer-events-none"></div>
          
          <div className="border-r border-slate-800/80 last:border-0 pr-2 md:pr-4">
            <span className="text-[9px] text-amber-400 font-extrabold uppercase tracking-[0.15em] block mb-1">Company Name</span>
            <span className="text-xs font-black text-white line-clamp-1 leading-tight tracking-tight uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
              {compName}
            </span>
          </div>
          
          <div className="border-r border-slate-800/80 last:border-0 pr-2 md:pr-4">
            <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-[0.15em] block mb-1">Owner / Leader</span>
            <span className="text-xs font-black text-white flex items-center gap-2 leading-tight">
              <div className="w-5 h-5 rounded-md bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0">
                <User className="w-3 h-3" />
              </div>
              <span className="line-clamp-1">{ownerName}</span>
            </span>
          </div>
          
          <div className="col-span-2 md:col-span-1 border-r border-slate-800/80 last:border-0 pr-2 md:pr-4">
            <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-[0.15em] block mb-1">Industry Segment</span>
            <span className="text-xs font-black text-white flex items-center gap-2 leading-tight">
              <div className="w-5 h-5 rounded-md bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0">
                <Factory className="w-3 h-3" />
              </div>
              <span className="line-clamp-1">{industryType}</span>
            </span>
          </div>
          
          <div className="border-r border-slate-800/80 last:border-0 pr-2 md:pr-4">
            <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-[0.15em] block mb-1">Annual Revenue</span>
            <span className="text-xs font-black text-white flex items-center gap-2 leading-tight">
              <div className="w-5 h-5 rounded-md bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0">
                <Coins className="w-3 h-3" />
              </div>
              <span className="line-clamp-1">{revenueTier}</span>
            </span>
          </div>
          
          <div className="last:border-0">
            <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-[0.15em] block mb-1">Employees</span>
            <span className="text-xs font-black text-white flex items-center gap-2 leading-tight">
              <div className="w-5 h-5 rounded-md bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0">
                <Users className="w-3 h-3" />
              </div>
              <span className="line-clamp-1">{employeeCount}</span>
            </span>
          </div>
        </div>

        {/* GLOBAL THREE-COLUMN WORKSPACE */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 items-start">
          
          {/* LEFT SIDEBAR (COLUMN A) - Renders exactly ONCE to satisfy Specification 3 */}
          <aside ref={leftSidebarRef} className="xl:col-span-1 sticky top-6 bg-[#FAFBFC] text-slate-800 flex flex-col shrink-0 z-20 shadow-md border border-slate-200/85 rounded-[20px] self-start no-print">
            {/* Single Merged Premium Sidebar Container */}
            <div className="flex flex-col p-6 space-y-6 overflow-y-auto scrollbar-none">
              
              {/* 2. Navigation */}
              <nav className="space-y-1.5 no-print">
                {TABS.map(tab => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-150 ${
                        isActive
                          ? 'bg-[#0F172A] text-white font-extrabold shadow-sm scale-[1.01]'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-bold'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <tab.icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                        <span className="text-[12px] tracking-tight text-left leading-tight">{tab.name}</span>
                      </div>
                      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></div>}
                    </button>
                  );
                })}
              </nav>

              {/* 3. Why Upgrade? */}
              <div className="bg-sky-50/70 border border-sky-100 rounded-xl p-4 space-y-2.5">
                <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-wider">Why Upgrade?</h4>
                <ul className="space-y-2 text-[11px] font-bold text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3.5] shrink-0 bg-emerald-100 rounded-full p-0.5" />
                    <span>Find Growth Gaps</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3.5] shrink-0 bg-emerald-100 rounded-full p-0.5" />
                    <span>Unlock Revenue</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3.5] shrink-0 bg-emerald-100 rounded-full p-0.5" />
                    <span>Prioritize Actions</span>
                  </li>
                </ul>
              </div>

              {/* 4. How It Works */}
              <div className="space-y-3.5 pt-4 border-t border-slate-200/60">
                <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-wider">How It Works</h4>
                <div className="flex flex-col gap-1 pl-1">
                  {/* Step 1 */}
                  <div className="flex items-start gap-3 relative">
                    <div className="absolute left-[9px] top-5 w-[2px] h-7 bg-amber-400"></div>
                    <span className="w-5 h-5 rounded-full bg-amber-400/10 border-2 border-amber-500 text-amber-700 flex items-center justify-center text-[10px] font-extrabold shrink-0">1</span>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-black text-slate-800 leading-tight">Assessment</span>
                      <span className="text-[9px] text-slate-500">Completed diagnostic profile</span>
                    </div>
                  </div>
                  {/* Spacer */}
                  <div className="h-2.5"></div>
                  {/* Step 2 */}
                  <div className="flex items-start gap-3 relative">
                    <div className="absolute left-[9px] top-5 w-[2px] h-7 bg-amber-400"></div>
                    <span className="w-5 h-5 rounded-full bg-amber-400/10 border-2 border-amber-500 text-amber-700 flex items-center justify-center text-[10px] font-extrabold shrink-0">2</span>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-black text-slate-800 leading-tight">AI Report</span>
                      <span className="text-[9px] text-slate-500">Automated business score card</span>
                    </div>
                  </div>
                  {/* Spacer */}
                  <div className="h-2.5"></div>
                  {/* Step 3 */}
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-indigo-50 border-2 border-indigo-600 text-indigo-700 flex items-center justify-center text-[10px] font-extrabold shrink-0">3</span>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-black text-indigo-600 leading-tight">Expert Call</span>
                      <span className="text-[9px] text-slate-500 font-semibold">Strategic diagnostic review</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. What You'll Get */}
              <div className="bg-emerald-50/50 border border-emerald-100/80 rounded-xl p-4.5 space-y-2.5">
                <h4 className="text-[11px] font-black text-emerald-800 uppercase tracking-wider">What You'll Get</h4>
                <ul className="space-y-2 text-[11px] font-bold text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-700 stroke-[3] shrink-0" />
                    <span>90-Min Strategy Session</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-700 stroke-[3] shrink-0" />
                    <span>Root Cause Analysis</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-700 stroke-[3] shrink-0" />
                    <span>90-Day Growth Plan</span>
                  </li>
                </ul>
              </div>

              {/* 6. Premium CTA */}
              <div className="pt-2 border-t border-slate-200/60">
                <div className="bg-[#0F172A] text-white rounded-xl p-4.5 relative overflow-hidden border border-slate-800 shadow-md">
                  {/* Radial background glow */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <span className="inline-block bg-amber-400/20 text-amber-300 text-[9px] font-black px-2 py-0.5 rounded border border-amber-400/10 uppercase tracking-widest leading-none">
                        Limited Time Offer
                      </span>
                      <h4 className="text-[13px] font-black tracking-wide text-white leading-tight">Unlock Your Growth Blueprint™</h4>
                      <p className="text-[10px] text-slate-400 font-bold">Business Growth Diagnostic™</p>
                    </div>
                    
                    <div className="flex items-baseline gap-2">
                      <span className="text-[12px] text-slate-500 line-through font-semibold">₹9,999</span>
                      <span className="text-xl font-black text-amber-400">₹1,499</span>
                    </div>
                    
                    <button
                      onClick={() => setActiveTab('booking')}
                      className="w-full bg-amber-500 hover:bg-amber-400 text-[#0F172A] py-2.5 rounded-lg font-black text-[12px] uppercase tracking-wider transition-all duration-150 flex items-center justify-center gap-1.5 shadow-md active:scale-95 animate-pulse"
                    >
                      <span>Book Diagnostic Call</span>
                      <ChevronRight className="w-4 h-4 stroke-[3]" />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </aside>

          {/* CENTER REPORT PANEL */}
          <div className="xl:col-span-3 space-y-8 flex flex-col justify-between">
            <div ref={activeTabContentRef} className="space-y-8 w-full">

            {/* ---------------------------------------------------- */}
            {/* VIEW 1: EXECUTIVE OVERVIEW (TAB CORE)              */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                
                {/* 1. KPI Cards (Top Row) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Score Card 1: Business Growth Score™ */}
                  <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex flex-col justify-between h-[115px] relative overflow-hidden group hover:border-slate-300 transition-all duration-200">
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#0F172A]"></div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Business Growth Score™</span>
                      <h3 className="text-3xl font-black text-[#0F172A] tracking-tight leading-none">{globalScore}<span className="text-sm font-bold text-slate-400">/100</span></h3>
                    </div>
                    <div>
                      <span className={`text-[10px] font-black uppercase tracking-wider ${globalScore >= 70 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {globalScore >= 70 ? 'Growing Business' : 'Immediate Turnaround'}
                      </span>
                    </div>
                  </div>

                  {/* Score Card 2: Growth Readiness™ */}
                  <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex flex-col justify-between h-[115px] relative overflow-hidden group hover:border-slate-300 transition-all duration-200">
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#0F172A]"></div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Growth Readiness™</span>
                      <h3 className="text-3xl font-black text-[#0F172A] tracking-tight leading-none">{globalScore}%</h3>
                    </div>
                    <div>
                      <span className={`text-[10px] font-black uppercase tracking-wider ${globalScore >= 70 ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {globalScore >= 70 ? 'Scale Ready' : 'Structural Gaps'}
                      </span>
                    </div>
                  </div>

                  {/* Score Card 3: Hidden Revenue Opportunity™ */}
                  <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex flex-col justify-between h-[115px] relative overflow-hidden group hover:border-slate-300 transition-all duration-200">
                    <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Hidden Revenue Opportunity™</span>
                      <h3 className="text-3xl font-black text-amber-600 tracking-tight leading-none">{hiddenRev}</h3>
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-amber-600 uppercase tracking-wider">High Potential</span>
                    </div>
                  </div>

                  {/* Score Card 4: 12-Month Growth Potential™ */}
                  <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex flex-col justify-between h-[115px] relative overflow-hidden group hover:border-slate-300 transition-all duration-200">
                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">12-Month Growth Potential™</span>
                      <h3 className="text-3xl font-black text-emerald-600 tracking-tight leading-none">+{globalScore < 70 ? '35%' : '24%'}</h3>
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider">Achievable Impact</span>
                    </div>
                  </div>
                </div>

                {/* 2. Executive AI Summary */}
                <div className="bg-gradient-to-r from-slate-50 via-slate-100/50 to-slate-50 border border-slate-200 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-slate-200/50">
                    <Sparkles className="w-4 h-4 text-slate-800" />
                    <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-wider">Executive AI Summary</h3>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-semibold">
                    An executive analysis of <strong className="text-slate-900">{compName}</strong> operating within the <strong className="text-slate-900">{industryType}</strong> sector indicates that while your current revenue tier of <strong className="text-slate-900">{revenueTier}</strong> is solid, addressing critical process dependencies is essential. Currently, your performance compared to the {globalScore}% benchmark suggests that targeting {dynamicImprovements[0]?.name || 'operational workflows'} will unlock approximately <strong className="text-emerald-700">{hiddenRev}</strong> in unrecognized annual opportunity while significantly improving leadership delegation.
                  </p>
                </div>

                {/* 3, 4, 5. Strengths, Improvements, Immediate Priority (Grid) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Top 3 Strengths */}
                  <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-wider">Top 3 Strengths</h3>
                    </div>
                    <ul className="space-y-3.5">
                      {dynamicStrengths.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-semibold leading-tight">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                          <div>
                            <span className="block font-black text-slate-900">{item.name}</span>
                            <span className="text-[10px] text-slate-500 font-medium">Performance Score: {item.score}%</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Top 3 Improvement Areas */}
                  <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                      <div className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                        <AlertTriangle className="w-3.5 h-3.5" />
                      </div>
                      <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-wider">Top 3 Improvement Areas</h3>
                    </div>
                    <ul className="space-y-3.5">
                      {dynamicImprovements.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-semibold leading-tight">
                          <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                          <div>
                            <span className="block font-black text-slate-900">{item.name}</span>
                            <span className="text-[10px] text-slate-500 font-medium">Priority Gap: {item.score}% Score</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Immediate Priority */}
                  <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                        <div className="w-5 h-5 rounded-full bg-slate-950/10 text-slate-900 flex items-center justify-center shrink-0">
                          <Award className="w-3.5 h-3.5" />
                        </div>
                        <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-wider">Immediate Priority</h3>
                      </div>
                      <div className="mt-3.5 space-y-2">
                        <h4 className="text-sm font-black text-slate-900 tracking-tight leading-snug">
                          Systemize {dynamicImprovements[0]?.name || 'Core Operations'}
                        </h4>
                        <div className="space-y-1.5 pt-1">
                          <p className="text-xs text-slate-600 font-semibold">
                            <strong>Impact:</strong> High (Unlocks {hiddenRev})
                          </p>
                          <p className="text-xs text-slate-600 font-semibold">
                            <strong>Timeline:</strong> 0–90 Days
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-100 flex gap-2 mt-4">
                      <span className="bg-slate-100 text-slate-800 text-[8px] font-black uppercase px-2 py-0.5 rounded border border-slate-200">
                        Action Required
                      </span>
                      <span className="bg-amber-100 text-amber-800 text-[8px] font-black uppercase px-2 py-0.5 rounded border border-amber-200">
                        Priority 1
                      </span>
                    </div>
                  </div>
                </div>

                {/* 6 & 7. CEO Recommendation & Next Best Step (Grid) */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  
                  {/* CEO Recommendation */}
                  <div className="md:col-span-3 bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 pb-1.5 border-b border-slate-100">
                        <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                        <h3 className="text-[11px] font-black text-slate-950 uppercase tracking-wider">CEO Recommendation</h3>
                      </div>
                      <div className="text-[11px] text-slate-700 space-y-1.5 font-semibold leading-relaxed">
                        <p><strong>Current Situation:</strong> Structural scaling bottlenecks in {dynamicImprovements[0]?.name} and {dynamicImprovements[1]?.name} restrict throughput at {compName}.</p>
                        <p><strong>Root Cause:</strong> High dependency on founder decision-making coupled with non-standardized departmental execution patterns.</p>
                        <p><strong>Recommended Action:</strong> Document operational playbooks and delegate validation triggers to middle-management.</p>
                        <p><strong>Expected Business Impact:</strong> Reclaim {hiddenRev} in lost opportunities and reduce active founder overhead by up to 40%.</p>
                      </div>
                    </div>
                  </div>

                  {/* Next Best Step */}
                  <div className="md:col-span-2 bg-[#0F172A] text-white rounded-2xl p-5 flex flex-col justify-between border border-slate-800 shadow-md relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>
                    <div className="space-y-2 relative z-10">
                      <span className="text-[9px] font-black text-amber-400 tracking-wider uppercase block mb-0.5">Recommended Next Action</span>
                      <h4 className="text-xs font-black text-white uppercase tracking-wider">Book Growth Diagnostic™</h4>
                      <p className="text-[10px] text-slate-300 leading-relaxed font-semibold">
                        Schedule your private, 1-on-1 Business Growth Diagnostic™ call to systemize {dynamicImprovements[0]?.name} and capitalize on your untapped {hiddenRev} revenue potential.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('booking')}
                      className="w-full bg-amber-500 hover:bg-amber-400 text-[#0F172A] font-black text-[11px] uppercase tracking-wider py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 shadow-md active:scale-95 mt-4"
                    >
                      <span>Book Diagnostic Call</span>
                      <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>
                </div>

              </div>
            )}

        {/* ---------------------------------------------------- */}
        {/* VIEW 2: BUSINESS HEALTH DASHBOARD                    */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'health' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Sales Engine */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 block">Sales Engine Metric</span>
                <div className="flex items-end justify-between">
                  <div>
                    <h4 className="text-4xl font-black text-[#0F172A]">{pillarScores[1]}%</h4>
                    <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mt-1.5 inline-block border border-emerald-100">
                      Standardized Score
                    </span>
                  </div>
                  <div className="w-24 h-10">
                    <svg className="w-full h-full" viewBox="0 0 100 30">
                      <path d="M 0 15 Q 15 25, 30 10 T 60 22 T 90 5 T 100 8" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Operations & Process */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 block">Operations & Process Metric</span>
                <div className="flex items-end justify-between">
                  <div>
                    <h4 className="text-4xl font-black text-[#0F172A]">{pillarScores[3]}%</h4>
                    <span className="text-[9px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full mt-1.5 inline-block border border-amber-100">
                      Development Phase
                    </span>
                  </div>
                  <div className="w-24 h-10">
                    <svg className="w-full h-full" viewBox="0 0 100 30">
                      <path d="M 0 25 Q 20 12, 40 22 T 80 5 T 100 8" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Financial Performance */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 block">Financial Performance Metric</span>
                <div className="flex items-end justify-between">
                  <div>
                    <h4 className="text-4xl font-black text-[#0F172A]">{pillarScores[4]}%</h4>
                    <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mt-1.5 inline-block border border-emerald-100">
                      Secure / Resilient
                    </span>
                  </div>
                  <div className="w-24 h-10">
                    <svg className="w-full h-full" viewBox="0 0 100 30">
                      <path d="M 0 20 Q 20 28, 40 18 T 75 5 T 100 2" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>

            </div>

            {/* 7-Pillar Performance Matrix sub-grid inside Health dashboard */}
            <div className="pt-6 border-t border-slate-200/80">
              <h4 className="text-base font-bold text-[#0F172A] mb-4">7-Pillar Performance Matrix</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PILLARS.map((pillar, idx) => (
                  <div key={pillar} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-xs font-black text-[#0F172A]">{pillar}</h4>
                      <span className="text-xs font-black text-[#0F172A] bg-slate-100 px-2 py-0.5 rounded">{pillarScores[idx]}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-3">
                      <div 
                        className={`h-full rounded-full ${pillarScores[idx] < 50 ? 'bg-red-500' : pillarScores[idx] < 75 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                        style={{ width: `${pillarScores[idx]}%` }}
                      ></div>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
                      {pillarScores[idx] < 50 
                        ? 'Critical vulnerability detected. Urgent process mapping required.' 
                        : pillarScores[idx] < 75 
                        ? 'Stable operational benchmark, lacking automated scale integrations.' 
                        : 'Elite performance metric. Ready for scaling.'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* VIEW 3: 7-PILLAR ANALYSIS                            */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'pillars' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Radar Chart Area */}
            <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-2">Pillar Radar Assessment</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-6">Visual representation of your business strength indicators across all seven enterprise pillars.</p>
                
                <div className="w-full h-64 flex justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                      <PolarGrid stroke="#E2E8F0" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#334155', fontSize: 9, fontWeight: 'bold' }} />
                      <Radar name="Score" dataKey="A" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.25} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="border-t border-slate-100 pt-4 text-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Weighted Global Maturity index:</span>
                <span className="block text-2xl font-black text-amber-500 mt-0.5">{globalScore} / 100</span>
              </div>
            </div>

            {/* Right Pillars Details List */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-sm font-black text-[#0F172A] uppercase tracking-wider">Detailed Pillar Performance Diagnostic</h3>
              {PILLARS.map((pillar, idx) => (
                <div key={pillar} className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono font-bold text-slate-400 block uppercase">Pillar 0{idx+1}</span>
                    <h4 className="text-sm font-extrabold text-slate-900">{pillar}</h4>
                    <p className="text-[11px] text-slate-500 max-w-lg leading-relaxed">
                      {idx === 3 ? 'Tribal execution nodes require standardisation with explicit playbooks to prevent delivery dropouts.' :
                       idx === 1 ? 'Customer conversion flows must transition to structured nurture sequences.' :
                       'Consistent core performance indicators indicate room to expand market footprint.'}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-lg font-black text-slate-900 block">{pillarScores[idx]}%</span>
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border ${
                      pillarScores[idx] < 50 ? 'bg-red-50 text-red-700 border-red-100' :
                      pillarScores[idx] < 75 ? 'bg-amber-50 text-amber-700 border-amber-100' :
                      'bg-emerald-50 text-emerald-700 border-emerald-100'
                    }`}>
                      {pillarScores[idx] < 50 ? 'Immediate Action' :
                       pillarScores[idx] < 75 ? 'Develop Automation' :
                       'Elite Performance'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* VIEW 4: GROWTH OPPORTUNITIES                         */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'opportunities' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-sm font-black text-slate-950 uppercase tracking-wider mb-2">High-Impact Growth Lever Identification</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">
                Our analysis highlights three immediate strategic levers that can be pulled to extract trapped revenue and accelerate capital performance.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#0A1128] text-white p-5 rounded-xl border border-slate-800">
                  <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest block mb-1">Strategic Lever 01</span>
                  <h4 className="text-sm font-black uppercase tracking-tight mb-2">Operational SOP Wiki</h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed font-medium mb-4">
                    Eliminate dependencies on the founder layer by documenting critical operations. Cuts processing errors by an estimated 35%.
                  </p>
                  <span className="text-[10px] font-bold text-[#10B981] uppercase block mt-1">ROI Potential: 4.8x investment</span>
                </div>

                <div className="bg-white text-slate-900 p-5 rounded-xl border border-slate-200 shadow-sm">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Strategic Lever 02</span>
                  <h4 className="text-sm font-black text-slate-950 uppercase tracking-tight mb-2">Automated Drip Follow-ups</h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed font-medium mb-4">
                    Activate behavior-triggered drip email sequences within the CRM to nurture lost pipeline leads programmatically.
                  </p>
                  <span className="text-[10px] font-bold text-amber-600 uppercase block mt-1 font-mono">Conversion Lift: +18% Est.</span>
                </div>

                <div className="bg-white text-slate-900 p-5 rounded-xl border border-slate-200 shadow-sm">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Strategic Lever 03</span>
                  <h4 className="text-sm font-black text-slate-950 uppercase tracking-tight mb-2">Financial Unit Economics Dashboard</h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed font-medium mb-4">
                    Track Gross Margin and Customer Acquisition Costs weekly. Plug cost leaks immediately.
                  </p>
                  <span className="text-[10px] font-bold text-emerald-600 uppercase block mt-1">Margin Safeguard: 3% - 5% Lift</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* VIEW 5: AI GROWTH ADVISORY (SPECIFICATION 1)         */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'advisory' && (
          <div className="space-y-6">
            
            {/* Section A: Executive Observation & Macro Diagnosis */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#0F172A] text-amber-400 flex items-center justify-center shrink-0">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-black text-slate-950 uppercase tracking-wider">
                  Section A: Executive Observation & Macro Diagnosis
                </h3>
              </div>

              {globalScore < 70 ? (
                <div className="space-y-4 text-xs text-slate-700 leading-relaxed border-l-4 border-red-500 pl-4 bg-slate-50 p-4 rounded-r-xl font-medium">
                  <p>
                    <strong>Structural Systemic Volatility:</strong> An analytical review of <strong>{compName}</strong> operating within the <strong>{industryType}</strong> vertical indicates that your organization has hit a structural scaling ceiling. While your market position allows you to cross revenue targets in the <strong>{revenueTier}</strong> bracket, your operational foundation relies almost exclusively on manual execution. The lack of standard automation frameworks means that scaling up will directly increase operational friction, leading to severe profit margin leakage and high staff burnout.
                  </p>
                  <p>
                    <strong>The Owner-Dependency Barrier:</strong> Your assessment answers reveal a critical operational dependency on the founder layer. Because daily validation, strategic planning, and performance management require your constant personal oversight, your team is restricted to running routine tasks. This lack of decentralization caps your ultimate enterprise valuation, as a company dependent on its owner cannot be easily scaled, sold, or institutionalized.
                  </p>
                </div>
              ) : globalScore >= 85 ? (
                <div className="space-y-4 text-xs text-slate-700 leading-relaxed border-l-4 border-emerald-500 pl-4 bg-slate-50 p-4 rounded-r-xl font-medium">
                  <p>
                    <strong>Enterprise Maturity Evaluation:</strong> <strong>{compName}</strong> displays an elite operational framework, placing it in the top tier of maturity models for the <strong>{industryType}</strong> sector. By decoupling core day-to-day functions from manual founder oversight, you have cleared the initial growth bottlenecks that stall most MSMEs. Your business systems show solid baseline efficiency and consistent delivery parameters.
                  </p>
                  <p>
                    <strong>Strategic Capital Allocation Matrix:</strong> The objective for your enterprise must shift from protective management to aggressive market dominance. With an established core framework, you are prime to utilize your internal stability to deploy high-yield automation models, acquire market share from lower-tier competitors, and execute structured expansions into new regional verticals.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 text-xs text-slate-700 leading-relaxed border-l-4 border-amber-500 pl-4 bg-slate-50 p-4 rounded-r-xl font-medium">
                  <p>
                    <strong>Transitional Growth Phase:</strong> An analytical review of <strong>{compName}</strong> operating within the <strong>{industryType}</strong> vertical indicates that you have established a viable market position, yet your operational architecture remains inconsistent. You have successfully bypassed initial startup friction, achieving targets in the <strong>{revenueTier}</strong> bracket, but you lack the standardized, automated systems required to scale without proportional increases in overhead.
                  </p>
                  <p>
                    <strong>Operational Decentralization Required:</strong> The data suggests that while some processes are systemized, the executive layer still absorbs too much daily operational shock. To break through your current revenue ceiling, you must transition from ad-hoc management to rigid, data-driven frameworks. This involves documenting core workflows and implementing rigid KPIs to extract founder involvement from day-to-day delivery.
                  </p>
                </div>
              )}
            </div>

            {/* Section B: Top 5 Strategic Technical Recommendations */}
            <div className="space-y-6">
              <h3 className="text-sm font-black text-slate-950 uppercase tracking-wider">
                Section B: Top 5 Strategic Technical Recommendations
              </h3>

              <div className="space-y-6">
                {topRecommendations.slice(0, 5).map((rec, index) => (
                  <div key={rec.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-[#0F172A] text-white font-black text-xs flex items-center justify-center shrink-0">
                        {index + 1}
                      </div>
                      <h4 className="text-xs font-black text-[#0F172A] uppercase tracking-wider">{rec.title}</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[11px] leading-relaxed font-semibold">
                      <div className="bg-red-50/50 p-4 rounded-lg border border-red-100/30">
                        <strong className="text-red-800 block mb-1 uppercase tracking-wider text-[9px]">The Friction Point:</strong>
                        <span className="text-slate-600">{rec.friction}</span>
                      </div>
                      <div className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-100/30">
                        <strong className="text-emerald-800 block mb-1 uppercase tracking-wider text-[9px]">The Strategic Intervention:</strong>
                        <span className="text-slate-600">{rec.intervention}</span>
                      </div>
                      <div className="bg-amber-50/50 p-4 rounded-lg border border-amber-200/30">
                        <strong className="text-amber-800 block mb-1 uppercase tracking-wider text-[9px]">KRG ONE Partner Deployment:</strong>
                        <span className="text-slate-600">{rec.deployment}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* VIEW 6: INDUSTRY BENCHMARK                           */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'benchmark' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-sm font-black text-[#0F172A] uppercase tracking-wider mb-2">Industry Benchmark Diagnostics</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">
                Compare your maturity scores directly against competitors within the <strong>{industryType}</strong> segment.
              </p>

              {/* Benchmark Bar Chart */}
              <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={PILLARS.map((p, idx) => ({
                      name: p.slice(0, 15) + '...',
                      'Your Score': pillarScores[idx],
                      'Industry Average': 61,
                      'Top 10% Performers': 89
                    }))}
                    margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                  >
                    <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#64748B', fontWeight: 'bold' }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 9, fill: '#64748B' }} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: '10px', fontWeight: 'bold' }} />
                    <Bar dataKey="Your Score" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Industry Average" fill="#94A3B8" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Top 10% Performers" fill="#1E293B" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* VIEW 7: 90-DAY GROWTH PLAN (SPECIFICATION 2)          */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'plan' && (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0F172A] text-white flex items-center justify-center shrink-0">
                  <Target className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#0F172A] tracking-tight">Opportunities & 90-Day Plan™</h3>
                  <p className="text-xs text-slate-500">The Time-Phased Execution Roadmap</p>
                </div>
              </div>

              {/* Progress counter for tasks checked */}
              <div className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-right">
                <span className="text-[9px] text-slate-400 font-bold uppercase block mb-0.5">Task Completion</span>
                <span className="text-sm font-black text-slate-950 font-mono">
                  {Object.values(completedTasks).filter(Boolean).length} / 6 Sprints Done
                </span>
              </div>
            </div>

            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[28px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
              
              {/* Phase 1 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-14 h-14 rounded-full border-4 border-white bg-[#0F172A] text-amber-400 font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md relative z-10">
                  P1
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <h4 className="font-extrabold text-[#0F172A] text-sm uppercase tracking-wide">Days 1–30</h4>
                    <span className="bg-red-50 text-red-600 text-[8px] font-black px-2.5 py-1 rounded-full border border-red-100 uppercase tracking-widest">
                      Emergency Risk Mitigation & Stabilization Sprints
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-semibold mb-4">
                    "Isolate and plug immediate cash flow leakages and severe operational friction points. Deploy basic end-of-day daily tracking templates for all operational staff members. Set up absolute tracking metrics for the primary user challenge selected: <strong>{topChallenge}</strong>. Stop daily administrative tasks from reaching the executive founder layer by establishing a strict delegation rule."
                  </p>
                  
                  {/* Phase 1 Checklist */}
                  <div className="space-y-2 border-t border-slate-100 pt-3">
                    <label className="flex items-start gap-2.5 cursor-pointer text-xs font-semibold text-slate-700">
                      <input 
                        type="checkbox" 
                        checked={!!completedTasks['p1-t1']} 
                        onChange={(e) => setCompletedTasks({...completedTasks, 'p1-t1': e.target.checked})}
                        className="w-4 h-4 rounded border-slate-300 text-[#0F172A] focus:ring-[#0F172A] mt-0.5" 
                      />
                      <span>Plug cash leaks & deploy daily tracking templates for operational staff</span>
                    </label>
                    <label className="flex items-start gap-2.5 cursor-pointer text-xs font-semibold text-slate-700">
                      <input 
                        type="checkbox" 
                        checked={!!completedTasks['p1-t2']} 
                        onChange={(e) => setCompletedTasks({...completedTasks, 'p1-t2': e.target.checked})}
                        className="w-4 h-4 rounded border-slate-300 text-[#0F172A] focus:ring-[#0F172A] mt-0.5" 
                      />
                      <span>Redirect daily validation hurdles away from the founder layer</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Phase 2 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-14 h-14 rounded-full border-4 border-white bg-amber-400 text-slate-950 font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md relative z-10">
                  P2
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <h4 className="font-extrabold text-[#0F172A] text-sm uppercase tracking-wide">Days 31–60</h4>
                    <span className="bg-amber-50 text-amber-600 text-[8px] font-black px-2.5 py-1 rounded-full border border-amber-100 uppercase tracking-widest">
                      Process Standardization & Workflow Architecture Sprints
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-semibold mb-4">
                    "Begin the formal drafting and deployment of step-by-step Standard Operating Procedures (SOPs) across your lowest-performing operational pillars. Build clean cloud-based tracking systems to monitor team output, optimize customer acquisition channels, and map customer retention journeys to maximize your lifetime client value metrics."
                  </p>

                  {/* Phase 2 Checklist */}
                  <div className="space-y-2 border-t border-slate-100 pt-3">
                    <label className="flex items-start gap-2.5 cursor-pointer text-xs font-semibold text-slate-700">
                      <input 
                        type="checkbox" 
                        checked={!!completedTasks['p2-t1']} 
                        onChange={(e) => setCompletedTasks({...completedTasks, 'p2-t1': e.target.checked})}
                        className="w-4 h-4 rounded border-slate-300 text-[#0F172A] focus:ring-[#0F172A] mt-0.5" 
                      />
                      <span>Formally draft and deploy step-by-step Standard Operating Procedures (SOPs)</span>
                    </label>
                    <label className="flex items-start gap-2.5 cursor-pointer text-xs font-semibold text-slate-700">
                      <input 
                        type="checkbox" 
                        checked={!!completedTasks['p2-t2']} 
                        onChange={(e) => setCompletedTasks({...completedTasks, 'p2-t2': e.target.checked})}
                        className="w-4 h-4 rounded border-slate-300 text-[#0F172A] focus:ring-[#0F172A] mt-0.5" 
                      />
                      <span>Build clean cloud dashboard views to monitor weekly departmental output metrics</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Phase 3 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-14 h-14 rounded-full border-4 border-white bg-emerald-500 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md relative z-10">
                  P3
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <h4 className="font-extrabold text-[#0F172A] text-sm uppercase tracking-wide">Days 61–90</h4>
                    <span className="bg-emerald-50 text-emerald-700 text-[8px] font-black px-2.5 py-1 rounded-full border border-emerald-100 uppercase tracking-widest">
                      System Optimization & Capital Scaling Sprints
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-semibold mb-4">
                    "Integrate scalable automation tools and modern business software models. Transition your management team to a formal weekly performance review cycle based on concrete KPIs rather than personal feelings. Review the unit profit margins across all core product lines to maximize revenue efficiency."
                  </p>

                  {/* Phase 3 Checklist */}
                  <div className="space-y-2 border-t border-slate-100 pt-3">
                    <label className="flex items-start gap-2.5 cursor-pointer text-xs font-semibold text-slate-700">
                      <input 
                        type="checkbox" 
                        checked={!!completedTasks['p3-t1']} 
                        onChange={(e) => setCompletedTasks({...completedTasks, 'p3-t1': e.target.checked})}
                        className="w-4 h-4 rounded border-slate-300 text-[#0F172A] focus:ring-[#0F172A] mt-0.5" 
                      />
                      <span>Integrate automated connections (APIs) to sync billing and CRM records</span>
                    </label>
                    <label className="flex items-start gap-2.5 cursor-pointer text-xs font-semibold text-slate-700">
                      <input 
                        type="checkbox" 
                        checked={!!completedTasks['p3-t2']} 
                        onChange={(e) => setCompletedTasks({...completedTasks, 'p3-t2': e.target.checked})}
                        className="w-4 h-4 rounded border-slate-300 text-[#0F172A] focus:ring-[#0F172A] mt-0.5" 
                      />
                      <span>Establish weekly reviews based on hard KPIs rather than personal feelings</span>
                    </label>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* VIEW 8: REPORTS & DOWNLOADS                          */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'downloads' && (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 max-w-4xl mx-auto space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Reports & Corporate Downloads</h3>
              <p className="text-xs text-slate-500">Access and download formal corporate PDF, presentation slide, and spreadsheets.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-center">
                <ShieldCheck className="w-8 h-8 text-[#0F172A] mx-auto mb-3" />
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-2">Executive Diagnostic Dossier</h4>
                <p className="text-[10px] text-slate-500 leading-relaxed mb-4">Complete macro audit analysis and technical roadmap compiled into a PDF document.</p>
                <button
                  onClick={handlePrintPDF}
                  className="w-full bg-[#0F172A] hover:bg-slate-800 text-white font-extrabold text-[10px] uppercase tracking-wider py-2 rounded-lg transition-colors"
                >
                  Export PDF Report
                </button>
              </div>

              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-center">
                <Building2 className="w-8 h-8 text-[#0F172A] mx-auto mb-3" />
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-2">Operational SOP Templates</h4>
                <p className="text-[10px] text-slate-500 leading-relaxed mb-4">Custom SOP swimlane blueprints and operational tracking spreadsheets formatted for Excel.</p>
                <button
                  onClick={() => alert("Excel export initiated! Checking data tables...")}
                  className="w-full bg-[#0F172A] hover:bg-slate-800 text-white font-extrabold text-[10px] uppercase tracking-wider py-2 rounded-lg transition-colors"
                >
                  Export Excel Sheet
                </button>
              </div>

              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-center">
                <Cpu className="w-8 h-8 text-[#0F172A] mx-auto mb-3" />
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-2">Consulting Pitch Deck</h4>
                <p className="text-[10px] text-slate-500 leading-relaxed mb-4">Visual high-impact presentation slides showing the core bottlenecks and 90-day action plan.</p>
                <button
                  onClick={() => alert("Powerpoint presentation slide generation initiated...")}
                  className="w-full bg-[#0F172A] hover:bg-slate-800 text-white font-extrabold text-[10px] uppercase tracking-wider py-2 rounded-lg transition-colors"
                >
                  Export Slides Deck
                </button>
              </div>
            </div>

            {/* Link Share Tool */}
            <div className="pt-6 border-t border-slate-100 bg-slate-50/50 p-5 rounded-xl border border-slate-100">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-2 flex items-center gap-2">
                <Share2 className="w-4 h-4 text-amber-500" /> Share Advisory Dashboard with Key Stakeholders
              </h4>
              <p className="text-[10px] text-slate-500 mb-4">
                Generate and copy a secure live link to share this consultative growth dossier with your executive board or core partners.
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value="https://krg.one/advisory/dashboard-assessment-AX7701"
                  className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-600 font-mono"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText("https://krg.one/advisory/dashboard-assessment-AX7701");
                    setCopiedLink(true);
                    setTimeout(() => setCopiedLink(false), 2000);
                  }}
                  className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase px-4 py-1.5 rounded-lg transition-colors"
                >
                  {copiedLink ? 'Copied!' : 'Copy Link'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* VIEW: DIAGNOSTIC BOOKING                             */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'booking' && (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#0F172A] text-white flex items-center justify-center shrink-0">
                <PhoneCall className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="text-xl font-black text-[#0F172A] tracking-tight">KRG ONE Diagnostic Call Booking</h3>
                <p className="text-xs text-slate-500">Book Your Private 1-on-1 Consultative Strategy Session</p>
              </div>
            </div>

            {bookingConfirmed ? (
              <div className="text-center py-12 px-6 bg-emerald-50 rounded-2xl border border-emerald-100 space-y-4">
                <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-black text-slate-900">Your Diagnostic Session is Confirmed!</h4>
                <p className="text-slate-600 max-w-md mx-auto text-sm leading-relaxed">
                  Excellent choice, <strong>{ownerName}</strong>. We have reserved your 1-on-1 strategy session on <strong>{selectedDate}</strong> at <strong>{selectedTime}</strong>. A Google Meet invitation and calendar link have been dispatched to <strong>{formData.email || 'your email'}</strong>.
                </p>
                <div className="pt-4">
                  <button 
                    type="button"
                    onClick={() => { setBookingConfirmed(false); }}
                    className="px-6 py-2.5 bg-slate-950 text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    Reschedule or Book Another Session
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left side: Package & Date Picker */}
                <div className="space-y-6">
                  <div className="bg-[#0A1128] text-white p-5 rounded-xl border border-slate-800">
                    <span className="text-[9px] font-bold text-amber-400 tracking-widest uppercase block mb-1">Diagnostic package</span>
                    <h5 className="font-bold text-white text-sm mb-2">1-on-1 Growth Strategy Diagnostic</h5>
                    <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
                      A deep-dive 30-minute private strategy session with a KRG ONE Managing Partner. We review your Growth Score, diagnose your primary bottlenecks, and map out a direct execution plan.
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-500 line-through">₹ 9,999</span>
                      <span className="text-xl font-black text-amber-400">₹ 1,499</span>
                      <span className="bg-emerald-500/25 text-emerald-400 text-[8px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">85% OFF</span>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">1. Select Strategic Date</h5>
                    <div className="grid grid-cols-4 gap-2">
                      {upcomingDates.map((d) => (
                        <button
                          type="button"
                          key={d.dateStr}
                          onClick={() => setSelectedDate(d.dateStr)}
                          className={`p-3 rounded-lg border text-center transition-all ${
                            selectedDate === d.dateStr
                              ? 'border-slate-950 bg-slate-950 text-white shadow-sm'
                              : 'border-slate-200 bg-white hover:border-slate-400 text-slate-700'
                          }`}
                        >
                          <span className="block text-[9px] font-mono uppercase tracking-widest leading-none mb-1 opacity-75">{d.dayName}</span>
                          <span className="block text-base font-extrabold leading-none">{d.dayNum}</span>
                          <span className="block text-[8px] font-mono tracking-wider opacity-75 mt-1">{d.monthName}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right side: Time Slot & Confirm */}
                <div className="space-y-6">
                  <div>
                    <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">2. Select Session Time Slot</h5>
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => setSelectedTime(slot)}
                          className={`p-2.5 rounded-lg border text-center text-xs font-bold transition-all ${
                            selectedTime === slot
                              ? 'border-amber-400 bg-amber-400 text-slate-950'
                              : 'border-slate-200 bg-white hover:border-slate-400 text-slate-700'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-4">
                    <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">3. Confirm Details</h5>
                    <div className="space-y-2 text-[11px] text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <div><strong className="text-slate-800">Partner:</strong> {ownerName}</div>
                      <div><strong className="text-slate-800">Company:</strong> {compName}</div>
                      <div><strong className="text-slate-800">Revenue Tier:</strong> {revenueTier}</div>
                      <div><strong className="text-slate-800">Target Channel:</strong> {industryType}</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setBookingConfirmed(true)}
                    className="w-full bg-[#0F172A] hover:bg-slate-800 text-white py-3 rounded-xl font-extrabold text-xs uppercase tracking-wider shadow-md transition-all duration-200"
                  >
                    Confirm & Reserve Consultation →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

            </div> {/* END OF activeTabContentRef */}

            {/* ADAPTIVE PROMOTIONAL BANNER SYSTEM */}
            {availableSpace > 85 && (
              <div className="no-print pt-6">
                {availableSpace <= 180 ? (
                  /* Small Space: Compact CTA Card */
                  <div className="bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] rounded-xl p-3 border border-slate-800 shadow-md flex items-center justify-between text-white relative overflow-hidden h-[72px]">
                    <div className="absolute -right-10 -bottom-10 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>
                    <div className="flex items-center gap-3">
                      <span className="hidden sm:inline-block bg-amber-400/20 text-amber-300 text-[8px] font-black px-1.5 py-0.5 rounded border border-amber-400/10 uppercase tracking-widest leading-none">
                        Limited Offer
                      </span>
                      <div>
                        <h4 className="text-[11px] font-black tracking-wide leading-tight text-white">Unlock Your Growth Blueprint™</h4>
                        <p className="text-[9px] text-slate-400 font-bold">Business Growth Diagnostic™</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-baseline gap-1.5 shrink-0">
                        <span className="text-[9px] text-slate-500 line-through font-semibold">₹9,999</span>
                        <span className="text-sm font-black text-amber-400">₹1,499</span>
                      </div>
                      <button
                        onClick={() => setActiveTab('booking')}
                        className="bg-amber-500 hover:bg-amber-400 text-[#0F172A] px-3 py-1.5 rounded-md font-black text-[10px] uppercase tracking-wider transition-all duration-150 flex items-center gap-1 shadow-md active:scale-95 shrink-0"
                      >
                        <span>Book Call</span>
                        <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                      </button>
                    </div>
                  </div>
                ) : availableSpace <= 350 ? (
                  /* Medium Space: Promotional Card with benefits */
                  <div className="bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] rounded-2xl p-4.5 border border-slate-800 shadow-lg text-white relative overflow-hidden flex flex-col justify-between h-[170px]">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none"></div>
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="bg-amber-400/20 text-amber-300 text-[8px] font-black px-2 py-0.5 rounded border border-amber-400/10 uppercase tracking-widest leading-none">
                            Limited Time Offer
                          </span>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Growth Diagnostic</span>
                        </div>
                        <h4 className="text-sm font-black tracking-wide text-white leading-tight">Unlock Your Growth Blueprint™</h4>
                        <p className="text-[10px] text-slate-400 font-bold">Business Growth Diagnostic™</p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="flex items-baseline justify-end gap-1.5">
                          <span className="text-[10px] text-slate-500 line-through font-semibold">₹9,999</span>
                          <span className="text-lg font-black text-amber-400">₹1,499</span>
                        </div>
                        <span className="text-[9px] font-bold text-emerald-400 block">Save 85% Today</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 border-t border-slate-800/80 pt-2">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 bg-emerald-500/10 rounded-full p-0.5" />
                        <span>Revenue Growth Strategy</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 bg-emerald-500/10 rounded-full p-0.5" />
                        <span>Root Cause Analysis</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 bg-emerald-500/10 rounded-full p-0.5" />
                        <span>Hidden Revenue Opportunities</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 bg-emerald-500/10 rounded-full p-0.5" />
                        <span>90-Day Growth Roadmap</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <span className="text-[10px] text-slate-400 font-bold">₹1,499 Limited Offer</span>
                      <button
                        onClick={() => setActiveTab('booking')}
                        className="bg-amber-500 hover:bg-amber-400 text-[#0F172A] px-4 py-1.5 rounded-lg font-black text-[11px] uppercase tracking-wider transition-all duration-150 flex items-center gap-1.5 shadow-md active:scale-95"
                      >
                        <span>Book Diagnostic Call</span>
                        <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Large Space: Full-width Premium Banner with CTA */
                  <div className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0A1128] rounded-[24px] p-6 border border-slate-800 shadow-xl text-white relative overflow-hidden flex flex-col justify-between h-[270px]">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>
                    <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute inset-0 bg-grid-white/[0.01] bg-[size:20px_20px] pointer-events-none"></div>
                    
                    <div className="flex justify-between items-start gap-6">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2.5">
                          <span className="inline-block bg-amber-400/25 text-amber-300 text-[10px] font-black px-2.5 py-0.5 rounded border border-amber-400/15 uppercase tracking-[0.15em] leading-none">
                            Limited Time Offer
                          </span>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
                            KRG ONE Enterprise Diagnostic
                          </span>
                        </div>
                        <h3 className="text-xl font-black tracking-tight text-white font-sans">Unlock Your Growth Blueprint™</h3>
                        <p className="text-xs text-slate-400 font-bold">Business Growth Diagnostic™</p>
                      </div>
                      
                      <div className="text-right shrink-0 bg-slate-900/40 px-4 py-2.5 rounded-xl border border-slate-800">
                        <span className="text-[9px] text-slate-500 block uppercase tracking-wider font-extrabold mb-0.5">Special Pricing</span>
                        <div className="flex items-baseline justify-end gap-1.5">
                          <span className="text-xs text-slate-500 line-through font-semibold">₹9,999</span>
                          <span className="text-2xl font-black text-amber-400">₹1,499</span>
                        </div>
                        <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest block mt-0.5">85% Off Applied</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-800/80 pt-4.5 my-auto">
                      <div className="space-y-2.5">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">What You Receive:</span>
                        <div className="grid grid-cols-1 gap-2">
                          <div className="flex items-center gap-2.5 text-xs font-bold text-slate-200">
                            <Check className="w-4 h-4 text-emerald-400 shrink-0 bg-emerald-400/15 rounded-full p-0.5 border border-emerald-400/10" />
                            <span>Revenue Growth Strategy</span>
                          </div>
                          <div className="flex items-center gap-2.5 text-xs font-bold text-slate-200">
                            <Check className="w-4 h-4 text-emerald-400 shrink-0 bg-emerald-400/15 rounded-full p-0.5 border border-emerald-400/10" />
                            <span>Root Cause Analysis</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2.5 md:pt-5">
                        <div className="grid grid-cols-1 gap-2">
                          <div className="flex items-center gap-2.5 text-xs font-bold text-slate-200">
                            <Check className="w-4 h-4 text-emerald-400 shrink-0 bg-emerald-400/15 rounded-full p-0.5 border border-emerald-400/10" />
                            <span>Hidden Revenue Opportunities</span>
                          </div>
                          <div className="flex items-center gap-2.5 text-xs font-bold text-slate-200">
                            <Check className="w-4 h-4 text-emerald-400 shrink-0 bg-emerald-400/15 rounded-full p-0.5 border border-emerald-400/10" />
                            <span>90-Day Growth Roadmap</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-800/60 pt-4 mt-1">
                      <p className="text-[10px] text-slate-400 font-bold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                        <span>Designed to restore page balance & drive conversions</span>
                      </p>
                      <button
                        onClick={() => setActiveTab('booking')}
                        className="bg-amber-500 hover:bg-amber-400 text-[#0F172A] px-6 py-2.5 rounded-xl font-black text-[12px] uppercase tracking-wider transition-all duration-200 flex items-center gap-2 shadow-lg active:scale-95"
                      >
                        <span>Book Diagnostic Call</span>
                        <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div> {/* END OF CENTER REPORT PANEL (xl:col-span-3) */}

          {/* STICKY RIGHT SIDEBAR (COLUMN B) */}
          <aside ref={rightSidebarRef} className="xl:col-span-1 sticky top-6 space-y-6 self-start no-print">
            
            {/* Card 1: Strategic Focus */}
            <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 flex flex-col overflow-hidden relative text-slate-800">
              <div className="p-6">
                
                {/* SECTION: Strategic Focus */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-indigo-600" />
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Strategic Focus</h4>
                    </div>
                    <span className="bg-indigo-50 text-indigo-600 text-[8px] font-extrabold px-2 py-0.5 rounded-full border border-indigo-200/40 uppercase tracking-wider">
                      Targeted
                    </span>
                  </div>

                  {/* Row 1: Business Goal */}
                  <div className="flex gap-3">
                    <div className="w-5 h-5 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Briefcase className="w-3 h-3" />
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Business Goal</span>
                      <span className="text-xs font-black text-slate-800">{businessGoal}</span>
                    </div>
                  </div>

                  {/* Row 2: Top Challenges */}
                  <div className="flex gap-3">
                    <div className="w-5 h-5 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Star className="w-3 h-3" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Top Challenges</span>
                      <ul className="space-y-1">
                        {(formData.challenges && formData.challenges.length > 0 ? formData.challenges : ["High Operational Costs", "Leadership Dependency", "Inconsistent Sales Growth"]).map((challenge: string, idx: number) => (
                          <li key={idx} className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
                            <span>{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Row 3: Growth Stage */}
                  <div className="flex gap-3">
                    <div className="w-5 h-5 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                      <GitBranch className="w-3 h-3" />
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Growth Stage</span>
                      <span className="inline-block bg-emerald-50 text-emerald-700 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-emerald-100 uppercase tracking-wider">
                        Growing Business
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Card 2: Meet Your Growth Advisor */}
            <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 p-6 relative overflow-hidden flex flex-col justify-between min-h-[640px] text-slate-800">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/5 rounded-full blur-2xl pointer-events-none"></div>
              
              <div>
                <div className="flex items-center border-b border-slate-100 pb-4 mb-6">
                  <span className="text-indigo-600 font-black text-[9px] tracking-[0.2em] uppercase">Meet Your Growth Advisor</span>
                </div>
                
                <div className="flex flex-col gap-6">
                  {/* Taller & More Prominent Executive Image Container */}
                  <div className="relative w-[104px] h-[128px] mx-auto shrink-0 transition-all duration-300">
                    {/* Shadow Decor Backdrop */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#ffb800] to-amber-300 rounded-[12px] translate-x-1 translate-y-1 opacity-90 shadow-md"></div>
                    <div className="absolute -inset-1 border border-[#ffb800]/20 rounded-[13px] translate-x-0.5 translate-y-0.5 pointer-events-none"></div>
                    
                    <div className="relative w-full h-full bg-slate-100 rounded-[12px] overflow-hidden border border-slate-200/80 shadow-lg">
                      <img 
                        src="/image.jpeg" 
                        alt="Gajendra Kumar Sharma" 
                        className="absolute inset-0 w-full h-full object-cover object-top scale-102 hover:scale-108 transition-all duration-700 ease-out" 
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f2142]/30 via-transparent to-transparent pointer-events-none"></div>
                    </div>
                  </div>

                  {/* High Contrast Content Col */}
                  <div className="text-center mt-3">
                    <h3 className="text-lg md:text-xl font-serif font-black text-[#0f2142] tracking-tight leading-tight">
                      Gajendra Kumar Sharma
                    </h3>
                    <div className="inline-block bg-amber-500/10 text-[#e0a000] text-[10px] font-extrabold mt-1.5 mb-4 px-3 py-1 rounded-md uppercase tracking-wider">
                      Founder & Growth Advisor
                    </div>

                    {/* Premium Highly-Visible Highlights Grid */}
                    <div className="grid grid-cols-1 gap-3.5 pt-5 border-t border-slate-100 text-left max-w-xs mx-auto">
                      <div className="flex items-center gap-3 text-slate-800 text-[12px] font-bold hover:translate-x-1 transition-transform duration-200">
                        <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0 shadow-sm border border-indigo-100">
                          <Award className="w-3.5 h-3.5" />
                        </div>
                        <span className="tracking-tight text-slate-900">20+ Years Business Growth Consulting</span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-slate-800 text-[12px] font-bold hover:translate-x-1 transition-transform duration-200">
                        <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0 shadow-sm border border-indigo-100">
                          <TrendingUp className="w-3.5 h-3.5" />
                        </div>
                        <span className="tracking-tight text-slate-900">Revenue Strategy</span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-slate-800 text-[12px] font-bold hover:translate-x-1 transition-transform duration-200">
                        <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0 shadow-sm border border-indigo-100">
                          <Activity className="w-3.5 h-3.5" />
                        </div>
                        <span className="tracking-tight text-slate-900">Business Transformation</span>
                      </div>

                      <div className="flex items-center gap-3 text-slate-800 text-[12px] font-bold hover:translate-x-1 transition-transform duration-200">
                        <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0 shadow-sm border border-indigo-100">
                          <Cpu className="w-3.5 h-3.5" />
                        </div>
                        <span className="tracking-tight text-slate-900">AI Enabled Growth Systems</span>
                      </div>

                      <div className="flex items-center gap-3 text-slate-800 text-[12px] font-bold hover:translate-x-1 transition-transform duration-200">
                        <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0 shadow-sm border border-indigo-100">
                          <ShieldCheck className="w-3.5 h-3.5" />
                        </div>
                        <span className="tracking-tight text-slate-900">NDA Protected Consulting</span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Styled Quote Block at bottom */}
              <div className="relative bg-[#fafcff] border border-slate-200/80 rounded-2xl p-4 pl-6 mt-6 shadow-sm">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#ffb800] rounded-l-2xl"></div>
                <p className="text-xs italic text-slate-800 leading-relaxed font-serif font-medium">
                  "Business growth is not about working harder. It is about building better systems."
                </p>
              </div>

            </div>
          </aside>

        </div> {/* END OF GLOBAL TWO-COLUMN WORKSPACE */}

      </main>
    </div>
  );
}
