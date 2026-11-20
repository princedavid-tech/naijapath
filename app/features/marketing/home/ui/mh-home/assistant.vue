<template>
  <!-- Floating chat launcher (bottom-right). The panel's JS loads on the first open only. -->
  <div class="mh-assistant pointer-events-none fixed right-0 bottom-0 z-30">
    <LazyMhHomeAssistantPanel v-if="mounted" v-model:open="open" @closed="onClosed" />
    <button
      ref="launcher"
      type="button"
      :class="
        cn(
          'mh-assistant-launch pointer-events-auto absolute right-[var(--sheet-inset)] bottom-[max(var(--sheet-inset),env(safe-area-inset-bottom))]',
          'inline-flex h-14 min-w-14 items-center justify-center gap-2.5 rounded-full bg-forest px-4 whitespace-nowrap text-white shadow-lift sm:pr-5',
          'transition-[background-color,transform] duration-200 ease-out-soft hover:bg-forest-deep active:scale-[0.97]',
          // Forest ring + white halo: visible over light AND dark sections.
          'focus-visible:shadow-[0_0_0_2px_#fff]',
        )
      "
      :aria-expanded="open ? 'true' : 'false'"
      aria-controls="mh-assistant"
      @click="toggle"
    >
      <NIcon :name="open ? 'close' : 'whatsapp'" :size="26" :stroke="1.75" />
      <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">{{
        open ? copy.close : copy.launcher
      }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
/**
 * Homepage chat assistant launcher. Server-rendered so it paints with the page; the panel
 * (assistant-panel.vue) is a separate lazy chunk, fetched on first open.
 */
import { nextTick, ref } from "vue";
import { cn } from "~/utils/utils";
import { MICROCOPY } from "../../domain/home-microcopy";

const copy = MICROCOPY.assistant;
const open = ref(false);
const mounted = ref(false);
const launcher = ref<HTMLButtonElement | null>(null);

function toggle() {
  mounted.value = true;
  open.value = !open.value;
}

/** Panel closed from inside (Escape, close button, a link): focus returns to the launcher. */
async function onClosed() {
  await nextTick();
  launcher.value?.focus();
}
</script>

<style scoped>
@media (prefers-reduced-motion: no-preference) {
  .mh-assistant-launch {
    animation: mh-assistant-in 600ms var(--ease-out-soft) 1.2s both;
  }
}
@keyframes mh-assistant-in {
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.96);
  }
}
</style>
