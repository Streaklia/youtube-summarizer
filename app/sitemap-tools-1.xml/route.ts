import { NextResponse } from 'next/server';
import { buildToolEntries, chunk, renderUrlset, SITEMAP_HEADERS } from '@/lib/sitemap';

/**
 * /sitemap-tools-1.xml — tool pages, chunk 1 (root tool routes + localized
 * tools). Sitemaps are capped at SITEMAP_CHUNK_SIZE URLs per file; if the
 * tool catalogue ever grows past one chunk, chunk 2 (and 3) take over and
 * the master index lists whichever chunks exist.
 */
export const dynamic = 'force-static';

const CHUNK_INDEX = 0;

export function GET() {
  const slice = chunk(buildToolEntries())[CHUNK_INDEX];

  if (!slice) {
    return new NextResponse('Not found', {
      status: 404,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  return new NextResponse(renderUrlset(slice), {
    status: 200,
    headers: SITEMAP_HEADERS,
  });
}
