import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Headphones } from 'lucide-react';
import { useJourney } from '../store/JourneyContext';

export function SplashScreen() {
  const [isLeaving, setIsLeaving] = useState(false);
  const { setAppState } = useJourney();

  const handleStart = () => {
    setIsLeaving(true);
    setTimeout(() => {
      setAppState('SELECTION');
    }, 1500); // 1.5s fade out
  };

  return (
    <AnimatePresence>
      {!isLeaving && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-[#050505] overflow-hidden flex flex-col items-center justify-center"
        >
          {/* Background image - using the user's uploaded image */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-100"
            style={{ backgroundImage: "url('/splash-bg.png')" }}
          />
          
          <div className="relative z-10 flex flex-col items-center justify-end h-full px-4 text-center pb-24">
              
              {/* Start Button */}
              <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              onClick={handleStart}
              className="mt-16 group relative px-8 py-4 rounded-full bg-black/60 border border-white/20 backdrop-blur-md hover:bg-black/80 hover:border-amber-500/50 transition-all duration-500 overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/10 to-amber-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <div className="flex items-center space-x-3 text-amber-500 group-hover:text-amber-400">
                <Headphones className="w-5 h-5 animate-pulse" />
                <span className="font-medium tracking-wide">हेडफोन लगाओ, सफर महसूस करो</span>
              </div>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
