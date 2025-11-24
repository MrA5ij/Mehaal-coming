import React, { useEffect, useRef } from 'react';
import { Star } from '../types';

const STAR_COUNT = 2000; // Increased density for a richer field
const MAX_DEPTH = 1000;

const Starfield: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const requestRef = useRef<number>();

  const initStars = (width: number, height: number) => {
    starsRef.current = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      starsRef.current.push({
        x: (Math.random() - 0.5) * width * 2, // Spread wider than screen
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * MAX_DEPTH,
        prevZ: Math.random() * MAX_DEPTH,
        brightness: Math.random(),
        speed: 1 + Math.random() * 2, // Individual base speed variation
      });
    }
  };

  const update = (width: number, height: number, ctx: CanvasRenderingContext2D) => {
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Center of screen
    const cx = width / 2;
    const cy = height / 2;

    starsRef.current.forEach((star) => {
      star.prevZ = star.z;

      // Dynamic Speed Calculation:
      // Base speed + acceleration factor based on how close the star is.
      // (1 - star.z / MAX_DEPTH) is 0 at far plane, 1 at near plane.
      // This makes stars 'rush' past slightly faster as they get closer.
      const depthFactor = 1 - (star.z / MAX_DEPTH);
      const currentSpeed = star.speed + (depthFactor * 3); 

      star.z -= currentSpeed;

      // Reset if passed camera
      if (star.z <= 1) {
        star.z = MAX_DEPTH;
        star.prevZ = MAX_DEPTH;
        star.x = (Math.random() - 0.5) * width * 2;
        star.y = (Math.random() - 0.5) * height * 2;
        // Reset speed slightly on respawn for continuous variety
        star.speed = 1 + Math.random() * 2;
      }

      // Project 3D to 2D
      const scale = 400; // Field of view
      const sx = (star.x / star.z) * scale + cx;
      const sy = (star.y / star.z) * scale + cy;

      // Calculate size based on proximity
      const size = (1 - star.z / MAX_DEPTH) * 2.5;
      
      // Calculate opacity based on proximity and initial brightness
      const alpha = Math.min(1, (1 - star.z / MAX_DEPTH) * 1.5) * star.brightness;

      // Draw only if within bounds (optimization)
      if (sx >= -10 && sx <= width + 10 && sy >= -10 && sy <= height + 10) {
        ctx.fillStyle = `rgba(200, 220, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(sx, sy, Math.max(0.5, size), 0, Math.PI * 2);
        ctx.fill();

        // Subtle glow for closer stars
        if (size > 1.8) {
            ctx.shadowBlur = 6;
            ctx.shadowColor = `rgba(167, 139, 250, ${alpha * 0.6})`; // Purple/Blue glow
            ctx.fill();
            ctx.shadowBlur = 0;
        }
      }
    });

    requestRef.current = requestAnimationFrame(() => update(width, height, ctx));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars(canvas.width, canvas.height);
    };

    window.addEventListener('resize', resize);
    resize();

    // Start loop
    requestRef.current = requestAnimationFrame(() => update(canvas.width, canvas.height, ctx));

    return () => {
      window.removeEventListener('resize', resize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none mix-blend-screen"
    />
  );
};

export default Starfield;