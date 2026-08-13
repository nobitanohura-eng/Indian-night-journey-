import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Music, Radio, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useJourney } from '../store/JourneyContext';
import { MUSIC_PLAYLISTS } from '../constants/audio';
import { Playlist } from '../types';

export function MusicPlayer() {
  const { isPlaying, setIsPlaying, activePlaylist, setActivePlaylist, currentTrackIndex, setCurrentTrackIndex } = useJourney();
  const [showSelector, setShowSelector] = useState(!activePlaylist);
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
        // Prevent setting the same src repeatedly
        const currentSrc = audioRef.current.src.replace(window.location.origin, '');
        if (currentSrc !== track.src) {
          setIsBuffering(true);
          setHasError(false);
          audioRef.current.src = track.src;
          if (isPlaying) {
            audioRef.current.play().catch(e => {
              console.error("Audio playback error:", e);
              setHasError(true);
              setIsBuffering(false);
            });
          }
        }
      }
    }
  }, [activePlaylist, currentTrackIndex]);

  // Handle play/pause
  useEffect(() => {
    if (audioRef.current && audioRef.current.src) {
      if (isPlaying) {
        audioRef.current.play().catch(e => {
          console.error("Audio playback error:", e);
          setHasError(true);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

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
      
      // Auto-skip logic to try the next track if unavailable
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
    const percentage = x / rect.width;
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
    <div className="flex flex-col justify-end w-full md:w-[350px] pointer-events-none">
      <audio ref={audioRef} className="hidden" preload="none" />

      {/* Playlist Selector */}
      <AnimatePresence>
        {showSelector && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="pointer-events-auto w-full md:w-[350px] z-50 mb-2"
          >
            <div className="bg-[#111]/90 backdrop-blur-md border-[2px] border-[#3a2e22] rounded-lg p-4 shadow-2xl flex flex-col max-h-[60vh] md:max-h-[400px]">
              <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2 shrink-0">
                <div className="flex items-center space-x-2">
                  <Radio className="w-4 h-4 text-amber-500" />
                  <h4 className="text-xs uppercase tracking-[0.2em] font-mono text-white/80">Select Music</h4>
                </div>
              </div>

              <div className="flex flex-col gap-2 overflow-y-auto no-scrollbar pb-2 flex-1">
                {MUSIC_PLAYLISTS.filter(pl => pl.tracks && pl.tracks.length > 0).map((pl) => (
                  <button
                    key={pl.id}
                    onClick={() => selectPlaylist(pl)}
                    className={`flex flex-col text-left p-3 border rounded transition-colors group ${
                      activePlaylist?.id === pl.id 
                        ? 'bg-amber-500/20 border-amber-500/50' 
                        : 'bg-white/5 border-white/5 hover:bg-amber-500/10 hover:border-amber-500/30'
                    }`}
                  >
                    <span className={`text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1 flex items-center space-x-1.5 ${
                      activePlaylist?.id === pl.id ? 'text-amber-400' : 'text-amber-500 group-hover:text-amber-400'
                    }`}>
                      {pl.icon && <span className="text-sm">{pl.icon}</span>}
                      <span>{pl.name}</span>
                    </span>
                    <span className="text-[8px] md:text-[10px] text-white/50 leading-tight">
                      {pl.description}
                    </span>
                  </button>
                ))}
              </div>

              {activePlaylist && (
                <button
                  onClick={() => setShowSelector(false)}
                  className="mt-3 w-full py-2 text-[10px] uppercase tracking-widest text-white/40 hover:text-white shrink-0"
                >
                  Close
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mini Player */}
      <AnimatePresence>
        {(!showSelector && activePlaylist && currentTrack) && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="pointer-events-auto w-full md:w-[350px] z-50 flex flex-col justify-end"
          >
            <div className="bg-[#1a1714]/95 backdrop-blur-xl border-[2px] border-[#3a2e22] p-3 md:p-4 flex flex-col shadow-[0_8px_30px_rgba(0,0,0,0.6)] rounded-sm">
              
              {/* Optional External Links Row */}
              {activePlaylist.externalLinks?.spotify && (
                <div className="flex items-center justify-end space-x-3 mb-2 px-1">
                  <a href={activePlaylist.externalLinks.spotify} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 text-[8px] md:text-[9px] uppercase tracking-widest text-white/30 hover:text-green-500 transition-colors">
                    <span>Spotify</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              )}

              <div className="flex items-center justify-between w-full">
                {/* Art/Mood Icon */}
                <button 
                  onClick={() => setShowSelector(true)}
                  className="relative w-10 h-10 md:w-12 md:h-12 bg-black border border-white/10 flex items-center justify-center shrink-0 hover:border-amber-500/50 transition-colors cursor-pointer group overflow-hidden rounded-sm"
                  title="Change Playlist"
                >
                  <Music className={`w-4 h-4 md:w-5 md:h-5 text-amber-500 group-hover:scale-110 transition-transform ${isPlaying && !isBuffering ? 'animate-pulse' : 'opacity-50'}`} />
                </button>
                
                {/* Track Info */}
                <div className="flex-1 mx-3 flex flex-col justify-center overflow-hidden">
                  <h3 className="text-white/90 font-mono font-medium truncate text-xs md:text-sm tracking-wide flex items-center">
                    {isBuffering ? (
                      <span className="text-amber-500/90 animate-pulse">BUFFERING...</span>
                    ) : hasError ? (
                      <span className="text-red-500/90">TRACK UNAVAILABLE</span>
                    ) : (
                      currentTrack.title
                    )}
                  </h3>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-white/50 text-[9px] md:text-[10px] truncate">{currentTrack.artist}</span>
                    <button 
                      onClick={() => setShowSelector(true)}
                      className="text-amber-500/70 hover:text-amber-500 text-[8px] md:text-[9px] truncate uppercase tracking-[0.2em] flex items-center space-x-1 group shrink-0 ml-2"
                      title="Change Playlist Category"
                    >
                      <span className="max-w-[80px] truncate">{activePlaylist.name}</span>
                    </button>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full flex items-center space-x-2 mt-2">
                    <span className="text-[8px] font-mono text-white/40 min-w-[24px] text-right">{formatTime(currentTime)}</span>
                    <div 
                      className="flex-1 h-2 bg-white/10 rounded-full relative overflow-hidden cursor-pointer group/progress"
                      onClick={handleSeek}
                    >
                      <div 
                        className="absolute top-0 left-0 bottom-0 bg-amber-500 rounded-full transition-all duration-300 ease-linear group-hover/progress:bg-amber-400"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    <span className="text-[8px] font-mono text-white/40 min-w-[24px]">{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center space-x-1 md:space-x-2 border-l border-white/10 pl-2 md:pl-4">
                  <button aria-label="Previous Track" onClick={handlePrev} className="p-1.5 md:p-2 text-white/40 hover:text-amber-500 transition-colors">
                    <SkipBack className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </button>
                  
                  <button 
                    aria-label={isPlaying ? "Pause Music" : "Play Music"}
                    onClick={() => setIsPlaying(!isPlaying)} 
                    className="p-2 md:p-2.5 bg-amber-500/90 text-[#050505] rounded hover:bg-amber-500 transition-colors shadow-[0_0_10px_rgba(245,158,11,0.2)]"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 md:w-5 md:h-5 fill-current" /> : <Play className="w-4 h-4 md:w-5 md:h-5 fill-current ml-0.5" />}
                  </button>
                  
                  <button aria-label="Next Track" onClick={handleNext} className="p-1.5 md:p-2 text-white/40 hover:text-amber-500 transition-colors">
                    <SkipForward className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
