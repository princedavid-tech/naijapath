// WCAG 2.2 contrast audit for every foreground/background pair used on the homepage.
// Run: npm run contrast   — exits non-zero if any pair fails its threshold.
// Thresholds: 4.5 = normal text (AA), 3 = large text (≥24px, or ≥18.66px bold) and UI components / graphics.

const T = {
  // v3 palette (redesign-v3)
  cream: "#FAF8F2",
  sheet: "#FFFFFF",
  hairline: "#ECEAE3",
  forest: "#1F5C2C",
  "forest-deep": "#0F2A17",
  ember: "#B84A1F",
  "ember-deep": "#9E3E18",
  sage: "#E4EDE4",
  sand: "#F3E7DA",
  mist: "#E9E8F4",
  ink: "#16211B",
  body: "#4F5A54",
  muted: "#8A938E",
  white: "#FFFFFF",
  // transitional legacy aliases still rendered by sections not yet rebuilt
  "legacy-base-500": "#66706A",
  // functional
  "success-50": "#F0FDF4",
  "success-500": "#15803D",
  "warning-50": "#FFFBEB",
  "warning-500": "#B45309",
  "danger-100": "#FECACA",
  "danger-500": "#B91C1C",
  "info-50": "#EFF6FF",
  "info-500": "#1D4ED8",
  "amber-500": "#D97706",
};

const hex = (h) => {
  const v = h.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(v.slice(i, i + 2), 16));
};
const blend = (fg, bg, a) => fg.map((c, i) => Math.round(c * a + bg[i] * (1 - a)));
const lum = (rgb) => {
  const [r, g, b] = rgb.map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [l1, l2] = [lum(a), lum(b)].toSorted((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};

// [foreground token, foreground alpha, background token, min ratio, where it is used]
// redesign-v3 palette. Text pairs need 4.5 (3 for large text ≥24px); UI and graphics need 3.
const PAIRS = [
  // ── Text on light surfaces ──
  ["ink", 1, "cream", 4.5, "Headings on the cream ground"],
  ["ink", 1, "sheet", 4.5, "Headings on white sheets"],
  ["body", 1, "sheet", 4.5, "Body copy on white sheets"],
  ["body", 1, "cream", 4.5, "Body copy on cream"],
  ["body", 1, "sage", 4.5, "Body copy on sage (Career Brief panel)"],
  ["body", 1, "sand", 4.5, "Body copy on sand (Organisations door)"],
  ["body", 1, "mist", 4.5, "Body copy on mist (Practitioners door)"],
  ["ink", 1, "sage", 4.5, "Headings on sage"],
  ["ink", 1, "sand", 4.5, "Headings on sand"],
  ["ink", 1, "mist", 4.5, "Headings on mist"],
  ["forest", 1, "sheet", 4.5, "Eyebrows, links, figures on white"],
  ["forest", 1, "cream", 4.5, "Eyebrows and marquee on cream"],
  ["forest", 1, "sage", 4.5, "Eyebrows and links on sage"],
  ["forest", 1, "sand", 4.5, "Eyebrows on sand"],
  ["forest", 1, "mist", 4.5, "Eyebrows on mist"],
  ["muted", 1, "sheet", 3, "Muted: LARGE text (≥24px) only, e.g. inactive stage numbers"],
  // muted on cream is 2.98:1 (fails even large text): muted never sits on cream or the tints.
  ["legacy-base-500", 1, "cream", 4.5, "Legacy small grey (transition) on cream"],
  ["legacy-base-500", 1, "sheet", 4.5, "Legacy small grey (transition) on white"],
  // ── Actions ──
  ["white", 1, "ember", 4.5, "Primary action pill label"],
  ["white", 1, "ember-deep", 4.5, "Primary action pill label, hover"],
  ["white", 1, "forest", 4.5, "Forest pill label"],
  ["white", 1, "forest-deep", 4.5, "Forest pill label, hover"],
  ["ink", 1, "sheet", 4.5, "Light pill label"],
  // ── Text on forest ──
  ["white", 1, "forest", 4.5, "Headings on the forest panel"],
  ["white", 0.8, "forest", 4.5, "Body copy on forest (white 80%)"],
  ["sage", 1, "forest", 4.5, "Eyebrows on forest"],
  ["white", 1, "forest-deep", 4.5, "Hero text over the gradient's darkest stop"],
  // ── UI and graphics (3:1) ──
  ["forest", 1, "sheet", 3, "Focus ring / line-art on white"],
  ["forest", 1, "cream", 3, "Focus ring / line-art on cream"],
  ["white", 1, "forest", 3, "Focus ring on forest"],
  ["forest", 1, "sand", 3, "Line-art icon on sand"],
  ["forest", 1, "mist", 3, "Line-art icon on mist"],
  ["forest", 0.7, "sand", 3, "Stage numbers not yet reached (large text, 70%)"],
  ["sage", 1, "forest", 3, "Line-art icon on forest"],
  ["ink", 0.2, "sheet", 1, "Light outline pill border (decorative; label carries contrast)"],
  ["forest", 0.35, "sheet", 1, "Forest outline pill border (decorative; label carries contrast)"],
  // ── Status ──
  ["success-500", 1, "success-50", 4.5, "Status pill: Confirmed / Completed"],
  ["danger-500", 1, "sheet", 4.5, "Form error text on light"],
  ["danger-100", 1, "forest", 4.5, "Form error text on forest"],
  ["amber-500", 1, "sheet", 3, "Rating stars (always with the numeric score)"],
];

let failed = 0;
const rows = PAIRS.map(([fg, a, bg, min, where]) => {
  const f = a === 1 ? hex(T[fg]) : blend(hex(T[fg]), hex(T[bg]), a);
  const r = ratio(f, hex(T[bg]));
  const pass = r >= min;
  if (!pass) failed++;
  const fgLabel = a === 1 ? fg : `${fg}@${Math.round(a * 100)}%`;
  return { fg: fgLabel, bg, ratio: r.toFixed(2), min, result: pass ? "PASS" : "FAIL", where };
});

console.table(rows);
if (failed) {
  console.error(`\n${failed} pair(s) FAIL their WCAG 2.2 AA threshold.`);
  process.exit(1);
}
console.log(`\nAll ${rows.length} pairs pass WCAG 2.2 AA.`);
