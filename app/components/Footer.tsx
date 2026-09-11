import Image from "next/image";
import { Reveal } from "./motion";
import { APP_URL, BTN_PRIMARY, BTN_SECONDARY, DISCORD_URL, DOCS_URL, GITHUB_URL } from "./site";
import { RiseH2 } from "./yuiMotions";

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden px-5 py-28 md:px-8 md:py-40">
      <Reveal className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        <RiseH2
          id="cta-title"
          className="text-5xl font-extrabold tracking-tight text-balance md:text-7xl"
          text="Lock it in. Or lever it up."
        />
        <p className="mt-6 max-w-xl text-lg text-soft">Try the live markets on Stellar Testnet.</p>
        <div className="mt-10 flex w-full max-w-xs flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row">
          <a href={APP_URL} className={BTN_PRIMARY}>
            Launch app
          </a>
          <a href={DOCS_URL} className={BTN_SECONDARY}>
            Read the docs
          </a>
          {DISCORD_URL && (
            <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className={BTN_SECONDARY}>
              Join Discord
            </a>
          )}
        </div>
      </Reveal>
    </section>
  );
}

export default function Footer() {
  const links = [
    { label: "Launch app", href: APP_URL },
    { label: "Docs", href: DOCS_URL },
    { label: "GitHub", href: GITHUB_URL },
    ...(DISCORD_URL ? [{ label: "Discord", href: DISCORD_URL }] : []),
  ];

  return (
    <footer className="border-t border-line px-5 py-10 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <a href="#top" className="flex items-center gap-2 font-extrabold tracking-tight">
          <Image src="/YBC Official Logo 1.png" alt="" width={24} height={24} />
          Yieldback Cash
        </a>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-soft">
            {links.map(({ label, href }) => (
              <li key={label}>
                <a href={href} className="transition-colors hover:text-ink">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* year from the build date; the page is prerendered, so each deploy stamps the current year */}
      <p className="mx-auto mt-8 max-w-6xl text-xs text-soft">© {new Date().getFullYear()} Yieldback Cash. All rights reserved.</p>
    </footer>
  );
}
