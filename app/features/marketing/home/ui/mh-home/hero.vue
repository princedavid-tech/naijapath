<template>
  <!-- §2.2 Hero (redesign-v3): an inset photo sheet. The header (site-header.vue) floats inside
       its top edge; the copy stack sits bottom-centre over a forest gradient. -->
  <section
    :id="HOME_SECTION_IDS.hero"
    aria-labelledby="hero-heading"
    data-surface="dark"
    class="sheet relative isolate mt-[var(--sheet-inset)] flex h-[92svh] min-h-[40rem] max-h-[68rem] flex-col justify-end bg-forest-deep text-white"
  >
    <!-- Photo + gradient (faces sit in the upper half; text only ever over the dark gradient). -->
    <div class="absolute inset-0 -z-10 overflow-hidden">
      <NuxtPicture
        :src="HERO_IMAGE"
        :alt="MICROCOPY.images.hero"
        width="1600"
        height="1067"
        sizes="xs:100vw xl:1440px"
        format="avif,webp"
        legacy-format="jpeg"
        :preload="{ fetchPriority: 'high' }"
        loading="eager"
        class="mh-hero-photo block size-full"
        :img-attrs="{
          class: 'photo-grade size-full object-cover object-[50%_30%]',
          fetchpriority: 'high',
        }"
      />
      <div class="mh-hero-scrim absolute inset-0" />
    </div>

    <!-- Bottom-centre stack, in the reference's order. -->
    <div class="relative flex flex-col items-center px-5 pb-6 text-center sm:px-8 sm:pb-8 lg:pb-16">
      <NButton :to="copy.ctaPrimary.to" color="accent" size="lg" class="mh-hero-late [--d:900ms]">
        {{ copy.ctaPrimary.label }}
        <NIcon name="arrow-right" :size="18" />
      </NButton>

      <p class="mh-hero-late mt-7 text-sm font-medium tracking-[0.01em] text-white/85 [--d:780ms]">
        {{ copy.tag }}
      </p>

      <h1
        id="hero-heading"
        class="mt-3 max-w-[20ch] text-hero-v font-medium text-white sm:max-w-[22ch] lg:max-w-none"
      >
        <!-- Phones: one flowing sentence. From 1024px: the two approved lines, each rising
             from its own mask. -->
        <template v-for="(line, i) in HEADLINE_LINES" :key="i"
          ><span class="mh-hero-mask lg:block"
            ><span class="mh-hero-line lg:inline-block" :style="{ '--d': `${300 + i * 120}ms` }">{{
              line
            }}</span></span
          >{{ i < HEADLINE_LINES.length - 1 ? " " : "" }}</template
        >
      </h1>

      <NLink
        :to="copy.ctaSecondary.to"
        class="mh-hero-late link-underline mt-6 inline-flex min-h-11 items-center text-base font-medium text-white [--d:1000ms]"
      >
        {{ copy.ctaSecondary.label }}
      </NLink>
    </div>

    <!-- Corner chips (frosted glass): bottom-left and bottom-right on desktop; below the stack
         on smaller screens, so nothing ever covers a face. -->
    <ul
      :aria-label="MICROCOPY.a11y.heroBadgesLabel"
      class="mh-hero-late relative flex flex-wrap justify-center gap-2 px-5 pb-6 [--d:1100ms] sm:pb-8 lg:pointer-events-none lg:absolute lg:inset-x-0 lg:bottom-8 lg:justify-between lg:px-8 lg:pb-0"
    >
      <li class="pointer-events-auto">
        <span class="mh-chip">
          <NIcon name="check-circle" :size="16" class="text-sage" />
          {{ copy.badge1 }}
        </span>
      </li>
      <li class="pointer-events-auto">
        <span class="mh-chip">
          <NIcon name="map-pin" :size="16" class="text-sage" />
          {{ MICROCOPY.footer.locationPill }}
        </span>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
/**
 * §2.2 Hero (redesign-v3). Inset sheet ~92vh; full-bleed session photo in the site's one photo
 * grade; transparent → forest-deep gradient; bottom-centre stack (CTA, kicker, two-line headline,
 * secondary link); frosted chips. The photo is the LCP element (preloaded, eager, high priority).
 * Load motion is pure CSS so it runs at first paint: photo settles 1.08 → 1 over 1.6s, headline
 * lines rise from a mask 120ms apart, CTA / kicker / link / chips fade in last. Reduced motion:
 * the global rule collapses every animation to its final frame.
 *
 * Moved out of the hero by the redesign (still locked content, re-homed in later sections):
 * the subheadline (→ §2.3 intro title), the rating badge and the Session Confirmed card.
 */
import { HERO_COPY } from "../../domain/home-copy";
import { HOME_SECTION_IDS } from "../../domain/home-routes";
import { MICROCOPY } from "../../domain/home-microcopy";

const copy = HERO_COPY;
// CLIENT PHOTO SLOT — replace with the client's own shoot at the same path.
const HERO_IMAGE = "/images/hero-session.jpg";

// The approved headline set as its two desktop lines (text unchanged; split only for the mask).
const HEADLINE_LINES = ["Navigate your career with", "structured, verified guidance."];
if (HEADLINE_LINES.join(" ") !== copy.headline) {
  throw new Error("Hero headline lines no longer match the locked copy");
}
</script>

<style scoped>
/* Transparent at the top (a light veil keeps the white header legible) → forest-deep 85%+
   behind the copy stack. */
.mh-hero-scrim {
  background: linear-gradient(
    to bottom,
    rgb(15 42 23 / 0.84) 0%,
    rgb(15 42 23 / 0.58) 12%,
    rgb(15 42 23 / 0.22) 25%,
    rgb(15 42 23 / 0.2) 35%,
    rgb(15 42 23 / 0.48) 45%,
    rgb(15 42 23 / 0.8) 55%,
    rgb(15 42 23 / 0.9) 66%,
    rgb(15 42 23 / 0.94) 100%
  );
}

.mh-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 2.5rem;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  border: 1px solid rgb(255 255 255 / 0.22);
  /* Forest-tinted frost: white text holds ≥4.5:1 over any part of the photo. */
  background: rgb(15 42 23 / 0.42);
  backdrop-filter: blur(14px) saturate(1.2);
  -webkit-backdrop-filter: blur(14px) saturate(1.2);
  font-size: 0.875rem;
  font-weight: 500;
  color: #ffffff;
  white-space: nowrap;
}

/* Masked line rise: the mask clips, the inner line travels. Padding keeps descenders. */
.mh-hero-mask {
  overflow: clip;
  padding-bottom: 0.08em;
  margin-bottom: -0.08em;
}

@media (prefers-reduced-motion: no-preference) {
  .mh-hero-photo {
    animation: mh-settle 1600ms var(--ease-out-soft) both;
  }
  .mh-hero-line {
    animation: mh-line 900ms var(--ease-out-soft) both;
    animation-delay: var(--d, 0ms);
  }
  .mh-hero-late {
    animation: mh-fade 700ms var(--ease-out-soft) both;
    animation-delay: var(--d, 0ms);
  }
}
@keyframes mh-settle {
  from {
    transform: scale(1.08);
  }
}
@keyframes mh-line {
  from {
    transform: translateY(105%);
  }
}
@keyframes mh-fade {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
}
</style>
