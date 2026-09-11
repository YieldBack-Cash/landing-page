"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { EASE, Reveal, useLoop } from "./motion";
import { RiseH2 } from "./yuiMotions";

const FEATURES: { title: string; body: string; visual: () => ReactNode }[] = [
  {
    title: "Fixed yield (PT)",
    body: "Buy PT at a discount and hold it to maturity. Each PT redeems for 1 of the underlying asset, so your rate is locked in upfront.",
    visual: FixedVisual,
  },
  {
    title: "Leveraged yield (YT)",
    body: "YT collects all the variable yield until maturity, so it buys exposure to the yield of a much larger position. Its value decays to zero at maturity.",
    visual: LeverVisual,
  },
  {
    title: "Provide liquidity",
    body: "Each market's AMM pairs PT with vault shares. LPs earn the pool's trading fee, minus the protocol's reserve cut.",
    visual: PoolVisual,
  },
  {
    title: "Built on Stellar & Blend",
    body: "Smart contracts on Stellar. Markets wrap yield-bearing vaults such as Blend's XLM lending pool, and each market is isolated from every other.",
    visual: StackVisual,
  },
];

export default function FeatureGrid() {
  return (
    <section aria-labelledby="features-title" className="px-5 py-20 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-3xl">
          <RiseH2
            id="features-title"
            className="text-4xl font-extrabold tracking-tight text-balance md:text-6xl"
            text="Pick your side of the rate."
          />
          <p className="mt-5 text-lg text-soft md:text-xl">
            Fix it, lever it, or earn fees by making the market.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {FEATURES.map(({ title, body, visual: Visual }, i) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, delay: (i % 2) * 0.12, ease: EASE }}
              className="flex flex-col overflow-hidden rounded-3xl border border-line bg-surface p-6 md:p-8"
            >
              <div aria-hidden className="flex h-36 items-center justify-center rounded-2xl border border-line bg-bg/50 px-4">
                <Visual />
              </div>
              <h3 className="mt-6 text-2xl font-extrabold">{title}</h3>
              <p className="mt-2 leading-relaxed text-soft">{body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

const svgProps = { viewBox: "0 0 320 120", className: "h-full max-h-32 w-full max-w-sm" };

/* flat fixed line over a drifting variable rate */
function FixedVisual() {
  const loop = useLoop();
  const wave = "M0 76 q20 -22 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0";
  return (
    <svg {...svgProps}>
      <defs>
        <clipPath id="fixed-clip">
          <rect x="20" y="0" width="280" height="120" />
        </clipPath>
      </defs>
      <g clipPath="url(#fixed-clip)">
        <motion.path d={wave} fill="none" strokeWidth="2" className="stroke-line-strong" {...loop({ x: [0, -80] }, 6, { ease: "linear" })} />
      </g>
      <line x1="20" y1="44" x2="300" y2="44" strokeWidth="3" strokeLinecap="round" className="stroke-lime" />
      <text x="20" y="30" fontSize="12" className="fill-lime font-medium">Fixed with PT</text>
      <text x="20" y="112" fontSize="12" className="fill-soft">Variable rate</text>
    </svg>
  );
}

/* a small YT stake vs the larger position whose yield it collects */
function LeverVisual() {
  const loop = useLoop();
  return (
    <svg {...svgProps}>
      <text x="20" y="28" fontSize="12" className="fill-soft">YT price</text>
      <rect x="20" y="36" width="44" height="14" rx="7" className="fill-yt" />
      <text x="20" y="80" fontSize="12" className="fill-soft">Position it earns yield on</text>
      <rect x="20" y="88" width="280" height="14" rx="7" className="fill-yt/20" />
      <motion.rect
        x="20"
        y="88"
        width="280"
        height="14"
        rx="7"
        className="fill-yt"
        style={{ originX: 0 }}
        {...loop({ scaleX: [0.16, 1, 1], opacity: [1, 1, 0.4] }, 5, { times: [0, 0.6, 1] })}
      />
    </svg>
  );
}

/* PT + vault shares in one pool, fees flowing to LPs */
function PoolVisual() {
  const loop = useLoop();
  return (
    <svg {...svgProps}>
      <rect x="40" y="46" width="170" height="62" rx="16" className="fill-surface stroke-line-strong" />
      <text x="54" y="64" fontSize="11" className="fill-soft">AMM pool</text>
      <rect x="54" y="72" width="64" height="26" rx="13" className="fill-lime/15" />
      <text x="86" y="89" fontSize="12" textAnchor="middle" className="fill-lime font-medium">PT</text>
      <text x="125" y="90" fontSize="12" textAnchor="middle" className="fill-soft">⇄</text>
      <rect x="132" y="72" width="64" height="26" rx="13" className="fill-line" />
      <text x="164" y="89" fontSize="12" textAnchor="middle" className="fill-ink font-medium">Vault</text>
      <rect x="236" y="14" width="64" height="30" rx="15" className="fill-surface stroke-lime/60" />
      <text x="268" y="33" fontSize="12" textAnchor="middle" className="fill-lime font-medium">LPs</text>
      <text x="262" y="100" fontSize="11" textAnchor="middle" className="fill-soft">trading fee</text>
      {[0, 1.2, 2.4].map((delay) => (
        <motion.circle
          key={delay}
          r="4"
          cx="210"
          cy="78"
          className="fill-lime"
          style={{ opacity: 0 }}
          {...loop({ cx: [210, 268], cy: [78, 46], opacity: [0, 1, 0] }, 3.6, { delay, ease: "easeOut" })}
        />
      ))}
    </svg>
  );
}

/* router -> isolated market contracts -> vault */
function StackVisual() {
  const loop = useLoop();
  const chips = ["Yield manager", "AMM", "PT", "YT"];
  return (
    <svg {...svgProps}>
      <rect x="120" y="4" width="80" height="24" rx="12" className="fill-surface stroke-line-strong" />
      <text x="160" y="20" fontSize="11" textAnchor="middle" className="fill-ink">Router</text>
      <rect x="14" y="42" width="292" height="36" rx="12" className="fill-lime/5 stroke-lime/50" />
      {chips.map((c, i) => {
        const w = [100, 52, 40, 40][i];
        const x = [24, 132, 192, 240][i];
        return (
          <g key={c}>
            <rect x={x} y="50" width={w} height="20" rx="10" className="fill-surface" />
            <text x={x + w / 2} y="64" fontSize="10.5" textAnchor="middle" className={i === 3 ? "fill-yt" : i === 2 ? "fill-lime" : "fill-ink"}>{c}</text>
          </g>
        );
      })}
      <rect x="100" y="92" width="120" height="24" rx="12" className="fill-surface stroke-line-strong" />
      <text x="160" y="108" fontSize="11" textAnchor="middle" className="fill-ink">Vault, e.g. Blend</text>
      <line x1="160" y1="28" x2="160" y2="42" className="stroke-line-strong" />
      <line x1="160" y1="78" x2="160" y2="92" className="stroke-line-strong" />
      <motion.circle r="3" cx="160" cy="28" className="fill-lime" style={{ opacity: 0 }} {...loop({ cy: [28, 42, 78, 92], opacity: [0, 1, 1, 0] }, 3.2, { ease: "linear" })} />
    </svg>
  );
}
