import re

with open('src/AssessmentEngine.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    """<div className="relative z-10 flex justify-between items-center pt-8 border-t border-slate-200/80 mt-8" style={{ transform: 'translateZ(10px)' }}>""",
    """</div>\n            <div className="relative z-10 flex justify-between items-center pt-8 border-t border-slate-200/80 mt-8" style={{ transform: 'translateZ(10px)' }}>"""
)

with open('src/AssessmentEngine.tsx', 'w') as f:
    f.write(content)

