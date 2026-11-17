<template>
  <div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
    <!-- 1 · Colour: warm terracotta sun behind the photo, deep mint pool below it, a white
         lift behind the headline (white only raises text contrast). -->
    <div class="hp-glow hp-glow--sun" />
    <div class="hp-glow hp-glow--pool" />
    <div class="hp-glow hp-glow--lift" />

    <!-- 2 · Texture: fine dot grid, masked so it never sits behind the copy. -->
    <div class="hp-dots absolute inset-0" />

    <!-- 3 · Ripple rings radiating from behind the photograph. -->
    <svg
      viewBox="-500 -500 1000 1000"
      class="hp-rings absolute top-[66%] left-1/2 size-[44rem] -translate-1/2 sm:top-[68%] lg:top-1/2 lg:left-[76%] lg:size-[64rem]"
      fill="none"
    >
      <circle
        v-for="(r, i) in RINGS"
        :key="r"
        :r="r"
        stroke="var(--green-500)"
        :stroke-opacity="0.2 - i * 0.03"
        stroke-width="1.25"
      />
      <circle
        class="hp-orbit"
        r="300"
        stroke="var(--terracotta-500)"
        stroke-opacity="0.45"
        stroke-width="2"
        stroke-dasharray="2 14"
        stroke-linecap="round"
      />
    </svg>

    <!-- 4 · The path: rises from under the CTAs, runs behind the photo, exits top-right.
         Desktop only — when stacked it would cross the copy. -->
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      class="absolute inset-0 hidden size-full lg:block"
      fill="none"
    >
      <path
        :d="PATH"
        stroke="var(--green-150)"
        stroke-width="26"
        stroke-linecap="round"
        stroke-opacity="0.7"
      />
      <path
        class="hp-draw"
        :d="PATH"
        pathLength="1"
        stroke="var(--green-500)"
        stroke-width="2.5"
        stroke-linecap="round"
      />
      <g
        v-for="([x, y], i) in NODES"
        :key="i"
        class="hp-node"
        :style="{ '--d': `${300 + i * 180}ms` }"
      >
        <circle
          :cx="x"
          :cy="y"
          r="9"
          fill="var(--base-0)"
          stroke="var(--green-500)"
          stroke-width="3"
        />
      </g>
      <g class="hp-node" style="--d: 1300ms">
        <circle class="hp-pulse" :cx="GOAL[0]" :cy="GOAL[1]" r="14" fill="var(--terracotta-500)" />
        <circle :cx="GOAL[0]" :cy="GOAL[1]" r="11" fill="var(--terracotta-500)" />
        <circle :cx="GOAL[0]" :cy="GOAL[1]" r="4" fill="var(--base-0)" />
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
/**
 * Hero backdrop — "The Path". Purely decorative (aria-hidden), pure SVG + CSS: it paints with
 * the first frame (no WebGL, no JS), so it carries the first glance. The headline stays the
 * hero: nothing but the white lift sits behind the copy, and the path runs beneath the CTAs.
 * All motion is off under prefers-reduced-motion.
 */
const RINGS = [170, 240, 330, 420, 490];

// 1600×900 space (xMidYMid slice). Low band under the CTAs, then up behind the photo.
const PATH =
  "M -40 868 C 140 846 240 806 360 812 S 560 858 700 842 S 900 800 1010 700 S 1180 420 1320 300 S 1500 150 1660 70";
const NODES: Array<[number, number]> = [
  [150, 840],
  [360, 812],
  [560, 846],
  [770, 828],
];
const GOAL: [number, number] = [1478, 170];
</script>

<style scoped>
.hp-glow {
  position: absolute;
  border-radius: 9999px;
}
/* Mobile: the photo sits low in the stack, so the colour sits low too. */
.hp-glow--sun {
  width: 40rem;
  height: 40rem;
  left: 50%;
  top: 58%;
  translate: -50% -50%;
  background: radial-gradient(closest-side, rgb(231 187 168 / 0.75), rgb(231 187 168 / 0));
}
.hp-glow--pool {
  width: 46rem;
  height: 34rem;
  left: 20%;
  top: 92%;
  translate: -50% -50%;
  background: radial-gradient(closest-side, rgb(207 227 214 / 0.95), rgb(207 227 214 / 0));
}
.hp-glow--lift {
  width: 52rem;
  height: 36rem;
  left: 18%;
  top: 12%;
  translate: -50% -50%;
  background: radial-gradient(closest-side, rgb(255 255 255 / 0.85), rgb(255 255 255 / 0));
}
@media (width >= 64rem) {
  .hp-glow--sun {
    width: 58rem;
    height: 58rem;
    left: 80%;
    top: 30%;
  }
  .hp-glow--pool {
    width: 70rem;
    height: 42rem;
    left: 66%;
    top: 96%;
  }
  .hp-glow--lift {
    width: 64rem;
    height: 44rem;
    left: 24%;
    top: 40%;
  }
}

.hp-dots {
  background-image: radial-gradient(rgb(27 107 58 / 0.16) 1px, transparent 1.5px);
  background-size: 22px 22px;
  mask-image: radial-gradient(ellipse 60% 70% at 50% 85%, #000 20%, transparent 75%);
}
@media (width >= 64rem) {
  .hp-dots {
    mask-image: radial-gradient(ellipse 45% 75% at 80% 50%, #000 15%, transparent 70%);
  }
}

.hp-rings {
  mask-image: radial-gradient(closest-side, #000 55%, transparent 100%);
}
.hp-orbit,
.hp-node,
.hp-pulse {
  transform-box: fill-box;
  transform-origin: center;
}

@media (prefers-reduced-motion: no-preference) {
  .hp-glow--sun {
    animation: hp-drift 16s ease-in-out infinite alternate;
  }
  .hp-glow--pool {
    animation: hp-drift 20s ease-in-out -6s infinite alternate-reverse;
  }
  .hp-orbit {
    animation: hp-spin 80s linear infinite;
  }
  .hp-draw {
    stroke-dasharray: 1;
    animation: hp-draw var(--dur-path) var(--ease-brand) 200ms both;
  }
  .hp-node {
    animation: hp-pop 400ms var(--ease-brand) var(--d, 0ms) both;
  }
  .hp-pulse {
    animation: hp-pulse 2.4s ease-out 1.7s 4 both;
  }
}

@keyframes hp-drift {
  to {
    transform: translate(3rem, -2rem) scale(1.08);
  }
}
@keyframes hp-spin {
  to {
    transform: rotate(360deg);
  }
}
@keyframes hp-draw {
  from {
    stroke-dashoffset: 1;
  }
  to {
    stroke-dashoffset: 0;
  }
}
@keyframes hp-pop {
  from {
    opacity: 0;
    transform: scale(0.2);
  }
}
@keyframes hp-pulse {
  from {
    opacity: 0.5;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(3.2);
  }
}
</style>
