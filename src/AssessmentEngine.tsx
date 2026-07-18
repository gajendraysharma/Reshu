import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import DashboardReport from './components/DashboardReport';
import { User, Building2, Target, Info, CheckSquare, BarChart3, PieChart, FileText, LayoutGrid, Lightbulb, Lock, Layers, Cpu, CheckCircle2, ShieldCheck, PartyPopper } from 'lucide-react';

type ViewState = 'PROFILE' | 'ASSESSMENT' | 'RESULTS' | 'GROWTH_PLAN';

export default function AssessmentEngine() {
  // 1. Core State Handlers
  const [view, setView] = useState<ViewState>('PROFILE');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [activePlanTab, setActivePlanTab] = useState<'EXECUTIVE_SUMMARY' | 'PRIORITY_MATRIX' | 'ROADMAP' | 'PILLARS'>('EXECUTIVE_SUMMARY');
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    role: '',
    roleOther: '',
    companyName: '',
    industry: '',
    industryOther: '',
    businessSize: '',
    revenue: '',
    challenges: [] as string[],
    challengesOther: '',
    goal: '',
    goalOther: '',
    howHeard: '',
    howHeardOther: '',
    focusArea: '',
    declarationAccurate: false,
    declarationPrivacy: false
  });
  
  const [profileError, setProfileError] = useState('');

  const pillars = [
    "Leadership & Vision",
    "Sales & Revenue",
    "Marketing & Customer Growth",
    "Operations & Process",
    "Finance & Business Performance",
    "People & Leadership",
    "Technology & Business Innovation"
  ];

  // 21 structural questions (3 per pillar)
    // 21 structural questions (3 per pillar) + 1 final strategic question
  const allQuestions = [
    // Leadership & Vision
    "Does your business have a clearly defined vision and measurable business goals for the next 3 years?",
    "Are important business decisions based on business data and KPIs rather than intuition?",
    "Can your business continue operating effectively without your daily involvement?",
    // Sales & Revenue
    "Does your business consistently generate enough qualified leads to achieve your monthly sales targets?",
    "Is your sales process documented, monitored, and regularly reviewed to improve conversion rates?",
    "Can you accurately forecast your sales revenue for the next 90 days?",
    // Marketing & Customer Growth
    "Does your business consistently generate new customers through planned marketing activities?",
    "Do you have a system to retain existing customers and encourage repeat business?",
    "Is your business clearly differentiated from competitors in the market?",
    // Operations & Process
    "Are your key business processes documented and followed consistently across your organisation?",
    "Does your business consistently deliver products or services on time while maintaining expected quality?",
    "Can your current operations efficiently support increasing customer demand without compromising quality or delivery timelines?",
    // Finance & Business Performance
    "Do you regularly monitor your business cash flow and financial performance to support informed business decisions?",
    "Does your business have a clear system to manage customer payments and outstanding credit?",
    "Do you regularly review the profitability of your products, services, or business operations?",
    // People & Leadership
    "Do your employees clearly understand their roles, responsibilities, and performance expectations?",
    "Do you regularly review employee performance, provide feedback, and support skill development?",
    "Can your team successfully manage daily business operations without constant supervision from senior management?",
    // Technology & Business Innovation
    "Does your business use digital tools or software to manage key business activities such as sales, finance, operations, or customer information?",
    "Do you use business reports or dashboards to regularly monitor performance and support business decisions?",
    "Is your business exploring or using technology to improve customer experience, productivity, or future business growth?",
    // Final Strategic Question (Not Scored)
    "How confident are you that your business is prepared to achieve its growth goals over the next three years?"
  ];
  const [scores, setScores] = useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('krgone_scores');
      if (saved) return JSON.parse(saved);
    }
    return new Array(22).fill(0);
  });
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedIdx = localStorage.getItem('krgone_currentQuestionIdx');
      if (savedIdx !== null) {
        setCurrentQuestionIdx(parseInt(savedIdx, 10));
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('krgone_scores', JSON.stringify(scores));
  }, [scores]);

  useEffect(() => {
    localStorage.setItem('krgone_currentQuestionIdx', currentQuestionIdx.toString());
  }, [currentQuestionIdx]);

  const handleStartAssessment = (e: React.MouseEvent) => {
    e.preventDefault();
    setProfileError('');
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.mobileNumber.trim() || !formData.role.trim() || !formData.companyName.trim() || !formData.industry.trim() || !formData.businessSize.trim() || !formData.revenue.trim() || !formData.goal || !formData.declarationAccurate || !formData.declarationPrivacy) {
      setProfileError('Please fill in all required fields and accept the declarations to proceed.');
      return;
    }
    if (!formData.email.includes('@')) {
      setProfileError('Please enter a valid email address.');
      return;
    }
    setView('ASSESSMENT');
  };

  const handleChallengeToggle = (challenge: string) => {
    setFormData(prev => {
      const isSelected = prev.challenges.includes(challenge);
      if (isSelected) {
        return { ...prev, challenges: prev.challenges.filter(c => c !== challenge) };
      } else {
        if (prev.challenges.length >= 3) return prev;
        return { ...prev, challenges: [...prev.challenges, challenge] };
      }
    });
  };

  // 2. Real-time Computations
  const getPillarScore = (pillarIdx: number): number => {
    const start = pillarIdx * 3;
    const total = scores[start] + scores[start+1] + scores[start+2];
    return Math.round((total / 15) * 100);
  };


  const getMaturityLevel = (score: number) => {
    if (score < 40) return "Critical";
    if (score < 60) return "Developing";
    if (score < 75) return "Stable";
    if (score < 90) return "Growing";
    return "High Performing";
  };
  const getGlobalScore = (): number => {
    const weights = [0.15, 0.20, 0.15, 0.15, 0.15, 0.10, 0.10];
    let sum = 0;
    for (let i = 0; i < 7; i++) { sum += getPillarScore(i) * weights[i]; }
    return Math.round(sum);
  };

  const activePillarIdx = Math.floor(currentQuestionIdx / 3);
  const [splashingOption, setSplashingOption] = useState<number | null>(null);
  const [analysisStep, setAnalysisStep] = useState(0);

  useEffect(() => {
    if (view === 'RESULTS') {
      setAnalysisStep(0);
      const timer = setInterval(() => {
        setAnalysisStep(prev => {
          if (prev >= 4) {
            clearInterval(timer);
            return 5;
          }
          return prev + 1;
        });
      }, 700);
      return () => clearInterval(timer);
    }
  }, [view]);

  const handleScoreSelect = (value: number) => {
    const updated = [...scores];
    updated[currentQuestionIdx] = value;
    setScores(updated);
    setSplashingOption(value);

    // Auto advance logic
    if (currentQuestionIdx < 21) {
      setTimeout(() => {
        setCurrentQuestionIdx(prev => prev + 1);
        setSplashingOption(null);
      }, 200);
    } else {
      setTimeout(() => {
        setSplashingOption(null);
      }, 200);
    }
  };

  const getProgressPercentage = () => {
    if (view === 'PROFILE') return 25;
    if (view === 'ASSESSMENT') return 25 + (currentQuestionIdx / 21) * 50;
    if (view === 'RESULTS') return 85;
    if (view === 'GROWTH_PLAN') return 100;
    return 0;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 font-sans p-4 md:p-8">
      {view === 'PROFILE' && (
        <div className="flex flex-col w-full absolute top-0 left-0 bg-[#f4f6f8] min-h-screen z-10 pb-12">
          <div className="w-full bg-[#0a1128] border-b border-slate-800 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-[#d4af37] font-black text-2xl tracking-tighter">KRG<span className="text-white ml-1">ONE</span></span>
              <span className="text-[#d4af37] text-sm font-medium">Turning Knowledge into Revenue Growth</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <ShieldCheck className="w-5 h-5 text-[#d4af37]" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold leading-none">100% Confidential</span>
                <span className="text-[9px] text-slate-400 leading-none mt-1">Protected under NDA</span>
              </div>
            </div>
          </div>

          <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 mt-12">
            <div className="lg:col-span-8 bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Let's Understand Your Business</h1>
                  <p className="text-slate-600 text-[15px] mt-2 font-medium max-w-2xl leading-relaxed">
                    This takes about <strong>2 minutes</strong>. Your information is protected under our <strong>Confidentiality Commitment</strong> and will only be used to personalise your <strong>Business Growth Assessment™</strong>.
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#e5c158] text-white flex items-center justify-center font-bold text-sm">1</div>
                    <div className="w-12 h-0.5 bg-slate-200"></div>
                    <div className="w-8 h-8 rounded-full border border-slate-300 text-slate-400 flex items-center justify-center font-bold text-sm">2</div>
                    <div className="w-12 h-0.5 bg-slate-200"></div>
                    <div className="w-8 h-8 rounded-full border border-slate-300 text-slate-400 flex items-center justify-center font-bold text-sm">3</div>
                  </div>
                  <span className="text-xs font-bold text-slate-900 mt-2">Step 1 of 3</span>
                  <span className="text-[10px] text-slate-500">About 2 minutes</span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-4 mb-5 mt-2">
                    <div className="w-12 h-12 rounded-full border border-amber-200 bg-amber-50 flex items-center justify-center shrink-0">
                      <User className="w-6 h-6 text-amber-500" />
                    </div>
                    <h3 className="text-[22px] font-bold text-slate-900 tracking-tight">1. Contact Details</h3>
                    <div className="flex-1 h-px bg-slate-200 ml-4"></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="text-[13px] font-bold text-slate-900 block mb-1.5">Full Name <span className="text-red-500">*</span></label>
                      <input type="text" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} placeholder="Enter your full name" className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-[14px] outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all bg-white placeholder-slate-400" />
                    </div>
                    <div>
                      <label className="text-[13px] font-bold text-slate-900 block mb-1.5">Business Email <span className="text-red-500">*</span></label>
                      <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="Enter your business email" className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-[14px] outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all bg-white placeholder-slate-400" />
                    </div>
                    <div>
                      <label className="text-[13px] font-bold text-slate-900 block mb-1.5">Mobile Number <span className="text-red-500">*</span></label>
                      <input type="tel" value={formData.mobileNumber} onChange={e => setFormData({...formData, mobileNumber: e.target.value})} placeholder="Enter your mobile number" className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-[14px] outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all bg-white placeholder-slate-400" />
                    </div>
                    <div>
                      <label className="text-[13px] font-bold text-slate-900 block mb-1.5">Your Role <span className="text-red-500">*</span></label>
                      <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-[14px] outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all bg-white placeholder-slate-400 bg-white">
                        <option value="">Select your role</option>
                        <option value="Founder/CEO">Founder / CEO</option>
                        <option value="Director">Director</option>
                        <option value="Executive">Executive</option>
                        <option value="Other">Other</option>
                      </select>
                      {formData.role === 'Other' && (
                        <input type="text" value={formData.roleOther} onChange={e => setFormData({...formData, roleOther: e.target.value})} placeholder="Please specify your role" className="w-full mt-3 border border-slate-300 rounded-lg px-3.5 py-2.5 text-[14px] outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all bg-white placeholder-slate-400" />
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-4 mb-5 mt-6">
                    <div className="w-12 h-12 rounded-full border border-amber-200 bg-amber-50 flex items-center justify-center shrink-0">
                      <Building2 className="w-6 h-6 text-amber-500" />
                    </div>
                    <h3 className="text-[22px] font-bold text-slate-900 tracking-tight">2. Company Profile</h3>
                    <div className="flex-1 h-px bg-slate-200 ml-4"></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="text-[13px] font-bold text-slate-900 block mb-1.5">Company Name <span className="text-red-500">*</span></label>
                      <input type="text" value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})} placeholder="Enter company name" className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-[14px] outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all bg-white placeholder-slate-400" />
                    </div>
                    <div>
                      <label className="text-[13px] font-bold text-slate-900 block mb-1.5">Industry <span className="text-red-500">*</span></label>
                      <select value={formData.industry} onChange={e => setFormData({...formData, industry: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-[14px] outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all bg-white placeholder-slate-400 bg-white">
                        <option value="">Select industry</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Distribution">Distribution</option>
                        <option value="Consumer Products">Consumer Products</option>
                        <option value="Education & Coaching">Education & Coaching</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Real Estate">Real Estate</option>
                        <option value="FinTech">FinTech</option>
                        <option value="Professional Services">Professional Services</option>
                        <option value="Technology">Technology</option>
                        <option value="Startups & MSMEs">Startups & MSMEs</option>
                        <option value="Other">Other</option>
                      </select>
                      {formData.industry === 'Other' && (
                        <input type="text" value={formData.industryOther} onChange={e => setFormData({...formData, industryOther: e.target.value})} placeholder="Please specify your industry" className="w-full mt-3 border border-slate-300 rounded-lg px-3.5 py-2.5 text-[14px] outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all bg-white placeholder-slate-400" />
                      )}
                    </div>
                    <div>
                      <label className="text-[13px] font-bold text-slate-900 block mb-1.5">Business Size <span className="text-red-500">*</span></label>
                      <select value={formData.businessSize} onChange={e => setFormData({...formData, businessSize: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-[14px] outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all bg-white placeholder-slate-400 bg-white">
                        <option value="">Select business size</option>
                        <option value="1-10">1-10 employees</option>
                        <option value="11-50">11-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[13px] font-bold text-slate-900 block mb-1.5">Annual Revenue <span className="text-red-500">*</span></label>
                      <select value={formData.revenue} onChange={e => setFormData({...formData, revenue: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-[14px] outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all bg-white placeholder-slate-400 bg-white">
                        <option value="">Select annual revenue</option>
                        <option value="Under ₹5 Cr">Under ₹5 Cr</option>
                        <option value="₹5–20 Cr">₹5–20 Cr</option>
                        <option value="₹20–50 Cr">₹20–50 Cr</option>
                        <option value="₹50 Cr+">₹50 Cr+</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-4 mb-5 mt-6">
                    <div className="w-12 h-12 rounded-full border border-amber-200 bg-amber-50 flex items-center justify-center shrink-0">
                      <Target className="w-6 h-6 text-amber-500" />
                    </div>
                    <h3 className="text-[22px] font-bold text-slate-900 tracking-tight">3. Business Challenges & Goals</h3>
                    <div className="flex-1 h-px bg-slate-200 ml-4"></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-red-50/50 border border-red-100 p-6 rounded-xl">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                          <Target className="w-4 h-4 text-red-500" />
                        </div>
                        <div>
                          <h4 className="text-[15px] font-bold text-slate-900">Business Challenges</h4>
                          <p className="text-[13px] text-slate-600 mt-1">What are your biggest business challenges right now?<br/><span className="text-[10px]">(Select up to 3)</span></p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                        {['Low Sales Growth', 'High Operational Costs', 'Cash Flow Issues', 'Customer Retention', 'Sales Team Performance', 'Marketing ROI', 'Operational Efficiency', 'Scaling the Business', 'Competition', 'Technology Adoption', 'Talent & Leadership', 'Other'].map(ch => (
                          <label key={ch} className="flex items-center gap-2.5 text-[14px] text-slate-700 cursor-pointer mb-1">
                            <input type="checkbox" checked={formData.challenges.includes(ch)} onChange={() => handleChallengeToggle(ch)} disabled={!formData.challenges.includes(ch) && formData.challenges.length >= 3} className="w-4 h-4 accent-red-500 cursor-pointer" />
                            {ch}
                          </label>
                        ))}
                      </div>
                      <p className="text-[10px] text-red-500 mt-2 font-medium">Select up to 3 challenges</p>
                      {formData.challenges.includes('Other') && (
                        <div className="mt-3">
                          <input type="text" value={formData.challengesOther} onChange={e => setFormData({...formData, challengesOther: e.target.value})} placeholder="Please specify other challenge" className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-[14px] outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all bg-white placeholder-slate-400" />
                        </div>
                      )}
                    </div>

                    <div className="bg-emerald-50/50 border border-emerald-100 p-6 rounded-xl">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                          <Target className="w-4 h-4 text-emerald-600" />
                        </div>
                        <div>
                          <h4 className="text-[15px] font-bold text-slate-900">Business Goal</h4>
                          <p className="text-[13px] text-slate-600 mt-1">What is your primary business goal?<br/><span className="text-[10px]">(Select one)</span></p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                        {['Increase Revenue', 'Improve Profitability', 'Improve Sales Performance', 'Scale the Business', 'Improve Operations', 'Need Overall Growth Guidance', 'Other'].map(gl => (
                          <label key={gl} className="flex items-center gap-2.5 text-[14px] text-slate-700 cursor-pointer mb-1">
                            <input type="radio" name="goal" value={gl} checked={formData.goal === gl} onChange={e => setFormData({...formData, goal: e.target.value})} className="w-4 h-4 accent-emerald-600 cursor-pointer" />
                            {gl}
                          </label>
                        ))}
                      </div>
                      {formData.goal === 'Other' && (
                        <div className="mt-3">
                          <input type="text" value={formData.goalOther} onChange={e => setFormData({...formData, goalOther: e.target.value})} placeholder="Please specify your goal" className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-[14px] outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all bg-white placeholder-slate-400" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-4 mb-5 mt-6">
                    <div className="w-12 h-12 rounded-full border border-amber-200 bg-amber-50 flex items-center justify-center shrink-0">
                      <Info className="w-6 h-6 text-amber-500" />
                    </div>
                    <h3 className="text-[22px] font-bold text-slate-900 tracking-tight">4. Additional Information</h3>
                    <div className="flex-1 h-px bg-slate-200 ml-4"></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[13px] font-bold text-slate-900 block mb-1.5">How did you hear about KRG ONE? <span className="font-normal text-slate-500">(Optional)</span></label>
                      <select value={formData.howHeard} onChange={e => setFormData({...formData, howHeard: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-[14px] outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all bg-white placeholder-slate-400 bg-white">
                        <option value="">Select an option</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="Google">Google Search</option>
                        <option value="Referral">Referral</option>
                        <option value="Other">Other</option>
                      </select>
                      {formData.howHeard === 'Other' && (
                        <input type="text" value={formData.howHeardOther} onChange={e => setFormData({...formData, howHeardOther: e.target.value})} placeholder="Please specify" className="w-full mt-3 border border-slate-300 rounded-lg px-3.5 py-2.5 text-[14px] outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all bg-white placeholder-slate-400" />
                      )}
                    </div>
                    <div>
                      <label className="text-[13px] font-bold text-slate-900 block mb-1.5">Any specific area you would like us to focus on? <span className="font-normal text-slate-500">(Optional)</span></label>
                      <input type="text" value={formData.focusArea} onChange={e => setFormData({...formData, focusArea: e.target.value})} placeholder="Enter your specific area (e.g., Marketing, Sales, Operations)" className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-[14px] outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all bg-white placeholder-slate-400" />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-4 mb-5 mt-6">
                    <div className="w-12 h-12 rounded-full border border-amber-200 bg-amber-50 flex items-center justify-center shrink-0">
                      <CheckSquare className="w-6 h-6 text-amber-500" />
                    </div>
                    <h3 className="text-[22px] font-bold text-slate-900 tracking-tight">5. Declaration</h3>
                    <div className="flex-1 h-px bg-slate-200 ml-4"></div>
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2.5 text-[14px] text-slate-700 cursor-pointer mb-1">
                      <input type="checkbox" checked={formData.declarationAccurate} onChange={e => setFormData({...formData, declarationAccurate: e.target.checked})} className="w-4 h-4 accent-[#d4af37] cursor-pointer" />
                      I confirm that the information provided is accurate.
                    </label>
                    <label className="flex items-center gap-2.5 text-[14px] text-slate-700 cursor-pointer mb-1">
                      <input type="checkbox" checked={formData.declarationPrivacy} onChange={e => setFormData({...formData, declarationPrivacy: e.target.checked})} className="w-4 h-4 accent-[#d4af37] cursor-pointer" />
                      I agree to the <a href="#" className="text-amber-600 hover:underline">Privacy Policy</a> and <a href="#" className="text-amber-600 hover:underline">Confidentiality Commitment</a>.
                    </label>
                  </div>
                </div>

                {profileError && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm font-semibold rounded-xl text-center">
                    {profileError}
                  </div>
                )}

                <div className="flex justify-center mt-12">
                  <button type="button" onClick={handleStartAssessment} className="px-10 py-4 bg-[#d4af37] hover:bg-[#c29e2f] text-white font-bold text-base rounded-xl shadow-lg cursor-pointer transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
                    Continue to 7-Pillar Business Growth Assessment™ →
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-8">
              <div className="bg-gradient-to-br from-[#152238] to-[#0a1128] rounded-2xl shadow-lg border border-slate-800 p-8 md:p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
                <h3 className="text-[#e5c158] text-lg font-bold border-b border-slate-700 pb-2 mb-6 relative z-10">How It Works</h3>
                <div className="space-y-6 relative z-10">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#1e2f4a] border border-slate-600 flex items-center justify-center shrink-0">
                      <span className="text-[#e5c158] font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">Take the Assessment</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">Complete the 7-pillar diagnostic questionnaire in about 5-7 minutes.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#1e2f4a] border border-slate-600 flex items-center justify-center shrink-0">
                      <span className="text-[#e5c158] font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">Get Your Score</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">Instantly view your Business Growth Score™ and performance breakdown.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#1e2f4a] border border-slate-600 flex items-center justify-center shrink-0">
                      <span className="text-[#e5c158] font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">Receive Action Plan</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">Unlock a personalized 90-day roadmap to start scaling your business.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#152238] rounded-2xl shadow-lg border border-slate-800 p-8 md:p-10">
                <h3 className="text-[#e5c158] text-lg font-bold border-b border-slate-700 pb-2 mb-6">What You'll Receive</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full border border-slate-600 flex items-center justify-center shrink-0">
                      <BarChart3 className="w-5 h-5 text-slate-300" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">Business Growth Score™</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">Get an overall score of your business performance across 7 key areas.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full border border-slate-600 flex items-center justify-center shrink-0">
                      <PieChart className="w-5 h-5 text-slate-300" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">7-Pillar Performance Analysis</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">Understand your strengths and weaknesses across critical growth pillars.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full border border-slate-600 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-slate-300" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">Executive Summary</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">Receive a clear summary of your business health and key insights.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full border border-slate-600 flex items-center justify-center shrink-0">
                      <LayoutGrid className="w-5 h-5 text-slate-300" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">Growth Priority Matrix™</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">Identify high-impact areas that will drive the best results for your business.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full border border-slate-600 flex items-center justify-center shrink-0">
                      <Lightbulb className="w-5 h-5 text-slate-300" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">Personalised Recommendations</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">Get practical, actionable recommendations to accelerate your growth.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#152238] rounded-2xl shadow-lg border border-slate-800 p-8 md:p-10">
                <h3 className="text-[#e5c158] text-lg font-bold border-b border-slate-700 pb-2 mb-6">Why Businesses Trust KRG ONE</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full border border-[#d4af37] flex items-center justify-center shrink-0">
                      <Lock className="w-5 h-5 text-[#d4af37]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">Confidential & NDA Protected</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">Your data is 100% safe and never shared.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full border border-[#d4af37] flex items-center justify-center shrink-0">
                      <Layers className="w-5 h-5 text-[#d4af37]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">Structured Growth Framework</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">Proven methodology used by growing businesses.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full border border-[#d4af37] flex items-center justify-center shrink-0">
                      <Cpu className="w-5 h-5 text-[#d4af37]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">AI-Enabled Analysis</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">Advanced analysis to deliver deeper insights and clarity.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full border border-[#d4af37] flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-[#d4af37]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">Practical Recommendations</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">Actionable strategies that create measurable impact.</p>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      )}

      {/* WINDOW 2: AUTOMATIC ADVANCING DIAGNOSTIC GRID */}
      {view === 'ASSESSMENT' && (
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 py-4">
          {/* Left Pillar Indicators */}
          <div className="lg:col-span-3 bg-[#0a1128] text-white rounded-[24px] p-6 flex flex-col relative overflow-hidden border-t-2 border-l-2 border-b-4 border-r-4 border-t-slate-700/50 border-l-slate-700/50 border-b-black border-r-black shadow-[8px_8px_16px_rgba(0,0,0,0.6),-4px_-4px_12px_rgba(255,255,255,0.05)] transform transition-transform duration-300">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/5 via-[#0a1128]/0 to-transparent pointer-events-none"></div>
            
            <div className="flex justify-between items-center mb-4 relative z-10 border-b border-slate-800/80 pb-2">
              <span className="text-[9px] font-bold text-slate-400 font-mono tracking-widest">OPERATIONAL SECTORS</span>
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_5px_red]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_5px_orange]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_#10b981]"></span>
              </div>
            </div>

            <div className="space-y-2 relative z-10 flex-grow">
              {pillars.map((name, idx) => (
                <div key={idx} className={`relative p-3 rounded-xl flex justify-between items-center transition-all duration-300 ${activePillarIdx === idx ? 'border border-[#d4af37]/50 bg-gradient-to-r from-[#d4af37]/10 to-transparent shadow-[inset_0_0_10px_rgba(212,175,55,0.2)] scale-[1.02]' : 'border border-transparent text-slate-400 hover:bg-white/5'}`}>
                  {activePillarIdx === idx && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#d4af37] rounded-l-xl shadow-[0_0_8px_#d4af37]"></div>
                  )}
                  <span className={`text-xs font-bold truncate pr-1 ${activePillarIdx === idx ? 'text-amber-400 drop-shadow-[0_0_2px_rgba(212,175,55,0.5)]' : ''}`}>{name}</span>
                  <div className="flex gap-1">
                    {[0, 1, 2].map(i => {
                      let state = 'pending';
                      if (activePillarIdx > idx) state = 'completed';
                      else if (activePillarIdx === idx) {
                        if (i < (currentQuestionIdx % 3)) state = 'completed';
                        else if (i === (currentQuestionIdx % 3)) state = 'current';
                      }
                      return (
                        <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${state === 'completed' ? 'bg-[#d4af37] shadow-[0_0_4px_#d4af37]' : state === 'current' ? 'bg-[#d4af37] animate-ping opacity-75 ring-2 ring-[#d4af37]/50' : 'bg-slate-700/50'}`} />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800/80 relative z-10 flex flex-col gap-2 opacity-80">
               <div className="flex items-center justify-between">
                 <span className="text-[8px] font-mono text-slate-400">SYS.STATUS: ONLINE</span>
                 <span className="text-[8px] font-mono text-emerald-400 drop-shadow-[0_0_2px_#10b981]">SYNCED</span>
               </div>
               <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden shadow-inner">
                 <div className="bg-amber-500/50 h-full w-full animate-[pulse_3s_ease-in-out_infinite]"></div>
               </div>
               <span className="text-[7px] text-slate-500 font-mono text-center tracking-widest mt-1">KRG ONE AUDIT ENGINE V1.0</span>
            </div>
          </div>

          {/* Center Dynamic Question Module */}
          <div className="lg:col-span-6 bg-gradient-to-br from-[#ffffff]/90 via-[#f8f9fa]/90 to-[#e2e8f0]/90 backdrop-blur-3xl border-t-2 border-l-2 border-b-4 border-r-4 border-t-white border-l-white border-b-slate-300 border-r-slate-300 rounded-[24px] p-8 shadow-[inset_0_4px_10px_rgba(255,255,255,1),8px_8px_20px_rgba(0,0,0,0.15),-4px_-4px_12px_rgba(255,255,255,0.8)] flex flex-col justify-between relative overflow-hidden" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
            {/* Ambient Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
              <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-gradient-to-br from-[#d4af37] to-amber-200 opacity-20 blur-[100px] rounded-full mix-blend-multiply"></div>
              <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#94a3b8] opacity-20 blur-[100px] rounded-full mix-blend-multiply"></div>
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-80"></div>
              {/* Subtle grid line overlay to emphasize "digital machine" */}
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            </div>

            <div className="relative z-10" style={{ transform: 'translateZ(10px)' }}>
              <div className="flex justify-between items-center border-b border-slate-200/80 pb-4 mb-6">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black tracking-widest text-[#b38f25] font-mono uppercase mb-1 drop-shadow-[0_1px_1px_rgba(255,255,255,1)] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#d4af37] shadow-[0_0_8px_#d4af37] rounded-full animate-pulse"></span>
                    {currentQuestionIdx === 21 ? 'Final Strategic Question (Not Scored)' : `Question ${currentQuestionIdx + 1} of 21`}
                  </span>
                  <h4 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 drop-shadow-[0_1px_1px_rgba(255,255,255,1)]">
                    {currentQuestionIdx === 21 ? 'Strategic Confidence' : pillars[activePillarIdx]}
                  </h4>
                </div>
                <span className="text-xs font-mono font-black text-[#8f7016] bg-amber-50/80 border border-amber-200/50 px-3 py-1.5 rounded-md shadow-[inset_0_1px_2px_rgba(255,255,255,1),0_2px_10px_rgba(212,175,55,0.15)] backdrop-blur-sm animate-pulse">{Math.min(100, Math.round(((currentQuestionIdx)/21)*100))}% DONE</span>
              </div>

              <div className="my-8 bg-white/40 border-t-2 border-l-2 border-b-4 border-r-4 border-t-white border-l-white border-b-slate-200 border-r-slate-200 p-6 md:p-8 rounded-2xl backdrop-blur-md shadow-[inset_0_4px_10px_rgba(255,255,255,0.8),4px_4px_15px_rgba(0,0,0,0.05)] relative overflow-hidden group transition-all duration-500 transform hover:translate-y-[-2px]">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 transform -translate-y-full group-hover:translate-y-full ease-in-out"></div>
                <p className="text-sm md:text-base font-bold text-slate-800 leading-relaxed text-center relative z-10 drop-shadow-[0_1px_1px_rgba(255,255,255,1)]">{allQuestions[currentQuestionIdx]}</p>
              </div>

              <div className="space-y-3 mt-8">
                <span className="text-[10px] font-black tracking-wider text-slate-400 font-mono uppercase text-center block mb-3 drop-shadow-[0_1px_1px_rgba(255,255,255,1)]">Select Matrix Evaluation Score</span>
                <div className="grid grid-cols-5 gap-2 md:gap-3">
                  {(currentQuestionIdx === 21 
                    ? [
                        { val: 1, label: 'Very Low' },
                        { val: 2, label: 'Low' },
                        { val: 3, label: 'Moderate' },
                        { val: 4, label: 'High' },
                        { val: 5, label: 'Very High' }
                      ]
                    : [
                        { val: 1, label: 'Critical' },
                        { val: 2, label: 'Basic' },
                        { val: 3, label: 'Developing' },
                        { val: 4, label: 'Mature' },
                        { val: 5, label: 'Best Practice' }
                      ]).map(({ val, label }) => (
                    <button 
                      key={val} 
                      type="button" 
                      onClick={() => handleScoreSelect(val)} 
                      className={`py-3 md:py-4 px-1 flex flex-col items-center justify-center rounded-xl transition-all duration-300 transform hover:-translate-y-1 active:translate-y-1 active:shadow-inner ${
                        splashingOption === val 
                          ? 'bg-gradient-to-b from-amber-400 to-amber-500 text-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.6),0_8px_15px_rgba(251,191,36,0.4)] border-t-2 border-l-2 border-b-4 border-r-4 border-t-amber-300 border-l-amber-300 border-b-amber-700 border-r-amber-700 z-10' 
                          : scores[currentQuestionIdx] === val 
                            ? 'bg-[#d4af37] text-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.6),4px_6px_10px_rgba(212,175,55,0.3)] border-t-2 border-l-2 border-b-4 border-r-4 border-t-amber-300 border-l-amber-300 border-b-amber-700 border-r-amber-700' 
                            : 'bg-white/60 hover:bg-white border-t-2 border-l-2 border-b-4 border-r-4 border-t-white border-l-white border-b-slate-300 border-r-slate-300 hover:border-b-amber-200 hover:border-r-amber-200 text-slate-600 hover:text-amber-700 shadow-[4px_6px_10px_rgba(0,0,0,0.05),inset_0_2px_5px_rgba(255,255,255,1)] hover:shadow-[6px_8px_15px_rgba(212,175,55,0.15)] backdrop-blur-sm'
                      }`}
                    >
                      <span className="font-mono font-black text-sm md:text-base">{val}</span>
                      <span className={`text-[8px] sm:text-[10px] font-bold mt-1 text-center leading-tight ${scores[currentQuestionIdx] === val || splashingOption === val ? 'text-amber-50' : ''}`}>{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative z-10 flex justify-between items-center pt-8 border-t border-slate-200/80 mt-8" style={{ transform: 'translateZ(10px)' }}>
              <button type="button" onClick={() => currentQuestionIdx > 0 && setCurrentQuestionIdx(prev => prev - 1)} disabled={currentQuestionIdx === 0} className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-slate-800 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors drop-shadow-[0_1px_1px_rgba(255,255,255,1)]">← Previous</button>
              {currentQuestionIdx < 21 ? (
                <button type="button" onClick={() => setCurrentQuestionIdx(prev => prev + 1)} className="px-6 py-2.5 bg-white border-t-2 border-l-2 border-b-4 border-r-4 border-t-white border-l-white border-b-slate-300 border-r-slate-300 text-slate-800 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-50 shadow-[4px_6px_10px_rgba(0,0,0,0.05)] transform transition-all duration-200 hover:-translate-y-1 active:translate-y-1 active:border-b-2 active:border-r-2 active:border-t-4 active:border-l-4 active:shadow-inner">Next Question →</button>
              ) : (
                <button type="button" onClick={() => setView('RESULTS')} className="px-6 py-3 bg-gradient-to-r from-[#d4af37] to-[#b38f25] text-white text-xs font-black uppercase tracking-wider rounded-xl hover:brightness-110 shadow-[4px_6px_15px_rgba(212,175,55,0.4)] border-t-2 border-l-2 border-b-4 border-r-4 border-t-amber-200 border-l-amber-200 border-b-amber-700 border-r-amber-700 transform transition-all duration-200 hover:-translate-y-1 active:translate-y-1 active:border-b-2 active:border-r-2 active:border-t-4 active:border-l-4">Compile All Results →</button>
              )}
            </div>
          </div>

          {/* Right Live Polygon Preview */}
          <div className="lg:col-span-3 bg-[#0a1128] rounded-[24px] p-6 text-white flex flex-col relative overflow-hidden border-t-2 border-l-2 border-b-4 border-r-4 border-t-slate-700/50 border-l-slate-700/50 border-b-black border-r-black shadow-[8px_8px_16px_rgba(0,0,0,0.6),-4px_-4px_12px_rgba(255,255,255,0.05)] transform transition-transform duration-300">
            {/* Ambient radar glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#d4af37]/10 blur-[50px] rounded-full pointer-events-none"></div>

            <div className="relative z-10 border-b border-slate-800/80 pb-2 mb-2 flex justify-between items-start">
              <div>
                <span className="text-[9px] font-bold text-amber-500 font-mono tracking-widest block mb-1 drop-shadow-[0_0_4px_rgba(245,158,11,0.5)]">LIVE TRACKING</span>
                <h5 className="text-sm font-black text-white uppercase mt-0.5 tracking-tight">Growth Snapshot™</h5>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[8px] font-mono text-slate-500">ID: AX-7701</span>
                <span className="text-[8px] font-mono text-slate-500">{new Date().toISOString().slice(11,19)} Z</span>
              </div>
            </div>
            
            <div className="my-8 flex justify-center relative z-10">
              <svg className="w-40 h-40 transform -rotate-90 drop-shadow-[0_0_12px_rgba(212,175,55,0.3)]" viewBox="0 0 100 100">
                <defs>
                  <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(212,175,55,0.2)" />
                    <stop offset="100%" stopColor="rgba(212,175,55,0)" />
                  </radialGradient>
                </defs>
                <circle cx="50" cy="50" r="45" fill="url(#radarGlow)" />
                {/* Radar Grid */}
                <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2,2" />
                <circle cx="50" cy="50" r="28" fill="none" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="1,3" />
                <circle cx="50" cy="50" r="16" fill="none" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="1,3" />
                {/* Crosshairs */}
                <line x1="50" y1="5" x2="50" y2="95" stroke="#1e293b" strokeWidth="0.5" />
                <line x1="5" y1="50" x2="95" y2="50" stroke="#1e293b" strokeWidth="0.5" />
                
                <polygon 
                  points={[0, 1, 2, 3, 4, 5, 6].map(i => {
                    const angle = (i * 360) / 7;
                    const r = (getPillarScore(i) / 100) * 40;
                    const x = 50 + r * Math.cos((angle * Math.PI) / 180);
                    const y = 50 + r * Math.sin((angle * Math.PI) / 180);
                    return `${x},${y}`;
                  }).join(' ')}
                  fill="rgba(212, 175, 55, 0.25)" 
                  stroke="#d4af37" 
                  strokeWidth="1.5"
                  className="transition-all duration-1000 ease-in-out"
                />
                
                {/* Inner glowing points */}
                {[0, 1, 2, 3, 4, 5, 6].map(i => {
                    const angle = (i * 360) / 7;
                    const r = (getPillarScore(i) / 100) * 40;
                    const x = 50 + r * Math.cos((angle * Math.PI) / 180);
                    const y = 50 + r * Math.sin((angle * Math.PI) / 180);
                    return <circle key={i} cx={x} cy={y} r="1.5" fill="#fff" className="transition-all duration-1000 ease-in-out" style={{ filter: 'drop-shadow(0px 0px 3px #d4af37)'}} />;
                  })}
              </svg>
            </div>

            <div className="space-y-3 relative z-10 flex-grow">
              <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-3 backdrop-blur-sm flex justify-between items-center shadow-inner">
                <span className="text-[10px] text-slate-400 font-mono tracking-wide uppercase">Score Matrix™</span>
                <span className="text-sm font-black text-[#d4af37] drop-shadow-[0_0_5px_rgba(212,175,55,0.6)]">{currentQuestionIdx === 0 ? 'Pending' : `${getGlobalScore()}%`}</span>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-3 backdrop-blur-sm flex justify-between items-center shadow-inner">
                <span className="text-[10px] text-slate-400 font-mono tracking-wide uppercase">Data Points</span>
                <span className="text-xs font-bold text-white">{Math.min(21, currentQuestionIdx)} <span className="text-slate-600">/ 21</span></span>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-3 backdrop-blur-sm flex justify-between items-center shadow-inner">
                <span className="text-[10px] text-slate-400 font-mono tracking-wide uppercase">Time EST.</span>
                <span className="text-xs font-bold text-white">{Math.max(1, Math.ceil((22 - currentQuestionIdx) / 3))} <span className="text-slate-600">min</span></span>
              </div>
              
              <div className="pt-2">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">Completion</span>
                  <span className="text-[10px] font-bold text-amber-500 font-mono">{Math.min(100, Math.round((currentQuestionIdx / 21) * 100))}%</span>
                </div>
                <div className="w-full bg-slate-900 border border-slate-800 h-2 rounded-full overflow-hidden shadow-inner relative">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9InRyYW5zcGFyZW50Ii8+PGxpbmUgeDE9IjAiIHkxPSI0IiB4Mj0iNCIgeTI9IjAiIHN0cm9rZT0iIzFmMjkzNyIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+')] opacity-50 z-10"></div>
                  <div className="bg-gradient-to-r from-amber-600 to-[#d4af37] h-full transition-all duration-700 ease-out shadow-[0_0_8px_rgba(212,175,55,0.8)] relative z-0" style={{ width: `${Math.min(100, (currentQuestionIdx / 21) * 100)}%` }}></div>
                </div>
              </div>
            </div>

            {/* Terminal decoration */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 relative z-10 flex flex-col gap-1 overflow-hidden h-12">
                <span className="text-[7px] font-mono text-slate-400 leading-tight">{"0x" + Math.random().toString(16).substring(2, 8).toUpperCase()} - RECALIBRATING METRICS...</span>
                <span className="text-[7px] font-mono text-slate-500 leading-tight opacity-75">{"0x" + Math.random().toString(16).substring(2, 8).toUpperCase()} - SYNC NODE {(currentQuestionIdx % 7).toString().padStart(2, '0')}</span>
                <span className="text-[7px] font-mono text-[#d4af37] leading-tight opacity-100 animate-pulse mt-0.5">STREAMING TELEMETRY TO DASHBOARD...</span>
            </div>
          </div>
        </div>
      )}
      {/* FINAL DASHBOARD */}
      {view === 'RESULTS' && (
        <DashboardReport formData={formData} scores={scores} />
      )}
    </div>
  );
}
