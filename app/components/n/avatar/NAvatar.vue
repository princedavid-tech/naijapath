<template>
  <span
    data-slot="avatar"
    :class="
      cn(
        'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-heading font-semibold',
        props.initials ? 'bg-green-500 text-base-0' : 'bg-base-150 text-base-500',
        SIZES[props.size],
        props.class,
      )
    "
    aria-hidden="true"
  >
    <template v-if="props.initials">{{ props.initials }}</template>
    <!-- Neutral silhouette — used for "Testimonial pending" placeholders. Never a synthetic face. -->
    <svg v-else viewBox="0 0 40 40" class="size-full" fill="currentColor">
      <circle cx="20" cy="15" r="7" />
      <path d="M6 38c1.6-8 7.2-12 14-12s12.4 4 14 12z" />
    </svg>
  </span>
</template>

<script setup lang="ts">
/** Decorative: the person's name is always rendered as text next to it. */
import type { HTMLAttributes } from "vue";
import { cn } from "~/utils/utils";

type Size = "sm" | "default" | "lg";
const SIZES: Record<Size, string> = {
  sm: "size-8 text-xs",
  default: "size-10 text-sm",
  lg: "size-12 text-base",
};

const props = withDefaults(
  defineProps<{ initials?: string; size?: Size; class?: HTMLAttributes["class"] }>(),
  { size: "default" },
);
</script>
