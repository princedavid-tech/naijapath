<template>
  <p data-slot="stat-caption" :class="cn('text-sm leading-normal text-base-500', props.class)">
    <slot />
  </p>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "~/utils/utils";

const props = defineProps<{ class?: HTMLAttributes["class"] }>();
</script>
