import { onBeforeUnmount, onMounted, ref, type Ref } from "vue";
import { easeBrand, prefersReducedMotion } from "~/utils/easing";

/**
 * Trust-bar count-up — runs ONCE when the figures scroll into view.
 *
 * SSR (and no-JS) renders the final value. If the figures are already on screen when the page
 * hydrates, we keep the final value rather than snapping it to 0 (no flash). Reduced motion →
 * final value. The animated text is aria-hidden; the component exposes the final value to
 * assistive tech separately.
 */
export default function useMhCountUp(
  target: Ref<HTMLElement | null | undefined>,
  to: number,
  duration = 1200,
) {
  const value = ref(to);
  let io: IntersectionObserver | undefined;
  let raf = 0;

  onMounted(() => {
    const el = target.value;
    if (!el || prefersReducedMotion() || !("IntersectionObserver" in window)) return;

    const r = el.getBoundingClientRect();
    const alreadyVisible = r.top < window.innerHeight && r.bottom > 0;
    if (alreadyVisible) return;

    value.value = 0;
    io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io?.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          value.value = Math.round(easeBrand(t) * to);
          raf = t < 1 ? requestAnimationFrame(step) : 0;
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
  });

  onBeforeUnmount(() => {
    io?.disconnect();
    if (raf) cancelAnimationFrame(raf);
  });

  return value;
}
