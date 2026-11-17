import { prefersReducedMotion } from "./easing";

/**
 * Scroll to an in-page section and move keyboard focus to it, so keyboard and screen-reader
 * users land where sighted users do. Smooth unless the user prefers reduced motion.
 * Native smooth scrolling only — no scroll-jacking libraries.
 */
export function scrollToSection(id: string, opts: { updateHash?: boolean } = {}): boolean {
  const target = document.getElementById(id);
  if (!target) return false;
  target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
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
