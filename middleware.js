import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define public routes
const isPublicRoute = createRouteMatcher(['/sign-up(.*)', '/sign-in(.*)', '/dashboard']);

export default clerkMiddleware(async (auth, request) => {
  const pathname = request.nextUrl.pathname;

  // Allow public routes to bypass authentication
  if (isPublicRoute(request)) {
    console.log('Public route accessed:', pathname);
    return;
  }

  console.log('Protected route accessed:', pathname);
  await auth.protect();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
