"use client";

import { useEffect, useRef, useState } from "react";
import { bunnyBody } from "./bunny/motion";
import { originalFarEarPath } from "./bunny/far-ear";
import styles from "./bunnyMeadow.module.css";

// Deterministic "random" (same on server and client, so no hydration mismatch).
function seeded(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

const GREENS = ["#3b5320", "#465f22", "#51702a", "#5d7f2f"];

type Blade = { d: string; color: string; width: number; sway: string; delay: string; lean: string };

function makeBlades(count: number, maxHeight: number, seed: number): Blade[] {
  const rand = seeded(seed);
  return Array.from({ length: count }, (_, i) => {
    const x = (i / count) * 1600 + rand() * 12;
    const h = maxHeight * (0.45 + rand() * 0.55);
    const bend = (rand() - 0.5) * 16;
    return {
      d: `M${x.toFixed(1)} 80 Q${(x + bend).toFixed(1)} ${(80 - h * 0.55).toFixed(1)} ${(x + bend * 1.6).toFixed(1)} ${(80 - h).toFixed(1)}`,
      color: GREENS[Math.floor(rand() * GREENS.length)],
      width: 2.5 + rand() * 2,
      sway: `${(2.8 + rand() * 2.4).toFixed(2)}s`,
      delay: `${(-rand() * 4).toFixed(2)}s`,
      lean: `${((rand() - 0.5) * 10).toFixed(1)}deg`,
    };
  });
}

const BACK = makeBlades(190, 70, 7);
const FRONT = makeBlades(70, 28, 21);
const FLOWERS = [180, 520, 790, 1130, 1420].map((x, i) => ({ x, y: 80 - (30 + (i % 3) * 9) }));

function GrassLayer({ blades, className, flowers = false }: { blades: Blade[]; className: string; flowers?: boolean }) {
  return (
    <svg viewBox="0 0 1600 80" preserveAspectRatio="xMidYMax slice" className={className} aria-hidden="true">
      {blades.map((b, i) => (
        <path
          key={i}
          d={b.d}
          className={styles.blade}
          stroke={b.color}
          strokeWidth={b.width}
          strokeLinecap="round"
          fill="none"
          style={{ ["--sway" as string]: b.sway, ["--delay" as string]: b.delay, ["--lean" as string]: b.lean }}
        />
      ))}
      {flowers &&
        FLOWERS.map((f) => (
          <g key={f.x}>
            <path d={`M${f.x} 80 L${f.x} ${f.y}`} stroke="#51702a" strokeWidth={2} />
            <circle cx={f.x} cy={f.y} r={5} fill="var(--dash-accent)" />
            <circle cx={f.x} cy={f.y} r={1.8} fill="#3b5320" />
          </g>
        ))}
    </svg>
  );
}

// The bottom of the landing page: the bunny hops across a strip of swaying grass.
// Decorative only (aria-hidden). Paused while off-screen; still under reduced motion.
export default function BunnyMeadow() {
  const ref = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setPlaying(entry.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={styles.meadow} data-playing={playing} aria-hidden="true">
      <GrassLayer blades={BACK} className={styles.grass} flowers />
      <div className={styles.runner}>
        <div className={styles.shadow} />
        <div className={styles.hopper}>
          {/* same art and framing as the team's AnimatedBunny (viewBox 240×200, art scaled by .16) */}
          <svg viewBox="0 0 240 200" className="block w-full h-auto overflow-visible">
            <g fill="var(--dash-accent)" transform="translate(40 20) scale(.16)">
              <path d={bunnyBody} />
              <path className={styles.farEar} d={originalFarEarPath} />
              <path className={styles.nearEar} d="M856 252 C794 144 579 22 510 35 C439 45 486 134 561 192 L723 302Z" />
              <circle cx="99" cy="780" r="63" />
              <ellipse className={styles.eye} cx="734" cy="363" rx="46" ry="44" fill="var(--dash-background)" />
            </g>
          </svg>
        </div>
      </div>
      <GrassLayer blades={FRONT} className={`${styles.grass} ${styles.grassFront}`} />
    </div>
  );
}
