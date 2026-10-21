import { NextResponse } from 'next/server';
import { buildCoreEntries, renderUrlset, SITEMAP_HEADERS } from '@/lib/sitemap';

/**
 * /sitemap-main.xml — static & core pages: the homepage, blog index, faq,
 * legal pages, blog articles, the localized equivalents of all of those, and
 * the admin-managed /p/ pages.
 */
export const dynamic = 'force-static';

export function GET() {
  return new NextResponse(renderUrlset(buildCoreEntries()), {
    status: 200,
    headers: SITEMAP_HEADERS,
  });
}
