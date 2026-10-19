import { NextRequest, NextResponse } from 'next/server';
import { getPublishedPages, getPageBySlug } from '@/lib/pagesStore';

export const dynamic = 'force-dynamic';

/**
 * Public GET /api/pages
 * Query params:
 *   - ?slug=/about     → returns single page object or 404
 *   - (no params)      → returns all published pages array
 *
 * No authentication required — only published pages are exposed.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    if (slug) {
      const page = getPageBySlug(slug);
      if (!page) {
        return NextResponse.json(
          { error: `No published page found for slug: ${slug}` },
          { status: 404 }
        );
      }
      return NextResponse.json(page);
    }

    // Return all published pages (used by nav menus etc.)
    const pages = getPublishedPages();
    return NextResponse.json(pages);
  } catch (error: any) {
    console.error('[/api/pages] Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to read pages' },
      { status: 500 }
    );
  }
}
