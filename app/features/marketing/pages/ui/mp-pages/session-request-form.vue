<template>
  <form
    novalidate
    aria-labelledby="session-form-heading"
    class="flex flex-col gap-8"
    @submit="onSubmit"
  >
    <fieldset class="flex flex-col gap-5">
      <legend class="mb-5 text-subtitle font-medium text-ink">{{ t.sectionAboutYou }}</legend>

      <MpPagesField
        id="session-name"
        :label="c.nameLabel"
        required
        :error="errors.name"
        v-slot="{ describedby, invalid }"
      >
        <NInput
          id="session-name"
          v-model="name"
          name="name"
          autocomplete="name"
          required
          :invalid="invalid"
          :describedby="describedby"
        />
      </MpPagesField>

      <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
        <MpPagesField
          id="session-email"
          :label="c.emailLabel"
          required
          :error="errors.email"
          v-slot="{ describedby, invalid }"
        >
          <NInput
            id="session-email"
            v-model="email"
            name="email"
            type="email"
            autocomplete="email"
            inputmode="email"
            :placeholder="c.emailPlaceholder"
            required
            :invalid="invalid"
            :describedby="describedby"
          />
        </MpPagesField>

        <MpPagesField
          id="session-phone"
          :label="t.phoneLabel"
          optional
          :hint="t.phoneHint"
          :error="errors.phone"
          v-slot="{ describedby, invalid }"
        >
          <NInput
            id="session-phone"
            v-model="phone"
            name="phone"
            type="tel"
            autocomplete="tel"
            inputmode="tel"
            :invalid="invalid"
            :describedby="describedby"
          />
        </MpPagesField>
      </div>

      <MpPagesField
        id="session-stage"
        :label="t.stageLabel"
        required
        :error="errors.stage"
        v-slot="{ describedby, invalid }"
      >
        <NSelect
          id="session-stage"
          v-model="stage"
          name="stage"
          :options="t.stages"
          :placeholder="c.choose"
          required
          :invalid="invalid"
          :describedby="describedby"
        />
      </MpPagesField>
    </fieldset>

    <!-- The divider sits on a wrapper: a fieldset's own top border would run through its legend. -->
    <div class="border-t border-hairline pt-8">
      <fieldset class="flex flex-col gap-5">
        <legend class="mb-5 text-subtitle font-medium text-ink">{{ t.sectionSession }}</legend>

        <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
          <MpPagesField
            id="session-focus"
            :label="t.focusLabel"
            required
            :error="errors.focus"
            v-slot="{ describedby, invalid }"
          >
            <NSelect
              id="session-focus"
              v-model="focus"
              name="focus"
              :options="t.focuses"
              :placeholder="c.choose"
              required
              :invalid="invalid"
              :describedby="describedby"
            />
          </MpPagesField>

          <MpPagesField
            id="session-time"
            :label="t.timeLabel"
            optional
            :error="errors.time"
            v-slot="{ describedby, invalid }"
          >
            <NSelect
              id="session-time"
              v-model="time"
              name="time"
              :options="t.times"
              :placeholder="c.choose"
              :invalid="invalid"
              :describedby="describedby"
            />
          </MpPagesField>
        </div>

        <MpPagesField
          id="session-goals"
          :label="t.goalsLabel"
          required
          :hint="t.goalsHint"
          :error="errors.goals"
          v-slot="{ describedby, invalid }"
        >
          <NTextarea
            id="session-goals"
            v-model="goals"
            name="goals"
            :rows="5"
            :maxlength="goalsMax"
            required
            :invalid="invalid"
            :describedby="describedby"
          />
        </MpPagesField>

        <div>
          <NCheckbox
            id="session-consent"
            v-model="consent"
            name="consent"
            required
            :invalid="Boolean(errors.consent)"
            :describedby="errors.consent ? 'session-consent-error' : undefined"
          >
            {{ t.consentLabel }}
            <NLink
              :to="PAGES_ROUTES.privacy"
              class="font-medium text-forest underline underline-offset-2"
            >
              {{ t.consentLink }}</NLink
            >.
            <span aria-hidden="true" class="ml-0.5">*</span>
            <span class="sr-only"> (required)</span>
          </NCheckbox>
          <NFieldError v-if="errors.consent" id="session-consent-error" class="mt-1">
            {{ errors.consent }}
          </NFieldError>
        </div>
      </fieldset>
    </div>

    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
      <NButton type="submit" color="accent" size="lg" :disabled="state === 'submitting'">
        {{ state === "submitting" ? c.sending : t.submit }}
        <NIcon v-if="state !== 'submitting'" name="arrow-right" :size="20" weight="bold" />
      </NButton>
      <MpPagesFormStatus :state="state" :message="announcement" class="sm:flex-1" />
    </div>
  </form>
</template>

<script setup lang="ts">
/** Session request form ("Book a session"). Logic lives in the composition root. */
import { PAGES_MICROCOPY } from "../../domain/pages-microcopy";
import { PAGES_ROUTES } from "../../domain/pages-routes";

const c = PAGES_MICROCOPY.common;
const t = PAGES_MICROCOPY.sessionRequest;
const {
  name,
  email,
  phone,
  stage,
  focus,
  time,
  goals,
  goalsMax,
  consent,
  errors,
  state,
  announcement,
  onSubmit,
} = useMpSessionRequest();
</script>
