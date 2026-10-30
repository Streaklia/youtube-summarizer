import React from 'react';
import { VideoMetadata, SummaryResult } from '@/lib/types';

interface SummaryJsonLdProps {
  videoId: string;
  metadata: VideoMetadata;
  summary: SummaryResult | null;
  canonicalUrl: string;
}

export function SummaryJsonLd({
  videoId,
  metadata,
  summary,
  canonicalUrl,
}: SummaryJsonLdProps) {
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  const description =
    summary?.keyTakeaways && summary.keyTakeaways.length > 0
      ? summary.keyTakeaways.slice(0, 3).join('. ')
      : `AI-generated summary and transcript analysis for "${metadata.title}" by ${metadata.channelName}.`;

  // 1. VideoObject Schema
  const videoSchema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: metadata.title,
    description: description,
    thumbnailUrl: [
      metadata.thumbnail,
      `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    ],
    uploadDate: metadata.publishDate || new Date().toISOString(),
    contentUrl: watchUrl,
    embedUrl: embedUrl,
  };

  if (metadata.category) {
    videoSchema.genre = metadata.category;
  }

  if (metadata.viewCount) {
    const numericViews = parseInt(metadata.viewCount.replace(/[^0-9]/g, ''), 10);
    if (!isNaN(numericViews) && numericViews > 0) {
      videoSchema.interactionStatistic = {
        '@type': 'InteractionCounter',
        interactionType: { '@type': 'WatchAction' },
        userInteractionCount: numericViews,
      };
    }
  }

  if (metadata.duration) {
    // Convert duration like "10:30" or "1:15:30" to ISO 8601 duration "PT10M30S"
    const parts = metadata.duration.split(':').map((p) => parseInt(p, 10));
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      videoSchema.duration = `PT${parts[0]}M${parts[1]}S`;
    } else if (
      parts.length === 3 &&
      !isNaN(parts[0]) &&
      !isNaN(parts[1]) &&
      !isNaN(parts[2])
    ) {
      videoSchema.duration = `PT${parts[0]}H${parts[1]}M${parts[2]}S`;
    }
  }

  if (metadata.channelName) {
    videoSchema.author = {
      '@type': 'Person',
      name: metadata.channelName,
    };
  }

  // 2. Article / Analysis Schema
  const articleSchema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    headline: `${metadata.title} — AI Summary & Key Takeaways`,
    description: description,
    image: [metadata.thumbnail],
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: 'YouTube Summarizer',
      url: 'https://www.mytranscript.pro',
    },
    publisher: {
      '@type': 'Organization',
      name: 'YouTube Summarizer',
      logo: {
        '@type': 'ImageObject',
        url: 'https://img.youtube.com/vi/default/hqdefault.jpg',
      },
    },
    about: {
      '@type': 'VideoObject',
      name: metadata.title,
      embedUrl: embedUrl,
    },
  };

  if (summary?.fullSummary) {
    articleSchema.articleBody = summary.fullSummary.slice(0, 5000);
  }

  // 3. BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.mytranscript.pro',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: metadata.title,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
