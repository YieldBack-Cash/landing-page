"use client";

import { motion, useAnimate, useReducedMotion } from "motion/react";
import { useEffect, type ReactNode } from "react";
import { EASE, Reveal, useLoop } from "./motion";
import { hop, LOCK_BODY, RiseH2, scribble, SHACKLE } from "./yuiMotions";

const STEPS: { title: string; body: string; visual: () => ReactNode; className: string }[] = [
  {
    title: "Pick a market",
    body: "Each market wraps a yield-bearing vault, like Blend's XLM lending pool, until a fixed maturity date. Its yield is split into two tradable tokens, PT and YT.",
    visual: MarketVisual,
    className: "lg:col-span-2",
  },
  {
    title: "Lock a fixed yield with PT",
    body: "PT is bought at a discount, and each one redeems for 1 of the underlying asset at maturity. That difference is your yield, locked in upfront regardless of market movement.",
    visual: LockVisual,
    className: "lg:col-span-2",
  },
  {
    title: "Or trade the yield with YT",
    body: "YT gives you all the variable yield until maturity, then its value decays to zero. If the underlying APY drops below the implied APY, you may receive less than expected.",
    visual: DecayVisual,
    className: "lg:col-span-2",
  },
  {
    title: "Hold to maturity, or exit anytime",
    body: "At maturity, redeem PT for full value and claim YT yield from Positions. Selling before maturity uses the current market price, which may be below face value.",
    visual: TimelineVisual,
    className: "lg:col-span-3",
  },
  {
    title: "Split and combine",
    body: "Split deposits your asset into the vault and mints a matched pair of PT and YT, with no trade against the pool. Combine burns an equal amount of PT and YT to redeem the underlying directly.",
    visual: SplitVisual,
    className: "md:col-span-2 lg:col-span-3",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="px-5 py-20 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-3xl">
          <p className="text-sm font-medium text-lime">How it works</p>
          <RiseH2
            id="how-title"
            className="mt-3 text-4xl font-extrabold tracking-tight text-balance md:text-6xl"
            text="Split the yield. Keep the part you want."
          />
          <p className="mt-5 text-lg text-soft md:text-xl">
            Every market splits a vault&apos;s yield into a fixed leg and a variable leg, and each
            one trades on its own.
          </p>
        </Reveal>

        <ol className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {STEPS.map(({ title, body, visual: Visual, className }, i) => (
            <motion.li
              key={title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, delay: (i < 3 ? i : i - 3) * 0.12, ease: EASE }}
              className={`flex flex-col overflow-hidden rounded-3xl border border-line bg-surface ${className}`}
            >
              <div aria-hidden className="flex h-44 items-center justify-center border-b border-line bg-bg/50 px-4">
                <Visual />
              </div>
              <div className="p-6">
                <p className="text-sm font-medium text-lime">0{i + 1}</p>
                <h3 className="mt-2 text-xl font-extrabold">{title}</h3>
                <p className="mt-2 leading-relaxed text-soft">{body}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const svgProps = { viewBox: "0 0 320 160", className: "h-full max-h-40 w-full max-w-md" };

/* 01: vault + maturity = market */
function MarketVisual() {
  const loop = useLoop();
  return (
    <svg {...svgProps}>
      <rect x="16" y="20" width="124" height="48" rx="12" className="fill-surface stroke-line" />
      <text x="78" y="41" textAnchor="middle" fontSize="13" className="fill-ink font-medium">Vault</text>
      <text x="78" y="58" textAnchor="middle" fontSize="11" className="fill-soft">e.g. Blend XLM pool</text>
      <text x="160" y="50" textAnchor="middle" fontSize="18" className="fill-soft">+</text>
      <rect x="180" y="20" width="124" height="48" rx="12" className="fill-surface stroke-line" />
      <text x="242" y="41" textAnchor="middle" fontSize="13" className="fill-ink font-medium">Maturity</text>
      <text x="242" y="58" textAnchor="middle" fontSize="11" className="fill-soft">a fixed date</text>
      <path d="M78 68 V88 Q78 98 88 98 H150 M242 68 V88 Q242 98 232 98 H170" fill="none" className="stroke-line-strong" />
      <path d="M160 98 V106" className="stroke-line-strong" />
      <motion.rect
        x="100"
        y="106"
        width="120"
        height="40"
        rx="12"
        className="fill-lime/10 stroke-lime"
        {...loop({ opacity: [0.55, 1, 0.55] }, 3.2)}
      />
      <text x="160" y="131" textAnchor="middle" fontSize="13" className="fill-lime font-medium">Market</text>
      <motion.circle r="3.5" cx="78" cy="68" className="fill-lime" style={{ opacity: 0 }} {...loop({ cy: [68, 98, 98], cx: [78, 78, 150], opacity: [0, 1, 0] }, 3.2, { ease: "linear" })} />
      <motion.circle r="3.5" cx="242" cy="68" className="fill-lime" style={{ opacity: 0 }} {...loop({ cy: [68, 98, 98], cx: [242, 242, 170], opacity: [0, 1, 0] }, 3.2, { ease: "linear" })} />
    </svg>
  );
}

/* 02: a PT token with a lock, bought below 1 and redeemed at 1 */
function LockVisual() {
  const loop = useLoop();
  return (
    <svg {...svgProps}>
      <rect x="96" y="14" width="128" height="72" rx="16" className="fill-surface stroke-lime/50" />
      <text x="120" y="60" fontSize="26" className="fill-lime font-extrabold">PT</text>
      {/* shackle drops, pinches shut, holds, lifts (static = locked) */}
      <motion.path
        d="M181 44 v-8 a7 7 0 0 1 14 0 v8"
        fill="none"
        strokeWidth="3"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        className="stroke-lime"
        {...loop(SHACKLE.animate, 3, SHACKLE.transition)}
      />
      <motion.rect
        x="175"
        y="40"
        width="26"
        height="22"
        rx="5"
        className="fill-lime"
        {...loop(LOCK_BODY.animate, 3, LOCK_BODY.transition)}
      />
      <line x1="40" y1="118" x2="280" y2="118" strokeWidth="6" strokeLinecap="round" className="stroke-line" />
      <motion.line
        x1="40"
        y1="118"
        x2="280"
        y2="118"
        strokeWidth="6"
        strokeLinecap="round"
        className="stroke-lime"
        {...loop({ pathLength: [0, 1, 1] }, 3, { times: [0, 0.7, 1] })}
      />
      <text x="40" y="146" fontSize="11" className="fill-soft">Buy below 1</text>
      <text x="280" y="146" fontSize="11" textAnchor="end" className="fill-soft">1 PT → 1 at maturity</text>
    </svg>
  );
}

/* 03: YT value decays to zero at maturity */
function DecayVisual() {
  const loop = useLoop();
  const d = "M20 30 C 50 26, 70 50, 100 48 S 140 72, 170 76 S 220 104, 250 118 S 285 134, 296 136";
  const yt = scribble(2.5);
  return (
    <svg {...svgProps}>
      <text x="20" y="18" fontSize="11" className="fill-soft">YT value</text>
      <line x1="20" y1="136" x2="300" y2="136" className="stroke-line-strong" />
      <line x1="296" y1="20" x2="296" y2="136" strokeDasharray="3 5" className="stroke-line-strong" />
      <text x="20" y="154" fontSize="11" className="fill-soft">Today</text>
      <text x="300" y="154" fontSize="11" textAnchor="end" className="fill-soft">Maturity · 0</text>
      <path d={`${d} L296 136 L20 136 Z`} className="fill-yt/10" />
      {/* drawn in, then the tail chases it down to zero */}
      <motion.path
        d={d}
        fill="none"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="stroke-yt"
        {...loop(yt.animate, 2.6, yt.transition)}
      />
    </svg>
  );
}

/* 04: today -> maturity, exit anytime on the way */
function TimelineVisual() {
  const loop = useLoop();
  return (
    <svg {...svgProps}>
      <line x1="30" y1="78" x2="290" y2="78" strokeWidth="3" strokeLinecap="round" className="stroke-line" />
      <line x1="160" y1="70" x2="160" y2="86" strokeWidth="2" className="stroke-line-strong" />
      <text x="160" y="56" fontSize="11" textAnchor="middle" className="fill-soft">Exit anytime at market price</text>
      <circle cx="30" cy="78" r="6" className="fill-ink" />
      <circle cx="290" cy="78" r="8" className="fill-surface stroke-lime" strokeWidth="2" />
      <motion.circle
        cx="30"
        cy="78"
        r="6"
        className="fill-lime"
        {...loop({ x: [0, 260, 260], opacity: [1, 1, 0] }, 5, { times: [0, 0.8, 1] })}
      />
      <text x="30" y="106" fontSize="11" className="fill-soft">Today</text>
      <text x="290" y="106" fontSize="11" textAnchor="end" className="fill-soft">Maturity</text>
      <rect x="110" y="122" width="82" height="24" rx="12" className="fill-lime/15" />
      <text x="151" y="138" fontSize="11" textAnchor="middle" className="fill-lime font-medium">Redeem PT</text>
      <rect x="198" y="122" width="104" height="24" rx="12" className="fill-yt/15" />
      <text x="250" y="138" fontSize="11" textAnchor="middle" className="fill-yt font-medium">Claim YT yield</text>
    </svg>
  );
}

/* 05: PT and YT hop out of V (split), then hop back in (combine).
   Static layout (reduced motion) is the split state. */
function SplitVisual() {
  const reduce = useReducedMotion();
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (reduce) return;
    let alive = true;
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const label = (split: boolean) => {
      animate(".l-split", { opacity: split ? 1 : 0 }, { duration: 0.3 });
      animate(".l-combine", { opacity: split ? 0 : 1 }, { duration: 0.3 });
    };
    (async () => {
      // start stacked behind V
      animate(".pt .coin", { x: 80 }, { duration: 0 });
      animate(".yt .coin", { x: -80 }, { duration: 0 });
      await wait(600);
      while (alive) {
        label(true);
        animate(".v", { opacity: 0.35 }, { duration: 0.4, delay: 0.2 });
        await Promise.all([hop(animate, ".pt", 0, -28, 0), hop(animate, ".yt", 0, -40, 0.15)]);
        await wait(1100);
        if (!alive) break;
        label(false);
        // V is solid again by the time the coins land, so they merge behind it
        animate(".v", { opacity: 1 }, { duration: 0.3, delay: 0.4 });
        await Promise.all([hop(animate, ".pt", 80, -28, 0), hop(animate, ".yt", -80, -40, 0.15)]);
        await wait(1100);
      }
    })();
    return () => {
      alive = false;
    };
  }, [reduce, animate]);

  const bottom = { originY: 1 } as const;
  return (
    <svg {...svgProps} ref={scope}>
      <g className="pt">
        <motion.g className="squash" style={bottom}>
          <motion.g className="coin" style={bottom}>
            <circle cx="80" cy="70" r="26" className="fill-lime/15 stroke-lime" />
            <text x="80" y="76" fontSize="15" textAnchor="middle" className="fill-lime font-extrabold">PT</text>
          </motion.g>
        </motion.g>
      </g>
      <g className="yt">
        <motion.g className="squash" style={bottom}>
          <motion.g className="coin" style={bottom}>
            <circle cx="240" cy="70" r="26" className="fill-yt/15 stroke-yt" />
            <text x="240" y="76" fontSize="15" textAnchor="middle" className="fill-yt font-extrabold">YT</text>
          </motion.g>
        </motion.g>
      </g>
      <g className="v">
        <circle cx="160" cy="70" r="30" className="fill-surface stroke-line-strong" />
        <text x="160" y="76" fontSize="16" textAnchor="middle" className="fill-ink font-extrabold">V</text>
      </g>
      <text x="160" y="136" fontSize="12" textAnchor="middle" className="l-split fill-soft">
        Split: V → PT + YT
      </text>
      <text x="160" y="136" fontSize="12" textAnchor="middle" className="l-combine fill-soft" opacity="0">
        Combine: PT + YT → V
      </text>
    </svg>
  );
}
