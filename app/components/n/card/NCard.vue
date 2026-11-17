<template>
  <component
    :is="props.as"
    data-slot="card"
    :class="
      cn(
        'flex flex-col gap-4 rounded-lg border border-base-150 bg-base-0 p-6 text-base-600 shadow-card',
        props.class,
      )
    "
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "~/utils/utils";

const props = withDefaults(
  defineProps<{
    as?: "div" | "article" | "section" | "li" | "figure";
    class?: HTMLAttributes["class"];
  }>(),
  { as: "div" },
);
</script>
