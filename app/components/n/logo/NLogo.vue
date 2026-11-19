<template>
  <span data-slot="logo" :class="cn('inline-flex items-center', props.class)">
    <!-- The client's wordmark (public/brand/). Default: green "Naija" + orange-red "Path" for light
         grounds. `inverse`: white "Naija" for photography and dark green surfaces. -->
    <img
      :src="
        props.tone === 'inverse' ? '/brand/naijapath-logo-light.png' : '/brand/naijapath-logo.png'
      "
      alt="NaijaPath"
      width="440"
      height="92"
      decoding="async"
      class="h-6 w-auto select-none sm:h-7"
      draggable="false"
    />
  </span>
</template>

<script setup lang="ts">
/** The NaijaPath wordmark (client asset, transparent PNG extracted from the supplied file). */
import type { HTMLAttributes } from "vue";
import { cn } from "~/utils/utils";

const props = withDefaults(
  defineProps<{ tone?: "default" | "inverse"; class?: HTMLAttributes["class"] }>(),
  { tone: "default" },
);
</script>
