<template>
  <article
    :class="
      cn(
        'group/card relative flex flex-col gap-2 rounded-xl p-2 transition-shadow duration-200 ease-brand sm:gap-2.5 sm:p-2.5',
        props.lit
          ? 'flex-col-reverse justify-end border border-green-150 bg-green-100'
          : 'border border-base-150 bg-base-0 shadow-card hover:shadow-card-hover',
        props.class,
      )
    "
  >
    <div aria-hidden="true" class="overflow-hidden rounded-lg">
      <NuxtPicture
        :src="props.photo.src"
        alt=""
        width="440"
        height="260"
        fit="cover"
        sizes="xs:92vw sm:600px lg:30vw xl:380px"
        format="avif,webp"
        legacy-format="jpeg"
        loading="lazy"
        :img-attrs="{
          class: `aspect-[17/10] w-full object-cover grayscale ${props.photo.position}`,
          decoding: 'async',
        }"
      />
    </div>

    <div
      :class="
        cn(
          'flex flex-1 flex-col rounded-lg border p-4 sm:p-5',
          props.lit ? 'border-green-150 bg-base-0/60' : 'border-base-150',
        )
      "
    >
      <p :class="'font-heading text-sm font-semibold text-green-500'">
        {{ props.card.audience }}
      </p>
      <h3
        :class="
          cn(
            'mt-2 border-b pb-4 font-heading text-xl leading-snug font-semibold',
            props.lit ? 'border-green-150 text-base-900' : 'border-base-150 text-base-900',
          )
        "
      >
        {{ props.card.headline }}
      </h3>
      <p class="mt-4 text-base text-base-600">
        {{ props.card.body }}
      </p>
      <!-- Stretched link: the whole card is the hit area; the visible text is the accessible name. -->
      <NTextLink
        :to="props.card.cta.to"
        :class="
          cn(
            'mt-auto pt-5 after:absolute after:inset-0 after:rounded-xl after:content-[\'\']',
            'text-green-500 hover:text-green-600',
          )
        "
      >
        {{ props.card.cta.label }}
      </NTextLink>
    </div>
  </article>
</template>

<script setup lang="ts">
/**
 * One "front door": photo + bordered text box (title, rule, body, link). The highlighted card
 * (Light Green Tint, per the Design Guidelines) puts the text box above the photo.
 */
import type { HTMLAttributes } from "vue";
import { cn } from "~/utils/utils";
import type { AudienceCard } from "../../domain/home-copy";

const props = defineProps<{
  card: AudienceCard;
  photo: { src: string; position: string };
  lit?: boolean;
  class?: HTMLAttributes["class"];
}>();
</script>
