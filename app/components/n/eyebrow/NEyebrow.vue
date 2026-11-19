<template>
  <p
    data-slot="eyebrow"
    :class="
      cn(
        'inline-flex items-center gap-2 text-eyebrow font-medium uppercase',
        props.tone === 'dark' ? 'text-sage' : 'text-forest',
        props.class,
      )
    "
  >
    <span
      aria-hidden="true"
      :class="cn('size-1.5 rounded-full', props.tone === 'dark' ? 'bg-sage' : 'bg-ember')"
    />
    <slot />
  </p>
</template>

<script setup lang="ts">
/**
 * v3 section eyebrow: 12px uppercase, 0.08em tracking, forest (sage on dark), with one small
 * ember dot. The label text is the client's locked copy, passed through verbatim. A <p>, not a
 * heading: the H2 after it is the heading.
 */
import type { HTMLAttributes } from "vue";
import { cn } from "~/utils/utils";

const props = withDefaults(
  defineProps<{ tone?: "light" | "dark"; class?: HTMLAttributes["class"] }>(),
  { tone: "light" },
);
</script>
