import React from 'react';

export function AbsoluteSymbol({ className = "w-6 h-6", glow = true }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${glow ? 'drop-shadow-[0_0_12px_rgba(0,229,255,0.8)]' : ''}`}
    >
      <defs>
        <linearGradient id="absGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00E5FF" />
          <stop offset="50%" stopColor="#7B61FF" />
          <stop offset="100%" stopColor="#FF9FFC" />
        </linearGradient>
        <linearGradient id="absGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF9FFC" />
          <stop offset="50%" stopColor="#4F8CFF" />
          <stop offset="100%" stopColor="#00E5FF" />
        </linearGradient>
        <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00E5FF" stopOpacity="1" />
          <stop offset="50%" stopColor="#7B61FF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Outer Hexagonal Tech Ring */}
      <polygon
        points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"
        stroke="url(#absGrad1)"
        strokeWidth="3"
        strokeLinejoin="round"
        opacity="0.85"
      />

      {/* Inner Inverted Hexagon */}
      <polygon
        points="50,18 78,34 78,66 50,82 22,66 22,34"
        stroke="url(#absGrad2)"
        strokeWidth="2.5"
        strokeDasharray="4 2"
        opacity="0.7"
      />

      {/* Absolute Symbol Interlocking Infinity Triangles */}
      <path
        d="M50 22 L75 68 L25 68 Z"
        stroke="url(#absGrad1)"
        strokeWidth="3.5"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M50 78 L25 32 L75 32 Z"
        stroke="url(#absGrad2)"
        strokeWidth="3.5"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Center Quantum Core Nucleus */}
      <circle cx="50" cy="50" r="14" fill="url(#coreGlow)" />
      <circle cx="50" cy="50" r="6" fill="#FFFFFF" />

      {/* Crosshair Tech Accents */}
      <line x1="50" y1="5" x2="50" y2="18" stroke="#00E5FF" strokeWidth="2" />
      <line x1="50" y1="82" x2="50" y2="95" stroke="#FF9FFC" strokeWidth="2" />
      <line x1="10" y1="50" x2="22" y2="50" stroke="#7B61FF" strokeWidth="2" />
      <line x1="78" y1="50" x2="90" y2="50" stroke="#00E5FF" strokeWidth="2" />
    </svg>
  );
}

export default AbsoluteSymbol;
