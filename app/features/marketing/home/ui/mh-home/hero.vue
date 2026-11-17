<template>
  <section
    :id="HOME_SECTION_IDS.hero"
    aria-labelledby="hero-heading"
    class="relative isolate overflow-hidden bg-base-100"
  >
    <!-- Dot clusters (decorative). -->
    <svg
      aria-hidden="true"
      viewBox="0 0 120 40"
      class="pointer-events-none absolute top-0 left-1/2 -z-10 hidden w-32 lg:block"
    >
      <circle
        v-for="(d, i) in DOTS"
        :key="i"
        :cx="d[0]"
        :cy="d[1]"
        r="2.6"
        fill="var(--base-150)"
      />
    </svg>
    <svg
      aria-hidden="true"
      viewBox="0 0 120 40"
      class="pointer-events-none absolute bottom-3 left-[22%] -z-10 hidden w-32 lg:block"
    >
      <circle
        v-for="(d, i) in DOTS"
        :key="i"
        :cx="d[0]"
        :cy="d[1]"
        r="2.6"
        fill="var(--base-150)"
      />
    </svg>

    <NContainer
      class="grid grid-cols-1 items-center gap-y-14 pt-12 pb-16 sm:pt-16 lg:grid-cols-2 lg:gap-x-12 lg:pt-20 lg:pb-24"
    >
      <!-- Copy -->
      <div class="max-w-[36rem]">
        <MhHomeEyebrow class="mh-hero-in [--d:0ms]">{{ copy.tag }}</MhHomeEyebrow>

        <h1
          id="hero-heading"
          class="mh-hero-in mt-5 font-heading text-hero font-semibold text-green-600 [--d:80ms]"
        >
          {{ copy.headline }}
        </h1>

        <p class="mh-hero-in mt-6 text-base text-base-600 sm:text-lead [--d:160ms]">
          {{ copy.subheadline }}
        </p>

        <div
          class="mh-hero-in mt-9 flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-8 [--d:240ms]"
        >
          <NButton
            :to="copy.ctaPrimary.to"
            color="brand"
            shape="pill"
            size="lg"
            class="w-full sm:w-auto"
          >
            {{ copy.ctaPrimary.label }}
            <NIcon name="arrow-right" :size="18" weight="bold" />
          </NButton>
          <NLink
            :to="copy.ctaSecondary.to"
            class="inline-flex min-h-11 items-center justify-center font-heading font-semibold text-green-600 underline decoration-[1.5px] underline-offset-4 hover:text-green-500"
          >
            {{ copy.ctaSecondary.label }}
          </NLink>
        </div>

        <ul
          :aria-label="MICROCOPY.a11y.heroBadgesLabel"
          class="mh-hero-in mt-9 flex flex-wrap items-center gap-2 [--d:320ms]"
        >
          <li>
            <NPill tone="white" size="sm">
              <NIcon name="check-circle" :size="16" weight="fill" class="text-green-500" />
              {{ copy.badge1 }}
            </NPill>
          </li>
          <li>
            <NPill tone="white" size="sm" class="flex-wrap">
              <span class="tabular font-bold">{{ copy.badge2.score }}</span>
              <span aria-hidden="true"><NRating :value="copy.badge2.rating" :size="13" /></span>
              <span class="font-medium text-base-600">{{ copy.badge2.text }}</span>
            </NPill>
          </li>
        </ul>
      </div>

      <!-- Collage: one tall tile left, three stacked right; slanted, black-and-white. -->
      <div class="mx-auto w-full max-w-[32rem] lg:mr-0">
        <div class="relative aspect-[1/1]">
          <figure class="mh-tile mh-card-in top-[20%] left-[4%] h-[58%] w-[40%] [--d:200ms]">
            <NuxtPicture
              :src="HERO_IMAGE"
              :alt="MICROCOPY.images.hero"
              v-bind="HERO_PICTURE"
              :preload="{ fetchPriority: 'high' }"
              loading="eager"
              :img-attrs="{ class: `${IMG} object-[38%_35%]`, fetchpriority: 'high' }"
            />
          </figure>
          <div
            aria-hidden="true"
            class="mh-tile mh-card-in top-0 left-[48%] h-[31%] w-[48%] [--d:280ms]"
          >
            <NuxtPicture
              :src="HERO_IMAGE"
              alt=""
              v-bind="HERO_PICTURE"
              loading="eager"
              :img-attrs="{ class: `${IMG} origin-[64%_22%] scale-[2.1]` }"
            />
          </div>
          <div
            aria-hidden="true"
            class="mh-tile mh-card-in top-[34.5%] left-[48%] h-[31%] w-[48%] [--d:360ms]"
          >
            <NuxtPicture
              :src="BENEFICIARY_IMAGE"
              alt=""
              width="560"
              height="374"
              fit="cover"
              sizes="xs:60vw lg:300px"
              format="avif,webp"
              legacy-format="jpeg"
              loading="eager"
              :img-attrs="{ class: `${IMG} object-[30%_45%]` }"
            />
          </div>
          <div
            aria-hidden="true"
            class="mh-tile mh-card-in top-[69%] left-[48%] h-[31%] w-[48%] [--d:440ms]"
          >
            <NuxtPicture
              :src="HERO_IMAGE"
              alt=""
              v-bind="HERO_PICTURE"
              loading="eager"
              :img-attrs="{ class: `${IMG} origin-[50%_72%] scale-[1.9]` }"
            />
          </div>

          <!-- Rotating "Book a Session" seal (turns on hover only — no unprompted motion). -->
          <MhHomeSeal class="absolute top-[62%] left-0 z-10 size-[6.5rem] sm:size-28" />

          <!-- Sparkles (decorative). -->
          <svg
            aria-hidden="true"
            viewBox="0 0 80 80"
            class="pointer-events-none absolute right-[-4%] bottom-[2%] z-10 w-[18%]"
          >
            <path :d="star(52, 44, 26)" fill="var(--lime-400)" />
            <path :d="star(22, 30, 12)" fill="var(--lime-400)" />
            <path :d="star(30, 64, 6)" fill="var(--lime-400)" />
          </svg>
        </div>

        <!-- "Session Confirmed": below the collage on small screens, overlapping it on desktop. -->
        <MhHomeSessionConfirmedCard
          class="mh-card-in relative z-10 mx-auto mt-6 [--d:560ms] lg:-mt-14 lg:mr-auto lg:ml-[-2rem]"
        />
      </div>
    </NContainer>
  </section>
</template>

<script setup lang="ts">
/**
 * 02 Hero. Light grey band: copy left; right, a slanted four-tile photo collage with a
 * "Book a Session" seal and lime sparkles. The first tile is the LCP element (preloaded,
 * eager, fetchpriority="high"); the other hero-session tiles reuse the same URL (one fetch).
 * Load sequence is pure CSS (off under reduced motion).
 */
import { HERO_COPY } from "../../domain/home-copy";
import { HOME_SECTION_IDS } from "../../domain/home-routes";
import { MICROCOPY } from "../../domain/home-microcopy";

const copy = HERO_COPY;
// CLIENT PHOTO SLOTS — the layout wants four photos; until the client's shoot arrives, three
// tiles crop the hero photo differently and one uses the beneficiary photo.
const HERO_IMAGE = "/images/hero-session.jpg";
const BENEFICIARY_IMAGE = "/images/beneficiary-session.jpg";

// Identical props → identical srcset → the browser downloads the hero photo once.
const HERO_PICTURE = {
  width: "640",
  height: "427",
  fit: "cover",
  // Generous: two tiles zoom ~2× into the photo.
  sizes: "xs:100vw lg:560px",
  format: "avif,webp",
  legacyFormat: "jpeg",
} as const;
const IMG = "size-full object-cover grayscale";

// Two loose arcs of dots.
const DOTS: Array<[number, number]> = [];
for (let row = 0; row < 3; row++) {
  for (let i = 0; i < 7 - row; i++) {
    const t = (i + 0.5 + row * 0.5) / 7;
    DOTS.push([8 + t * 104, 6 + row * 11 + Math.sin(t * Math.PI) * 9]);
  }
}

/** Four-point sparkle centred on (cx, cy). */
function star(cx: number, cy: number, r: number): string {
  const k = r * 0.22;
  return `M${cx} ${cy - r}Q${cx + k} ${cy - k} ${cx + r} ${cy}Q${cx + k} ${cy + k} ${cx} ${cy + r}Q${cx - k} ${cy + k} ${cx - r} ${cy}Q${cx - k} ${cy - k} ${cx} ${cy - r}Z`;
}
</script>

<style scoped>
/* Slanted, rounded photo tiles: skew the frame, counter-skew the photo. */
.mh-tile {
  position: absolute;
  overflow: hidden;
  border-radius: 1.25rem;
  transform: skewX(-8deg);
  background: var(--base-150);
}
.mh-tile :deep(picture) {
  display: block;
  height: 100%;
  transform: skewX(8deg) scale(1.18);
}

@media (prefers-reduced-motion: no-preference) {
  .mh-hero-in,
  .mh-card-in {
    animation: mh-rise 400ms var(--ease-brand) both;
    animation-delay: var(--d, 0ms);
  }
  .mh-tile.mh-card-in {
    animation-name: mh-rise-skew;
  }
}
@keyframes mh-rise {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
}
@keyframes mh-rise-skew {
  from {
    opacity: 0;
    transform: translateY(8px) skewX(-8deg);
  }
}
</style>
