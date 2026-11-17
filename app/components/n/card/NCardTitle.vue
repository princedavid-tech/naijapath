<template>
  <component
    :is="props.as"
    data-slot="card-title"
    :class="cn('font-heading text-lg leading-snug font-semibold text-base-900', props.class)"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "~/utils/utils";

const props = withDefaults(
  defineProps<{ as?: "h2" | "h3" | "h4" | "p" | "div"; class?: HTMLAttributes["class"] }>(),
  { as: "h3" },
);
</script>
