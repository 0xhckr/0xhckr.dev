import { convexBetterAuthNextJs } from "@convex-dev/better-auth/nextjs";
import { ConvexError } from "convex/values";
import { api } from "../../convex/_generated/api";

export const ADMIN_EMAIL = "hackr@hackr.sh";

const isAuthError = (error: unknown) => {
  const message =
    (error instanceof ConvexError && error.data) ||
    (error instanceof Error && error.message) ||
    "";
  return /auth/i.test(String(message));
};

export const {
  handler,
  preloadAuthQuery,
  isAuthenticated,
  getToken,
  fetchAuthQuery,
  fetchAuthMutation,
  fetchAuthAction,
} = convexBetterAuthNextJs({
  convexUrl: process.env.NEXT_PUBLIC_CONVEX_URL!,
  convexSiteUrl: process.env.NEXT_PUBLIC_CONVEX_SITE_URL!,
  jwtCache: { enabled: true, isAuthError },
});

/**
 * Returns true only when the request is authenticated AND the session user
 * is the site admin. Use this to gate privileged API routes (defense in
 * depth on top of the per-layout checks).
 */
export async function isAdmin(): Promise<boolean> {
  if (!(await isAuthenticated())) {
    return false;
  }
  try {
    const user = await fetchAuthQuery(api.auth.getCurrentUser);
    return user?.email === ADMIN_EMAIL;
  } catch {
    return false;
  }
}
