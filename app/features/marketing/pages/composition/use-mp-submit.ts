import { nextTick, ref, watch, type Ref } from "vue";
import type { ApiResponse } from "~/types/api";
import { unwrapApiResponse } from "~/utils/api-envelope";
import { PAGES_MICROCOPY } from "../domain/pages-microcopy";

export type MpSubmitState = "idle" | "submitting" | "success" | "error";

interface SubmitCopy {
  sending: string;
  success: string;
  errorFallback: string;
}

/**
 * Shared submit plumbing for the sign-in, contact and session-request forms.
 *
 * - POST through the one HTTP client → same-origin proxy; `unwrapApiResponse` so a
 *   `status: false` on HTTP 200 shows the server's message, never a false success.
 * - `announcement` feeds an aria-live region in the UI (sending / success / error).
 * - `onInvalid` moves focus to the first invalid field (its error is linked through
 *   aria-describedby, so it is read out) and announces a short summary.
 * - `revalidateAfterSubmit`: no nagging while typing the first time; errors already on
 *   screen update live as the visitor fixes them.
 */
export default function useMpSubmit(copy: SubmitCopy) {
  const state = ref<MpSubmitState>("idle");
  const announcement = ref("");

  async function submit(endpoint: string, payload: unknown): Promise<boolean> {
    if (state.value === "submitting") return false;
    state.value = "submitting";
    announcement.value = copy.sending;
    try {
      const res = await useCustomFetchNoAuth().post<ApiResponse<unknown>>(endpoint, payload);
      unwrapApiResponse(res.data, copy.errorFallback);
      state.value = "success";
      announcement.value = copy.success;
      return true;
    } catch (error) {
      state.value = "error";
      announcement.value = normalizeApiError(error, copy.errorFallback).message;
      return false;
    }
  }

  async function onInvalid(
    idPrefix: string,
    fieldOrder: readonly string[],
    errors: Partial<Record<string, string | undefined>>,
  ) {
    state.value = "idle";
    announcement.value = PAGES_MICROCOPY.common.errorSummary;
    await nextTick();
    const first = fieldOrder.find((field) => errors[field]);
    if (first && import.meta.client) document.getElementById(`${idPrefix}-${first}`)?.focus();
  }

  function revalidateAfterSubmit(
    values: object,
    errors: Ref<Partial<Record<string, string | undefined>>>,
    validateField: (field: never) => Promise<unknown>,
  ) {
    // Re-check only the fields whose error is on screen: fixing one clears it at once, a
    // field cleared by code (or not reached yet, like the password step) never raises one.
    watch(
      () => ({ ...values }),
      () => {
        if (state.value === "submitting") return;
        for (const [field, message] of Object.entries(errors.value)) {
          if (message) void validateField(field as never);
        }
      },
      { deep: true },
    );
    // Once every error is fixed, the "please fix…" summary goes too.
    watch(
      errors,
      (current) => {
        const summary = announcement.value === PAGES_MICROCOPY.common.errorSummary;
        if (summary && !Object.values(current).some(Boolean)) announcement.value = "";
      },
      { deep: true },
    );
  }

  return { state, announcement, submit, onInvalid, revalidateAfterSubmit };
}
