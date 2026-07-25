import React from 'react';
import { 
  ArrowLeft, ArrowRight, Phone, Sparkles, TrendingUp, ShieldCheck, Target, Zap, CheckCircle2, ChevronRight, Activity, Cpu, Megaphone, Compass, Settings, DollarSign, Users, CheckCircle, AlertTriangle
} from 'lucide-react';

interface ExecutiveBusinessInsightsPageProps {
  onReturnHome?: () => void;
  onLaunchAssessment?: () => void;
  onContactUs?: () => void;
  onNextStep?: () => void;
}

export function ExecutiveBusinessInsightsPage({ 
  onReturnHome, 
  onLaunchAssessment, 
  onContactUs,
  onNextStep
}: ExecutiveBusinessInsightsPageProps) {
  
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans antialiased selection:bg-blue-600/20 selection:text-blue-900">
      
      {/* ---------------------------------------------------- */}
      {/* TOP HEADER NAVIGATION BAR                            */}
      {/* ---------------------------------------------------- */}
      <div className="sticky top-[90px] lg:top-[108px] z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs py-2 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onReturnHome}
            className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-700 hover:text-blue-600 uppercase tracking-wider transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-blue-600 group-hover:-translate-x-1 transition-transform" />
            <span>Back</span>
          </button>
          
          <div className="flex items-center gap-3 text-[11px] font-medium text-slate-600">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-blue-800 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
              Executive Business Summary™ • KRGONE Business Growth OS™
            </span>
            {onLaunchAssessment && (
              <button
                onClick={onLaunchAssessment}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1 rounded-full text-[10px] tracking-wider uppercase transition-all shadow-sm cursor-pointer"
              >
                Free Diagnostic
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 1. HERO HEADER                                       */}
      {/* ---------------------------------------------------- */}
      <section className="relative overflow-hidden pt-4 pb-4 lg:pt-6 lg:pb-6 bg-gradient-to-b from-blue-50/70 via-slate-50 to-[#f8fafc] border-b border-slate-200">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#2563eb 0.75px, transparent 0.75px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-2">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-100/80 border border-blue-200/80 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-900">EXECUTIVE BUSINESS SUMMARY™</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 font-serif">
            Turning Business Insights into Growth Opportunities
          </h1>

          <p className="max-w-3xl mx-auto text-slate-600 text-sm font-medium leading-snug pt-1">
            Your assessment highlights where your business is performing well and where focused improvements can deliver the greatest impact. Overall, your business demonstrates a solid foundation with clear opportunities to strengthen systems, improve execution, and accelerate sustainable growth.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-3">
        
        {/* ---------------------------------------------------- */}
        {/* 2. BUSINESS SNAPSHOT (4 KPI CARDS)                   */}
        {/* ---------------------------------------------------- */}
        <div className="space-y-3">
          <div className="border-b border-slate-200 pb-2">
            <h2 className="text-xl font-black text-slate-900 font-serif tracking-tight">Business Snapshot</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Overall Health</span>
              <div className="flex items-center gap-1.5 pt-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="font-extrabold text-sm text-slate-900">Strong Business</span>
              </div>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Greatest Strength</span>
              <div className="flex items-center gap-1.5 pt-1">
                <Compass className="w-4 h-4 text-blue-600" />
                <span className="font-extrabold text-sm text-slate-900">Leadership & Vision</span>
              </div>
            </div>

            <div className="bg-white border border-amber-200 bg-amber-50/30 rounded-xl p-4 shadow-sm space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block">Biggest Opportunity</span>
              <div className="flex items-center gap-1.5 pt-1">
                <Cpu className="w-4 h-4 text-amber-600" />
                <span className="font-extrabold text-sm text-amber-900 leading-tight">Technology & Innovation</span>
              </div>
            </div>

            <div className="bg-white border border-rose-200 bg-rose-50/30 rounded-xl p-4 shadow-sm space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 block">Immediate Priority</span>
              <div className="flex items-center gap-1.5 pt-1">
                <Megaphone className="w-4 h-4 text-rose-600" />
                <span className="font-extrabold text-sm text-rose-900 leading-tight">Marketing & Growth</span>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* 3. KEY STRENGTHS & GROWTH OPPORTUNITIES              */}
        {/* ---------------------------------------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Key Strengths */}
          <div className="space-y-3">
             <div className="border-b border-emerald-200 pb-2 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-black text-slate-900 font-serif">Key Strengths</h3>
             </div>
             <div className="grid gap-2">
                <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-slate-800">Clear business direction</span>
                </div>
                <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-slate-800">Stable financial performance</span>
                </div>
                <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-slate-800">Strong sales capability</span>
                </div>
             </div>
          </div>

          {/* Growth Opportunities */}
          <div className="space-y-3">
             <div className="border-b border-blue-200 pb-2 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-black text-slate-900 font-serif">Growth Opportunities</h3>
             </div>
             <div className="grid gap-2">
                <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1.5"></div>
                  <span className="text-sm font-semibold text-slate-800">Improve operational efficiency</span>
                </div>
                <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1.5"></div>
                  <span className="text-sm font-semibold text-slate-800">Strengthen customer acquisition</span>
                </div>
                <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1.5"></div>
                  <span className="text-sm font-semibold text-slate-800">Accelerate digital adoption</span>
                </div>
             </div>
          </div>

        </div>

        {/* ---------------------------------------------------- */}
        {/* 4. EXPECTED BUSINESS OUTCOMES                        */}
        {/* ---------------------------------------------------- */}
        <div className="bg-gradient-to-r from-slate-900 to-blue-950 rounded-2xl p-4 shadow-md text-white space-y-3">
          <div className="text-center space-y-1">
            <h3 className="text-xl font-black font-serif tracking-tight">Expected Business Outcomes</h3>
            <p className="text-xs text-blue-200 font-medium max-w-2xl mx-auto">
              By focusing on the recommended priorities, your business can achieve:
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-2">
            <div className="bg-white/10 border border-white/20 rounded-xl p-3 flex flex-col items-center justify-center text-center gap-2 hover:bg-white/20 transition-colors">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <span className="text-[11px] font-bold leading-tight">Higher Revenue Growth</span>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-xl p-3 flex flex-col items-center justify-center text-center gap-2 hover:bg-white/20 transition-colors">
              <Settings className="w-5 h-5 text-blue-400" />
              <span className="text-[11px] font-bold leading-tight">Better Operational Efficiency</span>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-xl p-3 flex flex-col items-center justify-center text-center gap-2 hover:bg-white/20 transition-colors">
              <Users className="w-5 h-5 text-purple-400" />
              <span className="text-[11px] font-bold leading-tight">Stronger Customer Experience</span>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-xl p-3 flex flex-col items-center justify-center text-center gap-2 hover:bg-white/20 transition-colors">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              <span className="text-[11px] font-bold leading-tight">Improved Profitability</span>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-xl p-3 flex flex-col items-center justify-center text-center gap-2 hover:bg-white/20 transition-colors md:col-span-1 col-span-2">
              <Activity className="w-5 h-5 text-amber-400" />
              <span className="text-[11px] font-bold leading-tight">Sustainable Long-Term Growth</span>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* 5. NEXT STEP                                         */}
        {/* ---------------------------------------------------- */}
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-4 shadow-sm text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left max-w-lg">
            <h4 className="text-lg font-black text-slate-900 font-serif">What's Next?</h4>
            <p className="text-xs text-slate-600 font-medium">The following pages provide a detailed review of each business pillar, along with practical recommendations and an implementation roadmap.</p>
          </div>
          
          <button
            onClick={onNextStep || onReturnHome}
            className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase px-5 py-3 rounded-xl flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer w-full sm:w-auto justify-center"
          >
            <span>Detailed 7-Pillar Business Analysis</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
