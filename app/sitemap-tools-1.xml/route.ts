import { NextResponse } from 'next/server';
import { ALL_SUPPORTED_LANGUAGES } from '@/lib/i18n';
import { TOOL_SLUGS } from '@/lib/toolTranslations';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mytranscript.pro';

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
  const entries: string[] = [];

  // Root tool pages (non-localized)
  for (const slug of TOOL_SLUGS) {
    entries.push(urlEntry(`${BASE_URL}/${slug}`, today, 'weekly', '0.9'));
  }

  // Localized tool pages: /[lang]/[slug]
  for (const lang of ALL_SUPPORTED_LANGUAGES) {
    for (const slug of TOOL_SLUGS) {
      entries.push(urlEntry(`${BASE_URL}/${lang}/${slug}`, today, 'weekly', '0.8'));
    }
  }

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
