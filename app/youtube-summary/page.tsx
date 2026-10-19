import { Metadata } from 'next';
import { SeoPageLayout } from '@/components/SeoPageLayout';
import { buildHrefLangAlternates } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'AI YouTube Summarizer — Summarize Long Videos in Seconds',
  description:
    'Summarize any YouTube video instantly with Google Gemini AI. Get structured key takeaways, timestamped chapter notes, and full article breakdowns in seconds.',
  keywords: [
    'youtube summary',
    'ai youtube summarizer',
    'summarize youtube video',
    'video summary generator',
    'ai video notes',
    'youtube key takeaways',
    'gemini youtube summary',
  ],
  alternates: buildHrefLangAlternates('/youtube-summary'),
  openGraph: {
    title: 'AI YouTube Summarizer — Turn Hours of Video into 2-Minute Reads',
    description:
      'Save hours of watch time. Get bulleted key takeaways, chapter breakdowns, and full summaries from any YouTube video.',
    url: 'https://youtube-summarizer.vercel.app/youtube-summary',
    siteName: 'YouTube Summarizer',
  },
};

export default function YouTubeSummaryPage() {
  return (
    <SeoPageLayout
      badge="AI Video Intelligence"
      badgeEmoji="✨"
      headlinePrefix="Summarize Long"
      headlineGradient="YouTube Videos"
      headlineSuffix="with Gemini AI"
      description="Stop spending hours watching long tutorials and podcasts. Get actionable bullet points, timestamped chapter breakdowns, and deep insights in seconds."
      inputPlaceholder="Paste YouTube URL to generate AI summary..."
      buttonLabel="Summarize Video"
      features={[
        {
          icon: '📌',
          title: 'Actionable Key Takeaways',
          description: '5-10 core lessons and insights formatted cleanly as bullet points for quick retention.',
        },
        {
          icon: '⏱️',
          title: 'Chapter Breakdowns',
          description: 'Logical chapter breakdowns matched with video timestamps so you know exactly where topics occur.',
        },
        {
          icon: '🔄',
          title: 'Per-Section Regeneration',
          description: 'Regenerate any specific tab with a fresh perspective if you want different phrasing or depth.',
        },
      ]}
      faqs={[
        {
          question: 'Can it summarize videos that don’t have subtitles?',
          answer: 'Yes! Our fallback AI pipeline analyzes video titles, descriptions, and metadata directly to construct a comprehensive breakdown even when captions are missing.',
        },
        {
          question: 'Which AI models power the summarizer?',
          answer: 'We utilize Google Gemini 1.5 Flash and Gemini 2.5 Flash, paired with automatic failover to OpenRouter free models.',
        },
      ]}
    />
  );
}
