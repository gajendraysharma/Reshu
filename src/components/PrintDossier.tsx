import React from 'react';
import { FileText, Activity, Layers, Target, Clock, CheckCircle, Award, Phone, Mail, ChevronRight, BarChart3, Globe, ShieldCheck } from 'lucide-react';

export default function PrintDossier({ formData, scores, globalScore, pillars, getPillarScore, getScoreColor, getScoreStatus, getScoreRating, getLowestPillar, assessmentDate, reportId }: any) {
  const goal = formData.goal || 'scale operations';
  const challenge = (formData.challenges && formData.challenges.length > 0) ? formData.challenges[0] : 'execution bottlenecks';
  const industry = formData.industry || 'your sector';
  const lowestPillar = getLowestPillar();
  const companyName = formData.companyName || 'Confidential Client';

  const Header = () => (
    <div className="flex justify-between items-end border-b-2 border-[#D4AF37] pb-4 mb-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-[#0B2545] tracking-tight">KRG <span className="text-[#D4AF37]">ONE</span></h1>
        <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mt-1">Turning Knowledge into Revenue Growth</p>
      </div>
      <div className="text-right text-[10px] text-slate-500 font-mono">
        <p>Contact: 7300300330</p>
        <p>enquiry.krgone@gmail.com</p>
        <p>krgone.vercel.app</p>
      </div>
    </div>
  );

  const Footer = ({ page, total }: { page: number, total: number }) => (
    <div className="fixed bottom-0 left-0 w-full flex justify-between items-end border-t border-slate-200 pt-4 mt-8 pb-4 px-8 bg-white z-50 text-[9px] text-slate-400">
      <div className="max-w-md">
        <p>KRG ONE, 10/B, GokulDham Apartment, Gokul Nagar, Kalwar Road, Opp. Power House, Jaipur, Rajasthan, India – 302012</p>
      </div>
      <div className="text-right flex flex-col items-end">
        <p className="mb-1 uppercase tracking-wider font-bold">Confidential Document. Distribution prohibited without express written permission.</p>
        <p className="font-mono bg-slate-100 px-2 py-1 rounded text-slate-600 font-bold">Page {page} of {total}</p>
      </div>
    </div>
  );

  const Watermark = () => (
    <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-[-1] opacity-[0.03]">
      <div className="transform -rotate-45 text-8xl font-black text-slate-900 whitespace-nowrap tracking-tighter">
        CONFIDENTIAL - KRG ONE
      </div>
    </div>
  );

  const Page = ({ children, pageNumber }: { children: React.ReactNode, pageNumber: number }) => (
    <div className="print-page w-full min-h-[297mm] bg-white p-12 relative overflow-hidden break-after-page flex flex-col justify-between" style={{ pageBreakAfter: 'always' }}>
      <Watermark />
      <div>
        {pageNumber > 0 && <Header />}
        {children}
      </div>
      {pageNumber > 0 && <Footer page={pageNumber} total={5} />}
    </div>
  );

  return (
    <div className="hidden print:block w-full bg-white text-slate-900 font-sans">
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          @page { size: A4; margin: 0; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background: white; }
          .hide-scrollbar { overflow: visible !important; }
        }
      `}} />

      {/* COVER PAGE */}
      <Page pageNumber={0}>
        <div className="flex flex-col items-center justify-center min-h-[250mm] text-center border-8 border-[#0B2545] p-12 relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 blur-[80px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0B2545]/10 blur-[80px] rounded-full"></div>
          
          <h1 className="text-6xl font-serif font-black text-[#0B2545] tracking-tight mb-4">KRG <span className="text-[#D4AF37]">ONE</span></h1>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500 font-bold mb-16">Turning Knowledge into Revenue Growth</p>
          
          <h2 className="text-4xl font-bold text-slate-900 mb-6 uppercase tracking-wider">Executive Business Snapshot™</h2>
          <p className="text-xl text-[#D4AF37] italic font-serif mb-24">Your Personalized Business Growth Intelligence Report</p>
          
          <div className="w-full max-w-lg bg-[#F8FAFC] border border-slate-200 p-8 rounded-2xl text-left shadow-lg relative z-10">
            <h3 className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-6 border-b border-slate-200 pb-2">Diagnostic Metadata</h3>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Prepared For</span>
                <span className="text-sm font-bold text-[#0B2545]">{companyName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Owner / Leader</span>
                <span className="text-sm font-bold text-[#0B2545]">{formData.fullName || 'Not Provided'}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Industry Sector</span>
                <span className="text-sm font-bold text-[#0B2545]">{industry}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Assessment Date</span>
                <span className="text-sm font-bold text-[#0B2545]">{assessmentDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">Report ID</span>
                <span className="text-xs font-mono text-slate-500">{reportId}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-24 text-[10px] uppercase tracking-widest font-black text-red-600 bg-red-50 border border-red-200 px-6 py-2 rounded">
            Strictly Confidential Report
          </div>
        </div>
      </Page>

      {/* PAGE 1: EXECUTIVE OVERVIEW */}
      <Page pageNumber={1}>
        <h2 className="text-2xl font-bold text-[#0B2545] border-b border-slate-200 pb-2 mb-6">Page 1: Executive Overview™</h2>
        
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
             <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Business Profile</h3>
             <div className="space-y-3">
                <div><span className="text-[10px] uppercase text-slate-400 block">Company Name</span><span className="text-sm font-bold">{companyName}</span></div>
                <div><span className="text-[10px] uppercase text-slate-400 block">Annual Revenue</span><span className="text-sm font-bold">{formData.revenue || 'Not Provided'}</span></div>
                <div><span className="text-[10px] uppercase text-slate-400 block">Business Goal</span><span className="text-sm font-bold text-emerald-700">{goal}</span></div>
                <div>
                   <span className="text-[10px] uppercase text-slate-400 block mb-1">Identified Challenges</span>
                   <div className="flex flex-wrap gap-1">
                      {formData.challenges && formData.challenges.length > 0 ? formData.challenges.map((ch: string, i: number) => <span key={i} className="bg-red-50 text-red-700 px-2 py-0.5 rounded text-[10px] font-bold border border-red-100">{ch}</span>) : <span className="bg-red-50 text-red-700 px-2 py-0.5 rounded text-[10px] font-bold">Leadership Dependency</span>}
                   </div>
                </div>
             </div>
          </div>
          
          <div className="bg-[#0B2545] text-white p-6 rounded-xl flex flex-col items-center justify-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/20 blur-[40px] rounded-full"></div>
             <h3 className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-4 z-10">Overall Business Growth Score™</h3>
             <div className="text-7xl font-black text-[#D4AF37] mb-2 z-10">{globalScore}</div>
             <div className="flex gap-4 mt-4 z-10">
                <div className="text-center"><span className="block text-[9px] uppercase text-slate-400">Rating</span><span className="text-lg font-bold">{getScoreRating(globalScore)}</span></div>
                <div className="text-center"><span className="block text-[9px] uppercase text-slate-400">Status</span><span className="text-sm font-bold px-2 py-1 bg-white/10 rounded mt-1 block" style={{color: getScoreColor(globalScore)}}>{getScoreStatus(globalScore)}</span></div>
             </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
           <h3 className="text-sm font-bold text-[#0B2545] uppercase tracking-widest mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#D4AF37]" /> Executive Business Summary™
           </h3>
           <div className="prose prose-sm max-w-none text-slate-700 space-y-4">
              <p>
                 Based on the KRG ONE Business Growth Assessment™, <strong>{companyName}</strong> currently operates with an overall Growth Score of <strong>{globalScore}/100</strong>, indicating a <strong>{getScoreStatus(globalScore).toLowerCase()}</strong> state of operational readiness and market positioning in the {industry} sector.
              </p>
              <p>
                 <strong>Core Dynamic Observation:</strong> While foundational market demand exists within {industry}, current analytical models indicate that inconsistent systems in <strong>{lowestPillar}</strong> are actively generating structural friction. Prior to aggressively pursuing your objective to {goal.toLowerCase()}, you must immediately resolve these <strong>{lowestPillar}</strong> vulnerabilities. Failure to do so will directly amplify your current {challenge.toLowerCase()} and erode enterprise margins.
              </p>
              {globalScore >= 80 ? (
                 <>
                     <p><strong>Strategic Positioning:</strong> Your enterprise exhibits exceptional operational maturity, strong internal systems, and minimal owner dependency. You have successfully cleared the standard growth bottlenecks that crush most MSMEs.</p>
                     <p><strong>Immediate Priority:</strong> Do not play defensive. Your core objective now is aggressive market expansion, capital optimization, and leveraging your structured framework to dominate your sector.</p>
                 </>
              ) : globalScore >= 50 ? (
                 <>
                     <p><strong>Core Scaling Bottleneck:</strong> The enterprise has solid baseline mechanics but suffers from critical dependencies on the owner for key day-to-day decisions, creating an active execution ceiling.</p>
                     <p><strong>Immediate Priority:</strong> Transition from reactive firefighting to formal systems engineering by standardizing core operations.</p>
                 </>
              ) : (
                 <>
                     <p><strong>Enterprise Vulnerability Alert:</strong> The diagnostic reveals severe structural deficiencies across multiple core pillars. The enterprise is highly exposed to severe operational leakage, cash-flow volatility, and systemic risk due to an absolute lack of documented processes.</p>
                     <p><strong>Immediate Priority:</strong> Urgent stabilization is required. You must immediately isolate your highest profit leakage zones and deploy emergency workflow controls.</p>
                 </>
              )}
           </div>
           
           <div className="bg-[#F8FAFC] border-l-4 border-[#D4AF37] p-4 rounded-r-lg mt-6">
              <strong className="text-[#0B2545] text-xs uppercase tracking-widest block mb-1">Executive Recommendation</strong>
              {globalScore >= 80 ? (
                  <p className="text-sm m-0 text-slate-700">How KRG ONE Accelerates You: We help high-performing firms design advanced scaling blueprints, execute strategic market entries, and multiply valuation metrics to prepare for enterprise-level dominance.</p>
              ) : globalScore >= 50 ? (
                  <p className="text-sm m-0 text-slate-700">How KRG ONE Supports You: We deploy functional process optimization tracks to remove structural drag and stabilize growth metrics.</p>
              ) : (
                  <p className="text-sm m-0 text-slate-700">How KRG ONE Saves Your Margins: This is a high-alert scenario. Our senior turnaround consultants work directly with you to plug immediate operational leaks, secure your cash pipelines, and build emergency checklists to keep your business alive and stable.</p>
              )}
           </div>
        </div>
      </Page>

      {/* PAGE 2: BUSINESS HEALTH DASHBOARD */}
      <Page pageNumber={2}>
        <h2 className="text-2xl font-bold text-[#0B2545] border-b border-slate-200 pb-2 mb-6">Page 2: Business Health Dashboard™</h2>
        
        <div className="grid grid-cols-2 gap-8">
           <div className="space-y-6">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-widest border-b border-slate-100 pb-2">7-Pillar Scorecard</h3>
              {pillars.map((pillar: string, idx: number) => {
                 const score = getPillarScore(idx);
                 const status = getScoreStatus(score);
                 const color = getScoreColor(score);
                 return (
                    <div key={idx} className="flex justify-between items-center border-b border-slate-100 pb-3">
                       <span className="text-sm font-bold text-slate-800 w-1/2">{pillar}</span>
                       <div className="w-1/4">
                          <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                             <div className="h-full rounded-full" style={{width: `${score}%`, backgroundColor: color}}></div>
                          </div>
                       </div>
                       <span className="text-xs font-bold w-1/4 text-right" style={{color}}>{score}/100</span>
                    </div>
                 );
              })}
           </div>
           <div className="space-y-6">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-widest border-b border-slate-100 pb-2">Strengths & Priorities</h3>
              
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 mb-4">
                 <h4 className="text-[10px] uppercase font-bold text-emerald-800 mb-3 tracking-widest">Core Strengths</h4>
                 {(() => {
                    const strengths = pillars.map((p: string, i: number) => ({name: p, score: getPillarScore(i)})).filter((s: any) => s.score >= 85).sort((a: any, b: any) => b.score - a.score);
                    return strengths.length > 0 ? strengths.map((s: any, idx: number) => (
                        <div key={idx} className="flex justify-between text-sm mb-2">
                           <span className="font-medium text-emerald-900">{s.name}</span>
                           <span className="font-bold text-emerald-700">{s.score}%</span>
                        </div>
                    )) : <div className="text-xs font-bold text-slate-400 italic">No pillars currently operating at an elite level.</div>;
                 })()}
              </div>
              
              <div className="bg-red-50 border border-red-100 rounded-xl p-5">
                 <h4 className="text-[10px] uppercase font-bold text-red-800 mb-3 tracking-widest">Priority Improvement Areas</h4>
                 {(() => {
                    const weaknesses = pillars.map((p: string, i: number) => ({name: p, score: getPillarScore(i)})).filter((s: any) => s.score < 70).sort((a: any, b: any) => a.score - b.score);
                    return weaknesses.length > 0 ? weaknesses.map((s: any, idx: number) => (
                        <div key={idx} className="flex justify-between text-sm mb-2">
                           <span className="font-medium text-red-900">{s.name}</span>
                           <span className="font-bold text-red-700">{s.score}%</span>
                        </div>
                    )) : <div className="text-xs font-bold text-slate-400 italic">Core foundations are structurally secure.</div>;
                 })()}
              </div>
           </div>
        </div>
      </Page>

      {/* PAGE 3: KRG ONE AI GROWTH ADVISORY */}
      <Page pageNumber={3}>
        <h2 className="text-2xl font-bold text-[#0B2545] border-b border-slate-200 pb-2 mb-6">Page 3: KRG ONE AI Growth Advisory™</h2>
        <div className="space-y-8">
           <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-[#0B2545] uppercase tracking-widest mb-4">Strategic Revenue Optimization Opportunities</h3>
              <p className="text-sm text-slate-700 leading-relaxed mb-4">
                 Based on the correlation between your <strong>{lowestPillar}</strong> deficit and your goal to <strong>{goal}</strong>, our analytical models identify significant latent revenue trapped within current workflows.
              </p>
              <ul className="space-y-3 text-sm text-slate-700 list-disc pl-5">
                 <li><strong>Standardization Multiplier:</strong> Documenting the top 20% of repetitive tasks in {lowestPillar} can yield an immediate 15-25% recovery in weekly leadership time, which must be reallocated directly to high-margin sales activities.</li>
                 <li><strong>Client Acquisition Drag:</strong> Your current challenges with {challenge.toLowerCase()} are directly exacerbated by operational friction. Smooth delivery creates a compounding referral engine.</li>
                 <li><strong>Owner Depedency Tax:</strong> The business is currently capped by your personal bandwidth. Without institutional systems, hiring more headcount will only increase chaos, not throughput.</li>
              </ul>
           </div>
           
           <div>
              <h3 className="text-sm font-bold text-[#0B2545] uppercase tracking-widest mb-4">Enterprise Business Risks Priority Matrix</h3>
              <table className="w-full text-left text-sm border-collapse">
                 <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                       <th className="py-3 px-4 font-bold text-slate-600 uppercase text-[10px] tracking-widest">Risk Factor</th>
                       <th className="py-3 px-4 font-bold text-slate-600 uppercase text-[10px] tracking-widest">Severity</th>
                       <th className="py-3 px-4 font-bold text-slate-600 uppercase text-[10px] tracking-widest">Impact Horizon</th>
                    </tr>
                 </thead>
                 <tbody>
                    <tr className="border-b border-slate-100">
                       <td className="py-3 px-4 font-medium text-slate-800">Key Person Dependency (Owner)</td>
                       <td className="py-3 px-4"><span className="text-red-700 font-bold bg-red-50 px-2 py-1 rounded text-xs">High</span></td>
                       <td className="py-3 px-4 text-slate-600">Immediate</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                       <td className="py-3 px-4 font-medium text-slate-800">Inconsistent Service/Product Quality</td>
                       <td className="py-3 px-4"><span className="text-orange-700 font-bold bg-orange-50 px-2 py-1 rounded text-xs">Medium-High</span></td>
                       <td className="py-3 px-4 text-slate-600">30-60 Days</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                       <td className="py-3 px-4 font-medium text-slate-800">Margin Erosion via Operational Waste</td>
                       <td className="py-3 px-4"><span className="text-red-700 font-bold bg-red-50 px-2 py-1 rounded text-xs">High</span></td>
                       <td className="py-3 px-4 text-slate-600">Immediate</td>
                    </tr>
                 </tbody>
              </table>
           </div>
        </div>
      </Page>

      {/* PAGE 4: 90-DAY BUSINESS GROWTH ROADMAP */}
      <Page pageNumber={4}>
        <h2 className="text-2xl font-bold text-[#0B2545] border-b border-slate-200 pb-2 mb-6">Page 4: 90-Day Business Growth Roadmap™</h2>
        <div className="space-y-6">
           
           <div className="border-l-2 border-[#D4AF37] pl-6 relative">
              <div className="absolute w-3 h-3 bg-[#D4AF37] rounded-full -left-[7px] top-1"></div>
              <h3 className="text-lg font-bold text-[#0B2545] mb-2">Phase 1: Immediate Risk Mitigation (Days 1–30)</h3>
              <p className="text-sm text-slate-600 mb-4">Focus entirely on plugging margin leaks and establishing basic control systems to buy back the owner's time.</p>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                 <h4 className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-2">Success Indicators</h4>
                 <ul className="text-sm text-slate-800 font-medium space-y-1">
                    <li>✓ Identify Top 3 process bottlenecks in {lowestPillar}.</li>
                    <li>✓ Draft and deploy 5 critical Standard Operating Procedures (SOPs).</li>
                    <li>✓ Establish a daily 15-minute leadership sync.</li>
                 </ul>
              </div>
           </div>

           <div className="border-l-2 border-[#0B2545] pl-6 relative">
              <div className="absolute w-3 h-3 bg-[#0B2545] rounded-full -left-[7px] top-1"></div>
              <h3 className="text-lg font-bold text-[#0B2545] mb-2">Phase 2: Process Standardization (Days 31–60)</h3>
              <p className="text-sm text-slate-600 mb-4">Transition from emergency control to documented, repeatable workflow infrastructure.</p>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                 <h4 className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-2">Success Indicators</h4>
                 <ul className="text-sm text-slate-800 font-medium space-y-1">
                    <li>✓ Map complete end-to-end customer journey.</li>
                    <li>✓ Implement basic cloud-based task management architecture.</li>
                    <li>✓ Train team leaders on execution consistency without owner approval.</li>
                 </ul>
              </div>
           </div>

           <div className="border-l-2 border-emerald-600 pl-6 relative">
              <div className="absolute w-3 h-3 bg-emerald-600 rounded-full -left-[7px] top-1"></div>
              <h3 className="text-lg font-bold text-[#0B2545] mb-2">Phase 3: Scaling & Automation (Days 61–90)</h3>
              <p className="text-sm text-slate-600 mb-4">Leverage stabilized systems to handle higher volume without breaking the team.</p>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                 <h4 className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-2">Success Indicators</h4>
                 <ul className="text-sm text-slate-800 font-medium space-y-1">
                    <li>✓ Launch targeted acquisition campaigns to feed the stabilized funnel.</li>
                    <li>✓ Implement automated performance KPI tracking dashboards.</li>
                    <li>✓ Shift owner role strictly to strategy and capital allocation.</li>
                 </ul>
              </div>
           </div>

        </div>
      </Page>

      {/* PAGE 5: BUSINESS GROWTH DIAGNOSTIC PITCH */}
      <Page pageNumber={5}>
        <div className="flex flex-col items-center justify-center min-h-[250mm] text-center">
           <h2 className="text-3xl font-serif font-black text-[#0B2545] mb-6 max-w-2xl">Ready to Build a High-Performance, Automated Enterprise?</h2>
           <p className="text-lg text-slate-600 mb-12 max-w-2xl">
              Your diagnostic report outlines the strategic path, but execution requires precision. Book your 1-on-1 strategy session with our senior consultants today.
           </p>

           <div className="w-full max-w-3xl bg-[#0B2545] p-10 rounded-2xl text-left shadow-2xl relative overflow-hidden mb-12">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 blur-[80px] rounded-full pointer-events-none"></div>
              
              <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
                 <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest mb-2 border border-[#D4AF37]/30">
                       Strategic Action Required
                    </span>
                    <h3 className="text-2xl font-bold text-white">1-on-1 Business Growth Diagnostic™</h3>
                    <p className="text-slate-400 text-sm mt-1">60-90 Minute Custom Strategy Session</p>
                 </div>
                 <div className="text-right">
                    <p className="text-xs text-slate-400 uppercase tracking-widest font-bold line-through">Standard Retainer: ₹9,999</p>
                    <p className="text-3xl font-black text-[#D4AF37] mt-1">Special: ₹1,499</p>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                 {[
                    "Deep Root Cause Systems Audit",
                    "Custom Implementation Blueprint",
                    "Revenue Leakage Identification",
                    "Actionable 90-Day Milestones",
                    "Live Strategic Q&A with Senior Advisor",
                    "Post-Session Digital Toolkit Access"
                 ].map((item, i) => (
                    <div key={i} className="flex gap-3 items-start">
                       <CheckCircle className="w-5 h-5 text-[#D4AF37] shrink-0" />
                       <span className="text-sm text-slate-200 font-medium">{item}</span>
                    </div>
                 ))}
              </div>
           </div>

           <div className="text-center space-y-4">
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Secure Your Session Immediately</p>
              <div className="flex justify-center gap-8 text-lg font-bold text-[#0B2545]">
                 <p className="flex items-center gap-2"><Phone className="w-5 h-5 text-[#D4AF37]"/> +91 7300300330</p>
                 <p className="flex items-center gap-2"><Mail className="w-5 h-5 text-[#D4AF37]"/> enquiry.krgone@gmail.com</p>
              </div>
              <p className="text-xs font-mono text-slate-400 mt-4">krgone.vercel.app</p>
           </div>
        </div>
      </Page>
    </div>
  );
}
