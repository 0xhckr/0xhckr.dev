import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/admin(.*)"]);

const ALLOWED_GITHUB_USERNAME = "0xhckr";

export default clerkMiddleware(async (auth, request) => {
  if (!isProtectedRoute(request)) return;

  const { sessionClaims } = await auth.protect();

  const username = sessionClaims?.username as string | undefined;
  if (username !== ALLOWED_GITHUB_USERNAME) {
    const url = new URL("/unauthorized", request.url);
    return NextResponse.redirect(url);
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
