import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FaqClient } from '@/components/FaqClient';
import { ALL_SUPPORTED_LANGUAGES, isSupportedLanguage, buildHrefLangAlternates } from '@/lib/i18n';
import { FAQ_ITEMS } from '@/lib/contentData';

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
    return { title: 'FAQ — MyTranscript' };
  }

  const langFaqTitles: Record<string, string> = {
    en: 'Frequently Asked Questions & Help Center',
    es: 'Preguntas Frecuentes y Centro de Ayuda',
    de: 'Häufig gestellte Fragen (FAQ)',
    fr: 'Foire Aux Questions (FAQ)',
    pt: 'Perguntas Frequentes e Ajuda',
    'pt-BR': 'Perguntas Frequentes e Ajuda',
    ar: 'الأسئلة الشائعة ومركز المساعدة',
    'zh-CN': '常见问题与帮助中心',
    ja: 'よくある質問とヘルプセンター',
    ko: '자주 묻는 질문 및 고객센터',
    vi: 'Câu hỏi thường gặp & Trợ giúp',
    th: 'คำถามที่พบบ่อยและศูนย์ช่วยเหลือ',
  };

  const title = `${langFaqTitles[lang] || 'FAQ'} — MyTranscript`;

  return {
    title,
    description: 'Frequently asked questions regarding our free AI YouTube transcript and summarizer tool.',
    alternates: buildHrefLangAlternates('/faq', lang),
    openGraph: {
      title,
      description: 'Frequently asked questions regarding our free AI YouTube transcript and summarizer tool.',
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
