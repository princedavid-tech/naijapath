import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import { boolean, object, string } from "yup";
import { APP_TIME_ZONE } from "~/utils/date-formatters";
import { PAGES_MICROCOPY } from "../domain/pages-microcopy";
import { PAGES_API } from "../domain/pages-routes";

const FIELDS = ["name", "email", "phone", "stage", "focus", "time", "goals", "consent"] as const;
const GOALS_MAX = 1500;

// Digits, spaces, brackets, dashes, optional leading +; at least 7 digits overall.
const PHONE = /^\+?[\d\s()-]{7,20}$/;
const valuesOf = (list: ReadonlyArray<{ value: string }>) => list.map((o) => o.value);
const isPhone = (v?: string) => !v || (PHONE.test(v) && v.replace(/\D/g, "").length >= 7);

/**
 * Session request ("Book a session"). A request, not live scheduling: the team matches a
 * practitioner and confirms the time by email (said on the page).
 */
export default function useMpSessionRequest() {
  const c = PAGES_MICROCOPY.common;
  const t = PAGES_MICROCOPY.sessionRequest;

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    stage: "",
    focus: "",
    time: "",
    goals: "",
    consent: false,
  };

  const { defineField, errors, values, handleSubmit, validateField, resetForm } = useForm({
    validationSchema: toTypedSchema(
      object({
        name: string().trim().required(c.nameRequired).max(120, c.tooLong(120)),
        email: string()
          .trim()
          .required(c.emailRequired)
          .email(c.emailInvalid)
          .max(254, c.emailInvalid),
        phone: string().trim().test("phone", t.phoneInvalid, isPhone),
        stage: string().required(t.stageRequired).oneOf(valuesOf(t.stages), t.stageRequired),
        focus: string().required(t.focusRequired).oneOf(valuesOf(t.focuses), t.focusRequired),
        time: string().oneOf(["", ...valuesOf(t.times)]),
        goals: string()
          .trim()
          .required(t.goalsRequired)
          .min(20, t.goalsTooShort)
          .max(GOALS_MAX, c.tooLong(GOALS_MAX)),
        consent: boolean().required(t.consentRequired).oneOf([true], t.consentRequired),
      }),
    ),
    initialValues,
  });

  const lazy = { validateOnModelUpdate: false, validateOnBlur: false };
  const [name] = defineField("name", lazy);
  const [email] = defineField("email", lazy);
  const [phone] = defineField("phone", lazy);
  const [stage] = defineField("stage", lazy);
  const [focus] = defineField("focus", lazy);
  const [time] = defineField("time", lazy);
  const [goals] = defineField("goals", lazy);
  const [consent] = defineField("consent", lazy);

  const { state, announcement, submit, onInvalid, revalidateAfterSubmit } = useMpSubmit({
    sending: c.sending,
    success: t.success,
    errorFallback: c.errorFallback,
  });
  revalidateAfterSubmit(values, errors, validateField);

  const onSubmit = handleSubmit(
    async (v) => {
      const ok = await submit(PAGES_API.sessionRequest, {
        ...v,
        phone: v.phone || null,
        time: v.time || null,
        timeZone: APP_TIME_ZONE,
      });
      if (ok) resetForm({ values: initialValues });
    },
    ({ errors: e }) => onInvalid("session", FIELDS, e),
  );

  return {
    name,
    email,
    phone,
    stage,
    focus,
    time,
    goals,
    goalsMax: GOALS_MAX,
    consent,
    errors,
    state,
    announcement,
    onSubmit,
  };
}
