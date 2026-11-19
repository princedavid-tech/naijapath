/**
 * redesign-v3 motion layer (client only).
 *
 * GSAP + ScrollTrigger + SplitText and Lenis load as ONE lazy chunk once the page is idle, so they
 * never sit in front of first paint. Lenis is driven by GSAP's ticker (one rAF loop) and feeds
 * ScrollTrigger, so smooth scroll and scroll-linked motion never drift apart.
 *
 * Under prefers-reduced-motion nothing loads: `ready` resolves to null and every component
 * renders its final state (see composables/useScrollMotion.ts).
 */
import { motionState } from "~/utils/motion-state";

export interface MotionBundle {
  gsap: typeof import("gsap").gsap;
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
  SplitText: typeof import("gsap/SplitText").SplitText;
}

export interface MotionApi {
  /** Resolves with the GSAP bundle, or null when motion is off (reduced motion / failure). */
  ready: Promise<MotionBundle | null>;
  reduced: boolean;
}

export default defineNuxtPlugin((nuxtApp) => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const ready: Promise<MotionBundle | null> = reduced
    ? Promise.resolve(null)
    : new Promise((resolve) => {
        const start = async () => {
          try {
            const [{ gsap }, { ScrollTrigger }, { SplitText }, { default: Lenis }] =
              await Promise.all([
                import("gsap"),
                import("gsap/ScrollTrigger"),
                import("gsap/SplitText"),
                import("lenis"),
              ]);
            gsap.registerPlugin(ScrollTrigger, SplitText);
            gsap.defaults({ ease: "expo.out", duration: 0.8 });

            const lenis = new Lenis({ autoRaf: false, duration: 1.1, smoothWheel: true });
            lenis.on("scroll", ScrollTrigger.update);
            gsap.ticker.add((time) => lenis.raf(time * 1000));
            gsap.ticker.lagSmoothing(0);
            motionState.lenis = lenis;

            resolve({ gsap, ScrollTrigger, SplitText });
          } catch (error) {
            console.warn("[motion] failed to load; showing final states", error);
            resolve(null);
          }
        };
        nuxtApp.hook("app:suspense:resolve", () => {
          const idle = (
            window as Window & {
              requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
            }
          ).requestIdleCallback;
          if (idle) idle(() => void start(), { timeout: 1200 });
          else setTimeout(() => void start(), 300);
        });
      });

  const api: MotionApi = { ready, reduced };
  return { provide: { motion: api } };
});
