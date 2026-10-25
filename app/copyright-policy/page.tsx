import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Copyright Policy | MyTranscript',
  description:
    'Understand how MyTranscript handles copyright, DMCA notices, and intellectual property rights.',
  alternates: { canonical: 'https://www.mytranscript.pro/copyright-policy' },
};

export default function CopyrightPolicyPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <Link href="/" className="text-sm text-red-400 hover:text-red-300 transition-colors mb-8 inline-block">
          ← Back to Home
        </Link>
        <h1 className="text-3xl font-bold text-white mt-4 mb-2">Copyright Policy</h1>
        <p className="text-gray-500 text-sm mb-8">Last updated: October 2026</p>
        <div className="prose prose-invert prose-sm sm:prose-base max-w-none prose-headings:text-white prose-p:text-gray-300">
          <h2>Respect for Intellectual Property</h2>
          <p>
            MyTranscript accesses only publicly available YouTube caption data via YouTube&apos;s
            standard caption infrastructure. We do not download, redistribute, or store video files
            or audio streams.
          </p>
          <h2>Copyright Ownership</h2>
          <p>
            All original video content, scripts, and creative material remain the exclusive property
            of the YouTube content creators and rights holders. MyTranscript does not claim any
            ownership over transcribed or summarized content.
          </p>
          <h2>DMCA Takedown Notices</h2>
          <p>
            If you believe that content accessible via our service infringes your copyright, please
            send a DMCA takedown notice to{' '}
            <a href="mailto:dmca@mytranscript.pro">dmca@mytranscript.pro</a> with:
          </p>
          <ul>
            <li>A description of the copyrighted work claimed to be infringed</li>
            <li>The URL or other identifier of the allegedly infringing material</li>
            <li>Your contact information and a good-faith statement of infringement</li>
            <li>Your physical or electronic signature</li>
          </ul>
          <h2>Fair Use</h2>
          <p>
            Transcript extraction and AI summarization may constitute fair use for purposes of
            commentary, criticism, research, and education under applicable copyright law. Users
            are responsible for ensuring their own use complies with applicable law.
          </p>
        </div>
      </div>
    </main>
  );
}
