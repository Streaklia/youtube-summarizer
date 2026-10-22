import { NextResponse } from 'next/server';
import { BLOG_POSTS } from '@/lib/contentData';
import { TOOL_SLUGS } from '@/lib/toolTranslations';

const BASE_URL = 'https://www.mytranscript.pro';

export const dynamic = 'force-static';

function urlEntry(
  loc: string,
  lastmod: string,
  changefreq: string,
  priority: string
): string {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export function GET() {
  const today = new Date().toISOString().split('T')[0];

  const entries: string[] = [
    // Homepage
    urlEntry(`${BASE_URL}/`, today, 'weekly', '1.0'),
    // Web App
    urlEntry(`${BASE_URL}/app/`, today, 'monthly', '0.8'),
    // English Programmatic Tool Slugs
    ...TOOL_SLUGS.map((slug) =>
      urlEntry(`${BASE_URL}/${slug}`, today, 'weekly', '0.9')
    ),
    // Articles index
    urlEntry(`${BASE_URL}/articles/`, today, 'monthly', '0.7'),
    // Article detail pages
    ...BLOG_POSTS.map((post) =>
      urlEntry(`${BASE_URL}/articles/${post.slug}`, today, 'monthly', '0.6')
    ),
    // Legal & corporate pages
    urlEntry(`${BASE_URL}/about-us`, today, 'monthly', '0.4'),
    urlEntry(`${BASE_URL}/contact-us`, today, 'monthly', '0.4'),
    urlEntry(`${BASE_URL}/privacy-policy`, today, 'monthly', '0.4'),
    urlEntry(`${BASE_URL}/terms-of-service`, today, 'monthly', '0.4'),
    urlEntry(`${BASE_URL}/disclaimer`, today, 'monthly', '0.4'),
    urlEntry(`${BASE_URL}/copyright-policy`, today, 'monthly', '0.4'),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=43200, s-maxage=43200',
    },
  });
}
