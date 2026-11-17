<template>
  <div
    :id="HOME_SECTION_IDS.careerBrief"
    tabindex="-1"
    class="scroll-mt-[calc(var(--header-h)+2rem)]"
  >
    <h2
      id="career-brief-heading"
      class="font-heading text-[1.75rem] leading-tight font-semibold tracking-tight text-base-0 sm:text-[2.25rem]"
    >
      {{ copy.label }}
    </h2>
    <p id="career-brief-note" class="mt-3 max-w-[32rem] text-base text-green-150">
      {{ copy.note }}
    </p>

    <form
      class="mt-5"
      novalidate
      aria-labelledby="career-brief-heading"
      aria-describedby="career-brief-note"
      @submit="onSubmit"
    >
      <NLabel for="career-brief-email" required class="text-base-0">{{ micro.emailLabel }}</NLabel>
      <div class="mt-2 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
        <NInput
          id="career-brief-email"
          v-model="email"
          name="email"
          type="email"
          autocomplete="email"
          inputmode="email"
          :placeholder="micro.emailPlaceholder"
          required
          surface="dark"
          :invalid="Boolean(emailError)"
          :describedby="emailError ? 'career-brief-email-error' : undefined"
          class="flex-1"
        />
        <NButton
          type="submit"
          color="lime"
          shape="pill"
          size="lg"
          :disabled="state === 'submitting'"
          class="shrink-0"
        >
          {{ state === "submitting" ? micro.sending : copy.cta }}
          <NIcon v-if="state !== 'submitting'" name="arrow-right" :size="20" weight="bold" />
        </NButton>
      </div>
      <NFieldError v-if="emailError" id="career-brief-email-error" surface="dark" class="mt-2">
        {{ emailError }}
      </NFieldError>

      <!-- Announces sending / success / server errors without moving focus. -->
      <p
        role="status"
        aria-live="polite"
        :class="
          cn(
            'mt-3 flex min-h-6 items-start gap-1.5 text-sm font-medium',
            state === 'error' ? 'text-danger-100' : 'text-green-150',
          )
        "
      >
        <NIcon
          v-if="state === 'success'"
          name="check-circle"
          :size="18"
          weight="fill"
          class="mt-px"
        />
        <NIcon v-else-if="state === 'error'" name="error" :size="18" weight="bold" class="mt-px" />
        <span>{{ announcement }}</span>
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
/** "Career Brief" newsletter (footer). Logic lives in the composition root. */
import { cn } from "~/utils/utils";
import { FOOTER_COPY } from "../../domain/home-copy";
import { HOME_SECTION_IDS } from "../../domain/home-routes";
import { MICROCOPY } from "../../domain/home-microcopy";

const copy = FOOTER_COPY.newsletter;
const micro = MICROCOPY.newsletter;
const { email, emailError, state, announcement, onSubmit } = useMhNewsletter();
</script>
