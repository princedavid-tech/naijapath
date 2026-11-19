/**
 * MICROCOPY NOT IN THE BRIEF — written plainly for accessibility, mock product UI and form states.
 * Every string here is listed in the build summary for client review. Keep them out of
 * home-copy.ts so the approved copy stays verifiably verbatim.
 */
export const MICROCOPY = {
  meta: {
    title: "NaijaPath | Nigeria's First Digital Career Service Platform",
    ogImageAlt: "NaijaPath — Navigate your career with structured, verified guidance.",
  },

  a11y: {
    skipLink: "Skip to main content",
    primaryNav: "Main",
    footerNav: "Footer",
    homeLink: "NaijaPath home",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    mobileMenuTitle: "Menu",
    trustBarHeading: "NaijaPath at a glance",
    heroBadgesLabel: "Platform highlights",
    stagesListLabel: "The five stages",
    commissionFeaturesLabel: "What your organisation gets",
    socialLabel: "NaijaPath on social media",
    sampleCardNote: "Illustration of the NaijaPath platform",
    storiesPrev: "Previous story",
    storiesNext: "Next story",
    storiesList: "Stories",
  },

  images: {
    hero: "A career practitioner and a young professional review a session plan together on a laptop",
    beneficiary:
      "A young professional takes part in a virtual career guidance session on a laptop at a desk",
  },

  sessionRecord: {
    eyebrow: "Session record",
    title: "Agreed Actions",
    actions: [
      "Update CV with recent project outcomes",
      "Apply to two graduate trainee programmes",
      "Prepare for a mock interview",
    ],
    practitionerLabel: "Practitioner",
    practitionerName: "Chinedu O.",
    // Raw timestamp → formatted in Africa/Lagos by date-formatters.
    recordedAt: "2026-11-12T10:30:00Z",
    footer: "Shared with you",
    status: "completed",
  },

  cohortDashboard: {
    eyebrow: "Programme dashboard",
    title: "Cohort progress",
    sampleBadge: "Sample data",
    metrics: [
      { label: "Sessions completed", value: "142", of: "of 180" },
      { label: "Beneficiaries", value: "60", of: "enrolled" },
      { label: "Interview conversion rate", value: "38%", of: "of beneficiaries" },
    ],
    chartTitle: "Sessions completed per week",
    chartWeeks: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"],
    chartValues: [8, 12, 15, 17, 19, 22, 24, 25],
    chartSummary: "Sample data: sessions completed per week rose from 8 in week 1 to 25 in week 8.",
  },

  testimonials: {
    pendingBadge: "Testimonial pending",
    pendingQuote: "Quote to be added once collected from a platform user.",
    pendingName: "Name pending",
    pendingOutcome: "Outcome label pending",
  },

  footer: {
    locationPill: "Abuja · Lagos · Diaspora",
  },

  newsletter: {
    emailLabel: "Email address",
    emailPlaceholder: "name@example.com",
    sending: "Subscribing…",
    success: "Thank you. You are now subscribed to the Career Brief.",
    errorRequired: "Enter your email address.",
    errorInvalid: "Enter a valid email address, like name@example.com.",
    errorFallback: "We could not subscribe you right now. Please try again in a moment.",
  },

  notFound: {
    title: "This page is not available yet",
    body: "The page you are looking for has moved or is not live yet.",
    cta: "Back to the homepage",
  },
} as const;
