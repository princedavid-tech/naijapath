<template>
  <span data-slot="logo" :class="cn('inline-flex items-center gap-2.5', props.class)">
    <!--
      BRAND ASSET PENDING: replace this interim mark with the client's existing green brandmark
      (brief §01). Keep the SVG inline, sized by `size-9`, with aria-hidden — the wordmark text
      carries the accessible name.
    -->
    <svg
      viewBox="0 0 36 36"
      class="size-9 shrink-0"
      aria-hidden="true"
      focusable="false"
      data-slot="logo-mark"
    >
      <rect
        width="36"
        height="36"
        rx="9"
        :fill="props.tone === 'inverse' ? '#FFFFFF' : '#1E6428'"
      />
      <path
        d="M8 26c5 0 6-5 10-8s6-3 10-8"
        fill="none"
        :stroke="props.tone === 'inverse' ? '#1B3A2D' : '#FFFFFF'"
        stroke-width="2.5"
        stroke-linecap="round"
      />
      <circle cx="8" cy="26" r="2.5" :fill="props.tone === 'inverse' ? '#1B3A2D' : '#FFFFFF'" />
      <circle cx="28" cy="10" r="2.5" :fill="props.tone === 'inverse' ? '#B5451B' : '#E7BBA8'" />
    </svg>
    <span
      :class="
        cn(
          'font-heading text-xl font-bold tracking-[-0.01em]',
          props.tone === 'inverse' ? 'text-base-0' : 'text-green-600',
        )
      "
    >
      NaijaPath
    </span>
  </span>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "~/utils/utils";

const props = withDefaults(
  defineProps<{ tone?: "default" | "inverse"; class?: HTMLAttributes["class"] }>(),
  { tone: "default" },
);
</script>
