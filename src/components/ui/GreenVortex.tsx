import React from 'react';

interface GreenVortexProps {
  size?: number;
  className?: string;
}

export const GreenVortex: React.FC<GreenVortexProps> = ({ size = 96, className = '' }) => {
  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Background ambient halo */}
      <div
        className="absolute inset-0 rounded-full blur-xl opacity-60 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(34,197,94,0.45) 0%, rgba(22,101,52,0.15) 60%, transparent 80%)',
        }}
      />

      {/* SVG Layered Glowing Rings & Vortex */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 filter drop-shadow-[0_0_12px_rgba(34,197,94,0.7)]"
      >
        <defs>
          <linearGradient id="vortexGrad1" x1="10" y1="10" x2="110" y2="110" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="50%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#14532d" />
          </linearGradient>
          <linearGradient id="vortexGrad2" x1="110" y1="10" x2="10" y2="110" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#86efac" />
            <stop offset="60%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#052e16" />
          </linearGradient>
          <radialGradient id="centerGlow" cx="60" cy="60" r="30" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#052e16" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#14532d" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#050806" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Center Void */}
        <circle cx="60" cy="60" r="26" fill="url(#centerGlow)" />

        {/* Outer orbital swirl 1 */}
        <path
          d="M60 12 C88 12, 108 32, 108 60 C108 78, 96 98, 76 105 C60 110, 36 104, 25 88 C16 74, 18 50, 29 36 C38 24, 52 18, 66 18"
          stroke="url(#vortexGrad1)"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeDasharray="180 30"
          className="origin-center"
        />

        {/* Mid swirl 2 */}
        <path
          d="M60 22 C82 22, 98 38, 98 60 C98 75, 87 90, 71 95 C57 100, 38 94, 30 81 C22 70, 25 50, 34 39 C41 30, 52 26, 64 26"
          stroke="url(#vortexGrad2)"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeDasharray="140 24"
          className="origin-center"
        />

        {/* Inner bright spiral arc */}
        <path
          d="M60 32 C75 32, 88 44, 88 60 C88 72, 79 82, 67 86 C56 90, 42 85, 36 74 C30 65, 33 49, 41 41 C47 34, 55 33, 63 34"
          stroke="#4ade80"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="100 20"
        />

        {/* Dynamic bright swirl accent */}
        <path
          d="M60 40 C70 40, 79 49, 79 60 C79 69, 72 76, 63 79 C55 81, 46 77, 42 70 C38 63, 41 53, 47 47 C52 42, 57 41, 62 42"
          stroke="#bbf7d0"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Glowing orbiting point */}
        <circle cx="86" cy="46" r="2.5" fill="#ffffff" className="filter drop-shadow-[0_0_6px_#4ade80]" />
        <circle cx="34" cy="74" r="2" fill="#86efac" />
        <circle cx="60" cy="60" r="14" fill="#040905" stroke="#22c55e" strokeWidth="1.5" strokeOpacity="0.4" />
      </svg>
    </div>
  );
};
