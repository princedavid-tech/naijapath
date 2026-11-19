<template>
  <figure
    :class="
      cn(
        'flex h-full flex-col rounded-card border border-hairline bg-sheet p-7 shadow-soft sm:p-9',
        props.class,
      )
    "
  >
    <div class="flex items-start justify-between gap-4">
      <!-- Large quote mark (line-art, decorative). -->
      <NIcon name="quote" :size="56" :stroke="1.25" class="-ml-1 text-forest" />
      <NPill v-if="props.testimonial.sample" tone="muted" size="sm" class="shrink-0">
        {{ MICROCOPY.testimonials.sampleBadge }}
      </NPill>
      <NRating v-else-if="props.testimonial.rating" :value="props.testimonial.rating" :size="16" />
    </div>

    <blockquote class="mt-6 flex-1">
      <p class="text-[clamp(1.125rem,1rem+0.5vw,1.375rem)] leading-[1.45] text-ink">
        “{{ props.testimonial.quote }}”
      </p>
    </blockquote>

    <figcaption class="mt-8 flex items-center gap-4 border-t border-hairline pt-6">
      <NuxtImg
        v-if="props.testimonial.photo && !props.testimonial.sample"
        :src="props.testimonial.photo"
        :alt="`Profile photo of ${props.testimonial.name}`"
        width="112"
        height="112"
        fit="cover"
        format="webp"
        loading="lazy"
        class="photo-grade size-14 rounded-full object-cover"
      />
      <span
        v-else
        aria-hidden="true"
        class="inline-flex size-14 shrink-0 items-center justify-center rounded-full bg-sage text-base font-medium text-forest"
        >{{ initials }}</span
      >
      <span class="min-w-0">
        <span class="block font-medium text-ink">{{ props.testimonial.name }}</span>
        <span v-if="props.testimonial.role" class="block text-sm text-body">{{
          props.testimonial.role
        }}</span>
        <span class="mt-1 block text-sm font-medium text-forest">{{
          props.testimonial.outcome
        }}</span>
      </span>
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
/**
 * §2.8 story card (redesign-v3): large line-art quote mark, the quote, then initials (or a
 * consented photo for real testimonials), name, role and outcome. Real testimonials may show
 * their rating; design samples show only the visible "Sample testimonial" label — never stars.
 */
import { computed, type HTMLAttributes } from "vue";
import { cn } from "~/utils/utils";
import type { Testimonial } from "../../domain/home-testimonials";
import { MICROCOPY } from "../../domain/home-microcopy";

const props = defineProps<{ testimonial: Testimonial; class?: HTMLAttributes["class"] }>();

const initials = computed(() =>
  props.testimonial.name
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .replace(/[^A-Za-z]/g, "")
    .slice(0, 2)
    .toUpperCase(),
);
</script>
