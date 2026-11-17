import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch, type Ref } from "vue";
import { easeBrand, MOTION_MS, prefersReducedMotion } from "~/utils/easing";

/**
 * Section 06 — the path draws through the five stages (plain SVG stroke-dashoffset, no WebGL).
 *
 * The path is built from the ACTUAL positions of the stage dots, so the same code draws the
 * horizontal desktop line and the vertical mobile line on the left. Each stage number lights
 * as the line reaches its dot. Reduced motion → drawn and lit immediately.
 */
export default function useMhStagePath(
  container: Ref<HTMLElement | null | undefined>,
  dots: Ref<HTMLElement[]>,
) {
  const width = ref(0);
  const height = ref(0);
  const d = ref("");
  const length = ref(0);
  const progress = ref(0);
  const fractions = ref<number[]>([]);
  const enhanced = ref(false); // true once JS has measured — hides the static CSS connector

  const dashOffset = computed(() => length.value * (1 - progress.value));
  const litCount = computed(
    () => fractions.value.filter((f) => progress.value >= f - 0.001).length,
  );

  let ro: ResizeObserver | undefined;
  let io: IntersectionObserver | undefined;
  let raf = 0;
  let started = false;

  function measure() {
    const root = container.value;
    if (!root || !dots.value.length) return;
    const box = root.getBoundingClientRect();
    width.value = box.width;
    height.value = box.height;

    const pts = dots.value.map((el) => {
      const r = el.getBoundingClientRect();
      return [r.left + r.width / 2 - box.left, r.top + r.height / 2 - box.top] as const;
    });

    let path = `M ${pts[0]![0]} ${pts[0]![1]}`;
    const prefixes: string[] = [path];
    for (let i = 1; i < pts.length; i++) {
      const [x0, y0] = pts[i - 1]!;
      const [x1, y1] = pts[i]!;
      const horizontal = Math.abs(x1 - x0) > Math.abs(y1 - y0);
      const wobble = horizontal ? (i % 2 ? -10 : 10) : 0;
      path += horizontal
        ? ` C ${x0 + (x1 - x0) / 2} ${y0 + wobble}, ${x0 + (x1 - x0) / 2} ${y1 + wobble}, ${x1} ${y1}`
        : ` L ${x1} ${y1}`;
      prefixes.push(path);
    }

    const probe = document.createElementNS("http://www.w3.org/2000/svg", "path");
    probe.setAttribute("d", path);
    const total = probe.getTotalLength();
    fractions.value = prefixes.map((p, i) => {
      if (i === 0) return 0;
      probe.setAttribute("d", p);
      return probe.getTotalLength() / total;
    });
    d.value = path;
    length.value = total;
    enhanced.value = true;
  }

  function play() {
    if (started) return;
    started = true;
    if (prefersReducedMotion()) {
      progress.value = 1;
      return;
    }
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / MOTION_MS.path);
      progress.value = easeBrand(t);
      raf = t < 1 ? requestAnimationFrame(step) : 0;
    };
    raf = requestAnimationFrame(step);
  }

  onMounted(async () => {
    await nextTick();
    measure();
    ro = new ResizeObserver(() => measure());
    if (container.value) ro.observe(container.value);

    if (!("IntersectionObserver" in window) || !container.value) {
      progress.value = 1;
      return;
    }
    io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          play();
          io?.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(container.value);
  });

  watch(
    () => dots.value.length,
    () => nextTick(measure),
  );

  onBeforeUnmount(() => {
    ro?.disconnect();
    io?.disconnect();
    if (raf) cancelAnimationFrame(raf);
  });

  return { width, height, d, length, dashOffset, litCount, enhanced };
}
