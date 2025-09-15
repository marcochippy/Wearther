import React, { useMemo } from 'react';

type RainInfoProps = { rain: any };
const clamp = (n: number, a = 0, b = 100) => Math.min(b, Math.max(a, n));

const RainInfo: React.FC<RainInfoProps> = ({ rain }) => {
  const rainNumber = Math.round(rain.precipProbability * 100);
  const pct = clamp(Number.isFinite(rainNumber) ? rainNumber : 0);

  // Droplets scale with intensity (0..60)
  const dropCount = pct <= 50 ? 0 : Math.round(((pct - 50) / 50) * 80);

  // Umbrellas only in deluge
  const showUmbrellas = pct > 60;

  const low = pct < 61;

  // Raindrops (regen when count changes)
  const drops = useMemo(
    () =>
      Array.from({ length: dropCount }, (_, i) => {
        const leftPct = 2 + Math.random() * 96; // %
        const w = 2 + Math.random() * 3; // px
        const h = w * (2.1 + Math.random() * 0.7); // px
        const dur = 1.1 + Math.random() * 1.6; // s
        const delay = Math.random() * 2.0; // s
        const opacity = 0.35 + Math.random() * 0.55;
        return { id: i, leftPct, w, h, dur, delay, opacity };
      }),
    [dropCount]
  );

  // Five umbrellas, alternating directions, large size
  // Only top ~50% visible -> hide 50% below the bottom.
  const umbrellas = useMemo(() => {
    const palette = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'];
    if (!showUmbrellas) return [];
    return Array.from({ length: 5 }, (_, i) => {
      const dir: 'ltr' | 'rtl' = i % 2 === 0 ? 'ltr' : 'rtl';
      const width = 96 + Math.round(Math.random() * 28); // 96–124px
      const height = width; // square-ish
      const dur = 8 + Math.random() * 6; // 8–14s traverse
      const delay = Math.random() * 3; // 0–3s stagger
      const bobDur = 0.4 + Math.random() * 1.2;
      const hiddenRatio = 0.5; // <-- you set this to 0.5
      const hiddenPart = Math.round(height * hiddenRatio);
      const color = palette[Math.floor(Math.random() * palette.length)];
      return { id: i, dir, width, height, dur, delay, bobDur, hiddenPart, color };
    });
  }, [showUmbrellas]);

  return (
    <div
      className="relative w-full sm:w-50 h-20 sm:h-30 rounded-2xl bg-white overflow-hidden select-none"
      aria-label={`Rain ${pct}%`}
    >
      {/* Text overlay */}
      <div
        className={`absolute z-30 text-center pointer-events-none ${
          low ? 'inset-0 flex flex-col items-center justify-center' : 'top-2 left-1/2 -translate-x-1/2'
        }`}
      >
        <p className="text-lg sm:text-xl font-bold leading-tight capitalize">{rain.precipType}</p>
        <p className="text-md">{pct}%</p>
      </div>

      {/* Raindrops */}
      {drops.map(d => (
        <span
          key={d.id}
          className="absolute raindrop z-20"
          style={{
            left: `${d.leftPct}%`,
            top: -24, // start above the top edge
            width: d.w,
            height: d.h,
            opacity: d.opacity,
            animationDuration: `${d.dur}s`,
            animationDelay: `${d.delay}s`
          }}
          aria-hidden
        />
      ))}

      {/* Umbrellas: start fully off-canvas, traverse, then exit off-canvas */}
      {umbrellas.map(u => {
        // CSS custom props let keyframes know the pixel width so they start outside.
        const baseStyle: React.CSSProperties & Record<string, string | number> = {
          // show only the top ~50%
          bottom: -u.hiddenPart,
          // traversal timing
          animationDuration: `${u.dur}s`,
          animationDelay: `${u.delay}s`,
          // per-element vars
          ['--uw' as any]: `${u.width}px`, // umbrella width in px
          ['--start-left' as any]: `calc(-1 * var(--uw))`, // off-screen left
          ['--end-left' as any]: `calc(100% + var(--uw))`, // off-screen right
          ['--start-right' as any]: `calc(-1 * var(--uw))`, // off-screen right (for rtl keyframes)
          ['--end-right' as any]: `calc(100% + var(--uw))`
        };

        return (
          <div
            key={u.id}
            className={`absolute z-10 ${u.dir === 'ltr' ? 'umbra-ltr' : 'umbra-rtl'}`}
            style={{
              ...baseStyle,
              // also set starting position so during animation delay they stay off-canvas
              ...(u.dir === 'ltr'
                ? { left: 'calc(-1 * var(--uw))' }
                : { right: 'calc(-1 * var(--uw))', transform: 'scaleX(-1)' })
            }}
            aria-hidden
          >
            <svg
              viewBox="0 0 64 64"
              width={u.width}
              height={u.height}
              className="umbrella-bob"
              style={{ animationDuration: `${u.bobDur}s` }}
            >
              {/* Canopy */}
              <path d="M8 32 Q32 10 56 32 Q48 30 40 32 Q32 30 24 32 Q16 30 8 32 Z" fill={u.color} />
              {/* Ribs */}
              <path d="M8 32 C16 24 48 24 56 32" stroke="white" strokeWidth="2" opacity="0.6" fill="none" />
              {/* Scallops */}
              <path
                d="M12 32 q4 6 8 0 M24 32 q4 6 8 0 M36 32 q4 6 8 0 M48 32 q4 6 8 0"
                stroke="white"
                strokeWidth="2"
                fill="none"
                opacity="0.75"
              />
              {/* Stick + hook */}
              <path d="M32 32 V52" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />
              <path d="M32 52 q0 8 -6 8" stroke="#1f2937" strokeWidth="3" fill="none" strokeLinecap="round" />
            </svg>
          </div>
        );
      })}

      {/* Styles */}
      <style>{`
        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .raindrop, .umbra-ltr, .umbra-rtl, .umbrella-bob { animation: none !important; }
        }

        /* Raindrops */
        .raindrop {
          position: absolute;
          background: linear-gradient(to bottom, rgba(147,197,253,0.95), rgba(59,130,246,0.95));
          border-radius: 9999px;
          filter: drop-shadow(0 1px 0 rgba(59,130,246,0.4));
          animation-name: dropFall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: top;
        }
        @keyframes dropFall {
          0%   { top: -24px; }
          100% { top: calc(100% + 48px); }
        }

        /* Umbrella traverse:
           Use custom props so start/end are guaranteed off-canvas by their pixel width. */
        .umbra-ltr {
          animation-name: walkRight;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: left;
        }
        .umbra-rtl {
          animation-name: walkLeft;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: right;
        }
        @keyframes walkRight {
          0%   { left: var(--start-left); }
          100% { left: var(--end-left); }
        }
        @keyframes walkLeft {
          0%   { right: var(--start-right); }
          100% { right: var(--end-right); }
        }

        /* Gentle bobbing (on the SVG, so it doesn't conflict with container positioning) */
        .umbrella-bob {
          animation-name: bob;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          will-change: transform;
        }
        @keyframes bob {
          0%   { transform: translateY(0); }
          50%  { transform: translateY(-6px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default RainInfo;
