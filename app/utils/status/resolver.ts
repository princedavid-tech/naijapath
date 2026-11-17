import { STATUS_REGISTRY, type StatusDefinition } from "./registry";
import { SESSION_STATUSES, type CanonicalStatus } from "./types";

/**
 * Raw backend spelling → canonical status. When the backend invents a new spelling,
 * add ONE line here and every screen updates. Starts empty-ish on purpose.
 */
const N_STATUS_ALIASES: Record<string, CanonicalStatus> = {
  booked: "confirmed",
  done: "completed",
  awaiting: "pending",
};

const UNKNOWN: StatusDefinition = { label: "Unknown", tone: "neutral" };

function isCanonical(value: string): value is CanonicalStatus {
  return (SESSION_STATUSES as readonly string[]).includes(value);
}

export function resolveStatus(raw: string | null | undefined): StatusDefinition {
  if (!raw) return UNKNOWN;
  const key = raw
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_");
  const canonical = isCanonical(key) ? key : N_STATUS_ALIASES[key];
  return canonical ? STATUS_REGISTRY[canonical] : UNKNOWN;
}
