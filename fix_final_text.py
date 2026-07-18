import re

with open('src/AssessmentEngine.tsx', 'r') as f:
    content = f.read()

# I want to specifically target the header rendering, just in case
old_text = "currentQuestionIdx === 21 ? 'Final Strategic Question (Not Scored)' : `Question ${currentQuestionIdx + 1} of 21`"
new_text = "currentQuestionIdx === 21 ? 'Final Strategic Question (Not Scored)' : `Question ${currentQuestionIdx + 1} of 21`"

# If I already replaced it globally with sed, it might be:
# "currentQuestionIdx === 21 ? 'Final Strategic Question (Not Scored) (Not Scored)'"
