import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PrivacyClient } from '@/components/PrivacyClient';
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
    return { title: 'Privacy Policy — MyTranscript' };
  }

  const langTitles: Record<string, string> = {
    en: 'Privacy Policy',
    es: 'Política de Privacidad',
    de: 'Datenschutzerklärung',
    fr: 'Politique de Confidentialité',
    pt: 'Política de Privacidade',
    'pt-BR': 'Política de Privacidade',
    ar: 'سياسة الخصوصية',
    'zh-CN': '隐私政策',
    ja: 'プライバシーポリシー',
    ko: '개인정보 처리방침',
    vi: 'Chính sách bảo mật',
    th: 'นโยบายความเป็นส่วนตัว',
  };

  const title = `${langTitles[lang] || 'Privacy Policy'} — MyTranscript`;

  return {
    title,
    description: 'Privacy commitments, zero data storage, and client-side API key handling.',
    alternates: buildHrefLangAlternates('/privacy', lang),
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
