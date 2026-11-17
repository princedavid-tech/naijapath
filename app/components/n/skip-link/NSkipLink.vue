<template>
  <a
    :href="`#${props.target}`"
    data-slot="skip-link"
    class="fixed top-3 left-3 z-[100] -translate-y-24 rounded-sm bg-green-500 px-4 py-3 font-heading font-semibold text-base-0 shadow-card transition-transform duration-200 ease-brand focus:translate-y-0"
  >
    <slot>Skip to main content</slot>
  </a>
</template>

<script setup lang="ts">
/** First focusable element on the page. Target must be focusable (`tabindex="-1"`). */
const props = withDefaults(defineProps<{ target?: string }>(), { target: "main" });
</script>
