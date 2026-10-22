import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SeoPageLayout } from '@/components/SeoPageLayout';
import { TOOL_SLUGS, ToolSlug, getToolDefinition } from '@/lib/toolTranslations';

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return TOOL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params;

  if (!TOOL_SLUGS.includes(slug as ToolSlug)) {
    return { title: 'MyTranscript — YouTube Transcript & AI Summarizer' };
  }

  const toolDef = getToolDefinition(slug, 'en');
  const canonicalUrl = `https://www.mytranscript.pro/${slug}`;

  return {
    title: toolDef.title,
    description: toolDef.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: toolDef.title,
      description: toolDef.metaDescription,
      url: canonicalUrl,
      siteName: 'MyTranscript',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: toolDef.title,
      description: toolDef.metaDescription,
    },
  };
}

export default function ToolPage({ params }: PageProps) {
  const { slug } = params;

  if (!TOOL_SLUGS.includes(slug as ToolSlug)) {
    notFound();
  }

  const toolDef = getToolDefinition(slug, 'en');

  // Determine target tab based on slug keywords
  let targetTab = 'summary';
  if (slug.includes('transcript') || slug.includes('subtitle') || slug.includes('to-text')) {
    targetTab = 'transcript';
  } else if (slug.includes('infographic')) {
    targetTab = 'infographic';
  }

  return (
    <SeoPageLayout
      lang="en"
      dir="ltr"
      toolSlug={slug}
      targetTab={targetTab}
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
