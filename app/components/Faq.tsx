import type { ReactNode } from "react";
import { Reveal } from "./motion";
import { DOCS_URL } from "./site";
import { RiseH2 } from "./yuiMotions";

const doc = (path: string, label: string) => (
  <a href={`${DOCS_URL}${path}`} className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-lime">
    {label}
  </a>
);

const FAQS: { q: string; a: ReactNode }[] = [
  {
    q: "What are PT and YT?",
    a: (
      <>
        Each market splits a yield-bearing vault position into two tokens. PT (Principal Token) is
        the fixed leg: each one redeems for 1 unit of the underlying asset at maturity. YT (Yield
        Token) is the variable leg: a claim on all the yield the vault accrues until maturity, after
        which its value decays to zero. More in {doc("/concepts/tokens", "Tokens")}.
      </>
    ),
  },
  {
    q: "Where does the fixed rate come from?",
    a: (
      <>
        PT trades below face value before maturity. Buy it at a discount and hold it to maturity,
        and the difference between what you paid and the 1:1 redemption is your yield, locked in
        when you buy regardless of how the market moves afterwards.
      </>
    ),
  },
  {
    q: "Can I exit before maturity?",
    a: (
      <>
        Yes. You can sell PT or YT back to the market&apos;s pool at any time, at the current
        market price, which may be below face value. If you hold both, combine burns an equal
        amount of PT and YT and returns the underlying directly, with no trade against the pool.
        See {doc("/using-ybc/split-and-recombine", "Split & recombine")}.
      </>
    ),
  },
  {
    q: "What happens at maturity?",
    a: (
      <>
        Redeem PT for its full value, and claim the yield your YT accrued from Positions in the
        app. After maturity no new yield is split, so YT has nothing further to earn.
      </>
    ),
  },
  {
    q: "What are the risks?",
    a: (
      <>
        The vault behind a market is the main thing you are trusting. Anyone can create a market
        around any vault, and nothing in the contracts checks that a vault is honest or solvent.
        Markets are immutable with no pause switch, so vet the vault before you deposit. Markets
        share no state, so a bad vault only reaches the people in its own market. YT carries rate
        risk: if the underlying APY drops below the implied APY, you may receive less than
        expected. And selling before maturity uses the market price, which may be below face
        value. Read the full {doc("/concepts/risks", "Risks")} page.
      </>
    ),
  },
  {
    q: "Which network is it on?",
    a: (
      <>
        The live markets are on Stellar Testnet. The protocol is a set of smart contracts on
        Stellar; the {doc("/protocol/architecture", "architecture docs")} explain how they fit
        together.
      </>
    ),
  },
];

export default function Faq() {
  return (
    <section aria-labelledby="faq-title" className="px-5 py-20 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <Reveal>
          <RiseH2 id="faq-title" className="text-4xl font-extrabold tracking-tight md:text-6xl" text="Questions" />
          <p className="mt-5 text-lg text-soft">
            The short answers. The {doc("", "docs")} have the long ones.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="divide-y divide-line border-y border-line">
          {FAQS.map(({ q, a }) => (
            <details key={q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-medium [&::-webkit-details-marker]:hidden">
                {q}
                {/* drawn plus that folds into a minus when open (a rotated "+" glyph never sits centred) */}
                <span
                  aria-hidden
                  className="relative flex size-8 shrink-0 items-center justify-center rounded-full border border-line text-soft transition-colors duration-300 group-open:border-lime/50 group-open:text-lime"
                >
                  <span className="absolute h-[1.5px] w-3 rounded-full bg-current" />
                  <span className="absolute h-3 w-[1.5px] rounded-full bg-current transition-transform duration-300 group-open:scale-y-0" />
                </span>
              </summary>
              <p className="max-w-2xl pb-6 leading-relaxed text-soft">{a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
