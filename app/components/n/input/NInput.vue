<template>
  <input
    :id="props.id"
    v-model="model"
    data-slot="input"
    :type="props.type"
    :name="props.name"
    :autocomplete="props.autocomplete"
    :inputmode="props.inputmode"
    :placeholder="props.placeholder"
    :required="props.required"
    :disabled="props.disabled"
    :aria-invalid="props.invalid ? 'true' : undefined"
    :aria-describedby="props.describedby || undefined"
    :class="
      cn(
        'min-h-12 w-full min-w-0 rounded-sm border bg-base-0 px-4 py-3 font-body text-base text-base-900',
        'placeholder:text-base-500 transition-[border-color,box-shadow] duration-200 ease-brand',
        'border-base-500 focus:border-green-500 focus:shadow-[inset_0_0_0_1px_var(--green-500)]',
        'disabled:cursor-not-allowed disabled:bg-base-100',
        props.invalid &&
          (props.surface === 'dark'
            ? 'border-danger-100 shadow-[0_0_0_1px_var(--danger-100)] focus:border-danger-100'
            : 'border-danger-500 shadow-[inset_0_0_0_1px_var(--danger-500)] focus:border-danger-500'),
        props.class,
      )
    "
  />
</template>

<script setup lang="ts">
/**
 * Text input. 16px text (prevents iOS zoom-on-focus). Error = 2px red border AND a text
 * message linked via `aria-describedby` (never colour alone).
 * `surface="dark"` switches the error colour to the light red that passes on dark green.
 */
import type { HTMLAttributes, InputTypeHTMLAttribute } from "vue";
import { cn } from "~/utils/utils";

const model = defineModel<string>({ default: "" });

const props = withDefaults(
  defineProps<{
    id: string;
    name?: string;
    type?: InputTypeHTMLAttribute;
    autocomplete?: string;
    inputmode?: "email" | "text" | "tel" | "url" | "numeric" | "search";
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    invalid?: boolean;
    describedby?: string;
    surface?: "light" | "dark";
    class?: HTMLAttributes["class"];
  }>(),
  { type: "text", surface: "light" },
);
</script>
