<template>
  <MpPagesShell>
    <NSheet class="section-y">
      <div class="site-container grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
        <div class="lg:col-span-5">
          <div class="lg:sticky lg:top-8">
            <NEyebrow>{{ t.eyebrow }}</NEyebrow>
            <h1 id="session-form-heading" class="mt-4 text-title font-medium text-ink">
              {{ t.title }}
            </h1>
            <p class="measure mt-4 text-copy text-body">{{ t.lead }}</p>

            <div class="mt-10 rounded-card bg-sand p-6 sm:p-8">
              <h2 class="text-base font-semibold text-ink">{{ t.stepsTitle }}</h2>
              <ol class="mt-4 flex flex-col gap-4">
                <li v-for="(step, i) in t.steps" :key="step" class="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    class="tabular inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-forest text-sm font-semibold text-white"
                  >
                    {{ i + 1 }}
                  </span>
                  <span class="pt-1 text-base text-body">{{ step }}</span>
                </li>
              </ol>
            </div>
          </div>
        </div>

        <div class="lg:col-span-6 lg:col-start-7">
          <MpPagesSessionRequestForm />
        </div>
      </div>
    </NSheet>
  </MpPagesShell>
</template>

<script setup lang="ts">
/** Book a session: a session request form (the team confirms the time by email). */
import { PAGES_MICROCOPY } from "~/features/marketing/pages/domain/pages-microcopy";
import { PAGES_ROUTES } from "~/features/marketing/pages/domain/pages-routes";

const t = PAGES_MICROCOPY.sessionRequest;
const { siteUrl } = useRuntimeConfig().public;

useSeoMeta({
  title: t.metaTitle,
  description: t.metaDescription,
  ogTitle: t.metaTitle,
  ogDescription: t.metaDescription,
  ogUrl: `${siteUrl}${PAGES_ROUTES.bookSession}`,
});
useHead({ link: [{ rel: "canonical", href: `${siteUrl}${PAGES_ROUTES.bookSession}` }] });
</script>
