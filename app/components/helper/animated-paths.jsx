// @flow strict

// Decorative animated SVG background: flowing gradient bezier paths with a
// continuous dash-flow draw animation and light dots traveling along the
// curves (SMIL animateMotion - zero JS, GPU friendly). Hidden from AT and
// frozen under prefers-reduced-motion via globals.css.
function AnimatedPaths({ className = "" }) {
  const curves = [
    "M-50,260 C200,80 420,360 640,200 S1050,60 1300,220",
    "M-50,160 C250,320 500,60 750,240 S1100,320 1300,120",
    "M-50,330 C300,200 550,400 800,260 S1150,160 1300,300",
  ];

  return (
    <svg
      className={`pointer-events-none select-none ${className}`}
      viewBox="0 0 1250 400"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="flow-grad-a" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ec4899" stopOpacity="0" />
          <stop offset="35%" stopColor="#ec4899" />
          <stop offset="65%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#16f2b3" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="flow-grad-b" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#16f2b3" stopOpacity="0" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
        </linearGradient>
        <filter id="path-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {curves.map((d, i) => (
        <path
          key={`glow-${i}`}
          d={d}
          stroke={i % 2 === 0 ? "url(#flow-grad-a)" : "url(#flow-grad-b)"}
          strokeWidth="1.2"
          strokeLinecap="round"
          filter="url(#path-glow)"
          className="flow-path"
          style={{ animationDelay: `${i * -2.7}s` }}
        />
      ))}

      {curves.map((d, i) => (
        <circle
          key={`dot-${i}`}
          r={i === 1 ? 3.5 : 2.5}
          fill={i === 1 ? "#16f2b3" : i === 0 ? "#ec4899" : "#8b5cf6"}
          filter="url(#path-glow)"
          className="flow-dot"
        >
          <animateMotion
            dur={`${9 + i * 3}s`}
            repeatCount="indefinite"
            path={d}
            keyTimes="0;1"
            keySplines="0.4 0 0.6 1"
            calcMode="spline"
          />
        </circle>
      ))}
    </svg>
  );
}

export default AnimatedPaths;
