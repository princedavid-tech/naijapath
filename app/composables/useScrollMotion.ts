import { onBeforeUnmount, onMounted, type Ref } from "vue";
import type { MotionBundle } from "~/plugins/motion.client";

/**
 * Scoped GSAP motion for one component. `build` runs inside a gsap.context bound to `scope`
 * once the motion bundle is ready; everything it creates (tweens, ScrollTriggers, SplitText) is
 * reverted on unmount. When motion is off (reduced motion, or the bundle failed), `onStatic`
 * runs instead and must leave the component in its final, fully visible state.
 *
 * Content is visible by default in the server HTML: `build` may hide-then-reveal only from a
 * state it sets itself, never from CSS that hides content before JS runs.
 */
export function useScrollMotion(
  scope: Ref<HTMLElement | null | undefined>,
  build: (m: MotionBundle, el: HTMLElement) => void | (() => void),
  onStatic?: (el: HTMLElement) => void,
): void {
  let revert: (() => void) | undefined;
  let disposed = false;

  onMounted(async () => {
    const el = scope.value;
    if (!el) return;
    const m = await useNuxtApp().$motion.ready;
    if (disposed) return;
    if (!m) {
      onStatic?.(el);
      return;
    }
    let cleanup: void | (() => void);
    const ctx = m.gsap.context(() => {
      cleanup = build(m, el);
    }, el);
    revert = () => {
      cleanup?.();
      ctx.revert();
    };
  });

  onBeforeUnmount(() => {
    disposed = true;
    revert?.();
  });
}
