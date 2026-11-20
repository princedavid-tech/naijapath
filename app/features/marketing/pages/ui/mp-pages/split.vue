<template>
  <div class="min-h-svh bg-cream pb-[var(--sheet-inset)]">
    <NSkipLink target="main">{{ MICROCOPY.a11y.skipLink }}</NSkipLink>
    <MpPagesSiteNav />

    <div
      class="mx-[var(--sheet-inset)] grid min-h-[calc(100svh-var(--header-h)-var(--sheet-inset))] grid-cols-1 overflow-clip rounded-sheet bg-sheet lg:grid-cols-2"
    >
      <!-- Left: the page's content, a quiet footer. -->
      <div class="flex min-w-0 flex-col px-5 pt-2 pb-6 sm:px-10 lg:px-14 lg:pt-4">
        <main
          id="main"
          tabindex="-1"
          :class="
            cn(
              'flex flex-1 items-start pt-10 pb-10 sm:pb-14 lg:pt-[clamp(2.5rem,10vh,7rem)]',
              props.align === 'center' ? 'justify-center' : 'justify-start',
            )
          "
        >
          <!-- Anchored near the top, not centred: when the content changes height (Sign in ↔
               Sign up, errors) the heading and tabs stay put and only the area below grows. -->
          <div :class="cn('w-full', props.width === 'wide' ? 'max-w-[34rem]' : 'max-w-[26rem]')">
            <slot />
          </div>
        </main>

        <footer
          :class="
            cn(
              'flex flex-col gap-2 text-sm text-body',
              props.align === 'center'
                ? 'mx-auto max-w-[30rem] items-center text-center'
                : 'w-full items-start',
            )
          "
        >
          <p>{{ FOOTER_COPY.tagline }}</p>
          <nav :aria-label="MICROCOPY.a11y.footerNav">
            <ul :class="cn('flex flex-wrap gap-x-5', props.align === 'center' && 'justify-center')">
              <li v-for="link in links" :key="link.to">
                <NLink
                  :to="link.to"
                  class="link-underline inline-flex min-h-11 items-center font-medium text-ink"
                >
                  {{ link.label }}
                </NLink>
              </li>
            </ul>
          </nav>
          <p>{{ FOOTER_COPY.copyright }}</p>
        </footer>
      </div>

      <!-- Right: a page-specific panel (#aside, shown on every screen: stacked below on
           phones), or else the visual field (≥1024px): photos inset in their own rounded
           frame, tinted forest. Several images cross-fade on `active` (all are loaded, so a
           switch never waits on the network). Decorative (alt=""). -->
      <div v-if="$slots.aside" class="m-3 overflow-clip rounded-[22px] lg:ml-0">
        <slot name="aside" />
      </div>
      <div
        v-else
        class="relative m-3 hidden overflow-clip rounded-[22px] bg-forest lg:block"
        aria-hidden="true"
      >
        <NuxtPicture
          v-for="(img, i) in props.images"
          :key="img.src"
          :src="img.src"
          alt=""
          fit="cover"
          sizes="lg:50vw xl:640px xxl:720px"
          format="avif,webp"
          legacy-format="jpeg"
          loading="lazy"
          :class="
            cn(
              'absolute inset-0 block size-full transition-opacity duration-500 ease-out-soft',
              i === props.active ? 'opacity-100' : 'opacity-0',
            )
          "
          :img-attrs="{
            class: 'photo-grade size-full object-cover',
            style: `object-position: ${img.position ?? '50% 50%'}`,
          }"
        />
        <div class="absolute inset-0 bg-forest/35 mix-blend-multiply" />
        <div
          class="absolute inset-0 bg-linear-to-t from-forest-deep/55 via-transparent to-transparent"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * Split layout for the sign-in and contact pages: the shared navigation bar, then one white
 * sheet on the cream ground with the content on the left (content, footer) and on the right either a forest-tinted photo
 * (≥1024px) or a page-specific `#aside` panel. Photos are the licensed ones in IMAGE_CREDITS.md (never generated imagery).
 */
import { computed } from "vue";
import { cn } from "~/utils/utils";
import { FOOTER_COPY, NAV_COPY } from "../../../home/domain/home-copy";
import { MICROCOPY } from "../../../home/domain/home-microcopy";
import { PAGES_MICROCOPY } from "../../domain/pages-microcopy";
import { PAGES_ROUTES } from "../../domain/pages-routes";

const props = withDefaults(
  defineProps<{
    images?: ReadonlyArray<{ src: string; position?: string }>;
    /** Index of the image shown (cross-fades on change). */
    active?: number;
    width?: "narrow" | "wide";
    /** Content alignment in the left column. */
    align?: "center" | "start";
  }>(),
  { images: () => [], active: 0, width: "narrow", align: "center" },
);

const route = useRoute();

// Footer links: home, plus the other pages (not the one you are on).
const links = computed(() =>
  [
    { label: PAGES_MICROCOPY.shell.backHome, to: PAGES_ROUTES.home },
    { label: NAV_COPY.ctaFilled.label, to: PAGES_ROUTES.bookSession },
    { label: MICROCOPY.nav.contact, to: PAGES_ROUTES.contact },
    { label: NAV_COPY.ctaGhost.label, to: PAGES_ROUTES.signIn },
  ].filter((link) => link.to !== route.path),
);
</script>
