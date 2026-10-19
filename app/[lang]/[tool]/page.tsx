import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SeoPageLayout } from '@/components/SeoPageLayout';
import { SupportedLanguage, isSupportedLanguage, buildHrefLangAlternates } from '@/lib/i18n';
import { TOOL_DATA, TOOL_SLUGS, ToolSlug } from '@/lib/toolTranslations';

interface PageProps {
  params: {
    lang: string;
    tool: string;
  };
}

export function generateStaticParams() {
  const languages: SupportedLanguage[] = ['en', 'es', 'de', 'fr', 'pt', 'ar'];
  const params: { lang: string; tool: string }[] = [];

  for (const lang of languages) {
    for (const tool of TOOL_SLUGS) {
      params.push({ lang, tool });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, tool } = params;

  if (!isSupportedLanguage(lang) || !TOOL_SLUGS.includes(tool as ToolSlug)) {
    return { title: 'YouTube Summarizer Tool' };
  }

  const toolDef = TOOL_DATA[tool as ToolSlug][lang];

  return {
    title: toolDef.title,
    description: toolDef.metaDescription,
    alternates: buildHrefLangAlternates(`/${tool}`),
    openGraph: {
      title: toolDef.title,
      description: toolDef.metaDescription,
      url: `https://youtube-summarizer.vercel.app/${lang}/${tool}`,
      siteName: 'YouTube Summarizer',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: toolDef.title,
      description: toolDef.metaDescription,
    },
  };
}

export default function LocalizedToolPage({ params }: PageProps) {
  const { lang, tool } = params;

  if (!isSupportedLanguage(lang) || !TOOL_SLUGS.includes(tool as ToolSlug)) {
    notFound();
  }

  const toolDef = TOOL_DATA[tool as ToolSlug][lang];
  const isRtl = lang === 'ar';

  return (
    <SeoPageLayout
      lang={lang}
      dir={isRtl ? 'rtl' : 'ltr'}
      badge={toolDef.badge}
      badgeEmoji={toolDef.badgeEmoji}
      headlinePrefix={toolDef.headlinePrefix}
      headlineGradient={toolDef.headlineGradient}
      headlineSuffix={toolDef.headlineSuffix}
      description={toolDef.description}
      inputPlaceholder={toolDef.inputPlaceholder}
      buttonLabel={toolDef.buttonLabel}
      features={toolDef.features}
      faqs={toolDef.faqs}
    />
  );
}
