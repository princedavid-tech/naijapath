import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge must know the custom font-size tokens from tailwind.css; otherwise it reads
 * `text-stat` / `text-label` as colours and silently drops them when merged with `text-green-500`.
 * Keep this list in sync with the `--text-*` tokens in @theme.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["hero", "display", "h2", "h3", "lead", "label", "stat", "stage"],
      shadow: ["card", "card-hover"],
      radius: ["sm", "lg", "xl"],
      ease: ["brand"],
    },
  },
});

/**
 * Merge class lists with Tailwind semantics: later classes win, so a caller passing `py-2`
 * genuinely replaces a part's default `py-6` (ARCHITECTURE.md §4.2).
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
