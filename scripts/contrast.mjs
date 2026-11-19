// WCAG 2.2 contrast audit for every foreground/background pair used on the homepage.
// Run: npm run contrast   — exits non-zero if any pair fails its threshold.
// Thresholds: 4.5 = normal text (AA), 3 = large text (≥24px, or ≥18.66px bold) and UI components / graphics.

const T = {
  "base-0": "#FFFFFF",
  "base-50": "#F9F7F4",
  "base-100": "#F3F4F6",
  "base-150": "#E5E7EB",
  "base-500": "#6B7280",
  "base-600": "#374151",
  "base-900": "#1A1A1A",
  "green-50": "#F0F7F2",
  "green-100": "#E8F5EA",
  "green-150": "#CFE3D6",
  "green-500": "#1E6428",
  "green-600": "#1B3A2D",
  "terracotta-50": "#FDF0EA",
  "terracotta-150": "#E7BBA8",
  "terracotta-500": "#B5451B",
  "terracotta-600": "#963614",
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
// Palette = Design Guidelines (Sept 2026): Naijapath Green #1E6428 for nav bar + hero, white /
// warm-white content sections, Near Black #1A1A1A headings and footer, orange for CTAs only
// (terracotta #B5451B — the guideline orange #D24B00 is 4.4:1 with 16px white labels).
const PAIRS = [
  // ── Light content sections ──
  ["base-600", 1, "base-0", 4.5, "Body text on white"],
  ["base-600", 1, "base-50", 4.5, "Body text on warm white (Commission, Stories)"],
  [
    "base-600",
    1,
    "green-100",
    4.5,
    "Body text on Light Green Tint (stage cards, highlighted Join card)",
  ],
  ["base-600", 1, "terracotta-50", 4.5, "Body text on Light Orange Tint"],
  ["base-500", 1, "base-0", 4.5, "Supporting text, captions, supporting note (white)"],
  ["base-500", 1, "base-50", 4.5, "Supporting text on warm white"],
  ["base-900", 1, "base-0", 4.5, "Near-black H2/H3 on white"],
  ["base-900", 1, "base-50", 4.5, "Near-black H2 on warm white"],
  ["base-900", 1, "green-100", 4.5, "Near-black H3 on Light Green Tint"],
  ["green-500", 1, "base-0", 4.5, "Links, stat figures, eyebrow-free labels on white"],
  ["green-500", 1, "base-50", 4.5, "Links on warm white"],
  [
    "green-500",
    1,
    "green-100",
    4.5,
    "Ticker words / stage numbers / audience label on Light Green Tint",
  ],
  ["green-500", 1, "green-50", 4.5, "Green text on mint (agreed-actions chip)"],
  ["terracotta-500", 1, "base-0", 4.5, "Section label text on white pill"],
  ["terracotta-500", 1, "terracotta-50", 4.5, "Section label pill (terracotta tint)"],
  ["base-900", 1, "green-150", 4.5, "Text on green-150"],
  [
    "base-600",
    1,
    "green-150",
    4.5,
    "Agreed-actions tick chips / dashboard bar labels on green-150",
  ],
  // ── Naijapath Green: nav bar + hero ──
  ["base-0", 1, "green-500", 4.5, "Nav links, hero H1, white text on Naijapath Green"],
  ["base-0", 0.8, "green-500", 4.5, "Hero subheadline (white @ 80%, per guidelines)"],
  ["base-900", 1, "base-0", 4.5, "Hero badges / session card (white chips on green)"],
  // ── Orange CTAs ──
  [
    "base-0",
    1,
    "terracotta-500",
    4.5,
    "CTA label (Book a Session, Find Career Guidance, Subscribe…)",
  ],
  ["base-0", 1, "terracotta-600", 4.5, "CTA label on hover"],
  // ── Near Black footer ──
  ["base-0", 1, "base-900", 4.5, "Footer headings / tagline"],
  ["base-150", 1, "base-900", 4.5, "Footer links, captions, newsletter note"],
  ["danger-100", 1, "base-900", 4.5, "Form error text on the footer"],
  ["base-900", 1, "base-0", 4.5, "Newsletter input text (white field)"],
  ["base-500", 1, "base-0", 4.5, "Newsletter input placeholder (white field)"],
  // ── Status ──
  ["success-500", 1, "success-50", 4.5, "Status pill: Confirmed / Completed"],
  ["warning-500", 1, "warning-50", 4.5, "Status pill: Pending"],
  ["info-500", 1, "info-50", 4.5, "Status pill: info"],
  ["danger-500", 1, "base-0", 4.5, "Form error text on white"],
  // ── Non-text (UI components & meaningful graphics): 3:1 ──
  ["green-500", 1, "base-0", 3, "Focus ring on white / secondary (outline) button border"],
  ["green-500", 1, "base-50", 3, "Focus ring on warm white / stage track fill"],
  ["green-500", 1, "green-100", 3, "Focus ring / pause button border on Light Green Tint"],
  ["base-0", 1, "green-500", 3, "Focus ring + white outline button on Naijapath Green"],
  ["base-0", 1, "base-900", 3, "Focus ring on the footer / white input field boundary"],
  ["terracotta-500", 1, "base-0", 3, "Stage knobs (orange ring) on white"],
  ["terracotta-150", 1, "base-900", 3, "Location icon on the footer"],
  ["terracotta-150", 1, "green-500", 3, "Location icon in the top strip"],
  ["base-0", 1, "terracotta-500", 3, "Social icons on orange discs / seal text"],
  ["base-500", 1, "base-0", 3, "Input border on white field"],
  ["green-500", 0.78, "base-0", 3, "Dashboard chart bars (earlier weeks, 78%)"],
  ["amber-500", 1, "base-0", 3, "Rating stars (always paired with '4.9 / 5.0' text)"],
  ["danger-100", 1, "base-900", 3, "Error border on the footer"],
  ["danger-500", 1, "base-0", 3, "Error border on light surfaces"],
  ["base-600", 1, "base-0", 3, "Ghost/outline button border on white"],
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
