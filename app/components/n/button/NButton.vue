<template>
  <NLink
    v-if="props.to"
    :to="props.to"
    data-slot="button"
    :class="cn(buttonVariants({ color, variant, size, shape }), props.class)"
  >
    <slot />
  </NLink>
  <button
    v-else
    data-slot="button"
    :type="props.type"
    :disabled="props.disabled"
    :class="cn(buttonVariants({ color, variant, size, shape }), props.class)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "~/utils/utils";
import { buttonVariants, type ButtonVariants } from "./button-variants";

const props = withDefaults(
  defineProps<{
    color?: ButtonVariants["color"];
    variant?: ButtonVariants["variant"];
    size?: ButtonVariants["size"];
    shape?: ButtonVariants["shape"];
    /** When set, renders a link (NLink) styled as a button. */
    to?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    class?: HTMLAttributes["class"];
  }>(),
  { type: "button" },
);
</script>
