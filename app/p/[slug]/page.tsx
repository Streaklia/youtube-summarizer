import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageBySlug, getPublishedPages } from '@/lib/pagesStore';
import { DynamicPageView } from '@/components/DynamicPageView';

interface PageProps {
  params: {
    slug: string;
  };
}

/**
 * Pre-generate static paths for all currently published admin pages at build time.
 * At runtime, new pages created in the admin are served dynamically (ISR revalidates
 * every 60 seconds).
 */
export async function generateStaticParams() {
  const pages = getPublishedPages();
  return pages
    .map((page) => {
      // Strip leading '/' from route like '/about' → 'about'
      const slug = page.route.replace(/^\//, '');
      return slug ? { slug } : null;
    })
    .filter(Boolean) as { slug: string }[];
}

/**
 * ISR: Revalidate this page every 60 seconds so newly published
 * admin pages appear without a full redeploy.
 */
export const revalidate = 60;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = getPageBySlug(params.slug);

  if (!page) {
    return {
      title: 'Page Not Found — YouTube Summarizer',
    };
  }

  const baseUrl = 'https://youtube-summarizer.vercel.app';
  const canonicalUrl = `${baseUrl}/p/${params.slug}`;
  const metaTitle = (page as any).metaTitle || `${page.title} — YouTube Summarizer`;
  const metaDescription =
    (page as any).metaDescription ||
    (page.content ? page.content.replace(/[#*`\[\]]/g, '').slice(0, 160) : '');

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonicalUrl,
      type: 'article',
      siteName: 'YouTube Summarizer',
    },
    twitter: {
      card: 'summary',
      title: metaTitle,
      description: metaDescription,
    },
  };
}

export default function DynamicPage({ params }: PageProps) {
  const page = getPageBySlug(params.slug);

  if (!page) {
    notFound();
  }

  return <DynamicPageView page={page} />;
}
