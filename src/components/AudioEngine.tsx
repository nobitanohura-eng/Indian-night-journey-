import { useEffect, useRef } from 'react';
import { useJourney } from '../store/JourneyContext';
import { AMBIENT_TRACKS } from '../constants/audio';

export function AudioEngine() {
  const { ambientVolumes, hornActive } = useJourney();
  
  const engineRef = useRef<HTMLAudioElement | null>(null);
  const rainRef = useRef<HTMLAudioElement | null>(null);
  const roadRef = useRef<HTMLAudioElement | null>(null);
  const hornRef = useRef<HTMLAudioElement | null>(null);

  
  useEffect(() => {
    if (!engineRef.current) {
      engineRef.current = new Audio(AMBIENT_TRACKS.engine);
      engineRef.current.loop = true;
      engineRef.current.volume = 0;
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
      roadRef.current.volume = 0;
      roadRef.current.play().catch(() => {});
    }
    
    return () => {
      engineRef.current?.pause();
      rainRef.current?.pause();
      roadRef.current?.pause();
    };
  }, []);

  // Handle ambients
  useEffect(() => {
    // Volume expects 0.0 to 1.0, but ambientVolumes are 0-100
    if (engineRef.current) engineRef.current.volume = ambientVolumes.engine / 100;
    if (rainRef.current) rainRef.current.volume = ambientVolumes.rain / 100;
    if (roadRef.current) roadRef.current.volume = ambientVolumes.road / 100;
  }, [ambientVolumes]);

  // Handle Horn
  useEffect(() => {
    if (hornActive) {
      if (!hornRef.current) {
        hornRef.current = new Audio(AMBIENT_TRACKS.horn);
      }
      hornRef.current.currentTime = 0;
      hornRef.current.volume = 0.5;
      hornRef.current.play().catch(() => {});
    }
  }, [hornActive]);

  return null; // This component handles side effects only
}
