"use client"

import { useCallback, useRef } from 'react';

// Pointer-tracked 3D tilt with dynamic glare. Pure CSS transforms (GPU-only),
// auto-disabled for touch input and prefers-reduced-motion.
function TiltCard({ children, className = "", intensity = 10 }) {
  const wrapperRef = useRef(null);

  const handleMove = useCallback((e) => {
    const wrapper = wrapperRef.current;
    if (!wrapper || e.pointerType === 'touch') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = wrapper.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    wrapper.style.setProperty('--rx', `${((0.5 - py) * intensity).toFixed(2)}deg`);
    wrapper.style.setProperty('--ry', `${((px - 0.5) * intensity).toFixed(2)}deg`);
    wrapper.style.setProperty('--gx', `${(px * 100).toFixed(1)}%`);
    wrapper.style.setProperty('--gy', `${(py * 100).toFixed(1)}%`);
  }, [intensity]);

  const handleLeave = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    wrapper.style.setProperty('--rx', '0deg');
    wrapper.style.setProperty('--ry', '0deg');
  }, []);

  return (
    <div
      ref={wrapperRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`tilt-wrapper ${className}`}
    >
      <div className="tilt-card h-full">
        <div className="tilt-glare" aria-hidden="true"></div>
        {children}
      </div>
    </div>
  );
}

export default TiltCard;
