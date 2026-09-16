import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
  '/auth(.*)',
  '/unauthorized(.*)',
  '/sso-callback(.*)',
  '/api/public(.*)',
]);

const isAdminRoute = createRouteMatcher([
  '/admin(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();

  // 1. If not logged in and trying to access a non-public route -> redirect to /auth
  if (!userId && !isPublicRoute(req)) {
    const authUrl = new URL('/auth', req.url);
    authUrl.searchParams.set('redirect_url', req.url);
    return NextResponse.redirect(authUrl);
  }

  // 2. Admin Route Protection: check custom publicMetadata role
  if (isAdminRoute(req)) {
    const role = (sessionClaims?.metadata as { role?: string })?.role;
    if (role !== 'admin') {
      const unauthorizedUrl = new URL('/unauthorized', req.url);
      return NextResponse.redirect(unauthorizedUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|json|webmanifest|png|jpg|jpeg|gif|svg|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
