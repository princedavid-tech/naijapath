import { onBeforeUnmount, onMounted, ref, type Ref } from "vue";

/**
 * Fires once when `target` scrolls into view, then disconnects. Replaces GSAP/ScrollTrigger for
 * the handful of one-shot reveals this page allows. Without IntersectionObserver → visible at once.
 */
export function useInViewOnce(
  target: Ref<HTMLElement | null | undefined>,
  options: { threshold?: number; rootMargin?: string } = {},
): Ref<boolean> {
  const inView = ref(false);
  let observer: IntersectionObserver | undefined;

  onMounted(() => {
    const el = target.value;
    if (!el || !("IntersectionObserver" in window)) {
      inView.value = true;
      return;
    }
    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          inView.value = true;
          observer?.disconnect();
        }
      },
      {
        threshold: options.threshold ?? 0.25,
        rootMargin: options.rootMargin ?? "0px 0px -10% 0px",
      },
    );
    observer.observe(el);
  });

  onBeforeUnmount(() => observer?.disconnect());
  return inView;
}
