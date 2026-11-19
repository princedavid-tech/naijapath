<template>
  <section
    :id="HOME_SECTION_IDS.join"
    tabindex="-1"
    aria-labelledby="join-heading"
    class="sheet relative mt-3 bg-sage defer-render md:mt-4"
  >
    <NContainer class="py-12 lg:py-20">
      <header class="max-w-[40rem]">
        <MhHomeEyebrow>{{ copy.label }}</MhHomeEyebrow>
        <h2 id="join-heading" class="mt-4 text-display font-semibold text-base-900">
          {{ copy.headline }}
        </h2>
      </header>

      <!-- Three front doors; the middle one is highlighted (Light Green Tint). -->
      <ul class="mt-8 grid grid-cols-1 gap-4 lg:mt-14 lg:grid-cols-3 lg:gap-6">
        <li v-for="(card, i) in copy.cards" :key="card.audience">
          <MhHomeAudienceCard :card="card" :photo="PHOTOS[i]!" :lit="i === 1" class="h-full" />
        </li>
      </ul>
    </NContainer>
  </section>
</template>

<script setup lang="ts">
/** 08 Join the Platform — white band with green-hatched edges (section dividers); three photo
 * cards, the middle one highlighted in Light Green Tint. */
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
