<template>
  <form novalidate aria-labelledby="contact-heading" class="flex flex-col gap-4" @submit="onSubmit">
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <MpPagesBoxField
        id="contact-name"
        :label="c.nameLabel"
        icon="user"
        required
        :error="errors.name"
        v-slot="{ describedby, invalid, controlClass }"
      >
        <input
          id="contact-name"
          v-model="name"
          name="name"
          autocomplete="name"
          required
          :aria-invalid="invalid ? 'true' : undefined"
          :aria-describedby="describedby"
          :class="controlClass"
        />
      </MpPagesBoxField>

      <MpPagesBoxField
        id="contact-email"
        :label="c.emailLabel"
        icon="mail"
        required
        :valid="emailValid"
        :error="errors.email"
        v-slot="{ describedby, invalid, controlClass }"
      >
        <input
          id="contact-email"
          v-model="email"
          name="email"
          type="email"
          autocomplete="email"
          inputmode="email"
          :placeholder="c.emailPlaceholder"
          required
          :aria-invalid="invalid ? 'true' : undefined"
          :aria-describedby="describedby"
          :class="controlClass"
        />
      </MpPagesBoxField>
    </div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <MpPagesBoxField
        id="contact-organisation"
        :label="t.organisationLabel"
        icon="building"
        optional
        :error="errors.organisation"
        v-slot="{ describedby, invalid, controlClass }"
      >
        <input
          id="contact-organisation"
          v-model="organisation"
          name="organisation"
          autocomplete="organization"
          :aria-invalid="invalid ? 'true' : undefined"
          :aria-describedby="describedby"
          :class="controlClass"
        />
      </MpPagesBoxField>

      <MpPagesBoxField
        id="contact-topic"
        :label="t.topicLabel"
        icon="topic"
        required
        :error="errors.topic"
      >
        <template #default="{ describedby, invalid, controlClass }">
          <select
            id="contact-topic"
            v-model="topic"
            name="topic"
            required
            :aria-invalid="invalid ? 'true' : undefined"
            :aria-describedby="describedby"
            :class="[controlClass, 'cursor-pointer appearance-none']"
          >
            <option value="" disabled>{{ c.choose }}</option>
            <option v-for="option in t.topics" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </template>
        <template #trailing>
          <NIcon name="chevron-down" :size="20" class="pointer-events-none text-body" />
        </template>
      </MpPagesBoxField>
    </div>

    <MpPagesBoxField
      id="contact-message"
      :label="t.messageLabel"
      icon="message"
      required
      multiline
      :error="errors.message"
      v-slot="{ describedby, invalid, controlClass }"
    >
      <textarea
        id="contact-message"
        v-model="message"
        name="message"
        rows="5"
        :maxlength="messageMax"
        required
        :aria-invalid="invalid ? 'true' : undefined"
        :aria-describedby="describedby"
        :class="[controlClass, 'mt-1 min-h-28 resize-y leading-relaxed']"
      />
    </MpPagesBoxField>

    <NButton
      type="submit"
      color="accent"
      size="lg"
      class="mt-1 w-full"
      :disabled="state === 'submitting'"
    >
      {{ state === "submitting" ? c.sending : t.submit }}
    </NButton>
    <MpPagesFormStatus :state="state" :message="announcement" class="justify-center text-center" />
  </form>
</template>

<script setup lang="ts">
/** Contact form (boxed fields). Logic lives in the composition root. */
import { PAGES_MICROCOPY } from "../../domain/pages-microcopy";

const c = PAGES_MICROCOPY.common;
const t = PAGES_MICROCOPY.contact;
const {
  name,
  email,
  emailValid,
  organisation,
  topic,
  message,
  messageMax,
  errors,
  state,
  announcement,
  onSubmit,
} = useMpContact();
</script>
