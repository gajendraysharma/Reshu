import re

with open('src/AssessmentEngine.tsx', 'r') as f:
    content = f.read()

# Replace pillars
old_pillars = """  const pillars = [
    "Leadership & Vision",
    "Sales & Revenue",
    "Marketing & Customer Growth",
    "Operations & Process",
    "Finance & Business Performance",
    "People & Organisation",
    "Technology & AI"
  ];"""
new_pillars = """  const pillars = [
    "Leadership & Vision",
    "Sales & Revenue",
    "Marketing & Customer Growth",
    "Operations & Process",
    "Finance & Business Performance",
    "People & Leadership",
    "Technology & Business Innovation"
  ];"""
content = content.replace(old_pillars, new_pillars)

# Replace allQuestions
old_questions_start = "const allQuestions = ["
old_questions_end = "];"

start_idx = content.find(old_questions_start)
end_idx = content.find("  const [scores", start_idx)

new_questions = """  // 21 structural questions (3 per pillar) + 1 final strategic question
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
    // Final Strategic Question
    "How confident are you that your business is prepared to achieve its growth goals over the next three years?"
  ];
"""
content = content[:start_idx] + new_questions + content[end_idx:]

# Replace score initialization
old_scores = "return new Array(21).fill(0);"
new_scores = "return new Array(22).fill(0);"
content = content.replace(old_scores, new_scores)

# Fix getGlobalScore
old_get_global = """  const getGlobalScore = (): number => {
    let sum = 0;
    for (let i = 0; i < 7; i++) { sum += getPillarScore(i); }
    return Math.round(sum / 7);
  };"""
new_get_global = """  const getGlobalScore = (): number => {
    const weights = [0.15, 0.20, 0.15, 0.15, 0.15, 0.10, 0.10];
    let sum = 0;
    for (let i = 0; i < 7; i++) { sum += getPillarScore(i) * weights[i]; }
    return Math.round(sum);
  };"""
content = content.replace(old_get_global, new_get_global)

# Maturity Level calculation. We'll find where "Growth Level" or something similar is.
# We'll just define it if it's missing or update it.

with open('src/AssessmentEngine.tsx', 'w') as f:
    f.write(content)

