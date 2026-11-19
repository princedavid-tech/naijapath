<template>
  <footer data-surface="dark" class="sheet mt-3 mb-3 bg-forest-deep text-base-0 md:mt-4 md:mb-4">
    <!-- Join (white, hatched bottom edge) sits directly above. -->
    <NContainer class="pt-12 pb-8 lg:pt-16">
      <!-- Top: brand left, Career Brief right. -->
      <div class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
        <div class="lg:col-span-5">
          <NLink
            :to="HOME_ROUTES.home"
            class="-m-1 inline-flex min-h-11 items-center rounded-sm p-1"
            :aria-label="MICROCOPY.a11y.homeLink"
          >
            <NLogo tone="inverse" />
          </NLink>
          <p class="mt-5 max-w-[22rem] text-lead text-base-0/90">{{ copy.tagline }}</p>
          <p class="mt-5 inline-flex items-center gap-2 text-sm text-base-150">
            <NIcon name="map-pin" :size="18" class="text-terracotta-150" />
            {{ MICROCOPY.footer.locationPill }}
          </p>
          <ul :aria-label="MICROCOPY.a11y.socialLabel" class="mt-6 flex items-center gap-3">
            <li v-for="s in HOME_SOCIAL" :key="s.id">
              <NLink
                v-if="s.href"
                :to="s.href"
                :aria-label="s.label"
                class="inline-flex size-11 items-center justify-center rounded-full bg-terracotta-500 text-base-0 transition-colors duration-200 ease-brand hover:bg-terracotta-600"
              >
                <NIcon :name="s.id" :size="20" />
              </NLink>
              <!-- URL not supplied yet: a plain glyph, never a dead link. -->
              <span
                v-else
                class="inline-flex size-11 items-center justify-center rounded-full bg-terracotta-500 text-base-0"
                aria-hidden="true"
              >
                <NIcon :name="s.id" :size="20" />
              </span>
            </li>
          </ul>
        </div>
        <div class="lg:col-span-6 lg:col-start-7">
          <!-- Server-rendered; its JS (vee-validate, yup, axios) loads only when the footer
               scrolls into view — keeps ~35 KB gz out of the initial bundle. -->
          <LazyMhHomeNewsletterForm hydrate-on-visible />
        </div>
      </div>

      <nav
        :aria-label="MICROCOPY.a11y.footerNav"
        class="mt-10 grid grid-cols-2 gap-8 border-t border-base-0/15 pt-10 sm:grid-cols-3 sm:gap-6 lg:mt-12 lg:pt-12"
      >
        <div v-for="col in copy.columns" :key="col.header">
          <h2
            class="inline-flex items-center gap-2.5 font-heading text-lg font-semibold text-base-0"
          >
            <MhHomeDots tone="dark" />
            {{ col.header }}
          </h2>
          <ul class="mt-3 flex flex-col">
            <li v-for="link in col.links" :key="link.label">
              <NLink
                :to="link.to"
                class="inline-flex min-h-11 items-center py-1 text-base text-base-150 transition-colors duration-200 ease-brand hover:text-base-0"
              >
                <span class="link-underline">{{ link.label }}</span>
              </NLink>
            </li>
          </ul>
        </div>
      </nav>

      <div class="mt-12 border-t border-base-0/15 pt-6">
        <p class="text-sm text-base-150">{{ copy.copyright }}</p>
      </div>
    </NContainer>
  </footer>
</template>

<script setup lang="ts">
/** 09 Footer — Near Black (Design Guidelines), white text; Career Brief, three link columns. */
import { FOOTER_COPY } from "../../domain/home-copy";
import { HOME_ROUTES, HOME_SOCIAL } from "../../domain/home-routes";
import { MICROCOPY } from "../../domain/home-microcopy";

const copy = FOOTER_COPY;
</script>
