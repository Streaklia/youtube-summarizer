import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogIndexClient } from '@/components/BlogIndexClient';
import { SUPPORTED_LANGUAGES, SupportedLanguage, isSupportedLanguage, buildHrefLangAlternates } from '@/lib/i18n';

interface PageProps {
  params: {
    lang: string;
  };
}

export function generateStaticParams() {
  return (['en', 'es', 'de', 'fr', 'pt', 'ar'] as SupportedLanguage[]).map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = params;
  if (!isSupportedLanguage(lang)) {
    return { title: 'Blog — YouTube Summarizer' };
  }

  const langNames: Record<string, string> = {
    en: 'Blog & Articles',
    es: 'Blog y Artículos',
    de: 'Blog & Artikel',
    fr: 'Blog & Articles',
    pt: 'Blog e Artigos',
    ar: 'المدونة والمقالات',
  };

  const title = `${langNames[lang] || 'Blog'} — YouTube Summarizer`;

  return {
    title,
    description: 'Guides, benchmarks, and tutorials for AI YouTube summarization.',
    alternates: buildHrefLangAlternates('/blog'),
    openGraph: {
      title,
      description: 'Guides, benchmarks, and tutorials for AI YouTube summarization.',
      url: `https://youtube-summarizer.vercel.app/${lang}/blog`,
      type: 'website',
    },
  };
}

export default function LocalizedBlogIndexPage({ params }: PageProps) {
  const { lang } = params;
  if (!isSupportedLanguage(lang)) {
    notFound();
  }

  return <BlogIndexClient lang={lang} />;
}
