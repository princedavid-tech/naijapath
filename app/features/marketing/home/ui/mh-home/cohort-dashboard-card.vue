<template>
  <NCard as="figure" :class="cn('gap-0 p-0 text-base-600 shadow-card-hover', props.class)">
    <figcaption class="sr-only">{{ MICROCOPY.a11y.sampleCardNote }}</figcaption>
    <NCardHeader class="border-b border-base-150 px-5 py-4 sm:px-6">
      <p class="text-xs font-medium tracking-[0.05em] text-base-500 uppercase">{{ d.eyebrow }}</p>
      <NCardTitle as="p">{{ d.title }}</NCardTitle>
      <NCardAction>
        <NPill tone="muted" size="sm">{{ d.sampleBadge }}</NPill>
      </NCardAction>
    </NCardHeader>

    <dl class="grid grid-cols-1 divide-y divide-base-150 xs:grid-cols-3 xs:divide-x xs:divide-y-0">
      <div v-for="m in d.metrics" :key="m.label" class="flex flex-col gap-0.5 px-5 py-4 sm:px-6">
        <dt class="order-2 text-sm leading-snug text-base-600">{{ m.label }}</dt>
        <dd
          class="order-1 tabular font-heading text-[1.75rem] leading-none font-bold text-green-600"
        >
          {{ m.value }}
          <span class="text-sm font-medium text-base-500">{{ m.of }}</span>
        </dd>
        <dd class="order-3 text-xs text-base-500">{{ d.sampleBadge }}</dd>
      </div>
    </dl>

    <div class="border-t border-base-150 px-5 pt-4 pb-5 sm:px-6">
      <p id="cohort-chart-title" class="text-sm font-medium text-base-600">{{ d.chartTitle }}</p>
      <!-- Single series → one hue, no legend (the title names it). Bars: 4px rounded data-end,
           anchored to the baseline, 2px gaps. Hover a bar for its value. -->
      <svg
        :viewBox="`0 0 ${CW} ${CH}`"
        class="mt-3 h-auto w-full"
        role="img"
        aria-labelledby="cohort-chart-title cohort-chart-desc"
      >
        <desc id="cohort-chart-desc">{{ d.chartSummary }}</desc>
        <line :x1="0" :x2="CW" :y1="CH - 0.5" :y2="CH - 0.5" stroke="#E5E7EB" stroke-width="1" />
        <!-- Latest week at full strength; earlier weeks at 78% (still ≥ 3:1 on white). -->
        <path
          v-for="(v, i) in d.chartValues"
          :key="i"
          :d="barPath(i, v)"
          fill="#1B6B3A"
          :opacity="i === d.chartValues.length - 1 ? 1 : 0.78"
        >
          <title>{{ d.chartWeeks[i] }}: {{ v }}</title>
        </path>
      </svg>
      <!-- Axis labels as real HTML text so they never scale below 12px on small screens. -->
      <div
        aria-hidden="true"
        class="mt-1.5 grid grid-cols-8 gap-1.5 text-center text-xs text-base-500"
      >
        <span v-for="w in d.chartWeeks" :key="w">{{ w }}</span>
      </div>

      <!-- Table view of the same figures for assistive tech. (sr-only on a wrapper: tables
           ignore width/overflow, so `sr-only` directly on <table> leaks horizontal scroll.) -->
      <div class="sr-only">
        <table>
          <caption>
            {{ d.chartTitle }}
            ({{ d.sampleBadge
            }})
          </caption>
          <thead>
            <tr>
              <th scope="col">Week</th>
              <th scope="col">Sessions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(v, i) in d.chartValues" :key="i">
              <th scope="row">{{ d.chartWeeks[i] }}</th>
              <td>{{ v }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </NCard>
</template>

<script setup lang="ts">
/**
 * Cohort dashboard (brief §05) — sessions completed, beneficiary count, interview conversion
 * rate, plus an inline SVG bar chart. EVERY figure is labelled "Sample data".
 */
import type { HTMLAttributes } from "vue";
import { cn } from "~/utils/utils";
import { MICROCOPY } from "../../domain/home-microcopy";

const props = defineProps<{ class?: HTMLAttributes["class"] }>();
const d = MICROCOPY.cohortDashboard;

const CW = 320;
const CH = 72;
const GAP = 6;
const n = d.chartValues.length;
const barW = (CW - GAP * (n - 1)) / n;
const max = Math.max(...d.chartValues);
const barX = (i: number) => i * (barW + GAP);
const barH = (v: number) => Math.max(4, (v / max) * (CH - 4));

/** Bar with a 4px rounded top (data end) and a square base on the baseline. */
function barPath(i: number, v: number): string {
  const x = barX(i);
  const h = barH(v);
  const y = CH - h;
  const r = Math.min(4, barW / 2, h);
  return `M${x} ${CH}V${y + r}Q${x} ${y} ${x + r} ${y}H${x + barW - r}Q${x + barW} ${y} ${x + barW} ${y + r}V${CH}Z`;
}
</script>
