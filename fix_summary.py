import re

with open('src/components/DashboardReport.tsx', 'r') as f:
    content = f.read()

summary_pattern = r'\{\(\(\) => \{.*?if \(globalScore >= 80\) \{.*?return \(\s*<>\s*<p><strong>Strategic Positioning.*?\}\)\(\)\}'

new_summary = """{(() => {
                         if (globalScore >= 80) {
                             return (
                                 <>
                                     <p><strong>Strategic Positioning:</strong> Your enterprise exhibits exceptional operational maturity and market leadership. Internal systems are robust, and owner dependency is minimal.</p>
                                     <p><strong>Immediate Priority:</strong> Do not play defensive. Your core objective now is aggressive market expansion, capital optimization, and leveraging your structured framework to dominate your sector.</p>
                                 </>
                             );
                         } else if (globalScore >= 55) {
                             return (
                                 <>
                                     <p><strong>Core Scaling Bottleneck:</strong> The enterprise has solid baseline mechanics but suffers from critical dependencies on the owner for key day-to-day decisions, creating an active execution ceiling.</p>
                                     <p><strong>Immediate Priority:</strong> Transition from reactive firefighting to formal systems engineering by standardizing core operations.</p>
                                 </>
                             );
                         } else {
                             return (
                                 <>
                                     <p><strong>Enterprise Vulnerability Alert:</strong> The diagnostic reveals severe structural deficiencies across multiple core pillars. The enterprise is highly exposed to severe operational leakage, cash-flow volatility, and systemic risk due to an absolute lack of documented processes.</p>
                                     <p><strong>Immediate Priority:</strong> Urgent stabilization is required. You must immediately isolate your highest profit leakage zones and deploy emergency workflow controls.</p>
                                 </>
                             );
                         }
                     })()}"""

content = re.sub(summary_pattern, new_summary, content, flags=re.DOTALL)

with open('src/components/DashboardReport.tsx', 'w') as f:
    f.write(content)

