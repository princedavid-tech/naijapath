import type { ApiResponse } from "~/types/api";

/**
 * `status: false` arrives on an HTTP 200 — nothing in the fetch layer throws for it.
 * Apply this at every write call site so a rejection can never render as a success
 * (ARCHITECTURE.md §8.1).
 *
 * `undefined` means the request never completed (network failure / cancellation) —
 * a different case from `status: false`, but equally not a success.
 */
export function unwrapApiResponse<T>(
  res: ApiResponse<T> | undefined,
  fallback: string,
): ApiResponse<T> {
  if (!res) throw new Error(fallback);
  if (!res.status) throw new Error(res.message?.trim() || fallback);
  return res;
}
