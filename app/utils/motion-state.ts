import type Lenis from "lenis";

/**
 * The one live smooth-scroll instance, set by plugins/motion.client.ts once motion loads.
 * Plain module state (not a composable) so event handlers outside a component setup — e.g.
 * scrollToSection in utils/scroll.ts — can reach it. Null under reduced motion and on the server.
 */
export const motionState: { lenis: Lenis | null } = { lenis: null };
