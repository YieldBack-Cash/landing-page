"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { bodyAtTime } from "./motion";
import { originalFarEarPath } from "./far-ear";
import styles from "./bunny.module.css";

// Use one clock for the SVG contour and CSS tracks, at the approved 2x speed.
const timelineDuration = 6000;
const playbackRate = 2;
const jumpStart = 1800;

export default function AnimatedBunny() {
  const [time, setTime] = useState(0);
  const [replay, setReplay] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let start: number | undefined;
    const offset = replay > 0 ? jumpStart : 0;

    const stop = () => { cancelAnimationFrame(frame); };
    const tick = (now: number) => {
      start ??= now;
      const position = Math.min(timelineDuration, offset + (now - start) * playbackRate);
      setTime(position);
      if (position < timelineDuration) frame = requestAnimationFrame(tick);
    };
    const play = () => {
      stop();
      setReducedMotion(preference.matches);
      setTime(preference.matches ? 0 : offset);
      start = undefined;
      if (!preference.matches) {
        frame = requestAnimationFrame(tick);
      }
    };
    play();
    preference.addEventListener("change", play);
    return () => { stop(); preference.removeEventListener("change", play); };
  }, [replay]);

  return <button
    type="button"
    className={styles.logo}
    aria-label={reducedMotion ? "YieldBackCash" : "YieldBackCash — replay bunny jump"}
    title={reducedMotion ? "YieldBackCash" : "Replay bunny jump"}
    disabled={reducedMotion}
    onClick={() => { setTime(jumpStart); setReplay(value => value + 1); }}
    style={{ "--time": `${time}ms` } as CSSProperties}
  >
    <svg viewBox="0 0 240 200" className={styles.canvas} aria-hidden="true" focusable="false">
      <ellipse className={styles.shadow} cx="120" cy="182" rx="60" ry="5" />
      <g className={styles.jump} fill="var(--dash-accent)">
        <g className={styles.head}>
          <path d={bodyAtTime(time)} />
          <path className={styles.farEar} d={originalFarEarPath} />
          <path className={styles.nearEar} d="M856 252 C794 144 579 22 510 35 C439 45 486 134 561 192 L723 302Z" />
          <circle cx="99" cy="780" r="63" />
          <ellipse className={styles.eye} cx="734" cy="363" rx="46" ry="44" fill="var(--dash-background)" />
        </g>
      </g>
    </svg>
  </button>;
}
