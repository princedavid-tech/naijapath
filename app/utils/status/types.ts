/** Canonical statuses, grouped by kind. Start small; add as the platform's states arrive. */
export const SESSION_STATUSES = ["confirmed", "completed", "pending", "cancelled"] as const;

export type SessionStatus = (typeof SESSION_STATUSES)[number];
export type CanonicalStatus = SessionStatus;

/** Semantic tones — never raw colours. A design change to a tone is one edit in palette.ts. */
export type StatusTone = "success" | "pending" | "danger" | "info" | "neutral";
