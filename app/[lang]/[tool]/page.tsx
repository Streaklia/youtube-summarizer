import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SeoPageLayout } from '@/components/SeoPageLayout';
import { DynamicPageView } from '@/components/DynamicPageView';
import { SupportedLanguage, isSupportedLanguage, buildHrefLangAlternates } from '@/lib/i18n';
import { TOOL_DATA, TOOL_SLUGS, ToolSlug } from '@/lib/toolTranslations';
import { getPageBySlug, getPublishedPages } from '@/lib/pagesStore';

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

    const pages = getPublishedPages();
    for (const page of pages) {
      const slug = page.route.replace(/^\//, '');
      if (slug && !TOOL_SLUGS.includes(slug as ToolSlug)) {
        params.push({ lang, tool: slug });
      }
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, tool } = params;

  if (!isSupportedLanguage(lang)) {
    return { title: 'YouTube Summarizer' };
  }

  // Check if it's a core keyword tool
  if (TOOL_SLUGS.includes(tool as ToolSlug)) {
    const toolDef = TOOL_DATA[tool as ToolSlug][lang];
    return {
      title: toolDef.title,
      description: toolDef.metaDescription,
      alternates: buildHrefLangAlternates(`/${tool}`),
      openGraph: {
        title: toolDef.title,
        description: toolDef.metaDescription,
        url: `https://www.mytranscript.pro/${lang}/${tool}`,
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

  // Check if it's an admin-managed dynamic page (e.g. /how-to-use, /about, /privacy, /terms)
  const page = getPageBySlug(tool);
  if (page) {
    const metaTitle = page.metaTitle || `${page.title} — YouTube Summarizer`;
    const metaDescription =
      page.metaDescription ||
      (page.content ? page.content.replace(/[#*`\[\]]/g, '').slice(0, 160) : '');
    return {
      title: metaTitle,
      description: metaDescription,
      alternates: buildHrefLangAlternates(`/${tool}`),
      openGraph: {
        title: metaTitle,
        description: metaDescription,
        url: `https://www.mytranscript.pro/${lang}/${tool}`,
        siteName: 'YouTube Summarizer',
        type: 'article',
      },
      twitter: {
        card: 'summary',
        title: metaTitle,
        description: metaDescription,
      },
    };
  }

  return { title: 'YouTube Summarizer' };
}

export default function LocalizedToolPage({ params }: PageProps) {
  const { lang, tool } = params;

  if (!isSupportedLanguage(lang)) {
    notFound();
  }

  // 1. Core keyword tools
  if (TOOL_SLUGS.includes(tool as ToolSlug)) {
    const toolDef = TOOL_DATA[tool as ToolSlug][lang];
    const isRtl = lang === 'ar';

    return (
      <SeoPageLayout
        lang={lang}
        dir={isRtl ? 'rtl' : 'ltr'}
        toolSlug={tool}
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

  // 2. Admin-managed dynamic pages
  const page = getPageBySlug(tool);
  if (page) {
    return <DynamicPageView page={page} />;
  }

  notFound();
}
