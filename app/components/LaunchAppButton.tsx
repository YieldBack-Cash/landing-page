import Image from "next/image";
import { APP_URL, BTN_PRIMARY } from "./site";

// Launch app, with the app's peeking bunny (the dashboard divider's /bunny.png) hiding behind it: it pops up over the top edge on
// hover, focus and press. A sibling behind the link (not a child) so the link's own
// background covers it; the grid wrapper keeps the link full-width in stacked layouts.
export default function LaunchAppButton() {
  return (
    <span className="group relative grid">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-6 bottom-0 transition-transform duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:-translate-y-8 group-focus-within:-translate-y-8 group-active:-translate-y-8 motion-reduce:transition-none"
      >
        <Image src="/bunny.png" alt="" width={28} height={40} className="block" />
      </span>
      <a href={APP_URL} className={`relative ${BTN_PRIMARY}`}>
        Launch app
      </a>
    </span>
  );
}
