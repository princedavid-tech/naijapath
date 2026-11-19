import { cva, type VariantProps } from "class-variance-authority";

/**
 * `color` × `variant` are orthogonal: both declared with EMPTY strings, real classes live in
 * `compoundVariants` (ARCHITECTURE.md §4.1).
 *
 * Every size is ≥ 44px tall (touch-target rule). Hover darkens to the 600 step. No scale-bounce.
 * Contrast for every pair is in scripts/contrast.mjs.
 */
export const buttonVariants = cva(
  [
    "relative inline-flex shrink-0 items-center justify-center gap-2 border-2",
    // Labels may wrap on narrow phones (no overflow at 320px); single line from 640px.
    "text-center font-heading font-semibold text-base leading-tight select-none sm:whitespace-nowrap",
    "transition-[background-color,border-color,color,box-shadow] duration-200 ease-brand",
    "disabled:pointer-events-none disabled:border-base-150 disabled:bg-base-150 disabled:text-base-500",
    "aria-disabled:pointer-events-none aria-disabled:border-base-150 aria-disabled:bg-base-150 aria-disabled:text-base-500",
    "[&_svg]:shrink-0",
  ],
  {
    variants: {
      // Guidelines: accent (orange) = primary CTA; primary outline (2px green) = secondary.
      color: { primary: "", accent: "", inverse: "" },
      variant: { solid: "", outline: "", ghost: "" },
      size: {
        default: "min-h-11 px-5 py-2.5",
        lg: "min-h-12 px-6 py-3",
        icon: "size-11 p-0",
      },
      shape: {
        default: "rounded-sm",
        // Pill (24px+): the final layout's CTA shape, used site-wide.
        pill: "rounded-full",
      },
    },
    compoundVariants: [
      // primary — green
      {
        color: "primary",
        variant: "solid",
        class:
          "border-green-500 bg-green-500 text-base-0 hover:border-green-600 hover:bg-green-600",
      },
      {
        color: "primary",
        variant: "outline",
        class:
          "border-green-500 bg-transparent text-green-500 hover:border-green-600 hover:bg-green-100 hover:text-green-600",
      },
      {
        color: "primary",
        variant: "ghost",
        class:
          "border-transparent bg-transparent text-green-500 hover:bg-green-50 hover:text-green-600",
      },
      // accent — terracotta (primary CTA on dark surfaces, Subscribe)
      {
        color: "accent",
        variant: "solid",
        class:
          "border-terracotta-500 bg-terracotta-500 text-base-0 hover:border-terracotta-600 hover:bg-terracotta-600",
      },
      {
        color: "accent",
        variant: "outline",
        class:
          "border-terracotta-500 bg-transparent text-terracotta-500 hover:border-terracotta-600 hover:text-terracotta-600",
      },
      {
        color: "accent",
        variant: "ghost",
        class: "border-transparent bg-transparent text-terracotta-500 hover:text-terracotta-600",
      },
      // inverse — white, for dark green surfaces
      {
        color: "inverse",
        variant: "solid",
        class: "border-base-0 bg-base-0 text-green-600 hover:border-green-150 hover:bg-green-150",
      },
      {
        color: "inverse",
        variant: "outline",
        class: "border-base-0 bg-transparent text-base-0 hover:bg-base-0 hover:text-green-600",
      },
      {
        color: "inverse",
        variant: "ghost",
        class: "border-transparent bg-transparent text-base-0 hover:bg-base-0/10",
      },
    ],
    defaultVariants: { color: "primary", variant: "solid", size: "default", shape: "default" },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
