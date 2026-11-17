<template>
  <section
    :id="HOME_SECTION_IDS.commission"
    tabindex="-1"
    aria-labelledby="commission-heading"
    class="bg-base-100 py-16 lg:py-24"
  >
    <NContainer>
      <!-- Heading row: eyebrow + H2 left, CTAs right. -->
      <div class="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div class="max-w-[44rem]">
          <MhHomeEyebrow>{{ copy.label }}</MhHomeEyebrow>
          <h2 id="commission-heading" class="mt-4 text-display font-semibold text-green-600">
            {{ copy.headline }}
          </h2>
        </div>
        <div class="flex shrink-0 flex-col gap-3 sm:flex-row sm:flex-wrap">
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
          <NButton
            :to="copy.ctaSecondary.to"
            variant="outline"
            shape="pill"
            size="lg"
            class="w-full border-green-600 bg-base-0 text-green-600 sm:w-auto"
          >
            <NIcon name="download" :size="18" />
            {{ copy.ctaSecondary.label }}
          </NButton>
        </div>
      </div>

      <div class="mt-12 grid grid-cols-1 gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-x-14">
        <div class="lg:col-span-6">
          <div class="flex flex-col gap-4 text-base text-base-600 sm:text-lead">
            <p v-for="para in copy.body" :key="para">{{ para }}</p>
          </div>

          <ul
            :aria-label="MICROCOPY.a11y.commissionFeaturesLabel"
            class="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            <li
              v-for="feature in copy.features"
              :key="feature.text"
              class="flex items-center gap-4 rounded-xl border border-base-150 bg-base-0 p-4"
            >
              <span
                aria-hidden="true"
                class="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-green-600 text-lime-400"
              >
                <NIcon :name="feature.icon" :size="24" />
              </span>
              <span class="font-heading text-base leading-snug font-semibold text-base-900">
                {{ feature.text }}
              </span>
            </li>
          </ul>
        </div>

        <div class="lg:col-span-6">
          <div ref="cardWrap" class="reveal" :data-revealed="cardVisible">
            <MhHomeCohortDashboardCard />
          </div>
        </div>
      </div>
    </NContainer>
  </section>
</template>

<script setup lang="ts">
/**
 * 05 Commission a Programme — light grey band. Heading row with CTAs; body + four features
 * (lime-on-green icon discs) left, the programme dashboard component right.
 */
import { ref } from "vue";
import { COMMISSION_COPY } from "../../domain/home-copy";
import { HOME_SECTION_IDS } from "../../domain/home-routes";
import { MICROCOPY } from "../../domain/home-microcopy";

const copy = COMMISSION_COPY;
const cardWrap = ref<HTMLElement | null>(null);
const cardVisible = useInViewOnce(cardWrap, { threshold: 0.2 });
</script>
