import { NextResponse } from 'next/server';
import { renderSitemapIndex, SITEMAP_HEADERS, toolSegmentFiles } from '@/lib/sitemap';

/**
 * /sitemap_index.xml — the master index.
 *
 * It points at the segmented files: the static & core pages plus one file per
 * chunk of tool URLs. Only chunks that actually contain URLs are listed, so
 * the index never references a 404.
 */
export const dynamic = 'force-static';

export function GET() {
  const files = ['sitemap-main.xml', ...toolSegmentFiles()];

  return new NextResponse(renderSitemapIndex(files), {
    status: 200,
    headers: SITEMAP_HEADERS,
  });
}
