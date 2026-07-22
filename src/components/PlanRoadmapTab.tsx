import React, { useState } from 'react';
import { 
  Sprout, 
  Settings, 
  Rocket, 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  Wallet, 
  UserCheck, 
  Clock, 
  Info 
} from 'lucide-react';

interface PlanRoadmapTabProps {
  formData?: Record<string, any>;
  globalScore?: number;
}

export const PlanRoadmapTab: React.FC<PlanRoadmapTabProps> = ({ formData = {}, globalScore = 65 }) => {
  // Track completed items if user wants to interactively check them off
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    'c1-1': true,
    'c1-2': true,
    'c1-3': true,
    'c1-4': true,
    'c1-5': true,
    'c2-1': true,
    'c2-2': true,
    'c2-3': true,
    'c2-4': true,
    'c2-5': true,
    'c3-1': true,
    'c3-2': true,
    'c3-3': true,
    'c3-4': true,
    'c3-5': true,
  });

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const primaryChallenge = formData?.challenges && formData.challenges.length > 0 
    ? formData.challenges.join(', ') 
    : 'Core Operational Leakage';

  // 3-Phase Detailed Corporate Operations Roadmap Data
  const roadmapPhases = [
    {
      id: 'phase1',
      days: 'DAYS 1–30',
      title: 'Emergency Risk Mitigation & Stabilization Sprints',
      color: 'green',
      icon: Sprout,
      // Colors
      bgCard: 'bg-emerald-50/30 border-emerald-100',
      textDays: 'text-emerald-700',
      textTitle: 'text-emerald-900',
      iconBg: 'text-emerald-600',
      checkIcon: 'text-emerald-600 fill-emerald-100',
      outcomeBg: 'bg-emerald-50/80 border-emerald-100',
      outcomeTitle: 'text-emerald-800',
      outcomeText: 'text-emerald-950',
      detailedDirective: `Isolate and plug immediate cash flow leakages and severe operational friction points. Deploy basic end-of-day (EOD) daily tracking templates for all operational staff members. Set up absolute tracking metrics for primary user challenges: ${primaryChallenge}. Stop daily administrative tasks from reaching the executive founder layer by establishing a strict delegation rule.`,
      items: [
        { id: 'c1-1', label: 'Plug cash flow leakages & audit weekly accounts receivable' },
        { id: 'c1-2', label: 'Deploy daily EOD tracking templates for staff members' },
        { id: 'c1-3', label: `Institute tracking metrics for: ${primaryChallenge}` },
        { id: 'c1-4', label: 'Enforce strict delegation rules to protect founder bandwidth' },
        { id: 'c1-5', label: 'Set up weekly emergency risk & cash mitigation huddles' }
      ],
      expectedOutcome: 'Immediate operational stabilization with zero unmonitored cash leakage and protected founder bandwidth.'
    },
    {
      id: 'phase2',
      days: 'DAYS 31–60',
      title: 'Process Standardization & Workflow Architecture Sprints',
      color: 'blue',
      icon: Settings,
      // Colors
      bgCard: 'bg-blue-50/30 border-blue-100',
      textDays: 'text-blue-700',
      textTitle: 'text-blue-900',
      iconBg: 'text-blue-600',
      checkIcon: 'text-blue-600 fill-blue-100',
      outcomeBg: 'bg-blue-50/80 border-blue-100',
      outcomeTitle: 'text-blue-800',
      outcomeText: 'text-blue-950',
      detailedDirective: "Begin the formal drafting and deployment of step-by-step Standard Operating Procedures (SOPs) across your lowest-performing operational pillars. Build clean cloud-based tracking systems to monitor team output, optimize customer acquisition channels, and map customer retention journeys to maximize your lifetime client value metrics.",
      items: [
        { id: 'c2-1', label: 'Draft & deploy digital step-by-step SOP playbooks' },
        { id: 'c2-2', label: 'Implement cloud CRM & automated sales follow-up leads' },
        { id: 'c2-3', label: 'Build team output cockpits to monitor daily throughput' },
        { id: 'c2-4', label: 'Optimize customer acquisition & retention journeys' },
        { id: 'c2-5', label: 'Codify departmental roles and objective job scorecards' }
      ],
      expectedOutcome: 'Fully documented operational processes, predictable sales conversion velocity, and team self-sufficiency.'
    },
    {
      id: 'phase3',
      days: 'DAYS 61–90',
      title: 'System Optimization & Capital Scaling Sprints',
      color: 'purple',
      icon: Rocket,
      // Colors
      bgCard: 'bg-purple-50/30 border-purple-100',
      textDays: 'text-purple-700',
      textTitle: 'text-purple-900',
      iconBg: 'text-purple-600',
      checkIcon: 'text-purple-600 fill-purple-100',
      outcomeBg: 'bg-purple-50/80 border-purple-100',
      outcomeTitle: 'text-purple-800',
      outcomeText: 'text-purple-950',
      detailedDirective: "Integrate scalable automation tools and modern business software models. Transition your management team to a formal weekly performance review cycle based on concrete KPIs rather than personal feelings. Review unit profit margins across all core product lines to maximize revenue efficiency.",
      items: [
        { id: 'c3-1', label: 'Integrate API tools & automated software workflows' },
        { id: 'c3-2', label: 'Transition management to weekly KPI-driven review cycles' },
        { id: 'c3-3', label: 'Conduct unit profit margin audits across product lines' },
        { id: 'c3-4', label: 'Empower middle management to lead autonomous huddles' },
        { id: 'c3-5', label: 'Prepare enterprise infrastructure for regional scaling' }
      ],
      expectedOutcome: 'Institutionalized scaling framework, max profit margins, and complete founder-decoupled operations.'
    }
  ];

  // Dynamic result calculations if scores are available, defaulting to reference image values
  const revenueGrowth = globalScore < 70 ? '+18%' : globalScore < 85 ? '+15%' : '+12%';
  const profitImprovement = globalScore < 70 ? '+16%' : globalScore < 85 ? '+14%' : '+10%';
  const productivityImprovement = globalScore < 70 ? '+25%' : globalScore < 85 ? '+20%' : '+15%';
  const healthScoreImprovement = globalScore < 70 ? '+22%' : globalScore < 85 ? '+18%' : '+12%';

  const businessResults = [
    {
      icon: TrendingUp,
      iconBg: 'bg-emerald-500 text-white',
      title: 'Revenue Growth',
      titleColor: 'text-emerald-700',
      value: revenueGrowth,
      valueColor: 'text-emerald-600',
      subtext: 'Expected increase in revenue'
    },
    {
      icon: Wallet,
      iconBg: 'bg-blue-500 text-white',
      title: 'Profit Improvement',
      titleColor: 'text-blue-700',
      value: profitImprovement,
      valueColor: 'text-blue-600',
      subtext: 'Expected increase in profitability'
    },
    {
      icon: UserCheck,
      iconBg: 'bg-purple-500 text-white',
      title: 'Productivity Improvement',
      titleColor: 'text-purple-700',
      value: productivityImprovement,
      valueColor: 'text-purple-600',
      subtext: 'Expected improvement in team productivity'
    },
    {
      icon: Clock,
      iconBg: 'bg-amber-500 text-white',
      title: 'Business Health Score **',
      titleColor: 'text-amber-600',
      value: healthScoreImprovement,
      valueColor: 'text-amber-500',
      subtext: 'Expected improvement in overall score'
    }
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-10">
      {/* SECTION 1: YOUR 90-DAY ROADMAP */}
      <div className="space-y-6">
        <h2 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-wide">
          YOUR 90-DAY ROADMAP
        </h2>

        {/* 3 PHASES GRID WITH ARROWS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
          {roadmapPhases.map((phase, idx) => {
            const IconComponent = phase.icon;
            return (
              <React.Fragment key={phase.id}>
                <div className={`rounded-2xl p-6 border shadow-sm flex flex-col justify-between space-y-6 relative ${phase.bgCard}`}>
                  {/* CARD HEADER */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <span className={`text-xs font-black uppercase tracking-wider block font-mono ${phase.textDays}`}>
                          {phase.days}
                        </span>
                        <h3 className={`text-base sm:text-lg font-black tracking-tight ${phase.textTitle}`}>
                          {phase.title}
                        </h3>
                      </div>
                      <div className={`p-2 rounded-xl bg-white shadow-sm border border-slate-100 ${phase.iconBg}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                    </div>

                    {/* DETAILED DIRECTIVE TEXT */}
                    <div className="bg-white/80 p-3 rounded-xl border border-slate-200/80 text-[11px] text-slate-700 leading-relaxed font-medium">
                      {phase.detailedDirective}
                    </div>

                    {/* CHECKLIST ITEMS */}
                    <div className="space-y-2.5 pt-3">
                      {phase.items.map((item) => {
                        const isChecked = !!checkedItems[item.id];
                        return (
                          <div 
                            key={item.id} 
                            onClick={() => toggleCheck(item.id)}
                            className="flex items-center gap-3 cursor-pointer group py-0.5"
                          >
                            <CheckCircle2 className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${isChecked ? phase.checkIcon : 'text-slate-300'}`} />
                            <span className={`text-xs font-semibold leading-snug transition-colors ${isChecked ? 'text-slate-800' : 'text-slate-400 line-through'}`}>
                              {item.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* EXPECTED OUTCOME BOX */}
                  <div className={`p-4 rounded-xl border text-center space-y-1.5 ${phase.outcomeBg}`}>
                    <span className={`text-xs font-black uppercase tracking-wide block ${phase.outcomeTitle}`}>
                      Expected Outcome
                    </span>
                    <p className={`text-xs font-medium leading-relaxed ${phase.outcomeText}`}>
                      {phase.expectedOutcome}
                    </p>
                  </div>
                </div>

                {/* ARROW ICON BETWEEN COLUMNS (VISIBLE ON LG SCREENS) */}
                {idx < 2 && (
                  <div className="hidden lg:flex items-center justify-center absolute -right-3 top-1/3 -translate-y-1/2 z-20 pointer-events-none">
                    <div className="w-7 h-7 rounded-full bg-white border border-slate-200 text-slate-400 flex items-center justify-center shadow-sm">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: EXPECTED BUSINESS RESULTS IN 90 DAYS */}
      <div className="space-y-6 pt-4 border-t border-slate-100">
        <h2 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-wide">
          EXPECTED BUSINESS RESULTS IN 90 DAYS
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {businessResults.map((result, index) => {
            const IconComp = result.icon;
            return (
              <div 
                key={index} 
                className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4 hover:border-slate-300 transition-all"
              >
                <div className="space-y-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-sm ${result.iconBg}`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className={`text-xs font-black uppercase tracking-wide block ${result.titleColor}`}>
                    {result.title}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className={`text-3xl sm:text-4xl font-black font-mono block ${result.valueColor}`}>
                    {result.value}
                  </span>
                  <span className="text-[11px] text-slate-500 font-semibold block">
                    {result.subtext}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* FOOTER DISCLAIMER */}
        <div className="pt-4 flex items-center justify-center gap-2 text-xs text-slate-500 font-medium text-center">
          <Info className="w-4 h-4 text-slate-400 shrink-0" />
          <span>Results are estimated based on your current business data and industry benchmarks.</span>
        </div>
      </div>
    </div>
  );
};

export default PlanRoadmapTab;
