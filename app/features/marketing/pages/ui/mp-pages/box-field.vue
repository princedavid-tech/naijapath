<template>
  <div data-slot="box-field" :class="props.class">
    <!-- The whole box is the field: clicking anywhere in it focuses the control, and the focus
         ring sits on the box (focus-within), so it is never lost, only moved. -->
    <div
      :class="
        cn(
          'flex cursor-text gap-3 rounded-xl border bg-white px-4 transition-[border-color,box-shadow] duration-200 ease-out-soft',
          'focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-forest',
          props.multiline ? 'items-start py-3' : 'min-h-16 items-center py-2',
          props.error
            ? 'border-danger-500 shadow-[inset_0_0_0_1px_var(--danger-500)]'
            : 'border-muted focus-within:border-forest',
        )
      "
      @click="focusControl"
    >
      <template v-if="props.icon">
        <NIcon
          :name="props.icon"
          :size="20"
          :class="cn('text-body', props.multiline && 'mt-0.5')"
        />
        <span
          aria-hidden="true"
          :class="cn('w-px shrink-0 self-stretch bg-hairline', props.multiline ? 'my-0' : 'my-1')"
        />
      </template>
      <div class="min-w-0 flex-1">
        <NLabel :for="props.id" :required="props.required" class="block text-[0.8125rem] leading-5">
          {{ props.label }}
          <span v-if="props.optional" class="font-normal">
            {{ PAGES_MICROCOPY.common.optional }}
          </span>
        </NLabel>
        <slot :describedby="describedby" :invalid="Boolean(props.error)" :control-class="CONTROL" />
      </div>
      <NIcon
        v-if="props.valid && !props.error"
        name="check-circle"
        :size="20"
        weight="bold"
        class="text-success-500"
      />
      <slot name="trailing" />
    </div>
    <p v-if="props.hint" :id="hintId" class="mt-1.5 px-1 text-sm text-body">{{ props.hint }}</p>
    <NFieldError v-if="props.error" :id="errorId" class="mt-1.5 px-1">{{
      props.error
    }}</NFieldError>
  </div>
</template>

<script setup lang="ts">
/**
 * "Boxed" field for the split-layout pages (sign in, contact): optional leading icon and
 * divider, the label inside the box above the value, an optional trailing slot (password
 * toggle, select chevron) and a check when the value is valid. Hint and error sit below and
 * are linked through aria-describedby. The box border (muted, 3.16:1 on white) meets the 3:1
 * non-text contrast rule; hairline would not.
 */
import { computed, type HTMLAttributes } from "vue";
import type { IconName } from "~/utils/icons";
import { cn } from "~/utils/utils";
import { PAGES_MICROCOPY } from "../../domain/pages-microcopy";

const props = defineProps<{
  id: string;
  label: string;
  icon?: IconName;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  error?: string;
  valid?: boolean;
  multiline?: boolean;
  class?: HTMLAttributes["class"];
}>();

/** Borderless control that fills the box; the box draws the frame and the focus ring. */
const CONTROL =
  "block w-full min-w-0 border-0 bg-transparent p-0 font-sans text-base text-ink placeholder:text-body focus-visible:outline-none";

const hintId = computed(() => `${props.id}-hint`);
const errorId = computed(() => `${props.id}-error`);
const describedby = computed(
  () =>
    [props.hint ? hintId.value : "", props.error ? errorId.value : ""].filter(Boolean).join(" ") ||
    undefined,
);

function focusControl(event: MouseEvent) {
  const target = event.target as HTMLElement;
  if (target.closest("input, select, textarea, button, a, label")) return;
  document.getElementById(props.id)?.focus();
}
</script>
