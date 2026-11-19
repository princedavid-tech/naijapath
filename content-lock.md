# Content lock — NaijaPath homepage

Every piece of text the homepage renders, captured from the live page before the
`redesign-v3` work. Owner-approved removals since then: the hero's "Session Confirmed" card
(2026-11-19); the dev-only "Testimonial pending" placeholders (replaced by labelled design samples);
the text wordmark replaced by the client's logo image, alt "NaijaPath" (2026-11-19).
**The redesign may move, re-group or re-style this content, but must not
add, remove, shorten or rewrite any of it.**

- Source: the rendered page (http://localhost:3000/) at 1440×900 with reduced motion (animated
  figures at their final values), plus the mobile menu opened at 390px.
- Includes visually-hidden (screen-reader) text, image alt text, aria-labels, form labels and
  placeholders, and every link's destination.
- The "Testimonial pending" placeholder cards render in development only
  (`NUXT_PUBLIC_SHOW_PLACEHOLDER_TESTIMONIALS`); production omits that section.
- Re-check after any change: `node scripts/content-lock.mjs --check` (dev server running).

## site-header

- **P** Abuja · Lagos · Diaspora
- **ARIA-LABEL** NaijaPath on social media
- **LINK** NaijaPath home → `/`
- **ALT** NaijaPath
- **ARIA-LABEL** Main
- **LINK** Find Career Guidance → `#for-you`
- **LINK** How NaijaPath Works → `#how-it-works`
- **LINK** Commission a Programme → `#commission`
- **LINK** Join as a Career Practitioner → `#join`
- **LINK** Sign In → `/sign-in`
- **LINK** Book a Session → `/book-a-session`

## top

- **P** Nigeria's First Digital Career Service Platform
- **H1** Navigate your career with structured, verified guidance.
- **P** Every session is professionally delivered, documented, and tracked. Career guidance that is accountable from the first appointment to the last report.
- **LINK** Find Career Guidance → `/find-career-guidance`
- **LINK** Commission a Programme → `/commission-a-programme`
- **ARIA-LABEL** Platform highlights
- **LI** 100% Funded Seats Available
- **LI** 4.9 / 5.0 98% Recommendation Rate
- **ARIA-LABEL** Rated 4.9 out of 5
- **ALT** A career practitioner and a young professional review a session plan together on a laptop
- **LINK** Book a Session → `/book-a-session`
- **TEXT** Book a Session • Book a Session •
- **SR-ONLY** Illustration of the NaijaPath platform
- **ALT** NaijaPath

## block-2

- **LI** Scheduling
- **LI** Intake
- **LI** Delivery
- **LI** Documentation
- **LI** Reporting

## for-you

- **P** FOR YOU
- **H2** Work with a verified career practitioner who documents your progress.
- **ALT** A young professional takes part in a virtual career guidance session on a laptop at a desk
- **LINK** Book a Session → `/book-a-session`
- **TEXT** Book a Session • Book a Session •
- **P** Every session on Naijapath follows a structured delivery process. Your practitioner prepares before you arrive, records what was discussed, agrees your next steps in writing, and tracks your progress over time.
- **P** This is not casual advice. It is professional career guidance, delivered the way it should be.
- **SR-ONLY** Illustration of the NaijaPath platform
- **P** Session record
- **P** Agreed Actions
- **TEXT** Completed
- **LI** Update CV with recent project outcomes
- **LI** Apply to two graduate trainee programmes
- **LI** Prepare for a mock interview
- **TEXT** Practitioner:
- **TEXT** Chinedu O.
- **TEXT** ·
- **TEXT** 12 Nov 2026
- **TEXT** Shared with you
- **LINK** Find Career Guidance → `/find-career-guidance`
- **P** Free and subsidised sessions available for qualifying beneficiaries

## trust

- **SR-ONLY** NaijaPath at a glance
- **P** 350+
- **SR-ONLY** 350+
- **P** Verified Career Practitioners
- **P** Across Nigeria and the global diaspora
- **P** ₦0
- **SR-ONLY** ₦0
- **P** Barrier for Beneficiaries
- **P** 100% funded slots for qualifying individuals
- **P** 5-Stage
- **SR-ONLY** 5-Stage
- **P** Delivery Standard
- **P** Applied on every session, every time
- **P** 45+
- **SR-ONLY** 45+
- **P** Partner Organisations
- **P** Commissioning quality career services

## commission

- **P** COMMISSION WITH CONFIDENCE
- **H2** Career services your organisation can commission, monitor, and report on.
- **LINK** Commission a Programme → `/commission-a-programme`
- **LINK** Download Programme Brochure → `/downloads/naijapath-programme-brochure.pdf`
- **P** Naijapath gives development organisations, government programmes, and corporate partners a structured platform to deliver career guidance at scale.
- **P** Every session is documented. Every outcome is tracked. Every programme produces a reporting dataset you can take to your funders or leadership.
- **P** Stop commissioning career activities you cannot measure. Start commissioning career services that are accountable from day one.
- **ARIA-LABEL** What your organisation gets
- **LI** Fully vetted and credentialled career practitioners
- **LI** Session-by-session documentation
- **LI** Real-time programme dashboard
- **LI** Audit-ready outcome reports
- **SR-ONLY** Illustration of the NaijaPath platform
- **P** Programme dashboard
- **P** Cohort progress
- **TEXT** Sample data
- **TEXT** Sessions completed
- **TEXT** 142 of 180
- **TEXT** Beneficiaries
- **TEXT** 60 enrolled
- **TEXT** Interview conversion rate
- **TEXT** 38% of beneficiaries
- **P** Sessions completed per week
- **TEXT** Sample data: sessions completed per week rose from 8 in week 1 to 25 in week 8.
- **TEXT** W1: 8
- **TEXT** W2: 12
- **TEXT** W3: 15
- **TEXT** W4: 17
- **TEXT** W5: 19
- **TEXT** W6: 22
- **TEXT** W7: 24
- **TEXT** W8: 25
- **TEXT** W1
- **TEXT** W2
- **TEXT** W3
- **TEXT** W4
- **TEXT** W5
- **TEXT** W6
- **TEXT** W7
- **TEXT** W8
- **SR-ONLY** Sessions completed per week (Sample data)
- **SR-ONLY** Week
- **SR-ONLY** Sessions
- **SR-ONLY** W1
- **SR-ONLY** 8
- **SR-ONLY** W2
- **SR-ONLY** 12
- **SR-ONLY** W3
- **SR-ONLY** 15
- **SR-ONLY** W4
- **SR-ONLY** 17
- **SR-ONLY** W5
- **SR-ONLY** 19
- **SR-ONLY** W6
- **SR-ONLY** 22
- **SR-ONLY** W7
- **SR-ONLY** 24
- **SR-ONLY** W8
- **SR-ONLY** 25

## how-it-works

- **P** CLEAR PROGRESSION
- **H2** Every session follows the same quality process.
- **P** From the first booking to the final report, the Naijapath 5-Stage Delivery Standard ensures every beneficiary receives the same quality of service.
- **ARIA-LABEL** The five stages
- **P** 01
- **H3** Scheduling
- **SR-ONLY** Stage 01:
- **P** Beneficiaries book with verified career practitioners through the platform. No informal arrangements.
- **P** 02
- **H3** Intake
- **SR-ONLY** Stage 02:
- **P** Before every session, the beneficiary completes a structured intake. The practitioner arrives prepared.
- **P** 03
- **H3** Delivery
- **SR-ONLY** Stage 03:
- **P** A professional, one-on-one career guidance session with a trained and credentialled career practitioner.
- **P** 04
- **H3** Documentation
- **SR-ONLY** Stage 04:
- **P** After every session, the practitioner records what was discussed, the actions agreed, and the next steps. The beneficiary receives a copy.
- **P** 05
- **H3** Reporting
- **SR-ONLY** Stage 05:
- **P** Outcome data is compiled and shared with the commissioning organisation or made available to the beneficiary. Every programme is evidence-based.

## stories

- **P** WHAT CHANGES WHEN CAREER GUIDANCE HAS A STANDARD
- **H2** Structured Guidance. Impact you can verify.
- **P** Every story here came through a structured career guidance process.
- **ARIA-LABEL** Stories
- **LINK** Read More Stories → `/stories`
- **ARIA-LABEL** Previous story
- **ARIA-LABEL** Next story

## join

- **P** YOUR NEXT MOVE
- **H2** Join NaijaPath
- **P** For Beneficiaries
- **H3** Career guidance that takes your progress seriously.
- **P** Connect with a verified career practitioner. Book a session, receive structured guidance, and leave with a documented action plan.
- **LINK** Find Career Guidance → `/find-career-guidance`
- **P** For Career Practitioners
- **H3** Deliver your expertise through a structured, professional platform.
- **P** Join a network of verified career practitioners. Get access to a managed platform, a growing client base, and a delivery standard that protects and elevates your professional practice.
- **LINK** Join as a Career Practitioner → `/join-as-a-career-practitioner`
- **P** For Organisations
- **H3** Commission career services built to your programme goals.
- **P** Commission structured career guidance for your beneficiaries, staff, or CSR cohorts. Monitor delivery, track outcomes, and report to your funders with verified data.
- **LINK** Commission a Programme → `/commission-a-programme`

## site-footer

- **LINK** NaijaPath home → `/`
- **ALT** NaijaPath
- **P** Structured career guidance for Nigeria and the world.
- **P** Abuja · Lagos · Diaspora
- **ARIA-LABEL** NaijaPath on social media
- **H2** Career Brief
- **P** Monthly career insights, sector updates, and guidance tools - straight to your inbox.
- **LABEL** Email address*
- **SR-ONLY** (required)
- **PLACEHOLDER** name@example.com
- **LABEL** Email address (required)
- **BUTTON** Subscribe
- **ARIA-LABEL** Footer
- **H2** Platform
- **LINK** Find Career Guidance → `/find-career-guidance`
- **LINK** How NaijaPath Works → `#how-it-works`
- **LINK** Commission a Programme → `/commission-a-programme`
- **H2** Network
- **LINK** Beneficiaries → `/beneficiaries`
- **LINK** Join as a Career Practitioner → `/join-as-a-career-practitioner`
- **LINK** Partner Organisations → `/partner-organisations`
- **LINK** Code of Conduct → `/code-of-conduct`
- **H2** Resources
- **LINK** Career Brief (Newsletter) → `#career-brief`
- **LINK** About Naijapath → `/about`
- **LINK** Privacy Policy → `/privacy-policy`
- **LINK** Terms of Service → `/terms-of-service`
- **P** © 2026 NaijaPath. All rights reserved.

## mobile-menu

- **H2** Menu
- **SR-ONLY** Main
- **ARIA-LABEL** Close menu
- **ARIA-LABEL** Main
- **LINK** Find Career Guidance → `/#for-you`
- **LINK** How NaijaPath Works → `/#how-it-works`
- **LINK** Commission a Programme → `/#commission`
- **LINK** Join as a Career Practitioner → `/#join`
- **LINK** Book a Session → `/book-a-session`
- **LINK** Sign In → `/sign-in`

## Machine-readable set

Used by `--check`. Do not edit by hand; regenerate only when the client approves a copy change.

```json
[
  "alt|A career practitioner and a young professional review a session plan together on a laptop",
  "alt|A young professional takes part in a virtual career guidance session on a laptop at a desk",
  "alt|NaijaPath",
  "aria-label|Close menu",
  "aria-label|Footer",
  "aria-label|Main",
  "aria-label|NaijaPath on social media",
  "aria-label|Next story",
  "aria-label|Platform highlights",
  "aria-label|Previous story",
  "aria-label|Rated 4.9 out of 5",
  "aria-label|Stories",
  "aria-label|The five stages",
  "aria-label|What your organisation gets",
  "label|Email address (required)",
  "label|Email address*",
  "link|About Naijapath → /about",
  "link|Beneficiaries → /beneficiaries",
  "link|Book a Session → /book-a-session",
  "link|Career Brief (Newsletter) → #career-brief",
  "link|Code of Conduct → /code-of-conduct",
  "link|Commission a Programme → #commission",
  "link|Commission a Programme → /#commission",
  "link|Commission a Programme → /commission-a-programme",
  "link|Download Programme Brochure → /downloads/naijapath-programme-brochure.pdf",
  "link|Find Career Guidance → #for-you",
  "link|Find Career Guidance → /#for-you",
  "link|Find Career Guidance → /find-career-guidance",
  "link|How NaijaPath Works → #how-it-works",
  "link|How NaijaPath Works → /#how-it-works",
  "link|Join as a Career Practitioner → #join",
  "link|Join as a Career Practitioner → /#join",
  "link|Join as a Career Practitioner → /join-as-a-career-practitioner",
  "link|NaijaPath home → /",
  "link|Partner Organisations → /partner-organisations",
  "link|Privacy Policy → /privacy-policy",
  "link|Read More Stories → /stories",
  "link|Sign In → /sign-in",
  "link|Terms of Service → /terms-of-service",
  "placeholder|name@example.com",
  "text|(required)",
  "text|01",
  "text|02",
  "text|03",
  "text|04",
  "text|05",
  "text|100% Funded Seats Available",
  "text|100% funded slots for qualifying individuals",
  "text|12",
  "text|12 Nov 2026",
  "text|142 of 180",
  "text|15",
  "text|17",
  "text|19",
  "text|22",
  "text|24",
  "text|25",
  "text|350+",
  "text|38% of beneficiaries",
  "text|4.9 / 5.0 98% Recommendation Rate",
  "text|45+",
  "text|5-Stage",
  "text|60 enrolled",
  "text|8",
  "text|A professional, one-on-one career guidance session with a trained and credentialled career practitioner.",
  "text|Abuja · Lagos · Diaspora",
  "text|Across Nigeria and the global diaspora",
  "text|After every session, the practitioner records what was discussed, the actions agreed, and the next steps. The beneficiary receives a copy.",
  "text|Agreed Actions",
  "text|Applied on every session, every time",
  "text|Apply to two graduate trainee programmes",
  "text|Audit-ready outcome reports",
  "text|Barrier for Beneficiaries",
  "text|Before every session, the beneficiary completes a structured intake. The practitioner arrives prepared.",
  "text|Beneficiaries",
  "text|Beneficiaries book with verified career practitioners through the platform. No informal arrangements.",
  "text|Book a Session • Book a Session •",
  "text|CLEAR PROGRESSION",
  "text|COMMISSION WITH CONFIDENCE",
  "text|Career Brief",
  "text|Career guidance that takes your progress seriously.",
  "text|Career services your organisation can commission, monitor, and report on.",
  "text|Chinedu O.",
  "text|Cohort progress",
  "text|Commission career services built to your programme goals.",
  "text|Commission structured career guidance for your beneficiaries, staff, or CSR cohorts. Monitor delivery, track outcomes, and report to your funders with verified data.",
  "text|Commissioning quality career services",
  "text|Completed",
  "text|Connect with a verified career practitioner. Book a session, receive structured guidance, and leave with a documented action plan.",
  "text|Deliver your expertise through a structured, professional platform.",
  "text|Delivery",
  "text|Delivery Standard",
  "text|Documentation",
  "text|Every session follows the same quality process.",
  "text|Every session is documented. Every outcome is tracked. Every programme produces a reporting dataset you can take to your funders or leadership.",
  "text|Every session is professionally delivered, documented, and tracked. Career guidance that is accountable from the first appointment to the last report.",
  "text|Every session on Naijapath follows a structured delivery process. Your practitioner prepares before you arrive, records what was discussed, agrees your next steps in writing, and tracks your progress over time.",
  "text|Every story here came through a structured career guidance process.",
  "text|FOR YOU",
  "text|For Beneficiaries",
  "text|For Career Practitioners",
  "text|For Organisations",
  "text|Free and subsidised sessions available for qualifying beneficiaries",
  "text|From the first booking to the final report, the Naijapath 5-Stage Delivery Standard ensures every beneficiary receives the same quality of service.",
  "text|Fully vetted and credentialled career practitioners",
  "text|Illustration of the NaijaPath platform",
  "text|Intake",
  "text|Interview conversion rate",
  "text|Join NaijaPath",
  "text|Join a network of verified career practitioners. Get access to a managed platform, a growing client base, and a delivery standard that protects and elevates your professional practice.",
  "text|Main",
  "text|Menu",
  "text|Monthly career insights, sector updates, and guidance tools - straight to your inbox.",
  "text|NaijaPath at a glance",
  "text|Naijapath gives development organisations, government programmes, and corporate partners a structured platform to deliver career guidance at scale.",
  "text|Navigate your career with structured, verified guidance.",
  "text|Network",
  "text|Nigeria's First Digital Career Service Platform",
  "text|Outcome data is compiled and shared with the commissioning organisation or made available to the beneficiary. Every programme is evidence-based.",
  "text|Partner Organisations",
  "text|Platform",
  "text|Practitioner:",
  "text|Prepare for a mock interview",
  "text|Programme dashboard",
  "text|Real-time programme dashboard",
  "text|Reporting",
  "text|Resources",
  "text|Sample data",
  "text|Sample data: sessions completed per week rose from 8 in week 1 to 25 in week 8.",
  "text|Scheduling",
  "text|Session record",
  "text|Session-by-session documentation",
  "text|Sessions",
  "text|Sessions completed",
  "text|Sessions completed per week",
  "text|Sessions completed per week (Sample data)",
  "text|Shared with you",
  "text|Stage 01:",
  "text|Stage 02:",
  "text|Stage 03:",
  "text|Stage 04:",
  "text|Stage 05:",
  "text|Stop commissioning career activities you cannot measure. Start commissioning career services that are accountable from day one.",
  "text|Structured Guidance. Impact you can verify.",
  "text|Structured career guidance for Nigeria and the world.",
  "text|Subscribe",
  "text|This is not casual advice. It is professional career guidance, delivered the way it should be.",
  "text|Update CV with recent project outcomes",
  "text|Verified Career Practitioners",
  "text|W1",
  "text|W1: 8",
  "text|W2",
  "text|W2: 12",
  "text|W3",
  "text|W3: 15",
  "text|W4",
  "text|W4: 17",
  "text|W5",
  "text|W5: 19",
  "text|W6",
  "text|W6: 22",
  "text|W7",
  "text|W7: 24",
  "text|W8",
  "text|W8: 25",
  "text|WHAT CHANGES WHEN CAREER GUIDANCE HAS A STANDARD",
  "text|Week",
  "text|Work with a verified career practitioner who documents your progress.",
  "text|YOUR NEXT MOVE",
  "text|© 2026 NaijaPath. All rights reserved.",
  "text|·",
  "text|₦0"
]
```
