import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

const ROBOTS_TXT = `User-agent: *
Allow: /
Disallow: /api/

# Core Sitemaps & Machine-Readable Feeds
Sitemap: https://www.mytranscript.pro/sitemap.xml
Feed: https://www.mytranscript.pro/feed.xml

# AI & LLM Documentation Endpoints
LLM: https://www.mytranscript.pro/llms.txt
LLM-Full: https://www.mytranscript.pro/llms-full.txt
`;

export function GET() {
  return new NextResponse(ROBOTS_TXT, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=43200, s-maxage=43200',
    },
  });
}
