import { NextRequest, NextResponse } from 'next/server';
import { isSupportedLanguage } from '@/lib/i18n';

/**
 * Routes that already have dedicated Next.js App Router page files.
 * These are served directly — no redirect needed.
 */
const DEDICATED_ROUTES = new Set([
  '/',
  '/privacy',
  '/terms',
  '/faq',
  '/blog',
  '/admin',
  '/youtube-transcript',
  '/youtube-summary',
  '/youtube-infographic',
  '/youtube-to-text',
  '/podcast-transcript',
  '/transcript-ai',
]);

/**
 * Middleware: Redirect admin-managed page slugs to /p/[slug].
 *
 * When someone visits /about or /how-to-use:
 *  - It's not a supported language code → skip [lang] handling
 *  - It's not a dedicated route → redirect to /p/about or /p/how-to-use
 *
 * This avoids adding another catch-all that conflicts with [lang].
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip Next.js internals, static files, and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/p/') ||
    pathname.startsWith('/summary/') ||
    pathname.startsWith('/blog/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Extract the first path segment
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) {
    return NextResponse.next(); // root '/'
  }

  const firstSegment = segments[0];

  // If it's a supported language code, let [lang] routing handle it
  if (isSupportedLanguage(firstSegment)) {
    return NextResponse.next();
  }

  // If it's a dedicated route (exact top-level match), let it through
  const topLevelPath = `/${firstSegment}`;
  if (DEDICATED_ROUTES.has(topLevelPath)) {
    return NextResponse.next();
  }

  // Everything else: redirect to /p/[slug] where the dynamic renderer lives.
  // This covers /about → /p/about, /how-to-use → /p/how-to-use, etc.
  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = `/p${pathname}`;

  return NextResponse.redirect(redirectUrl, 308); // 308 = Permanent Redirect
}

export const config = {
  // Match all routes except static assets and Next.js internals
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
