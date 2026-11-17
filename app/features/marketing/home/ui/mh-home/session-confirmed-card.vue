<template>
  <NCard
    as="figure"
    :class="
      cn('w-[min(19rem,calc(100vw-3rem))] gap-0 rounded-lg p-4 shadow-card-hover', props.class)
    "
  >
    <figcaption class="sr-only">{{ MICROCOPY.a11y.sampleCardNote }}</figcaption>
    <div class="flex items-start gap-3">
      <NAvatar :initials="card.initials" />
      <div class="min-w-0 flex-1">
        <p class="font-heading text-[0.9375rem] leading-snug font-semibold text-base-900">
          {{ card.title }}
        </p>
        <p class="mt-0.5 text-sm text-base-600">
          {{ card.name }}
          <span aria-hidden="true" class="mx-1 text-base-500">•</span>
          <time :datetime="toIsoInZone(card.startsAt)"
            >{{ card.dayLabel }}, {{ formatTime(card.startsAt) }}</time
          >
        </p>
      </div>
    </div>
    <div class="mt-3 flex items-center justify-between border-t border-base-150 pt-3">
      <span class="inline-flex items-center gap-1.5 text-xs font-medium text-base-500">
        <NIcon name="calendar-check" :size="16" class="text-green-500" />
        NaijaPath
      </span>
      <NStatus :status="card.status" size="sm" />
    </div>
  </NCard>
</template>

<script setup lang="ts">
/**
 * Hero floating card — a real HTML component, not a screenshot. Copy from the brief:
 * "Session Confirmed • Damilola A. • Today, 4:00 PM". Time comes from the formatter in
 * Africa/Lagos; status renders through <NStatus> (dot AND text).
 */
import type { HTMLAttributes } from "vue";
import { formatTime, toIsoInZone } from "~/utils/date-formatters";
import { cn } from "~/utils/utils";
import { HERO_COPY } from "../../domain/home-copy";
import { MICROCOPY } from "../../domain/home-microcopy";

const props = defineProps<{ class?: HTMLAttributes["class"] }>();
const card = HERO_COPY.floatingCard;
</script>
