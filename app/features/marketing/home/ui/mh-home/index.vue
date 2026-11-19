<template>
  <div class="flex min-h-svh flex-col">
    <NSkipLink :target="HOME_SECTION_IDS.main">{{ MICROCOPY.a11y.skipLink }}</NSkipLink>
    <!-- Every section is fully server-rendered. Hydration is deferred so the browser paints the
         page (and the LCP photo) BEFORE any component JS runs:
         - header + hero: hydrate when the main thread is idle (menu, scroll shadow);
         - everything else: ~400px before it scrolls into view.
         Links work natively before hydration. -->
    <LazyMhHomeSiteHeader hydrate-on-idle />
    <main :id="HOME_SECTION_IDS.main" tabindex="-1" class="flex-1">
      <LazyMhHomeHero hydrate-on-idle />
      <LazyMhHomeTicker hydrate-on-idle />
      <!-- §2.3 Intro + numbers, then §2.4 For You. -->
      <LazyMhHomeTrustBar :hydrate-on-visible="EARLY" />
      <LazyMhHomeBeneficiaries :hydrate-on-visible="EARLY" />
      <LazyMhHomeCommission :hydrate-on-visible="EARLY" />
      <LazyMhHomeHowItWorks :hydrate-on-visible="EARLY" />
      <LazyMhHomeSocialProof :hydrate-on-visible="EARLY" />
      <LazyMhHomeJoin :hydrate-on-visible="EARLY" />
    </main>
    <LazyMhHomeSiteFooter :hydrate-on-visible="EARLY" />
  </div>
</template>

<script setup lang="ts">
/**
 * Homepage root — the brief's sections (01–09) in the final layout's order: hero, stage
 * ticker, For You + trust figures, Commission, How it works, Stories, Join, footer.
 */
import { HOME_SECTION_IDS } from "../../domain/home-routes";
import { MICROCOPY } from "../../domain/home-microcopy";

// Hydrate ~400px before a section enters the viewport, so any state change (e.g. the stage
// track resetting before it fills) happens off-screen.
const EARLY = { rootMargin: "400px 0px" };
</script>
