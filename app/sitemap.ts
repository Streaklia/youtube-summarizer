import { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/lib/contentData';
import { ALL_SUPPORTED_LANGUAGES } from '@/lib/i18n';
import { getPublishedPages } from '@/lib/pagesStore';
import { TOOL_SLUGS } from '@/lib/toolTranslations';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mytranscript.pro';
  const currentDate = new Date();

  const routes: MetadataRoute.Sitemap = [];

  // 1. Core Primary Root Routes
  routes.push({
    url: `${baseUrl}`,
    lastModified: currentDate,
    changeFrequency: 'daily',
    priority: 1.0,
  });

  // Root tool pages
  for (const tool of TOOL_SLUGS) {
    routes.push({
      url: `${baseUrl}/${tool}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    });
  }

  // Root Resources & Legal
  routes.push(
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    }
  );

  // Root individual blog articles
  for (const post of BLOG_POSTS) {
    routes.push({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  }

  // 2. Multi-Language Programmatic Routes across all supported locales
  for (const lang of ALL_SUPPORTED_LANGUAGES) {
    // Localized Homepage
    routes.push({
      url: `${baseUrl}/${lang}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    });

    // Localized Informational Pages
    routes.push(
      {
        url: `${baseUrl}/${lang}/blog`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/${lang}/faq`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/${lang}/privacy`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.4,
      },
      {
        url: `${baseUrl}/${lang}/terms`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.4,
      }
    );

    // Localized Keyword Tool Routes (e.g. /[lang]/youtube-transcript, /[lang]/youtube-summarizer, etc.)
    for (const tool of TOOL_SLUGS) {
      routes.push({
        url: `${baseUrl}/${lang}/${tool}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }

    // Localized Blog Articles (e.g. /[lang]/blog/[article-slug])
    for (const post of BLOG_POSTS) {
      routes.push({
        url: `${baseUrl}/${lang}/blog/${post.slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }
  }

  // Admin-managed pages at /p/[slug]
  const adminPages = getPublishedPages();
  for (const page of adminPages) {
    const slug = page.route.replace(/^\//, '');
    if (slug) {
      routes.push({
        url: `${baseUrl}/p/${slug}`,
        lastModified: page.updatedAt ? new Date(page.updatedAt) : currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      });
    }
  }

  return routes;
}
