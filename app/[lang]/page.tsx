import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LocalizedHomeClient } from '@/components/LocalizedHomeClient';
import { SUPPORTED_LANGUAGES, SupportedLanguage, isSupportedLanguage, buildHrefLangAlternates } from '@/lib/i18n';

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

  // Validate supported language; if 'en', canonical is '/'
  if (!isSupportedLanguage(lang) || lang === 'en') {
    notFound();
  }

  const config = SUPPORTED_LANGUAGES[lang];
  return <LocalizedHomeClient langConfig={config} />;
}
