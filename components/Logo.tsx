import React, { useEffect, useRef, useState } from 'react';

const Logo: React.FC = () => {
  const logoRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!logoRef.current) return;
      const rect = logoRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const x = (e.clientX - centerX) / 15;
      const y = (e.clientY - centerY) / 15;

      setOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={logoRef} 
      className="relative group cursor-default z-50"
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: 'transform 0.1s ease-out'
      }}
    >
        {/* Logo Text Only - No container background/border */}
        <div className="relative flex items-center justify-center">
            <span className="font-display font-light tracking-[0.25em] text-xl md:text-2xl text-white uppercase flex items-center gap-2 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                Mehaal<span className="text-neon-cyan drop-shadow-[0_0_15px_rgba(6,182,212,1)]">.</span>Tech 
                <span className="ml-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-white to-cyan-300 drop-shadow-[0_0_25px_rgba(139,92,246,0.9)]">
                  AI
                </span>
            </span>
        </div>
    </div>
  );
};

export default Logo;