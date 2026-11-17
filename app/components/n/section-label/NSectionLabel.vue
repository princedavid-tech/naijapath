<template>
  <p
    data-slot="section-label"
    :class="
      cn(
        'inline-flex w-fit items-center rounded-[0.3125rem] font-heading text-label font-semibold tracking-[0.05em] uppercase',
        TONES[props.tone],
        props.class,
      )
    "
  >
    <slot />
  </p>
</template>

<script setup lang="ts">
/**
 * Section label — short all-caps tag, 13px, letter-spacing 0.05em (Design Guidelines:
 * all-caps allowed for short labels only). A <p>, not a heading: the H2 below it is the heading.
 */
import type { HTMLAttributes } from "vue";
import { cn } from "~/utils/utils";

type Tone = "terracotta" | "terracotta-on-white" | "green" | "muted";

const TONES: Record<Tone, string> = {
  terracotta: "border border-terracotta-100 bg-terracotta-50 px-2 py-1 text-terracotta-500",
  "terracotta-on-white": "border border-base-0 bg-base-0 px-2 py-1 text-terracotta-500",
  green: "border border-green-150 bg-green-100 px-2 py-1 text-green-500",
  // Brief §07: "small grey caps" — no pill, just set text.
  // base-600, not 500: it sits on the mint band (base-500 on green-50 is 4.44:1).
  muted: "px-0 py-0 text-base-600",
};

const props = withDefaults(defineProps<{ tone?: Tone; class?: HTMLAttributes["class"] }>(), {
  tone: "terracotta",
});
</script>
