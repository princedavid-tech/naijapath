<template>
  <!-- Announces sending / success / errors without moving focus. Always rendered so the
       live region exists before the first message. -->
  <p
    role="status"
    aria-live="polite"
    :class="
      cn(
        'flex min-h-6 items-start gap-1.5 text-sm font-medium',
        props.state === 'error'
          ? 'text-danger-500'
          : props.state === 'success'
            ? 'text-success-500'
            : 'text-body',
        props.class,
      )
    "
  >
    <NIcon
      v-if="props.state === 'success'"
      name="check-circle"
      :size="18"
      weight="bold"
      class="mt-px"
    />
    <NIcon
      v-else-if="props.state === 'error'"
      name="error"
      :size="18"
      weight="bold"
      class="mt-px"
    />
    <span>{{ props.message }}</span>
  </p>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "~/utils/utils";
import type { MpSubmitState } from "../../composition/use-mp-submit";

const props = defineProps<{
  state: MpSubmitState;
  message: string;
  class?: HTMLAttributes["class"];
}>();
</script>
