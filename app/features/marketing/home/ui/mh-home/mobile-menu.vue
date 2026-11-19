<template>
  <DialogRoot v-model:open="open">
    <DialogPortal>
      <DialogOverlay class="mh-menu-overlay fixed inset-0 z-50 bg-base-900/50" />
      <DialogContent
        class="mh-menu-panel fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-base-0 shadow-card-hover focus:outline-none"
        @close-auto-focus="onCloseAutoFocus"
      >
        <div
          class="flex h-[var(--header-h)] items-center justify-between border-b border-base-150 px-4"
        >
          <DialogTitle class="font-heading text-lg font-semibold text-base-900">
            {{ MICROCOPY.a11y.mobileMenuTitle }}
          </DialogTitle>
          <DialogDescription class="sr-only">{{ MICROCOPY.a11y.primaryNav }}</DialogDescription>
          <DialogClose
            :class="cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'text-green-500')"
            :aria-label="MICROCOPY.a11y.closeMenu"
          >
            <NIcon name="close" :size="24" />
          </DialogClose>
        </div>

        <nav :aria-label="MICROCOPY.a11y.primaryNav" class="flex-1 overflow-y-auto px-4 py-4">
          <ul class="flex flex-col">
            <li v-for="link in NAV_COPY.links" :key="link.label" class="border-b border-base-150">
              <a
                :href="link.to"
                :class="
                  cn(
                    'flex min-h-14 items-center font-heading text-lg',
                    link.audience === 'organisation'
                      ? 'font-semibold text-green-500'
                      : 'font-medium text-base-600',
                  )
                "
                @click.prevent="go(link.to)"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </nav>

        <!-- Both CTAs as stacked full-width buttons (brief §01 mobile). -->
        <div
          class="flex flex-col gap-3 border-t border-base-150 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]"
        >
          <NButton :to="NAV_COPY.ctaFilled.to" color="accent" shape="pill" size="lg" class="w-full">
            {{ NAV_COPY.ctaFilled.label }}
          </NButton>
          <NButton
            :to="NAV_COPY.ctaGhost.to"
            variant="outline"
            shape="pill"
            size="lg"
            class="w-full"
          >
            {{ NAV_COPY.ctaGhost.label }}
          </NButton>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
/**
 * Mobile / tablet menu sheet (Reka UI Dialog). Loaded on demand by site-header.vue so Reka is
 * not in the initial bundle. Focus is trapped while open, Esc closes, and focus returns to the
 * element that opened it (the hamburger) — or moves to the chosen section when a link was used.
 */
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
} from "reka-ui";
import { buttonVariants } from "~/components/n/button/button-variants";
import { cn } from "~/utils/utils";
import { hashTargetId, scrollToSection } from "~/utils/scroll";
import { NAV_COPY } from "../../domain/home-copy";
import { MICROCOPY } from "../../domain/home-microcopy";

const open = defineModel<boolean>("open", { required: true });
let pendingTarget: string | null = null;

/** Close the sheet first (it locks body scroll), then navigate once focus handling runs. */
function go(to: string) {
  pendingTarget = to;
  open.value = false;
}

function onCloseAutoFocus(event: Event) {
  if (!pendingTarget) return; // normal close → focus returns to the hamburger
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
  .mh-menu-overlay[data-state="open"] {
    animation: mh-fade-in var(--dur-ui) var(--ease-brand);
  }
  .mh-menu-overlay[data-state="closed"] {
    animation: mh-fade-out var(--dur-ui) var(--ease-brand);
  }
  .mh-menu-panel[data-state="open"] {
    animation: mh-slide-in 280ms var(--ease-brand);
  }
  .mh-menu-panel[data-state="closed"] {
    animation: mh-slide-out var(--dur-ui) var(--ease-brand);
  }
}
@keyframes mh-fade-in {
  from {
    opacity: 0;
  }
}
@keyframes mh-fade-out {
  to {
    opacity: 0;
  }
}
@keyframes mh-slide-in {
  from {
    transform: translateX(100%);
  }
}
@keyframes mh-slide-out {
  to {
    transform: translateX(100%);
  }
}
</style>
