import re

with open('src/AssessmentEngine.tsx', 'r') as f:
    content = f.read()

# 1. Fix scores initialization
scores_init = """  const [scores, setScores] = useState<number[]>(new Array(24).fill(0));"""
content = re.sub(r'const \[scores, setScores\] = useState<number\[\]>\(\(\) => \{.*?return new Array\(24\)\.fill\(0\);\s*\}\);', scores_init, content, flags=re.DOTALL)

# 2. Fix Score Matrix display
# Find {currentQuestionIdx === 0 ? '0%' : `${getGlobalScore()}%`}
content = content.replace("{currentQuestionIdx === 0 ? '0%' : `${getGlobalScore()}%`}", "{currentQuestionIdx < 21 ? 'Calculating...' : `${getGlobalScore()}%`}")

# 3. Update getGlobalScore to only count answered as 0 if not answered
# Actually, the user says "Adjust the calculation logic so that if a question hasn't been answered yet, it evaluates to 0 in your raw score calculations."
# Since it's already calculating with 0 for unanswered, we just use the Calculating... text.

with open('src/AssessmentEngine.tsx', 'w') as f:
    f.write(content)
