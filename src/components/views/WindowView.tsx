import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useJourney } from '../../store/JourneyContext';
import { BusChassis } from '../effects/BusChassis';
import { CanvasRainLayer } from '../effects/CanvasRainLayer';

export function WindowView() {
  const { isRainy } = useJourney();
  const [isPhoneOpen, setIsPhoneOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsPhoneOpen(false);
    };
    if (isPhoneOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPhoneOpen]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="absolute inset-0 w-full h-full bg-[#050505] overflow-hidden"
    >
      <BusChassis>
        {/* Base Window Image with Parallax Zoom */}
        <motion.div 
          animate={{ scale: [1.05, 1.15, 1.05], x: ['0%', '-2%', '0%'] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 bg-cover bg-center opacity-100 origin-center"
          style={{ backgroundImage: "url('/window-seat.png')" }}
        />
        
        {/* Rain Layer masked to window and synced with Parallax Zoom */}
        <motion.div 
          animate={{ scale: [1.05, 1.15, 1.05], x: ['0%', '-2%', '0%'] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 pointer-events-none mix-blend-screen opacity-100 origin-center"
          style={{ 
            maskImage: 'radial-gradient(ellipse at 45% 45%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 90%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 45% 45%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 90%)'
          }}
        >
          {isRainy && <CanvasRainLayer />}
        </motion.div>

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_20%,_rgba(0,0,0,0.8)_100%)] pointer-events-none" />

        {/* Phone Hotspot (Left Side) */}
        <button
          aria-label="Open phone"
          onClick={() => setIsPhoneOpen(true)}
          className="absolute bottom-[5%] left-[2%] w-[40%] h-[40%] z-20 cursor-pointer bg-white/0 hover:bg-white/5 active:bg-white/10 transition-colors rounded-3xl md:bottom-[10%] md:left-[5%] md:w-[30%] md:h-[35%]"
        />

        {/* Phone UI Overlay */}
        <AnimatePresence>
          {isPhoneOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
              onClick={() => setIsPhoneOpen(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.3, delay: 0.05 }}
                onClick={(e) => e.stopPropagation()}
                className="w-[260px] h-[480px] bg-[#1a1a1a] rounded-[35px] border-[4px] border-[#0a0a0a] shadow-2xl relative overflow-hidden flex flex-col pb-6"
              >
                 {/* Top Speaker Slit */}
                 <div className="w-12 h-1.5 bg-black rounded-full mx-auto mt-4 mb-2 opacity-80" />

                 {/* Screen Content - Nostalgic Dark/Green Display */}
                 <div className="flex-1 bg-[#0a1a0a] mx-3 mt-1 mb-2 rounded-xl border-[4px] border-black p-4 flex flex-col font-mono text-[#4ade80] relative overflow-hidden shadow-inner">
                    {/* Status Bar */}
                    <div className="flex justify-between items-center text-[9px] opacity-80 mb-8 border-b border-[#4ade80]/20 pb-1">
                      <span>▰▰▰▰ Jio</span>
                      <span>01:17</span>
                      <span>52% 🔋</span>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 flex flex-col items-center justify-center text-center -mt-6">
                      <div className="space-y-1 mb-6">
                        <p className="text-[10px] tracking-widest opacity-60">MISSED CALL</p>
                        <p className="text-2xl font-bold text-[#4ade80]">Maa</p>
                        <p className="text-[10px] opacity-60">12:48 AM</p>
                      </div>

                      <div className="px-3 py-3 w-full border border-[#4ade80]/30 border-dashed">
                        <p className="text-xs leading-relaxed italic opacity-90 text-[#4ade80]">
                          "Pahunch ke call<br/>kar dena."
                        </p>
                      </div>
                    </div>
                 </div>

                 {/* Physical-looking Lock Button representing keypad area */}
                 <div className="px-4 mt-auto">
                    <button
                      onClick={() => setIsPhoneOpen(false)}
                      className="w-full py-3 bg-[#222] hover:bg-[#333] active:bg-[#111] text-white/50 hover:text-white/80 text-[10px] tracking-widest uppercase rounded-lg transition-colors border-b-2 border-black font-bold shadow-sm"
                    >
                      LOCK PHONE
                    </button>
                 </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </BusChassis>
    </motion.div>
  );
}
