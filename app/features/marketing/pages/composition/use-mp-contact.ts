import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import { object, string } from "yup";
import { computed } from "vue";
import { PAGES_MICROCOPY } from "../domain/pages-microcopy";
import { PAGES_API } from "../domain/pages-routes";

const FIELDS = ["name", "email", "organisation", "topic", "message"] as const;
const MESSAGE_MAX = 2000;
const EMAIL_SHAPE = string().trim().required().email().max(254);

/** Contact form: name, email, optional organisation, topic, message. */
export default function useMpContact() {
  const c = PAGES_MICROCOPY.common;
  const t = PAGES_MICROCOPY.contact;
  const topics = t.topics.map((o) => o.value as string);

  const initialValues = { name: "", email: "", organisation: "", topic: "", message: "" };
  const { defineField, errors, values, handleSubmit, validateField, resetForm } = useForm({
    validationSchema: toTypedSchema(
      object({
        name: string().trim().required(c.nameRequired).max(120, c.tooLong(120)),
        email: string()
          .trim()
          .required(c.emailRequired)
          .email(c.emailInvalid)
          .max(254, c.emailInvalid),
        organisation: string().trim().max(160, c.tooLong(160)),
        topic: string().required(t.topicRequired).oneOf(topics, t.topicRequired),
        message: string()
          .trim()
          .required(t.messageRequired)
          .min(10, t.messageTooShort)
          .max(MESSAGE_MAX, c.tooLong(MESSAGE_MAX)),
      }),
    ),
    initialValues,
  });

  const lazy = { validateOnModelUpdate: false, validateOnBlur: false };
  const [name] = defineField("name", lazy);
  const [email] = defineField("email", lazy);
  const [organisation] = defineField("organisation", lazy);
  const [topic] = defineField("topic", lazy);
  const [message] = defineField("message", lazy);
  const emailValid = computed(() => EMAIL_SHAPE.isValidSync(email.value));

  const { state, announcement, submit, onInvalid, revalidateAfterSubmit } = useMpSubmit({
    sending: c.sending,
    success: t.success,
    errorFallback: c.errorFallback,
  });
  revalidateAfterSubmit(values, errors, validateField);

  const onSubmit = handleSubmit(
    async (v) => {
      const ok = await submit(PAGES_API.contact, { ...v, organisation: v.organisation || null });
      if (ok) resetForm({ values: initialValues });
    },
    ({ errors: e }) => onInvalid("contact", FIELDS, e),
  );

  return {
    name,
    email,
    emailValid,
    organisation,
    topic,
    message,
    messageMax: MESSAGE_MAX,
    errors,
    state,
    announcement,
    onSubmit,
  };
}
