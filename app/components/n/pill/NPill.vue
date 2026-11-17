<template>
  <component
    :is="props.as"
    data-slot="pill"
    :class="cn(pillVariants({ tone: props.tone, size: props.size }), props.class)"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "~/utils/utils";
import { pillVariants, type PillVariants } from "./pill-variants";

const props = withDefaults(
  defineProps<{
    tone?: PillVariants["tone"];
    size?: PillVariants["size"];
    as?: "span" | "p" | "li" | "div";
    class?: HTMLAttributes["class"];
  }>(),
  { as: "span" },
);
</script>
