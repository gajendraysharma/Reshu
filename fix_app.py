import re

with open("src/App.tsx", "r") as f:
    content = f.read()

# Replace AssessmentEngine import if it exists, or add it
if "import AssessmentEngine from './AssessmentEngine';" not in content:
    content = content.replace("import React", "import AssessmentEngine from './AssessmentEngine';\nimport React")

# Change state variable
content = content.replace("const [showAssessment, setShowAssessment] = useState(false);", "const [activeAppView, setActiveAppView] = useState<'LANDING' | 'ASSESSMENT_PORTAL'>('LANDING');")

# Remove broken return from useEffect
content = content.replace("if (showAssessment) return <AssessmentEngine />;", "")

# Replace all showAssessment setters
content = content.replace("setShowAssessment(true)", "{ e.preventDefault(); setActiveAppView('ASSESSMENT_PORTAL'); window.scrollTo(0, 0); }")

# To fix cases where it's wrapped in `onClick={() => setShowAssessment(true)}` to `onClick={(e) => { e.preventDefault(); setActiveAppView('ASSESSMENT_PORTAL'); window.scrollTo(0, 0); }}`
content = content.replace("onClick={() => { e.preventDefault(); setActiveAppView('ASSESSMENT_PORTAL'); window.scrollTo(0, 0); }}", "onClick={(e) => { e.preventDefault(); setActiveAppView('ASSESSMENT_PORTAL'); window.scrollTo(0, 0); }}")

# Ensure the App return is properly wrapped
return_match = re.search(r"return \(\s*<div className=\"min-h-screen", content)
if return_match:
    # We will replace the return block wrapper
    content = re.sub(
        r"return \(\s*<div className=\"min-h-screen bg-white font-sans antialiased overflow-x-hidden\">\s*\{\/\* 3D Volumetric Navigation Bar Container - Full Width \*\/\}\s*<div className=\"w-full relative z-50\">",
        """return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased">
      {/* Always render the global Navbar at the top */}
      <div className="w-full relative z-50">""",
        content
    )

with open("src/App.tsx", "w") as f:
    f.write(content)
