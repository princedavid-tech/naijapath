<template>
  <svg
    viewBox="0 0 30 16"
    :class="cn('h-4 w-[1.875rem] shrink-0', props.class)"
    aria-hidden="true"
    focusable="false"
  >
    <circle cx="8" cy="8" r="8" fill="var(--lime-400)" />
    <path d="M13 0a8 8 0 0 1 0 16Z" :fill="ink" />
    <path d="M19 0a8 8 0 0 1 0 16Z" :fill="ink" />
  </svg>
</template>

<script setup lang="ts">
/** The layout's recurring mark: a lime disc followed by two half-discs. Decorative. */
import { computed, type HTMLAttributes } from "vue";
import { cn } from "~/utils/utils";

const props = withDefaults(
  defineProps<{ tone?: "light" | "dark"; class?: HTMLAttributes["class"] }>(),
  { tone: "light" },
);
const ink = computed(() => (props.tone === "dark" ? "var(--base-0)" : "var(--green-600)"));
</script>
