'use client';

import React, { useEffect, useRef } from 'react';

export default function Cursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${mx - 3}px`;
        cursorDotRef.current.style.top = `${my - 3}px`;
      }
    };

    let animationId: number;
    const updateRing = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (cursorRingRef.current) {
        cursorRingRef.current.style.left = `${rx - 14}px`;
        cursorRingRef.current.style.top = `${ry - 14}px`;
      }
      animationId = requestAnimationFrame(updateRing);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.closest('a, button, .project-card, .stat-card, .skill-item, .story-card'))
      ) {
        if (cursorDotRef.current) cursorDotRef.current.style.transform = 'scale(2)';
        if (cursorRingRef.current) cursorRingRef.current.style.transform = 'scale(1.5)';
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.closest('a, button, .project-card, .stat-card, .skill-item, .story-card'))
      ) {
        if (cursorDotRef.current) cursorDotRef.current.style.transform = 'scale(1)';
        if (cursorRingRef.current) cursorRingRef.current.style.transform = 'scale(1)';
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    // Use capture to catch mouse events for link scaling
    document.addEventListener('mouseover', handleMouseEnter, true);
    document.addEventListener('mouseout', handleMouseLeave, true);
    animationId = requestAnimationFrame(updateRing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseEnter, true);
      document.removeEventListener('mouseout', handleMouseLeave, true);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      <div ref={cursorDotRef} className="cursor" />
      <div ref={cursorRingRef} className="cursor-ring" />
    </>
  );
}
