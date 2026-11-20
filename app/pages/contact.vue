<template>
  <MpPagesSplit width="wide" align="start" :images="IMAGES">
    <NEyebrow>{{ t.eyebrow }}</NEyebrow>
    <h1 id="contact-heading" class="mt-4 text-title font-medium text-ink">{{ t.title }}</h1>
    <p class="mt-4 text-copy text-body sm:text-justify sm:hyphens-auto">{{ t.lead }}</p>

    <MpPagesContactForm class="mt-8" />
  </MpPagesSplit>
</template>

<script setup lang="ts">
/**
 * Contact page: the split layout with the message form on the left (left-aligned, paragraphs
 * justified from 640px; ragged on phones, where justified lines open wide gaps) and a
 * forest-tinted photo on the right (≥1024px).
 */
import { PAGES_MICROCOPY } from "~/features/marketing/pages/domain/pages-microcopy";
import { PAGES_ROUTES } from "~/features/marketing/pages/domain/pages-routes";

const t = PAGES_MICROCOPY.contact;
// A practitioner and a young professional talking a plan through (also the Sign up photo:
// only two licensed photos exist so far; see IMAGE_CREDITS.md).
const IMAGES = [{ src: "/images/hero-session.jpg", position: "55% 40%" }] as const;
const { siteUrl } = useRuntimeConfig().public;

useSeoMeta({
  title: t.metaTitle,
  description: t.metaDescription,
  ogTitle: t.metaTitle,
  ogDescription: t.metaDescription,
  ogUrl: `${siteUrl}${PAGES_ROUTES.contact}`,
});
useHead({ link: [{ rel: "canonical", href: `${siteUrl}${PAGES_ROUTES.contact}` }] });
</script>
