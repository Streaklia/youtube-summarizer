import { NextResponse } from 'next/server';
import { buildToolEntries, chunk, renderUrlset, SITEMAP_HEADERS } from '@/lib/sitemap';

/**
 * /sitemap-tools-3.xml — tool pages, chunk 3. 404s while unused; the master
 * index only lists chunks that exist.
 */
export const dynamic = 'force-static';

const CHUNK_INDEX = 2;

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
