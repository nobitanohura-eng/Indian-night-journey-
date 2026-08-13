import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useJourney } from '../../store/JourneyContext';

export function BoardingTransition() {
  const { setAppState } = useJourney();

  useEffect(() => {
    const timer = setTimeout(() => {
      setAppState('JOURNEY');
    }, 2500);
    return () => clearTimeout(timer);
  }, [setAppState]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-50 bg-[#020202] flex flex-col items-center justify-center p-6 text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <h1 className="text-4xl md:text-6xl text-[#e4dbcb] tracking-[0.2em] mb-2 font-bold uppercase" style={{ fontFamily: '"Eczar", serif' }}>
          WELCOME
          <br />
          ABOARD
        </h1>
        <p className="text-amber-500/70 text-xs md:text-sm tracking-[0.4em] uppercase mb-8">
          DELUXE NIGHT BUS
        </p>
        <p className="text-white/40 text-lg tracking-wider" style={{ fontFamily: '"Yatra One", system-ui' }}>
          सीट संभाल लीजिए... सफ़र शुरू हो चुका है।
        </p>
      </motion.div>
    </motion.div>
  );
}
