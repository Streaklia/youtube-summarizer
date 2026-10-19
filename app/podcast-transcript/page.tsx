import { Metadata } from 'next';
import { SeoPageLayout } from '@/components/SeoPageLayout';
import { buildHrefLangAlternates } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'YouTube Podcast Transcript Generator — Transcribe Video Podcasts',
  description:
    'Generate full transcripts and summaries for video podcasts on YouTube. Extract insights, timestamps, guest quotes, and summaries from Joe Rogan, Huberman, Lex Fridman, and more.',
  keywords: [
    'podcast transcript',
    'youtube podcast transcript',
    'transcribe podcast youtube',
    'podcast summary generator',
    'huberman transcript',
    'lex fridman transcript',
    'joe rogan transcript',
    'ai podcast notes',
  ],
  alternates: buildHrefLangAlternates('/podcast-transcript'),
  openGraph: {
    title: 'YouTube Podcast Transcript & Notes Generator — Fast AI Summaries',
    description:
      'Transcribe 3-hour video podcasts in seconds. Extract guest quotes, timestamps, and key insights automatically.',
    url: 'https://youtube-summarizer.vercel.app/podcast-transcript',
    siteName: 'YouTube Summarizer',
  },
};

export default function PodcastTranscriptPage() {
  return (
    <SeoPageLayout
      toolSlug="podcast-transcript"
      targetTab="transcript"
      badge="Podcast Intelligence"
      badgeEmoji="🎙️"
      headlinePrefix="Extract Transcripts from"
      headlineGradient="YouTube Video Podcasts"
      headlineSuffix="in Seconds"
      description="Turn 2-3 hour long podcast discussions into digestible key takeaways, topic chapters, and searchable quotes. Built for podcasts like Huberman Lab, Lex Fridman, and All-In."
      inputPlaceholder="Paste YouTube podcast URL here..."
      buttonLabel="Transcribe Podcast"
      features={[
        {
          icon: '🎙️',
          title: 'Engineered for Long-Form Audio',
          description: 'Optimized sampling handles massive 3+ hour video podcast transcripts seamlessly.',
        },
        {
          icon: '💬',
          title: 'Chat with the Episode',
          description: 'Ask specific questions about claims, book recommendations, and quotes made by the podcast host or guest.',
        },
        {
          icon: '⏱️',
          title: 'Jump to Key Moments',
          description: 'Click through chapter timestamps to navigate straight to the topics you care about most.',
        },
      ]}
      faqs={[
        {
          question: 'Can this summarize multi-hour podcast episodes?',
          answer: 'Yes! Our pipeline handles long episodes by intelligently grouping and sampling transcript blocks to deliver concise, insightful takeaways.',
        },
        {
          question: 'Can I search the podcast text for specific keywords?',
          answer: 'Absolutely. Once the transcript loads in 1-2 seconds, you can use the interactive search bar or browser Ctrl+F to find exact quotes and timestamps.',
        },
      ]}
    />
  );
}
