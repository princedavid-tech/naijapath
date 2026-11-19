<template>
  <!-- v-html is safe: trusted build-time SVG from lucide-static / authored marks (utils/icons.ts). -->
  <svg
    data-slot="icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    :fill="props.weight === 'fill' ? 'currentColor' : 'none'"
    stroke="currentColor"
    :stroke-width="strokeUnits"
    stroke-linecap="round"
    stroke-linejoin="round"
    :width="props.size"
    :height="props.size"
    :data-draw="props.draw || undefined"
    :class="cn('shrink-0', props.class)"
    :aria-hidden="props.label ? undefined : 'true'"
    :aria-label="props.label"
    :role="props.label ? 'img' : undefined"
    focusable="false"
    v-html="resolveIcon(props.name)"
  />
</template>

<script setup lang="ts">
/**
 * Semantic line-art icon. Decorative by default (aria-hidden); pass `label` only when the icon
 * alone carries meaning (icon-only controls put their aria-label on the control instead).
 *
 * `stroke` is in RENDERED pixels whatever the size, so a 96px illustration and a 16px UI mark
 * share one line weight. Defaults: 1.5px (house stroke); `weight="bold"` 2px for small marks.
 * `draw` arms the stroke-draw animation (see the `.icon-draw` rules in tailwind.css).
 */
import { computed, type HTMLAttributes } from "vue";
import { resolveIcon, type IconName, type IconWeight } from "~/utils/icons";
import { cn } from "~/utils/utils";

const props = withDefaults(
  defineProps<{
    name: IconName;
    size?: number;
    weight?: IconWeight;
    /** Rendered stroke width in px (overrides the weight's default). */
    stroke?: number;
    /** Arm the stroke-draw animation for this icon. */
    draw?: boolean;
    label?: string;
    class?: HTMLAttributes["class"];
  }>(),
  { size: 24, weight: "regular" },
);

const strokeUnits = computed(() => {
  const px = props.stroke ?? (props.weight === "bold" ? 2 : 1.5);
  return +((px * 24) / props.size).toFixed(3);
});
</script>
