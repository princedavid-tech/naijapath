# Build prompt: NaijaPath homepage

Copy everything below the line into your coding agent (Claude Code, Cursor, etc.). Attach `ARCHITECTURE.md`, the Homepage Content & Design Brief PDF and the Design Guidelines PDF alongside it.

---

## Role and goal

You are a senior front-end engineer and product designer. Build the **NaijaPath homepage**: a production-ready, responsive, accessible marketing page for Nigeria's first digital career service platform.

It must look like a credible, well-funded institution designed it by hand. Think of the standard of a serious bank, Stripe's restraint, or the UK National Careers Service's clarity, with Nigerian warmth. **It must not look AI-generated or templated.** If any decision makes the page look like every other SaaS landing page, choose differently.

The page has two audiences: **Beneficiaries** (individuals seeking career guidance) and **Project Clients** (development organisations, government programmes and corporates commissioning career services). Every section serves one or both of them. NaijaPath is a quality-assurance platform, not a marketplace, a mentorship app or a job board.

## Source documents and order of authority

1. **Homepage Content & Design Brief (Oct 2026, v1.0).** It holds the approved copy and the section-by-section layout. Use the copy **verbatim**. Do not rewrite, "improve" or add marketing lines. Where you need a microcopy string the brief doesn't give (alt text, aria-labels, form errors), write it plainly and list it in your final summary.
2. **Design Guidelines (Sept 2026).** Typography, accessibility, components and contrast rules. These are launch requirements.
3. **ARCHITECTURE.md.** The engineering and design-system process: tokens, component anatomy, folder structure and tooling. Follow its Part III bootstrap order, adapted as described below.

Where the brief and the guidelines conflict, the brief wins on **layout and colour placement**, because it is newer and approved. The guidelines win on **readability and accessibility rules** (type sizes, contrast, focus, touch targets, never colour alone). Resolutions are already made in the token section below. Don't re-litigate them.

## Stack (from ARCHITECTURE.md, adapted for a marketing site)

- **Nuxt 4** + **Vue 3.5** with `<script setup lang="ts">` everywhere, and TypeScript strict.
- **SSR on** for this page, because the homepage needs SEO. Only the Three.js canvases render client-side (see Three.js below).
- **Tailwind CSS v4**, configured CSS-first in `app/assets/css/tailwind.css` with `@theme inline`.
- **CVA** for variants, in sibling `*-variants.ts` files. **`cn` = `twMerge(clsx(...))`** in `app/utils/utils.ts`.
- **Reka UI** for headless behaviour (mobile nav dialog, focus trapping).
- **Do not install Vuetify.** ARCHITECTURE.md §3 and Part IV say a greenfield project without Vuetify overlays should drop it. This removes `layers.css`, `settings.scss`, the module-order hazard and the triple breakpoint definitions. Breakpoints are defined **once**, in `tailwind.css`.
- **Phosphor icons** through a name→component map in `app/utils/icons.ts`. Templates use semantic names (`icon="practitioners"`), never `PhUsers` directly.
- **three** (latest) for the two WebGL pieces. No `@tresjs`, no extra 3D libraries.
- **GSAP + ScrollTrigger** for scroll choreography, or a small IntersectionObserver composable if you can keep it under ~40 lines. No AOS and no Framer-style "fade-up everything" libraries.
- **@nuxt/fonts** to self-host Plus Jakarta Sans and Inter. **@nuxt/image** for responsive AVIF/WebP images.
- vee-validate + yup for the newsletter form. The axios client and `ApiResponse` envelope come from ARCHITECTURE.md §8–10.
- Tooling: oxlint, oxfmt, knip, husky + nano-staged. Verification loop: `oxfmt → oxlint → typecheck`.

## Design tokens (`app/assets/css/tailwind.css`)

Copy the ARCHITECTURE.md §2 pattern exactly: put raw hex in `:root` under `@layer base`, map it in `@theme inline`, and start with `--color-*: initial` and `--breakpoint-*: initial`, so off-palette Tailwind colours render nothing. Keep the ramp shape **50 / 100 / 150 / 500 / 600** (plus base steps).

| Token ramp | 50 (bg) | 100 / 150 (border) | 500 (solid) | 600 (hover/deep) | Use |
|---|---|---|---|---|---|
| `green` (brand) | `#F0F7F2` | `#E8F0EB` / `#CFE3D6` | `#1B6B3A` | `#1B3A2D` | Headlines, primary buttons, accents; 600 = dark sections and footer |
| `terracotta` | `#FBEFEA` | `#F3D9CE` / `#E7BBA8` | `#B5451B` | `#963614` | Section labels, the primary CTA on dark backgrounds, newsletter button |
| `base` | 0 `#FFFFFF`, 50 `#F9F7F4` (warm white), 100 `#F3F4F6`, 150 `#E5E7EB` | | 500 `#6B7280` (supporting), 600 `#374151` (body) | 900 `#1A1A1A` (headings) | Text, surfaces, borders |
| `success` / `warning` / `danger` / `info` | tints | | `#15803D` / `#B45309` / `#B91C1C` / `#1D4ED8` | | Status only, always paired with a text label |
| `amber` | | | `#D97706` | | Rating stars only |

- **Terracotta `#B5451B` replaces the guidelines' orange `#D24B00`.** White on `#D24B00` is only 3.4:1, which fails AA for 16px button text. White on `#B5451B` is about 5.5:1, which passes. Verify every text/background pair with a contrast check, and list the ratios in your summary.
- Never use pure black. Never use grey lighter than `#6B7280` for text on white.
- Dark green (`green-600`) appears **only** in the Commission section band, the Organisations audience card and the footer, exactly as the brief places it. Every other reading surface is white, warm white or mint.
- `--spacing: 0.25rem`. Derive radius from one `--radius: 12px` (sm = −4px, lg = base, xl = +4px). Buttons use 8px, hero CTAs may be pill-shaped, cards use 12px.
- Shadows: define two tokens only, `--shadow-card: 0 2px 8px rgb(0 0 0 / .08)` and `--shadow-card-hover: 0 4px 16px rgb(0 0 0 / .12)`. Nothing else.

### Typography

- Headings and UI: **Plus Jakarta Sans**. Hero 48–64px/700 with tight tracking (−0.02em) and line-height 1.05–1.1. H2 28–32px/600, H3 22–24px/600.
- Body: **Inter** 400/500 at 16–18px, line-height 1.6, max 68ch, always left-aligned.
- Section labels: small caps pills, 13px, letter-spacing 0.05em.
- Use `font-variant-numeric: tabular-nums` on the trust-bar stats and dashboard figures.
- Build a fluid type scale with `clamp()` so the hero never exceeds two lines on desktop.

## Hard bans: the "AI-generated look"

Don't do any of these anywhere. Check the finished page against this list before you report done.

1. No purple, violet, indigo or blue-to-pink gradients. No gradient text. No gradient mesh backgrounds.
2. No glowing orbs, blurred colour blobs, aurora backgrounds or "noise + glow" hero effects.
3. No glassmorphism, frosted cards or backdrop-blur panels. The floating cards are solid white with a 1px `base-150` border.
4. No emoji as icons, and no ✨ sparkles or 🚀 rockets anywhere.
5. No icon sitting in a pastel circle above a centred title in a uniform three-card grid. Where the brief asks for cards, vary the scale, alignment and content density (see the section notes).
6. No AI-generated imagery of people. No smooth-skinned synthetic faces, no 3D clay avatars, no isometric illustrations, no stock "diverse team high-fiving" shots.
7. No invented copy: no "Unlock your potential", "Empower your journey", "Seamless", "Revolutionise" or "Elevate". Use the brief's copy only.
8. No uniform fade-up-on-scroll for every element. Motion is purposeful and rare (see Motion).
9. No dark mode, no neon, no oversized drop shadows, no 2xl rounded everything, no pill buttons outside the hero.
10. No lorem ipsum, no fake logos in a "trusted by" strip and no fabricated testimonials or statistics.
11. No centred-everything layout. The brief's split layouts are asymmetric (55/45) on purpose. Keep them that way.
12. No cursor-follower blobs, magnetic buttons, parallax-everything or scroll-jacking.

## What makes it look designed by a person

- **A real grid.** Use a 12-column grid with a 1200–1280px container, deliberate asymmetry and generous, consistent vertical rhythm (section padding 96–128px desktop, 64px mobile).
- **Editorial details.** Fine 1px rules between trust-bar tiles; stage numbers `01–05` set large in `green-500` at reduced opacity as a typographic element; captions under photos in `base-500`; small location pills ("Abuja · Lagos · Diaspora").
- **Product truth.** The floating cards (Session Confirmed, Agreed Actions, Cohort dashboard) are built as real HTML/CSS UI components, not screenshots. They use the same tokens and type as the platform would, so they read as a glimpse of the actual product.
- **One signature motif:** "the path". A single thin line (1.5px, `green-500`) that represents a structured career journey. It appears in the hero WebGL scene, draws between the five stages, and ends at the footer. This is the visual idea that ties the page together. Don't add competing motifs.
- **Texture with restraint.** Use a very faint contour/topographic line pattern (SVG, `green-150` at about 40% opacity) on mint sections only, as a quiet nod to "navigating" and "path".

## Images

- Use **real photography of Nigerian professionals** in genuine career-guidance settings: a practitioner and beneficiary at a desk, a virtual session on a laptop, an organisation's cohort workshop. Natural light, real offices, true skin tones and no heavy grading.
- Sources, in order: (1) the client's own shoot (leave clearly named slots: `/public/images/hero-session.jpg`, `/public/images/beneficiary-session.jpg`); (2) licensed stock of Nigerian or West African professionals from Unsplash, Pexels or Nappy. Record each source and licence in `IMAGE_CREDITS.md`.
- **Never generate photos with AI.**
- Treatment: a consistent crop ratio per slot (hero 4:5, beneficiary 1:1), 12px radius, and no filters. Use `@nuxt/image` with `sizes`, AVIF/WebP and `fetchpriority="high"` on the hero image only. Everything else is lazy.
- Alt text should be descriptive, e.g. "A career practitioner reviews a session plan with a young professional at a desk". Decorative images get `alt=""`. Practitioner photos follow the format "Profile photo of [Name], [Specialisation]".

## Three.js: only where it earns its place

There are exactly **two** WebGL pieces. Both reinforce "structured path". Neither is decoration for its own sake.

### 1. Hero: "The Path" (behind the left copy column)

A low-contrast 3D scene on the mint background: a gently undulating field of contour lines (like a topographic map), drawn as `THREE.Line` segments in `green-150`/`green-500` at low opacity. A single brighter path line (`TubeGeometry` along a `CatmullRomCurve3`, `green-500`) threads through five small nodes that mark the five stages.

- On load, the path draws in over about 1.6s using `drawRange`. The camera drifts very slowly, under 2° of rotation, in response to pointer position (desktop only, damped).
- It must stay subtle. The headline is the hero, not the canvas. The canvas never sits behind text at a contrast that hurts readability. Keep the copy area clear or at 15% intensity or less.
- The right column stays the photograph, with the "Session Confirmed" card overlapping its bottom-left corner, as the brief specifies.

### 2. Section 06, How NaijaPath Works: the path draws through the stages

As the section scrolls into view, the same path line (2D projection, or a shallow 3D tube) draws from Stage 01 to Stage 05, lighting each stage's number as it arrives. On mobile this becomes a vertical line with connector dots on the left (the brief's mobile spec). Use plain SVG `stroke-dashoffset` for this, not WebGL.

### Engineering rules for both

- Build each as a `useThreeScene` composable plus a presentational component in the feature's `ui/` folder, mounted inside `<client-only>` with a **static SVG fallback** that renders during SSR and for no-JS.
- `prefers-reduced-motion: reduce` → no animation; render the final static frame.
- Cap `devicePixelRatio` at 1.5. Pause rendering when offscreen (IntersectionObserver) and when the tab is hidden. Dispose of geometries, materials and the renderer on unmount.
- Lazy-import `three` (`await import('three')`) so it isn't in the initial bundle.
- Budget: the Three.js chunk is ≤ 150KB gzipped and loaded after first paint; LCP is unaffected, because the hero photo stays the LCP element.
- On devices with `navigator.hardwareConcurrency <= 4` or without WebGL2, show the static SVG.

## Motion (everything else)

- Easing: `cubic-bezier(0.2, 0.7, 0.2, 1)`. Durations of 200ms (UI), 400ms (reveals) and 1200–1600ms (path draws).
- Reveals are limited to: the hero copy (one staggered sequence on load), the floating cards (a small 8px rise and fade, once), the trust-bar numbers (count up once, honouring tabular nums) and the path draw. Nothing else animates on scroll.
- Hover states: buttons darken to the 600 step; cards lift with the hover shadow token; text links show a moving underline. No scale-bounce.
- Every motion respects `prefers-reduced-motion`.

## Section-by-section build notes

Use the brief's copy exactly. These notes add the craft layer on top of the brief's layout.

1. **Navigation.** White bar with a 1px bottom rule; it becomes sticky with a subtle shadow after 80px of scroll. Logo left (existing green brandmark). Four links in the brief's order: "Commission a Programme" in `green-600` at weight 600, the others in `base-600` at 500, to give the audience weight difference the brief asks for. "Sign In" is a ghost button; "Book a Session" is filled `green-500`. Mobile: a Reka UI dialog sheet with focus trap, links stacked, and both CTAs as full-width stacked buttons.
2. **Hero.** Mint `#F0F7F2` background, 55/45 split, at most about 88vh so the trust bar peeks above the fold. Green pill tag, the headline in `green-600` (two lines maximum), the subheadline in `base-600` at 18px. Primary CTA "Find Career Guidance →" filled `green-500`; secondary "Commission a Programme" outlined. Photo on the right, with the floating **Session Confirmed** card (a real component: avatar initials "DA", name, time and a green "Confirmed" status pill with a dot **and** text). Badge 1 and Badge 2 sit as small solid white chips near the photo's top-right, not on the copy side.
3. **Trust bar.** White band. Four tiles with 1px vertical dividers (2×2 on mobile with horizontal dividers). Icon (Phosphor, `green-500`, 24px, no circle), big tabular number, label and sub-label. Count up once on view.
4. **For Beneficiaries.** White, 50/50. Terracotta "FOR YOU" label. Photo with an overlapping **Agreed Actions** session-record card: three tick-marked actions, a practitioner name, a date in Africa/Lagos time (use the date-formatter pattern from ARCHITECTURE.md §5.3; never hard-code a time pattern in a template), and a "Shared with you" footer. The supporting note sits below the CTA in small grey italic.
5. **Commission a Programme.** Full-width `green-600` band (one of only three dark surfaces). White text with contrast-checked pairs. A terracotta-on-white label pill. A 2×2 feature grid with **left-aligned** icon + bold label + one line, separated by fine `green-500/30` rules rather than boxed cards. On the right, a floating **cohort dashboard** card (white): sessions completed, beneficiary count and interview conversion rate, plus a small inline bar or sparkline drawn in SVG with tabular figures. Label every figure in it "Sample data". Primary CTA is terracotta filled; secondary "Download Programme Brochure" is a white outline. It should feel enterprise and audit-ready, not like a startup pitch.
6. **How NaijaPath Works.** Warm white background. Centred label, headline and subheadline. Five stage cards in a row on desktop, joined by the drawn path (see Three.js §2), each with a large `01–05` number, the stage name and the copy. Stack vertically on mobile with left connector dots.
7. **Social proof.** White. Small grey caps label and centred headline. One **featured** larger testimonial card plus two standard ones (an asymmetric layout, not three equal boxes). The brief has no real testimonials yet, so render placeholder cards **clearly marked "Testimonial pending"** with neutral grey avatar silhouettes, and gate them behind a `SHOW_PLACEHOLDER_TESTIMONIALS` flag that defaults to `false` in production. Never invent quotes, names or employers.
8. **Join the Platform.** Centred label and headline. Three "front doors": a mint card (Beneficiaries), a terracotta-tint card (Practitioners) and a `green-600` card with white text (Organisations). Each has an icon at the top, then the headline, the body and a text-link CTA with an arrow that slides 4px on hover. Make the cards equal width but let the content breathe; don't pad to equal height with empty space.
9. **Footer.** `green-600` background (the brief's choice; it passes contrast with white). Logo, tagline and a green location pill on the left; three link columns in the centre; the "Career Brief" newsletter on the right with a terracotta Subscribe button. The bottom strip has the copyright on the left and LinkedIn, X and YouTube icons with aria-labels on the right. The signature path line ends here as a thin rule that runs into the logo.

## Architecture: apply ARCHITECTURE.md's process

- **Composition over configuration (§1).** Build parts, not prop-heavy components: `NCard`, `NCardHeader`, `NCardTitle`, `NCardContent`, `NCardFooter`; `NButton` with `buttonVariants` (`color` × `variant` via `compoundVariants`, empty-string base variants); `NBadge`/`NPill`; `NSectionLabel`; `NContainer`; `NStat`. Every part uses `data-slot`, `cn(defaults, props.class)`, a typed `class` prop and a slot instead of a content prop.
- **Status system (§5.1).** Create a minimal `app/utils/status/` with registry, resolver and palette, so "Confirmed", "Completed" and "Pending" pills in the mock UI cards render through `<NStatus>`, always with colour **and** text.
- **Icons (§5.2)** use the semantic name map. **Dates (§5.3)** use `APP_TIME_ZONE = "Africa/Lagos"` and a single formatter. Never hard-code `h:mm a` in a template.
- **Folder layout.** Put the design system in `app/components/n/`. Put the page in a slice, `app/features/marketing/home/`, with `domain/` (section copy as typed constants, taken verbatim from the brief, and route paths), `ui/mh-home/` (index.vue plus one presentational component per section: `hero.vue`, `trust-bar.vue` and so on) and `composition/use-mh-newsletter.ts`.
- **Newsletter (§8.1).** POST through the HTTP client. Use `unwrapApiResponse` so a `status: false` on HTTP 200 shows the error instead of a false success. Announce success or errors in an `aria-live` region. Field errors get a red border **and** text, linked with `aria-describedby`.
- **Don't copy** any of the following from ARCHITECTURE.md Part IV: the mock-auth block, two data layers, the Vuetify cascade apparatus or the README-style component index. Document components in one `docs/index.md`.
- Remember: `--color-*: initial` means stock Tailwind colours render nothing. If an element is invisible, check the palette first. A new `ui/` directory needs a dev-server restart.

## Accessibility: launch blockers (Design Guidelines)

- WCAG 2.2 AA: body text ≥ 4.5:1, large text and UI ≥ 3:1. Report the actual ratio for every pair you use.
- One H1 (the hero headline), then H2 per section and H3 for cards. Include a skip link to the main content.
- A visible focus ring everywhere: 2px solid `green-500` with a 2px offset (white on dark sections). Never `outline: none` without a replacement.
- Touch targets are at least 44×44px with at least 8px between them. Body text is never below 16px, and nothing anywhere is below 12px. No horizontal scroll at 320px.
- Status is never shown by colour alone. Icon-only controls get `aria-label`. The mobile menu traps focus and returns it on close.

## Performance and SEO

- Lighthouse targets on mobile: Performance ≥ 90, Accessibility 100, Best Practices ≥ 95, SEO 100. LCP < 2.5s on a mid-range Android over 4G, CLS < 0.05.
- Fonts: self-hosted, `font-display: swap`, preload the heading weight only, and use size-adjusted fallbacks to avoid layout shift.
- Set the meta title and description from the brief's hero copy, plus Open Graph and Twitter cards, `Organization` JSON-LD and canonical `https://naijapath.com/`.

## Deliverables

1. A running Nuxt project (`npm run dev`) with the homepage complete at all breakpoints (320, 375, 768, 1024, 1280, 1440+).
2. `tailwind.css` tokens, the `n/` component library parts the page uses, the `marketing/home` slice and the two Three.js composables with static fallbacks.
3. `IMAGE_CREDITS.md`, `docs/index.md` and a short `AGENTS.md` noting anything surprising (per ARCHITECTURE.md Part III step 11).
4. A final summary listing: every contrast ratio used, every microcopy string you wrote that isn't in the brief, the image slots still awaiting client photography, and a pass/fail check against the **Hard bans** list.

Work in the ARCHITECTURE.md Part III order. Leave the app runnable after each step, and run `oxfmt → oxlint → typecheck` before you report done.
