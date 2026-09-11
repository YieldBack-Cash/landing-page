"use client";

/*
 * Portions adapted from yui540/css-animations (https://github.com/yui540/css-animations)
 *
 * MIT License
 *
 * Copyright (c) 2026 yui540
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/*
 * Keyframes below are re-expressed for Motion from these files in that repo:
 *   2026-04-25/tips-1  masked word rise with a stretch     -> RiseWords / RiseH2
 *   2026-05-14/tips-4  headphones band drop (lock shackle) -> SHACKLE / LOCK_BODY
 *   2026-04-29/tips-1  scribble draw, then tail chases     -> scribble
 *   2026-04-29/tips-4  hop hop (squash, arc jump, land)    -> hop
 *   2026-06-09/tips-2  calm breathe                        -> .animate-breathe in globals.css
 */

import { motion, type useAnimate, type Transition, type Variants } from "motion/react";
import { Fragment, type ComponentProps, type ReactNode } from "react";

const loop = (duration: number, times: number[]): Transition => ({
  duration,
  times,
  repeat: Infinity,
  ease: "easeInOut",
});

/* 2026-04-25/tips-1: each word rises out of an overflow mask, stretching
   scale(.95, 1.15) at 60%. 0.55s ease-in-out, 0.1s stagger (left to right). */
const rise: Variants = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: ["110%", "-8%", "0%"],
    scaleX: [1, 0.95, 1],
    scaleY: [1, 1.15, 1],
    transition: { duration: 0.55, times: [0, 0.6, 1], ease: "easeInOut", delay: 0.1 * i },
  }),
};

/** One masked word. The padding gives the stretch and descenders room; the
 *  matching negative margins keep the line box unchanged. */
function RiseWord({ i, children }: { i: number; children: ReactNode }) {
  return (
    <span className="-mt-[0.3em] -mb-[0.15em] inline-block overflow-hidden pt-[0.3em] pb-[0.15em] align-bottom">
      <motion.span className="inline-block origin-bottom" custom={i} variants={rise}>
        {children}
      </motion.span>
    </span>
  );
}

/** Splits text into whole words (never letters). The heading carries the full
 *  text as aria-label, so screen readers get one clean name. */
export function RiseWords({ text, start = 0 }: { text: string; start?: number }) {
  return text.split(" ").map((w, i) => (
    <Fragment key={i}>
      {i > 0 && " "}
      <RiseWord i={start + i}>{w}</RiseWord>
    </Fragment>
  ));
}

/** A section h2 whose words rise once when it scrolls into view. */
export function RiseH2({ text, ...props }: { text: string } & ComponentProps<typeof motion.h2>) {
  return (
    <motion.h2
      aria-label={text}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      {...props}
    >
      <RiseWords text={text} />
    </motion.h2>
  );
}

/* 2026-05-14/tips-4 "headphones": the band drops onto the head, pinches, holds,
   lifts off; the head squashes. Here the band is a padlock shackle over a lock
   body. The original animates width/height; these are the scaleX/scaleY
   equivalents (compositor-only). Offsets are SVG units for a ~15-unit shackle. */
export const SHACKLE = {
  animate: { y: [-7.5, -7.5, 0.3, 0, 0, -7.8, -7.5, -7.5], scaleX: [1, 1, 0.774, 0.855, 0.855, 1, 1] },
  transition: {
    y: loop(3, [0, 0.0667, 0.1867, 0.2667, 0.7333, 0.8733, 0.9667, 1]),
    scaleX: loop(3, [0, 0.2667, 0.3867, 0.4667, 0.6, 0.7167, 1]),
  },
};
export const LOCK_BODY = {
  animate: { scaleX: [1, 1, 0.873, 0.909, 0.909, 1.036, 1, 1], scaleY: [1, 1, 1.1, 1.05, 1.05, 0.95, 1, 1] },
  transition: loop(3, [0, 0.3, 0.42, 0.5, 0.6, 0.7, 0.7667, 1]),
};

/* 2026-04-29/tips-1 "scribble": the stroke draws in while thickening from
   0.45x to full width, then the tail chases the head off the end and fades.
   The original's 1.2s draw + 0.1s hold + 1.2s clear, merged into one 2.6s loop
   (pathLength/pathOffset stand in for stroke-dasharray/dashoffset). */
export const scribble = (w: number) => ({
  animate: {
    pathLength: [0, 1, 1, 1, 1],
    pathOffset: [0, 0, 0, 1, 1],
    strokeWidth: [`${w * 0.45}px`, `${w}px`, `${w}px`, `${w}px`, `${w}px`],
    opacity: [0, 1, 1, 0, 0],
  },
  transition: {
    ...loop(2.6, [0, 0.46, 0.5, 0.96, 1]),
    repeatDelay: 0.9,
    opacity: { ...loop(2.6, [0, 0.046, 0.915, 0.96, 1]), repeatDelay: 0.9 },
  },
});

/* 2026-04-29/tips-4 "hop hop": anticipation squash on the wrapper, an arc jump
   on the coin 0.2s later (x eased across, y up to the peak and back), then a
   0.2s landing squash. `sel` holds a `.squash` wrapping a `.coin`. */
export function hop(
  animate: ReturnType<typeof useAnimate>[1],
  sel: string,
  x: number,
  peak: number,
  delay: number,
) {
  return Promise.all([
    animate(
      `${sel} .squash`,
      { scaleX: [1, 1.2, 0.8, 1], scaleY: [1, 0.7, 1.2, 1] },
      { duration: 0.6, times: [0, 0.2, 0.6, 1], ease: "easeInOut", delay },
    ),
    animate(`${sel} .coin`, { x, y: [0, peak, 0] }, { duration: 0.6, ease: "easeInOut", delay: delay + 0.2 }).then(() =>
      animate(`${sel} .coin`, { scaleX: [1, 1.2, 1], scaleY: [1, 0.7, 1] }, { duration: 0.2, ease: "easeOut" }),
    ),
  ]);
}
