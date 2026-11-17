<template>
  <span
    data-slot="status"
    :class="cn(statusVariants({ tone: def.tone, size: props.size }), props.class)"
  >
    <NIcon v-if="def.icon" :name="def.icon" :size="14" weight="bold" />
    <span v-else class="size-1.5 rounded-full bg-current" aria-hidden="true" />
    <span>{{ def.label }}</span>
  </span>
</template>

<script setup lang="ts">
/**
 * Status pill — colour AND text, always (Design Guidelines: never colour alone).
 * `<NStatus status="confirmed" />` — raw backend strings go through the resolver's alias table.
 */
import { computed, type HTMLAttributes } from "vue";
import { resolveStatus, type StatusVariants } from "~/utils/status";
import { statusVariants } from "~/utils/status";
import { cn } from "~/utils/utils";

const props = defineProps<{
  status: string;
  size?: StatusVariants["size"];
  class?: HTMLAttributes["class"];
}>();

const def = computed(() => resolveStatus(props.status));
</script>
