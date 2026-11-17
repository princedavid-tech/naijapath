<template>
  <a
    v-if="kind === 'hash'"
    data-slot="link"
    :href="hashHref"
    :class="props.class"
    v-bind="$attrs"
    @click="onHashClick"
  >
    <slot />
  </a>
  <a
    v-else-if="kind === 'external'"
    data-slot="link"
    :href="props.to"
    :class="props.class"
    rel="noopener noreferrer"
    target="_blank"
    v-bind="$attrs"
  >
    <slot />
    <span class="sr-only"> (opens in a new tab)</span>
  </a>
  <a
    v-else-if="kind === 'file'"
    data-slot="link"
    :href="props.to"
    :class="props.class"
    download
    v-bind="$attrs"
  >
    <slot />
  </a>
  <a
    v-else-if="kind === 'document'"
    data-slot="link"
    :href="props.to"
    :class="props.class"
    v-bind="$attrs"
  >
    <slot />
  </a>
  <NuxtLink v-else data-slot="link" :to="props.to" :class="props.class" v-bind="$attrs">
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
/**
 * The one link primitive. Routing is not a port — paths live in `domain/*-routes.ts`
 * (ARCHITECTURE.md §9.2).
 *
 * In-page anchors (`#id`, or `/#id` while on `/`) scroll smoothly (instantly under reduced
 * motion), update the URL and MOVE FOCUS to the target section. Without JS they fall back to
 * a native fragment jump (CSS `scroll-behavior` + `scroll-padding-top` still apply).
 */
import { computed, type HTMLAttributes } from "vue";
import { hashTargetId, scrollToSection } from "~/utils/scroll";

defineOptions({ inheritAttrs: false });

const props = defineProps<{
  to: string;
  class?: HTMLAttributes["class"];
}>();

const emit = defineEmits<{ navigate: [event: MouseEvent] }>();

const route = useRoute();
const router = useRouter();

const kind = computed<"hash" | "external" | "file" | "internal" | "document">(() => {
  if (props.to.startsWith("#")) return "hash";
  if (props.to.startsWith("/#") && route.path === "/") return "hash";
  if (/^(https?:)?\/\//.test(props.to) || props.to.startsWith("mailto:")) return "external";
  if (/\.(pdf|docx?|xlsx?|pptx?)$/i.test(props.to)) return "file";
  // Paths served by another app (platform: booking, sign-in…) are plain document links —
  // no client-side routing attempt, no router warnings, fully crawlable.
  const path = props.to.split(/[?#]/)[0] || "/";
  const owned = router.getRoutes().some((r) => r.path === path);
  return owned ? "internal" : "document";
});

const hashHref = computed(() => (props.to.startsWith("/#") ? props.to.slice(1) : props.to));

function onHashClick(event: MouseEvent) {
  emit("navigate", event);
  if (event.defaultPrevented || event.button !== 0) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const id = hashTargetId(props.to);
  if (id && scrollToSection(id)) event.preventDefault();
}
</script>
