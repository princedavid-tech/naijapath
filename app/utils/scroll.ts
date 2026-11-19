import { prefersReducedMotion } from "./easing";
import { motionState } from "./motion-state";

/**
 * Scroll to an in-page section and move keyboard focus to it, so keyboard and screen-reader
 * users land where sighted users do.
 *
 * With motion on, Lenis (plugins/motion.client.ts) performs the scroll; it honours the target's
 * `scroll-margin-top` so it lands below the header. Without Lenis it falls back to native
 * scrollIntoView (smooth unless the user prefers reduced motion).
 */
export function scrollToSection(id: string, opts: { updateHash?: boolean } = {}): boolean {
  const target = document.getElementById(id);
  if (!target) return false;

  const lenis = motionState.lenis;
  if (lenis && !prefersReducedMotion()) {
    // Lenis already honours the target's scroll-margin-top (the header offset): no extra offset.
    lenis.scrollTo(target, { duration: 1.2 });
  } else {
    target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  }

  if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
  if (opts.updateHash !== false) history.pushState(history.state, "", `#${id}`);
  return true;
}

/** `#id` or `/#id` → `id`; anything else → null. */
export function hashTargetId(to: string): string | null {
  if (to.startsWith("#")) return decodeURIComponent(to.slice(1)) || null;
  if (to.startsWith("/#")) return decodeURIComponent(to.slice(2)) || null;
  return null;
}
