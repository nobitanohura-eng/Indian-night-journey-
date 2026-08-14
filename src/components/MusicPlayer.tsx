import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Music, Radio, ExternalLink, Disc, ChevronUp, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useJourney } from '../store/JourneyContext';
import { MUSIC_PLAYLISTS } from '../constants/audio';
import { Playlist } from '../types';

export function MusicPlayer() {
  const { 
    isPlaying, 
    setIsPlaying, 
    togglePlay,
    activePlaylist, 
    setActivePlaylist, 
    currentTrackIndex, 
    setCurrentTrackIndex,
    nextTrack,
    prevTrack 
  } = useJourney();
  const [showSelector, setShowSelector] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isBuffering, setIsBuffering] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Handle active track change
  useEffect(() => {
    if (activePlaylist && audioRef.current) {
      const track = activePlaylist.tracks[currentTrackIndex];
      if (track) {
        const currentSrc = audioRef.current.src.replace(window.location.origin, '');
        if (!audioRef.current.src || currentSrc !== track.src) {
          setIsBuffering(true);
          setHasError(false);
          audioRef.current.src = track.src;
          audioRef.current.load();
          if (isPlaying) {
            audioRef.current.play().catch(e => {
              console.warn("Audio autoplay pending interaction:", e);
              setIsBuffering(false);
            });
          }
        }
      }
    }
  }, [activePlaylist, currentTrackIndex, isPlaying]);

  // Handle play/pause
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        if (!audioRef.current.src && activePlaylist) {
          const track = activePlaylist.tracks[currentTrackIndex];
          if (track) {
            audioRef.current.src = track.src;
          }
        }
        audioRef.current.play().catch(e => {
          console.warn("Audio play interrupted:", e);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, activePlaylist, currentTrackIndex]);

  // Audio Events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => {
      setDuration(audio.duration);
      setHasError(false);
      setIsBuffering(false);
    };
    const onEnded = () => {
      if (activePlaylist) {
        setCurrentTrackIndex(prev => (prev + 1) % activePlaylist.tracks.length);
      }
    };
    const onWaiting = () => setIsBuffering(true);
    const onPlaying = () => {
      setIsBuffering(false);
      setHasError(false);
    };
    const onError = () => {
      setHasError(true);
      setIsBuffering(false);
      if (activePlaylist) {
        setTimeout(() => {
          setCurrentTrackIndex(prev => (prev + 1) % activePlaylist.tracks.length);
        }, 3000);
      }
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('waiting', onWaiting);
    audio.addEventListener('playing', onPlaying);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('waiting', onWaiting);
      audio.removeEventListener('playing', onPlaying);
      audio.removeEventListener('error', onError);
    };
  }, [activePlaylist]);

  const selectPlaylist = (pl: Playlist) => {
    if (activePlaylist?.id === pl.id) {
      setShowSelector(false);
      return;
    }
    setActivePlaylist(pl);
    setCurrentTrackIndex(0);
    setShowSelector(false);
    setIsPlaying(true);
  };

  const handleNext = () => {
    if (activePlaylist) {
      setCurrentTrackIndex(prev => (prev + 1) % activePlaylist.tracks.length);
    }
  };

  const handlePrev = () => {
    if (activePlaylist) {
      setCurrentTrackIndex(prev => (prev - 1 + activePlaylist.tracks.length) % activePlaylist.tracks.length);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || duration === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const newTime = percentage * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const currentTrack = activePlaylist?.tracks[currentTrackIndex];

  return (
    <div className="flex flex-col justify-end w-full pointer-events-auto">
      <audio ref={audioRef} className="hidden" preload="none" />

      {/* Playlist Selector Modal */}
      <AnimatePresence>
        {showSelector && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-sm bg-[#12100d]/95 backdrop-blur-2xl border border-amber-500/40 rounded-2xl p-3 sm:p-5 shadow-2xl flex flex-col max-h-[85vh] landscape:max-h-[88vh]"
            >
              <div className="flex items-center justify-between mb-2.5 sm:mb-3 border-b border-white/10 pb-2 sm:pb-2.5 shrink-0">
                <div className="flex items-center space-x-2">
                  <Radio className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
                  <h4 className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-mono text-white/90">SELECT MUSIC CASSETTE</h4>
                </div>
                <button 
                  onClick={() => setShowSelector(false)}
                  className="text-xs text-white/50 hover:text-white px-2 py-0.5 sm:py-1 bg-white/5 rounded-md"
                >
                  ✕
                </button>
              </div>

              <div className="flex flex-col gap-1.5 sm:gap-2 overflow-y-auto no-scrollbar pb-2 flex-1">
                {MUSIC_PLAYLISTS.filter(pl => pl.tracks && pl.tracks.length > 0).map((pl) => (
                  <button
                    key={pl.id}
                    onClick={() => selectPlaylist(pl)}
                    className={`flex flex-col text-left p-2.5 sm:p-3 border rounded-xl transition-all duration-150 group active:scale-[0.98] ${
                      activePlaylist?.id === pl.id 
                        ? 'bg-amber-500/20 border-amber-500/60 shadow-[0_0_15px_rgba(245,158,11,0.15)]' 
                        : 'bg-white/5 border-white/10 hover:bg-amber-500/10 hover:border-amber-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5 sm:mb-1">
                      <span className={`text-[11px] sm:text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 ${
                        activePlaylist?.id === pl.id ? 'text-amber-400' : 'text-amber-500/90 group-hover:text-amber-400'
                      }`}>
                        {pl.icon && <span className="text-xs sm:text-sm">{pl.icon}</span>}
                        <span>{pl.name}</span>
                      </span>
                      {activePlaylist?.id === pl.id && (
                        <span className="text-[8px] sm:text-[9px] font-mono text-amber-400 bg-amber-500/20 px-1.5 py-0.5 rounded">PLAYING</span>
                      )}
                    </div>
                    <span className="text-[9px] sm:text-[10px] text-white/50 leading-relaxed line-clamp-2">
                      {pl.description}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ULTRA-COMPACT SLEEK HUD PLAYER BAR */}
      {activePlaylist && currentTrack && (
        <div className="relative group/player bg-black/60 hover:bg-black/80 backdrop-blur-xl border border-white/15 hover:border-amber-500/40 rounded-full px-2 sm:px-3.5 py-1 sm:py-2 landscape:py-1 landscape:px-2.5 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.6)] flex items-center gap-1.5 sm:gap-3 max-w-[280px] sm:max-w-[360px] landscape:max-w-[280px] sm:landscape:max-w-[320px]">
          
          {/* Micro Progress Bar on Top Border */}
          <div 
            className="absolute top-0 left-3 right-3 h-[2px] bg-white/10 rounded-full overflow-hidden cursor-pointer"
            onClick={handleSeek}
            title="Seek track"
          >
            <div 
              className="h-full bg-amber-400 transition-all duration-200"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Cassette / Art Icon (Click to open selector) */}
          <button 
            onClick={() => setShowSelector(true)}
            className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition-transform"
            title="Change Cassette / Playlist"
          >
            <Disc className={`w-3 h-3 sm:w-4 sm:h-4 text-amber-400 ${isPlaying && !isBuffering ? 'animate-spin' : 'opacity-70'}`} style={{ animationDuration: '4s' }} />
          </button>

          {/* Track Info (Single compact line) */}
          <div 
            onClick={() => setShowSelector(true)}
            className="flex-1 min-w-0 cursor-pointer flex flex-col justify-center select-none"
          >
            <div className="text-[10px] sm:text-xs font-mono font-bold text-white/90 truncate flex items-center gap-1">
              {isBuffering ? (
                <span className="text-amber-400 animate-pulse text-[9px] sm:text-[10px]">BUFFERING...</span>
              ) : hasError ? (
                <span className="text-red-400 text-[9px] sm:text-[10px]">TRACK ERROR</span>
              ) : (
                <span>{currentTrack.title}</span>
              )}
            </div>
            <div className="text-[8px] sm:text-[9.5px] font-mono text-white/50 truncate flex items-center gap-1">
              <span>{currentTrack.artist}</span>
              <span className="text-amber-400/60">•</span>
              <span className="text-amber-400/80">{activePlaylist.name}</span>
            </div>
          </div>

          {/* Audio Controls (Compact Pill) */}
          <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
            <button 
              aria-label="Previous Track (Key: ←)" 
              onClick={prevTrack} 
              title="Previous Track [←]"
              className="p-1 text-white/40 hover:text-white active:scale-95 transition-colors"
            >
              <SkipBack className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
            
            <button 
              aria-label={isPlaying ? "Pause Music (Key: Space)" : "Play Music (Key: Space)"}
              onClick={togglePlay} 
              title="Play / Pause [Space]"
              className="w-5.5 h-5.5 sm:w-7 sm:h-7 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(245,158,11,0.4)] active:scale-95 transition-transform"
            >
              {isPlaying ? (
                <Pause className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" />
              ) : (
                <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current ml-0.5" />
              )}
            </button>
            
            <button 
              aria-label="Next Track (Key: →)" 
              onClick={nextTrack} 
              title="Next Track [→]"
              className="p-1 text-white/40 hover:text-white active:scale-95 transition-colors"
            >
              <SkipForward className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

