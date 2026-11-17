<template>
  <NCard
    as="figure"
    :class="cn('w-[min(21rem,calc(100vw-3rem))] gap-0 p-5 shadow-card-hover', props.class)"
  >
    <figcaption class="sr-only">{{ MICROCOPY.a11y.sampleCardNote }}</figcaption>
    <NCardHeader>
      <p class="text-xs font-medium tracking-[0.05em] text-base-500 uppercase">
        {{ record.eyebrow }}
      </p>
      <NCardTitle as="p" class="text-base">{{ record.title }}</NCardTitle>
      <NCardAction><NStatus :status="record.status" size="sm" /></NCardAction>
    </NCardHeader>

    <ul class="mt-4 flex flex-col gap-2.5">
      <li
        v-for="action in record.actions"
        :key="action"
        class="flex items-start gap-2.5 text-sm text-base-600"
      >
        <span
          class="mt-px inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-green-500 text-base-0"
        >
          <NIcon name="check" :size="12" weight="bold" />
        </span>
        <span>{{ action }}</span>
      </li>
    </ul>

    <dl
      class="mt-4 flex flex-wrap items-center gap-x-1.5 border-t border-base-150 pt-3 text-xs text-base-500"
    >
      <dt>{{ record.practitionerLabel }}:</dt>
      <dd class="font-medium text-base-600">{{ record.practitionerName }}</dd>
      <dd aria-hidden="true">·</dd>
      <dd>
        <time :datetime="toIsoInZone(record.recordedAt)">{{ formatDate(record.recordedAt) }}</time>
      </dd>
    </dl>

    <NCardFooter class="mt-3 rounded-sm bg-green-50 px-3 py-2 text-sm font-medium text-green-500">
      <NIcon name="check-circle" :size="18" weight="fill" />
      {{ record.footer }}
    </NCardFooter>
  </NCard>
</template>

<script setup lang="ts">
/** Sample session record — reinforces "documented" (brief §04). Real component, real tokens. */
import type { HTMLAttributes } from "vue";
import { formatDate, toIsoInZone } from "~/utils/date-formatters";
import { cn } from "~/utils/utils";
import { MICROCOPY } from "../../domain/home-microcopy";

const props = defineProps<{ class?: HTMLAttributes["class"] }>();
const record = MICROCOPY.sessionRecord;
</script>
