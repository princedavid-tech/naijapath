<template>
  <!-- §2.8 Stories (redesign-v3): title left, arrows right; cards scroll sideways (swipe,
       trackpad, keyboard, mouse-drag), bleeding to the sheet's right edge. -->
  <section
    v-if="shouldRender"
    :id="HOME_SECTION_IDS.stories"
    tabindex="-1"
    aria-labelledby="stories-heading"
    class="sheet section-y mt-3 bg-mist defer-render md:mt-4"
  >
    <div class="site-container flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
      <header class="max-w-[44rem]">
        <NEyebrow>{{ copy.label }}</NEyebrow>
        <h2 id="stories-heading" class="mt-5 text-title text-ink">{{ copy.headline }}</h2>
        <p class="measure mt-5 text-copy text-body">{{ copy.subheadline }}</p>
      </header>

      <div class="flex shrink-0 items-center gap-3">
        <NTextLink :to="copy.cta.to" class="mr-2 text-forest">{{ copy.cta.label }}</NTextLink>
        <template v-if="cards.length > 1">
          <button
            type="button"
            :disabled="atStart"
            :aria-label="MICROCOPY.a11y.storiesPrev"
            class="mh-arrow"
            @click="step(-1)"
          >
            <NIcon name="arrow-left" :size="20" />
          </button>
          <button
            type="button"
            :disabled="atEnd"
            :aria-label="MICROCOPY.a11y.storiesNext"
            class="mh-arrow"
            @click="step(1)"
          >
            <NIcon name="arrow-right" :size="20" />
          </button>
        </template>
      </div>
    </div>

    <ul
      ref="track"
      tabindex="0"
      :aria-label="MICROCOPY.a11y.storiesList"
      :class="[
        'mh-track mt-12 flex gap-5 overflow-x-auto pb-2 lg:mt-16',
        dragging && 'is-dragging',
      ]"
      @scroll.passive="updateEnds"
      @pointerdown="onDown"
      @click.capture="onClickCapture"
    >
      <li
        v-for="(item, i) in cards"
        :key="i"
        class="w-[min(27rem,84vw)] shrink-0 snap-start lg:w-[30rem]"
      >
        <MhHomeTestimonialCard :testimonial="item" />
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
/**
 * §2.8 Stories (redesign-v3).
 * Real testimonials (domain/home-testimonials) render everywhere. Until they exist, the clearly
 * labelled DESIGN SAMPLES render only when SHOW_PLACEHOLDER_TESTIMONIALS is on (dev; false in
 * production builds) — so production omits the section rather than show invented stories.
 */
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { SOCIAL_PROOF_COPY } from "../../domain/home-copy";
import { HOME_SECTION_IDS } from "../../domain/home-routes";
import { MICROCOPY } from "../../domain/home-microcopy";
import {
  SAMPLE_TESTIMONIALS,
  TESTIMONIALS,
  type Testimonial,
} from "../../domain/home-testimonials";

const copy = SOCIAL_PROOF_COPY;
const config = useRuntimeConfig();
const SHOW_PLACEHOLDER_TESTIMONIALS = Boolean(config.public.showPlaceholderTestimonials);

const cards = computed<readonly Testimonial[]>(() =>
  TESTIMONIALS.length ? TESTIMONIALS : SHOW_PLACEHOLDER_TESTIMONIALS ? SAMPLE_TESTIMONIALS : [],
);
const shouldRender = computed(() => cards.value.length > 0);

// ── Arrows ───────────────────────────────────────────────────────────
const track = ref<HTMLElement | null>(null);
const atStart = ref(true);
const atEnd = ref(false);

function updateEnds() {
  const el = track.value;
  if (!el) return;
  atStart.value = el.scrollLeft <= 4;
  atEnd.value = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
}

function step(dir: 1 | -1) {
  const el = track.value;
  const card = el?.firstElementChild as HTMLElement | null;
  if (!el || !card) return;
  const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: reduce ? "auto" : "smooth" });
}

// ── Mouse drag (touch and trackpads scroll natively) ─────────────────
const dragging = ref(false);
let startX = 0;
let startScroll = 0;
let moved = 0;

function onDown(e: PointerEvent) {
  if (e.pointerType !== "mouse" || e.button !== 0 || !track.value) return;
  dragging.value = true;
  moved = 0;
  startX = e.clientX;
  startScroll = track.value.scrollLeft;
  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp, { once: true });
}
function onMove(e: PointerEvent) {
  if (!dragging.value || !track.value) return;
  const dx = e.clientX - startX;
  moved = Math.max(moved, Math.abs(dx));
  track.value.scrollLeft = startScroll - dx;
}
function onUp() {
  window.removeEventListener("pointermove", onMove);
  dragging.value = false;
}
/** A drag must not also count as a click on a link inside a card. */
function onClickCapture(e: MouseEvent) {
  if (moved > 6) {
    e.preventDefault();
    e.stopPropagation();
  }
}

onMounted(() => updateEnds());
onBeforeUnmount(() => window.removeEventListener("pointermove", onMove));
</script>

<style scoped>
/* The row starts on the container's left edge and runs out to the sheet's right edge. */
.mh-track {
  --gutter: clamp(1.25rem, 0.8rem + 1.6vw, 2rem);
  padding-inline: max(var(--gutter), calc((100% - 75rem) / 2));
  scroll-padding-inline: max(var(--gutter), calc((100% - 75rem) / 2));
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  cursor: grab;
}
.mh-track::-webkit-scrollbar {
  display: none;
}
.mh-track.is-dragging {
  cursor: grabbing;
  scroll-snap-type: none;
  user-select: none;
}

.mh-arrow {
  display: inline-flex;
  width: 3rem;
  height: 3rem;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  border: 1px solid var(--hairline);
  background: var(--sheet);
  color: var(--ink);
  transition:
    border-color 200ms var(--ease-out-soft),
    background-color 200ms var(--ease-out-soft),
    color 200ms var(--ease-out-soft);
}
.mh-arrow:hover:not(:disabled) {
  background: var(--forest);
  border-color: var(--forest);
  color: #ffffff;
}
.mh-arrow:disabled {
  opacity: 0.4;
  cursor: default;
}
</style>
