import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getVideoData } from '@/lib/serverSummary';
import { SummaryJsonLd } from '@/components/SummaryJsonLd';
import { SummaryClientView } from '@/components/SummaryClientView';

interface PageProps {
  params: {
    videoId: string;
  };
}

// Enable Incremental Static Regeneration (ISR) with revalidation every 1 hour (3600s)
export const revalidate = 3600;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { videoId } = params;

  if (!videoId || !/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
    return {
      title: 'Video Summary — YouTube Summarizer',
      description: 'AI-generated summary and transcript for YouTube videos.',
    };
  }

  const data = await getVideoData(videoId);
  const title = data.metadata.title || 'YouTube Video';
  const channel = data.metadata.channelName || 'YouTube';
  const pageTitle = `${title} — Summary & Key Takeaways | YouTube Summarizer`;

  let description = `AI summary, key takeaways, and timestamped breakdown of "${title}" by ${channel}.`;
  if (data.summary?.keyTakeaways && data.summary.keyTakeaways.length > 0) {
    description = `${data.summary.keyTakeaways.slice(0, 3).join('. ')}.`;
  }

  const canonicalUrl = `https://youtube-summarizer.vercel.app/summary/${videoId}`;
  const thumbnail =
    data.metadata.thumbnail ||
    `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return {
    title: pageTitle,
    description: description.slice(0, 160),
    keywords: [
      `${title} summary`,
      `${title} transcript`,
      `${title} notes`,
      `${channel} summary`,
      'youtube video summary',
      'ai video takeaways',
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'article',
      title: pageTitle,
      description: description.slice(0, 200),
      url: canonicalUrl,
      siteName: 'YouTube Summarizer',
      images: [
        {
          url: thumbnail,
          width: 1280,
          height: 720,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: description.slice(0, 200),
      images: [thumbnail],
    },
  };
}

export default async function SummaryPage({ params }: PageProps) {
  const { videoId } = params;

  if (!videoId || !/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
    notFound();
  }

  // Server-side retrieval (SSR/ISR cached)
  const data = await getVideoData(videoId);
  const canonicalUrl = `https://youtube-summarizer.vercel.app/summary/${videoId}`;

  return (
    <>
      {/* Rich Structured Data (VideoObject, Article, BreadcrumbList) injected in server render */}
      <SummaryJsonLd
        videoId={videoId}
        metadata={data.metadata}
        summary={data.summary}
        canonicalUrl={canonicalUrl}
      />

      {/* Interactive Client Shell */}
      <SummaryClientView
        videoId={videoId}
        initialMetadata={data.metadata}
        initialTranscript={data.transcript}
        initialFormattedTranscript={data.formattedTranscript}
        initialTranscriptWarning={data.transcriptWarning}
        initialSummary={data.summary}
        initialError={data.error}
      />
    </>
  );
}
