import re

with open('src/AssessmentEngine.tsx', 'r') as f:
    content = f.read()

polygon_block = r'<polygon\s*points=\{\[0, 1, 2, 3, 4, 5, 6\]\.map.*?className="transition-all duration-1000 ease-in-out"\s*\/>\s*\{\/\* Inner glowing points \*\/\}\s*\{\[0, 1, 2, 3, 4, 5, 6\]\.map.*?\}\);'

new_polygon_block = r'''{answers.filter(a => a !== 0).length === 21 && (
                  <>
                    <polygon 
                      points={[0, 1, 2, 3, 4, 5, 6].map(i => {
                        const angle = (i * 360) / 7;
                        const r = (getPillarScore(i) / 100) * 40;
                        const x = 50 + r * Math.cos((angle * Math.PI) / 180);
                        const y = 50 + r * Math.sin((angle * Math.PI) / 180);
                        return `${x},${y}`;
                      }).join(' ')}
                      fill="rgba(212, 175, 55, 0.25)" 
                      stroke="#d4af37" 
                      strokeWidth="1.5"
                      className="transition-all duration-1000 ease-in-out"
                    />
                    
                    {/* Inner glowing points */}
                    {[0, 1, 2, 3, 4, 5, 6].map(i => {
                        const angle = (i * 360) / 7;
                        const r = (getPillarScore(i) / 100) * 40;
                        const x = 50 + r * Math.cos((angle * Math.PI) / 180);
                        const y = 50 + r * Math.sin((angle * Math.PI) / 180);
                        return <circle key={i} cx={x} cy={y} r="1.5" fill="#fff" className="transition-all duration-1000 ease-in-out" style={{ filter: 'drop-shadow(0px 0px 3px #d4af37)'}} />;
                      })}
                  </>
                )}'''

content = re.sub(polygon_block, new_polygon_block, content, flags=re.DOTALL)

with open('src/AssessmentEngine.tsx', 'w') as f:
    f.write(content)
