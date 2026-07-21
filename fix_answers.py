import re

with open('src/AssessmentEngine.tsx', 'r') as f:
    content = f.read()

content = content.replace("const [scores, setScores] = useState<number[]>(new Array(21).fill(0));", "const [answers, setAnswers] = useState<number[]>(new Array(21).fill(0));")
content = content.replace("setScores(updated);", "setAnswers(updated);")
content = content.replace("scores={scores}", "scores={answers}")
content = content.replace("scores[currentQuestionIdx]", "answers[currentQuestionIdx]")
content = content.replace("const answered = scores.slice(start, start + 3)", "const answered = answers.slice(start, start + 3)")
content = content.replace("const answered = scores.slice(startIdx, startIdx + 3)", "const answered = answers.slice(startIdx, startIdx + 3)")
content = content.replace("if (!scores || scores.length === 0)", "if (!answers || answers.length === 0)")

with open('src/AssessmentEngine.tsx', 'w') as f:
    f.write(content)

