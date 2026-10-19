import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { LocalizedHomeClient } from '@/components/LocalizedHomeClient';
import { SupportedLanguage, isSupportedLanguage, buildHrefLangAlternates } from '@/lib/i18n';
import { getLanguageConfig } from '@/lib/languagesStore';
import { getPageBySlug } from '@/lib/pagesStore';

interface PageProps {
  params: {
    lang: string;
  };
}

export function generateStaticParams() {
  // Support all 6 languages: en, es, de, fr, pt, ar
  return (['en', 'es', 'de', 'fr', 'pt', 'ar'] as SupportedLanguage[]).map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = params;

  if (!isSupportedLanguage(lang)) {
    return {
      title: 'YouTube Summarizer',
    };
  }

  const config = getLanguageConfig(lang);

  return {
    title: config.metaTitle,
    description: config.metaDescription,
    alternates: buildHrefLangAlternates('/'),
    openGraph: {
      title: config.metaTitle,
      description: config.metaDescription,
      url: `https://youtube-summarizer.vercel.app/${lang}`,
      type: 'website',
    },
  };
}

export default function LocalizedHomePage({ params }: PageProps) {
  const { lang } = params;

  // If it's a valid language code (including en) → render the localized homepage
  if (isSupportedLanguage(lang)) {
    const config = getLanguageConfig(lang);
    return <LocalizedHomeClient langConfig={config} />;
  }

  // Not a language code — check if it's an admin-managed page slug
  const adminPage = getPageBySlug(lang);
  if (adminPage) {
    redirect(`/p/${lang}`);
  }

  // Nothing matched — 404
  notFound();
}

