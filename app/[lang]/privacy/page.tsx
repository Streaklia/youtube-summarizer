import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PrivacyClient } from '@/components/PrivacyClient';
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
    return { title: 'Privacy Policy — YouTube Summarizer' };
  }

  const langTitles: Record<string, string> = {
    en: 'Privacy Policy',
    es: 'Política de Privacidad',
    de: 'Datenschutzerklärung',
    fr: 'Politique de Confidentialité',
    pt: 'Política de Privacidade',
    ar: 'سياسة الخصوصية',
  };

  const title = `${langTitles[lang] || 'Privacy Policy'} — YouTube Summarizer`;

  return {
    title,
    description: 'Privacy commitments, zero data storage, and client-side API key handling.',
    alternates: buildHrefLangAlternates('/privacy'),
    openGraph: {
      title,
      description: 'Privacy commitments, zero data storage, and client-side API key handling.',
      url: `https://www.mytranscript.pro/${lang}/privacy`,
      type: 'website',
    },
  };
}

export default function LocalizedPrivacyPage({ params }: PageProps) {
  const { lang } = params;
  if (!isSupportedLanguage(lang)) {
    notFound();
  }

  return <PrivacyClient lang={lang} />;
}
