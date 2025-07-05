import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

export default clerkMiddleware((auth, req) => {
  try {
    if (isProtectedRoute(req)) auth().protect();
  } catch (err) {
    console.error("Middleware error:", err);
    // Optionally: return NextResponse.next();
  }
});

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
]);

export const config = {
  matcher: ["/dashboard/:path*"],
};