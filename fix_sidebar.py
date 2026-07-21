import re

with open('src/components/DashboardReport.tsx', 'r') as f:
    content = f.read()

# Remove menuItems map
nav_block = r'<nav className="flex-1 py-6 px-4 space-y-1">\s*\{menuItems\.map\(\(item, idx\) => \(\s*<button.*?</button>\s*\)\)\}\s*</nav>'
new_nav = r'''<nav className="flex-1 py-6 px-4 space-y-1">
          <button 
            onClick={() => setActiveTab('OVERVIEW')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-xs font-bold transition-all duration-200 ${activeTab === 'OVERVIEW' ? 'bg-[#D4AF37] text-[#0B2545] shadow-[0_4px_12px_rgba(212,175,55,0.3)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <div className={activeTab === 'OVERVIEW' ? "text-[#0B2545]" : "text-slate-500"}><Globe className="w-4 h-4" /></div>
            Executive Overview™
          </button>
          <button 
            onClick={() => setActiveTab('HEALTH')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-xs font-bold transition-all duration-200 ${activeTab === 'HEALTH' ? 'bg-[#D4AF37] text-[#0B2545] shadow-[0_4px_12px_rgba(212,175,55,0.3)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <div className={activeTab === 'HEALTH' ? "text-[#0B2545]" : "text-slate-500"}><Activity className="w-4 h-4" /></div>
            Business Health Dashboard™
          </button>
          <button 
            onClick={() => setActiveTab('ADVISORY')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-xs font-bold transition-all duration-200 ${activeTab === 'ADVISORY' ? 'bg-[#D4AF37] text-[#0B2545] shadow-[0_4px_12px_rgba(212,175,55,0.3)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <div className={activeTab === 'ADVISORY' ? "text-[#0B2545]" : "text-slate-500"}><Cpu className="w-4 h-4" /></div>
            AI Growth Advisory™
          </button>
          <button 
            onClick={() => setActiveTab('PLAN')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-xs font-bold transition-all duration-200 ${activeTab === 'PLAN' ? 'bg-[#D4AF37] text-[#0B2545] shadow-[0_4px_12px_rgba(212,175,55,0.3)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <div className={activeTab === 'PLAN' ? "text-[#0B2545]" : "text-slate-500"}><Calendar className="w-4 h-4" /></div>
            Opportunities & 90-Day Plan™
          </button>
          <button 
            onClick={() => setActiveTab('NEXT_STEP')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-xs font-bold transition-all duration-200 ${activeTab === 'NEXT_STEP' ? 'bg-[#D4AF37] text-[#0B2545] shadow-[0_4px_12px_rgba(212,175,55,0.3)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <div className={activeTab === 'NEXT_STEP' ? "text-[#0B2545]" : "text-slate-500"}><Target className="w-4 h-4" /></div>
            Diagnostic Booking
          </button>
        </nav>'''

content = re.sub(nav_block, new_nav, content, flags=re.DOTALL)

# Also remove menuItems array definition
menu_items_block = r'\s*const menuItems = \[\s*\{ id: \'OVERVIEW\'.*?\{ id: \'PLAN\'.*?\];\s*'
content = re.sub(menu_items_block, '\n', content, flags=re.DOTALL)

# And remove it from mobile select
mobile_select_block = r'<select.*?>\s*\{menuItems\.map\(m => <option key=\{m\.id\} value=\{m\.id\} className="text-slate-900">\{m\.label\}</option>\)\}\s*</select>'
new_mobile_select = r'''<select 
                value={activeTab} 
                onChange={(e) => setActiveTab(e.target.value)}
                className="bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            >
                <option value="OVERVIEW" className="text-slate-900">Executive Overview™</option>
                <option value="HEALTH" className="text-slate-900">Business Health Dashboard™</option>
                <option value="ADVISORY" className="text-slate-900">AI Growth Advisory™</option>
                <option value="PLAN" className="text-slate-900">Opportunities & 90-Day Plan™</option>
                <option value="NEXT_STEP" className="text-slate-900">Diagnostic Booking</option>
            </select>'''

content = re.sub(mobile_select_block, new_mobile_select, content, flags=re.DOTALL)

# Remove the duplicated booking button from the bottom since we added it to nav
duplicate_button = r'<button onClick=\{\(\) => setActiveTab\(\'NEXT_STEP\'\)\} className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-\[\#D4AF37\] to-\[\#C59B27\] text-\[\#0B2545\] font-black text-xs uppercase tracking-wider rounded-xl hover:brightness-110 transition-all shadow-\[0_0_15px_rgba\(212,175,55,0\.4\)\]">\s*<Phone className="w-3\.5 h-3\.5" /> Book Diagnostic\s*</button>'
content = re.sub(duplicate_button, '', content, flags=re.DOTALL)

with open('src/components/DashboardReport.tsx', 'w') as f:
    f.write(content)
