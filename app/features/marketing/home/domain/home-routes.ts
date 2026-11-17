/**
 * Every path the homepage links to. Routing is not a port — markup uses NLink with these.
 *
 * Two kinds:
 * - In-page anchors (`/#…`): the homepage itself answers the question (nav links, footer).
 *   NLink scrolls smoothly and moves focus to the section.
 * - Product routes: actions that live in the platform app (booking, sign-in, commissioning).
 *   These pages are OUTSIDE this build — confirm the final paths with the platform team.
 */
export const HOME_SECTION_IDS = {
  main: "main",
  hero: "top",
  trust: "trust",
  forYou: "for-you",
  commission: "commission",
  howItWorks: "how-it-works",
  stories: "stories",
  join: "join",
  careerBrief: "career-brief",
} as const;

export const HOME_ROUTES = {
  home: "/",

  // In-page anchors
  forYou: `/#${HOME_SECTION_IDS.forYou}`,
  howItWorks: `/#${HOME_SECTION_IDS.howItWorks}`,
  commissionSection: `/#${HOME_SECTION_IDS.commission}`,
  join: `/#${HOME_SECTION_IDS.join}`,
  careerBrief: `/#${HOME_SECTION_IDS.careerBrief}`,

  // Product routes (platform app — not part of this build)
  findGuidance: "/find-career-guidance",
  bookSession: "/book-a-session",
  signIn: "/sign-in",
  commission: "/commission-a-programme",
  joinPractitioner: "/join-as-a-career-practitioner",
  stories: "/stories",
  beneficiaries: "/beneficiaries",
  partners: "/partner-organisations",
  codeOfConduct: "/code-of-conduct",
  about: "/about",
  privacy: "/privacy-policy",
  terms: "/terms-of-service",

  // File slot — drop the PDF at public/downloads/naijapath-programme-brochure.pdf
  brochure: "/downloads/naijapath-programme-brochure.pdf",
} as const;

/** API endpoints (relative to runtimeConfig.public.apiBaseUrl → same-origin proxy). */
export const HOME_API = {
  newsletterSubscribe: "/newsletter/subscribe",
} as const;

/**
 * Social profile URLs — NOT supplied in the brief. Set these before launch.
 * While an href is empty the footer renders that icon as a plain, non-interactive glyph
 * (aria-hidden), so there is never a dead `href="#"` link for keyboard/screen-reader users.
 */
export const HOME_SOCIAL = [
  { id: "linkedin", label: "NaijaPath on LinkedIn", href: "" },
  { id: "x", label: "NaijaPath on X (Twitter)", href: "" },
  { id: "youtube", label: "NaijaPath on YouTube", href: "" },
] as const;
