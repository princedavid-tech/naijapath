<template>
  <button
    type="button"
    class="-mr-2 inline-flex size-11 shrink-0 items-center justify-center rounded-full text-body transition-colors duration-200 ease-out-soft hover:bg-ink/5 hover:text-ink"
    :aria-label="PAGES_MICROCOPY.auth.showPassword"
    :aria-pressed="shown ? 'true' : 'false'"
    :aria-controls="props.controls"
    @click="shown = !shown"
  >
    <NIcon :name="shown ? 'eye-off' : 'eye'" :size="20" />
  </button>
</template>

<script setup lang="ts">
/** Show/hide password: one fixed label ("Show password") with aria-pressed for the state. */
import { PAGES_MICROCOPY } from "../../domain/pages-microcopy";

const shown = defineModel<boolean>({ required: true });
const props = defineProps<{ controls: string }>();
</script>
