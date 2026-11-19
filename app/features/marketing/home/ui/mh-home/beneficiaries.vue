<template>
  <section
    :id="HOME_SECTION_IDS.forYou"
    tabindex="-1"
    aria-labelledby="for-you-heading"
    class="bg-base-0 pt-16 pb-12 lg:pt-24 lg:pb-16 defer-render"
  >
    <NContainer>
      <header class="mx-auto max-w-[44rem] text-center">
        <MhHomeEyebrow class="justify-center">{{ copy.label }}</MhHomeEyebrow>
        <h2 id="for-you-heading" class="mt-4 text-display font-semibold text-base-900">
          {{ copy.headline }}
        </h2>
      </header>

      <div
        class="mt-12 grid grid-cols-1 items-start gap-12 lg:mt-14 lg:grid-cols-2 lg:gap-14 xl:gap-16"
      >
        <!-- Photo composition: wide photo + outline arcs and seal, then a full-width photo. -->
        <div class="grid grid-cols-[minmax(0,3fr)_minmax(0,1.1fr)] gap-3">
          <figure class="overflow-hidden rounded-xl">
            <NuxtPicture
              :src="BENEFICIARY_IMAGE"
              :alt="MICROCOPY.images.beneficiary"
              width="560"
              height="330"
              fit="cover"
              sizes="xs:70vw sm:420px lg:24vw xl:420px"
              format="avif,webp"
              legacy-format="jpeg"
              loading="lazy"
              :img-attrs="{
                class: 'aspect-[17/10] w-full object-cover object-[35%_center] grayscale',
                decoding: 'async',
              }"
            />
          </figure>
          <div class="relative flex flex-col items-center justify-start">
            <!-- Two outline half-arcs (decorative). -->
            <svg aria-hidden="true" viewBox="0 0 100 92" class="w-full text-base-150">
              <path
                d="M2 46a48 44 0 0 1 96 0"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
              />
              <path
                d="M2 90a48 44 0 0 1 96 0"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
              />
            </svg>
            <MhHomeSeal class="-mt-[38%] size-[78%] max-w-28" />
          </div>
          <div class="col-span-2 overflow-hidden rounded-xl" aria-hidden="true">
            <NuxtPicture
              :src="HERO_IMAGE"
              alt=""
              width="760"
              height="330"
              fit="cover"
              sizes="xs:92vw sm:600px lg:44vw xl:580px"
              format="avif,webp"
              legacy-format="jpeg"
              loading="lazy"
              :img-attrs="{
                class: 'aspect-[23/10] w-full object-cover object-[50%_45%] grayscale',
                decoding: 'async',
              }"
            />
          </div>
        </div>

        <!-- Copy + session record + CTA -->
        <div>
          <div class="flex flex-col gap-4 text-base text-base-600 sm:text-lead">
            <p v-for="para in copy.body" :key="para">{{ para }}</p>
          </div>
          <div ref="cardWrap" class="reveal mt-8" :data-revealed="cardVisible">
            <MhHomeAgreedActionsCard class="w-full max-w-none" />
            <!-- Interim home (from the old hero) until §2.4 is redesigned: the booking that
                 precedes the record. -->
            <MhHomeSessionConfirmedCard class="mt-4 ml-auto w-full max-w-[21rem]" />
          </div>
          <div class="mt-8">
            <NButton
              :to="copy.cta.to"
              color="accent"
              shape="pill"
              size="lg"
              class="w-full sm:w-auto"
            >
              {{ copy.cta.label }}
              <NIcon name="arrow-right" :size="18" weight="bold" />
            </NButton>
            <p class="mt-3 text-sm text-base-500 italic">{{ copy.supportingNote }}</p>
          </div>
        </div>
      </div>
    </NContainer>
  </section>
</template>

<script setup lang="ts">
/** 04 For You — centred heading; photo composition left, copy + session record right. */
import { ref } from "vue";
import { BENEFICIARIES_COPY } from "../../domain/home-copy";
import { HOME_SECTION_IDS } from "../../domain/home-routes";
import { MICROCOPY } from "../../domain/home-microcopy";

const copy = BENEFICIARIES_COPY;
// CLIENT PHOTO SLOTS — two photos; the lower one reuses the hero shoot until new photos arrive.
const BENEFICIARY_IMAGE = "/images/beneficiary-session.jpg";
const HERO_IMAGE = "/images/hero-session.jpg";

const cardWrap = ref<HTMLElement | null>(null);
const cardVisible = useInViewOnce(cardWrap, { threshold: 0.3 });
</script>
