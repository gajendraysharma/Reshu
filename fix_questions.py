import re

with open('src/AssessmentEngine.tsx', 'r') as f:
    content = f.read()

# Fix total questions to 22 in places where we divide by 21 (since we now have 22 questions)
# Actually, the user says "Total Questions: 21" + Final Strategic Question.
# So "Question {currentQuestionIdx + 1} of 21" should maybe say "of 22" or say "Final Question" for 22.
old_question_text = "Question {currentQuestionIdx + 1} of 21"
new_question_text = "{currentQuestionIdx === 21 ? 'Final Strategic Question' : `Question ${currentQuestionIdx + 1} of 21`}"
content = content.replace(old_question_text, new_question_text)

# Also fix the % DONE
old_done = "{Math.round(((currentQuestionIdx)/21)*100)}% DONE"
new_done = "{Math.round(((currentQuestionIdx)/21)*100)}% DONE"
# 21 is fine, if it's 21/21 it will be 100%. If it's 22 it will be >100. Let's fix that to Math.min(100, Math.round((currentQuestionIdx/21)*100))
content = content.replace(old_done, "{Math.min(100, Math.round(((currentQuestionIdx)/21)*100))}% DONE")

# Fix pillars[activePillarIdx] for final question, activePillarIdx will be 21/3 = 7. pillars[7] is undefined!
old_pillar_title = "{pillars[activePillarIdx]}"
new_pillar_title = "{currentQuestionIdx === 21 ? 'Strategic Confidence' : pillars[activePillarIdx]}"
content = content.replace(old_pillar_title, new_pillar_title)

# Update the options based on the question
old_options = """                  {[
                    { val: 1, label: 'Very Poor' },
                    { val: 2, label: 'Basic' },
                    { val: 3, label: 'Average' },
                    { val: 4, label: 'Good' },
                    { val: 5, label: 'Excellent' }
                  ].map(({ val, label }) => ("""

new_options = """                  {(currentQuestionIdx === 21 
                    ? [
                        { val: 1, label: 'Very Low' },
                        { val: 2, label: 'Low' },
                        { val: 3, label: 'Moderate' },
                        { val: 4, label: 'High' },
                        { val: 5, label: 'Very High' }
                      ]
                    : [
                        { val: 1, label: 'Critical' },
                        { val: 2, label: 'Basic' },
                        { val: 3, label: 'Developing' },
                        { val: 4, label: 'Mature' },
                        { val: 5, label: 'Best Practice' }
                      ]).map(({ val, label }) => ("""

content = content.replace(old_options, new_options)

# Update Next/Compile buttons condition
old_next_cond = "{currentQuestionIdx < 20 ?"
new_next_cond = "{currentQuestionIdx < 21 ?"
content = content.replace(old_next_cond, new_next_cond)

# Update the handleScoreSelect auto advance limit
old_handle_score = "if (currentQuestionIdx < 20) {"
new_handle_score = "if (currentQuestionIdx < 21) {"
content = content.replace(old_handle_score, new_handle_score)

# Update maturity level logic and use it. I will prepend the getMaturityLevel function.
maturity_func = """
  const getMaturityLevel = (score: number) => {
    if (score < 40) return "Critical";
    if (score < 60) return "Developing";
    if (score < 75) return "Stable";
    if (score < 90) return "Growing";
    return "High Performing";
  };
"""
content = content.replace("  const getGlobalScore = (): number => {", maturity_func + "  const getGlobalScore = (): number => {")

# Replace anywhere that hardcodes "Position Matrix: Developing Framework"
old_maturity_text = "Position Matrix: Developing Framework"
new_maturity_text = 'Position Matrix: {getMaturityLevel(getGlobalScore())} Framework'
content = content.replace(old_maturity_text, new_maturity_text)

# Also fix the right panel
old_right_completed = "{currentQuestionIdx} <span className=\"text-slate-600\">/ 21</span>"
new_right_completed = "{Math.min(21, currentQuestionIdx)} <span className=\"text-slate-600\">/ 21</span>"
content = content.replace(old_right_completed, new_right_completed)

# Update estimated time left
old_est_time = "{Math.max(1, Math.ceil((21 - currentQuestionIdx) / 3))} <span className=\"text-slate-600\">min</span>"
new_est_time = "{Math.max(1, Math.ceil((22 - currentQuestionIdx) / 3))} <span className=\"text-slate-600\">min</span>"
content = content.replace(old_est_time, new_est_time)

# And progress bar in right panel
old_right_prog = "{Math.round((currentQuestionIdx / 21) * 100)}%"
new_right_prog = "{Math.min(100, Math.round((currentQuestionIdx / 21) * 100))}%"
content = content.replace(old_right_prog, new_right_prog)

old_right_prog_bar = "width: `${(currentQuestionIdx / 21) * 100}%`"
new_right_prog_bar = "width: `${Math.min(100, (currentQuestionIdx / 21) * 100)}%`"
content = content.replace(old_right_prog_bar, new_right_prog_bar)

# Radar polygon loop needs to be safe if activePillarIdx == 21 (which gives pillar 7, out of bounds)
# The loop goes from 0 to 6. getPillarScore should just work if scores are filled.
# wait, getPillarScore works on 0 to 6.
# If currentQuestionIdx == 21, it might break if trying to display pillar 7. 
# But in Left Pillar Indicators, `if (activePillarIdx > idx) state = 'completed';`
# activePillarIdx will be 7 for idx 0 to 6, so all will be 'completed', which is perfect.

with open('src/AssessmentEngine.tsx', 'w') as f:
    f.write(content)
