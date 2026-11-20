/**
 * MICROCOPY NOT IN THE BRIEF — written plainly for accessibility, mock product UI and form states.
 * Every string here is listed in the build summary for client review. Keep them out of
 * home-copy.ts so the approved copy stays verifiably verbatim.
 */
import { HOME_ROUTES } from "./home-routes";

export const MICROCOPY = {
  meta: {
    title: "NaijaPath | Nigeria's First Digital Career Service Platform",
    ogImageAlt: "NaijaPath — Navigate your career with structured, verified guidance.",
  },

  // Nav item added at the owner's request (2026-11-20). Not in the brief: needs client review,
  // and content-lock.md must be regenerated once approved.
  nav: {
    contact: "Contact",
  },

  // Floating chat assistant (owner request, 2026-11-20). A SCRIPTED helper, not AI and not a
  // person; it says so. Replies only point to what the page already says. Needs client review.
  assistant: {
    launcher: "Chat with us",
    close: "Close chat",
    title: "NaijaPath assistant",
    subtitle: "Automated help. The team can take over on WhatsApp.",
    subtitleNoWhatsapp: "Automated help. The team replies to messages by email.",
    greeting: "Hello! I am NaijaPath's automated assistant. What would you like help with?",
    again: "Anything else I can help with?",
    typing: "The assistant is typing…",
    logLabel: "Conversation with the NaijaPath assistant",
    repliesLabel: "Suggested questions",
    whatsappCta: "Continue on WhatsApp",
    contactCta: "Send the team a message",
    whatsappPrefill: "Hello NaijaPath, I would like help with: ",
    topics: [
      {
        id: "guidance",
        label: "Find career guidance",
        reply:
          "Career guidance on NaijaPath is one-to-one with a career practitioner, and every session is documented. The quickest way to start is to request a session.",
        links: [
          { label: "Book a session", to: HOME_ROUTES.bookSession },
          { label: "How NaijaPath works", to: HOME_ROUTES.howItWorks },
        ],
      },
      {
        id: "commission",
        label: "Commission a programme",
        reply:
          "Organisations can commission career guidance for a group and follow progress as it happens. Tell the team about your programme and they will get back to you.",
        links: [
          { label: "Commission a programme", to: HOME_ROUTES.commissionSection },
          { label: "Contact the team", to: HOME_ROUTES.contact },
        ],
      },
      {
        id: "practitioner",
        label: "Join as a practitioner",
        reply:
          "Career practitioners can apply to join the NaijaPath network. This part of the page explains what is involved.",
        links: [{ label: "Join as a practitioner", to: HOME_ROUTES.join }],
      },
      {
        id: "account",
        label: "Help with my account",
        reply:
          "You can sign in or create an account here. If something is not working, send the team a message.",
        links: [
          { label: "Sign in", to: HOME_ROUTES.signIn },
          { label: "Contact the team", to: HOME_ROUTES.contact },
        ],
      },
      {
        id: "person",
        label: "Talk to a person",
        reply: "Of course. The team can pick this up with you directly.",
        links: [],
      },
    ],
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
    // Visible on every design-sample card (dev only; see home-testimonials.ts).
    sampleBadge: "Sample testimonial",
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
