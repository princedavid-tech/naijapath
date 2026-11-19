<template>
  <div class="py-3 md:py-4">
    <!-- Ground -->
    <NSheet as="header" class="mb-3 md:mb-4">
      <div class="site-container section-y">
        <NEyebrow>redesign-v3</NEyebrow>
        <h1 class="mt-5 max-w-[16ch] text-hero-v text-ink">NaijaPath design system</h1>
        <p class="measure mt-6 text-copy text-body">
          Development-only reference for the redesign. Every value below is a token in
          <code class="rounded-md bg-cream px-1.5 py-0.5 text-[0.9em] text-ink"
            >app/assets/css/tailwind.css</code
          >; sections use these, never raw values. Not linked, not indexed, 404 in production.
        </p>
      </div>
    </NSheet>

    <!-- Colour -->
    <NSheet class="mb-3 md:mb-4">
      <div class="site-container section-y">
        <NEyebrow>Colour</NEyebrow>
        <h2 class="mt-5 text-title text-ink">Brand mapped to roles</h2>
        <ul class="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          <li
            v-for="s in SWATCHES"
            :key="s.token"
            class="overflow-hidden rounded-card border border-hairline"
          >
            <div class="h-28" :style="{ background: `var(--${s.token})` }" />
            <div class="bg-sheet p-4">
              <p class="font-medium text-ink">{{ s.name }}</p>
              <p class="tabular text-sm text-body">{{ s.hex }} · <code>{{ s.token }}</code></p>
              <p class="mt-1 text-sm text-body">{{ s.role }}</p>
            </div>
          </li>
        </ul>
      </div>
    </NSheet>

    <!-- Type -->
    <NSheet class="mb-3 md:mb-4">
      <div class="site-container section-y">
        <NEyebrow>Type</NEyebrow>
        <h2 class="mt-5 text-title text-ink">General Sans, one family</h2>
        <div class="mt-12 grid gap-10">
          <div
            v-for="t in TYPE"
            :key="t.cls"
            class="grid gap-3 border-t border-hairline pt-6 md:grid-cols-[12rem_1fr]"
          >
            <p class="text-sm text-body"><code>{{ t.cls }}</code><br />{{ t.spec }}</p>
            <p :class="t.cls">{{ t.sample }}</p>
          </div>
        </div>
      </div>
    </NSheet>

    <!-- Buttons -->
    <NSheet class="mb-3 md:mb-4">
      <div class="site-container section-y">
        <NEyebrow>Actions</NEyebrow>
        <h2 class="mt-5 text-title text-ink">Pills</h2>
        <p class="measure mt-4 text-copy text-body">
          Ember (orange) is the primary action only. The trailing arrow slides 4px on hover and
          focus.
        </p>
        <div class="mt-10 flex flex-wrap items-center gap-3">
          <NButton to="#" size="lg"
            >Find Career Guidance <NIcon name="arrow-right" :size="18"
          /></NButton>
          <NButton to="#" color="primary">Commission a Programme</NButton>
          <NButton to="#" color="light">Sign In</NButton>
          <NButton to="#" color="primary" variant="outline">Download Programme Brochure</NButton>
          <NButton to="#" color="light" variant="ghost"
            >Read More Stories <NIcon name="arrow-right" :size="16"
          /></NButton>
        </div>
      </div>
    </NSheet>

    <!-- Dark sheet -->
    <NSheet tone="forest" class="mb-3 md:mb-4">
      <div class="site-container section-y">
        <NEyebrow tone="dark">On forest</NEyebrow>
        <h2 class="mt-5 max-w-[18ch] text-title text-white">
          The one dark field, inset like every sheet
        </h2>
        <p class="measure mt-5 text-copy text-white/80">
          Body copy on forest is white at 80%. Focus rings turn white inside dark sheets.
        </p>
        <div class="mt-10 flex flex-wrap gap-3">
          <NButton to="#" size="lg"
            >Commission a Programme <NIcon name="arrow-right" :size="18"
          /></NButton>
          <NButton to="#" color="inverse" variant="outline" size="lg">
            <NIcon name="download" :size="18" /> Download Programme Brochure
          </NButton>
        </div>
      </div>
    </NSheet>

    <!-- Tints + cards + icons -->
    <div
      class="mb-3 grid gap-3 md:mb-4 md:gap-4 lg:grid-cols-3"
      style="margin-inline: var(--sheet-inset)"
    >
      <NSheet
        v-for="t in TINTS"
        :key="t.tone"
        :tone="t.tone"
        as="article"
        data-draw-host
        class="!mx-0 flex min-h-[27.5rem] flex-col p-8 transition-transform duration-300 ease-out-soft hover:-translate-y-1"
        tabindex="0"
      >
        <NIcon
          :name="t.icon"
          :size="88"
          :stroke="1.25"
          draw
          class="ml-auto"
          :class="t.tone === 'forest' ? 'text-sage' : 'text-forest'"
        />
        <NEyebrow :tone="t.tone === 'forest' ? 'dark' : 'light'" class="mt-auto">{{
          t.tone
        }}</NEyebrow>
        <p :class="['mt-3 text-subtitle', t.tone === 'forest' ? 'text-white' : 'text-ink']">
          Hover or focus to redraw the line-art
        </p>
      </NSheet>
    </div>

    <NSheet class="mb-3 md:mb-4">
      <div class="site-container section-y">
        <NEyebrow>Surfaces</NEyebrow>
        <h2 class="mt-5 text-title text-ink">Cards on a sheet</h2>
        <div class="mt-12 grid gap-4 md:grid-cols-3">
          <NCard>
            <NCardTitle as="p">Hairline card</NCardTitle>
            <NCardDescription class="text-body"
              >24px radius, 1px #ECEAE3, soft 0 8 30 shadow.</NCardDescription
            >
          </NCard>
          <NCard class="bg-cream shadow-none">
            <NCardTitle as="p">Cream inset</NCardTitle>
            <NCardDescription class="text-body"
              >For grouped figures inside a white sheet.</NCardDescription
            >
          </NCard>
          <NCard
            class="transition-[box-shadow,transform] duration-300 ease-out-soft hover:-translate-y-1 hover:shadow-lift"
          >
            <NCardTitle as="p">Lift on hover</NCardTitle>
            <NCardDescription class="text-body"
              >4px rise, lift shadow, 300ms ease-out-soft.</NCardDescription
            >
          </NCard>
        </div>
        <div class="mt-12 flex flex-wrap items-end gap-8 text-forest">
          <div v-for="s in [16, 24, 64, 96]" :key="s" class="flex flex-col items-center gap-2">
            <NIcon name="organisation" :size="s" :stroke="s >= 64 ? 1.25 : 1.5" />
            <span class="tabular text-sm text-body">{{ s }}px</span>
          </div>
        </div>
      </div>
    </NSheet>
  </div>
</template>

<script setup lang="ts">
/**
 * Dev-only design-system reference (redesign-v3). 404 in production, noindex everywhere.
 * Sample strings here are specimens for review, not site copy.
 */
import type { IconName } from "~/utils/icons";

if (!import.meta.dev) {
  throw createError({ statusCode: 404, statusMessage: "Not found" });
}

useSeoMeta({ title: "Design system | NaijaPath (dev)", robots: "noindex, nofollow" });

const SWATCHES = [
  { name: "Cream", token: "cream", hex: "#FAF8F2", role: "Page ground under every sheet" },
  { name: "Sheet", token: "sheet", hex: "#FFFFFF", role: "Inset panels, cards" },
  {
    name: "Forest",
    token: "forest",
    hex: "#1F5C2C",
    role: "Dark panels, accents, icons, eyebrows",
  },
  {
    name: "Forest deep",
    token: "forest-deep",
    hex: "#0F2A17",
    role: "Hero gradient foot, pressed",
  },
  { name: "Ember", token: "ember", hex: "#B84A1F", role: "Primary action pills only" },
  { name: "Sage", token: "sage", hex: "#E4EDE4", role: "Tint field" },
  { name: "Sand", token: "sand", hex: "#F3E7DA", role: "Tint field" },
  { name: "Mist", token: "mist", hex: "#E9E8F4", role: "Tint field" },
  { name: "Ink", token: "ink", hex: "#16211B", role: "Headings" },
  { name: "Body", token: "body", hex: "#4F5A54", role: "Body and small supporting text" },
  {
    name: "Muted",
    token: "muted",
    hex: "#8A938E",
    role: "Large text (≥24px) on white only, never on cream",
  },
  { name: "Hairline", token: "hairline", hex: "#ECEAE3", role: "Card borders, dividers" },
];

const TYPE = [
  {
    cls: "text-hero-v text-ink",
    spec: "36 → 72px · 500 · -0.02em",
    sample: "Navigate your career",
  },
  {
    cls: "text-title text-ink",
    spec: "32 → 48px · 500 · -0.02em",
    sample: "Every session follows the same quality process.",
  },
  {
    cls: "text-subtitle text-ink",
    spec: "22 → 28px · 500",
    sample: "Career guidance that takes your progress seriously.",
  },
  { cls: "text-figure tabular text-forest", spec: "44 → 72px · 500 · tabular", sample: "350+" },
  {
    cls: "text-copy text-body measure",
    spec: "17px · 400 · 1.6 · 62ch",
    sample:
      "This is not casual advice. It is professional career guidance, delivered the way it should be.",
  },
  {
    cls: "text-eyebrow font-medium uppercase text-forest",
    spec: "12px · 500 · 0.08em · caps",
    sample: "Clear progression",
  },
];

const TINTS: Array<{ tone: "forest" | "mist" | "sand"; icon: IconName }> = [
  { tone: "forest", icon: "beneficiary" },
  { tone: "mist", icon: "practitioner" },
  { tone: "sand", icon: "organisation" },
];
</script>
