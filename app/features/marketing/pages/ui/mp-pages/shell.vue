<template>
  <div class="flex min-h-svh flex-col bg-cream">
    <NSkipLink target="main">{{ MICROCOPY.a11y.skipLink }}</NSkipLink>

    <MpPagesSiteNav />

    <main id="main" tabindex="-1" class="flex-1 pb-3 md:pb-4">
      <slot />
    </main>

    <footer
      class="site-container flex flex-col gap-3 py-8 text-sm text-body md:flex-row md:items-center md:justify-between"
    >
      <p>{{ FOOTER_COPY.tagline }}</p>
      <div class="flex flex-wrap items-center gap-x-6 gap-y-1">
        <!-- Small screens: the header only has room for the CTA, so these live here. -->
        <NLink
          v-for="item in TEXT_LINKS"
          :key="item.to"
          :to="item.to"
          class="link-underline inline-flex min-h-11 items-center text-ink sm:hidden"
        >
          {{ item.label }}
        </NLink>
        <NLink
          :to="PAGES_ROUTES.home"
          class="link-underline inline-flex min-h-11 items-center text-ink"
        >
          {{ PAGES_MICROCOPY.shell.backHome }}
        </NLink>
        <p>{{ FOOTER_COPY.copyright }}</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
/**
 * Shell for /book-a-session: the shared navigation bar (site-nav.vue), the page in `<main id="main">`, and a one-line footer.
 * Nav labels and footer lines reuse the brief's approved copy; "Contact" is microcopy.
 */
import { FOOTER_COPY, NAV_COPY } from "../../../home/domain/home-copy";
import { MICROCOPY } from "../../../home/domain/home-microcopy";
import { PAGES_MICROCOPY } from "../../domain/pages-microcopy";
import { PAGES_ROUTES } from "../../domain/pages-routes";

const route = useRoute();

const TEXT_LINKS = [
  { label: MICROCOPY.nav.contact, to: PAGES_ROUTES.contact },
  { label: NAV_COPY.ctaGhost.label, to: PAGES_ROUTES.signIn },
] as const;
</script>
