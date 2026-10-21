import { NextResponse } from 'next/server';
import { buildAllEntries, renderUrlset, SITEMAP_HEADERS } from '@/lib/sitemap';

/**
 * /sitemap.xml — the complete, flat sitemap (every indexable URL).
 *
 * Prerendered at build time and served from the CDN, so Search Console
 * always gets a fast static XML response. The response is a plain XML string:
 * no HTML wrapper, no client-side script, and an explicit
 * "application/xml; charset=utf-8" content type.
 */
export const dynamic = 'force-static';

export function GET() {
  return new NextResponse(renderUrlset(buildAllEntries()), {
    status: 200,
    headers: SITEMAP_HEADERS,
  });
}
