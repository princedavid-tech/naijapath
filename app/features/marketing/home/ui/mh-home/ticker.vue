<template>
  <div class="relative overflow-hidden text-forest">
    <!-- Decorative: the stage names are read in full in How NaijaPath Works. -->
    <div aria-hidden="true" :class="cn('mh-ticker flex w-max', paused && 'mh-paused')">
      <ul v-for="copyIndex in 2" :key="copyIndex" class="flex shrink-0 items-center">
        <li
          v-for="name in NAMES"
          :key="name"
          class="flex items-center gap-8 py-6 pr-8 text-[clamp(1.75rem,1.3rem+1.8vw,3rem)] leading-none font-medium tracking-[-0.02em] whitespace-nowrap sm:gap-12 sm:pr-12 lg:py-9"
        >
          <span>{{ name }}</span>
          <svg viewBox="0 0 24 24" class="size-6 shrink-0 text-forest sm:size-8">
            <path
              d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9 4.9 19.1"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </li>
      </ul>
    </div>

    <!-- WCAG 2.2.2: moving content can be paused. -->
    <button
      type="button"
      class="absolute top-1/2 right-[var(--sheet-inset)] inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-hairline bg-sheet text-forest shadow-soft transition-colors duration-200 ease-out-soft hover:border-forest/40 motion-reduce:hidden"
      :aria-label="paused ? MICROCOPY.a11y.playTicker : MICROCOPY.a11y.pauseTicker"
      :aria-pressed="paused ? 'true' : 'false'"
      @click="paused = !paused"
    >
      <NIcon :name="paused ? 'play' : 'pause'" weight="fill" :size="16" />
    </button>
  </div>
</template>

<script setup lang="ts">
/** §2.2 Slow marquee of the five stage names, green on the cream ground, just below the hero sheet. */
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
    animation: mh-ticker 60s linear infinite;
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
