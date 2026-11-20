# NaijaPath web — component & composable index

The one catalogue for this repo. Do not create a second index (e.g. `app/components/n/README.md`) —
it will drift. When you add or change a part, update this file in the same commit.

## Design tokens — `app/assets/css/tailwind.css`

- Raw hex in `:root` (`@layer base`), mapped in `@theme inline`. `--color-*: initial` removes Tailwind's
  stock palette: **an off-palette class like `bg-blue-500` renders nothing.**
- Ramps keep the shape `50 / 100 / 150 / 500 / 600`: `green` (brand), `terracotta`, `base`
  (0, 50, 100, 150, 500, 600, 900), plus status `success / warning / danger / info` and `amber` (stars).
- Breakpoints are defined once here: `xs 375 · sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1440`.
  `nuxt.config.ts → image.screens` mirrors the pixel values for responsive images.
- Radius from one `--radius: 12px` → `rounded-sm` 8 (buttons/inputs) · `rounded-lg` 12 (cards/photos) ·
  `rounded-xl` 16. Shadows: exactly `shadow-card` and `shadow-card-hover`.
- Type: `font-heading` (Plus Jakarta Sans), `font-body` (Inter); sizes `text-hero | h2 | h3 | lead |
  label | stat | stage`. **Adding a `--text-*` token? Also add it to `cn()`'s list in `app/utils/utils.ts`**,
  or tailwind-merge will treat it as a colour and drop it.
- Utilities: `tabular` (tabular-nums), `prose-measure` (68ch), `link-underline` (moving underline),
  `reveal` (one-shot rise, only hidden when `<html class="js">`), `defer-render`
  (content-visibility for light below-the-fold sections — see AGENTS.md before using it).
- Contrast: every pair used is listed and verified by `npm run contrast` (fails the run on any miss).

## Design-system parts — `app/components/n/`

Every part: `data-slot="…"`, `cn(defaults, props.class)`, a typed `class` prop, slots not content props.
Variants live in sibling `*-variants.ts` files (importable from plain `.ts`).

> **Naming rule (bit us once):** Nuxt names components from the folder path. `n/<folder>/N<Folder>….vue`
> registers as `N<Folder>…`. A file whose name doesn't start with its folder's name gets a longer name
> (`n/field/NLabel.vue` → `NFieldNLabel`) and `<NLabel>` silently renders **nothing**. One folder per
> part family, named after it.

| Part | Path | Notes |
|---|---|---|
| `NButton` | `button/NButton.vue` + `button-variants.ts` | `color` (primary · accent · inverse) × `variant` (solid · outline · ghost) via `compoundVariants`; `size` default/lg/icon (all ≥ 44px); `shape="pill"` hero only; `to` renders an `NLink`. Labels may wrap below 640px. |
| `NLink` | `link/NLink.vue` | The only link primitive. `#id` / `/#id` → smooth scroll + focus move + URL update (instant under reduced motion). External → new tab + SR hint. `.pdf` → `download`. Paths this app doesn't own → plain `<a>`; owned routes → `NuxtLink`. |
| `NTextLink` | `text-link/NTextLink.vue` | CTA text link: moving underline, arrow slides 4px, 44px tall. |
| `NCard` + `NCardHeader` `NCardTitle` `NCardDescription` `NCardAction` `NCardContent` `NCardFooter` | `card/` | Header restructures itself when a `card-action` is present (`has-data-[slot=card-action]`). `as` for semantics (`figure`, `article`, `li`). |
| `NPill` | `pill/NPill.vue` + `pill-variants.ts` | Tones: green · terracotta · terracotta-on-white · white · green-soft · muted. |
| `NSectionLabel` | `section-label/NSectionLabel.vue` | 13px caps label, 0.05em tracking. A `<p>` — the H2 after it is the heading. |
| `NStatus` | `status/NStatus.vue` | `<NStatus status="confirmed" />` — dot/icon **and** text, through `app/utils/status/`. |
| `NStat` + `NStatValue` `NStatLabel` `NStatCaption` | `stat/` | Tabular figures. |
| `NIcon` | `icon/NIcon.vue` | `name` from `app/utils/icons.ts`. Decorative by default; `label` only when the icon alone carries meaning. |
| `NAvatar` | `avatar/NAvatar.vue` | Initials, or a neutral silhouette (placeholders only). Decorative. |
| `NRating` | `rating/NRating.vue` | Amber stars with `role="img"` + label; always shown next to the numeric score. |
| `NLabel` | `label/NLabel.vue` | Always visible above its input; `required` adds `*` + SR text. |
| `NInput` | `input/NInput.vue` | 16px text (no iOS zoom), `invalid` → 2px red border + `aria-invalid`; `describedby`; `surface="dark"` for the footer. |
| `NFieldError` | `field-error/NFieldError.vue` | Icon + text, linked from the input via `aria-describedby`. |
| `NTextarea` | `textarea/NTextarea.vue` | NInput's frame for multi-line text; `invalid`, `describedby`, `maxlength`. |
| `NSelect` | `select/NSelect.vue` | Native `<select>` in the NInput frame + chevron. `options: {value,label}[]`; the empty first option is the prompt. |
| `NCheckbox` | `checkbox/NCheckbox.vue` | Native checkbox; label slot and box share one 44px hit area. Error = red outline + linked `NFieldError`. |
| `NContainer` | `container/NContainer.vue` | 1280px, 16/24/32px gutters. |
| `NLogo` | `logo/NLogo.vue` | **Interim mark** — swap the inline SVG for the client's brandmark. |
| `NSkipLink` | `skip-link/NSkipLink.vue` | First focusable element; targets `#main`. |

## Cross-cutting systems — `app/utils/`

| System | File(s) | Rule |
|---|---|---|
| `cn` | `utils.ts` | `twMerge(clsx(…))`, extended with the custom tokens. |
| Icons | `icons.ts` | Semantic name → Phosphor glyph (raw SVG, only the weights used, from `@phosphor-icons/core`). Templates use `<NIcon name="…">`, never a Phosphor import. |
| Status | `status/` (types · registry · resolver · palette · index) | Raw backend string → alias table → canonical → `{label, icon, tone}`. New spelling = one alias line. |
| Dates | `date-formatters.ts` | `APP_TIME_ZONE = "Africa/Lagos"`; `formatTime`, `formatDate`, `toIsoInZone` (built-in `Intl`, assembled from `formatToParts` so server and browser output match). Never write `h:mm a` at a call site; pass raw timestamps down. |
| API envelope | `api-envelope.ts` + `types/api.ts` | `unwrapApiResponse` on every write: `status:false` on HTTP 200 throws, so it can't render as success. |
| Motion | `easing.ts` | `easeBrand` = `cubic-bezier(.2,.7,.2,1)`; `MOTION_MS`; `prefersReducedMotion()`. |
| Scrolling | `scroll.ts` | `scrollToSection(id)` — native smooth scroll + focus move. No scroll-jacking. |

## App composables — `app/composables/`

| Composable | Purpose |
|---|---|
| `useCustomFetchNoAuth()` / `normalizeApiError()` | The one axios client → same-origin `/backend/**` proxy. |
| `useScrollMotion(scope, build, onStatic)` | redesign-v3 scoped GSAP motion: runs `build` in a gsap.context once the lazy motion bundle (plugins/motion.client.ts: GSAP + ScrollTrigger + SplitText + Lenis) is ready; reverts on unmount; `onStatic` leaves the final state under reduced motion. |
| `useInViewOnce(el)` | One-shot IntersectionObserver reveal (replaces GSAP/ScrollTrigger). |

## Feature slice — `app/features/marketing/home/`

```
domain/          home-copy.ts (VERBATIM brief copy) · home-microcopy.ts (everything NOT in the brief)
                 home-routes.ts (paths, section ids, API, social) · home-testimonials.ts
composition/     use-mh-newsletter · use-mh-stage-path · use-mh-count-up   (auto-imported)
ui/mh-home/      index.vue (root) + one component per section → <MhHome…>
index.ts         barrel — domain only
```

Sections (redesign-v3 order): `site-header` (+ `mobile-menu`, lazy) · `hero` ·
`trust-bar` (§2.3 intro + numbers, + `trust-stat`) · `beneficiaries` (+ `agreed-actions-card`) ·
`commission` (+ `cohort-dashboard-card`) · `how-it-works` ·
`social-proof` (+ `testimonial-card`) · `join` (+ `audience-card`) · `site-footer` (+ `newsletter-form`).

Floating chat assistant: `assistant` (launcher, SSR, `hydrate-on-idle`) + `assistant-panel`
(lazy chunk on first open). Scripted and labelled "Automated"; replies live in `MICROCOPY.assistant`.
"Talk to a person" / "Continue on WhatsApp" use `useWhatsappHref()` (`app/composables/useWhatsapp.ts`)
from `NUXT_PUBLIC_WHATSAPP_NUMBER`; while unset they fall back to `/contact`. The homepage is
prerendered, so set the number **at build time**.

## Feature slice — `app/features/marketing/pages/`

Standalone pages: `/sign-in` (Sign in / Sign up tabs; `?mode=sign-up`), `/contact`,
`/book-a-session` (`app/pages/*.vue`). "Contact" is also in the homepage nav and mobile menu
(`MICROCOPY.nav.contact`).

```
domain/          pages-microcopy.ts (ALL strings: not in the brief → client review)
                 pages-routes.ts (paths + API endpoints, unconfirmed with the platform team)
composition/     use-mp-submit (shared POST / aria-live / focus-first-error / live re-check) ·
                 use-mp-sign-in (email first, then password) · use-mp-sign-up ·
                 use-mp-contact · use-mp-session-request   (auto-imported)
ui/mp-pages/     split (content left; right: `images` cross-fading on `active`, or `#aside`) ·
                 auth-tabs (Sign in / Sign up: sliding pill, cross-fade, animated height) ·
                 site-nav (nav bar for all three pages: full links ≥1440px, else the
                 homepage's lazy mobile menu) ·
                 box-field (icon + label inside the box; ring on the box) · password-toggle ·
                 shell (book-a-session: site-nav + main + footer) · field · form-status ·
                 sign-in-form · sign-up-form · contact-form · session-request-form → <MpPages…>
```

Validation runs on submit, then live for the fields whose error is showing; a failed submit moves
focus to the first invalid field. `/sign-in` is `noindex`. No social sign-in buttons: there are no
providers yet, and a button that does nothing is worse than none.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server on :3000. **New `ui/` directory → restart** (the glob runs once). |
| `npm run check` | `oxfmt → oxlint → nuxt typecheck` — the verification loop. |
| `npm run contrast` | WCAG 2.2 AA audit of every colour pair in use. |
| `npm run knip` | Unused files / exports / dependencies. |
| `node scripts/content-lock.mjs --check` | Diff the rendered page against content-lock.md (dev server running). |
| `node scripts/generate-brand-assets.mjs` | Rebuild `og-image.jpg` + `apple-touch-icon.png`. |
