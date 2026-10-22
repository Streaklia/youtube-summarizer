import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy | MyTranscript',
  description:
    'Read the MyTranscript privacy policy to understand how we collect, use, and protect your data.',
  alternates: { canonical: 'https://www.mytranscript.pro/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <Link href="/" className="text-sm text-red-400 hover:text-red-300 transition-colors mb-8 inline-block">
          ← Back to Home
        </Link>
        <h1 className="text-3xl font-bold text-white mt-4 mb-2">Privacy Policy</h1>
        <p className="text-gray-500 text-sm mb-8">Last updated: October 2026</p>
        <div className="prose prose-invert prose-sm sm:prose-base max-w-none prose-headings:text-white prose-p:text-gray-300">
          <h2>Information We Collect</h2>
          <p>
            MyTranscript does not require account registration. When you use our service, we may
            collect the YouTube URL you submit and anonymous usage analytics (page views, error
            rates) via Google Analytics.
          </p>
          <h2>How We Use Your Data</h2>
          <p>
            YouTube URLs you submit are used solely to fetch captions and generate AI summaries.
            We do not store your URLs after your session ends. Analytics data is aggregated and
            never sold to third parties.
          </p>
          <h2>Third-Party Services</h2>
          <p>
            We use Google Analytics (GA4) for anonymous usage statistics and Google Gemini API /
            OpenRouter for AI processing. These services have their own privacy policies.
          </p>
          <h2>Cookies</h2>
          <p>
            We use minimal, functional cookies to remember your AI provider preference (stored
            locally in your browser). We do not use tracking cookies for advertising.
          </p>
          <h2>Contact</h2>
          <p>
            For privacy-related questions, contact us at{' '}
            <a href="mailto:privacy@mytranscript.pro">privacy@mytranscript.pro</a>.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
