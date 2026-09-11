import { DOCS_URL } from "./site";

// Most Stellar wallets (Freighter, xBull, LOBSTR…) default to mainnet. On the wrong network the
// app can't read balances and signing fails with no clear reason, so say it before people click through.
export default function TestnetNotice() {
  return (
    <section aria-labelledby="testnet-notice-title" className="px-6">
      <div className="mx-auto max-w-3xl rounded-2xl border border-[#ef9f27]/40 bg-[#ef9f27]/10 p-5 sm:p-6">
        <div>
          <h2 id="testnet-notice-title" className="text-base font-bold text-ink">
            Yieldback Cash runs on Stellar testnet
          </h2>
          <p className="mt-1.5 text-sm text-soft">
            Switch your wallet&apos;s network to <strong className="text-ink">Testnet</strong>{" "}before connecting, or balances
            won&apos;t load and transactions can&apos;t be signed. Testnet tokens have no real value.{" "}
            <a href={DOCS_URL} className="underline underline-offset-2 hover:text-ink">
              Read the docs
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
