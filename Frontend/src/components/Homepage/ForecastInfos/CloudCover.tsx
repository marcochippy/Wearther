import React, { useMemo } from 'react';

type CloudCoverProps = {
  cloud: number; // 0–100
};

const clamp = (n: number, a = 0, b = 100) => Math.min(b, Math.max(a, n));

const CloudCover: React.FC<CloudCoverProps> = ({ cloud }) => {
  const cloudNumber = Math.round(cloud * 100);
  const pct = clamp(Number.isFinite(cloudNumber) ? cloudNumber : 0);

  const sky = `linear-gradient(to top,
  hsl(210, 80%, ${90 - pct * 0.24}%),
  hsl(210, 80%, ${70 - pct * 0.12}%)
)`;
  const veilOpacity = pct <= 40 ? 0 : Math.min(0.92, ((pct - 30) / 70) * 0.9);

  // Cloud count scales with pct (0–12 clouds)
  const cloudCount = Math.round((pct / 100) * 12);

  // Generate cloud parameters
  const clouds = useMemo(
    () =>
      Array.from({ length: cloudCount }, (_, i) => {
        const top = 0 + Math.random() * 70; // vertical position %
        const size = 40 + Math.random() * 60; // px
        const dur = 20 + Math.random() * 15;
        const delay = -Math.random() * dur;
        const opacity = 0.3 + (pct / 100) * 0.7; // more opaque when cloudy
        return { id: i, top, size, dur, delay, opacity };
      }),
    [cloudCount, pct]
  );

  return (
    <div className="relative w-full sm:w-50 h-20 sm:h-30 rounded-2xl overflow-hidden" style={{ background: sky }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'white', opacity: veilOpacity }} />
      {/* Clouds */}
      {clouds.map(c => (
        <div
          key={c.id}
          className="absolute cloud"
          style={{
            top: `${c.top}%`,
            // width/height
            width: c.size,
            height: c.size * 0.6,
            // use CSS var so keyframes can compute start/end correctly
            ['--cw' as any]: `${c.size}px`,
            left: 'calc(-1 * var(--cw))', // start fully off-canvas
            opacity: c.opacity,
            borderRadius: '50%',
            background: 'white',
            filter: 'blur(4px)',
            animationDuration: `${c.dur}s`,
            animationDelay: `${c.delay}s`
          }}
        >
          {/* add extra “puffs” inside to look more cloud-like */}
          <div
            style={{
              position: 'absolute',
              left: c.size * 0.2,
              top: -c.size * 0.15,
              width: c.size * 0.6,
              height: c.size * 0.6,
              borderRadius: '50%',
              background: 'white',
              filter: 'blur(4px)'
            }}
          />
        </div>
      ))}

      {/* Text overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-30 text-center pointer-events-none">
        <p className="text-lg sm:text-xl font-bold leading-tight">Cloud Cover</p>
        <p className="text-md">{pct}%</p>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes driftLR {
  from { left: calc(-1 * var(--cw)); }
  to   { left: calc(100% + var(--cw)); }
}

.cloud {
  animation-name: driftLR; /* or driftRL */
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-fill-mode: both;  /* important with negative delays */
  will-change: left;          /* or right for RL */
}


      `}</style>
    </div>
  );
};

export default CloudCover;
