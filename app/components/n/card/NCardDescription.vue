<template>
  <p data-slot="card-description" :class="cn('text-sm text-base-500', props.class)">
    <slot />
  </p>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "~/utils/utils";

const props = defineProps<{ class?: HTMLAttributes["class"] }>();
</script>
