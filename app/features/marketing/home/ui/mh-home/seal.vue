<template>
  <NLink :to="NAV_COPY.ctaFilled.to" :class="cn('group/seal block rounded-full', props.class)">
    <span class="sr-only">{{ NAV_COPY.ctaFilled.label }}</span>
    <svg aria-hidden="true" viewBox="0 0 120 120" class="size-full">
      <path :d="SCALLOP" fill="var(--terracotta-500)" />
      <g class="mh-seal-text">
        <defs>
          <path :id="ringId" d="M60 60m-38 0a38 38 0 1 1 76 0a38 38 0 1 1 -76 0" />
        </defs>
        <text
          fill="var(--base-0)"
          font-size="10.5"
          font-weight="700"
          class="font-heading uppercase"
        >
          <!-- Fit the two repeats exactly once round the ring (2π × 38 ≈ 238). -->
          <textPath :href="`#${ringId}`" textLength="236" lengthAdjust="spacing">
            {{ NAV_COPY.ctaFilled.label }} • {{ NAV_COPY.ctaFilled.label }} •
          </textPath>
        </text>
      </g>
      <circle cx="60" cy="60" r="17" fill="var(--base-0)" />
      <path
        d="M52 60h16m-6-6 6 6-6 6"
        fill="none"
        stroke="var(--green-500)"
        stroke-width="2.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </NLink>
</template>

<script setup lang="ts">
/**
 * Round "Book a Session" seal (a CTA, so brand orange): scalloped disc, the label set around the
 * ring in white, white centre with a green arrow. A real link (its name is the visible CTA label).
 * The ring turns on hover/focus only — no unprompted motion.
 */
import { useId, type HTMLAttributes } from "vue";
import { cn } from "~/utils/utils";
import { NAV_COPY } from "../../domain/home-copy";

const props = defineProps<{ class?: HTMLAttributes["class"] }>();
const ringId = `mh-seal-${useId()}`;

const SCALLOP = (() => {
  const n = 48;
  let d = "";
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * Math.PI * 2;
    const r = i % 2 === 0 ? 58 : 54;
    d += `${i === 0 ? "M" : "L"}${(60 + r * Math.cos(a)).toFixed(2)} ${(60 + r * Math.sin(a)).toFixed(2)}`;
  }
  return `${d}Z`;
})();
</script>

<style scoped>
.mh-seal-text {
  transform-origin: 60px 60px;
  transition: transform 1.2s var(--ease-brand);
}
.group\/seal:hover .mh-seal-text,
.group\/seal:focus-visible .mh-seal-text {
  transform: rotate(120deg);
}
</style>
