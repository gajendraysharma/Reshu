import re

with open('src/AssessmentEngine.tsx', 'r') as f:
    content = f.read()

# 1. Update questions array to remove the 4th item in each pillar
old_questions = """  const allQuestions = [
    // Leadership
    "Is your 3-year growth roadmap explicitly documented and operationalized across leadership tiers?",
    "How rapidly does your executive core translate strategic planning into frontline market actions?",
    "Are performance metrics monitored transparently with absolute individual accountability?",
    "How agilely does your organizational framework pivot based on competitive real-time data?",
    // Sales
    "Are acquisition channels built on predictable, mathematically optimized unit economics?",
    "Is your sales pipeline modeled clearly with distinct, audited conversion metrics per tier?",
    "Do you possess structured automation protocols dedicated to systematic post-sale expansion?",
    "Is value authority scaled effectively to negate bottom-tier commodity pricing battles?",
    // Operations
    "Are inter-departmental handoffs fluid, or stalled by recurring operational gridlocks?",
    "Are production delivery lifecycles calculated continuously to maximize resource efficiency?",
    "Do structural guardrails catch product and service variance before arriving at client environments?",
    "Can current operational capacities absorb a sudden 2x volume expansion without organizational failure?",
    // Financial
    "Do you maintain real-time tracking of exact contribution margin variances across all lines?",
    "Is structural cash flow projected at least 6 months forward via automated rolling assumptions?",
    "Are corporate overhead expenditures programmatically audited to continuously patch margin leaks?",
    "Are capital allocations driven by disciplined, measurable internal rate of return benchmarks?",
    // People
    "Are high-performer attrition variables insulated with robust professional scale paths?",
    "Is the workforce incentivized directly by clear corporate milestone delivery outputs?",
    "Do you utilize structured internal academies to compress new hire ramp times?",
    "Are financial bonus pools cleanly performance-mapped or distributed arbitrarily?",
    // Systems
    "Are critical execution procedures documented clearly inside a single master knowledge base?",
    "Do business data systems update automatically without manual duplicate human entry?",
    "Is core business intelligence insulated against single-point-of-failure human dependencies?",
    "Are legacy tasks actively audited and sunsetted to clean up productivity pipelines?",
    // Tech
    "Is modern technology driving operating leverage, or generating legacy tech debt?",
    "Is real-time performance streaming seamlessly into single-pane executive controls?",
    "Are cognitive processing pipelines actively eliminating non-creative manual entry tasks?",
    "Are corporate operational loops protected against structural cyber liability variables?"
  ];"""

new_questions = """  const allQuestions = [
    // Leadership
    "Is your 3-year growth roadmap explicitly documented and operationalized across leadership tiers?",
    "How rapidly does your executive core translate strategic planning into frontline market actions?",
    "Are performance metrics monitored transparently with absolute individual accountability?",
    // Sales
    "Are acquisition channels built on predictable, mathematically optimized unit economics?",
    "Is your sales pipeline modeled clearly with distinct, audited conversion metrics per tier?",
    "Do you possess structured automation protocols dedicated to systematic post-sale expansion?",
    // Operations
    "Are inter-departmental handoffs fluid, or stalled by recurring operational gridlocks?",
    "Are production delivery lifecycles calculated continuously to maximize resource efficiency?",
    "Do structural guardrails catch product and service variance before arriving at client environments?",
    // Financial
    "Do you maintain real-time tracking of exact contribution margin variances across all lines?",
    "Is structural cash flow projected at least 6 months forward via automated rolling assumptions?",
    "Are corporate overhead expenditures programmatically audited to continuously patch margin leaks?",
    // People
    "Are high-performer attrition variables insulated with robust professional scale paths?",
    "Is the workforce incentivized directly by clear corporate milestone delivery outputs?",
    "Do you utilize structured internal academies to compress new hire ramp times?",
    // Systems
    "Are critical execution procedures documented clearly inside a single master knowledge base?",
    "Do business data systems update automatically without manual duplicate human entry?",
    "Is core business intelligence insulated against single-point-of-failure human dependencies?",
    // Tech
    "Is modern technology driving operating leverage, or generating legacy tech debt?",
    "Is real-time performance streaming seamlessly into single-pane executive controls?",
    "Are cognitive processing pipelines actively eliminating non-creative manual entry tasks?"
  ];"""
content = content.replace(old_questions, new_questions)

# Replace all structural variables referencing 28/4 to 21/3
content = content.replace("new Array(28).fill(0)", "new Array(21).fill(0)")
content = content.replace("new Array(28).fill(3)", "new Array(21).fill(0)") # Also fix the reset button

# getPillarScore logic
old_pillar_score = """  const getPillarScore = (pillarIdx: number): number => {
    const start = pillarIdx * 4;
    const total = scores[start] + scores[start+1] + scores[start+2] + scores[start+3];
    return Math.round((total / 20) * 100);
  };"""
new_pillar_score = """  const getPillarScore = (pillarIdx: number): number => {
    const start = pillarIdx * 3;
    const total = scores[start] + scores[start+1] + scores[start+2];
    return Math.round((total / 15) * 100);
  };"""
content = content.replace(old_pillar_score, new_pillar_score)

# activePillarIdx
content = content.replace("const activePillarIdx = Math.floor(currentQuestionIdx / 4);", "const activePillarIdx = Math.floor(currentQuestionIdx / 3);")

# next question timeout logic
content = content.replace("if (currentQuestionIdx < 27)", "if (currentQuestionIdx < 20)")

# progress percentage
content = content.replace("return 25 + (currentQuestionIdx / 28) * 50;", "return 25 + (currentQuestionIdx / 21) * 50;")

# Left indicators dots
content = content.replace("{[0, 1, 2, 3].map(i => {", "{[0, 1, 2].map(i => {")
content = content.replace("(currentQuestionIdx % 4)", "(currentQuestionIdx % 3)")

# Center UI text and buttons
content = content.replace("Question {currentQuestionIdx + 1} of 28", "Question {currentQuestionIdx + 1} of 21")
content = content.replace("((currentQuestionIdx)/28)*100", "((currentQuestionIdx)/21)*100")
content = content.replace("{currentQuestionIdx < 27 ? (", "{currentQuestionIdx < 20 ? (")

# Right panel text and widths
content = content.replace("{currentQuestionIdx} / 28", "{currentQuestionIdx} / 21")
content = content.replace("((28 - currentQuestionIdx) / 4)", "((21 - currentQuestionIdx) / 3)")
content = content.replace("(currentQuestionIdx / 28) * 100", "(currentQuestionIdx / 21) * 100")

# 28 structural questions comment
content = content.replace("// 28 structural questions (4 per pillar)", "// 21 structural questions (3 per pillar)")

with open('src/AssessmentEngine.tsx', 'w') as f:
    f.write(content)

