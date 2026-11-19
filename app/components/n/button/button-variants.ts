import { cva, type VariantProps } from "class-variance-authority";

/**
 * redesign-v3 buttons: fully round pills, General Sans 500.
 *
 * `color` × `variant` stay orthogonal (empty base strings, classes in `compoundVariants`,
 * ARCHITECTURE.md §4.1) and keep their names so call sites read the same:
 *   accent  → burnt orange (ember): the PRIMARY action pill — main CTAs only
 *   primary → forest green: secondary emphasis on light surfaces
 *   light   → white pill with a hairline: the quiet secondary
 *   inverse → white on dark surfaces (forest panel, hero photo)
 *
 * A trailing icon (e.g. the arrow) slides 4px on hover/focus. Every size ≥ 44px tall.
 * Contrast for every pair is in scripts/contrast.mjs.
 */
export const buttonVariants = cva(
  [
    "group/button relative inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full border",
    // Labels may wrap on narrow phones (no overflow at 320px); single line from 640px.
    "text-center font-sans text-[0.9375rem] font-medium leading-tight tracking-[-0.005em] select-none sm:whitespace-nowrap",
    "transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out-soft",
    "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
    "[&_svg]:shrink-0",
    "[&>[data-slot=icon]:last-child:not(:first-child)]:transition-transform [&>[data-slot=icon]:last-child:not(:first-child)]:duration-200 [&>[data-slot=icon]:last-child:not(:first-child)]:ease-out-soft",
    "hover:[&>[data-slot=icon]:last-child:not(:first-child)]:translate-x-1 focus-visible:[&>[data-slot=icon]:last-child:not(:first-child)]:translate-x-1",
  ],
  {
    variants: {
      color: { primary: "", accent: "", inverse: "", light: "" },
      variant: { solid: "", outline: "", ghost: "" },
      size: {
        sm: "min-h-11 px-5 py-2",
        default: "min-h-12 px-6 py-2.5",
        lg: "min-h-14 px-7 py-3 text-base",
        icon: "size-12 p-0",
      },
      // Kept for API compatibility; every button is a pill in v3.
      shape: { default: "", pill: "" },
    },
    compoundVariants: [
      // accent — ember (primary action)
      {
        color: "accent",
        variant: "solid",
        class: "border-ember bg-ember text-white hover:border-ember-deep hover:bg-ember-deep",
      },
      {
        color: "accent",
        variant: "outline",
        class: "border-ember bg-transparent text-ember hover:bg-ember hover:text-white",
      },
      {
        color: "accent",
        variant: "ghost",
        class: "border-transparent bg-transparent text-ember hover:text-ember-deep",
      },
      // primary — forest
      {
        color: "primary",
        variant: "solid",
        class: "border-forest bg-forest text-white hover:border-forest-deep hover:bg-forest-deep",
      },
      {
        color: "primary",
        variant: "outline",
        class:
          "border-forest/35 bg-transparent text-forest hover:border-forest hover:bg-forest hover:text-white",
      },
      {
        color: "primary",
        variant: "ghost",
        class: "border-transparent bg-transparent text-forest hover:bg-sage",
      },
      // light — quiet white pill
      {
        color: "light",
        variant: "solid",
        class: "border-hairline bg-sheet text-ink hover:border-ink/25",
      },
      {
        color: "light",
        variant: "outline",
        class: "border-ink/20 bg-transparent text-ink hover:border-ink hover:bg-sheet",
      },
      {
        color: "light",
        variant: "ghost",
        class: "border-transparent bg-transparent text-ink hover:bg-ink/5",
      },
      // inverse — on dark surfaces and photography
      {
        color: "inverse",
        variant: "solid",
        class: "border-white bg-white text-ink hover:border-sage hover:bg-sage",
      },
      {
        color: "inverse",
        variant: "outline",
        class:
          "border-white/55 bg-transparent text-white hover:border-white hover:bg-white hover:text-ink",
      },
      {
        color: "inverse",
        variant: "ghost",
        class: "border-transparent bg-transparent text-white hover:bg-white/10",
      },
    ],
    defaultVariants: { color: "accent", variant: "solid", size: "default", shape: "default" },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
