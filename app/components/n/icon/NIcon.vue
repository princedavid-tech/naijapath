<template>
  <!-- eslint-disable-next-line vue/no-v-html -- trusted build-time SVG from @phosphor-icons/core -->
  <svg
    data-slot="icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    fill="currentColor"
    :width="props.size"
    :height="props.size"
    :class="cn('shrink-0', props.class)"
    :aria-hidden="props.label ? undefined : 'true'"
    :aria-label="props.label"
    :role="props.label ? 'img' : undefined"
    focusable="false"
    v-html="resolveIcon(props.name, props.weight)"
  />
</template>

<script setup lang="ts">
/**
 * Semantic icon. Decorative by default (aria-hidden). Pass `label` ONLY when the icon is the
 * sole carrier of meaning; icon-only controls put their aria-label on the control instead.
 */
import type { HTMLAttributes } from "vue";
import { resolveIcon, type IconName, type IconWeight } from "~/utils/icons";
import { cn } from "~/utils/utils";

const props = withDefaults(
  defineProps<{
    name: IconName;
    size?: number | string;
    weight?: IconWeight;
    label?: string;
    class?: HTMLAttributes["class"];
  }>(),
  { size: 24, weight: "regular" },
);
</script>
