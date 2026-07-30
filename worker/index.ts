import type { ExecutionContext, Fetcher } from "@cloudflare/workers-types";
import handler from "vinext/server/fetch-handler";

interface Env {
  ASSETS: Fetcher;
}

// Baseline security headers applied to every response. A strict CSP is
// intentionally omitted: vinext emits inline RSC scripts without nonces, so
// a CSP would either break the app or be too permissive to matter.
const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy":
    "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
};

function withSecurityHeaders(response: Response): Response {
  const headers = new Headers(response.headers);
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    if (!headers.has(name)) {
      headers.set(name, value);
    }
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<Response> {
    return withSecurityHeaders(await handler.fetch(request, env, ctx));
  },
};
