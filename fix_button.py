import re

with open("src/AssessmentEngine.tsx", "r") as f:
    content = f.read()

# Replace form tag with div
content = re.sub(
    r'<form className="space-y-6" onSubmit=\{.*?\}>(.*?)</form>',
    r'<div className="space-y-6">\1</div>',
    content,
    flags=re.DOTALL
)

# Find the button and replace type="submit" with an onClick
button_match = r'<button \s*type="submit"\s*className="([^"]+)">\s*Start Assessment Matrix →\s*</button>'
button_replace = r'''<button 
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log("Forcing transition to ASSESSMENT state...");
                    setView('ASSESSMENT');
                    window.scrollTo(0, 0);
                  }}
                  className="\1"
                >
                  Start Assessment Matrix →
                </button>'''

content = re.sub(button_match, button_replace, content, flags=re.DOTALL)

with open("src/AssessmentEngine.tsx", "w") as f:
    f.write(content)
