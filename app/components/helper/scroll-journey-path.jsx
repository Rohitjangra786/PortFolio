"use client"

import { useEffect, useRef } from 'react';

// Fixed scroll-progress rail pinned to the left gutter of the viewport.
// A gently winding gradient path draws itself as you scroll, with a glowing
// dot riding the tip. Progress is eased toward the scroll target each frame
// (lerp) so fast scrolling stays fluid instead of jumping. Never overlapped
// by content, immune to page-height changes (recomputed per frame), and
// rendered statically under prefers-reduced-motion.

const RAIL = "M12,0 C20,140 4,290 12,440 C20,590 4,740 12,880 C16,940 12,970 12,1000";

function ScrollJourneyPath() {
  const pathRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    const dot = dotRef.current;
    if (!path || !dot) return;

    const total = path.getTotalLength();

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      path.style.strokeDasharray = 'none';
      path.style.strokeDashoffset = '0';
      dot.style.display = 'none';
      return;
    }

    path.style.strokeDasharray = `${total} ${total}`;
    path.style.strokeDashoffset = `${total}`;

    let target = 0;
    let current = 0;
    let raf = null;

    const computeTarget = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      target = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };

    const apply = (p) => {
      path.style.strokeDashoffset = `${total * (1 - p)}`;
      const pt = path.getPointAtLength(total * p);
      dot.style.top = `${(pt.y / 1000) * 100}%`;
      dot.style.left = `${(pt.x / 24) * 100}%`;
    };

    const tick = () => {
      current += (target - current) * 0.14;
      if (Math.abs(target - current) < 0.0004) {
        current = target;
        apply(current);
        raf = null;
        return;
      }
      apply(current);
      raf = requestAnimationFrame(tick);
    };

    const kick = () => {
      computeTarget();
      if (raf === null) raf = requestAnimationFrame(tick);
    };

    kick();
    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', kick, { passive: true });

    return () => {
      window.removeEventListener('scroll', kick);
      window.removeEventListener('resize', kick);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="journey-rail" aria-hidden="true">
      <svg
        className="w-full h-full"
        viewBox="0 0 24 1000"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="journey-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="45%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#16f2b3" />
          </linearGradient>
        </defs>
        {/* faint full-length track */}
        <path
          d={RAIL}
          stroke="rgba(42, 46, 90, 0.75)"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        {/* gradient progress stroke, eased toward scroll position */}
        <path
          ref={pathRef}
          d={RAIL}
          stroke="url(#journey-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          className="journey-glow"
        />
      </svg>
      <div ref={dotRef} className="journey-dot" style={{ left: '50%', top: '0%' }} />
    </div>
  );
}

export default ScrollJourneyPath;
