<template>
  <figure
    :class="
      cn(
        'grid h-full grid-cols-1 gap-8 rounded-xl border border-base-150 bg-base-0 p-4 sm:p-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:p-8',
        !props.testimonial && 'border border-dashed border-base-150',
        props.class,
      )
    "
  >
    <!-- Portrait (or a neutral slot while the testimonial is pending). -->
    <div
      class="flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-base-100"
    >
      <NuxtImg
        v-if="props.testimonial?.photo"
        :src="props.testimonial.photo"
        :alt="`Profile photo of ${props.testimonial.name}`"
        width="480"
        height="480"
        fit="cover"
        format="webp"
        loading="lazy"
        class="size-full object-cover grayscale"
      />
      <NAvatar v-else size="lg" />
    </div>

    <div class="flex flex-col justify-between gap-8">
      <!-- Real testimonial -->
      <template v-if="props.testimonial">
        <div class="flex flex-col gap-5">
          <NRating :value="props.testimonial.rating" :size="18" />
          <blockquote>
            <p
              class="font-heading text-xl leading-snug font-medium text-base-900 sm:text-2xl lg:text-[1.75rem]"
            >
              “{{ props.testimonial.quote }}”
            </p>
          </blockquote>
        </div>
        <figcaption class="border-t border-base-150 pt-5">
          <p class="font-heading font-semibold text-base-900">{{ props.testimonial.name }}</p>
          <p class="text-sm text-base-500">{{ props.testimonial.outcome }}</p>
        </figcaption>
      </template>

      <!-- Placeholder: clearly marked, never invented. Design-only; gated off in production. -->
      <template v-else>
        <div class="flex flex-col gap-5">
          <div class="flex items-center justify-between gap-3">
            <span aria-hidden="true"><NRating :value="0" :size="18" /></span>
            <NPill tone="muted" size="sm">{{ t.pendingBadge }}</NPill>
          </div>
          <p class="text-lg text-base-500 italic">{{ t.pendingQuote }}</p>
          <div aria-hidden="true" class="flex flex-col gap-2.5">
            <span class="h-3 w-full rounded-full bg-base-100" />
            <span class="h-3 w-11/12 rounded-full bg-base-100" />
            <span class="h-3 w-4/5 rounded-full bg-base-100" />
          </div>
        </div>
        <figcaption class="border-t border-base-150 pt-5">
          <p class="font-heading font-semibold text-base-600">{{ t.pendingName }}</p>
          <p class="text-sm text-base-500">{{ t.pendingOutcome }}</p>
        </figcaption>
      </template>
    </div>
  </figure>
</template>

<script setup lang="ts">
/** One story: portrait left, large quote right, name + outcome under a rule. */
import type { HTMLAttributes } from "vue";
import { cn } from "~/utils/utils";
import type { Testimonial } from "../../domain/home-testimonials";
import { MICROCOPY } from "../../domain/home-microcopy";

const props = defineProps<{
  testimonial?: Testimonial;
  class?: HTMLAttributes["class"];
}>();
const t = MICROCOPY.testimonials;
</script>
