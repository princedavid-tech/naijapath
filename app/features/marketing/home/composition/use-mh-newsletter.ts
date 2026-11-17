import { useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import { object, string } from "yup";
import { ref, watch } from "vue";
import type { ApiResponse } from "~/types/api";
import { unwrapApiResponse } from "~/utils/api-envelope";
import { HOME_API } from "../domain/home-routes";
import { MICROCOPY } from "../domain/home-microcopy";

type SubmitState = "idle" | "submitting" | "success" | "error";

/**
 * "Career Brief" newsletter sign-up (footer).
 *
 * - vee-validate + yup; validates on submit, then live once the field has been touched.
 * - POST through the one HTTP client → same-origin proxy.
 * - `unwrapApiResponse`: a `status: false` on HTTP 200 shows the server's error, never a
 *   false success (ARCHITECTURE.md §8.1).
 * - `announcement` feeds an aria-live region in the UI.
 */
export default function useMhNewsletter() {
  const copy = MICROCOPY.newsletter;

  const { handleSubmit, resetForm, submitCount } = useForm({
    validationSchema: toTypedSchema(
      object({
        email: string()
          .trim()
          .required(copy.errorRequired)
          .email(copy.errorInvalid)
          .max(254, copy.errorInvalid),
      }),
    ),
    initialValues: { email: "" },
  });

  const {
    value: email,
    errorMessage: emailError,
    validate: validateEmail,
  } = useField<string>("email", undefined, { validateOnValueUpdate: false });

  // Don't nag while typing the first time; once a submit has failed, re-check as they fix it.
  watch(email, () => {
    if (submitCount.value > 0 && emailError.value) void validateEmail();
  });

  const state = ref<SubmitState>("idle");
  const announcement = ref("");

  const onSubmit = handleSubmit(
    async (values) => {
      if (state.value === "submitting") return;
      state.value = "submitting";
      announcement.value = copy.sending;
      try {
        const res = await useCustomFetchNoAuth().post<ApiResponse<unknown>>(
          HOME_API.newsletterSubscribe,
          {
            email: values.email,
            list: "career-brief",
          },
        );
        unwrapApiResponse(res.data, copy.errorFallback);
        state.value = "success";
        announcement.value = copy.success;
        resetForm({ values: { email: "" } });
      } catch (error) {
        state.value = "error";
        announcement.value = normalizeApiError(error, copy.errorFallback).message;
      }
    },
    () => {
      // Validation failed — the field error is announced via its own aria-describedby link;
      // clear any stale server message.
      state.value = "idle";
      announcement.value = "";
    },
  );

  return { email, emailError, state, announcement, onSubmit };
}
