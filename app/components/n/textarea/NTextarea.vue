<template>
  <textarea
    :id="props.id"
    v-model="model"
    data-slot="textarea"
    :name="props.name"
    :rows="props.rows"
    :maxlength="props.maxlength"
    :placeholder="props.placeholder"
    :required="props.required"
    :disabled="props.disabled"
    :aria-invalid="props.invalid ? 'true' : undefined"
    :aria-describedby="props.describedby || undefined"
    :class="
      cn(
        'block min-h-32 w-full min-w-0 resize-y rounded-sm border bg-white px-4 py-3 font-sans text-base leading-relaxed text-ink',
        'placeholder:text-body transition-[border-color,box-shadow] duration-200 ease-out-soft',
        'border-body focus:border-forest focus:shadow-[inset_0_0_0_1px_var(--forest)]',
        'disabled:cursor-not-allowed disabled:bg-cream',
        props.invalid &&
          'border-danger-500 shadow-[inset_0_0_0_1px_var(--danger-500)] focus:border-danger-500',
        props.class,
      )
    "
  />
</template>

<script setup lang="ts">
/**
 * Multi-line text field. Same frame as NInput (16px text, error = 2px red border AND a linked
 * text message, never colour alone).
 */
import type { HTMLAttributes } from "vue";
import { cn } from "~/utils/utils";

const model = defineModel<string>({ default: "" });

const props = withDefaults(
  defineProps<{
    id: string;
    name?: string;
    rows?: number;
    maxlength?: number;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    invalid?: boolean;
    describedby?: string;
    class?: HTMLAttributes["class"];
  }>(),
  { rows: 5 },
);
</script>
