import re

with open('src/AssessmentEngine.tsx', 'r') as f:
    content = f.read()

toggle_logic = """  const handleChallengeToggle = (challenge: string) => {
    setFormData(prev => {
      const current = prev.challenges;
      if (current.includes(challenge)) {
        return { ...prev, challenges: current.filter(c => c !== challenge) };
      }
      if (current.length < 3) {
        return { ...prev, challenges: [...current, challenge] };
      }
      return prev;
    });
  };
"""

content = content.replace("const handleScoreSelect = (value: number) => {", toggle_logic + "\n  const handleScoreSelect = (value: number) => {")

with open('src/AssessmentEngine.tsx', 'w') as f:
    f.write(content)

