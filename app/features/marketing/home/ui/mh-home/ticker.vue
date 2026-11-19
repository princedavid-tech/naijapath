<template>
  <div class="relative overflow-hidden border-y border-green-150 bg-green-100 text-green-500">
    <!-- Decorative: the stage names are read in full in How NaijaPath Works. -->
    <div aria-hidden="true" :class="cn('mh-ticker flex w-max', paused && 'mh-paused')">
      <ul v-for="copyIndex in 2" :key="copyIndex" class="flex shrink-0 items-center">
        <li
          v-for="name in NAMES"
          :key="name"
          class="flex items-center gap-10 py-4 pr-10 font-heading text-xl font-semibold whitespace-nowrap sm:text-[1.75rem] lg:py-5"
        >
          <span>{{ name }}</span>
          <svg viewBox="0 0 24 24" class="size-7 shrink-0 text-terracotta-500 sm:size-8">
            <path
              d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9 4.9 19.1"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </li>
      </ul>
    </div>

    <!-- WCAG 2.2.2: moving content can be paused. -->
    <button
      type="button"
      class="absolute top-1/2 right-2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border-2 border-green-500 bg-base-0 text-green-500 hover:bg-green-50 motion-reduce:hidden"
      :aria-label="paused ? MICROCOPY.a11y.playTicker : MICROCOPY.a11y.pauseTicker"
      :aria-pressed="paused ? 'true' : 'false'"
      @click="paused = !paused"
    >
      <NIcon :name="paused ? 'play' : 'pause'" weight="fill" :size="16" />
    </button>
  </div>
</template>

<script setup lang="ts">
/** Scrolling band of the five stage names between the hero and the first section. */
import { ref } from "vue";
import { cn } from "~/utils/utils";
import { HOW_IT_WORKS_COPY } from "../../domain/home-copy";
import { MICROCOPY } from "../../domain/home-microcopy";

const NAMES = HOW_IT_WORKS_COPY.stages.map((s) => s.name);
const paused = ref(false);
</script>

<style scoped>
@media (prefers-reduced-motion: no-preference) {
  .mh-ticker {
    animation: mh-ticker 32s linear infinite;
  }
  .mh-ticker.mh-paused {
    animation-play-state: paused;
  }
}
@keyframes mh-ticker {
  to {
    transform: translateX(-50%);
  }
}
</style>
