/**
 * Same-origin proxy: browser → /backend/** → NUXT_API_PROXY_TARGET (ARCHITECTURE.md §10.2).
 *
 * Deliberately NOT copied from the reference codebase: any dev mock-auth / fabricated-session
 * block. If no upstream is configured, this answers with an honest `status: false` envelope
 * (HTTP 503) so the UI shows "unavailable" — never a fake success.
 */
export default defineEventHandler(async (event) => {
  const { apiProxyTarget } = useRuntimeConfig(event);
  const path = getRouterParam(event, "path") ?? "";

  if (!apiProxyTarget) {
    setResponseStatus(event, 503);
    return {
      status: false,
      data: null,
      message: "This service is not available right now. Please try again later.",
    };
  }

  const target = new URL(
    path,
    apiProxyTarget.endsWith("/") ? apiProxyTarget : `${apiProxyTarget}/`,
  );
  const query = getQuery(event);
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null) target.searchParams.set(key, String(value));
  }

  return proxyRequest(event, target.toString(), {
    cookieDomainRewrite: { "*": "" },
    cookiePathRewrite: { "*": "/" },
  });
});
