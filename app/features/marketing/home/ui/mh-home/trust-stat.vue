<template>
  <!-- One figure: small label on top, big number, caption. Hairline dividers between figures. -->
  <li
    :class="
      cn(
        'flex flex-col gap-2 border-hairline py-6 pr-3 even:border-l even:pl-4 max-lg:border-b sm:pr-6 sm:even:pl-6 lg:gap-3 lg:pt-8 lg:pb-2 lg:border-l lg:pl-8 lg:first:border-l-0 lg:first:pl-0',
        props.class,
      )
    "
  >
    <p class="order-1 text-sm font-medium text-ink">{{ props.stat.label }}</p>
    <p
      class="tabular order-2 text-figure font-medium whitespace-nowrap text-forest lg:text-[clamp(2.25rem,0.8rem+2.3vw,3rem)]"
    >
      <span ref="valueEl" aria-hidden="true">{{ display }}</span>
      <span class="sr-only">{{ props.stat.number }}</span>
    </p>
    <p class="order-3 text-sm text-body">{{ props.stat.subLabel }}</p>
  </li>
</template>

<script setup lang="ts">
/** §2.3 figure. 350+ and 45+ count up once on view; the final value is always in the HTML. */
import { computed, ref, type HTMLAttributes } from "vue";
import { cn } from "~/utils/utils";
import type { TrustStat } from "../../domain/home-copy";

const props = defineProps<{ stat: TrustStat; class?: HTMLAttributes["class"] }>();

const valueEl = ref<HTMLElement | null>(null);
const count = props.stat.countTo !== undefined ? useMhCountUp(valueEl, props.stat.countTo) : null;

const display = computed(() =>
  count ? `${props.stat.prefix ?? ""}${count.value}${props.stat.suffix ?? ""}` : props.stat.number,
);
</script>
