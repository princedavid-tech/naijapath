<template>
  <div class="flex min-h-svh flex-col bg-base-0">
    <header class="border-b border-base-150">
      <NContainer class="flex h-[var(--header-h)] items-center">
        <NLink
          to="/"
          class="-m-1 inline-flex min-h-11 items-center rounded-sm p-1"
          :aria-label="MICROCOPY.a11y.homeLink"
        >
          <NLogo />
        </NLink>
      </NContainer>
    </header>
    <main id="main" tabindex="-1" class="flex flex-1 items-center bg-green-50 py-20">
      <NContainer>
        <p class="tabular font-heading text-stage font-bold text-green-500/70" aria-hidden="true">
          {{ props.error?.statusCode ?? 404 }}
        </p>
        <h1 class="mt-4 text-h2 font-bold text-green-600">{{ MICROCOPY.notFound.title }}</h1>
        <p class="prose-measure mt-4 text-lead text-base-600">{{ MICROCOPY.notFound.body }}</p>
        <NButton class="mt-8" size="lg" @click="clearError({ redirect: '/' })">
          {{ MICROCOPY.notFound.cta }}
        </NButton>
      </NContainer>
    </main>
  </div>
</template>

<script setup lang="ts">
/**
 * Error page. Product routes linked from the homepage (booking, sign-in, commissioning…) are
 * outside this build, so visitors following them land here, on-brand, with a way back.
 */
import type { NuxtError } from "#app";
import { MICROCOPY } from "~/features/marketing/home/domain/home-microcopy";

const props = defineProps<{ error: NuxtError }>();

useSeoMeta({ title: `${MICROCOPY.notFound.title} | NaijaPath`, robots: "noindex" });
</script>
