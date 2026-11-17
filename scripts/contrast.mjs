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
  "green-100": "#E8F0EB",
  "green-150": "#CFE3D6",
  "green-500": "#1B6B3A",
  "green-600": "#1B3A2D",
  "lime-400": "#C4F22F",
  "lime-500": "#B2E01C",
  "terracotta-50": "#FBEFEA",
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
const PAIRS = [
  ["base-600", 1, "base-0", 4.5, "Body text on white"],
  ["base-600", 1, "base-50", 4.5, "Body text on warm white (How it works)"],
  ["base-600", 1, "green-50", 4.5, "Hero subheadline / Beneficiaries card body on mint"],
  ["base-600", 1, "terracotta-50", 4.5, "Practitioners card body on terracotta tint"],
  ["base-500", 1, "base-0", 4.5, "Supporting text, captions, supporting note (white)"],
  ["base-500", 1, "base-50", 4.5, "Supporting text on warm white"],
  ["base-900", 1, "base-0", 4.5, "Near-black headings / card names on white"],
  ["base-900", 1, "terracotta-50", 4.5, "Practitioners card headline"],
  ["green-600", 1, "green-50", 4.5, "Hero H1 on mint"],
  ["green-600", 1, "base-0", 4.5, "Section H2 headlines on white"],
  ["green-600", 1, "base-50", 4.5, "Section H2 on warm white"],
  ["green-500", 1, "base-0", 4.5, "Stat numbers, links, ghost button text on white"],
  ["green-500", 1, "base-50", 4.5, "Stage names / links on warm white"],
  ["green-500", 1, "green-50", 4.5, "Hero tag pill text / Beneficiaries card CTA on mint"],
  ["green-500", 1, "green-100", 4.5, "Green pill text on green-100"],
  ["base-0", 1, "green-500", 4.5, "Primary button label"],
  ["base-0", 1, "green-600", 4.5, "Text on dark green (Commission, Organisations card, footer)"],
  ["base-0", 0.8, "green-600", 4.5, "Secondary text on dark green (white @ 80%)"],
  ["green-150", 1, "green-600", 4.5, "Footer link text / captions on dark green"],
  ["base-0", 1, "terracotta-500", 4.5, "Terracotta button label (Commission CTA, Subscribe)"],
  ["base-0", 1, "terracotta-600", 4.5, "Terracotta button label on hover"],
  ["terracotta-500", 1, "base-0", 4.5, "Section label text on white pill (incl. on dark band)"],
  ["terracotta-500", 1, "terracotta-50", 4.5, "FOR YOU label pill"],
  ["terracotta-600", 1, "terracotta-50", 4.5, "Practitioners card CTA link"],
  ["base-900", 1, "green-150", 4.5, "Text on green-150 (location pill on dark footer)"],
  ["success-500", 1, "success-50", 4.5, "Status pill: Confirmed / Completed"],
  ["warning-500", 1, "warning-50", 4.5, "Status pill: Pending"],
  ["info-500", 1, "info-50", 4.5, "Status pill: info"],
  ["danger-500", 1, "base-0", 4.5, "Form error text on white"],
  ["danger-100", 1, "green-600", 4.5, "Form error text on dark footer"],
  ["base-900", 1, "base-0", 4.5, "Newsletter input text (white field on dark footer)"],
  ["base-500", 1, "base-0", 4.5, "Newsletter input placeholder (white field)"],
  [
    "base-600",
    1,
    "green-150",
    4.5,
    "Agreed-actions tick chips / dashboard bar labels on green-150",
  ],
  // ── Non-text (UI components & meaningful graphics): 3:1 ──
  ["green-500", 1, "base-0", 3, "Focus ring on white / outline button border"],
  ["green-500", 1, "green-50", 3, "Focus ring on mint"],
  ["base-0", 1, "green-600", 3, "Focus ring on dark green"],
  ["base-0", 1, "green-600", 3, "White outline button border (Download Programme Brochure)"],
  ["base-500", 1, "base-0", 3, "Input border on white field"],
  ["base-0", 1, "green-600", 3, "White input field vs dark footer (field boundary)"],
  ["green-500", 1, "base-50", 3, "Path line / stage dots on warm white"],
  [
    "green-500",
    0.7,
    "base-50",
    3,
    "Stage numbers 01–05 before the path reaches them (70%, ≥48px text)",
  ],
  ["green-500", 1, "base-0", 3, "Stage number dots / icons on white cards"],
  ["base-600", 1, "green-50", 4.5, "Stories section label (grey caps) on the mint band"],
  ["lime-400", 1, "green-600", 4.5, "Brand CTA label / lime links + icons on dark green"],
  ["lime-400", 1, "green-500", 4.5, "Brand CTA label on hover"],
  ["green-600", 1, "lime-400", 4.5, "Text on lime (lit Join card, lime CTAs, top-bar tab)"],
  ["green-600", 1, "lime-500", 4.5, "Lime CTA label on hover"],
  ["base-600", 1, "base-100", 4.5, "Body text on the light grey bands (hero, Commission, Stories)"],
  ["green-600", 1, "base-100", 4.5, "Headings on the light grey bands"],
  ["green-150", 1, "green-500", 3, "Stage numerals 1–5 on green tiles (≥32px text)"],
  ["base-0", 1, "base-900", 4.5, "Hero copy on the photo scrim (scrim floor ≈ base-900 @ 72%)"],
  ["green-500", 0.78, "base-0", 3, "Dashboard chart bars (earlier weeks, 78%)"],
  ["green-150", 1, "green-600", 3, "Commission feature icons on dark green"],
  ["amber-500", 1, "base-0", 3, "Rating stars (always paired with '4.9 / 5.0' text)"],
  ["danger-100", 1, "green-600", 3, "Error border on dark footer"],
  ["danger-500", 1, "base-0", 3, "Error border on light surfaces"],
  ["base-600", 1, "base-0", 3, "Ghost/outline button border (Sign In) on white"],
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
