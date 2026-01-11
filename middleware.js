import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 1. Define which routes are public (don't require login)
const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/", // Add other public routes here
]);

export default clerkMiddleware(async (auth, request) => {
  // 2. Protect all routes except public ones
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // 1. Skip Next.js internals and all static files (images, favicons, etc.)
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // 2. Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
