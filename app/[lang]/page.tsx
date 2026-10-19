import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { LocalizedHomeClient } from '@/components/LocalizedHomeClient';
import { SUPPORTED_LANGUAGES, SupportedLanguage, isSupportedLanguage, buildHrefLangAlternates } from '@/lib/i18n';
import { getPageBySlug } from '@/lib/pagesStore';

interface PageProps {
  params: {
    lang: string;
  };
}

export function generateStaticParams() {
  // Only non-default languages are prefixed at /[lang]
  return (Object.keys(SUPPORTED_LANGUAGES) as SupportedLanguage[])
    .filter((l) => l !== 'en')
    .map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = params;

  if (!isSupportedLanguage(lang) || lang === 'en') {
    return {
      title: 'YouTube Summarizer',
    };
  }

  const config = SUPPORTED_LANGUAGES[lang];

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

  // If it's a valid non-English language code → render the localized homepage
  if (isSupportedLanguage(lang) && lang !== 'en') {
    const config = SUPPORTED_LANGUAGES[lang];
    return <LocalizedHomeClient langConfig={config} />;
  }

  // Not a language code — check if it's an admin-managed page slug
  // (middleware should have redirected already, but this is a safety net for SSG)
  const adminPage = getPageBySlug(lang);
  if (adminPage) {
    redirect(`/p/${lang}`);
  }

  // Nothing matched — 404
  notFound();
}

