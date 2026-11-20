<template>
  <div data-slot="select" :class="cn('relative', props.class)">
    <select
      :id="props.id"
      v-model="model"
      :name="props.name"
      :required="props.required"
      :disabled="props.disabled"
      :autocomplete="props.autocomplete"
      :aria-invalid="props.invalid ? 'true' : undefined"
      :aria-describedby="props.describedby || undefined"
      :class="
        cn(
          'min-h-12 w-full min-w-0 appearance-none rounded-sm border bg-white py-3 pr-12 pl-4 font-sans text-base text-ink',
          'transition-[border-color,box-shadow] duration-200 ease-out-soft',
          'border-body focus:border-forest focus:shadow-[inset_0_0_0_1px_var(--forest)]',
          'disabled:cursor-not-allowed disabled:bg-cream',
          props.invalid &&
            'border-danger-500 shadow-[inset_0_0_0_1px_var(--danger-500)] focus:border-danger-500',
        )
      "
    >
      <option value="" disabled>{{ props.placeholder }}</option>
      <option v-for="option in props.options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <NIcon
      name="chevron-down"
      :size="20"
      class="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-body"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * Native select (best keyboard, screen-reader and mobile-picker support) in the NInput frame.
 * The empty first option is the prompt; it can't be re-chosen, so `required` validates.
 */
import type { HTMLAttributes } from "vue";
import { cn } from "~/utils/utils";

const model = defineModel<string>({ default: "" });

const props = withDefaults(
  defineProps<{
    id: string;
    options: ReadonlyArray<{ value: string; label: string }>;
    placeholder?: string;
    name?: string;
    autocomplete?: string;
    required?: boolean;
    disabled?: boolean;
    invalid?: boolean;
    describedby?: string;
    class?: HTMLAttributes["class"];
  }>(),
  { placeholder: "Choose one" },
);
</script>
