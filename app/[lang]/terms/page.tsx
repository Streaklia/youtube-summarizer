import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TermsClient } from '@/components/TermsClient';
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
    return { title: 'Terms of Service — MyTranscript' };
  }

  const langTitles: Record<string, string> = {
    en: 'Terms of Service',
    es: 'Términos de Servicio',
    de: 'Nutzungsbedingungen',
    fr: 'Conditions d’Utilisation',
    pt: 'Termos de Serviço',
    'pt-BR': 'Termos de Serviço',
    ar: 'شروط الخدمة',
    'zh-CN': '服务条款',
    ja: '利用規約',
    ko: '이용 약관',
    vi: 'Điều khoản dịch vụ',
    th: 'ข้อกำหนดการให้บริการ',
  };

  const title = `${langTitles[lang] || 'Terms of Service'} — MyTranscript`;

  return {
    title,
    description: 'Terms of service and fair use conditions for MyTranscript.',
    alternates: buildHrefLangAlternates('/terms', lang),
    openGraph: {
      title,
      description: 'Terms of service and fair use conditions for MyTranscript.',
      url: `https://www.mytranscript.pro/${lang}/terms`,
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
