// Builds the static hero fallback texture from the SAME field the WebGL scene uses.
// Run: node scripts/generate-contours.mts   (Node >= 22.18 strips TypeScript types natively)
// Output: app/assets/images/hero-contours.svg (inlined by hero-path.vue), viewBox 1600x900 (16:9), world y in [-1, 1].

import { writeFileSync } from "node:fs";
import {
  buildContourSegments,
  CONTOUR_LEVELS,
} from "../app/features/marketing/home/domain/hero-path-field.ts";

const W = 1600;
const H = 900;
const aspect = W / H;
// world -> svg
const sx = (x: number) => ((x / aspect + 1) / 2) * W;
const sy = (y: number) => ((1 - y) / 2) * H;

// Only the region the fallback can show (plus a small margin).
const bounds = { minX: -aspect - 0.1, maxX: aspect + 0.1, minY: -1.1, maxY: 1.1 };

const key = (x: number, y: number) => `${x.toFixed(4)},${y.toFixed(4)}`;

const paths: string[] = [];
CONTOUR_LEVELS.forEach((level, li) => {
  const segs = buildContourSegments(bounds, 0.022, [level]);

  // Chain segments into polylines so the SVG stays small.
  const adj = new Map<string, number[]>();
  for (let s = 0; s < segs.length; s += 4) {
    for (const k of [key(segs[s]!, segs[s + 1]!), key(segs[s + 2]!, segs[s + 3]!)]) {
      const list = adj.get(k) ?? [];
      list.push(s);
      adj.set(k, list);
    }
  }
  const used = new Set<number>();
  let d = "";
  for (let s = 0; s < segs.length; s += 4) {
    if (used.has(s)) continue;
    used.add(s);
    const pts: Array<[number, number]> = [
      [segs[s]!, segs[s + 1]!],
      [segs[s + 2]!, segs[s + 3]!],
    ];
    // extend forward, then reverse and extend again (= backward), so chains never start mid-line
    const extend = () => {
      for (;;) {
        const [x, y] = pts[pts.length - 1]!;
        const next = (adj.get(key(x, y)) ?? []).find((n) => !used.has(n));
        if (next === undefined) break;
        used.add(next);
        const a: [number, number] = [segs[next]!, segs[next + 1]!];
        const b: [number, number] = [segs[next + 2]!, segs[next + 3]!];
        pts.push(key(a[0], a[1]) === key(x, y) ? b : a);
      }
    };
    extend();
    pts.reverse();
    extend();
    // simplify: keep every other point (field is smooth), always keep ends
    const kept = pts.filter((_, i) => i % 2 === 0 || i === pts.length - 1);
    if (kept.length < 3) continue;
    d += "M" + kept.map(([x, y]) => `${sx(x).toFixed(1)} ${sy(y).toFixed(1)}`).join("L");
  }
  // Every 4th line is an "index contour", slightly stronger, like a real topographic map.
  const isIndex = li % 4 === 0;
  paths.push(
    `<path d="${d}" stroke-width="${isIndex ? 1.25 : 0.9}" opacity="${isIndex ? 0.75 : 0.5}"/>`,
  );
});

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" fill="none" stroke="#CFE3D6" stroke-linejoin="round" stroke-linecap="round">${paths.join("")}</svg>\n`;

writeFileSync(new URL("../app/assets/images/hero-contours.svg", import.meta.url), svg);
console.log(`hero-contours.svg written (${(svg.length / 1024).toFixed(1)} KB)`);
