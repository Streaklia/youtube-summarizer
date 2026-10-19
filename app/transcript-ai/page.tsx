import { Metadata } from 'next';
import { SeoPageLayout } from '@/components/SeoPageLayout';
import { buildHrefLangAlternates } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Transcript AI — Chat with Any YouTube Video Transcript Online',
  description:
    'Chat directly with YouTube video transcripts using conversational AI. Ask questions, extract answers, request summaries, and get exact timestamp citations.',
  keywords: [
    'transcript ai',
    'chat with transcript',
    'chat with youtube video',
    'ask youtube video questions',
    'ai transcript analysis',
    'conversational video search',
  ],
  alternates: buildHrefLangAlternates('/transcript-ai'),
  openGraph: {
    title: 'Transcript AI — Conversational Question-Answering for Any Video',
    description:
      'Ask any question and get instant answers with timestamped references cited directly from the video transcript.',
    url: 'https://youtube-summarizer.vercel.app/transcript-ai',
    siteName: 'YouTube Summarizer',
  },
};

export default function TranscriptAiPage() {
  return (
    <SeoPageLayout
      badge="Conversational Video AI"
      badgeEmoji="💬"
      headlinePrefix="Interactive"
      headlineGradient="Transcript AI"
      headlineSuffix="— Chat with Any Video"
      description="Don't just read the transcript—interrogate it. Ask detailed questions, verify facts, summarize specific segments, and get exact timestamp citations."
      inputPlaceholder="Paste YouTube URL to chat with video..."
      buttonLabel="Launch Transcript AI"
      features={[
        {
          icon: '💬',
          title: 'Direct Q&A with Videos',
          description: 'Ask "What did the speaker say about X?" and receive precise, factual answers grounded in the video transcript.',
        },
        {
          icon: '🎯',
          title: 'Timestamped Citations',
          description: 'Every answer references the exact moment in the video so you can cross-verify facts instantly.',
        },
        {
          icon: '🤖',
          title: 'Multi-Model Intelligence',
          description: 'Powered by Gemini and OpenRouter fallback chains to deliver fast, intelligent conversational responses.',
        },
      ]}
      faqs={[
        {
          question: 'How does Chat with Video work?',
          answer: 'The system ingests the video transcript and feeds it as grounding context to Gemini AI, allowing you to ask questions and receive answers strictly based on what was said.',
        },
        {
          question: 'Can I ask follow-up questions?',
          answer: 'Yes! The chat component maintains conversational context, so you can ask multi-turn clarifying questions.',
        },
      ]}
    />
  );
}
