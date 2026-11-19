<template>
  <section
    v-if="shouldRender"
    :id="HOME_SECTION_IDS.stories"
    tabindex="-1"
    aria-labelledby="stories-heading"
    class="sheet mt-3 bg-mist py-16 defer-render md:mt-4 lg:py-24"
  >
    <NContainer>
      <header class="max-w-[48rem]">
        <MhHomeEyebrow>{{ copy.label }}</MhHomeEyebrow>
        <h2 id="stories-heading" class="mt-4 text-display font-semibold text-base-900">
          {{ copy.headline }}
        </h2>
        <p class="mt-5 max-w-[36rem] text-lead text-base-600">{{ copy.subheadline }}</p>
      </header>

      <!-- One large story card at a time; the next one peeks in from the right. -->
      <ul
        ref="track"
        tabindex="0"
        :aria-label="MICROCOPY.a11y.storiesList"
        class="mh-track -mx-4 mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:mt-16 lg:px-0"
      >
        <li
          v-for="(item, i) in cards"
          :key="i"
          class="w-[88%] shrink-0 snap-start sm:w-[80%] lg:w-[78%]"
        >
          <MhHomeTestimonialCard :testimonial="item" />
        </li>
      </ul>

      <div class="mt-8 flex flex-wrap items-center justify-between gap-4">
        <NTextLink :to="copy.cta.to" class="text-green-500 hover:text-green-600">{{
          copy.cta.label
        }}</NTextLink>
        <div v-if="cards.length > 1" class="flex items-center gap-3">
          <button
            type="button"
            :class="
              cn(buttonVariants({ variant: 'outline', size: 'icon', shape: 'pill' }), 'bg-base-0')
            "
            :aria-label="MICROCOPY.a11y.storiesPrev"
            @click="step(-1)"
          >
            <NIcon name="arrow-right" :size="18" weight="bold" class="rotate-180" />
          </button>
          <button
            type="button"
            :class="
              cn(buttonVariants({ variant: 'outline', size: 'icon', shape: 'pill' }), 'bg-base-0')
            "
            :aria-label="MICROCOPY.a11y.storiesNext"
            @click="step(1)"
          >
            <NIcon name="arrow-right" :size="18" weight="bold" />
          </button>
        </div>
      </div>
    </NContainer>
  </section>
</template>

<script setup lang="ts">
/**
 * 07 Social Proof. The brief has no real testimonials yet. Real ones (domain/home-testimonials)
 * always render; otherwise placeholder cards marked "Testimonial pending" render ONLY when
 * SHOW_PLACEHOLDER_TESTIMONIALS is on (default: on in dev, OFF in production builds).
 * With neither, the whole section is omitted — a "stories" section with no stories would
 * be worse than none.
 *
 * Layout: a native scroll-snap row (swipe / trackpad / keyboard scroll all work without JS);
 * the arrow buttons just scroll it by one card.
 */
import { computed, ref } from "vue";
import { buttonVariants } from "~/components/n/button/button-variants";
import { cn } from "~/utils/utils";
import { SOCIAL_PROOF_COPY } from "../../domain/home-copy";
import { HOME_SECTION_IDS } from "../../domain/home-routes";
import { MICROCOPY } from "../../domain/home-microcopy";
import {
  PLACEHOLDER_TESTIMONIAL_COUNT,
  TESTIMONIALS,
  type Testimonial,
} from "../../domain/home-testimonials";

const copy = SOCIAL_PROOF_COPY;
const config = useRuntimeConfig();
const SHOW_PLACEHOLDER_TESTIMONIALS = Boolean(config.public.showPlaceholderTestimonials);

const cards = computed<Array<Testimonial | undefined>>(() =>
  TESTIMONIALS.length
    ? [...TESTIMONIALS]
    : SHOW_PLACEHOLDER_TESTIMONIALS
      ? Array.from({ length: PLACEHOLDER_TESTIMONIAL_COUNT }, () => undefined)
      : [],
);
const shouldRender = computed(() => cards.value.length > 0);

const track = ref<HTMLElement | null>(null);
function step(dir: 1 | -1) {
  const el = track.value;
  const card = el?.firstElementChild as HTMLElement | null;
  if (!el || !card) return;
  const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
  el.scrollBy({ left: dir * (card.offsetWidth + gap) });
}
</script>

<style scoped>
.mh-track {
  scrollbar-width: none;
}
.mh-track::-webkit-scrollbar {
  display: none;
}
</style>
