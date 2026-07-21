import re

with open('src/AssessmentEngine.tsx', 'r') as f:
    content = f.read()

content = content.replace("Math.min(21, currentQuestionIdx)", "answers.filter(a => a !== 0).length")
content = content.replace("Math.max(1, Math.ceil((22 - currentQuestionIdx) / 3))", "Math.max(1, Math.ceil((21 - answers.filter(a => a !== 0).length) / 3))")
content = content.replace("(currentQuestionIdx / 21) * 100", "(answers.filter(a => a !== 0).length / 21) * 100")

with open('src/AssessmentEngine.tsx', 'w') as f:
    f.write(content)
