<template>
  <header
    class="mx-[var(--sheet-inset)] flex h-[var(--header-h)] items-center gap-2 px-3 sm:gap-3 sm:px-4 lg:px-5"
  >
    <NLink
      :to="PAGES_ROUTES.home"
      class="-ml-1 inline-flex min-h-11 shrink-0 items-center rounded-full px-1"
      :aria-label="MICROCOPY.a11y.homeLink"
    >
      <NLogo />
    </NLink>

    <nav :aria-label="MICROCOPY.a11y.primaryNav" class="mx-auto hidden md:block">
      <ul class="flex items-center rounded-full border border-ink/10 bg-white/60 p-1 shadow-soft">
        <li v-for="item in ITEMS" :key="item.to" :class="item.wide && 'hidden 2xl:block'">
          <NLink
            :to="item.to"
            :aria-current="route.path === item.to ? 'page' : undefined"
            :class="
              cn(
                'inline-flex h-11 items-center rounded-full px-4 text-[0.9375rem] font-medium whitespace-nowrap transition-colors duration-200 ease-out-soft',
                route.path === item.to
                  ? 'bg-white text-ink shadow-soft'
                  : 'text-ink/80 hover:bg-white/70 hover:text-ink',
              )
            "
          >
            {{ item.label }}
          </NLink>
        </li>
      </ul>
    </nav>

    <div class="ml-auto flex items-center gap-2 md:ml-0">
      <NButton
        :to="PAGES_ROUTES.bookSession"
        color="accent"
        :aria-current="route.path === PAGES_ROUTES.bookSession ? 'page' : undefined"
        class="hidden min-h-11 px-4 text-sm xs:inline-flex sm:px-5 sm:text-[0.9375rem]"
      >
        {{ NAV_COPY.ctaFilled.label }}
      </NButton>

      <!-- Below 1440px: the homepage's full-screen menu (lazy), with every destination. -->
      <button
        type="button"
        class="inline-flex size-11 items-center justify-center rounded-full border border-ink/10 bg-white/60 text-ink shadow-soft transition-colors duration-200 ease-out-soft hover:bg-white 2xl:hidden"
        :aria-label="MICROCOPY.a11y.openMenu"
        aria-haspopup="dialog"
        :aria-expanded="menuOpen ? 'true' : 'false'"
        @click="openMenu"
      >
        <NIcon name="menu" :size="22" />
      </button>
      <LazyMhHomeMobileMenu v-if="menuMounted" v-model:open="menuOpen" />
    </div>
  </header>
</template>

<script setup lang="ts">
/**
 * Navigation bar for the standalone pages (sign in, contact, book a session).
 * ≥1440px: the homepage's four section links + Contact + Sign In in one pill, and the CTA.
 * 768–1439px: Contact + Sign In, the CTA and the menu button. Phones: CTA (≥375px) + menu.
 * Same labels as the homepage header (the brief's NAV_COPY; "Contact" is microcopy).
 */
import { ref } from "vue";
import { cn } from "~/utils/utils";
import { NAV_COPY } from "../../../home/domain/home-copy";
import { MICROCOPY } from "../../../home/domain/home-microcopy";
import { PAGES_ROUTES } from "../../domain/pages-routes";

const route = useRoute();

const ITEMS = [
  ...NAV_COPY.links.map((l) => ({ label: l.label, to: l.to as string, wide: true })),
  { label: MICROCOPY.nav.contact, to: PAGES_ROUTES.contact as string, wide: false },
  { label: NAV_COPY.ctaGhost.label, to: PAGES_ROUTES.signIn as string, wide: false },
];

const menuOpen = ref(false);
const menuMounted = ref(false);
function openMenu() {
  menuMounted.value = true;
  menuOpen.value = true;
}
</script>
