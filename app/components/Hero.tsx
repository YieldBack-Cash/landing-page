"use client";

import { motion } from "motion/react";
import { EASE } from "./motion";
import { APP_URL, BTN_PRIMARY, BTN_SECONDARY, DOCS_URL } from "./site";
import TradeCardMock from "./TradeCardMock";
import { RiseWords } from "./yuiMotions";
import AnimatedBunny from "./bunny/AnimatedBunny";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE },
});

export default function Hero() {

  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden px-5 pt-16 pb-20 md:px-8 md:pt-24 md:pb-28">
      <div className="relative mx-auto flex max-w-6xl flex-col items-center text-center">
        <motion.a
          {...rise(0)}
          href={APP_URL}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3.5 py-1.5 text-xs font-medium text-soft transition-colors hover:text-ink"
        >
          Live on Stellar testnet
        </motion.a>

        <motion.h1
          id="hero-title"
          aria-label="Fixed or leveraged yield on Stellar"
          initial="hidden"
          animate="show"
          className="mt-8 max-w-5xl text-[2.75rem] leading-[1.02] font-extrabold tracking-tight text-balance sm:text-6xl md:text-7xl lg:text-8xl"
        >
          <RiseWords text="Fixed or leveraged yield" />{" "}
          <span className="whitespace-nowrap">
            {/* the team's animated SVG bunny (app/components/bunny, from master): jumps on load,
                click replays. Outside the word masks, which are overflow-hidden and would clip the jump. */}
            <span className="inline-block size-[0.85em] -translate-y-[0.06em] align-middle [&>button]:size-full!">
              <AnimatedBunny />
            </span>{" "}
            <RiseWords text="on Stellar" start={5} />
          </span>
        </motion.h1>

        <motion.p {...rise(0.45)} className="mt-6 max-w-2xl text-base text-soft text-pretty md:text-xl">
          YieldBack.Cash turns your yield-bearing collateral into tradable tokens, enabling you to
          leverage yield or earn a fixed interest rate.
        </motion.p>

        <motion.div {...rise(0.55)} className="mt-9 flex w-full max-w-xs flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row">
          <a href={APP_URL} className={BTN_PRIMARY}>
            Launch app
          </a>
          <a href={DOCS_URL} className={BTN_SECONDARY}>
            Read the docs
          </a>
        </motion.div>

        {/* a plain fade-up after the buttons: no slide-in, no tilt */}
        <motion.div {...rise(0.7)} className="mx-auto mt-16 w-full max-w-5xl md:mt-20">
          <TradeCardMock />
        </motion.div>
      </div>
    </section>
  );
}
