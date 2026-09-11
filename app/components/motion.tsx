"use client";

import {
  MotionConfig,
  motion,
  useReducedMotion,
  type TargetAndTransition,
  type Transition,
} from "motion/react";
import type { ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

export function MotionRoot({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** Fade + slide up once when scrolled into view. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Props for a slow infinite loop, or nothing when the viewer prefers reduced
 * motion, so the element just shows its static attributes/styles.
 */
export function useLoop() {
  const reduce = useReducedMotion();
  return (animate: TargetAndTransition, duration: number, opts: Transition = {}) =>
    reduce
      ? {}
      : { animate, transition: { duration, repeat: Infinity, ease: "easeInOut", ...opts } as Transition };
}
