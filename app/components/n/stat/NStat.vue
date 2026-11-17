<template>
  <component :is="props.as" data-slot="stat" :class="cn('flex flex-col gap-1', props.class)">
    <slot />
  </component>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "~/utils/utils";

const props = withDefaults(defineProps<{ as?: "div" | "li"; class?: HTMLAttributes["class"] }>(), {
  as: "div",
});
</script>
