// Builds public/og-image.jpg (1200×630) and public/apple-touch-icon.png (180×180) from brand
// tokens and the hero photograph. Re-run after replacing the hero photo or the brandmark:
//   node scripts/generate-brand-assets.mjs
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = new URL("../", import.meta.url);
const path = (p) => new URL(p, root);

// Apple touch icon from the favicon mark.
const favicon = await readFile(path("public/favicon.svg"));
await sharp(favicon, { density: 600 })
  .resize(180, 180)
  .flatten({ background: "#1E6428" })
  .png()
  .toFile(fileURLToPath(path("public/apple-touch-icon.png")));

// OG image: mint panel with the headline (left) + the hero photo (right).
const W = 1200;
const H = 630;
const photo = await sharp(await readFile(path("public/images/hero-session.jpg")))
  .resize(480, H, { fit: "cover", position: "centre" })
  .toBuffer();

const escape = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const panel = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="#F0F7F2"/>
  <g transform="translate(64 64)">
    <rect width="44" height="44" rx="11" fill="#1E6428"/>
    <path d="M10 32c6 0 7-6 12-10s7-4 12-10" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
    <text x="58" y="31" font-family="Plus Jakarta Sans, Segoe UI, Arial, sans-serif" font-size="26" font-weight="700" fill="#1B3A2D">NaijaPath</text>
  </g>
  <text font-family="Plus Jakarta Sans, Segoe UI, Arial, sans-serif" font-weight="700" font-size="54" fill="#1B3A2D" letter-spacing="-1">
    <tspan x="64" y="260">${escape("Navigate your career")}</tspan>
    <tspan x="64" y="326">${escape("with structured,")}</tspan>
    <tspan x="64" y="392">${escape("verified guidance.")}</tspan>
  </text>
  <text x="64" y="540" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="22" fill="#374151">${escape("Nigeria's First Digital Career Service Platform")}</text>
  <path d="M64 580 C 200 560, 300 600, 640 570" fill="none" stroke="#1E6428" stroke-width="2"/>
</svg>`);

const og = await sharp(panel)
  .composite([{ input: photo, left: W - 480, top: 0 }])
  .jpeg({ quality: 86, mozjpeg: true })
  .toBuffer();
await writeFile(path("public/og-image.jpg"), og);

console.log("og-image.jpg and apple-touch-icon.png written");
