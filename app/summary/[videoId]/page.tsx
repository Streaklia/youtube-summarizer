import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SummaryClientView } from '@/components/SummaryClientView';

interface PageProps {
  params: {
    videoId: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { videoId } = params;

  if (!videoId || !/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
    return {
      title: 'Video Summary — YouTube Summarizer',
      description: 'AI-generated summary and transcript for YouTube videos.',
    };
  }

  const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mytranscript.pro';
  const canonicalUrl = `${baseUrl}/summary/${videoId}`;

  return {
    title: 'Video Summary & Key Takeaways | YouTube Summarizer',
    description:
      'AI-generated summary, key takeaways, and timestamped transcript analysis for this YouTube video.',
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'article',
      title: 'Video Summary & Key Takeaways | YouTube Summarizer',
      description:
        'AI-generated summary, key takeaways, and timestamped transcript analysis for this YouTube video.',
      url: canonicalUrl,
      siteName: 'YouTube Summarizer',
      images: [
        {
          url: thumbnail,
          width: 1280,
          height: 720,
          alt: 'YouTube Video Summary',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Video Summary & Key Takeaways | YouTube Summarizer',
      description:
        'AI-generated summary, key takeaways, and timestamped transcript analysis for this YouTube video.',
      images: [thumbnail],
    },
  };
}

export default function SummaryPage({ params }: PageProps) {
  const { videoId } = params;

  if (!videoId || !/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
    notFound();
  }

  return <SummaryClientView videoId={videoId} />;
}
