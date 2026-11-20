<template>
  <div data-slot="field" :class="props.class">
    <NLabel :for="props.id" :required="props.required">
      {{ props.label }}
      <span v-if="props.optional" class="font-normal">
        {{ PAGES_MICROCOPY.common.optional }}
      </span>
    </NLabel>
    <p v-if="props.hint" :id="hintId" class="mt-1 text-sm text-body">{{ props.hint }}</p>
    <div class="mt-2">
      <slot :describedby="describedby" :invalid="Boolean(props.error)" />
    </div>
    <NFieldError v-if="props.error" :id="errorId" class="mt-2">{{ props.error }}</NFieldError>
  </div>
</template>

<script setup lang="ts">
/**
 * Label + optional hint + control + error, wired for assistive tech: the slot receives the
 * `describedby` ids (hint, then error) and `invalid` to pass to the control.
 */
import { computed, type HTMLAttributes } from "vue";
import { PAGES_MICROCOPY } from "../../domain/pages-microcopy";

const props = defineProps<{
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  error?: string;
  class?: HTMLAttributes["class"];
}>();

const hintId = computed(() => `${props.id}-hint`);
const errorId = computed(() => `${props.id}-error`);
const describedby = computed(
  () =>
    [props.hint ? hintId.value : "", props.error ? errorId.value : ""].filter(Boolean).join(" ") ||
    undefined,
);
</script>
