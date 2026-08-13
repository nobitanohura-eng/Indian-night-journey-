const fs = require('fs');

let content = fs.readFileSync('src/components/ui/HUD.tsx', 'utf8');

// Add imports
content = content.replace(
  "import { ViewMode } from '../../types';",
  "import { ViewMode } from '../../types';\nimport { ActiveTravelers } from './ActiveTravelers';\nimport { MusicPlayer } from '../MusicPlayer';"
);

// We want to rewrite the entire return statement.
const newReturn = `
  return (
    <div className="absolute inset-0 z-40 pointer-events-none flex flex-col justify-between pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] px-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))]">
      
      {/* TOP REGION */}
      <div className="flex justify-between items-start w-full p-4 md:p-6 pointer-events-none shrink-0 relative">
        
        {/* Top Left: Route Info & Weather */}
        <div className="flex flex-col gap-4 pointer-events-auto">
          {/* Route header */}
          <div className="flex flex-col">
            <span 
              role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter") { setChaiBreakTriggered(true); setIsChaiBreak(true); } }} onClick={() => { setChaiBreakTriggered(true); setIsChaiBreak(true); }}
              className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-amber-500/80 mb-1 drop-shadow-md cursor-pointer"
              title="Test Trigger Chai Break"
            >
              NIGHT ROUTE
            </span>
            <span className="text-sm md:text-lg font-bold tracking-widest text-white/90 uppercase drop-shadow-md" style={{ fontFamily: '"Eczar", serif' }}>
              {ticket.route.from} &rarr; {ticket.route.to}
            </span>
            <span className="text-[8px] md:text-[10px] tracking-[0.2em] uppercase text-white/50 mt-1 drop-shadow-md">
              {ticket.type || 'NIGHT SERVICE'}
            </span>
          </div>
          
          {/* Weather & Info Controls */}
          <div className="flex items-center gap-2">
            <button 
              aria-label="Toggle Route Info"
              onClick={() => setShowRouteInfo(!showRouteInfo)} 
              className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10"
            >
              <Info className="w-3 h-3" />
              <span className="hidden md:inline">ROUTE INFO</span>
            </button>
            
            {view === 'WINDOW' && (
              <>
                <button
                  aria-label="Disable Rain"
                  onClick={() => setIsRainy(false)}
                  className={\`p-1.5 md:p-2 rounded-full transition-all \${!isRainy ? 'bg-amber-500/20 text-amber-500 border border-amber-500/50 backdrop-blur-sm' : 'bg-black/40 text-white/40 border border-white/10 hover:bg-white/10 backdrop-blur-sm'}\`}
                >
                  <Moon className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                <button
                  aria-label="Enable Rain"
                  onClick={() => setIsRainy(true)}
                  className={\`p-1.5 md:p-2 rounded-full transition-all \${isRainy ? 'bg-amber-500/20 text-amber-500 border border-amber-500/50 backdrop-blur-sm' : 'bg-black/40 text-white/40 border border-white/10 hover:bg-white/10 backdrop-blur-sm'}\`}
                >
                  <CloudRain className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                <button
                  aria-label="Toggle Curtains"
                  onClick={() => console.log('Curtain placeholder')}
                  className="p-1.5 md:p-2 rounded-full transition-all bg-black/40 text-white/40 border border-white/10 hover:bg-white/10 backdrop-blur-sm"
                >
                  <Blinds className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </>
            )}
          </div>

          {/* Route Info Dropdown */}
          <AnimatePresence>
            {showRouteInfo && (
              <motion.div 
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-black/80 backdrop-blur-xl border border-white/10 p-4 md:p-5 rounded-lg w-56 md:w-64 shadow-2xl mt-1 absolute top-[110px]"
              >
                <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-left">
                  <div>
                    <span className="text-[8px] uppercase tracking-widest text-amber-500/80 block mb-1">FROM</span>
                    <span className="text-[10px] md:text-xs font-bold tracking-wider text-white/90">{ticket.route.from}</span>
                  </div>
                  <div>
                    <span className="text-[8px] uppercase tracking-widest text-amber-500/80 block mb-1">TO</span>
                    <span className="text-[10px] md:text-xs font-bold tracking-wider text-white/90">{ticket.route.to}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[8px] uppercase tracking-widest text-amber-500/80 block mb-1">ROUTE</span>
                    <span className="text-[10px] md:text-xs font-medium tracking-wider text-white/80">{ticket.route.highway || 'NH-19 EXPRESS'}</span>
                  </div>
                  <div>
                    <span className="text-[8px] uppercase tracking-widest text-amber-500/80 block mb-1">DEPARTURE</span>
                    <span className="text-[10px] md:text-xs font-mono text-white/80">{ticket.boardingTime}</span>
                  </div>
                  <div>
                    <span className="text-[8px] uppercase tracking-widest text-amber-500/80 block mb-1">EST. ARRIVAL</span>
                    <span className="text-[10px] md:text-xs font-mono text-white/80">03:10 AM</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[8px] uppercase tracking-widest text-amber-500/80 block mb-1">NEXT STOP</span>
                    <span className="text-[10px] md:text-xs font-medium tracking-wider text-white/80">{ticket.route.nextStop}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Top Right: Time & Travelers */}
        <div className="flex flex-col items-end gap-2 pointer-events-auto">
          <div className="flex flex-col items-end">
            <span className="text-sm md:text-lg font-mono font-medium text-white/90 tracking-wider drop-shadow-md">
              {timeString}
            </span>
            <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/50 mt-1 drop-shadow-md">
              {isRainy ? 'RAINING' : 'CLEAR NIGHT'}
            </span>
          </div>
          
          <ActiveTravelers />

          <div className="mt-2 text-right">
            <span className="text-[8px] uppercase tracking-[0.3em] text-amber-500/80 block drop-shadow-md">NEXT STOP</span>
            <span className="text-[10px] md:text-sm font-bold tracking-widest uppercase text-white/90 drop-shadow-md">{ticket.route.nextStop}</span>
            <span className="text-[8px] md:text-[10px] font-mono text-white/50 block mt-0.5 drop-shadow-md">03:10 AM</span>
          </div>
        </div>
      </div>

      {/* MIDDLE REGION: Central Chai Break Popup & Progress */}
      <div className="flex-1 flex flex-col justify-center items-center pointer-events-none relative w-full shrink p-4 min-h-[100px]">
        {/* Chai Break Alert */}
        <AnimatePresence>
          {chaiBreakTriggered && !isChaiBreak && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              className="pointer-events-none z-50 absolute top-0"
            >
              <div className="bg-[#110a05]/90 border border-amber-500/30 px-4 md:px-6 py-3 md:py-4 rounded-lg shadow-2xl backdrop-blur-md flex flex-col items-center">
                <span className="text-lg md:text-xl mb-1">☕</span>
                <span className="text-amber-500 font-bold uppercase tracking-widest text-[10px] md:text-sm" style={{ fontFamily: '"Eczar", serif' }}>CHAI BREAK</span>
                <span className="text-white/80 font-mono text-[8px] md:text-[10px] tracking-[0.2em] uppercase mt-1">10 MINUTE HALT</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Journey Progress */}
        <div className="flex flex-col items-center pointer-events-none w-full max-w-[300px] mt-auto">
          <div className="flex items-center space-x-2 md:space-x-3 w-full text-[8px] md:text-[10px] font-mono text-white/50 drop-shadow-md">
            <span className="uppercase">{ticket.route.from}</span>
            <div className="flex-1 h-[1px] bg-white/20 relative">
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)] transition-all duration-1000 ease-linear" 
                style={{ left: \`\${progress}%\` }} 
              />
            </div>
            <span className="uppercase">{ticket.route.to}</span>
          </div>
        </div>
      </div>

      {/* BOTTOM REGION: Music & View Switcher */}
      <div className="flex flex-col-reverse md:flex-row justify-between items-end w-full p-4 md:p-6 pointer-events-none gap-4 shrink-0">
        
        {/* Bottom Left: Music Player */}
        <div className="w-full md:w-auto flex justify-center md:justify-start pointer-events-auto z-50">
          <MusicPlayer />
        </div>

        {/* Bottom Right: View Switcher */}
        <div className="pointer-events-auto flex flex-row md:flex-col gap-2 bg-black/60 md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-2 md:p-0 rounded-full md:rounded-none border border-white/10 md:border-transparent w-full md:w-max z-50 justify-center">
          {[
            { id: 'WINDOW' as ViewMode, label: 'WINDOW SEAT' },
            { id: 'DRIVER' as ViewMode, label: 'DRIVER VIEW' },
            { id: 'LAST_SEAT' as ViewMode, label: 'LAST SEAT' }
          ].map(v => (
            <button
              key={v.id}
              aria-label={\`Switch to \${v.label}\`}
              aria-pressed={view === v.id}
              onClick={() => setView(v.id)}
              className={\`flex items-center justify-center space-x-2 md:space-x-3 transition-all min-h-[44px] min-w-[44px] px-4 md:px-0 md:justify-end group flex-1 md:flex-none rounded-full md:rounded-none \${view === v.id ? 'bg-white/10 md:bg-transparent' : ''}\`}
            >
              <span className={\`text-[12px] md:text-sm font-mono leading-none \${view === v.id ? 'text-amber-500 shadow-amber-500/50 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]' : 'text-white/40 group-hover:text-white/80'}\`}>
                {view === v.id ? '●' : '○'}
              </span>
              <span className={\`text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium hidden md:block \${view === v.id ? 'text-amber-500' : 'text-white/40 group-hover:text-white/80'}\`}>
                {v.label}
              </span>
              {/* Mobile Text */}
              <span className={\`text-[9px] uppercase tracking-[0.2em] font-medium md:hidden \${view === v.id ? 'text-amber-500' : 'text-white/40'}\`}>
                {v.label.split(' ')[0]} 
              </span>
            </button>
          ))}
        </div>

      </div>

      {/* NOSTALGIC MICRO DETAILS - Hidden on Mobile */}
      <div className="absolute top-1/3 left-4 md:left-6 -translate-y-1/2 -rotate-90 origin-left opacity-30 pointer-events-none hidden md:block mix-blend-overlay">
        <span className="text-[10px] uppercase tracking-[0.4em] font-mono whitespace-nowrap">PLEASE KEEP THE AISLE CLEAR</span>
      </div>
      
      {view === 'WINDOW' && (
        <div className="absolute bottom-32 left-4 md:left-8 opacity-40 pointer-events-none mix-blend-overlay hidden md:block">
          <span className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-mono drop-shadow-md">KRIPYA KHIDKI SE BAHAR NA JHUKEIN</span>
        </div>
      )}

      {view === 'DRIVER' && (
        <div className="absolute top-24 right-4 md:right-8 opacity-40 pointer-events-auto mix-blend-overlay text-right cursor-pointer hidden md:block" role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter") { setChaiBreakTriggered(true); setIsChaiBreak(true); } }} onClick={() => { setChaiBreakTriggered(true); setIsChaiBreak(true); }}>
          <span className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-mono drop-shadow-md">NEXT STOP:<br/>CHAI BREAK</span>
        </div>
      )}

      <div className="absolute bottom-32 right-4 md:right-8 opacity-30 pointer-events-none mix-blend-overlay text-right hidden md:block">
        <span className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-mono block drop-shadow-md">SAFAR MANGALMAY HO</span>
        <span className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-mono block mt-1 drop-shadow-md">APNA SAAMAN SAMBHAL KAR RAKHEIN</span>
      </div>

    </div>
  );
`;

const splitContent = content.split('  return (');
if (splitContent.length > 1) {
  content = splitContent[0] + newReturn;
}

fs.writeFileSync('src/components/ui/HUD.tsx', content);
