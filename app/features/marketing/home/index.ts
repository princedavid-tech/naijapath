/**
 * marketing/home slice barrel — domain only (ARCHITECTURE.md §9.2).
 * Never export ui, composition or adapters from here. Nothing inside this slice imports this file.
 */
export * from "./domain/home-copy";
export * from "./domain/home-routes";
export { MICROCOPY } from "./domain/home-microcopy";
export { TESTIMONIALS, type Testimonial } from "./domain/home-testimonials";
