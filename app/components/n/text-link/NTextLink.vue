<template>
  <NLink
    :to="props.to"
    data-slot="text-link"
    :class="
      cn(
        'group/link inline-flex min-h-11 items-center gap-2 font-heading text-base font-semibold',
        props.class,
      )
    "
  >
    <span class="link-underline pb-0.5"><slot /></span>
    <NIcon
      v-if="props.arrow"
      name="arrow-right"
      :size="18"
      weight="bold"
      class="transition-transform duration-200 ease-brand group-hover/link:translate-x-1 group-focus-visible/link:translate-x-1"
    />
  </NLink>
</template>

<script setup lang="ts">
/**
 * Text-link CTA. Moving underline on hover/focus; the arrow slides 4px.
 * The brief's "→" is drawn as an icon (aria-hidden) so screen readers announce the words only.
 * Min height 44px keeps it a proper touch target.
 */
import type { HTMLAttributes } from "vue";
import { cn } from "~/utils/utils";

const props = withDefaults(
  defineProps<{ to: string; arrow?: boolean; class?: HTMLAttributes["class"] }>(),
  { arrow: true },
);
</script>
