// @flow strict

// 3D orbital system: concentric rings tilted into 3D space (rotateX) spinning
// at different speeds around a pulsing core, each carrying a glowing
// satellite. Pure CSS transforms - styles in globals.css, frozen under
// prefers-reduced-motion.
function OrbitalRings({ className = "" }) {
  return (
    <div className={`orbit-scene ${className}`} aria-hidden="true">
      <div className="orbit-core"></div>
      <div className="orbit-ring orbit-ring-1">
        <span className="orbit-sat orbit-sat-pink"></span>
      </div>
      <div className="orbit-ring orbit-ring-2">
        <span className="orbit-sat orbit-sat-violet"></span>
      </div>
      <div className="orbit-ring orbit-ring-3">
        <span className="orbit-sat orbit-sat-teal"></span>
      </div>
    </div>
  );
}

export default OrbitalRings;
