import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail } from 'lucide-react';

export function CreatorCredit() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="relative pointer-events-auto flex justify-end">
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
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] pointer-events-none">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-[#0a0806]/95 backdrop-blur-xl border border-amber-500/30 p-6 md:p-8 rounded-lg shadow-2xl relative max-w-[320px] w-full text-center pointer-events-auto overflow-y-auto max-h-full no-scrollbar"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              
              <span className="text-xl md:text-2xl text-amber-500/90 block drop-shadow-md" style={{ fontFamily: '"Yatra One", system-ui' }}>ड्राइवर कौन है?</span>
              <span className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-white/40 mb-3 block mt-1">WHO'S DRIVING?</span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-widest text-white/90 uppercase mb-3 mt-2" style={{ fontFamily: '"Eczar", serif' }}>
                AVINASH
              </h2>
              
              <div className="w-12 h-[1px] bg-white/20 mb-4 mx-auto" />
              
              <span className="text-[10px] md:text-xs tracking-widest text-white/70 uppercase mb-6 block">
                CREATOR OF THIS EXPERIENCE
              </span>
              
              <p className="text-xs md:text-sm italic text-white/50 mb-8 font-serif px-2">
                "Built with memories, music & late nights."
              </p>
              
              <div className="flex flex-col items-center gap-1 mb-6">
                <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-white/40">INDIAN NIGHT JOURNEY • 2026</span>
              </div>
              
              <div className="w-full bg-white/5 p-4 rounded border border-white/10">
                <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-white/40 block mb-2">CONTACT</span>
                <a 
                  href="mailto:avinashkr502080@gmail.com" 
                  className="flex items-center justify-center gap-2 text-[10px] md:text-xs tracking-wider text-amber-500 hover:text-amber-400 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span className="truncate">avinashkr502080@gmail.com</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
