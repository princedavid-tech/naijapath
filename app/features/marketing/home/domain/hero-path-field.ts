/**
 * "The Path" — pure geometry shared by the hero WebGL scene and its static SVG fallback
 * (scripts/generate-contours.mts builds public/images/hero-contours.svg from this same field).
 *
 * World units: the visible hero is x ∈ [-aspect, aspect], y ∈ [-1, 1]. The contour field is
 * generated over a larger fixed domain so any viewport aspect is covered.
 *
 * Framework-free and dependency-free on purpose (Node runs it directly via type stripping).
 */

export const FIELD_BOUNDS = { minX: -3.2, maxX: 3.2, minY: -1.8, maxY: 1.8 } as const;
export const FIELD_STEP = 0.028;

/** Contour heights — evenly spaced isolines read as a topographic map. */
export const CONTOUR_LEVELS: readonly number[] = Array.from(
  { length: 15 },
  (_, i) => -0.84 + i * 0.12,
);

/** A smooth, deterministic terrain. Sums of rotated sinusoids — organic, no randomness. */
export function heightAt(x: number, y: number): number {
  return (
    0.55 * Math.sin(1.3 * x + 0.6 * Math.sin(0.9 * y)) * Math.cos(1.1 * y - 0.4 * x) +
    0.3 * Math.sin(2.1 * x * 0.955 + 2.3 * y * 0.296 + 1.7) +
    0.18 * Math.cos(3.3 * x - 2.7 * y + 0.4) +
    0.08 * Math.sin(5.1 * x + 4.4 * y)
  );
}

/** Where between corner values `a` and `b` the isoline crosses (0 → 1). */
function lerp(a: number, b: number, level: number): number {
  return (level - a) / (b - a);
}

/**
 * Marching squares → flat list of line segments [x1, y1, x2, y2, …] for every contour level.
 * Saddle cells are resolved by the centre value.
 */
export function buildContourSegments(
  bounds = FIELD_BOUNDS,
  step = FIELD_STEP,
  levels = CONTOUR_LEVELS,
): number[] {
  const cols = Math.ceil((bounds.maxX - bounds.minX) / step);
  const rows = Math.ceil((bounds.maxY - bounds.minY) / step);
  const values = new Float64Array((cols + 1) * (rows + 1));
  for (let j = 0; j <= rows; j++) {
    for (let i = 0; i <= cols; i++) {
      values[j * (cols + 1) + i] = heightAt(bounds.minX + i * step, bounds.minY + j * step);
    }
  }

  const out: number[] = [];

  for (const level of levels) {
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const x0 = bounds.minX + i * step;
        const y0 = bounds.minY + j * step;
        const tl = values[j * (cols + 1) + i]!;
        const tr = values[j * (cols + 1) + i + 1]!;
        const br = values[(j + 1) * (cols + 1) + i + 1]!;
        const bl = values[(j + 1) * (cols + 1) + i]!;

        let idx = 0;
        if (tl > level) idx |= 8;
        if (tr > level) idx |= 4;
        if (br > level) idx |= 2;
        if (bl > level) idx |= 1;
        if (idx === 0 || idx === 15) continue;

        // Edge midpoints (interpolated): top, right, bottom, left.
        const top = (): [number, number] => [x0 + lerp(tl, tr, level) * step, y0];
        const right = (): [number, number] => [x0 + step, y0 + lerp(tr, br, level) * step];
        const bottom = (): [number, number] => [x0 + lerp(bl, br, level) * step, y0 + step];
        const left = (): [number, number] => [x0, y0 + lerp(tl, bl, level) * step];
        const seg = (a: [number, number], b: [number, number]) => out.push(a[0], a[1], b[0], b[1]);

        switch (idx) {
          case 1:
          case 14:
            seg(left(), bottom());
            break;
          case 2:
          case 13:
            seg(bottom(), right());
            break;
          case 3:
          case 12:
            seg(left(), right());
            break;
          case 4:
          case 11:
            seg(top(), right());
            break;
          case 6:
          case 9:
            seg(top(), bottom());
            break;
          case 7:
          case 8:
            seg(left(), top());
            break;
          case 5:
          case 10: {
            const centre = (tl + tr + br + bl) / 4;
            const joinTlBr = (idx === 5) === centre > level;
            if (joinTlBr) {
              seg(left(), top());
              seg(bottom(), right());
            } else {
              seg(top(), right());
              seg(left(), bottom());
            }
            break;
          }
        }
      }
    }
  }
  return out;
}

/**
 * The five stage nodes, in normalised hero coordinates (u: 0 → 1 left→right, v: 0 → 1
 * top→bottom). They run along the bottom band beneath the CTAs and stop at the column gap,
 * so the path never sits behind the headline or the photograph.
 */
export const PATH_NODES_UV: ReadonlyArray<readonly [number, number]> = [
  [0.06, 0.93],
  [0.17, 0.885],
  [0.29, 0.925],
  [0.41, 0.875],
  [0.53, 0.9],
];

/** Lead-in / lead-out points so the curve enters from and exits toward the edges. */
export const PATH_LEAD_UV = {
  in: [-0.04, 0.97] as const,
  out: [0.6, 0.83] as const,
};

/** Normalised (u, v) → world (x, y) for a viewport of the given aspect (width / height). */
export function uvToWorld(u: number, v: number, aspect: number): [number, number] {
  return [(u - 0.5) * 2 * aspect, (0.5 - v) * 2];
}
