import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import { object, string } from "yup";
import { computed, ref } from "vue";
import { PAGES_MICROCOPY } from "../domain/pages-microcopy";
import { PAGES_API, PAGES_ROUTES } from "../domain/pages-routes";

const FIELDS = ["name", "email", "password"] as const;
const EMAIL_SHAPE = string().trim().required().email().max(254);
const PASSWORD_MIN = 8;

/**
 * Create an account (the "Sign up" tab on /sign-in). Same contract as sign-in: the backend
 * sets the session cookie, then we hand over to the platform app. The endpoint is unconfirmed
 * (see pages-routes.ts).
 */
export default function useMpSignUp() {
  const c = PAGES_MICROCOPY.common;
  const a = PAGES_MICROCOPY.auth;
  const t = PAGES_MICROCOPY.signUp;

  const { defineField, errors, values, handleSubmit, validateField, setFieldValue } = useForm({
    validationSchema: toTypedSchema(
      object({
        name: string().trim().required(c.nameRequired).max(120, c.tooLong(120)),
        email: string()
          .trim()
          .required(c.emailRequired)
          .email(c.emailInvalid)
          .max(254, c.emailInvalid),
        password: string()
          .required(a.passwordRequired)
          .min(PASSWORD_MIN, t.passwordTooShort)
          .max(256, c.tooLong(256)),
      }),
    ),
    initialValues: { name: "", email: "", password: "" },
  });

  const lazy = { validateOnModelUpdate: false, validateOnBlur: false };
  const [name] = defineField("name", lazy);
  const [email] = defineField("email", lazy);
  const [password] = defineField("password", lazy);
  const showPassword = ref(false);
  const emailValid = computed(() => EMAIL_SHAPE.isValidSync(email.value));

  const { state, announcement, submit, onInvalid, revalidateAfterSubmit } = useMpSubmit(t);
  revalidateAfterSubmit(values, errors, validateField);

  const onSubmit = handleSubmit(
    async (v) => {
      const ok = await submit(PAGES_API.signUp, {
        name: v.name,
        email: v.email,
        password: v.password,
      });
      if (ok) await navigateTo(PAGES_ROUTES.afterSignIn, { external: true });
      else setFieldValue("password", "", false);
    },
    ({ errors: e }) => onInvalid("sign-up", FIELDS, e),
  );

  return {
    name,
    email,
    emailValid,
    password,
    showPassword,
    errors,
    state,
    announcement,
    onSubmit,
  };
}
