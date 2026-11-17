<template>
  <p
    :class="
      cn(
        'inline-flex items-center gap-2.5 font-heading text-base font-medium',
        props.tone === 'dark' ? 'text-base-0' : 'text-base-900',
        props.class,
      )
    "
  >
    <MhHomeDots :tone="props.tone" />
    <!-- The brief's labels are ALL CAPS; the layout sets them in sentence case. The DOM text
         stays verbatim — only the rendering changes. -->
    <span class="inline-block lowercase first-letter:uppercase">
      <slot />
    </span>
  </p>
</template>

<script setup lang="ts">
/** Section eyebrow: the two-dot mark + a short label. A <p>; the H2 below is the heading. */
import type { HTMLAttributes } from "vue";
import { cn } from "~/utils/utils";

const props = withDefaults(
  defineProps<{ tone?: "light" | "dark"; class?: HTMLAttributes["class"] }>(),
  { tone: "light" },
);
</script>
