import axios, { isAxiosError, type AxiosError, type AxiosInstance } from "axios";

/**
 * The one HTTP client (ARCHITECTURE.md §10.1). axios, not $fetch — anything intercepting
 * network traffic must patch XHR. Requests go to the same-origin proxy (`/backend/**`);
 * the browser never talks to the backend host directly.
 */
export type ApiErrorKind = "client" | "server" | "network" | "unknown";

export interface NormalizedApiError {
  kind: ApiErrorKind;
  status?: number;
  message: string;
}

export function normalizeApiError(error: unknown, fallback: string): NormalizedApiError {
  if (isAxiosError(error)) {
    const err = error as AxiosError<{ message?: string }>;
    const status = err.response?.status;
    const serverMessage = err.response?.data?.message?.trim();
    if (!err.response) return { kind: "network", message: fallback };
    if (status && status >= 500)
      return { kind: "server", status, message: serverMessage || fallback };
    if (status && status >= 400)
      return { kind: "client", status, message: serverMessage || fallback };
  }
  if (error instanceof Error && error.message) return { kind: "unknown", message: error.message };
  return { kind: "unknown", message: fallback };
}

let client: AxiosInstance | undefined;

export function useCustomFetchNoAuth(): AxiosInstance {
  if (client) return client;
  const config = useRuntimeConfig();
  // oxlint-disable-next-line import/no-named-as-default-member -- axios.create is the documented API
  client = axios.create({
    baseURL: config.public.apiBaseUrl,
    timeout: 15_000,
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    withCredentials: true,
  });
  return client;
}
