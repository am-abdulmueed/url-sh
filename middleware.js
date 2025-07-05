import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: ["/dashboard/:path*"], // Only protect /dashboard routes
};