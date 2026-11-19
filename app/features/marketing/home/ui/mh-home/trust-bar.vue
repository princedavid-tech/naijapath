<template>
  <!-- §2.3 Intro + numbers (redesign-v3): a white sheet. The hero's subheadline is the title:
       its first sentence set large on the left, its second as the supporting paragraph on the
       right — one <h2>, so the locked sentence stays whole for every reader. -->
  <NSheet
    :id="HOME_SECTION_IDS.trust"
    tone="sage"
    aria-labelledby="intro-heading"
    class="mt-3 md:mt-4"
  >
    <div class="site-container section-y">
      <h2
        id="intro-heading"
        class="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-x-10"
      >
        <span class="block text-title text-ink lg:col-span-7">{{ TITLE }}</span>
        <span
          class="measure block text-copy font-normal text-body lg:col-span-4 lg:col-start-9 lg:pb-1"
          >{{ SUPPORT }}</span
        >
      </h2>

      <h3 class="sr-only">{{ MICROCOPY.a11y.trustBarHeading }}</h3>
      <ul class="mt-10 grid grid-cols-2 border-t border-hairline lg:mt-20 lg:grid-cols-5">
        <MhHomeTrustStat v-for="stat in TRUST_STATS" :key="stat.label" :stat="stat" />

        <!-- The platform rating (locked badge copy), set as the fifth figure. -->
        <li
          class="col-span-2 flex flex-col gap-2 border-hairline pt-6 lg:col-span-1 lg:gap-3 lg:border-l lg:pt-8 lg:pb-2 lg:pl-8"
        >
          <span class="block text-sm font-medium text-ink">
            <NRating :value="HERO_COPY.badge2.rating" :size="16" />
          </span>
          <span
            class="tabular block text-figure font-medium whitespace-nowrap text-forest lg:text-[clamp(2.25rem,0.8rem+2.3vw,3rem)]"
            >{{ HERO_COPY.badge2.score }}</span
          >
          <span class="block text-sm text-body">{{ HERO_COPY.badge2.text }}</span>
        </li>
      </ul>
    </div>
  </NSheet>
</template>

<script setup lang="ts">
/**
 * §2.3 Intro + numbers. Only figures that already exist on the site: the four trust figures
 * and the platform rating. 350+ and 45+ count up once when they scroll into view.
 */
import { HERO_COPY, TRUST_STATS } from "../../domain/home-copy";
import { HOME_SECTION_IDS } from "../../domain/home-routes";
import { MICROCOPY } from "../../domain/home-microcopy";

// Split the locked subheadline at its sentence boundary (text unchanged).
const cut = HERO_COPY.subheadline.indexOf(". ") + 1;
const TITLE = HERO_COPY.subheadline.slice(0, cut);
const SUPPORT = HERO_COPY.subheadline.slice(cut + 1);
</script>
