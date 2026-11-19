<template>
  <component
    :is="props.as"
    data-slot="card"
    :class="
      cn(
        'flex flex-col gap-4 rounded-card border border-hairline bg-sheet p-6 text-body shadow-soft',
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
