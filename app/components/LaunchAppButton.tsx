import { BunnyArt } from "./BunnyMeadow";
import { APP_URL, BTN_PRIMARY } from "./site";

// Launch app, with the meadow bunny hiding behind it: it pops up over the top edge on
// hover, focus and press. A sibling behind the link (not a child) so the link's own
// background covers it; the grid wrapper keeps the link full-width in stacked layouts.
export default function LaunchAppButton() {
  return (
    <span className="group relative grid">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-4 bottom-0 w-14 transition-transform duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:-translate-y-9 group-focus-within:-translate-y-9 group-active:-translate-y-9 motion-reduce:transition-none"
      >
        <BunnyArt />
      </span>
      <a href={APP_URL} className={`relative ${BTN_PRIMARY}`}>
        Launch app
      </a>
    </span>
  );
}
