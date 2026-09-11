"use client";

import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useEffect, type ReactNode } from "react";
import { useLoop } from "./motion";

// Every figure here is illustrative and self-consistent: 100 XLM buys ≈100.7 PT
// (price ≈0.993), which over 60 days to maturity annualises to ≈4.3%.
const CYCLE = 6;
const TAP_TIMES = [0, 0.4, 0.6, 0.64, 0.7, 0.9, 1];

export default function TradeCardMock() {
  const reduce = useReducedMotion();
  const loop = useLoop();
  const amount = useMotionValue(0);
  const pay = useTransform(amount, (v) => v.toFixed(0));
  const receive = useTransform(amount, (v) => (v * 1.007).toFixed(1));

  useEffect(() => {
    if (reduce) {
      amount.set(100);
      return;
    }
    const controls = animate(amount, [0, 100, 100], {
      duration: CYCLE,
      times: [0, 0.3, 1],
      ease: "easeOut",
      repeat: Infinity,
    });
    return () => controls.stop();
  }, [reduce, amount]);

  const tap = (values: Record<string, number[]>) => loop(values, CYCLE, { times: TAP_TIMES });

  return (
    <figure className="relative mx-auto max-w-5xl text-left">

      <div
        role="img"
        aria-label="Illustration of the YieldBack trade card in the XLM market on Blend: Buy PT selected, you pay 100 XLM and receive about 100.7 PT at a fixed APY. Figures are illustrative."
        className="relative rounded-3xl border border-line bg-surface/70 p-2 shadow-2xl shadow-black/60 backdrop-blur md:p-3"
      >
        <div className="flex items-center justify-between px-3 pt-1.5 pb-3">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-line-strong" />
            <span className="size-2.5 rounded-full bg-line-strong" />
            <span className="size-2.5 rounded-full bg-line-strong" />
          </div>
          <span className="rounded-full border border-line px-2.5 py-0.5 text-[11px] text-soft">Illustrative</span>
        </div>

        <div className="grid gap-2 md:grid-cols-[1.15fr_1fr] md:gap-3">
          {/* Market panel: desktop only */}
          <div className="hidden flex-col rounded-2xl border border-line bg-bg p-5 md:flex">
            <MarketHeader />
            <div className="mt-5 grid grid-cols-2 gap-2">
              <Stat label="Fixed APY" value="4.3%" accent />
              <Stat label="PT price" value="0.993 XLM" />
            </div>
            <div className="mt-5 flex-1">
              <PtChart />
            </div>
          </div>

          {/* Trade card */}
          <div className="rounded-2xl border border-line bg-bg p-4 md:p-5">
            <div className="md:hidden">
              <MarketHeader />
            </div>
            <div className="mt-4 grid grid-cols-2 rounded-full bg-surface p-1 text-sm md:mt-0">
              <span className="rounded-full bg-lime/15 py-1.5 text-center font-medium text-lime">Buy PT</span>
              <span className="py-1.5 text-center text-soft">Buy YT</span>
            </div>

            <Field label="You pay" token="XLM" icon="/Stellar.png" tokenClass="bg-line text-ink">
              <motion.span>{pay}</motion.span>
            </Field>
            <div className="relative z-10 -my-2.5 flex justify-center">
              <span className="flex size-8 items-center justify-center rounded-full border border-line bg-bg text-soft">↓</span>
            </div>
            <Field label="You receive" token="PT" tokenClass="bg-lime/15 text-lime">
              ≈ <motion.span>{receive}</motion.span>
            </Field>

            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-soft">Fixed APY</span>
              <span className="relative">
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-lime/40"
                  style={{ opacity: 0 }}
                  {...loop({ scale: [1, 1.35, 1.35], opacity: [0.6, 0, 0] }, 2.4)}
                />
                <span className="relative rounded-full bg-lime/15 px-2.5 py-1 font-medium text-lime">4.3%</span>
              </span>
            </div>

            <div className="relative mt-5">
              <motion.div
                className="rounded-xl bg-lime py-3.5 text-center font-medium text-lime-ink"
                {...tap({ scale: [1, 1, 1, 0.96, 1, 1, 1] })}
              >
                Buy PT · Lock yield
              </motion.div>
              <motion.svg
                aria-hidden
                viewBox="0 0 24 24"
                className="absolute top-1/2 left-[62%] size-7 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
                style={{ opacity: 0 }}
                {...tap({
                  opacity: [0, 0, 1, 1, 1, 1, 0],
                  x: [70, 70, 0, 0, 0, 0, 0],
                  y: [60, 60, 0, 0, 0, 0, 0],
                  scale: [1, 1, 1, 0.8, 1, 1, 1],
                })}
              >
                <path
                  d="M5 3l14 8-6.5 1.5L10 19z"
                  fill="#fafbff"
                  stroke="#141414"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-4 text-center text-xs text-soft">
        Illustrative figures, not live market data.
      </figcaption>
    </figure>
  );
}

function MarketHeader() {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2.5">
        {/* same pairing as the app: the underlying (XLM) in front, the protocol (Blend) behind */}
        <span className="flex shrink-0">
          <Image src="/Stellar.png" alt="" width={32} height={32} className="relative z-20 size-8 rounded-full border border-line" />
          <Image src="/BLND.png" alt="" width={32} height={32} className="relative z-10 -ml-2.5 size-8 rounded-full border border-line" />
        </span>
        <span className="font-medium">
          XLM <span className="font-normal text-soft">Blend</span>
        </span>
      </div>
      <span className="rounded-full border border-line px-2.5 py-0.5 text-[11px] text-soft">60 days to maturity</span>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-3">
      <div className="text-xs text-soft">{label}</div>
      <div className={`mt-1 text-xl font-medium ${accent ? "text-lime" : ""}`}>{value}</div>
    </div>
  );
}

function Field({
  label,
  token,
  tokenClass,
  icon,
  children,
}: {
  label: string;
  token: string;
  tokenClass: string;
  icon?: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-3 rounded-xl border border-line bg-surface p-3.5">
      <div className="text-xs text-soft">{label}</div>
      <div className="mt-1 flex items-center justify-between gap-3">
        <span className="text-2xl font-medium tabular-nums md:text-3xl">{children}</span>
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-sm font-medium ${icon ? "pl-1" : ""} ${tokenClass}`}>
          {icon && <Image src={icon} alt="" width={20} height={20} className="size-5 rounded-full" />}
          {token}
        </span>
      </div>
    </div>
  );
}

/** PT price history up to today, then converging on face value at maturity. */
function PtChart() {
  const loop = useLoop();
  return (
    <svg viewBox="0 0 400 170" className="h-full min-h-40 w-full" aria-hidden>
      <line x1="0" y1="30" x2="400" y2="30" stroke="#4a4a44" strokeDasharray="4 6" />
      <text x="0" y="20" fill="#a3a39a" fontSize="12">1.00 XLM · face value at maturity</text>
      <motion.path
        d="M0 140 C 70 128, 120 100, 180 76 S 240 54, 260 50"
        fill="none"
        stroke="#c9e04a"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, delay: 0.8, ease: "easeInOut" }}
      />
      <path d="M260 50 C 320 40, 360 33, 400 30" fill="none" stroke="#c9e04a" strokeOpacity="0.45" strokeWidth="2" strokeDasharray="3 6" />
      <motion.circle cx="260" cy="50" r="10" fill="#c9e04a" style={{ opacity: 0.15 }} {...loop({ r: [6, 14, 6], opacity: [0.35, 0, 0.35] }, 2.4)} />
      <circle cx="260" cy="50" r="5" fill="#c9e04a" />
      <text x="0" y="165" fill="#a3a39a" fontSize="12">Market start</text>
      <text x="260" y="165" fill="#a3a39a" fontSize="12" textAnchor="middle">Today</text>
      <text x="400" y="165" fill="#a3a39a" fontSize="12" textAnchor="end">Maturity</text>
    </svg>
  );
}
