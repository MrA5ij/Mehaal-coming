export interface Star {
  x: number;
  y: number;
  z: number;
  prevZ: number;
  brightness: number;
  speed: number;
}

export interface Particle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  alpha: number;
  targetAlpha: number;
}