import { cva, type VariantProps } from "class-variance-authority";

/** Small rounded chips: tag labels, location pills, solid white hero badges. */
export const pillVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border font-heading font-semibold leading-tight",
  {
    variants: {
      tone: {
        green: "border-green-150 bg-green-100 text-green-500",
        terracotta: "border-terracotta-100 bg-terracotta-50 text-terracotta-500",
        // Terracotta text on a white pill — used for labels on the dark band (brief §05).
        "terracotta-on-white": "border-base-0 bg-base-0 text-terracotta-500",
        white: "border-base-150 bg-base-0 text-base-900",
        // Location pill on the dark footer.
        "green-soft": "border-green-150 bg-green-150 text-base-900",
        muted: "border-base-150 bg-base-100 text-base-600",
      },
      size: {
        sm: "min-h-7 px-3 py-1 text-[0.8125rem]",
        default: "min-h-8 px-3.5 py-1.5 text-sm",
      },
    },
    defaultVariants: { tone: "green", size: "default" },
  },
);

export type PillVariants = VariantProps<typeof pillVariants>;
