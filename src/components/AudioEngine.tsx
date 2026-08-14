import { useEffect, useRef } from 'react';
import { useJourney } from '../store/JourneyContext';
import { AMBIENT_TRACKS } from '../constants/audio';

export function AudioEngine() {
  const { ambientVolumes } = useJourney();
  
  const engineRef = useRef<HTMLAudioElement | null>(null);
  const rainRef = useRef<HTMLAudioElement | null>(null);
  const roadRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!engineRef.current) {
      engineRef.current = new Audio(AMBIENT_TRACKS.engine);
      engineRef.current.loop = true;
      engineRef.current.volume = 0.45;
      engineRef.current.play().catch(() => {});
    }
    if (!rainRef.current) {
      rainRef.current = new Audio(AMBIENT_TRACKS.rain);
      rainRef.current.loop = true;
      rainRef.current.volume = 0;
      rainRef.current.play().catch(() => {});
    }
    if (!roadRef.current) {
      roadRef.current = new Audio(AMBIENT_TRACKS.road);
      roadRef.current.loop = true;
      roadRef.current.volume = 0.35;
      roadRef.current.play().catch(() => {});
    }
    
    return () => {
      engineRef.current?.pause();
      rainRef.current?.pause();
      roadRef.current?.pause();
    };
  }, []);

  // Handle ambient volume adjustments
  useEffect(() => {
    if (engineRef.current) engineRef.current.volume = Math.max(0, Math.min(1, ambientVolumes.engine / 100));
    if (rainRef.current) rainRef.current.volume = Math.max(0, Math.min(1, ambientVolumes.rain / 100));
    if (roadRef.current) roadRef.current.volume = Math.max(0, Math.min(1, ambientVolumes.road / 100));
  }, [ambientVolumes]);

  return null; // This component handles side effects only
}

