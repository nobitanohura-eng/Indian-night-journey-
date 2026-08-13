/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { JourneyProvider, useJourney } from './store/JourneyContext';
import { SplashScreen } from './components/SplashScreen';
import { Smartphone } from 'lucide-react';
import { JourneySelection } from './components/screens/JourneySelection';
import { VirtualTicket } from './components/screens/VirtualTicket';
import { BoardingTransition } from './components/screens/BoardingTransition';
import { Layout } from './components/Layout';
import { AnimatePresence, motion } from 'motion/react';

function AppContent() {
  const { appState } = useJourney();

  return (
    <div className="w-full h-[100dvh] overflow-hidden bg-black text-white">
      <AnimatePresence mode="wait">
        {appState === 'SPLASH' && <SplashScreen key="splash" />}
        {appState === 'SELECTION' && <JourneySelection key="selection" />}
        {appState === 'TICKET' && <VirtualTicket key="ticket" />}
        {appState === 'BOARDING' && <BoardingTransition key="boarding" />}
        {appState === 'JOURNEY' && <Layout key="journey" />}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  const [showIntro, setShowIntro] = useState(
    typeof window !== 'undefined' && window.innerHeight > window.innerWidth
  );

  useEffect(() => {
    if (showIntro) {
      const timer = setTimeout(() => setShowIntro(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showIntro]);

  return (
    <JourneyProvider>
      <AnimatePresence>
        {showIntro && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#050505] text-white p-6 text-center"
          >
            <Smartphone className="w-16 h-16 text-amber-500 mb-6 rotate-90 animate-pulse" />
            <h2 className="text-2xl font-bold mb-3 tracking-wide" style={{ fontFamily: '"Tiro Devanagari Hindi", serif' }}>डिवाइस को घुमाएं</h2>
            <p className="text-white/60 uppercase tracking-widest text-sm max-w-xs leading-relaxed">
              बेहतरीन अनुभव के लिए कृपया अपने फोन को लैंडस्केप (Landscape) मोड में रखें।
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      <AppContent />
    </JourneyProvider>
  );
}
