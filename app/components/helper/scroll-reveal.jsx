"use client"

import { useEffect, useRef } from 'react';

// Reveals children when scrolled into view: slide in from a direction + fade.
// IntersectionObserver fires once per element; reduced-motion users see
// content immediately with no movement.
// NOTE: applies a transform while hidden - do not wrap content that relies
// on position: sticky/fixed.
function ScrollReveal({ children, direction = 'left', delay = 0, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('revealed');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal reveal-${direction} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

export default ScrollReveal;
