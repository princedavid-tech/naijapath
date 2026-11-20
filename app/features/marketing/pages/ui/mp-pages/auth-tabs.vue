<template>
  <TabsRoot v-model="mode" :class="props.class">
    <TabsList
      :aria-label="a.tabsLabel"
      class="relative grid grid-cols-2 gap-1 rounded-full border border-hairline bg-cream p-1"
    >
      <!-- The white pill slides between the tabs instead of jumping. -->
      <span
        aria-hidden="true"
        :class="
          cn(
            'absolute top-1 bottom-1 left-1 w-[calc(50%-0.375rem)] rounded-full bg-white shadow-soft transition-transform duration-300 ease-out-soft',
            mode === 'sign-up' && 'translate-x-[calc(100%+0.25rem)]',
          )
        "
      />
      <TabsTrigger
        v-for="tab in TABS"
        :key="tab.value"
        :value="tab.value"
        class="relative min-h-11 rounded-full px-4 text-[0.9375rem] font-medium text-body transition-colors duration-300 ease-out-soft hover:text-ink data-[state=active]:text-ink"
      >
        {{ tab.label }}
      </TabsTrigger>
    </TabsList>

    <!-- Both panels stay mounted (form state survives a switch). The outgoing one fades and
         slides out on top of the incoming one while this frame eases to the new height, so
         nothing below it jumps. The 8px padding keeps focus rings clear of the clipping. -->
    <div
      class="-mx-2 mt-4 overflow-hidden px-2 py-2 transition-[height] duration-300 ease-out-soft"
      :style="height === null ? undefined : { height: `${height}px` }"
    >
      <div class="relative">
        <TabsContent
          v-for="tab in TABS"
          :key="tab.value"
          :value="tab.value"
          force-mount
          :class="panelClass(tab.value)"
        >
          <div :ref="(el) => setPanel(tab.value, el)">
            <MpPagesSignInForm v-if="tab.value === 'sign-in'" />
            <MpPagesSignUpForm v-else />
          </div>
        </TabsContent>
      </div>
    </div>
  </TabsRoot>
</template>

<script setup lang="ts">
/**
 * Sign in / Sign up tabs (Reka UI: roles, arrow keys and states handled) with a smooth switch:
 * sliding pill, cross-fade, and an animated height that also follows the panels as they grow
 * (password step, error messages). Under reduced motion the global rule makes it instant.
 * The inactive panel is `invisible`: out of the tab order and the accessibility tree.
 */
import { onBeforeUnmount, onMounted, ref, watch, type HTMLAttributes } from "vue";
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from "reka-ui";
import { cn } from "~/utils/utils";
import { PAGES_MICROCOPY } from "../../domain/pages-microcopy";

type Mode = "sign-in" | "sign-up";

const props = defineProps<{ class?: HTMLAttributes["class"] }>();
const mode = defineModel<Mode>({ default: "sign-in" });

const a = PAGES_MICROCOPY.auth;
const TABS = [
  { value: "sign-in", label: a.tabSignIn },
  { value: "sign-up", label: a.tabSignUp },
] as const;

function panelClass(value: Mode) {
  const active = value === mode.value;
  return cn(
    "transition-[opacity,translate,visibility] duration-300 ease-out-soft",
    active
      ? "relative visible translate-x-0 opacity-100"
      : "invisible absolute inset-x-0 top-0 opacity-0",
    !active && (value === "sign-in" ? "-translate-x-6" : "translate-x-6"),
  );
}

// ── Animated height ──────────────────────────────────────────────────
const PADDING_Y = 16; // py-2 top + bottom
const panels: Partial<Record<Mode, HTMLElement>> = {};
const height = ref<number | null>(null); // null = natural height (SSR, before measuring)
let observer: ResizeObserver | undefined;

function setPanel(value: Mode, el: unknown) {
  if (el instanceof HTMLElement) panels[value] = el;
}

function measure() {
  const el = panels[mode.value];
  if (el) height.value = el.offsetHeight + PADDING_Y;
}

onMounted(() => {
  measure();
  observer = new ResizeObserver(measure);
  for (const el of Object.values(panels)) if (el) observer.observe(el);
});
onBeforeUnmount(() => observer?.disconnect());
watch(mode, measure);
</script>
