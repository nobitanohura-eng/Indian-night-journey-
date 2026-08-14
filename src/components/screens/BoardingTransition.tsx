import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useJourney } from '../../store/JourneyContext';

export function BoardingTransition() {
  const { setAppState } = useJourney();

  useEffect(() => {
    const timer = setTimeout(() => {
      setAppState('JOURNEY');
    }, 1200);
    return () => clearTimeout(timer);
  }, [setAppState]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => setAppState('JOURNEY')}
      className="fixed inset-0 z-50 bg-[#020202] flex flex-col items-center justify-center p-6 text-center cursor-pointer"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-[#e4dbcb] tracking-[0.2em] mb-2 font-bold uppercase" style={{ fontFamily: '"Eczar", serif' }}>
          WELCOME ABOARD
        </h1>
        <p className="text-amber-500/80 text-xs sm:text-sm tracking-[0.3em] uppercase mb-4 font-mono">
          DELUXE NIGHT BUS
        </p>
        <p className="text-white/50 text-base sm:text-lg tracking-wider" style={{ fontFamily: '"Yatra One", system-ui' }}>
          सीट संभाल लीजिए... सफ़र शुरू हो चुका है।
        </p>
      </motion.div>
    </motion.div>
  );
}
