// Content lock for the homepage: extracts every piece of rendered text from the live page and
// either writes content-lock.md or checks the page against it.
//
//   node scripts/content-lock.mjs            → (re)write content-lock.md from the page
//   node scripts/content-lock.mjs --check    → diff the page against content-lock.md (exit 1 on any change)
//
// Options: --url <url> (default http://localhost:3000/). Browser: installed Edge on Windows,
// Chrome elsewhere; override with CONTENT_LOCK_BROWSER=chrome|msedge.
//
// What counts as content: text of headings, paragraphs, list items, buttons, links (with their
// href), labels, captions, table cells and any other element's own text; image alt text;
// aria-label / placeholder / title attributes; visually-hidden (sr-only) text. The page is
// rendered with prefers-reduced-motion so animated figures show their final values. The mobile
// menu is opened at 390px and captured as its own group.
//
// The check compares SETS of content (kind + text [+ href]), ignoring which section or element
// type carries it — a redesign may move or re-tag content, but must not add, drop or change it.

import { readFileSync, writeFileSync } from "node:fs";
import { chromium } from "playwright-core";

const args = process.argv.slice(2);
const CHECK = args.includes("--check");
const URL_ARG = args.includes("--url") ? args[args.indexOf("--url") + 1] : "http://localhost:3000/";
const LOCK_PATH = new URL("../content-lock.md", import.meta.url);
const channel =
  process.env.CONTENT_LOCK_BROWSER || (process.platform === "win32" ? "msedge" : "chrome");

/**
 * Runs in the page: returns [{ group, items: [{ kind, text, href? }] }] in DOM order.
 * `mode` "page" groups by site header / main's sections / site footer; "dialog" captures the
 * open dialog as one group.
 */
function extractInPage(mode) {
  const norm = (s) => (s ?? "").replace(/\s+/g, " ").trim();
  const UNIT =
    "h1,h2,h3,h4,h5,h6,p,li,a,button,label,dt,dd,th,td,caption,figcaption,blockquote,legend,option,summary,time";
  const hiddenCache = new Map();
  const isHidden = (el) => {
    if (hiddenCache.has(el)) return hiddenCache.get(el);
    const cs = getComputedStyle(el);
    const own = cs.display === "none" || cs.visibility === "hidden" || el.hasAttribute("hidden");
    const res = own || (el.parentElement ? isHidden(el.parentElement) : false);
    hiddenCache.set(el, res);
    return res;
  };
  const within = (node, pred) => {
    for (let n = node.nodeType === 1 ? node : node.parentElement; n; n = n.parentElement) {
      if (pred(n)) return true;
    }
    return false;
  };
  const isSr = (n) => within(n, (e) => e.classList?.contains("sr-only"));
  const isAriaHidden = (n) => within(n, (e) => e.getAttribute?.("aria-hidden") === "true");

  /** Text of `el`, joining text nodes with a space across non-inline element boundaries. */
  const textOf = (el, keep) => {
    const nodes = [];
    const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    for (let t = w.nextNode(); t; t = w.nextNode()) {
      if (!t.textContent.trim() || isHidden(t.parentElement) || !keep(t)) continue;
      nodes.push(t);
    }
    let out = "";
    nodes.forEach((t, i) => {
      if (i > 0) {
        const a = nodes[i - 1].parentElement;
        const b = t.parentElement;
        const inline = (e) => getComputedStyle(e).display === "inline";
        if (a !== b && (!inline(a) || !inline(b))) out += " ";
      }
      out += t.textContent;
    });
    return norm(out);
  };
  const kindOf = (el) => {
    const t = el.tagName.toLowerCase();
    if (/^h[1-6]$/.test(t)) return t;
    if (t === "button") return "button";
    return t === "p" || t === "li" || t === "label" ? t : "text";
  };

  let roots;
  if (mode === "dialog") {
    roots = [...document.querySelectorAll('[role="dialog"]')];
  } else {
    const siteHeader =
      document.querySelector('[data-slot="site-header"]') ?? document.querySelector("body header");
    const main = document.querySelector("main");
    const footer = [...document.querySelectorAll("footer")].find((f) => !f.closest("main"));
    roots = [siteHeader, ...(main ? [...main.children] : []), footer].filter(Boolean);
  }

  return roots.map((root, idx) => {
    const heading = root.querySelector("h1,h2");
    const name =
      mode === "dialog"
        ? "mobile-menu"
        : root.getAttribute("data-slot") === "site-header"
          ? "site-header"
          : root.tagName === "FOOTER"
            ? "site-footer"
            : root.id || (heading ? norm(heading.textContent).slice(0, 40) : `block-${idx}`);
    const items = [];
    const push = (item) => {
      if (!item.text) return;
      const key = `${item.kind}|${item.text}|${item.href ?? ""}`;
      if (!items.some((i) => `${i.kind}|${i.text}|${i.href ?? ""}` === key)) items.push(item);
    };

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
    for (let el = root; el; el = walker.nextNode()) {
      if (isHidden(el)) continue;
      const isUnit = el.matches(UNIT);
      const insideUnit =
        !isUnit && el.parentElement?.closest(UNIT) && root.contains(el.parentElement.closest(UNIT));

      if (el.tagName === "A") {
        // Accessible name (sr-only included, aria-hidden excluded) + any differing visible text.
        const acc = norm(el.getAttribute("aria-label")) || textOf(el, (t) => !isAriaHidden(t));
        push({ kind: "link", text: acc, href: el.getAttribute("href") ?? "" });
        const vis = textOf(el, (t) => !isSr(t));
        if (vis && vis !== acc) push({ kind: "text", text: vis });
      } else if (isUnit && !el.closest("a")) {
        const containsUnit = el.querySelector(UNIT);
        const own = (t) => !containsUnit || t.parentElement.closest(UNIT) === el;
        push({ kind: kindOf(el), text: textOf(el, (t) => own(t) && !isSr(t)) });
        push({ kind: "sr-only", text: textOf(el, (t) => own(t) && isSr(t)) });
      } else if (!isUnit && !insideUnit && !el.closest("a")) {
        const direct = (t) => t.parentElement === el;
        push({ kind: isSr(el) ? "sr-only" : "text", text: textOf(el, direct) });
      }

      if (el.tagName === "IMG") push({ kind: "alt", text: norm(el.getAttribute("alt")) });
      for (const attr of ["aria-label", "placeholder", "title"]) {
        if (el.hasAttribute(attr) && el.tagName !== "A")
          push({ kind: attr, text: norm(el.getAttribute(attr)) });
      }
      if (el.tagName === "INPUT" && el.type !== "hidden" && el.id) {
        const label = document.querySelector(`label[for="${el.id}"]`);
        if (label) push({ kind: "label", text: textOf(label, (t) => !isAriaHidden(t)) });
      }
    }
    return { group: name, items };
  });
}

async function extract() {
  const browser = await chromium.launch({ channel });
  try {
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "reduce",
    });
    const page = await ctx.newPage();
    await page.goto(URL_ARG, { waitUntil: "networkidle" });
    // Scroll the whole page so lazily-hydrated sections settle, then return to the top.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 500) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(800);
    const groups = await page.evaluate(extractInPage, "page");
    await page.close();

    // Mobile menu (only exists once opened).
    const mobile = await ctx.newPage();
    await mobile.setViewportSize({ width: 390, height: 844 });
    await mobile.goto(URL_ARG, { waitUntil: "networkidle" });
    await mobile.waitForTimeout(1500);
    const trigger = mobile.locator('button[aria-haspopup="dialog"]').first();
    if (await trigger.count()) {
      await trigger.click();
      await mobile.waitForSelector('[role="dialog"]', { timeout: 8000 });
      await mobile.waitForTimeout(400);
      const menu = await mobile.evaluate(extractInPage, "dialog");
      for (const m of menu) groups.push({ ...m, group: "mobile-menu" });
    }
    return groups.filter((g) => g.items.length);
  } finally {
    await browser.close();
  }
}

const flatKey = (i) =>
  `${i.kind === "link" ? "link" : ["alt", "aria-label", "placeholder", "title", "label"].includes(i.kind) ? i.kind : "text"}|${i.text}${i.kind === "link" ? ` → ${i.href}` : ""}`;

function toSet(groups) {
  return [...new Set(groups.flatMap((g) => g.items.map(flatKey)))].toSorted();
}

function render(groups) {
  const lines = [
    "# Content lock — NaijaPath homepage",
    "",
    "Every piece of text the homepage renders, captured from the live page before the",
    "`redesign-v3` work. **The redesign may move, re-group or re-style this content, but must not",
    "add, remove, shorten or rewrite any of it.**",
    "",
    "- Source: the rendered page (" + URL_ARG + ") at 1440×900 with reduced motion (animated",
    "  figures at their final values), plus the mobile menu opened at 390px.",
    "- Includes visually-hidden (screen-reader) text, image alt text, aria-labels, form labels and",
    "  placeholders, and every link's destination.",
    '- The "Testimonial pending" placeholder cards render in development only',
    "  (`NUXT_PUBLIC_SHOW_PLACEHOLDER_TESTIMONIALS`); production omits that section.",
    "- Re-check after any change: `node scripts/content-lock.mjs --check` (dev server running).",
    "",
  ];
  for (const g of groups) {
    lines.push(`## ${g.group}`, "");
    for (const i of g.items) {
      const tag = i.kind.toUpperCase();
      lines.push(
        i.kind === "link" ? `- **${tag}** ${i.text} → \`${i.href}\`` : `- **${tag}** ${i.text}`,
      );
    }
    lines.push("");
  }
  lines.push(
    "## Machine-readable set",
    "",
    "Used by `--check`. Do not edit by hand; regenerate only when the client approves a copy change.",
    "",
    "```json",
    JSON.stringify(toSet(groups), null, 2),
    "```",
    "",
  );
  return lines.join("\n");
}

const groups = await extract();

if (!CHECK) {
  writeFileSync(LOCK_PATH, render(groups));
  console.log(
    `content-lock.md written: ${groups.length} groups, ${toSet(groups).length} unique items.`,
  );
} else {
  const md = readFileSync(LOCK_PATH, "utf8");
  const json = md.match(/## Machine-readable set[\s\S]*?```json\n([\s\S]*?)\n```/);
  if (!json) throw new Error("content-lock.md has no machine-readable set");
  const locked = new Set(JSON.parse(json[1]));
  const now = new Set(toSet(groups));
  const missing = [...locked].filter((k) => !now.has(k));
  const added = [...now].filter((k) => !locked.has(k));
  if (!missing.length && !added.length) {
    console.log(`Content matches content-lock.md (${locked.size} items). No differences.`);
  } else {
    if (missing.length)
      console.log(`MISSING from page (${missing.length}):\n  ${missing.join("\n  ")}`);
    if (added.length) console.log(`NOT IN LOCK (${added.length}):\n  ${added.join("\n  ")}`);
    process.exitCode = 1;
  }
}
