import AnimatedBunny from "./bunny/AnimatedBunny";
import { APP_URL, DISCORD_URL, DOCS_URL } from "./site";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-bg/75 backdrop-blur-md">
      <nav
        aria-label="Main"
        className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-5 md:px-8"
      >
        {/* the team's animated bunny is a button (click replays its jump), so it sits beside the
            home link rather than inside it; size-full! beats its CSS module's fixed 96px */}
        <div className="flex items-center gap-2">
          <span className="size-7 [&>button]:size-full!">
            <AnimatedBunny />
          </span>
          <a href="#top" className="font-extrabold tracking-tight">
            YieldBack.Cash
          </a>
        </div>

        <div className="flex items-center gap-1 text-sm md:gap-2">
          <a href="#how-it-works" className="hidden rounded-md px-3 py-2 text-soft transition-colors hover:text-ink md:block">
            How it works
          </a>
          <a href={DOCS_URL} className="hidden rounded-md px-3 py-2 text-soft transition-colors hover:text-ink sm:block">
            Docs
          </a>
          {DISCORD_URL && (
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-md px-3 py-2 text-soft transition-colors hover:text-ink md:block"
            >
              Discord
            </a>
          )}
          <a
            href={APP_URL}
            className="ml-1 rounded-full bg-lime px-4 py-2 font-medium text-lime-ink transition-opacity hover:opacity-90"
          >
            Launch app
          </a>
        </div>
      </nav>
    </header>
  );
}
