<template>
  <label
    data-slot="checkbox"
    :for="props.id"
    :class="
      cn('flex min-h-11 cursor-pointer items-start gap-3 py-2.5 text-base text-body', props.class)
    "
  >
    <input
      :id="props.id"
      v-model="model"
      type="checkbox"
      :name="props.name"
      :required="props.required"
      :disabled="props.disabled"
      :aria-invalid="props.invalid ? 'true' : undefined"
      :aria-describedby="props.describedby || undefined"
      :class="
        cn(
          'mt-0.5 size-5 shrink-0 cursor-pointer rounded-[4px] accent-forest',
          props.invalid && 'outline-2 outline-offset-2 outline-danger-500',
        )
      "
    />
    <span class="leading-snug"><slot /></span>
  </label>
</template>

<script setup lang="ts">
/**
 * Native checkbox with its label as one 44px-tall hit area. Error = red outline AND a linked
 * text message (never colour alone).
 */
import type { HTMLAttributes } from "vue";
import { cn } from "~/utils/utils";

const model = defineModel<boolean>({ default: false });

const props = defineProps<{
  id: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  describedby?: string;
  class?: HTMLAttributes["class"];
}>();
</script>
