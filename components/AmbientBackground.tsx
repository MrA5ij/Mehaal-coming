import React from 'react';

const AmbientBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Deep background base */}
        <div className="absolute inset-0 bg-cosmic-900" />
        
        {/* Radial gradient overlay to create depth (vignette) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#030712_100%)] opacity-80" />

        {/* Moving Energy Field 1: Purple/Violet */}
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-violet-600/10 rounded-full blur-[120px] animate-pulse-slow mix-blend-screen" />

        {/* Moving Energy Field 2: Deep Blue/Indigo */}
        <div className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] bg-indigo-600/10 rounded-full blur-[130px] animate-pulse-slow mix-blend-screen delay-1000" />

        {/* Central Intelligence Glow: Cyan/Teal hint */}
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-cyan-500/5 rounded-full blur-[100px] animate-pulse mix-blend-overlay" />
    </div>
  );
};

export default AmbientBackground;
