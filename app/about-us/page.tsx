import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'About Us | MyTranscript — AI YouTube Summarizer',
  description:
    'Learn about MyTranscript, the free AI-powered YouTube transcript extractor and video summarizer built to save you time.',
  alternates: { canonical: 'https://www.mytranscript.pro/about-us' },
};

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <Link href="/" className="text-sm text-red-400 hover:text-red-300 transition-colors mb-8 inline-block">
          ← Back to Home
        </Link>
        <h1 className="text-3xl font-bold text-white mt-4 mb-6">About Us</h1>
        <div className="prose prose-invert prose-sm sm:prose-base max-w-none prose-headings:text-white prose-p:text-gray-300">
          <p>
            MyTranscript is a free, AI-powered web application that extracts timestamped transcripts
            from any YouTube video and generates instant AI summaries, key takeaways, and chapter
            breakdowns — no sign-up required.
          </p>
          <h2>Our Mission</h2>
          <p>
            We believe knowledge locked inside hours of video should be instantly accessible to everyone.
            MyTranscript bridges the gap between long-form video content and productive, readable insights
            by combining YouTube&apos;s caption infrastructure with the latest large language models from
            Google Gemini and OpenRouter.
          </p>
          <h2>What We Build</h2>
          <ul>
            <li>Timestamped transcript extraction from any public YouTube video</li>
            <li>AI-generated key takeaways and chapter summaries</li>
            <li>Interactive chat with video content</li>
            <li>Infographic-style visual summaries</li>
          </ul>
          <h2>Contact</h2>
          <p>
            For questions, feedback, or partnership inquiries, please visit our{' '}
            <Link href="/contact-us">Contact page</Link>.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
