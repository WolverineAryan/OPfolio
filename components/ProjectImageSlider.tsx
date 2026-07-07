'use client';

import React, { useState, useEffect } from 'react';

interface ProjectImageSliderProps {
  images: string[];
  name: string;
}

export default function ProjectImageSlider({ images, name }: ProjectImageSliderProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (images.length <= 1 || isHovered) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, 3200); // 3.2s interval
    return () => clearInterval(interval);
  }, [images, isHovered]);

  return (
    <div 
      className="project-img-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {images.map((imgSrc, idx) => (
        <img
          key={imgSrc}
          src={imgSrc}
          alt={`${name} screenshot ${idx + 1}`}
          className="project-img"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            opacity: idx === currentIdx ? 1 : 0,
            transition: 'opacity 0.8s ease-in-out, transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
            pointerEvents: idx === currentIdx ? 'auto' : 'none',
            zIndex: idx === currentIdx ? 2 : 1,
          }}
        />
      ))}
      <div className="project-img-overlay" style={{ zIndex: 3 }}></div>
      
      {/* Slider indicators */}
      {images.length > 1 && (
        <div className="slider-indicators" style={{ zIndex: 4 }}>
          {images.map((_, idx) => (
            <button
              key={idx}
              className={`slider-dot ${idx === currentIdx ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIdx(idx);
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
