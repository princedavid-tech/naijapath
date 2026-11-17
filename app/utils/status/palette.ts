import { cva, type VariantProps } from "class-variance-authority";

/**
 * Tone → classes. Every pair here is in scripts/contrast.mjs (all ≥ 4.5:1).
 * The dot is decorative; the text label carries the meaning.
 */
export const statusVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border font-heading font-semibold whitespace-nowrap",
  {
    variants: {
      tone: {
        success: "bg-success-50 border-success-150 text-success-500",
        pending: "bg-warning-50 border-warning-150 text-warning-500",
        danger: "bg-danger-50 border-danger-150 text-danger-500",
        info: "bg-info-50 border-info-150 text-info-500",
        neutral: "bg-base-100 border-base-150 text-base-600",
      },
      size: {
        sm: "h-6 px-2.5 text-xs",
        default: "h-7 px-3 text-[0.8125rem]",
      },
    },
    defaultVariants: { tone: "neutral", size: "default" },
  },
);

export type StatusVariants = VariantProps<typeof statusVariants>;
