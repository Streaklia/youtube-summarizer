import { NextRequest, NextResponse } from 'next/server';
import { isSupportedLanguage } from '@/lib/i18n';
import { TOOL_SLUGS } from '@/lib/toolTranslations';

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
  '/Xdmin99',
  '/youtube-transcript',
  '/youtube-summary',
  '/youtube-infographic',
  '/youtube-to-text',
  '/podcast-transcript',
  '/transcript-ai',
]);

/**
 * Middleware: Redirect admin-managed page slugs to /p/[slug] and tool slugs to /en/[tool].
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

  // If it's a dedicated route with an existing app directory, let it through
  const topLevelPath = `/${firstSegment}`;
  if (DEDICATED_ROUTES.has(topLevelPath)) {
    return NextResponse.next();
  }

  // If it's a core programmatic tool slug, redirect to canonical /en/[tool]
  if (TOOL_SLUGS.includes(firstSegment as any)) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = `/en/${firstSegment}`;
    return NextResponse.redirect(redirectUrl, 308);
  }

  // Everything else: redirect to /p/[slug] where the dynamic renderer lives.
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
