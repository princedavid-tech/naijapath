<template>
  <span data-slot="logo" :class="cn('inline-flex items-center gap-2.5', props.class)">
    <!--
      BRAND ASSET PENDING: replace this interim mark with the client's existing green brandmark
      (brief §01). Keep the SVG inline with aria-hidden — the wordmark text carries the name.
    -->
    <svg
      viewBox="0 0 36 36"
      class="size-9 shrink-0"
      aria-hidden="true"
      focusable="false"
      data-slot="logo-mark"
    >
      <rect width="36" height="36" rx="10" :fill="inverse ? '#FFFFFF' : 'var(--forest)'" />
      <path
        d="M8 26c5 0 6-5 10-8s6-3 10-8"
        fill="none"
        :stroke="inverse ? 'var(--forest)' : '#FFFFFF'"
        stroke-width="2.25"
        stroke-linecap="round"
      />
      <circle cx="8" cy="26" r="2.5" :fill="inverse ? 'var(--forest)' : '#FFFFFF'" />
      <circle cx="28" cy="10" r="2.5" fill="var(--ember)" />
    </svg>
    <span
      :class="
        cn(
          'text-[1.3125rem] font-semibold tracking-[-0.02em] transition-colors duration-300 ease-out-soft',
          inverse ? 'text-white' : 'text-ink',
        )
      "
    >
      NaijaPath
    </span>
  </span>
</template>

<script setup lang="ts">
/** v3 wordmark: forest mark + ink name, or white (`inverse`) over photography and forest. */
import { computed, type HTMLAttributes } from "vue";
import { cn } from "~/utils/utils";

const props = withDefaults(
  defineProps<{ tone?: "default" | "inverse"; class?: HTMLAttributes["class"] }>(),
  { tone: "default" },
);
const inverse = computed(() => props.tone === "inverse");
</script>
