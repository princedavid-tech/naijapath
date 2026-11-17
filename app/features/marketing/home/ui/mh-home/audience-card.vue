<template>
  <article
    :class="
      cn(
        'group/card relative flex flex-col gap-2.5 rounded-xl p-2.5 transition-shadow duration-200 ease-brand',
        props.lit
          ? 'flex-col-reverse justify-end bg-lime-400 text-green-600 [--focus-ring:var(--green-600)]'
          : 'bg-base-0/[0.06]',
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
          'flex flex-1 flex-col rounded-lg border p-5',
          props.lit ? 'border-green-600/25' : 'border-base-0/15',
        )
      "
    >
      <p
        :class="
          cn('font-heading text-sm font-semibold', props.lit ? 'text-green-600' : 'text-lime-400')
        "
      >
        {{ props.card.audience }}
      </p>
      <h3
        :class="
          cn(
            'mt-2 border-b pb-4 font-heading text-xl leading-snug font-semibold',
            props.lit ? 'border-green-600/25 text-green-600' : 'border-base-0/15 text-base-0',
          )
        "
      >
        {{ props.card.headline }}
      </h3>
      <p :class="cn('mt-4 text-base', props.lit ? 'text-green-600' : 'text-base-0/80')">
        {{ props.card.body }}
      </p>
      <!-- Stretched link: the whole card is the hit area; the visible text is the accessible name. -->
      <NTextLink
        :to="props.card.cta.to"
        :class="
          cn(
            'mt-auto pt-5 after:absolute after:inset-0 after:rounded-xl after:content-[\'\']',
            props.lit ? 'text-green-600' : 'text-lime-400 hover:text-base-0',
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
 * One "front door": photo + bordered text box (title, rule, body, link). The lit card is lime
 * with the text box above the photo.
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
