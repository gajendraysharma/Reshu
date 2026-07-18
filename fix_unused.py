import re
with open("src/AssessmentEngine.tsx", "r") as f:
    content = f.read()

content = content.replace("const [formData, setFormData] = useState({", "// const [formData, setFormData] = useState({")
with open("src/AssessmentEngine.tsx", "w") as f:
    f.write(content)
