<template>
  <MhHome />
</template>

<script setup lang="ts">
/**
 * Homepage route. SEO lives in the page (ARCHITECTURE.md §12): title/description from the
 * brief's hero copy, Open Graph + Twitter cards, canonical, Organization JSON-LD.
 */
import { HERO_COPY } from "~/features/marketing/home/domain/home-copy";
import { MICROCOPY } from "~/features/marketing/home/domain/home-microcopy";

const { siteUrl } = useRuntimeConfig().public;
const canonical = `${siteUrl}/`;
const ogImage = `${siteUrl}/og-image.jpg`;

useSeoMeta({
  title: MICROCOPY.meta.title,
  description: HERO_COPY.subheadline,
  ogType: "website",
  ogSiteName: "NaijaPath",
  ogLocale: "en_NG",
  ogUrl: canonical,
  ogTitle: `NaijaPath | ${HERO_COPY.headline}`,
  ogDescription: HERO_COPY.subheadline,
  ogImage,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: MICROCOPY.meta.ogImageAlt,
  twitterCard: "summary_large_image",
  twitterTitle: `NaijaPath | ${HERO_COPY.headline}`,
  twitterDescription: HERO_COPY.subheadline,
  twitterImage: ogImage,
  twitterImageAlt: MICROCOPY.meta.ogImageAlt,
  robots: "index, follow, max-image-preview:large",
});

useHead({
  link: [{ rel: "canonical", href: canonical }],
  script: [
    {
      key: "ld-organization",
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "NaijaPath",
        url: canonical,
        logo: `${siteUrl}/apple-touch-icon.png`,
        description: HERO_COPY.subheadline,
        slogan: HERO_COPY.tag,
        areaServed: "NG",
      }),
    },
  ],
});
</script>
