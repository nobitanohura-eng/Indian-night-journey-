import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Route, Ticket, ViewMode, Playlist } from '../types';

export type AppState = 'SPLASH' | 'SELECTION' | 'TICKET' | 'BOARDING' | 'JOURNEY';

export const ROUTES: Route[] = [
  { id: 'aurangabad-dehri', from: 'AURANGABAD', to: 'DEHRI', highway: 'INJ-BR-01', departureTime: '22:45', duration: '01h 30m', nextStop: 'BARUN', type: 'NIGHT SERVICE' },
  { id: 'aurangabad-rafiganj', from: 'AURANGABAD', to: 'RAFIGANJ', highway: 'INJ-BR-02', departureTime: '23:15', duration: '01h 15m', nextStop: 'JAMHOR', type: 'NIGHT SERVICE' },
  { id: 'aurangabad-nabinagar', from: 'AURANGABAD', to: 'NABINAGAR', highway: 'INJ-BR-03', departureTime: '22:30', duration: '01h 30m', nextStop: 'BARUN', type: 'NIGHT SERVICE' },
  { id: 'aurangabad-daudnagar', from: 'AURANGABAD', to: 'DAUDNAGAR', highway: 'INJ-BR-04', departureTime: '23:00', duration: '01h 25m', nextStop: 'OBRA', type: 'NIGHT SERVICE' },
  { id: 'aurangabad-deo', from: 'AURANGABAD', to: 'DEO', highway: 'INJ-BR-05', departureTime: '22:20', duration: '01h 20m', nextStop: 'KUTUMBA', type: 'NIGHT SERVICE' },
  { id: 'aurangabad-amba', from: 'AURANGABAD', to: 'AMBA', highway: 'INJ-BR-06', departureTime: '22:50', duration: '01h 10m', nextStop: 'KUTUMBA', type: 'NIGHT SERVICE' },
  { id: 'dehri-daudnagar', from: 'DEHRI', to: 'DAUDNAGAR', highway: 'INJ-BR-07', departureTime: '23:30', duration: '01h 00m', nextStop: 'NASRIGANJ', type: 'NIGHT SERVICE' },
  { id: 'dehri-rafiganj', from: 'DEHRI', to: 'RAFIGANJ', highway: 'INJ-BR-08', departureTime: '22:40', duration: '01h 40m', nextStop: 'AURANGABAD SIDE', type: 'NIGHT SERVICE' },
  { id: 'rafiganj-gaya', from: 'RAFIGANJ', to: 'GAYA', highway: 'INJ-BR-09', departureTime: '23:40', duration: '01h 50m', nextStop: 'SHERGHATI', type: 'NIGHT SERVICE' },
  { id: 'rafiganj-aurangabad', from: 'RAFIGANJ', to: 'AURANGABAD', highway: 'INJ-BR-10', departureTime: '22:55', duration: '01h 15m', nextStop: 'JAMHOR', type: 'NIGHT SERVICE' },
  { id: 'daudnagar-aurangabad', from: 'DAUDNAGAR', to: 'AURANGABAD', highway: 'INJ-BR-11', departureTime: '23:10', duration: '01h 25m', nextStop: 'OBRA', type: 'NIGHT SERVICE' },
  { id: 'daudnagar-dehri', from: 'DAUDNAGAR', to: 'DEHRI', highway: 'INJ-BR-12', departureTime: '00:05', duration: '01h 00m', nextStop: 'NASRIGANJ', type: 'NIGHT SERVICE' },
  { id: 'nabinagar-aurangabad', from: 'NABINAGAR', to: 'AURANGABAD', highway: 'INJ-BR-13', departureTime: '22:35', duration: '01h 30m', nextStop: 'BARUN', type: 'NIGHT SERVICE' },
  { id: 'nabinagar-dehri', from: 'NABINAGAR', to: 'DEHRI', highway: 'INJ-BR-14', departureTime: '23:20', duration: '02h 05m', nextStop: 'BARUN', type: 'NIGHT SERVICE' },
  { id: 'obra-daudnagar', from: 'OBRA', to: 'DAUDNAGAR', highway: 'INJ-BR-15', departureTime: '23:50', duration: '00h 35m', nextStop: 'DAUDNAGAR', type: 'NIGHT SERVICE' },
  { id: 'obra-aurangabad', from: 'OBRA', to: 'AURANGABAD', highway: 'INJ-BR-16', departureTime: '22:55', duration: '01h 10m', nextStop: 'BARUN', type: 'NIGHT SERVICE' },
  { id: 'aurangabad-gaya', from: 'AURANGABAD', to: 'GAYA', highway: 'INJ-BR-17', departureTime: '22:30', duration: '02h 30m', nextStop: 'RAFIGANJ', type: 'NIGHT EXPRESS' },
  { id: 'dehri-gaya', from: 'DEHRI', to: 'GAYA', highway: 'INJ-BR-18', departureTime: '21:45', duration: '03h 30m', nextStop: 'AURANGABAD', type: 'NIGHT EXPRESS' }
];

interface JourneyState {
  appState: AppState;
  setAppState: (state: AppState) => void;
  
  routes: Route[];
  activeRoute: Route | null;
  setActiveRoute: (route: Route | null) => void;
  
  ticket: Ticket | null;
  generateTicket: (route: Route) => void;
  
  view: ViewMode;
  setView: (view: ViewMode) => void;
  
  isRainy: boolean;
  setIsRainy: (isRainy: boolean) => void;
  
  hornActive: boolean;
  triggerHorn: () => void;
  
  passengers: number;
  
  // Audio state
  isSharedView: boolean;
  setIsSharedView: (v: boolean) => void;
  
  isChaiBreak: boolean;
  setIsChaiBreak: (v: boolean) => void;

  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  
  activePlaylist: Playlist | null;
  setActivePlaylist: React.Dispatch<React.SetStateAction<Playlist | null>>;
  
  currentTrackIndex: number;
  setCurrentTrackIndex: React.Dispatch<React.SetStateAction<number>>;
  
  ambientVolumes: {
    engine: number;
    rain: number;
    road: number;
    chatter: number;
  };
}

const JourneyContext = createContext<JourneyState | undefined>(undefined);

export function JourneyProvider({ children }: { children: ReactNode }) {
  const [appState, setAppState] = useState<AppState>('SPLASH');
  const [activeRoute, setActiveRoute] = useState<Route | null>(null);
  const [ticket, setTicket] = useState<Ticket | null>(null);
  
  const [view, setView] = useState<ViewMode>('WINDOW');
  const [isRainy, setIsRainy] = useState(false);
  const [hornActive, setHornActive] = useState(false);
  const [passengers, setPassengers] = useState(42);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isChaiBreak, setIsChaiBreak] = useState(false);
  const [activePlaylist, setActivePlaylist] = useState<Playlist | null>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const [isSharedView, setIsSharedView] = useState(false);

  useEffect(() => {
    // Check URL parameters for shared ticket
    const params = new URLSearchParams(window.location.search);
    if (params.get('shared') === 'true') {
      const from = params.get('from') || 'PATNA';
      const to = params.get('to') || 'GAYA';
      const route: Route = {
        id: 'shared',
        from: from.substring(0, 20),
        to: to.substring(0, 20),
        highway: 'NH 19',
        departureTime: '23:45',
        duration: '08h 30m',
        nextStop: 'Dhaba'
      };
      
      const sharedTicket: Ticket = {
        pnr: params.get('pnr') || 'INJ-SHARED',
        seat: params.get('seat') || 'W12',
        route,
        boardingTime: route.departureTime,
        journeyNumber: 'INJ-9999'
      };
      
      setTicket(sharedTicket);
      setIsSharedView(true);
      setAppState('TICKET');
    }
  }, []);

  const ambientVolumes = {
    engine: 70,
    rain: isRainy ? 45 : 0,
    road: 55,
    chatter: 30
  };

  const generateTicket = (route: Route) => {
    const newTicket: Ticket = {
      pnr: Math.random().toString(36).substring(2, 10).toUpperCase(),
      seat: ['W', 'D', 'L'][Math.floor(Math.random() * 3)] + Math.floor(Math.random() * 20 + 1),
      route,
      boardingTime: route.departureTime,
      journeyNumber: 'INJ-' + Math.floor(Math.random() * 9000 + 1000)
    };
    setTicket(newTicket);
  };

  const triggerHorn = () => {
    setHornActive(true);
    setTimeout(() => setHornActive(false), 2000);
  };

  // Passenger simulation
  useEffect(() => {
    if (appState !== 'JOURNEY') return;
    
    const interval = setInterval(() => {
      setPassengers(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const newCount = prev + change;
        return newCount > 45 ? 45 : (newCount < 35 ? 35 : newCount);
      });
    }, 45000); // Change passengers randomly every 45s to simulate live journey feel

    return () => clearInterval(interval);
  }, [appState]);

  return (
    <JourneyContext.Provider value={{
      appState, setAppState,
      routes: ROUTES,
      activeRoute, setActiveRoute,
      ticket, generateTicket,
      view, setView,
      isRainy, setIsRainy,
      hornActive, triggerHorn,
      passengers,
      isSharedView, setIsSharedView,
      isChaiBreak, setIsChaiBreak,
      isPlaying, setIsPlaying,
      activePlaylist, setActivePlaylist,
      currentTrackIndex, setCurrentTrackIndex,
      ambientVolumes
    }}>
      {children}
    </JourneyContext.Provider>
  );
}

export function useJourney() {
  const context = useContext(JourneyContext);
  if (context === undefined) {
    throw new Error('useJourney must be used within a JourneyProvider');
  }
  return context;
}
