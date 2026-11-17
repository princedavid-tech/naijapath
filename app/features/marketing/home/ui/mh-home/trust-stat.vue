<template>
  <li :class="cn('relative lg:px-10 lg:first:pl-0', props.class)">
    <!-- Divider: hairline with the dot mark across it (desktop). -->
    <span
      v-if="props.divider"
      aria-hidden="true"
      class="absolute inset-y-0 left-0 hidden w-px bg-base-150 lg:block"
    >
      <MhHomeDots class="absolute top-1/2 left-1/2 max-w-none -translate-1/2 bg-base-0 py-0.5" />
    </span>
    <p class="tabular font-heading text-[2.5rem] leading-none font-semibold text-green-600">
      <span ref="valueEl" aria-hidden="true">{{ display }}</span>
      <span class="sr-only">{{ props.stat.number }}</span>
    </p>
    <p class="mt-3 font-heading text-base font-medium text-base-900">{{ props.stat.label }}</p>
    <p class="mt-1 text-sm text-base-600">{{ props.stat.subLabel }}</p>
  </li>
</template>

<script setup lang="ts">
/** One figure: large number, label, caption. */
import { computed, ref, type HTMLAttributes } from "vue";
import { cn } from "~/utils/utils";
import type { TrustStat } from "../../domain/home-copy";

const props = defineProps<{
  stat: TrustStat;
  divider?: boolean;
  class?: HTMLAttributes["class"];
}>();

const valueEl = ref<HTMLElement | null>(null);
const count = props.stat.countTo !== undefined ? useMhCountUp(valueEl, props.stat.countTo) : null;

const display = computed(() =>
  count ? `${props.stat.prefix ?? ""}${count.value}${props.stat.suffix ?? ""}` : props.stat.number,
);
</script>
