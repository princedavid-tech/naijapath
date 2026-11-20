/**
 * WhatsApp click-to-chat link (wa.me) from `runtimeConfig.public.whatsappNumber`.
 * Returns null while no number is configured, so callers can fall back to the Contact page
 * instead of rendering a dead link.
 */
export function whatsappHref(number: string, text?: string): string | null {
  const digits = number.replace(/\D/g, "");
  if (digits.length < 8) return null;
  return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

export function useWhatsappHref(text?: string): string | null {
  return whatsappHref(String(useRuntimeConfig().public.whatsappNumber ?? ""), text);
}
