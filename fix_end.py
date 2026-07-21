import re

with open('src/components/DashboardReport.tsx', 'r') as f:
    content = f.read()

# Let's find exactly where we added PrintDossier and fix the tags
# The original end was:
#        </div>
#      </div>
#    </div>
#  );
#}

# Our replacement is at the bottom:
#        </div>
#      </div>
#      <PrintDossier ... />
#    </div>
#  );
#}
# But since we replaced `  return (\n    <div className="w-full min-h-screen bg-[#F8FAFC] text-slate-900 font-sans grid grid-cols-1 xl:grid-cols-12 gap-6 p-4 md:p-6 items-stretch">` with `<div className="relative w-full">\n      <div className="print:hidden">\n        <div className="w-full min-h-screen bg-[#F8FAFC] text-slate-900 font-sans grid grid-cols-1 xl:grid-cols-12 gap-6 p-4 md:p-6 items-stretch">`

# It means we added two opening divs: `<div className="relative w-full">` and `<div className="print:hidden">`.
# So we just need to append the closing tags.

# I will just write a clean end replacement.
# Let's remove the corrupted end and replace it properly.
pattern = r'(\s*)</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*<PrintDossier.*'
# actually let's just find the last `</p>\n                </div>\n             </div>\n          )}\n          </div>\n        </div>\n      </div>\n    </div>`

content = content.split('<PrintDossier')[0]

# Now we need to remove the trailing `); }` and `</div>`s to rebuild it.
# Instead of guessing, I'll just find `Confidentiality Commitment` which is near the end.
end_pattern = r'Confidentiality Commitment</h4>\s*<p className="text-xs text-slate-500 leading-relaxed">\s*Every engagement is protected by a professional Non-Disclosure Agreement \(NDA\)\. All business information, financial data, and strategic discussions remain strictly confidential\.\s*</p>\s*</div>\s*</div>\s*\)\}\s*</div>\s*</div>\s*</div>\s*</div>'

match = re.search(end_pattern, content)
if match:
    proper_end = match.group(0) + """
      </div>
      <PrintDossier 
        formData={formData} 
        scores={scores} 
        globalScore={globalScore} 
        pillars={pillars} 
        getPillarScore={getPillarScore} 
        getScoreColor={getScoreColor} 
        getScoreStatus={getScoreStatus} 
        getScoreRating={getScoreRating} 
        getLowestPillar={getLowestPillar} 
        assessmentDate={assessmentDate} 
        reportId={reportId} 
      />
    </div>
  );
}
"""
    content = content[:match.start()] + proper_end
    
    with open('src/components/DashboardReport.tsx', 'w') as f:
        f.write(content)
    print("Fixed end!")
else:
    print("Could not find end pattern")

