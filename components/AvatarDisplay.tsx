'use client';

import React, { useState, useEffect, useRef } from 'react';

const GREETINGS = [
  "Hey! I'm Pranav. Welcome! 👋",
  "Let's build something epic! 🚀",
  "I co-founded REKRAFT (rekraft.in)! ♻️",
  "Full Stack Dev & UI/UX Designer! 💻",
  "ML, React, Node, Android... I love it! 🛠️",
  "Scroll down to see my projects! 📜",
  "Try typing commands in the console below! 🐚"
];

interface AvatarDisplayProps {
  scrollProgress?: number;
}

export default function AvatarDisplay({ scrollProgress = 1 }: AvatarDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [hoverScale, setHoverScale] = useState(1);
  const [bubbleText, setBubbleText] = useState('');
  const [showBubble, setShowBubble] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [greetIdx, setGreetIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile screens to adapt the scroll animations
    setIsMobile(window.innerWidth <= 900);
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cardX = rect.left + rect.width / 2;
      const cardY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX - cardX;
      const mouseY = e.clientY - cardY;
      
      const maxRotation = 12;
      const rx = -(mouseY / (window.innerHeight / 2)) * maxRotation;
      const ry = (mouseX / (window.innerWidth / 2)) * maxRotation;
      
      setRotate({ x: rx, y: ry });
    };

    const handleMouseLeave = () => {
      setRotate({ x: 0, y: 0 });
      setHoverScale(1);
    };

    const handleMouseEnter = () => {
      setHoverScale(1.05);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mouseleave', handleMouseLeave);
      container.addEventListener('mouseenter', handleMouseEnter);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (container) {
        container.removeEventListener('mouseleave', handleMouseLeave);
        container.removeEventListener('mouseenter', handleMouseEnter);
      }
    };
  }, []);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 500);

    // Pick next greeting
    const text = GREETINGS[greetIdx];
    setBubbleText(text);
    setShowBubble(true);
    setGreetIdx((prev) => (prev + 1) % GREETINGS.length);
  };

  useEffect(() => {
    if (!showBubble) return;
    const timer = setTimeout(() => {
      setShowBubble(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, [showBubble, bubbleText]);

  // Interpolate coordinates based on scroll progress (p)
  // At p = 0 (top/start): centered horizontally (-25vw desktop) and vertically offset (-8vh desktop)
  // At p = 1 (complete): right-aligned (0 translate) and bottom-aligned (0 translate)
  // Accelerate transition so it completes by scrollProgress = 0.5 to avoid overlapping hero text
  const avatarProgress = Math.min(1, scrollProgress / 0.5);
  const tx = isMobile ? 0 : (1 - avatarProgress) * -25; // in vw
  const ty = 0; // Keep the flat cropped bottom of the image anchored to the bottom of the viewport
  const scaleFactor = isMobile ? 1.15 + (1 - avatarProgress) * 0.35 : 1.25 + (1 - avatarProgress) * 0.45; // scale factor

  return (
    <div 
      ref={containerRef}
      className="avatar-container"
      onClick={handleClick}
      style={{
        perspective: '10000px',
        width: '100%',
        maxWidth: '520px',
        height: '100%',
        minHeight: '75vh',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        zIndex: 5,
        position: 'relative',
        cursor: 'pointer',
        // Scroll-linked translate and scale
        transform: `translate(${tx}vw, ${ty}vh) scale(${scaleFactor})`,
        transformOrigin: isMobile ? 'bottom center' : 'bottom center',
        willChange: 'transform',
      }}
    >
      {/* Outer tilt layer */}
      <div
        className="avatar-tilt-wrapper"
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(${hoverScale})`,
          transition: 'transform 0.15s ease-out',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Inner floating layer (animated via CSS class in globals.css) */}
        <div
          className="avatar-card-animate"
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            position: 'relative',
            transformStyle: 'preserve-3d',
            filter: 'drop-shadow(0 20px 40px rgba(82, 28, 13, 0.25))',
          }}
        >
          {/* Relative Image Wrapper to anchor the speech bubble correctly */}
          <div style={{ position: 'relative', display: 'flex', width: '100%', maxHeight: '80vh', alignItems: 'flex-end', justifyContent: 'center' }}>
            {/* Speech bubble */}
            {showBubble && (
              <div className="avatar-bubble" style={{ bottom: '102%' }}>
                {bubbleText}
                <div className="avatar-bubble-tip" />
              </div>
            )}

            {/* Breathing Aura Behind Image (with active pulse overlay on click) */}
            <div className={`avatar-glow-ring ${isClicked ? 'glow-active' : ''}`} />

            <img
              src="/avatar.png"
              alt="Pranav A. Thormise Stylized 3D Avatar Cutout"
              className={isClicked ? 'avatar-press-bounce' : ''}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '80vh',
                objectFit: 'contain',
                display: 'block',
                zIndex: 1,
                position: 'relative',
                transition: 'transform 0.1s ease',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
