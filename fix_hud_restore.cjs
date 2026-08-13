const fs = require('fs');

const hudTop = `import React, { useState, useEffect } from 'react';
import { useJourney } from '../../store/JourneyContext';
import { CloudRain, Moon, Blinds, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ViewMode } from '../../types';
import { ActiveTravelers } from './ActiveTravelers';
import { MusicPlayer } from '../MusicPlayer';

export function HUD() {
  const { ticket, view, setView, isRainy, setIsRainy, passengers, isChaiBreak, setIsChaiBreak } = useJourney();
  const [time, setTime] = useState('');
  const [progress, setProgress] = useState(15);
  const [showRouteInfo, setShowRouteInfo] = useState(false);
  const [chaiBreakTriggered, setChaiBreakTriggered] = useState(false);
  const [chaiBreakNotified, setChaiBreakNotified] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isChaiBreak) return;
    const progressInterval = setInterval(() => {
      setProgress(p => (p < 95 ? p + 0.5 : p));
    }, 10000);
    return () => clearInterval(progressInterval);
  }, [isChaiBreak]);

  useEffect(() => {
    if (chaiBreakTriggered || isChaiBreak) return;
    const triggerTimer = setTimeout(() => {
      setChaiBreakTriggered(true);
    }, 45000);
    return () => clearTimeout(triggerTimer);
  }, [chaiBreakTriggered, isChaiBreak, setIsChaiBreak]);

  if (!ticket) return null;

  const timeString = time;
`;

let content = fs.readFileSync('src/components/ui/HUD.tsx', 'utf8');

const returnPos = content.indexOf('<div className="absolute inset-0 z-40');
const bottomHalf = content.substring(returnPos);

fs.writeFileSync('src/components/ui/HUD.tsx', hudTop + '  return (\n    ' + bottomHalf);
