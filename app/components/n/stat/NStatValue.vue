<template>
  <p
    data-slot="stat-value"
    :class="
      cn('tabular font-heading text-stat font-bold tracking-tight text-green-500', props.class)
    "
  >
    <slot />
  </p>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "~/utils/utils";

const props = defineProps<{ class?: HTMLAttributes["class"] }>();
</script>
