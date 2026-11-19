<template>
  <component
    :is="props.as"
    data-slot="sheet"
    :data-surface="props.tone === 'forest' ? 'dark' : undefined"
    :class="cn('sheet', TONES[props.tone], props.class)"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
/**
 * v3 inset panel ("sheet"): the site's panel language. A rounded (28px) field set 12–16px in
 * from the viewport edge on the cream ground. Tones are whole fields, never accents.
 * `forest` marks the surface dark so focus rings turn white inside it.
 */
import type { HTMLAttributes } from "vue";
import { cn } from "~/utils/utils";

type Tone = "sheet" | "forest" | "sage" | "sand" | "mist" | "none";

const TONES: Record<Tone, string> = {
  sheet: "bg-sheet text-body",
  forest: "bg-forest text-white",
  sage: "bg-sage text-body",
  sand: "bg-sand text-body",
  mist: "bg-mist text-body",
  none: "",
};

const props = withDefaults(
  defineProps<{
    tone?: Tone;
    as?: "section" | "div" | "footer" | "header" | "article";
    class?: HTMLAttributes["class"];
  }>(),
  { tone: "sheet", as: "section" },
);
</script>
