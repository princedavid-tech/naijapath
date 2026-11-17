<template>
  <p
    data-slot="stat-label"
    :class="cn('font-heading text-base leading-snug font-semibold text-base-600', props.class)"
  >
    <slot />
  </p>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "~/utils/utils";

const props = defineProps<{ class?: HTMLAttributes["class"] }>();
</script>
