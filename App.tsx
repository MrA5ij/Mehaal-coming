import React, { useState, useEffect } from 'react';
import Starfield from './components/Starfield';
import AmbientBackground from './components/AmbientBackground';
import Logo from './components/Logo';
import ScrambleText from './components/ScrambleText';

const App: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [dots, setDots] = useState('');

  useEffect(() => {
    // Slight delay to ensure animation triggers after initial render
    const timer = setTimeout(() => {
      setMounted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative w-full h-screen overflow-hidden bg-cosmic-900 text-white flex flex-col items-center justify-center">
      {/* Background Layers */}
      <AmbientBackground />
      <Starfield />

      {/* Grid Overlay for subtle texture */}
      <div 
        className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none opacity-20"
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-5xl">
        
        {/* Floating Logo - More prominent */}
        <div className={`mb-20 scale-90 md:scale-110 transition-all duration-1000 ease-out transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
            <Logo />
        </div>

        {/* Headline - Glass Text Effect */}
        <div className={`
            mb-10
            transition-all duration-1000 delay-300 ease-out transform
            ${mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}
        `}>
             <h1 
                className="font-display font-bold text-6xl md:text-8xl lg:text-9xl tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/90 via-white/40 to-white/10 drop-shadow-[0_10px_20px_rgba(255,255,255,0.1)] relative z-10"
                style={{ WebkitTextStroke: '1px rgba(255, 255, 255, 0.2)' }}
             >
              Coming Soon
            </h1>
        </div>

        {/* Separator Line - Wide & Breathing */}
        <div className={`
            h-[2px] bg-gradient-to-r from-transparent via-neon-purple to-transparent 
            mb-12 animate-pulse-slow
            transition-all duration-1000 delay-500 ease-out transform
            ${mounted ? 'w-full max-w-2xl opacity-80' : 'w-0 opacity-0'}
        `}>
           {/* Glow line visual */}
           <div className="absolute inset-0 bg-neon-cyan blur-[2px] opacity-50"></div>
        </div>

        {/* Slogan - Initializing Effect */}
        <div className={`
            font-sans font-light text-lg md:text-2xl text-blue-100/90 tracking-[0.3em] uppercase 
            transition-all duration-1000 delay-700 ease-out transform 
            ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}>
          <ScrambleText text="Intelligence Beyond Impossible" delay={1200} />
        </div>
      </div>

      {/* Footer / Bottom Detail */}
      <div className={`absolute bottom-8 text-white/30 text-xs font-sans tracking-widest uppercase transition-opacity duration-1000 delay-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        System Initializing<span className="inline-block w-8 text-left">{dots}</span>
      </div>
    </main>
  );
};

export default App;