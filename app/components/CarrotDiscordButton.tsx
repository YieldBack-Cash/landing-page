"use client";

import { motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BTN_SECONDARY, DISCORD_URL } from "./site";

type Carrot = { id: number; x: number; y: number; dx: number; rise: number; spin: number; size: number; delay: number };

// Join Discord, with a handful of carrots that pop out of the button and tumble down.
// Fires on hover as well as click: the link opens a new tab, so a click-only burst would
// play behind the tab the visitor just switched to. Skipped under reduced motion.
export default function CarrotDiscordButton() {
  const reduce = useReducedMotion();
  const [carrots, setCarrots] = useState<Carrot[]>([]);
  const last = useRef(0);
  const nextId = useRef(0);

  const burst = (el: HTMLElement) => {
    const now = performance.now();
    if (reduce || now - last.current < 1200) return; // one burst at a time, not one per wiggle
    last.current = now;
    const r = el.getBoundingClientRect();
    const batch = Array.from({ length: 20 }, () => ({
      id: nextId.current++,
      x: r.left + r.width * (0.2 + Math.random() * 0.6),
      y: r.top + r.height / 2,
      dx: (Math.random() - 0.5) * 360,
      rise: 90 + Math.random() * 150,
      spin: (Math.random() - 0.5) * 720,
      size: 22 + Math.random() * 14,
      delay: Math.random() * 0.15,
    }));
    setCarrots((c) => [...c, ...batch]);
    const ids = new Set(batch.map((c) => c.id));
    setTimeout(() => setCarrots((c) => c.filter((x) => !ids.has(x.id))), 2000);
  };

  return (
    <>
      <a
        href={DISCORD_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={BTN_SECONDARY}
        onPointerEnter={(e) => e.pointerType === "mouse" && burst(e.currentTarget)}
        onClick={(e) => burst(e.currentTarget)}
      >
        Join Discord
      </a>
      {carrots.length > 0 &&
        createPortal(
          <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
            {carrots.map((c) => (
              <motion.div
                key={c.id}
                className="absolute"
                style={{ left: c.x, top: c.y, width: c.size, marginLeft: -c.size / 2, marginTop: -c.size / 2 }}
                initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                // up out of the button, then gravity: ease out on the way up, ease in on the way down
                animate={{ x: [0, c.dx * 0.45, c.dx], y: [0, -c.rise, 520], rotate: [0, c.spin * 0.4, c.spin], opacity: [1, 1, 0] }}
                transition={{ duration: 1.5, delay: c.delay, times: [0, 0.3, 1], ease: ["easeOut", "easeIn"] }}
              >
                <CarrotIcon />
              </motion.div>
            ))}
          </div>,
          document.body,
        )}
    </>
  );
}

function CarrotIcon() {
  return (
    <svg viewBox="0 0 24 24" className="block w-full h-auto">
      <path d="M15 8.6c-.9-.6-2-.5-2.9.2L3.6 19.4c-.8 1 .1 2.3 1.2 1.7l10.6-6.3c1.8-1.2 1.9-4.8-.4-6.2Z" fill="#f28c28" />
      <path d="M8.4 15.2l1.4.9M10.8 12.3l1.5.9M12.9 13.9l-1 .5" stroke="#c4661a" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M15.2 8.4c-.6-2.2-.2-4.3 1.1-5.9M15.2 8.4c2-.9 4.2-.8 5.9.4M15.2 8.4c1.2-1.7 3.2-2.6 5.1-2.4" stroke="#7cb342" strokeWidth="1.7" strokeLinecap="round" fill="none" />
    </svg>
  );
}
