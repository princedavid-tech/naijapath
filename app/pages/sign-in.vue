<template>
  <MpPagesSplit :images="IMAGES" :active="mode === 'sign-up' ? 1 : 0">
    <div class="text-center">
      <h1 class="text-title font-medium text-ink">{{ a.title }}</h1>
      <p class="mt-3 text-copy text-body">{{ a.lead }}</p>
    </div>

    <MpPagesAuthTabs v-model="mode" class="mt-8" />

    <p class="mt-6 text-center text-base text-body">
      {{ a.trouble }}
      <NLink
        :to="PAGES_ROUTES.contact"
        class="font-medium text-forest underline underline-offset-2"
      >
        {{ a.troubleLink }}</NLink
      >
    </p>
  </MpPagesSplit>
</template>

<script setup lang="ts">
/**
 * Sign in / sign up: one page, two tabs (see auth-tabs.vue for the animated switch).
 * `?mode=sign-up` opens on the sign-up tab. Never indexed.
 */
import { ref } from "vue";
import { PAGES_MICROCOPY } from "~/features/marketing/pages/domain/pages-microcopy";
import { PAGES_ROUTES } from "~/features/marketing/pages/domain/pages-routes";

const a = PAGES_MICROCOPY.auth;
// Sign in: a young professional at their desk. Sign up: a practitioner and a young professional
// working through a plan together. The photo cross-fades with the tab.
const IMAGES = [
  { src: "/images/beneficiary-session.jpg", position: "40% 50%" },
  { src: "/images/hero-session.jpg", position: "55% 50%" },
] as const;
const route = useRoute();
const mode = ref<"sign-in" | "sign-up">(route.query.mode === "sign-up" ? "sign-up" : "sign-in");

useSeoMeta({ title: a.metaTitle, description: a.metaDescription, robots: "noindex, nofollow" });
</script>
