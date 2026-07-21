import re

with open('src/components/DashboardReport.tsx', 'r') as f:
    content = f.read()

new_insights = """const getPillarInsights = (pillarTitle: string, score: number) => {
  if (score >= 80) {
    return {
      problem: "Minor structural friction identified within localized workflows, but core systemic architecture is highly stable.",
      impact: "Slight margin compression in edge-case scenarios, but overall operational velocity remains elite.",
      solution: "Deploy advanced workflow automation and strict adherence to optimization protocols to achieve total market dominance.",
      intervention: "KRG ONE Executive Advisory: Advanced scaling mechanics and capitalization strategies."
    };
  } else if (score >= 70) {
    return {
      problem: "Inconsistent application of documented processes and moderate reliance on owner intervention for non-standard operations.",
      impact: "Creates operational bottlenecks during high-volume periods, limiting scale and reducing potential profit margins.",
      solution: "Formalize mid-level management structures and enforce strict KPI tracking across all departmental workflows.",
      intervention: "KRG ONE Implementation Sprint: Standardize core processes and implement automated tracking systems."
    };
  } else {
    return {
      problem: "Severe operational leakage, lack of documented systems, and critical dependency on the owner for daily execution.",
      impact: "High risk of margin erosion, cash-flow volatility, and systemic failure under increased market pressure.",
      solution: "Immediate stabilization required. Isolate profit leakage zones, deploy emergency workflow controls, and remove owner dependency.",
      intervention: "Urgent turnaround protocols required. KRG ONE senior consultants must deploy emergency operational controls, plug profit leaks, and build survival checklists."
    };
  }
};"""

# Replace everything from const getPillarInsights = down to return { problem, impact, solution, intervention };};
pattern = r'const getPillarInsights = \(pillarTitle: string, score: number\) => \{.*?\s+return \{ problem, impact, solution, intervention \};\s*\};'

content = re.sub(pattern, new_insights, content, flags=re.DOTALL)

with open('src/components/DashboardReport.tsx', 'w') as f:
    f.write(content)

