# NaijaPath — homepage

Marketing homepage for NaijaPath, Nigeria's First Digital Career Service Platform.
Nuxt 4 · Vue 3.5 · TypeScript (strict) · Tailwind CSS v4 · Reka UI · three.js (hero only).

```sh
npm install
cp .env.example .env    # optional — see below
npm run dev             # http://localhost:3000
```

| Command | |
|---|---|
| `npm run build` / `npm run preview` | Production SSR build / serve it |
| `npm run check` | oxfmt → oxlint → typecheck |
| `npm run contrast` | WCAG 2.2 AA audit of every colour pair used |
| `npm run knip` | Dead files, exports, dependencies |

## Environment

| Variable | Default | Purpose |
|---|---|---|
| `NUXT_API_PROXY_TARGET` | *(empty)* | Backend the `/backend/**` proxy forwards to. Empty → the newsletter answers "not available right now" (never a fake success). |
| `NUXT_PUBLIC_SHOW_PLACEHOLDER_TESTIMONIALS` | `true` in dev, `false` in production builds | Shows "Testimonial pending" cards. Never enable in production. |

## Before launch — client inputs still needed

- Client photography for `public/images/hero-session.jpg` (4:5) and `public/images/beneficiary-session.jpg` (1:1) — interim licensed stock is in place (`IMAGE_CREDITS.md`).
- The existing green brandmark → `app/components/n/logo/NLogo.vue` and `public/favicon.svg`, then `node scripts/generate-brand-assets.mjs`.
- `public/downloads/naijapath-programme-brochure.pdf` (linked from "Download Programme Brochure").
- Social profile URLs → `HOME_SOCIAL` in `app/features/marketing/home/domain/home-routes.ts`.
- Three real, consented testimonials → `home-testimonials.ts` (the section stays hidden in production until then).
- Confirm product-app paths in `home-routes.ts` (`/book-a-session`, `/sign-in`, …) and the newsletter endpoint.
- Review every string in `home-microcopy.ts` (not from the brief).

More: `docs/index.md` (catalogue) · `AGENTS.md` (rules & gotchas) · `IMAGE_CREDITS.md`.
