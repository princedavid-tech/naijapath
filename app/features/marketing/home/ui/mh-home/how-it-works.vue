<template>
  <section
    :id="HOME_SECTION_IDS.howItWorks"
    tabindex="-1"
    aria-labelledby="how-heading"
    class="bg-base-0 py-16 lg:py-24 defer-render"
  >
    <NContainer>
      <header class="mx-auto max-w-[46rem] text-center">
        <MhHomeEyebrow class="justify-center">{{ copy.label }}</MhHomeEyebrow>
        <h2 id="how-heading" class="mt-4 text-display font-semibold text-green-600">
          {{ copy.headline }}
        </h2>
        <p class="mx-auto mt-5 max-w-[40rem] text-lead text-base-600">{{ copy.subheadline }}</p>
      </header>

      <!-- The five stages on a track: horizontal from 1280px, vertical (left) below. -->
      <ol
        ref="list"
        :aria-label="MICROCOPY.a11y.stagesListLabel"
        class="relative mt-14 grid grid-cols-1 gap-6 lg:mt-16 xl:grid-cols-5 xl:gap-5"
      >
        <span
          aria-hidden="true"
          class="absolute top-3 bottom-3 left-[13px] w-[3px] rounded-full bg-base-150 xl:top-[13px] xl:right-3 xl:bottom-auto xl:left-3 xl:h-[3px] xl:w-auto"
        >
          <span
            class="mh-how-fill block size-full rounded-full bg-green-600"
            :data-revealed="listVisible"
          />
        </span>

        <li
          v-for="(stage, i) in copy.stages"
          :key="stage.number"
          class="relative grid grid-cols-[1.75rem_minmax(0,1fr)] gap-x-4 xl:grid-cols-1 xl:grid-rows-[auto_1fr] xl:gap-y-6"
        >
          <!-- Knob: white centre, lime ring. -->
          <span
            aria-hidden="true"
            class="reveal relative z-10 mt-6 size-7 rounded-full border-[5px] border-lime-400 bg-base-0 ring-2 ring-green-600 xl:mt-0"
            :style="{ '--reveal-delay': `${200 + i * 220}ms` }"
            :data-revealed="listVisible"
          />
          <article class="h-full rounded-xl border border-base-150 bg-base-100 p-6 xl:p-5 2xl:p-6">
            <p
              aria-hidden="true"
              class="tabular font-heading text-stage font-semibold tracking-tight text-green-600"
            >
              {{ stage.number }}
            </p>
            <h3 class="mt-4 text-h3 font-semibold text-base-900">
              <span class="sr-only">Stage {{ stage.number }}: </span>{{ stage.name }}
            </h3>
            <p class="mt-2 text-base text-base-600">{{ stage.copy }}</p>
          </article>
        </li>
      </ol>
    </NContainer>
  </section>
</template>

<script setup lang="ts">
/**
 * 06 How NaijaPath Works — the 5-Stage Delivery Standard on a track. The green fill runs
 * along it once when the list scrolls into view, the knobs appearing in turn.
 * Reduced motion: shown complete (global rule zeroes the transitions).
 */
import { ref } from "vue";
import { HOW_IT_WORKS_COPY } from "../../domain/home-copy";
import { HOME_SECTION_IDS } from "../../domain/home-routes";
import { MICROCOPY } from "../../domain/home-microcopy";

const copy = HOW_IT_WORKS_COPY;
const list = ref<HTMLElement | null>(null);
const listVisible = useInViewOnce(list, { threshold: 0.15 });
</script>

<!-- Not scoped on purpose: Vue compiles a scoped `:global(.js) .x` to just `.js`, which would
     hit <html>. The class name is unique to this component. -->
<style>
/* Track fill: hidden only when JS runs (like `reveal`), then grows once. */
.mh-how-fill {
  transform-origin: top;
  transition: transform var(--dur-path) var(--ease-brand);
}
.js .mh-how-fill:not([data-revealed="true"]) {
  transform: scaleY(0);
}
@media (width >= 80rem) {
  .mh-how-fill {
    transform-origin: left;
  }
  .js .mh-how-fill:not([data-revealed="true"]) {
    transform: scaleX(0);
  }
}
</style>
