<template>
  <!-- One <header> landmark. It sticks at -2.75rem from 640px, so the top strip (2.75rem)
       scrolls away and the bar below stays pinned. -->
  <header
    data-slot="site-header"
    :class="
      cn(
        'sticky top-0 z-40 border-b border-base-150 bg-base-0 transition-shadow duration-200 ease-brand sm:-top-11',
        scrolled && 'shadow-card',
      )
    "
  >
    <!-- Top strip: location left, social on a lime tab right. -->
    <div data-surface="dark" class="hidden bg-green-600 text-base-0 sm:block">
      <div
        class="mx-auto flex h-11 w-full max-w-[90rem] items-stretch justify-between pl-6 lg:pl-8"
      >
        <p class="inline-flex items-center gap-2 text-sm">
          <NIcon name="map-pin" :size="18" class="text-lime-400" />
          {{ MICROCOPY.footer.locationPill }}
        </p>
        <ul
          :aria-label="MICROCOPY.a11y.socialLabel"
          class="mh-tab flex items-center gap-1 bg-lime-400 pr-6 pl-12 text-green-600 lg:pr-8"
        >
          <li v-for="s in HOME_SOCIAL" :key="s.id">
            <NLink
              v-if="s.href"
              :to="s.href"
              :aria-label="s.label"
              class="inline-flex size-11 items-center justify-center rounded-full hover:bg-green-600/10"
            >
              <NIcon :name="s.id" :size="18" />
            </NLink>
            <span v-else class="inline-flex size-9 items-center justify-center" aria-hidden="true">
              <NIcon :name="s.id" :size="18" />
            </span>
          </li>
        </ul>
      </div>
    </div>

    <!-- The header is allowed a wider measure than page content (90rem) so all four links and
         both CTAs fit at 16px. Below 1440px: hamburger + Book a Session. -->
    <NContainer class="flex h-[var(--header-h)] max-w-[90rem] items-center gap-4">
      <NLink
        :to="HOME_ROUTES.home"
        class="-m-1 inline-flex min-h-11 items-center rounded-sm p-1"
        :aria-label="MICROCOPY.a11y.homeLink"
      >
        <NLogo />
      </NLink>

      <!-- Desktop navigation (≥1440px: four links + two CTAs at 16px), centred between logo
           and CTAs. -->
      <nav :aria-label="MICROCOPY.a11y.primaryNav" class="mx-auto hidden 2xl:block">
        <ul class="flex items-center gap-1">
          <li v-for="link in NAV_COPY.links" :key="link.label">
            <NLink
              :to="link.to"
              :class="
                cn(
                  'inline-flex min-h-11 items-center rounded-sm px-2.5 font-heading text-base whitespace-nowrap transition-colors duration-200 ease-brand',
                  // Audience weight difference (brief §01): organisations' link is heavier/darker.
                  link.audience === 'organisation'
                    ? 'font-semibold text-green-600 hover:text-green-500'
                    : 'font-medium text-base-600 hover:text-green-500',
                )
              "
            >
              <span class="link-underline">{{ link.label }}</span>
            </NLink>
          </li>
        </ul>
      </nav>

      <div class="ml-auto flex items-center gap-2 2xl:ml-0">
        <NButton :to="NAV_COPY.ctaGhost.to" variant="ghost" class="hidden 2xl:inline-flex">
          {{ NAV_COPY.ctaGhost.label }}
        </NButton>
        <NButton
          :to="NAV_COPY.ctaFilled.to"
          color="brand"
          shape="pill"
          class="hidden sm:inline-flex"
        >
          {{ NAV_COPY.ctaFilled.label }}
        </NButton>

        <!-- Mobile / tablet menu trigger. The sheet itself (Reka UI) loads on demand. -->
        <button
          type="button"
          :class="
            cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'text-green-600 2xl:hidden')
          "
          :aria-label="MICROCOPY.a11y.openMenu"
          aria-haspopup="dialog"
          :aria-expanded="menuOpen ? 'true' : 'false'"
          @click="openMenu"
        >
          <NIcon name="menu" :size="26" />
        </button>
        <LazyMhHomeMobileMenu v-if="menuMounted" v-model:open="menuOpen" />
      </div>
    </NContainer>
  </header>
</template>

<script setup lang="ts">
/**
 * 01 Navigation Bar. Dark top strip (location + social on a lime tab), then a white sticky bar
 * that gains a subtle shadow after 80px.
 * The mobile sheet (mobile-menu.vue) is mounted on first open and pre-fetched when the browser
 * is idle, so the first tap is instant on any reasonable connection.
 */
import { onBeforeUnmount, onMounted, ref } from "vue";
import { buttonVariants } from "~/components/n/button/button-variants";
import { cn } from "~/utils/utils";
import { NAV_COPY } from "../../domain/home-copy";
import { HOME_ROUTES, HOME_SOCIAL } from "../../domain/home-routes";
import { MICROCOPY } from "../../domain/home-microcopy";

const scrolled = ref(false);
const menuOpen = ref(false);
const menuMounted = ref(false);

const warmMenuChunk = () => void import("./mobile-menu.vue");

function openMenu() {
  menuMounted.value = true;
  menuOpen.value = true;
}

const onScroll = () => {
  scrolled.value = window.scrollY > 80;
};

onMounted(() => {
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Warm the menu chunk when idle (only where the hamburger is shown).
  if (!window.matchMedia("(min-width: 90rem)").matches) {
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number })
      .requestIdleCallback;
    if (idle) idle(warmMenuChunk);
    else setTimeout(warmMenuChunk, 2000);
  }
});
onBeforeUnmount(() => window.removeEventListener("scroll", onScroll));
</script>

<style scoped>
/* The lime tab's slanted left edge. */
.mh-tab {
  clip-path: polygon(1.75rem 0, 100% 0, 100% 100%, 0 100%);
}
</style>
