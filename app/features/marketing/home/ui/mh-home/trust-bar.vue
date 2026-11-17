<template>
  <section
    :id="HOME_SECTION_IDS.trust"
    aria-labelledby="trust-heading"
    class="bg-base-0 pb-16 lg:pb-24"
  >
    <h2 id="trust-heading" class="sr-only">{{ MICROCOPY.a11y.trustBarHeading }}</h2>
    <NContainer>
      <!-- Four figures; on desktop a hairline + the dot mark separate them. -->
      <ul class="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        <MhHomeTrustStat
          v-for="(stat, i) in TRUST_STATS"
          :key="stat.label"
          :stat="stat"
          :divider="i > 0"
        />
      </ul>
    </NContainer>
  </section>
</template>

<script setup lang="ts">
/** 03 Trust figures — the counter row (count-up once on view, tabular figures). */
import { TRUST_STATS } from "../../domain/home-copy";
import { HOME_SECTION_IDS } from "../../domain/home-routes";
import { MICROCOPY } from "../../domain/home-microcopy";
</script>
