import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogIndexClient } from '@/components/BlogIndexClient';
import { ALL_SUPPORTED_LANGUAGES, isSupportedLanguage, buildHrefLangAlternates } from '@/lib/i18n';

interface PageProps {
  params: {
    lang: string;
  };
}

export function generateStaticParams() {
  return ALL_SUPPORTED_LANGUAGES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = params;
  if (!isSupportedLanguage(lang)) {
    return { title: 'Blog — MyTranscript' };
  }

  const langNames: Record<string, string> = {
    en: 'Blog & Articles',
    es: 'Blog y Artículos',
    de: 'Blog & Artikel',
    fr: 'Blog & Articles',
    pt: 'Blog e Artigos',
    'pt-BR': 'Blog e Artigos',
    ar: 'المدونة والمقالات',
    'zh-CN': '博客与文章',
    ja: 'ブログ・記事',
    ko: '블로그 및 아티클',
    vi: 'Blog & Bài viết',
    th: 'บล็อกและบทความ',
  };

  const title = `${langNames[lang] || 'Blog'} — MyTranscript`;

  return {
    title,
    description: 'Guides, benchmarks, caption accuracy studies, and tutorials for AI YouTube summarization.',
    alternates: buildHrefLangAlternates('/blog', lang),
    openGraph: {
      title,
      description: 'Guides, benchmarks, caption accuracy studies, and tutorials for AI YouTube summarization.',
      url: `https://www.mytranscript.pro/${lang}/blog`,
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
