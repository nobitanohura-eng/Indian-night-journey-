import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BusChassis } from '../effects/BusChassis';

export function LastSeatView() {
  const [showLabel, setShowLabel] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLabel(false), 4000);
    return () => clearTimeout(timer);
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
        {/* Base Last Seat Image with subtle sway */}
        <motion.div 
          animate={{ scale: [1.02, 1.05, 1.02], y: ['0%', '1%', '0%'] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 bg-cover bg-center opacity-100 origin-center"
          style={{ backgroundImage: "url('/last-seat.png')" }}
        />
        
        {/* Contextual Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
          <AnimatePresence>
            {showLabel && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 1 }}
                className="text-center mix-blend-overlay opacity-60"
              >
                <p className="text-amber-500 text-xs md:text-sm tracking-[0.4em] uppercase mb-2">LAST SEAT</p>
                <p className="text-white/80 text-lg md:text-xl tracking-wider" style={{ fontFamily: '"Yatra One", system-ui' }}>
                  बस के सबसे पीछे वाली सीट।
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_40%,_rgba(0,0,0,0.9)_100%)] pointer-events-none" />
      </BusChassis>
    </motion.div>
  );
}
