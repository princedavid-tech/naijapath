/**
 * One display zone, one time pattern (ARCHITECTURE.md §5.3).
 * Never write `h:mm a`, `HH:mm` or a bare `toLocaleTimeString` at a call site —
 * call these formatters and pass them the RAW timestamp.
 *
 * Implemented on the built-in Intl API (zero bundle cost) rather than Luxon: the marketing page
 * only formats a couple of timestamps. The invariants are identical — if the platform app adopts
 * Luxon, keep these function names and signatures.
 */
export const APP_TIME_ZONE = "Africa/Lagos";
export const APP_LOCALE = "en-NG";

type TimeFormatPreference = "12h" | "24h";

/**
 * Raw input → Date.
 * - date-time with an offset or `Z` → honoured as sent
 * - date-time with no offset → UTC with the `Z` dropped
 * - bare `YYYY-MM-DD` → a calendar date anchored at noon in the display zone (WAT = UTC+1,
 *   no DST), so it can never slip to the previous/next day
 */
export function parseToDate(value: string | Date): Date {
  if (value instanceof Date) return value;
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return new Date(`${value}T12:00:00+01:00`);
  const hasOffset = /(Z|[+-]\d{2}:?\d{2})$/.test(value);
  return new Date(hasOffset ? value : `${value}Z`);
}

/**
 * "4:00 PM" (12h, default) or "16:00" (24h) in Africa/Lagos.
 * Assembled from formatToParts so server (Node ICU) and every browser produce the identical
 * string — locale data varies ("pm", "p.m.", narrow no-break spaces) and would break hydration.
 */
export function formatTime(value: string | Date, preference: TimeFormatPreference = "12h"): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: APP_TIME_ZONE,
    hour: preference === "24h" ? "2-digit" : "numeric",
    minute: "2-digit",
    hourCycle: preference === "24h" ? "h23" : "h12",
  }).formatToParts(parseToDate(value));
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";
  const time = `${get("hour")}:${get("minute")}`;
  return preference === "24h"
    ? time
    : `${time} ${get("dayPeriod").replace(/\./g, "").toUpperCase()}`;
}

/** "12 Nov 2026" in Africa/Lagos (assembled from parts — identical on server and client). */
export function formatDate(value: string | Date): string {
  const parts = new Intl.DateTimeFormat(APP_LOCALE, {
    timeZone: APP_TIME_ZONE,
    day: "numeric",
    month: "short",
    year: "numeric",
  }).formatToParts(parseToDate(value));
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";
  return `${get("day")} ${get("month").replace(/\.$/, "")} ${get("year")}`;
}

/** Machine-readable value for `<time datetime>` (UTC ISO 8601 — unambiguous for any zone). */
export function toIsoInZone(value: string | Date): string {
  return parseToDate(value).toISOString();
}
