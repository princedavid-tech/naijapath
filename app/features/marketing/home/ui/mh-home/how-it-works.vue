<template>
  <!-- §2.5 The 5-Stage Delivery Standard (redesign-v3). Sand sheet. Desktop: the left column
       stays pinned while the right-hand stepper scrolls; a forest line draws down the rail and a
       white plate slides behind the active stage. Phones / reduced motion: a plain list, all
       stages fully shown. -->
  <section
    :id="HOME_SECTION_IDS.howItWorks"
    ref="root"
    tabindex="-1"
    aria-labelledby="how-heading"
    :data-live="live || undefined"
    class="sheet mt-3 bg-sand md:mt-4"
  >
    <div class="site-container section-y grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-x-12">
      <!-- Left: pinned on desktop. -->
      <header class="lg:col-span-5">
        <div class="lg:sticky lg:top-28">
          <NEyebrow>{{ copy.label }}</NEyebrow>
          <h2 id="how-heading" class="mt-5 text-title text-ink">{{ copy.headline }}</h2>
          <p class="measure mt-6 text-copy text-body">{{ copy.subheadline }}</p>

          <!-- The live stage numeral (decorative; each stage carries its own number). -->
          <div aria-hidden="true" class="mt-12 hidden lg:block">
            <span class="mh-how-numeral tabular">
              <span
                v-for="(stage, i) in copy.stages"
                :key="stage.number"
                :class="['mh-how-numeral-digit', i === active && 'is-on']"
                >{{ stage.number }}</span
              >
            </span>
          </div>
        </div>
      </header>

      <!-- Right: the stepper. -->
      <ol ref="list" :aria-label="MICROCOPY.a11y.stagesListLabel" class="relative lg:col-span-7">
        <!-- Rail + drawn progress line. -->
        <span
          aria-hidden="true"
          class="absolute top-2 bottom-2 left-[1.0625rem] w-0.5 rounded-full bg-forest/15 lg:left-[1.3125rem]"
        >
          <span ref="fill" class="absolute inset-0 rounded-full bg-forest" />
        </span>

        <!-- Sliding white plate behind the active stage (desktop, motion on). -->
        <span
          v-if="live"
          aria-hidden="true"
          class="mh-how-plate pointer-events-none absolute right-0 left-12 rounded-card bg-sheet shadow-soft lg:left-16"
          :style="plateStyle"
        />

        <li
          v-for="(stage, i) in copy.stages"
          :key="stage.number"
          :ref="(el) => setStage(el as HTMLElement | null, i)"
          :data-state="stateOf(i)"
          class="mh-how-stage relative grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-5 py-4 lg:grid-cols-[2.75rem_minmax(0,1fr)] lg:gap-x-8"
        >
          <!-- Rail node. -->
          <span aria-hidden="true" class="relative z-10 mt-7 flex justify-center lg:mt-9">
            <span class="mh-how-node size-3.5 rounded-full border-2 border-forest bg-sand" />
          </span>

          <div class="relative z-10 px-1 py-5 lg:px-8 lg:py-8">
            <div class="flex items-baseline gap-5">
              <p
                aria-hidden="true"
                class="mh-how-num tabular text-[clamp(2.5rem,2rem+1.8vw,3.75rem)] leading-none font-medium tracking-[-0.03em] text-forest"
              >
                {{ stage.number }}
              </p>
              <h3 class="mh-how-name text-subtitle text-ink">
                <span class="sr-only">Stage {{ stage.number }}: </span>{{ stage.name }}
              </h3>
            </div>
            <p class="measure mt-4 text-copy text-body">{{ stage.copy }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * §2.5 How NaijaPath Works (redesign-v3).
 * Signature: as the visitor scrolls, the forest line draws down the rail (scrubbed) and a white
 * plate slides to the stage in the middle of the viewport — the same "sliding indicator" idea as
 * the header nav. Passed stages keep a filled node; the active one gets the ember node.
 * Every stage stays readable when inactive (body colour, 5.9:1 on sand) — nothing fades to 40%.
 * Motion only at ≥1024px with motion allowed; otherwise a plain, fully visible list.
 */
import { computed, nextTick, ref } from "vue";
import { HOW_IT_WORKS_COPY } from "../../domain/home-copy";
import { HOME_SECTION_IDS } from "../../domain/home-routes";
import { MICROCOPY } from "../../domain/home-microcopy";

const copy = HOW_IT_WORKS_COPY;
const root = ref<HTMLElement | null>(null);
const list = ref<HTMLElement | null>(null);
const fill = ref<HTMLElement | null>(null);
const stages: HTMLElement[] = [];
const setStage = (el: HTMLElement | null, i: number) => {
  if (el) stages[i] = el;
};

const live = ref(false);
const active = ref(0);
const plate = ref({ y: 0, h: 0 });

const stateOf = (i: number) =>
  !live.value ? "static" : i === active.value ? "active" : i < active.value ? "passed" : "next";

const plateStyle = computed(() => ({
  transform: `translateY(${plate.value.y}px)`,
  height: `${plate.value.h}px`,
}));

function placePlate() {
  const el = stages[active.value];
  if (!el) return;
  plate.value = { y: el.offsetTop + 8, h: el.offsetHeight - 16 };
}

useScrollMotion(root, ({ gsap, ScrollTrigger }) => {
  const mm = gsap.matchMedia();
  mm.add("(min-width: 64rem)", () => {
    live.value = true;
    void nextTick(placePlate);

    // The line draws as the list scrolls through the middle of the viewport.
    gsap.fromTo(
      fill.value,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        transformOrigin: "top center",
        scrollTrigger: { trigger: list.value, start: "top 55%", end: "bottom 55%", scrub: 0.6 },
      },
    );

    // The stage crossing the middle of the viewport becomes active.
    stages.forEach((el, i) => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 55%",
        end: "bottom 55%",
        onToggle: (self) => {
          if (self.isActive) {
            active.value = i;
            placePlate();
          }
        },
      });
    });

    const onResize = () => placePlate();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      live.value = false;
    };
  });
  return () => mm.revert();
});
</script>

<style scoped>
.mh-how-plate {
  top: 0;
  transition:
    transform 600ms var(--ease-out-soft),
    height 600ms var(--ease-out-soft);
}

[data-live] .mh-how-num {
  transition: opacity 400ms var(--ease-out-soft);
}
/* Not-yet-reached numbers recede (forest at 70%: 3.4:1 on sand — large text). Names and copy
   stay at full readable contrast. */
[data-live] .mh-how-stage[data-state="next"] .mh-how-num {
  opacity: 0.7;
}
.mh-how-node {
  transition:
    background-color 400ms var(--ease-out-soft),
    border-color 400ms var(--ease-out-soft),
    transform 400ms var(--ease-out-soft);
}
.mh-how-stage[data-state="static"] .mh-how-node,
.mh-how-stage[data-state="passed"] .mh-how-node {
  background-color: var(--forest);
}
.mh-how-stage[data-state="active"] .mh-how-node {
  background-color: var(--ember);
  border-color: var(--ember);
  transform: scale(1.35);
}

/* Big outlined numeral in the pinned column: the active stage's number fills in. */
.mh-how-numeral {
  display: inline-grid;
  font-size: clamp(7rem, 4rem + 7vw, 11rem);
  line-height: 0.85;
  font-weight: 500;
  letter-spacing: -0.05em;
}
.mh-how-numeral-digit {
  grid-area: 1 / 1;
  color: transparent;
  -webkit-text-stroke: 1.5px color-mix(in oklab, var(--forest) 60%, transparent);
  opacity: 0;
  transform: translateY(0.12em);
  transition:
    opacity 500ms var(--ease-out-soft),
    transform 600ms var(--ease-out-soft);
}
.mh-how-numeral-digit.is-on {
  opacity: 1;
  transform: none;
}
</style>
