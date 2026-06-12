"use client"

import { useEffect, useRef } from 'react';

// Serpentine journey path that snakes AROUND the page sections: it runs down
// the left gutter beside one section, sweeps across the page in the gap
// before the next section, runs down the right gutter, and so on - drawing
// itself as you scroll, with a glowing dot riding the tip beside whatever
// you're currently viewing.
//
// The path is built at runtime from the real measured positions of the
// section elements, and rebuilt whenever the page resizes/reflows, so it can
// never drift or break. Vertical runs sit inside the content padding gutters
// where no cards render, keeping the line visible top to bottom.

const SECTION_IDS = ["about", "experience", "skills", "research", "projects", "achievements", "education", "contact"];
const EDGE = 10; // px from container edge - inside px-6 padding, outside all cards

function ScrollJourneyPath() {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const trackRef = useRef(null);
  const pathRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const svg = svgRef.current;
    const track = trackRef.current;
    const path = pathRef.current;
    const dot = dotRef.current;
    if (!container || !svg || !track || !path || !dot) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let total = 0;
    let H = 0;
    let target = 0;
    let current = 0;
    let raf = null;

    const build = () => {
      const rect = container.getBoundingClientRect();
      const W = container.clientWidth;
      H = container.clientHeight;
      if (W < 100 || H < 100) return false;

      const sections = SECTION_IDS
        .map(id => document.getElementById(id))
        .filter(Boolean);
      if (sections.length < 2) return false;

      const xFor = (i) => (i % 2 === 0 ? EDGE : W - EDGE);

      let d = `M ${xFor(0)} 0`;
      sections.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const top = Math.max(r.top - rect.top, 0);
        const bot = top + r.height;
        const x = xFor(i);
        d += ` L ${x} ${top.toFixed(1)} L ${x} ${bot.toFixed(1)}`;

        const next = sections[i + 1];
        if (next) {
          const nr = next.getBoundingClientRect();
          const ntop = nr.top - rect.top;
          const nx = xFor(i + 1);
          const reach = Math.max((ntop - bot) * 0.9, 24);
          d += ` C ${x} ${(bot + reach).toFixed(1)}, ${nx} ${(ntop - reach).toFixed(1)}, ${nx} ${ntop.toFixed(1)}`;
        } else {
          d += ` L ${x} ${H.toFixed(1)}`;
        }
      });

      svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
      track.setAttribute('d', d);
      path.setAttribute('d', d);
      total = path.getTotalLength();
      return true;
    };

    // Path y grows monotonically with length, so binary-search the length
    // whose point sits at the viewport's focus line.
    const lengthForY = (y) => {
      let lo = 0;
      let hi = total;
      for (let k = 0; k < 18; k++) {
        const mid = (lo + hi) / 2;
        if (path.getPointAtLength(mid).y < y) lo = mid;
        else hi = mid;
      }
      return (lo + hi) / 2;
    };

    const apply = (len) => {
      path.style.strokeDashoffset = `${Math.max(total - len, 0)}`;
      const pt = path.getPointAtLength(len);
      dot.style.left = `${pt.x}px`;
      dot.style.top = `${pt.y}px`;
    };

    const computeTarget = () => {
      const rect = container.getBoundingClientRect();
      const containerTop = rect.top + window.scrollY;
      const focusY = window.scrollY + window.innerHeight * 0.6 - containerTop;
      target = lengthForY(Math.min(Math.max(focusY, 0), H));
    };

    const tick = () => {
      current += (target - current) * 0.12;
      if (Math.abs(target - current) < 0.5) {
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

    if (!build()) return;

    if (reduced) {
      path.style.strokeDasharray = 'none';
      path.style.strokeDashoffset = '0';
      dot.style.display = 'none';
    } else {
      path.style.strokeDasharray = `${total} ${total}`;
      path.style.strokeDashoffset = `${total}`;
      kick();
      window.addEventListener('scroll', kick, { passive: true });
      window.addEventListener('resize', kick, { passive: true });
    }

    // Rebuild when content reflows (images/lotties loading, viewport changes)
    const ro = new ResizeObserver(() => {
      const keep = total > 0 ? current / total : 0;
      if (!build()) return;
      if (reduced) return;
      path.style.strokeDasharray = `${total} ${total}`;
      current = keep * total;
      kick();
    });
    ro.observe(container);

    return () => {
      window.removeEventListener('scroll', kick);
      window.removeEventListener('resize', kick);
      ro.disconnect();
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={containerRef} className="journey-snake" aria-hidden="true">
      <svg
        ref={svgRef}
        className="w-full h-full"
        viewBox="0 0 100 100"
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
        {/* faint full route */}
        <path ref={trackRef} d="" stroke="rgba(42, 46, 90, 0.55)" strokeWidth="1.5" />
        {/* gradient progress stroke */}
        <path
          ref={pathRef}
          d=""
          stroke="url(#journey-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="journey-glow"
        />
      </svg>
      <div ref={dotRef} className="journey-dot" style={{ left: '10px', top: '0px' }} />
    </div>
  );
}

export default ScrollJourneyPath;
