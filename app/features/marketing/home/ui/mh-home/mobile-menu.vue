<template>
  <DialogRoot v-model:open="open">
    <DialogPortal>
      <DialogContent
        class="mh-menu fixed inset-0 z-50 flex flex-col overflow-y-auto bg-cream focus:outline-none"
        @close-auto-focus="onCloseAutoFocus"
      >
        <div
          class="mx-[var(--sheet-inset)] mt-2 flex h-16 shrink-0 items-center justify-between px-3 sm:px-4"
        >
          <NLogo />
          <DialogTitle class="sr-only">{{ MICROCOPY.a11y.mobileMenuTitle }}</DialogTitle>
          <DialogDescription class="sr-only">{{ MICROCOPY.a11y.primaryNav }}</DialogDescription>
          <DialogClose
            class="inline-flex size-11 items-center justify-center rounded-full border border-hairline bg-sheet text-ink transition-colors duration-200 ease-out-soft hover:border-ink/25"
            :aria-label="MICROCOPY.a11y.closeMenu"
          >
            <NIcon name="close" :size="22" />
          </DialogClose>
        </div>

        <nav :aria-label="MICROCOPY.a11y.primaryNav" class="site-container flex-1 pt-6 pb-8">
          <ul class="flex flex-col">
            <li
              v-for="(link, i) in NAV_COPY.links"
              :key="link.label"
              class="mh-menu-item border-b border-hairline"
              :style="{ '--i': i }"
            >
              <a
                :href="link.to"
                class="group/menu flex min-h-[4.5rem] items-center justify-between gap-4 py-3 text-[clamp(1.75rem,1.4rem+1.6vw,2.5rem)] leading-[1.1] font-medium tracking-[-0.02em] text-ink"
                @click.prevent="go(link.to)"
              >
                {{ link.label }}
                <NIcon
                  name="arrow-right"
                  :size="28"
                  :stroke="1.25"
                  class="text-forest transition-transform duration-300 ease-out-soft group-hover/menu:translate-x-1"
                />
              </a>
            </li>
          </ul>
        </nav>

        <div
          class="site-container mh-menu-item flex shrink-0 flex-col gap-3 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:flex-row"
          style="--i: 4"
        >
          <NButton :to="NAV_COPY.ctaFilled.to" color="accent" size="lg" class="w-full sm:w-auto">
            {{ NAV_COPY.ctaFilled.label }}
            <NIcon name="arrow-right" :size="18" />
          </NButton>
          <NButton :to="NAV_COPY.ctaGhost.to" color="light" size="lg" class="w-full sm:w-auto">
            {{ NAV_COPY.ctaGhost.label }}
          </NButton>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
/**
 * §2.1 mobile menu (redesign-v3): a full-screen cream sheet with large links (Reka UI Dialog,
 * loaded on demand by site-header.vue). Focus is trapped while open, Esc closes, and focus returns
 * to the menu button — or moves to the chosen section when a link was used.
 */
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogPortal,
  DialogRoot,
  DialogTitle,
} from "reka-ui";
import { hashTargetId, scrollToSection } from "~/utils/scroll";
import { NAV_COPY } from "../../domain/home-copy";
import { MICROCOPY } from "../../domain/home-microcopy";

const open = defineModel<boolean>("open", { required: true });
let pendingTarget: string | null = null;

/** Close the menu first (it locks body scroll), then navigate once focus handling runs. */
function go(to: string) {
  pendingTarget = to;
  open.value = false;
}

function onCloseAutoFocus(event: Event) {
  if (!pendingTarget) return; // normal close → focus returns to the menu button
  event.preventDefault();
  const to = pendingTarget;
  pendingTarget = null;
  requestAnimationFrame(() => {
    const id = hashTargetId(to);
    if (id && scrollToSection(id)) return;
    window.location.assign(to);
  });
}
</script>

<style scoped>
@media (prefers-reduced-motion: no-preference) {
  .mh-menu[data-state="open"] {
    animation: mh-menu-in 350ms var(--ease-out-soft);
  }
  .mh-menu[data-state="closed"] {
    animation: mh-menu-out 220ms var(--ease-out-soft);
  }
  .mh-menu[data-state="open"] .mh-menu-item {
    animation: mh-menu-item 600ms var(--ease-out-soft) both;
    animation-delay: calc(80ms + var(--i, 0) * 60ms);
  }
}
@keyframes mh-menu-in {
  from {
    opacity: 0;
  }
}
@keyframes mh-menu-out {
  to {
    opacity: 0;
  }
}
@keyframes mh-menu-item {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
}
</style>
