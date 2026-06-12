'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number; // Document space X
  y: number; // Document space Y
  vx: number;
  vy: number;
  life: number;
  decay: number;
  size: number;
  color: [number, number, number]; // RGB array
}

const COLORS: [number, number, number][] = [
  [255, 155, 69],  // Orange (#FF9B45)
  [213, 69, 27],   // Red (#D5451B)
  [244, 231, 225]  // Cream (#F4E7E1)
];

export default function ScrollStar() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Physics & animation references
  const targetScrollY = useRef(0);
  const currentScrollY = useRef(0);
  
  // Track previous document coordinates
  const prevDocX = useRef(0);
  const prevDocY = useRef(0);
  
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>(0);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle resizing
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track scroll Y
    targetScrollY.current = window.scrollY;
    currentScrollY.current = window.scrollY;

    const handleScroll = () => {
      targetScrollY.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Continuous position calculation in viewport space
    const getStarViewportPosition = (scrollYVal: number) => {
      // Scale scroll position into a continuous angle t
      const t = scrollYVal * 0.0012; 

      // Wavy horizontal oscillation across 15% to 85% of screen width
      let x = window.innerWidth * (0.5 + Math.sin(t) * 0.35);
      
      // Vertical bobbing/looping oscillation across 20% to 75% of screen height
      let y = window.innerHeight * (0.47 + Math.cos(t * 1.6) * 0.23);

      // Add a tiny idle float so it breathes when not scrolling
      const isIdle = Math.abs(targetScrollY.current - currentScrollY.current) < 0.5;
      if (isIdle) {
        const time = Date.now() * 0.002;
        x += Math.sin(time) * 4;
        y += Math.cos(time) * 3;
      }

      return { x, y };
    };

    // Initialize previous coordinates in document space
    const initialVp = getStarViewportPosition(currentScrollY.current);
    prevDocX.current = initialVp.x;
    prevDocY.current = initialVp.y + currentScrollY.current;

    // Render loop
    const render = () => {
      if (!isMounted.current) return;

      // Clear the canvas each frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Interpolate scroll position for smooth motion
      const scrollDiff = targetScrollY.current - currentScrollY.current;
      currentScrollY.current += scrollDiff * 0.08;

      // Compute new star coordinates in viewport space
      const vpPos = getStarViewportPosition(currentScrollY.current);
      
      // Convert to document space coordinates
      const docX = vpPos.x;
      const docY = vpPos.y + currentScrollY.current;

      // Track movement distance in document space
      const dx = docX - prevDocX.current;
      const dy = docY - prevDocY.current;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Generate particles along the movement path in document space
      if (dist > 0.5) {
        const particleCount = Math.min(10, Math.ceil(dist / 3.0));
        for (let i = 0; i < particleCount; i++) {
          const ratio = i / particleCount;
          const px = prevDocX.current + dx * ratio;
          const py = prevDocY.current + dy * ratio;

          // Velocity is opposite to motion direction + random scatter
          const vx = -dx * 0.06 + (Math.random() - 0.5) * 1.2;
          const vy = -dy * 0.06 + (Math.random() - 0.5) * 1.2;

          particles.current.push({
            x: px,
            y: py,
            vx,
            vy,
            life: 1.0,
            decay: 0.008 + Math.random() * 0.014, // Lasts slightly longer for better trails
            size: 1.2 + Math.random() * 2.8,
            color: COLORS[Math.floor(Math.random() * COLORS.length)]
          });
        }
      } else {
        // Spawn occasional slow-drifting idle particles when stationary
        if (Math.random() < 0.12) {
          particles.current.push({
            x: docX,
            y: docY,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8 - 0.2, // Drift slightly upwards
            life: 1.0,
            decay: 0.01 + Math.random() * 0.012,
            size: 1.0 + Math.random() * 2.0,
            color: COLORS[Math.floor(Math.random() * COLORS.length)]
          });
        }
      }

      // Update and draw particles (mapped back to viewport space)
      ctx.globalCompositeOperation = 'screen';
      
      const activeParticles: Particle[] = [];
      for (let i = 0; i < particles.current.length; i++) {
        const p = particles.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98; // Drag
        p.vy *= 0.98;
        p.life -= p.decay;

        if (p.life > 0) {
          // Map document space Y to current viewport Y
          const viewportY = p.y - currentScrollY.current;

          // Only draw if inside/near the viewport
          if (viewportY >= -50 && viewportY <= canvas.height + 50) {
            ctx.beginPath();
            ctx.arc(p.x, viewportY, p.size * p.life, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, ${p.life})`;
            ctx.fill();
          }
          activeParticles.push(p);
        }
      }
      particles.current = activeParticles;

      // Draw the glowing star head in viewport space
      ctx.beginPath();
      const outerGlow = ctx.createRadialGradient(vpPos.x, vpPos.y, 1, vpPos.x, vpPos.y, 15);
      outerGlow.addColorStop(0, 'rgba(255, 155, 69, 0.9)');
      outerGlow.addColorStop(0.3, 'rgba(213, 69, 27, 0.6)');
      outerGlow.addColorStop(1, 'rgba(213, 69, 27, 0)');
      
      ctx.arc(vpPos.x, vpPos.y, 15, 0, Math.PI * 2);
      ctx.fillStyle = outerGlow;
      ctx.fill();

      // Inner white core
      ctx.beginPath();
      ctx.arc(vpPos.x, vpPos.y, 3.8, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.fill();

      // Update previous document coordinates
      prevDocX.current = docX;
      prevDocY.current = docY;

      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      isMounted.current = false;
      cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    />
  );
}
