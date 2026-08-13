import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useJourney } from '../../store/JourneyContext';
import { BusChassis } from '../effects/BusChassis';

const hornSounds = [
  "/audio/horn-01.mp3",
  "/audio/horn-02.mp3",
  "/audio/horn-03.mp3"
];

export function DriverView() {
  const { hornActive, triggerHorn } = useJourney();
  const lastHornIndex = useRef<number>(-1);

  const handleHornClick = () => {
    triggerHorn();
    
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * hornSounds.length);
    } while (nextIndex === lastHornIndex.current && hornSounds.length > 1);
    
    lastHornIndex.current = nextIndex;
    const sound = hornSounds[nextIndex];
    
    const audio = new Audio(sound);
    audio.play().catch(e => console.log('Horn audio placeholder:', sound));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Do not trigger if typing in an input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        return;
      }
      if (e.key.toLowerCase() === 'h') {
        handleHornClick();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="absolute inset-0 w-full h-full bg-[#050505] overflow-hidden"
    >
      <BusChassis>
        {/* Base Driver Image with Parallax Zoom */}
        <motion.div 
          animate={{ scale: [1.05, 1.12, 1.05] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 bg-cover bg-center opacity-100 origin-center"
          style={{ backgroundImage: "url('/driver-seat.png')" }}
        />
        
        {/* Interactive Horn Button */}
        <div className="absolute bottom-[max(20%,140px)] left-[5%] md:left-[10%] z-20 pointer-events-auto">
          <button 
            onClick={handleHornClick}
            aria-label="Horn OK Please"
            className={`relative group transition-transform duration-100 ${
              hornActive ? 'scale-95' : 'hover:scale-105'
            }`}
          >
            <div className={`relative px-4 py-3 bg-[#1a1714] border-[2px] border-[#3a2e22] flex flex-col items-center justify-center rounded-sm shadow-[0_8px_16px_rgba(0,0,0,0.6)] ${
              hornActive ? 'bg-[#221c17]' : ''
            }`}>
              {/* Screws */}
              <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-black/60 shadow-[0_1px_0_rgba(255,255,255,0.1)]" />
              <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-black/60 shadow-[0_1px_0_rgba(255,255,255,0.1)]" />
              <div className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-black/60 shadow-[0_1px_0_rgba(255,255,255,0.1)]" />
              <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-black/60 shadow-[0_1px_0_rgba(255,255,255,0.1)]" />
              
              {/* Retro Box/Text */}
              <div className="border border-dashed border-[#ffb300]/30 px-3 py-2 flex flex-col items-center">
                <span className={`font-mono text-[10px] md:text-xs font-bold tracking-[0.2em] transition-colors duration-100 ${
                  hornActive ? 'text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]' : 'text-[#ffb300]'
                }`}>
                  HORN OK PLEASE
                </span>
                <span className={`mt-2 text-sm md:text-base transition-all duration-100 ${
                  hornActive ? 'opacity-100 scale-125' : 'opacity-40 grayscale'
                }`}>
                  🔊
                </span>
              </div>
            </div>
          </button>
        </div>

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_30%,_rgba(0,0,0,0.9)_100%)] pointer-events-none" />
      </BusChassis>
    </motion.div>
  );
}
