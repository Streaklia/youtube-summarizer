import { Metadata } from 'next';
import { SeoPageLayout } from '@/components/SeoPageLayout';
import { buildHrefLangAlternates } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Free YouTube Transcript Generator — Extract Full Video Text Online',
  description:
    'Extract full transcripts and closed captions from any YouTube video in seconds. Free, instant, timestamped, and downloadable in Markdown or text format.',
  keywords: [
    'youtube transcript generator',
    'get transcript from youtube',
    'youtube video to transcript',
    'extract youtube captions',
    'download youtube subtitles',
    'youtube transcript online free',
  ],
  alternates: buildHrefLangAlternates('/youtube-transcript'),
  openGraph: {
    title: 'Free YouTube Transcript Generator — Extract Text with Timestamps',
    description:
      'Instantly generate and download complete, timestamped transcripts from any YouTube video for free.',
    url: 'https://youtube-summarizer.vercel.app/youtube-transcript',
    siteName: 'YouTube Summarizer',
  },
};

export default function YouTubeTranscriptPage() {
  return (
    <SeoPageLayout
      toolSlug="youtube-transcript"
      targetTab="transcript"
      badge="Instant Text Extraction"
      badgeEmoji="📄"
      headlinePrefix="Generate"
      headlineGradient="YouTube Transcripts"
      headlineSuffix="with Timestamps"
      description="Extract full, clean video transcripts in 1-2 seconds. Read alongside the video, copy to clipboard, or export to Markdown and PDF."
      inputPlaceholder="Paste YouTube URL to extract transcript..."
      buttonLabel="Get Transcript"
      features={[
        {
          icon: '⚡',
          title: 'Sub-2-Second Extraction',
          description: 'Multi-strategy engine scrapes captions directly from YouTube servers at lightning speed.',
        },
        {
          icon: '⏱️',
          title: 'Accurate Timestamps',
          description: 'Every line is tagged with exact MM:SS offsets so you can jump right to key moments.',
        },
        {
          icon: '📥',
          title: '1-Click Export',
          description: 'Download full transcripts to clean Markdown (.md) or printable PDF documentation.',
        },
      ]}
      faqs={[
        {
          question: 'How do I extract a transcript from a YouTube video?',
          answer: 'Simply copy the video link from YouTube, paste it into the search box above, and click "Get Transcript". The complete text appears within 2 seconds.',
        },
        {
          question: 'Does this work on videos with auto-generated captions?',
          answer: 'Yes! Our tool supports auto-generated subtitles, creator-uploaded captions, and multilingual closed captions.',
        },
        {
          question: 'Is this YouTube transcript tool free?',
          answer: 'Yes, 100% free with no account creation or login required.',
        },
      ]}
    />
  );
}
