import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import { object, string } from "yup";
import { computed, nextTick, ref } from "vue";
import { PAGES_MICROCOPY } from "../domain/pages-microcopy";
import { PAGES_API, PAGES_ROUTES } from "../domain/pages-routes";

const FIELDS = ["email", "password"] as const;
const EMAIL_SHAPE = string().trim().required().email().max(254);

/**
 * Sign in, email first: "Continue" checks the email, then reveals the password field and moves
 * focus to it; the same button then signs in. The email stays visible and editable, so password
 * managers see both fields.
 *
 * The session itself is the backend's job: the proxy forwards cookies (`withCredentials`), so
 * on success we hand over to the platform app with a full navigation. The password is never
 * logged, stored or echoed; it is cleared (without raising an error) after a failed attempt.
 */
export default function useMpSignIn() {
  const c = PAGES_MICROCOPY.common;
  const a = PAGES_MICROCOPY.auth;
  const t = PAGES_MICROCOPY.signIn;

  const { defineField, errors, values, handleSubmit, validateField, setFieldValue } = useForm({
    validationSchema: toTypedSchema(
      object({
        email: string()
          .trim()
          .required(c.emailRequired)
          .email(c.emailInvalid)
          .max(254, c.emailInvalid),
        password: string().required(a.passwordRequired).max(256, c.tooLong(256)),
      }),
    ),
    initialValues: { email: "", password: "" },
  });

  const lazy = { validateOnModelUpdate: false, validateOnBlur: false };
  const [email] = defineField("email", lazy);
  const [password] = defineField("password", lazy);
  const showPassword = ref(false);
  const step = ref<"email" | "password">("email");
  const emailValid = computed(() => EMAIL_SHAPE.isValidSync(email.value));

  const { state, announcement, submit, onInvalid, revalidateAfterSubmit } = useMpSubmit(t);
  revalidateAfterSubmit(values, errors, validateField);

  const signIn = handleSubmit(
    async (v) => {
      const ok = await submit(PAGES_API.signIn, { email: v.email, password: v.password });
      if (ok) await navigateTo(PAGES_ROUTES.afterSignIn, { external: true });
      else setFieldValue("password", "", false);
    },
    ({ errors: e }) => onInvalid("sign-in", FIELDS, e),
  );

  async function onSubmit(event: Event) {
    if (step.value === "password") return signIn(event);
    event.preventDefault();
    const { valid } = await validateField("email");
    if (!valid) return onInvalid("sign-in", FIELDS, errors.value);
    step.value = "password";
    announcement.value = "";
    await nextTick();
    document.getElementById("sign-in-password")?.focus();
  }

  return {
    email,
    emailValid,
    password,
    showPassword,
    step,
    errors,
    state,
    announcement,
    onSubmit,
  };
}
