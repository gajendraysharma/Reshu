import re

with open('src/AssessmentEngine.tsx', 'r') as f:
    content = f.read()

# Replace allQuestions
old_questions_pattern = r'const allQuestions = \[.*?\];'
new_questions = """const allQuestions = [
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
    // Question 22
    "What are the biggest challenges your business is facing right now? (Select up to 3)",
    // Question 23
    "What is your immediate business priority?",
    // Question 24
    "What do you see as the biggest growth opportunity for your business?"
  ];"""
content = re.sub(old_questions_pattern, new_questions, content, flags=re.DOTALL)

# Update new Array(22) -> new Array(24)
content = content.replace("new Array(22).fill(0)", "new Array(24).fill(0)")

# Update getGlobalScore in AssessmentEngine
get_global_score_pattern = r'const getGlobalScore = \(\): number => \{.*?return Math\.round\(totalScore\);\s*\};'
new_get_global_score = """const getGlobalScore = (): number => {
    if (!scores || scores.length === 0) return 0;
    const weights = [18, 17, 14, 16, 15, 10, 10];
    let totalScore = 0;
    for (let i = 0; i < 7; i++) {
        const startIdx = i * 3;
        const answered = scores.slice(startIdx, startIdx + 3).filter(s => typeof s === 'number' && !isNaN(s) && s > 0);
        if (answered.length === 0) continue;
        const total = answered.reduce((a, b) => a + b, 0);
        totalScore += (total / 9) * weights[i];
    }
    return Math.round(totalScore);
  };"""
content = re.sub(get_global_score_pattern, new_get_global_score, content, flags=re.DOTALL)

# Update getPillarScore in AssessmentEngine
get_pillar_score_pattern = r'const getPillarScore = \(pillarIdx: number\): number => \{.*?return Math\.round\(\(total / 12\) \* 100\);\s*\};'
new_get_pillar_score = """const getPillarScore = (pillarIdx: number): number => {
    const start = pillarIdx * 3;
    const answered = scores.slice(start, start + 3).filter(s => typeof s === 'number' && !isNaN(s) && s > 0);
    if (answered.length === 0) return 0;
    const total = answered.reduce((a, b) => a + b, 0);
    return Math.round((total / 9) * 100);
  };"""
content = re.sub(get_pillar_score_pattern, new_get_pillar_score, content, flags=re.DOTALL)

# Auto advance logic
auto_advance_pattern = r'if \(currentQuestionIdx < 21\) \{\s*setTimeout\(\(\) => \{\s*setCurrentQuestionIdx\(prev => prev \+ 1\);\s*setSplashingOption\(null\);\s*\}, 200\);\s*\} else \{\s*setTimeout\(\(\) => \{\s*setSplashingOption\(null\);\s*\}, 200\);\s*\}'
new_auto_advance = """if (currentQuestionIdx < 23) {
      setTimeout(() => {
        setCurrentQuestionIdx(prev => prev + 1);
        setSplashingOption(null);
      }, 200);
    } else {
      setTimeout(() => {
        setSplashingOption(null);
      }, 200);
    }"""
content = re.sub(auto_advance_pattern, new_auto_advance, content)

# update UI logic
# {currentQuestionIdx === 21 ? 'Final Strategic Question (Not Scored)' : `Question ${currentQuestionIdx + 1} of 21`}
content = content.replace("currentQuestionIdx === 21 ? 'Final Strategic Question (Not Scored)' : `Question ${currentQuestionIdx + 1} of 21`", 
                          "currentQuestionIdx >= 21 ? 'Unscored AI Personalization' : `Question ${currentQuestionIdx + 1} of 21`")

# {currentQuestionIdx === 21 ? 'Strategic Confidence' : pillars[activePillarIdx]}
content = content.replace("currentQuestionIdx === 21 ? 'Strategic Confidence' : pillars[activePillarIdx]", 
                          "currentQuestionIdx === 21 ? 'Biggest Challenges' : currentQuestionIdx === 22 ? 'Immediate Priority' : currentQuestionIdx === 23 ? 'Growth Opportunity' : pillars[activePillarIdx]")

with open('src/AssessmentEngine.tsx', 'w') as f:
    f.write(content)

