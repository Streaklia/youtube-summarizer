import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Contact Us | MyTranscript',
  description:
    'Get in touch with the MyTranscript team for support, feedback, or business inquiries.',
  alternates: { canonical: 'https://www.mytranscript.pro/contact-us' },
};

export default function ContactUsPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <Link href="/" className="text-sm text-red-400 hover:text-red-300 transition-colors mb-8 inline-block">
          ← Back to Home
        </Link>
        <h1 className="text-3xl font-bold text-white mt-4 mb-6">Contact Us</h1>
        <div className="prose prose-invert prose-sm sm:prose-base max-w-none prose-headings:text-white prose-p:text-gray-300">
          <p>
            We&apos;d love to hear from you. Whether you have a question about the app, a bug report,
            or a business inquiry, please reach out using the details below.
          </p>
          <h2>Support</h2>
          <p>
            For general support and questions about using MyTranscript, please email us at{' '}
            <a href="mailto:support@mytranscript.pro">support@mytranscript.pro</a>.
          </p>
          <h2>Business &amp; Partnerships</h2>
          <p>
            For partnership inquiries, API access, or enterprise licensing, contact us at{' '}
            <a href="mailto:hello@mytranscript.pro">hello@mytranscript.pro</a>.
          </p>
          <h2>Bug Reports</h2>
          <p>
            Found a bug? Please describe the issue, the YouTube URL you were using, and your browser
            version, and send it to{' '}
            <a href="mailto:support@mytranscript.pro">support@mytranscript.pro</a>.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
