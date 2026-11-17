<template>
  <label
    data-slot="label"
    :for="props.for"
    :class="cn('font-body text-sm font-medium text-base-600', props.class)"
  >
    <slot />
    <template v-if="props.required">
      <span aria-hidden="true" class="ml-0.5">*</span>
      <span class="sr-only"> (required)</span>
    </template>
  </label>
</template>

<script setup lang="ts">
/** Always visible above its input (Design Guidelines). Required = asterisk + SR-only text. */
import type { HTMLAttributes } from "vue";
import { cn } from "~/utils/utils";

const props = defineProps<{ for: string; required?: boolean; class?: HTMLAttributes["class"] }>();
</script>
