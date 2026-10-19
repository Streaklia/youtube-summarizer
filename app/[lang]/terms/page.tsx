import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TermsClient } from '@/components/TermsClient';
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
    return { title: 'Terms of Service — YouTube Summarizer' };
  }

  const langTitles: Record<string, string> = {
    en: 'Terms of Service',
    es: 'Términos de Servicio',
    de: 'Nutzungsbedingungen',
    fr: 'Conditions d’Utilisation',
    pt: 'Termos de Serviço',
    ar: 'شروط الخدمة',
  };

  const title = `${langTitles[lang] || 'Terms of Service'} — YouTube Summarizer`;

  return {
    title,
    description: 'Terms of service and fair use conditions for YouTube Summarizer.',
    alternates: buildHrefLangAlternates('/terms'),
    openGraph: {
      title,
      description: 'Terms of service and fair use conditions for YouTube Summarizer.',
      url: `https://youtube-summarizer.vercel.app/${lang}/terms`,
      type: 'website',
    },
  };
}

export default function LocalizedTermsPage({ params }: PageProps) {
  const { lang } = params;
  if (!isSupportedLanguage(lang)) {
    notFound();
  }

  return <TermsClient lang={lang} />;
}
