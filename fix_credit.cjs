const fs = require('fs');

let content = fs.readFileSync('src/components/ui/CreatorCredit.tsx', 'utf8');

// Replace the button wrapper
content = content.replace(
  /<div className="relative pointer-events-auto">[\s\S]*?<\/button>\s*<\/div>/,
  `<div className="relative pointer-events-auto flex justify-end">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center space-x-2 mt-4 px-4 py-2 bg-[#0a0806]/80 border border-white/10 hover:border-amber-500/50 rounded-sm backdrop-blur-md transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/10 to-amber-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          <span className="text-amber-500/60 group-hover:text-amber-400 text-xs transition-colors animate-pulse relative z-10">
            ✦
          </span>
          <span 
            className="text-[15px] md:text-[17px] text-[#e4dbcb] group-hover:text-amber-400 tracking-wider transition-colors drop-shadow-md relative z-10"
            style={{ fontFamily: '"Yatra One", system-ui' }}
          >
            ड्राइवर कौन है?
          </span>
        </button>
      </div>`
);

// Replace the title inside the modal to match
content = content.replace(
  /<span className="text-\[10px\] md:text-xs uppercase tracking-\[0.3em\] text-amber-500\/80 mb-2 block">WHO'S DRIVING\?<\/span>/,
  `<span className="text-xl md:text-2xl text-amber-500/90 block drop-shadow-md" style={{ fontFamily: '"Yatra One", system-ui' }}>ड्राइवर कौन है?</span>
              <span className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-white/40 mb-3 block mt-1">WHO'S DRIVING?</span>`
);

fs.writeFileSync('src/components/ui/CreatorCredit.tsx', content);
