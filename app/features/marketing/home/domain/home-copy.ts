/**
 * Homepage copy — VERBATIM from "NaijaPath Homepage Content & Design Brief", October 2026, v1.0.
 * Do not rewrite, "improve" or add marketing lines. The brief's own spellings are preserved
 * exactly (it uses both "NaijaPath" and "Naijapath"; the newsletter note uses " - ").
 *
 * The brief's "→" on CTAs is drawn by the UI as an aria-hidden arrow icon, so it is not part
 * of the strings below (screen readers announce the words only).
 *
 * Strings that are NOT in the brief live in home-microcopy.ts, never here.
 */
import type { IconName } from "~/utils/icons";
import { HOME_ROUTES } from "./home-routes";

export interface CopyLink {
  label: string;
  to: string;
}

// ── 01 Navigation Bar ────────────────────────────────────────────────
export const NAV_COPY = {
  logo: "NaijaPath",
  links: [
    // Order is intentional: beneficiaries, curious visitors, organisations, practitioners.
    { label: "Find Career Guidance", to: HOME_ROUTES.forYou, audience: "beneficiary" },
    { label: "How NaijaPath Works", to: HOME_ROUTES.howItWorks, audience: "visitor" },
    {
      label: "Commission a Programme",
      to: HOME_ROUTES.commissionSection,
      audience: "organisation",
    },
    { label: "Join as a Career Practitioner", to: HOME_ROUTES.join, audience: "practitioner" },
  ],
  ctaGhost: { label: "Sign In", to: HOME_ROUTES.signIn },
  ctaFilled: { label: "Book a Session", to: HOME_ROUTES.bookSession },
} as const;

// ── 02 Hero Section ──────────────────────────────────────────────────
export const HERO_COPY = {
  tag: "Nigeria's First Digital Career Service Platform",
  headline: "Navigate your career with structured, verified guidance.",
  subheadline:
    "Every session is professionally delivered, documented, and tracked. Career guidance that is accountable from the first appointment to the last report.",
  ctaPrimary: { label: "Find Career Guidance", to: HOME_ROUTES.findGuidance },
  ctaSecondary: { label: "Commission a Programme", to: HOME_ROUTES.commission },
  floatingCard: {
    title: "Session Confirmed",
    name: "Damilola A.",
    initials: "DA",
    dayLabel: "Today",
    // 4:00 PM Africa/Lagos (WAT, UTC+1). Formatted by date-formatters — never hard-coded.
    startsAt: "2026-11-17T15:00:00Z",
    status: "confirmed",
  },
  badge1: "100% Funded Seats Available",
  badge2: { score: "4.9 / 5.0", rating: 4.9, text: "98% Recommendation Rate" },
} as const;

// ── 03 Trust Bar ─────────────────────────────────────────────────────
export interface TrustStat {
  icon: IconName;
  number: string;
  /** Numeric part for the one-time count-up; omitted when the number is not a count. */
  countTo?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  subLabel: string;
}

export const TRUST_STATS: readonly TrustStat[] = [
  {
    icon: "practitioners",
    number: "350+",
    countTo: 350,
    suffix: "+",
    label: "Verified Career Practitioners",
    subLabel: "Across Nigeria and the global diaspora",
  },
  {
    icon: "zero-barrier",
    number: "₦0",
    label: "Barrier for Beneficiaries",
    subLabel: "100% funded slots for qualifying individuals",
  },
  {
    icon: "delivery-standard",
    number: "5-Stage",
    label: "Delivery Standard",
    subLabel: "Applied on every session, every time",
  },
  {
    icon: "partners",
    number: "45+",
    countTo: 45,
    suffix: "+",
    label: "Partner Organisations",
    subLabel: "Commissioning quality career services",
  },
] as const;

// ── 04 For Beneficiaries ─────────────────────────────────────────────
export const BENEFICIARIES_COPY = {
  label: "FOR YOU",
  headline: "Work with a verified career practitioner who documents your progress.",
  body: [
    "Every session on Naijapath follows a structured delivery process. Your practitioner prepares before you arrive, records what was discussed, agrees your next steps in writing, and tracks your progress over time.",
    "This is not casual advice. It is professional career guidance, delivered the way it should be.",
  ],
  cta: { label: "Find Career Guidance", to: HOME_ROUTES.findGuidance },
  supportingNote: "Free and subsidised sessions available for qualifying beneficiaries",
} as const;

// ── 05 Commission a Programme — For Project Clients ──────────────────
export const COMMISSION_COPY = {
  label: "COMMISSION WITH CONFIDENCE",
  headline: "Career services your organisation can commission, monitor, and report on.",
  body: [
    "Naijapath gives development organisations, government programmes, and corporate partners a structured platform to deliver career guidance at scale.",
    "Every session is documented. Every outcome is tracked. Every programme produces a reporting dataset you can take to your funders or leadership.",
    "Stop commissioning career activities you cannot measure. Start commissioning career services that are accountable from day one.",
  ],
  features: [
    { icon: "vetted", text: "Fully vetted and credentialled career practitioners" },
    { icon: "documentation", text: "Session-by-session documentation" },
    { icon: "dashboard", text: "Real-time programme dashboard" },
    { icon: "audit-report", text: "Audit-ready outcome reports" },
  ] as ReadonlyArray<{ icon: IconName; text: string }>,
  ctaPrimary: { label: "Commission a Programme", to: HOME_ROUTES.commission },
  ctaSecondary: { label: "Download Programme Brochure", to: HOME_ROUTES.brochure },
} as const;

// ── 06 How NaijaPath Works — The 5-Stage Delivery Standard ───────────
export const HOW_IT_WORKS_COPY = {
  label: "CLEAR PROGRESSION",
  headline: "Every session follows the same quality process.",
  subheadline:
    "From the first booking to the final report, the Naijapath 5-Stage Delivery Standard ensures every beneficiary receives the same quality of service.",
  stages: [
    {
      number: "01",
      name: "Scheduling",
      copy: "Beneficiaries book with verified career practitioners through the platform. No informal arrangements.",
    },
    {
      number: "02",
      name: "Intake",
      copy: "Before every session, the beneficiary completes a structured intake. The practitioner arrives prepared.",
    },
    {
      number: "03",
      name: "Delivery",
      copy: "A professional, one-on-one career guidance session with a trained and credentialled career practitioner.",
    },
    {
      number: "04",
      name: "Documentation",
      copy: "After every session, the practitioner records what was discussed, the actions agreed, and the next steps. The beneficiary receives a copy.",
    },
    {
      number: "05",
      name: "Reporting",
      copy: "Outcome data is compiled and shared with the commissioning organisation or made available to the beneficiary. Every programme is evidence-based.",
    },
  ],
} as const;

// ── 07 Social Proof ──────────────────────────────────────────────────
export const SOCIAL_PROOF_COPY = {
  label: "WHAT CHANGES WHEN CAREER GUIDANCE HAS A STANDARD",
  headline: "Structured Guidance. Impact you can verify.",
  subheadline: "Every story here came through a structured career guidance process.",
  cta: { label: "Read More Stories", to: HOME_ROUTES.stories },
} as const;

// ── 08 Join the Platform ─────────────────────────────────────────────
export type AudienceTheme = "mint" | "terracotta" | "dark";

export interface AudienceCard {
  theme: AudienceTheme;
  icon: IconName;
  audience: string;
  headline: string;
  body: string;
  cta: CopyLink;
}

export const JOIN_COPY = {
  label: "YOUR NEXT MOVE",
  headline: "Join NaijaPath",
  cards: [
    {
      theme: "mint",
      icon: "beneficiary",
      audience: "For Beneficiaries",
      headline: "Career guidance that takes your progress seriously.",
      body: "Connect with a verified career practitioner. Book a session, receive structured guidance, and leave with a documented action plan.",
      cta: { label: "Find Career Guidance", to: HOME_ROUTES.findGuidance },
    },
    {
      theme: "terracotta",
      icon: "practitioner",
      audience: "For Career Practitioners",
      headline: "Deliver your expertise through a structured, professional platform.",
      body: "Join a network of verified career practitioners. Get access to a managed platform, a growing client base, and a delivery standard that protects and elevates your professional practice.",
      cta: { label: "Join as a Career Practitioner", to: HOME_ROUTES.joinPractitioner },
    },
    {
      theme: "dark",
      icon: "organisation",
      audience: "For Organisations",
      headline: "Commission career services built to your programme goals.",
      body: "Commission structured career guidance for your beneficiaries, staff, or CSR cohorts. Monitor delivery, track outcomes, and report to your funders with verified data.",
      cta: { label: "Commission a Programme", to: HOME_ROUTES.commission },
    },
  ] as readonly AudienceCard[],
} as const;

// ── 09 Footer ────────────────────────────────────────────────────────
export const FOOTER_COPY = {
  logo: "NaijaPath",
  tagline: "Structured career guidance for Nigeria and the world.",
  columns: [
    {
      header: "Platform",
      links: [
        { label: "Find Career Guidance", to: HOME_ROUTES.findGuidance },
        { label: "How NaijaPath Works", to: HOME_ROUTES.howItWorks },
        { label: "Commission a Programme", to: HOME_ROUTES.commission },
      ],
    },
    {
      header: "Network",
      links: [
        { label: "Beneficiaries", to: HOME_ROUTES.beneficiaries },
        { label: "Join as a Career Practitioner", to: HOME_ROUTES.joinPractitioner },
        { label: "Partner Organisations", to: HOME_ROUTES.partners },
        { label: "Code of Conduct", to: HOME_ROUTES.codeOfConduct },
      ],
    },
    {
      header: "Resources",
      links: [
        { label: "Career Brief (Newsletter)", to: HOME_ROUTES.careerBrief },
        { label: "About Naijapath", to: HOME_ROUTES.about },
        { label: "Privacy Policy", to: HOME_ROUTES.privacy },
        { label: "Terms of Service", to: HOME_ROUTES.terms },
      ],
    },
  ] as ReadonlyArray<{ header: string; links: readonly CopyLink[] }>,
  newsletter: {
    label: "Career Brief",
    note: "Monthly career insights, sector updates, and guidance tools - straight to your inbox.",
    cta: "Subscribe",
  },
  copyright: "© 2026 NaijaPath. All rights reserved.",
} as const;
