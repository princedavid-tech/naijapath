# Product

<!-- impeccable:product-schema 1 -->

Sources: the client's *Homepage Content & Design Brief* (Oct 2026, v1.0), *Design Guidelines*
(Sept 2026), and decisions the owner confirmed on 2026-11-19 (redesign-v3 kickoff).

## Platform

web

## Users

- **Beneficiaries:** individuals in Nigeria and the diaspora seeking career guidance, often
  young Nigerians on a wide range of devices and screen qualities, frequently on mobile data.
  Their job: book a verified practitioner, prepare, receive structured guidance, and leave with a
  documented action plan. Free and subsidised sessions exist for qualifying beneficiaries.
- **Project clients:** development organisations, government programmes and corporate (CSR)
  partners. Their job: commission career services for a cohort, monitor delivery, and report
  outcomes to funders or leadership with verified data.
- **Career practitioners:** professionals who deliver guidance through the platform. Their job:
  join a verified network and practise under a managed delivery standard.

## Product Purpose

Nigeria's first digital career service platform. It makes career guidance accountable: every
session is professionally delivered, documented and tracked, from the first appointment to the
last report. Success is a beneficiary who books and leaves with a documented plan, and an
organisation that commissions a programme it can measure.

## Positioning

A quality-assurance platform, not a marketplace, a mentorship app or a job board. The
differentiator is the **5-Stage Delivery Standard** (Scheduling, Intake, Delivery,
Documentation, Reporting) applied to every session, which produces documentation for the
beneficiary and an outcome dataset for the commissioning organisation.

## Operating Context

- The homepage serves two primary audiences at once (beneficiaries and project clients), plus
  practitioners; the brief orders the nav for beneficiaries, curious visitors, organisations,
  practitioners.
- Booking, sign-in, commissioning, practitioner sign-up and stories live in the platform app at
  routes outside this marketing build; the homepage links to them.
- "Career Brief" is the monthly newsletter (footer sign-up).

## Capabilities and Constraints

- Nuxt 4 marketing site, SSR/prerendered homepage, Tailwind v4 tokens, Reka UI.
- All homepage copy is locked to the client brief; the verbatim set is in `content-lock.md` and
  checked with `node scripts/content-lock.mjs --check`.
- **Undecided / absent:** verified practitioner profiles (no names, specialisms, languages or
  locations exist yet; the practitioners section is omitted until real data arrives);
  testimonials; social profile URLs; the programme brochure PDF; the client's own brandmark.

## Brand Commitments

- Name **NaijaPath** (the brief also writes "Naijapath"; both preserved as written).
- Brand colours from the existing system: Naijapath green and the orange/terracotta action colour;
  the redesign brief (2026-11-19) maps them to forest green #1F5C2C and burnt orange #B84A1F.
- Voice: warm, direct and encouraging for beneficiaries; professional, structured and
  evidence-based for organisations; never casual or startup-informal.

## Evidence on Hand

- Approved stats: 350+ Verified Career Practitioners; ₦0 Barrier for Beneficiaries; 5-Stage
  Delivery Standard; 45+ Partner Organisations; 100% Funded Seats Available; 4.9 / 5.0 and 98%
  Recommendation Rate.
- Photography: two interim licensed Unsplash photos (`public/images/hero-session.jpg`,
  `public/images/beneficiary-session.jpg`, see `IMAGE_CREDITS.md`) stand in until the client
  shoot. No other imagery exists. Never AI-generated people.
- Demonstration UI: a sample session record and a programme dashboard marked "Sample data".
- **Absent, never to be fabricated:** testimonials, practitioner profiles, partner logos,
  outcome statistics beyond those listed above.

## Product Principles

1. Prove the standard: show documentation and reporting at work, not adjectives about quality.
2. Serve both audiences on one page without letting either drown the other.
3. Honesty over polish: sample data is labelled, absent content stays absent.
4. Readable for everyone on any phone, in any light.

## Accessibility & Inclusion

WCAG 2.2 AA is a launch requirement (Design Guidelines): body text ≥ 4.5:1, focus visible on
every control, 44px touch targets, 16px minimum body text, no horizontal scroll at 320px,
status never by colour alone, `aria-live` for status messages, full keyboard operation, and
`prefers-reduced-motion` honoured.
