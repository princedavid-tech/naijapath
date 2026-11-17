import { onBeforeUnmount, onMounted, ref, type Ref } from "vue";

/**
 * Lifecycle for a lazily-loaded WebGL scene. Feature code supplies `load()` (a dynamic import of
 * a framework-free scene factory); this composable owns every engineering rule:
 *
 * - Gate: WebGL2 present, hardwareConcurrency > 4, not Save-Data, viewport ≥ `minWidth`.
 *   Otherwise status = "fallback" and the static SVG (rendered during SSR) simply stays.
 * - Loaded AFTER first paint (idle callback) so LCP is unaffected and `three` is its own chunk.
 * - devicePixelRatio capped at 1.5 (the factory applies it).
 * - Paused when offscreen (IntersectionObserver) or the tab is hidden.
 * - prefers-reduced-motion → one final static frame, no loop.
 * - Everything disposed on unmount.
 */
export interface ThreeSceneInstance {
  setSize: (width: number, height: number) => void;
  setPointer?: (nx: number, ny: number) => void;
  render: (now: number) => boolean;
  dispose: () => void;
}

export type ThreeSceneFactory = (
  canvas: HTMLCanvasElement,
  options: { reducedMotion: boolean; pixelRatio: number },
) => ThreeSceneInstance;

export interface UseThreeSceneOptions {
  canvas: Ref<HTMLCanvasElement | null | undefined>;
  container: Ref<HTMLElement | null | undefined>;
  load: () => Promise<ThreeSceneFactory>;
  /** Minimum viewport width in px for the WebGL version. */
  minWidth?: number;
  /** Follow the pointer (fine pointers only). */
  pointer?: boolean;
}

export type ThreeSceneStatus = "idle" | "ready" | "fallback";

function canUseWebGL(minWidth: number): boolean {
  if (typeof window === "undefined") return false;
  if (!window.matchMedia(`(min-width: ${minWidth}px)`).matches) return false;
  if ((navigator.hardwareConcurrency ?? 0) <= 4) return false;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (connection?.saveData) return false;
  try {
    const probe = document.createElement("canvas");
    const gl = probe.getContext("webgl2");
    if (!gl) return false;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

function afterFirstPaint(): Promise<void> {
  return new Promise((resolve) => {
    const idle = (
      window as Window & {
        requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      }
    ).requestIdleCallback;
    requestAnimationFrame(() => {
      if (idle) idle(() => resolve(), { timeout: 1500 });
      else setTimeout(resolve, 200);
    });
  });
}

export function useThreeScene(options: UseThreeSceneOptions): { status: Ref<ThreeSceneStatus> } {
  const status = ref<ThreeSceneStatus>("idle");
  let scene: ThreeSceneInstance | undefined;
  let raf = 0;
  let visible = true;
  let pageVisible = true;
  let disposed = false;
  let needsFrame = true;
  const cleanups: Array<() => void> = [];

  const loop = (now: number) => {
    raf = 0;
    if (!scene || disposed) return;
    needsFrame = scene.render(now);
    if (status.value !== "ready") status.value = "ready";
    schedule();
  };

  const schedule = () => {
    if (raf || disposed || !visible || !pageVisible || !needsFrame) return;
    raf = requestAnimationFrame(loop);
  };

  const wake = () => {
    needsFrame = true;
    schedule();
  };

  onMounted(async () => {
    const minWidth = options.minWidth ?? 1024;
    if (!canUseWebGL(minWidth)) {
      status.value = "fallback";
      return;
    }
    await afterFirstPaint();
    if (disposed) return;

    let factory: ThreeSceneFactory;
    try {
      factory = await options.load();
    } catch (error) {
      console.warn("[useThreeScene] scene failed to load; keeping static fallback", error);
      status.value = "fallback";
      return;
    }
    const canvas = options.canvas.value;
    const container = options.container.value;
    if (disposed || !canvas || !container) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    try {
      scene = factory(canvas, { reducedMotion, pixelRatio: window.devicePixelRatio || 1 });
    } catch (error) {
      console.warn("[useThreeScene] WebGL init failed; keeping static fallback", error);
      status.value = "fallback";
      return;
    }

    const resize = () => {
      const rect = container.getBoundingClientRect();
      scene?.setSize(rect.width, rect.height);
      wake();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    cleanups.push(() => ro.disconnect());

    const io = new IntersectionObserver((entries) => {
      visible = entries.some((e) => e.isIntersecting);
      if (visible) wake();
    });
    io.observe(container);
    cleanups.push(() => io.disconnect());

    const onVisibility = () => {
      pageVisible = document.visibilityState === "visible";
      if (pageVisible) wake();
    };
    document.addEventListener("visibilitychange", onVisibility);
    cleanups.push(() => document.removeEventListener("visibilitychange", onVisibility));

    if (options.pointer && !reducedMotion && window.matchMedia("(pointer: fine)").matches) {
      const onPointer = (e: PointerEvent) => {
        const rect = container.getBoundingClientRect();
        scene?.setPointer?.(
          ((e.clientX - rect.left) / rect.width) * 2 - 1,
          ((e.clientY - rect.top) / rect.height) * 2 - 1,
        );
        wake();
      };
      window.addEventListener("pointermove", onPointer, { passive: true });
      cleanups.push(() => window.removeEventListener("pointermove", onPointer));
    }

    wake();
  });

  onBeforeUnmount(() => {
    disposed = true;
    if (raf) cancelAnimationFrame(raf);
    cleanups.forEach((fn) => fn());
    scene?.dispose();
    scene = undefined;
  });

  return { status };
}
