import { MetadataRoute } from 'next';

/**
 * Kept in sync with public/robots.txt — that static file is what the server
 * actually serves at /robots.txt, so both must list the same sitemaps:
 * the flat /sitemap.xml and the segmented /sitemap_index.xml.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mytranscript.pro';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/', '/private/', '/admin/', '/summary/'],
    },
    sitemap: [`${baseUrl}/sitemap.xml`, `${baseUrl}/sitemap_index.xml`],
  };
}
