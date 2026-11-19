---
version: 1
slug: "app-features-marketing-home-ui-mh-home-index-vue"
primary_target: "app/features/marketing/home/ui/mh-home/index.vue"
related_targets: ["app/pages/index.vue"]
---

# Surface: NaijaPath homepage (redesign-v3)

**Mode:** Persuade. **Primary target:** `app/features/marketing/home/ui/mh-home/index.vue`
(route `/`). **Build path:** code-led (no image generation available).

## Audience, job, action
- Beneficiaries: understand that guidance here is verified and documented → **Find Career
  Guidance / Book a Session**.
- Organisations: see that programmes can be commissioned, monitored and reported on →
  **Commission a Programme / Download Programme Brochure**.
- Practitioners: see a professional standard to join → **Join as a Career Practitioner**.

## Proof and content
Locked to `content-lock.md` (182 items); check with `node scripts/content-lock.mjs --check`
after every section. Proof devices that exist: the 5-Stage Delivery Standard, the sample session
record, the sample programme dashboard ("Sample data" labels kept verbatim), approved stats.

## Constraints
- Owner's redesign brief (2026-11-19) is binding: header + hero replicate
  `reference/design-inspo.webp` (to be added by the owner); every other section designed fresh.
- Eyebrow labels stay above section titles: the owner requires them and they are locked client copy
  (overrides the craft-floor eyebrow ban, by the owner's explicit instruction).
- Practitioners section (brief §2.7) omitted: no real practitioner data exists (owner decision).
- Photos: only the two interim photos, reused, one consistent treatment (owner decision).
- One section at a time, owner review after each.

## Direction contract

THESIS: NaijaPath as a calm, accountable institution: one honest photograph carries the
opening, and every section after it is a sheet of paper laid on a warm desk, holding a working
document (record, dashboard, stepper). Refuses the split hero over a row of equal cards.

OWN-WORLD: warm cream ground #FAF8F2; white sheets with 28px radius inset 12–16px from the
viewport; forest green #1F5C2C as the one dark field (Commission panel, Beneficiaries door);
burnt orange #B84A1F only on primary action pills; sage #E4EDE4, sand #F3E7DA, mist #E9E8F4
tints; ink #16211B / body #4F5A54 / muted #8A938E. General Sans 500 headings (-0.02em),
same family 400 body. Fully round pills; 20–24px cards with 1px #ECEAE3 hairlines; large thin
line-art icons (64–96px, 1.25–1.5 stroke). Frosted glass only on the hero (nav pill, chips).

STORY: The visitor sees a real session, reads the promise, and can act at once. Scrolling, they
meet the numbers, the beneficiary's documented record, the five stages drawing in order, the
organisation's dashboard, stories (honestly pending), three doors to join, and the Career Brief.

FIRST VIEWPORT: inset hero sheet ~92vh, full-bleed session photo (faces in the upper half) under
a transparent→#0F2A17 85% gradient. Inside it: white logo left, frosted pill nav centre with a
sliding white active pill, orange "Book a Session" right. Bottom-centre stack: orange "Find Career
Guidance" pill (primary action), kicker, two-line white headline, "Commission a Programme" text
link. Frosted chips bottom-left and bottom-right. Below the sheet, the slow five-stage marquee.

FORM: seed: none (pinned). "HERO + HEADER: replicate the reference closely." "ALL OTHER
SECTIONS: do NOT copy the reference. Design them fresh from the brief below." Signature
interaction: the sliding nav pill. Motion grammar: cubic-bezier(0.22,1,0.36,1); hero photo
settles 1.08→1 over 1.6s with masked headline rise; one authored moment per section (count-up,
ticking checklist, drawing process line, growing bars, icon stroke-draw); GSAP + ScrollTrigger
with Lenis; reduced motion shows final states.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the
verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved decisions (ask at the relevant section)
- Header brief lists logo / nav / "Book a Session" only: "Sign In" must still be reachable.
- Locked content with no slot in the new layout yet: "4.9 / 5.0 98% Recommendation Rate"
  (+ "Rated 4.9 out of 5"), the "Session Confirmed / Damilola A. / Today, 4:00 PM" card,
  "Structured career guidance for Nigeria and the world." (footer tagline).
- Hero subheadline becomes the intro (§2.3) title.
