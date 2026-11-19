<template>
  <!-- §2.6 Commission a Programme (redesign-v3): the one dark field — a forest sheet with grain. -->
  <NSheet
    :id="HOME_SECTION_IDS.commission"
    tone="forest"
    tabindex="-1"
    aria-labelledby="commission-heading"
    class="grain mt-3 md:mt-4"
  >
    <div
      class="site-container section-y grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-14"
    >
      <div class="lg:col-span-6">
        <NEyebrow tone="dark">{{ copy.label }}</NEyebrow>
        <h2 id="commission-heading" class="mt-5 text-title text-white">
          {{ copy.headline }}
        </h2>
        <div class="measure mt-6 flex flex-col gap-4 text-copy text-white/80">
          <p v-for="para in copy.body" :key="para">{{ para }}</p>
        </div>

        <!-- 2×2 features: large line icons, hairline rules, no boxes. -->
        <ul
          :aria-label="MICROCOPY.a11y.commissionFeaturesLabel"
          class="mt-8 grid grid-cols-1 gap-x-8 border-t border-white/15 sm:grid-cols-2 lg:mt-10"
        >
          <li
            v-for="feature in copy.features"
            :key="feature.text"
            data-draw-host
            class="flex items-start gap-4 border-b border-white/15 py-6"
          >
            <NIcon :name="feature.icon" :size="40" :stroke="1.25" draw class="shrink-0 text-sage" />
            <span class="pt-1 text-base leading-snug font-medium text-white">
              {{ feature.text }}
            </span>
          </li>
        </ul>

        <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:mt-10">
          <NButton :to="copy.ctaPrimary.to" color="accent" size="lg" class="w-full sm:w-auto">
            {{ copy.ctaPrimary.label }}
            <NIcon name="arrow-right" :size="18" />
          </NButton>
          <NButton
            :to="copy.ctaSecondary.to"
            color="inverse"
            variant="outline"
            size="lg"
            class="w-full sm:w-auto"
          >
            <NIcon name="download" :size="18" />
            {{ copy.ctaSecondary.label }}
          </NButton>
        </div>
      </div>

      <div class="lg:sticky lg:top-24 lg:col-span-6 lg:col-start-7">
        <MhHomeCohortDashboardCard />
      </div>
    </div>
  </NSheet>
</template>

<script setup lang="ts">
/**
 * §2.6 Commission a Programme (redesign-v3). Forest sheet with a subtle grain; eyebrow, white
 * headline, the three paragraphs, the four features as a 2×2 of line icons, orange primary and
 * white-outline secondary. The programme dashboard (white, "Sample data" labels unchanged) sits
 * right and stays in view while the copy scrolls on desktop.
 */
import { COMMISSION_COPY } from "../../domain/home-copy";
import { HOME_SECTION_IDS } from "../../domain/home-routes";
import { MICROCOPY } from "../../domain/home-microcopy";

const copy = COMMISSION_COPY;
</script>
