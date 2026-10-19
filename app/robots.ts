import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mytranscript.pro';

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/summary/', '/p/', '/blog/', '/faq', '/privacy', '/terms'],
        disallow: ['/api/', '/_next/', '/private/', '/admin/', '/admin', '/Xdmin99'],
      },
      {
        userAgent: 'Googlebot',
        allow: ['/', '/summary/', '/p/', '/blog/', '/faq', '/privacy', '/terms'],
        disallow: ['/api/', '/_next/', '/admin/', '/admin', '/Xdmin99'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
