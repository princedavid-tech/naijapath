<template>
  <!-- §2.1 Header. Fixed; while the page is at the top it sits INSIDE the hero sheet (white
       logo, frosted nav pill over the photo). Once scrolled it becomes a compact cream bar. -->
  <header
    data-slot="site-header"
    :data-surface="onPhoto ? 'dark' : undefined"
    class="pointer-events-none fixed inset-x-0 top-0 z-40"
  >
    <div
      :class="
        cn(
          'pointer-events-auto mx-[var(--sheet-inset)] flex items-center gap-2 transition-[margin,height,padding,background-color,box-shadow,border-radius] duration-300 ease-out-soft sm:gap-4',
          onPhoto
            ? 'mt-[var(--sheet-inset)] h-[5.25rem] rounded-sheet bg-transparent px-3 sm:px-6 lg:px-8'
            : 'mt-2 h-16 rounded-[1.25rem] bg-cream/95 px-3 shadow-bar sm:px-4 lg:px-5',
        )
      "
    >
      <NLink
        :to="HOME_ROUTES.home"
        class="-m-1 inline-flex min-h-11 shrink-0 items-center rounded-lg p-1"
        :aria-label="MICROCOPY.a11y.homeLink"
      >
        <NLogo :tone="onPhoto ? 'inverse' : 'default'" />
      </NLink>

      <!-- Centre: frosted pill nav with a sliding white indicator (≥1440px: four links + Sign In). -->
      <nav :aria-label="MICROCOPY.a11y.primaryNav" class="mx-auto hidden 2xl:block">
        <div
          ref="pill"
          :class="
            cn(
              'relative flex items-center rounded-full border p-1 transition-[background-color,border-color] duration-300 ease-out-soft',
              onPhoto
                ? 'border-white/20 bg-forest-deep/45 backdrop-blur-md'
                : 'border-transparent bg-ink/[0.05]',
            )
          "
          @mouseleave="hovered = null"
        >
          <span
            aria-hidden="true"
            class="mh-nav-indicator pointer-events-none absolute top-1 left-0 h-11 rounded-full bg-white shadow-soft"
            :style="indicatorStyle"
          />
          <ul class="relative flex items-center">
            <li v-for="(item, i) in ITEMS" :key="item.label">
              <NLink
                :ref="(el) => setItem(el, i)"
                :to="item.to"
                :aria-current="
                  item.sectionId && item.sectionId === activeId ? 'location' : undefined
                "
                :class="
                  cn(
                    'relative inline-flex h-11 items-center rounded-full px-4 text-[0.9375rem] font-medium whitespace-nowrap transition-colors duration-300 ease-out-soft',
                    highlighted === i
                      ? 'text-ink'
                      : onPhoto
                        ? 'text-white'
                        : 'text-body hover:text-ink',
                  )
                "
                @mouseenter="hovered = i"
                @focus="hovered = i"
                @blur="hovered = null"
              >
                {{ item.label }}
              </NLink>
            </li>
          </ul>
        </div>
      </nav>

      <div class="ml-auto flex items-center gap-2 2xl:ml-0">
        <NButton
          :to="NAV_COPY.ctaFilled.to"
          color="accent"
          class="hidden min-h-11 px-4 text-sm xs:inline-flex sm:px-5 sm:text-[0.9375rem]"
        >
          {{ NAV_COPY.ctaFilled.label }}
        </NButton>

        <!-- Below 1440px: menu button. The full-screen menu (mobile-menu.vue) loads on demand. -->
        <button
          type="button"
          :class="
            cn(
              'inline-flex size-11 items-center justify-center rounded-full border transition-colors duration-300 ease-out-soft 2xl:hidden',
              onPhoto
                ? 'border-white/25 bg-forest-deep/45 text-white backdrop-blur-md hover:bg-forest-deep/60'
                : 'border-hairline bg-sheet text-ink hover:border-ink/25',
            )
          "
          :aria-label="MICROCOPY.a11y.openMenu"
          aria-haspopup="dialog"
          :aria-expanded="menuOpen ? 'true' : 'false'"
          @click="openMenu"
        >
          <NIcon name="menu" :size="22" />
        </button>
        <LazyMhHomeMobileMenu v-if="menuMounted" v-model:open="menuOpen" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
/**
 * §2.1 Header (redesign-v3).
 * - At the top of the page it overlays the hero sheet: white logo, frosted pill nav, orange
 *   "Book a Session". After 24px of scroll it settles into a compact cream bar (300ms).
 * - The nav pill's white indicator SLIDES to the hovered/focused item, and otherwise rests on the
 *   section currently in view (aria-current="location"); at the very top it fades out.
 * - "Sign In" (locked content) lives at the right end of the pill; below 1440px it is in the menu.
 */
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  type ComponentPublicInstance,
} from "vue";
import { cn } from "~/utils/utils";
import { motionState } from "~/utils/motion-state";
import { hashTargetId } from "~/utils/scroll";
import { NAV_COPY } from "../../domain/home-copy";
import { HOME_ROUTES } from "../../domain/home-routes";
import { MICROCOPY } from "../../domain/home-microcopy";

const ITEMS = [
  ...NAV_COPY.links.map((l) => ({ label: l.label, to: l.to, sectionId: hashTargetId(l.to) })),
  { label: NAV_COPY.ctaGhost.label, to: NAV_COPY.ctaGhost.to, sectionId: null as string | null },
];

const scrolled = ref(false);
const onPhoto = computed(() => !scrolled.value);
const menuOpen = ref(false);
const menuMounted = ref(false);

// ── Sliding indicator ────────────────────────────────────────────────
const pill = ref<HTMLElement | null>(null);
const itemEls: HTMLElement[] = [];
const hovered = ref<number | null>(null);
const activeId = ref<string | null>(null);
const box = ref<{ x: number; w: number } | null>(null);

function setItem(el: Element | ComponentPublicInstance | null, i: number) {
  const node = el && "$el" in el ? (el.$el as HTMLElement) : (el as HTMLElement | null);
  if (node) itemEls[i] = node;
}

const activeIndex = computed(() => {
  const i = ITEMS.findIndex((it) => it.sectionId && it.sectionId === activeId.value);
  return i >= 0 ? i : null;
});
const highlighted = computed(() => hovered.value ?? activeIndex.value);

function measure() {
  const i = highlighted.value;
  const el = i === null ? null : itemEls[i];
  if (!el || !pill.value) return;
  box.value = { x: el.offsetLeft + 4, w: el.offsetWidth };
}

const indicatorStyle = computed(() => ({
  width: `${box.value?.w ?? 0}px`,
  transform: `translateX(${box.value?.x ?? 0}px)`,
  opacity: highlighted.value === null ? 0 : 1,
}));

watch(highlighted, () => measure());

// ── Scroll state + scroll spy ────────────────────────────────────────
const onScroll = () => {
  scrolled.value = window.scrollY > 24;
};

let spy: IntersectionObserver | undefined;
let ro: ResizeObserver | undefined;

const warmMenuChunk = () => void import("./mobile-menu.vue");

function openMenu() {
  menuMounted.value = true;
  menuOpen.value = true;
}

// Smooth scroll would keep running under the open menu; pause it while the menu is open.
watch(menuOpen, (open) => {
  if (open) motionState.lenis?.stop();
  else motionState.lenis?.start();
});

onMounted(() => {
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const ids = ITEMS.map((it) => it.sectionId).filter((id): id is string => !!id);
  spy = new IntersectionObserver(
    (entries) => {
      for (const e of entries) if (e.isIntersecting) activeId.value = e.target.id;
      if (window.scrollY < window.innerHeight * 0.5) activeId.value = null;
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );
  for (const id of ids) {
    const el = document.getElementById(id);
    if (el) spy.observe(el);
  }

  if (pill.value) {
    ro = new ResizeObserver(() => measure());
    ro.observe(pill.value);
  }

  if (!window.matchMedia("(min-width: 90rem)").matches) {
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number })
      .requestIdleCallback;
    if (idle) idle(warmMenuChunk);
    else setTimeout(warmMenuChunk, 2000);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
  spy?.disconnect();
  ro?.disconnect();
});
</script>

<style scoped>
.mh-nav-indicator {
  transition:
    transform 450ms var(--ease-out-soft),
    width 450ms var(--ease-out-soft),
    opacity 250ms var(--ease-out-soft);
}
</style>
