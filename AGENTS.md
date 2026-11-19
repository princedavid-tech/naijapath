# AGENTS.md — rules and surprises for anyone (human or agent) working here

Read `docs/index.md` for the catalogue. This file is what surprised us while building it.

## Non-negotiables

1. **Copy is verbatim** from the *Homepage Content & Design Brief (Oct 2026, v1.0)* and lives in
   `app/features/marketing/home/domain/home-copy.ts`. Don't edit, "improve" or add marketing lines.
   Any string not in the brief goes in `home-microcopy.ts` and must be reviewed by the client.
   The brief itself uses both "NaijaPath" and "Naijapath" — preserved as written; ask before unifying.
2. **No invented testimonials, quotes, names, employers or statistics.** Placeholder testimonial cards
   only render with `NUXT_PUBLIC_SHOW_PLACEHOLDER_TESTIMONIALS` (default off in production).
3. **No AI-generated imagery of people.** See `IMAGE_CREDITS.md`.
4. Accessibility rules from the Design Guidelines are launch blockers: run `npm run contrast` after any
   colour change; keep focus rings, 44px targets, 16px body text, `aria-live` for status.
5. **Colour follows the Design Guidelines (Sept 2026)** on the final layout (Nov 2026):
   Naijapath Green `green-500` (#1E6428) is a surface **only** for the nav bar and the hero;
   every other section is white / warm white (`base-50`) / Light Green Tint (`green-100`);
   H1/H2 on light surfaces are Near Black (`base-900`); green is for links, icons, figures and
   secondary (outline) buttons; **orange is for CTAs and small accents only** — implemented as
   `terracotta-500` (#B5451B) because the guideline #D24B00 gives 4.4:1 with 16px white labels;
   footer is Near Black. `green-600` is a hover step, not a surface. No lime. Pill CTAs and
   black-and-white photos come from the approved layout.

## Things that will bite you

- **`--color-*: initial`** — stock Tailwind colours render *nothing*, silently. Invisible element?
  Check the palette first.
- **Component folder naming.** Nuxt prefixes component names with their folder path. A file
  `n/field/NLabel.vue` registers as `NFieldNLabel`, so `<NLabel>` renders an empty comment — and
  **typecheck does not catch it**. Put each part in a folder named after it (`n/label/NLabel.vue`).
- **New `ui/` directory → restart the dev server.** The `features/**/ui` glob runs once at config load.
- **tailwind-merge vs custom tokens.** New `--text-*` / `--shadow-*` tokens must be added to the
  `extendTailwindMerge` config in `app/utils/utils.ts`, or `cn()` will drop them when merged with a
  text colour.
- **Grids need `grid-cols-1` on mobile.** Implicit `auto` tracks grow to min-content; one
  non-wrapping button made the Commission band 53px wider than a 320px screen.
- **`sr-only` on a `<table>` doesn't hide its width** (tables ignore width/overflow). Wrap it in a
  `div.sr-only`.
- **`@nuxt/image` attributes:** `fetchpriority`/`decoding` go in `:img-attrs` (on `<NuxtPicture>` they
  land on `<picture>` and do nothing). Use prefixed `sizes` (`xs:100vw sm:480px …`); an unprefixed
  `100vw` produced bogus `1w`/`2w` srcset candidates.
- **Header offset for anchors** is `scroll-margin-top` on `[id]` (Nuxt's router reads it). Don't
  also add `scroll-padding-top` to `html` — the two add up.
- **`status: false` arrives on HTTP 200.** Every write goes through `unwrapApiResponse`.
- **PowerShell 5.1 `Get-Content -Raw | Set-Content`** re-encodes UTF-8 as ANSI and mangles `—`, `→`,
  `≥`. Edit files with an editor/tool, not shell pipelines.
- The hero H1 sets on **three lines at ≥ 1280px** at 48px in the final layout's half-width column
  (the earlier two-line rule belonged to the previous layout). If you change the hero grid or font,
  re-measure (Playwright: H1 height / line-height).
- **Scoped `:global(.x) .y` compiles to just `.x`** in Vue SFCs — `:global(.js) .foo { transform… }`
  scaled `<html>` to nothing and blanked the page. Put such rules in an unscoped `<style>` block
  with a component-unique class (see `how-it-works.vue`).
- The global `svg { max-width: 100% }` squashes an SVG inside a 1px-wide parent; add `max-w-none`.
- `NUXT-ERROR-OVERLAY` (dev) has its own `<main>`: a stale overlay makes axe report a duplicate
  main landmark. Restart `nuxt dev` or run axe against a production build.
- The full desktop nav only fits at **≥ 1440px** at 16px (four links + two CTAs). Below that the header
  shows "Book a Session" + the menu. Don't shrink nav text below 16px to force it.

## Performance decisions (measured — don't undo casually)

Each of these moved Lighthouse mobile (simulated slow 4G, 4× CPU) from 73 → 88–89; desktop is 100.

- `routeRules["/"].prerender` — the homepage is server-rendered **at build** and served
  pre-compressed (was uncompressed per-request SSR). @nuxt/image pre-generates every srcset variant.
- `features.inlineStyles: true` — the global Tailwind sheet is inlined; no render-blocking CSS.
- Deferred hydration in `ui/mh-home/index.vue`: header + hero `hydrate-on-idle`, everything else
  `hydrate-on-visible` (400px early). Before this the browser held first paint behind hydration.
- The mobile menu (Reka UI) is its own lazily-loaded component, pre-fetched on idle.
- Newsletter (vee-validate + yup + axios) is `hydrate-on-visible` → not in the initial bundle.
- Icons: raw SVG for only the used weights from `@phosphor-icons/core` (the Vue package shipped
  all 6 weights per icon, ~19 KB gz). Dates: built-in `Intl` instead of Luxon (~23 KB gz).
- `defer-render` (content-visibility) on **light** below-the-fold sections only. Not on dark
  sections: axe/Lighthouse can't see the background of skipped content and reports false
  contrast failures for light-on-dark text.
- No global `text-wrap: pretty` on paragraphs (≈0.3 s extra layout on a throttled phone).
- Plus Jakarta Sans loads `latin` only; "₦" falls back to the system sans. Re-add `latin-ext`
  (+~50 KB) if the brand wants Jakarta's own ₦ glyph.
- The LCP image has no `decoding="async"` (it delayed the paint).
- AVIF/WebP quality 60.

Remaining gap to mobile ≥ 90: the Nuxt runtime's start-up task on a 4×-throttled CPU sits in
Lighthouse's simulated first-paint chain. Real (unthrottled) first paint and LCP are ~0.43 s.

## Building while `nuxt dev` is running

`NUXT_BUILD_DIR=.nuxt-build npm run build` builds into a separate directory so it doesn't fight the
dev server over `.nuxt`. The build bundles **sharp binaries for the build machine's OS** — build on
the same OS/arch you deploy to (e.g. in CI on Linux).

## Verification loop

`npm run check` (oxfmt → oxlint → typecheck), then `npm run contrast`. There is no unit-test suite by
design (see ARCHITECTURE.md Part IV); behaviour was verified in a real browser at 320 / 375 / 768 /
1024 / 1280 / 1440 / 1920 with axe-core (0 violations outside Nuxt DevTools).

## Deliberately not copied from ARCHITECTURE.md

Vuetify and its cascade-layer apparatus, the dev mock-auth block, two data layers, TanStack Query (no
server reads on this page), and the README-style component index.
