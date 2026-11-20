<template>
  <form novalidate :aria-label="a.tabSignUp" class="flex flex-col gap-4" @submit="onSubmit">
    <MpPagesBoxField
      id="sign-up-name"
      :label="c.nameLabel"
      icon="user"
      required
      :error="errors.name"
      v-slot="{ describedby, invalid, controlClass }"
    >
      <input
        id="sign-up-name"
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
      id="sign-up-email"
      :label="c.emailLabel"
      icon="mail"
      required
      :valid="emailValid"
      :error="errors.email"
      v-slot="{ describedby, invalid, controlClass }"
    >
      <input
        id="sign-up-email"
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

    <MpPagesBoxField
      id="sign-up-password"
      :label="a.passwordLabel"
      icon="lock"
      required
      :hint="t.passwordHint"
      :error="errors.password"
    >
      <template #default="{ describedby, invalid, controlClass }">
        <input
          id="sign-up-password"
          v-model="password"
          name="password"
          :type="showPassword ? 'text' : 'password'"
          autocomplete="new-password"
          required
          :aria-invalid="invalid ? 'true' : undefined"
          :aria-describedby="describedby"
          :class="controlClass"
        />
      </template>
      <template #trailing>
        <MpPagesPasswordToggle v-model="showPassword" controls="sign-up-password" />
      </template>
    </MpPagesBoxField>

    <p class="px-1 text-sm text-body">
      {{ t.termsBefore }}
      <NLink :to="PAGES_ROUTES.terms" class="font-medium text-forest underline underline-offset-2">
        {{ t.termsLink }}</NLink
      >
      {{ t.termsAnd }}
      <NLink
        :to="PAGES_ROUTES.privacy"
        class="font-medium text-forest underline underline-offset-2"
      >
        {{ t.privacyLink }}</NLink
      >.
    </p>

    <NButton
      type="submit"
      color="accent"
      size="lg"
      class="mt-1 w-full"
      :disabled="state === 'submitting'"
    >
      {{ state === "submitting" ? t.sending : t.submit }}
    </NButton>
    <MpPagesFormStatus :state="state" :message="announcement" class="justify-center text-center" />
  </form>
</template>

<script setup lang="ts">
/** Sign-up tab. Logic lives in the composition root. */
import { PAGES_MICROCOPY } from "../../domain/pages-microcopy";
import { PAGES_ROUTES } from "../../domain/pages-routes";

const c = PAGES_MICROCOPY.common;
const a = PAGES_MICROCOPY.auth;
const t = PAGES_MICROCOPY.signUp;
const { name, email, emailValid, password, showPassword, errors, state, announcement, onSubmit } =
  useMpSignUp();
</script>
