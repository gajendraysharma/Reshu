import re

with open('src/AssessmentEngine.tsx', 'r') as f:
    content = f.read()

content = content.replace("currentQuestionIdx < 21 ? '--' : `${getGlobalScore()}%`", "answers.filter(a => a !== 0).length === 21 ? `${getGlobalScore()}%` : '--'")

with open('src/AssessmentEngine.tsx', 'w') as f:
    f.write(content)
