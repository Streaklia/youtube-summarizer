import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FaqClient } from '@/components/FaqClient';
import { SUPPORTED_LANGUAGES, SupportedLanguage, isSupportedLanguage, buildHrefLangAlternates } from '@/lib/i18n';
import { FAQ_ITEMS } from '@/lib/contentData';

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
    return { title: 'FAQ — YouTube Summarizer' };
  }

  const langFaqTitles: Record<string, string> = {
    en: 'Frequently Asked Questions & Help Center',
    es: 'Preguntas Frecuentes y Centro de Ayuda',
    de: 'Häufig gestellte Fragen (FAQ)',
    fr: 'Foire Aux Questions (FAQ)',
    pt: 'Perguntas Frequentes e Ajuda',
    ar: 'الأسئلة الشائعة ومركز المساعدة',
  };

  const title = `${langFaqTitles[lang] || 'FAQ'} — YouTube Summarizer`;

  return {
    title,
    description: 'Frequently asked questions regarding our free AI YouTube video summarizer.',
    alternates: buildHrefLangAlternates('/faq'),
    openGraph: {
      title,
      description: 'Frequently asked questions regarding our free AI YouTube video summarizer.',
      url: `https://www.mytranscript.pro/${lang}/faq`,
      type: 'website',
    },
  };
}

export default function LocalizedFaqPage({ params }: PageProps) {
  const { lang } = params;
  if (!isSupportedLanguage(lang)) {
    notFound();
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FaqClient lang={lang} />
    </>
  );
}
