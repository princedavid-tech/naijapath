<template>
  <NuxtRouteAnnouncer />
  <NuxtPage />
</template>

<script setup lang="ts">
// Marks the document as JS-capable before first paint. Reveal styles only hide content
// under `.js`, so no-JS visitors (and crawlers) always see everything.
useHead({
  script: [
    {
      key: "js-flag",
      innerHTML: "document.documentElement.classList.add('js')",
      tagPosition: "head",
    },
  ],
});
</script>
