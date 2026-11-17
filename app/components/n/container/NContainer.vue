<template>
  <component
    :is="props.as"
    data-slot="container"
    :class="cn('mx-auto w-full max-w-page px-4 sm:px-6 lg:px-8', props.class)"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
/** 1280px page container. 16px side gutter on phones (no horizontal scroll at 320px). */
import type { HTMLAttributes } from "vue";
import { cn } from "~/utils/utils";

const props = withDefaults(
  defineProps<{
    as?: "div" | "section" | "header" | "footer" | "nav";
    class?: HTMLAttributes["class"];
  }>(),
  { as: "div" },
);
</script>
