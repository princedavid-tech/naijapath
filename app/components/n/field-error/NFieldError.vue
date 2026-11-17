<template>
  <p
    :id="props.id"
    data-slot="field-error"
    :class="
      cn(
        'flex items-start gap-1.5 text-sm font-medium',
        props.surface === 'dark' ? 'text-danger-100' : 'text-danger-500',
        props.class,
      )
    "
  >
    <NIcon name="error" :size="18" weight="bold" class="mt-px" />
    <span><slot /></span>
  </p>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "~/utils/utils";

const props = withDefaults(
  defineProps<{ id: string; surface?: "light" | "dark"; class?: HTMLAttributes["class"] }>(),
  { surface: "light" },
);
</script>
