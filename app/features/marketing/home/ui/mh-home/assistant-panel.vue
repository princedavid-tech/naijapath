<template>
  <Transition
    enter-active-class="transition-[opacity,translate] duration-300 ease-out-soft"
    enter-from-class="translate-y-3 opacity-0"
    leave-active-class="transition-[opacity,translate] duration-200 ease-out-soft"
    leave-to-class="translate-y-3 opacity-0"
  >
    <section
      v-show="open"
      id="mh-assistant"
      ref="panel"
      role="dialog"
      aria-modal="false"
      aria-labelledby="mh-assistant-title"
      aria-describedby="mh-assistant-subtitle"
      class="pointer-events-auto absolute right-[var(--sheet-inset)] bottom-[calc(max(var(--sheet-inset),env(safe-area-inset-bottom))+4.5rem)] flex max-h-[min(38rem,calc(100svh-7.5rem))] w-[min(23rem,calc(100vw-2*var(--sheet-inset)))] flex-col overflow-clip rounded-card border border-hairline bg-white shadow-lift"
      @keydown.esc.stop="close()"
    >
      <header
        data-surface="dark"
        class="flex items-center gap-3 bg-forest py-3 pr-2 pl-4 text-white"
      >
        <span
          aria-hidden="true"
          class="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-sage"
        >
          <NIcon name="whatsapp" :size="22" />
        </span>
        <div class="min-w-0 flex-1">
          <h2 id="mh-assistant-title" class="text-base font-semibold text-white">
            {{ copy.title }}
          </h2>
          <p id="mh-assistant-subtitle" class="text-sm text-white/80">
            {{ whatsapp ? copy.subtitle : copy.subtitleNoWhatsapp }}
          </p>
        </div>
        <button
          type="button"
          class="inline-flex size-11 shrink-0 items-center justify-center rounded-full text-white transition-colors duration-200 ease-out-soft hover:bg-white/10"
          :aria-label="copy.close"
          @click="close()"
        >
          <NIcon name="close" :size="22" />
        </button>
      </header>

      <!-- role=log: new messages are read out politely, focus stays where it is. -->
      <div
        ref="log"
        role="log"
        aria-live="polite"
        :aria-label="copy.logLabel"
        class="flex min-h-40 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain bg-cream px-4 py-4"
      >
        <div
          v-for="(m, i) in messages"
          :key="i"
          :class="cn('flex flex-col gap-2', m.from === 'user' ? 'items-end' : 'items-start')"
        >
          <p
            :class="
              cn(
                'max-w-[85%] rounded-xl px-4 py-2.5 text-base leading-snug',
                m.from === 'user'
                  ? 'rounded-br-sm bg-forest text-white'
                  : 'rounded-bl-sm border border-hairline bg-white text-ink',
              )
            "
          >
            <span class="sr-only">{{ m.from === "user" ? "You:" : `${copy.title}:` }} </span>
            {{ m.text }}
          </p>
          <ul v-if="m.links?.length" class="flex flex-wrap gap-2">
            <li v-for="link in m.links" :key="link.to">
              <NLink
                :to="link.to"
                class="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-forest/35 bg-white px-4 text-sm font-medium text-forest transition-colors duration-200 ease-out-soft hover:border-forest hover:bg-sage"
                @click="close(false)"
              >
                {{ link.label }}
                <NIcon name="arrow-right" :size="16" weight="bold" />
              </NLink>
            </li>
          </ul>
        </div>

        <div v-if="typing" class="flex items-start">
          <p
            class="mh-typing inline-flex items-center gap-1 rounded-xl rounded-bl-sm border border-hairline bg-white px-4 py-3.5"
          >
            <span class="sr-only">{{ copy.typing }}</span>
            <span
              v-for="d in 3"
              :key="d"
              aria-hidden="true"
              class="size-1.5 rounded-full bg-body"
            />
          </p>
        </div>
      </div>

      <div class="border-t border-hairline px-4 pt-3 pb-4">
        <p :id="repliesId" class="sr-only">{{ copy.repliesLabel }}</p>
        <!-- aria-disabled (not disabled) while "typing", so a focused chip keeps focus. -->
        <ul ref="replies" :aria-labelledby="repliesId" class="flex flex-wrap gap-2">
          <li v-for="topic in copy.topics" :key="topic.id">
            <button
              type="button"
              :aria-disabled="typing ? 'true' : undefined"
              class="inline-flex min-h-11 items-center rounded-full border border-hairline bg-white px-4 text-sm font-medium text-ink transition-colors duration-200 ease-out-soft hover:border-forest/50 hover:bg-sage aria-disabled:opacity-60"
              @click="ask(topic.id)"
            >
              {{ topic.label }}
            </button>
          </li>
        </ul>
        <NButton v-if="whatsapp" :to="whatsappFor(lastTopic)" color="primary" class="mt-3 w-full">
          <NIcon name="whatsapp" :size="20" />
          {{ copy.whatsappCta }}
        </NButton>
      </div>
    </section>
  </Transition>
</template>

<script setup lang="ts">
/**
 * Scripted chat assistant (homepage). Not AI and not a person, and it says so: it answers a
 * few common questions with pointers to the right page or section, and hands over to the team
 * on WhatsApp (or the Contact page while no number is configured).
 *
 * Non-modal dialog: focus moves to the first suggested question on open; Escape, the close
 * button or following a link closes it and the launcher takes focus back (`closed` event).
 */
import { nextTick, onMounted, ref, watch } from "vue";
import { cn } from "~/utils/utils";
import { prefersReducedMotion } from "~/utils/easing";
import { HOME_ROUTES } from "../../domain/home-routes";
import { MICROCOPY } from "../../domain/home-microcopy";

type Topic = (typeof MICROCOPY.assistant.topics)[number];
interface Message {
  from: "assistant" | "user";
  text: string;
  links?: ReadonlyArray<{ label: string; to: string }>;
}

const open = defineModel<boolean>("open", { required: true });
const emit = defineEmits<{ closed: [] }>();

const copy = MICROCOPY.assistant;
const repliesId = "mh-assistant-replies";
const whatsapp = useWhatsappHref() !== null;

const messages = ref<Message[]>([{ from: "assistant", text: copy.greeting }]);
const typing = ref(false);
const lastTopic = ref<Topic | null>(null);
const log = ref<HTMLElement | null>(null);
const replies = ref<HTMLElement | null>(null);

function whatsappFor(topic: Topic | null): string {
  const text = topic ? `${copy.whatsappPrefill}${topic.label}` : undefined;
  return useWhatsappHref(text) ?? HOME_ROUTES.contact;
}

async function scrollToEnd() {
  await nextTick();
  log.value?.scrollTo({
    top: log.value.scrollHeight,
    behavior: prefersReducedMotion() ? "auto" : "smooth",
  });
}

async function ask(id: Topic["id"]) {
  if (typing.value) return;
  const topic = copy.topics.find((t) => t.id === id);
  if (!topic) return;
  lastTopic.value = topic;
  messages.value.push({ from: "user", text: topic.label });
  typing.value = true;
  void scrollToEnd();

  // A short, readable pause so the reply doesn't land on top of the question.
  await new Promise((done) => setTimeout(done, prefersReducedMotion() ? 250 : 900));

  const links: Array<{ label: string; to: string }> = [...topic.links];
  // "Talk to a person" without WhatsApp: point to the Contact page instead.
  if (topic.id === "person" && !whatsapp)
    links.push({ label: copy.contactCta, to: HOME_ROUTES.contact });
  messages.value.push({ from: "assistant", text: topic.reply, links });
  messages.value.push({ from: "assistant", text: copy.again });
  typing.value = false;
  void scrollToEnd();
}

/** `returnFocus: false` when following a link: the link moves focus to where it goes. */
function close(returnFocus = true) {
  open.value = false;
  if (returnFocus) emit("closed");
}

/** On open, focus the first suggested question (the panel is lazy: the first open happens on
 *  mount, later ones through the watcher). */
async function focusIn() {
  await nextTick();
  replies.value?.querySelector("button")?.focus();
  void scrollToEnd();
}
onMounted(() => {
  if (open.value) void focusIn();
});
watch(open, (isOpen) => {
  if (isOpen) void focusIn();
});
</script>

<style scoped>
@media (prefers-reduced-motion: no-preference) {
  .mh-typing > span[aria-hidden] {
    animation: mh-typing 1s var(--ease-out-soft) infinite;
  }
  .mh-typing > span[aria-hidden]:nth-of-type(3) {
    animation-delay: 150ms;
  }
  .mh-typing > span[aria-hidden]:nth-of-type(4) {
    animation-delay: 300ms;
  }
}
@keyframes mh-typing {
  0%,
  60%,
  100% {
    opacity: 0.35;
    transform: translateY(0);
  }
  30% {
    opacity: 1;
    transform: translateY(-3px);
  }
}
</style>
