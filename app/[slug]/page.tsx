import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SeoPageLayout } from '@/components/SeoPageLayout';
import { TOOL_SLUGS, ToolSlug } from '@/lib/toolTranslations';
import { getSlugConfig } from '@/lib/slugConfig';

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

  const config = getSlugConfig(slug);
  const canonicalUrl = `https://www.mytranscript.pro/${slug}`;

  return {
    title: config.title,
    description: config.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: config.title,
      description: config.metaDescription,
      url: canonicalUrl,
      siteName: 'MyTranscript',
      type: 'website',
      images: [
        {
          url: 'https://www.mytranscript.pro/logo.png',
          width: 800,
          height: 600,
          alt: `${config.h1} - mytranscript.pro`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.metaDescription,
      images: ['https://www.mytranscript.pro/logo.png'],
    },
  };
}

export default function ToolPage({ params }: PageProps) {
  const { slug } = params;

  if (!TOOL_SLUGS.includes(slug as ToolSlug)) {
    notFound();
  }

  const config = getSlugConfig(slug);

  return (
    <SeoPageLayout
      lang="en"
      dir="ltr"
      toolSlug={slug}
      targetTab={config.targetTab}
      badge={config.badge}
      badgeEmoji={config.badgeEmoji}
      h1={config.h1}
      subheadline={config.subheadline}
      description={config.subheadline}
      inputPlaceholder={config.inputPlaceholder}
      buttonLabel={config.buttonLabel}
      features={config.features}
      faqs={config.faqs}
    />
  );
}
