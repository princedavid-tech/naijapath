/**
 * Testimonials — the brief has none yet ("Insert three beneficiary testimonials here once
 * collected from platform users"). NEVER invent quotes, names or employers.
 *
 * When real testimonials arrive, add them here (first entry = featured card). The section
 * renders whenever this list is non-empty. Placeholder cards only render when the
 * SHOW_PLACEHOLDER_TESTIMONIALS flag is on (runtimeConfig.public.showPlaceholderTestimonials),
 * which defaults to false in production builds.
 */
export interface Testimonial {
  quote: string;
  name: string;
  /** Specific outcome, e.g. "Secured role at …" — must be verified with the beneficiary. */
  outcome: string;
  rating: number;
  /** /public path to a consented photo. Alt text format: "Profile photo of [Name]". */
  photo?: string;
}

export const TESTIMONIALS: readonly Testimonial[] = [];

export const PLACEHOLDER_TESTIMONIAL_COUNT = 3;
