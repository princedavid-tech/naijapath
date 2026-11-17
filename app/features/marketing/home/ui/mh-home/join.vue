<template>
  <section
    :id="HOME_SECTION_IDS.join"
    tabindex="-1"
    data-surface="dark"
    aria-labelledby="join-heading"
    class="relative bg-green-600 text-base-0 defer-render"
  >
    <div aria-hidden="true" class="mh-hatch h-7 lg:h-8" />

    <NContainer class="py-14 lg:py-20">
      <header class="max-w-[40rem]">
        <MhHomeEyebrow tone="dark">{{ copy.label }}</MhHomeEyebrow>
        <h2 id="join-heading" class="mt-4 text-display font-semibold text-base-0">
          {{ copy.headline }}
        </h2>
      </header>

      <!-- Three front doors; the middle one is lit (lime). -->
      <ul class="mt-12 grid grid-cols-1 gap-6 lg:mt-14 lg:grid-cols-3">
        <li v-for="(card, i) in copy.cards" :key="card.audience">
          <MhHomeAudienceCard :card="card" :photo="PHOTOS[i]!" :lit="i === 1" class="h-full" />
        </li>
      </ul>
    </NContainer>

    <div aria-hidden="true" class="mh-hatch h-7 lg:h-8" />
  </section>
</template>

<script setup lang="ts">
/** 08 Join the Platform — dark band with hatched edges; three photo cards, the middle lit. */
import { JOIN_COPY } from "../../domain/home-copy";
import { HOME_SECTION_IDS } from "../../domain/home-routes";

const copy = JOIN_COPY;

// CLIENT PHOTO SLOTS — one photo per audience; interim crops of the two existing shoots.
const PHOTOS = [
  { src: "/images/beneficiary-session.jpg", position: "object-[30%_45%]" },
  { src: "/images/hero-session.jpg", position: "object-[50%_30%]" },
  { src: "/images/hero-session.jpg", position: "object-[55%_75%]" },
] as const;
</script>

<style scoped>
.mh-hatch {
  background-image: repeating-linear-gradient(
    -45deg,
    rgb(255 255 255 / 0.1) 0 1.5px,
    transparent 1.5px 10px
  );
}
</style>
