/**
 * Testimonials. The brief has none yet ("Insert three beneficiary testimonials here once
 * collected from platform users"). NEVER present invented quotes, names or employers as real.
 *
 * - TESTIMONIALS: real, consented testimonials only. When this list is non-empty the section
 *   renders everywhere, production included (first entry = featured card).
 * - SAMPLE_TESTIMONIALS: DESIGN SAMPLES for judging the layout. Fictional, visibly labelled
 *   "Sample testimonial" on every card, no photos, no star ratings, no real employers. They
 *   render ONLY while TESTIMONIALS is empty AND SHOW_PLACEHOLDER_TESTIMONIALS is on
 *   (runtimeConfig.public.showPlaceholderTestimonials — false in production builds).
 *   Replace them with real ones before launch.
 */
export interface Testimonial {
  quote: string;
  name: string;
  /** Specific outcome, e.g. "Secured role at …" — must be verified with the beneficiary. */
  outcome: string;
  /** Who they are, e.g. "Graduate, Enugu". */
  role?: string;
  /** Real testimonials only. Samples never carry a rating. */
  rating?: number;
  /** /public path to a consented photo. Alt text format: "Profile photo of [Name]". */
  photo?: string;
  /** True for design samples: the card shows a visible "Sample testimonial" label. */
  sample?: boolean;
}

export const TESTIMONIALS: readonly Testimonial[] = [];

export const SAMPLE_TESTIMONIALS: readonly Testimonial[] = [
  {
    sample: true,
    quote:
      "I had advice from everyone and a plan from no one. My practitioner sent the session notes the same evening, and I worked through the agreed actions one by one.",
    name: "Adaeze N.",
    role: "Graduate, Enugu",
    outcome: "Moved from job search into a graduate trainee role",
  },
  {
    sample: true,
    quote:
      "The intake made me think before I arrived, so the whole hour went on my questions instead of catching up.",
    name: "Tunde B.",
    role: "Career changer, Lagos",
    outcome: "Changed careers into data analysis",
  },
  {
    sample: true,
    quote:
      "Every session in our cohort was documented, so the report to our funder came straight from the platform.",
    name: "Halima S.",
    role: "Programme manager, Abuja",
    outcome: "Completed a funded cohort",
  },
];
