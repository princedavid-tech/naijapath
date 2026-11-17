<template>
  <span
    data-slot="rating"
    role="img"
    :aria-label="`Rated ${props.value} out of ${props.max}`"
    :class="cn('inline-flex items-center gap-0.5', props.class)"
  >
    <NIcon
      v-for="i in props.max"
      :key="i"
      name="star"
      :size="props.size"
      :weight="i <= Math.round(props.value) ? 'fill' : 'regular'"
      :class="i <= Math.round(props.value) ? 'text-amber-500' : 'text-base-150'"
    />
  </span>
</template>

<script setup lang="ts">
/** Amber stars (Design Guidelines). The numeric score is always shown as text alongside. */
import type { HTMLAttributes } from "vue";
import { cn } from "~/utils/utils";

const props = withDefaults(
  defineProps<{ value: number; max?: number; size?: number; class?: HTMLAttributes["class"] }>(),
  { max: 5, size: 16 },
);
</script>
