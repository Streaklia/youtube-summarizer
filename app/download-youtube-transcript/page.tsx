import { Metadata } from 'next';
import { GscLandingToolLayout } from '@/components/GscLandingToolLayout';
import { Download, FileText, Clock, FileCode, CheckCircle, Shield, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Download YouTube Transcript – Free Export to TXT, SRT & PDF',
  description:
    'Download full YouTube video transcripts instantly in TXT, SRT, or PDF. 100% free online caption downloader with accurate timestamps and no software install.',
  keywords: [
    'youtube transcript download',
    'download youtube transcript',
    'export youtube captions',
    'youtube transcript txt',
    'download youtube subtitles srt',
    'free transcript downloader',
    'youtube caption extractor',
  ],
  alternates: {
    canonical: 'https://www.mytranscript.pro/download-youtube-transcript',
  },
  openGraph: {
    title: 'Download YouTube Transcript – Free Export to TXT, SRT & PDF',
    description:
      'Extract and download complete YouTube video transcripts with timestamps in clean TXT, SRT, or PDF formats.',
    url: 'https://www.mytranscript.pro/download-youtube-transcript',
    siteName: 'MyTranscript',
    type: 'website',
    images: [
      {
        url: 'https://www.mytranscript.pro/logo.png',
        width: 800,
        height: 600,
        alt: 'Download YouTube Transcript - MyTranscript.pro',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Download YouTube Transcript – Free Export to TXT, SRT & PDF',
    description:
      'Export and download YouTube transcripts in seconds. Free TXT, SRT, and PDF exporter.',
    images: ['https://www.mytranscript.pro/logo.png'],
  },
};

const SCHEMA_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'MyTranscript YouTube Transcript Downloader',
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'All Web Browsers',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '1940',
        bestRating: '5',
        worstRating: '1',
      },
      featureList: [
        'Instant sub-second YouTube transcript extraction',
        'Download transcripts as plain text (.txt) files',
        'Export timecoded subtitles as SubRip (.srt) files',
        'Save printable formatted documents as PDF',
        'Full compatibility with auto-generated and creator captions',
      ],
      description:
        'Fast and secure online tool to download complete YouTube transcripts with or without timestamps in TXT, SRT, and PDF formats.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I download a YouTube transcript for free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Copy the YouTube video URL, paste it into the search box on MyTranscript.pro, and click Download Transcript. Your complete transcript will load in seconds with options to copy or download as TXT, SRT, or PDF.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I download auto-generated YouTube captions?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! MyTranscript automatically captures auto-generated captions, creator-uploaded subtitles, and translated multilingual caption tracks.',
          },
        },
        {
          '@type': 'Question',
          name: 'What formats can I export the transcript in?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can export transcripts as clean plain text (.txt), timed subtitle files (.srt) for video editors, printable documents (.pdf), or Markdown (.md) for note-taking apps.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is there a limit on video length for transcript downloads?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. You can download transcripts for videos of any length, including multi-hour podcasts, university lectures, audiobooks, and live-stream replays.',
          },
        },
      ],
    },
  ],
};

const FEATURES = [
  {
    icon: <Download className="w-5 h-5 text-[#FF2B4A]" />,
    title: 'Multiple Export Formats',
    desc: 'Export your transcript in clean TXT, timecoded SRT for video editors, Markdown for Obsidian/Notion, or printable PDF.',
    highlight: 'TXT · SRT · PDF',
  },
  {
    icon: <Clock className="w-5 h-5 text-teal-400" />,
    title: 'Timestamped or Plain Text',
    desc: 'Toggle between exact MM:SS video timecodes or continuous plain paragraphs optimized for reading and AI prompting.',
    highlight: 'Custom Formats',
  },
  {
    icon: <Sparkles className="w-5 h-5 text-rose-400" />,
    title: 'Sub-Second Extraction',
    desc: 'Bypasses video rendering and audio downloading to retrieve closed captions directly from YouTube servers instantly.',
    highlight: 'Instant',
  },
];

const FAQS = [
  {
    q: 'How do I download a YouTube transcript for free?',
    a: 'Simply copy the YouTube video link from your browser or mobile share menu, paste it into the field above, and click "Download Transcript". The full text is parsed instantly with instant download buttons.',
  },
  {
    q: 'Can I download auto-generated YouTube captions?',
    a: 'Yes! MyTranscript extracts both creator-provided manual subtitles and YouTube’s automated speech-to-text captions across all supported languages.',
  },
  {
    q: 'What is the best format for video editing?',
    a: 'If you want to import captions into Adobe Premiere Pro, DaVinci Resolve, Final Cut Pro, or CapCut, choose the .SRT (SubRip) export. It includes synchronized timecode blocks.',
  },
  {
    q: 'Is there any video length restriction or fee?',
    a: 'No, MyTranscript is 100% free with unlimited usage. You can download transcripts for 5-minute clips or 4-hour podcast marathons with zero fees or account registration.',
  },
];

export default function DownloadYoutubeTranscriptPage() {
  const articleContent = (
    <div className="space-y-10 text-zinc-300 leading-relaxed">
      <header className="space-y-3 pb-6 border-b border-zinc-800">
        <span className="text-xs font-bold text-teal-400 tracking-wider uppercase">Comprehensive Guide</span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          How to Download YouTube Transcripts in TXT, SRT &amp; PDF Formats
        </h2>
        <p className="text-sm text-zinc-400">
          Whether you need to extract notes from a university lecture, repurpose podcast dialogue into a newsletter, or generate subtitle files for video editing, downloading YouTube transcripts is the fastest way to turn video audio into searchable, reusable text.
        </p>
      </header>

      {/* Step by step */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-[#FF2B4A]/20 text-[#FF2B4A] text-xs font-mono font-bold flex items-center justify-center">1</span>
          3 Easy Steps to Download Any YouTube Transcript
        </h3>
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <li className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
            <span className="text-xs font-mono font-bold text-teal-400">STEP 1</span>
            <h4 className="font-bold text-white text-sm mt-1">Copy Video URL</h4>
            <p className="text-xs text-zinc-400 mt-1">
              Open the YouTube video in your browser or app, click <strong>Share</strong>, and copy the link.
            </p>
          </li>
          <li className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
            <span className="text-xs font-mono font-bold text-teal-400">STEP 2</span>
            <h4 className="font-bold text-white text-sm mt-1">Paste into MyTranscript</h4>
            <p className="text-xs text-zinc-400 mt-1">
              Paste the URL into the search box above and press <strong>Download Transcript</strong>.
            </p>
          </li>
          <li className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
            <span className="text-xs font-mono font-bold text-teal-400">STEP 3</span>
            <h4 className="font-bold text-white text-sm mt-1">Export Your File</h4>
            <p className="text-xs text-zinc-400 mt-1">
              Choose between TXT, SRT, Markdown, or PDF and save the file directly to your device.
            </p>
          </li>
        </ol>
      </section>

      {/* Format Comparison Table */}
      <section className="space-y-4 pt-4">
        <h3 className="text-xl font-bold text-white">
          Choosing the Right Export Format: TXT vs. SRT vs. PDF
        </h3>
        <div className="overflow-x-auto rounded-xl border border-zinc-800">
          <table className="w-full text-xs text-left">
            <thead className="bg-zinc-900/90 text-zinc-300 font-semibold border-b border-zinc-800">
              <tr>
                <th className="p-3">Format</th>
                <th className="p-3">Best Used For</th>
                <th className="p-3">Includes Timestamps</th>
                <th className="p-3">Compatible Apps</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-zinc-400">
              <tr className="hover:bg-zinc-900/30">
                <td className="p-3 font-bold text-white">.TXT (Plain Text)</td>
                <td className="p-3">Study notes, blog writing, feeding into ChatGPT/Claude</td>
                <td className="p-3 text-teal-400 font-medium">Optional (Toggleable)</td>
                <td className="p-3">Notepad, TextEdit, Word, Google Docs</td>
              </tr>
              <tr className="hover:bg-zinc-900/30">
                <td className="p-3 font-bold text-white">.SRT (SubRip Subtitle)</td>
                <td className="p-3">Video captions, social media clips, video editing</td>
                <td className="p-3 text-teal-400 font-medium">Yes (Standard HH:MM:SS,mmm)</td>
                <td className="p-3">Premiere Pro, DaVinci Resolve, Final Cut, CapCut, VLC</td>
              </tr>
              <tr className="hover:bg-zinc-900/30">
                <td className="p-3 font-bold text-white">.PDF (Document)</td>
                <td className="p-3">Offline reading, classroom distribution, legal archiving</td>
                <td className="p-3 text-teal-400 font-medium">Yes</td>
                <td className="p-3">Adobe Acrobat, Apple Books, Web Browsers</td>
              </tr>
              <tr className="hover:bg-zinc-900/30">
                <td className="p-3 font-bold text-white">.MD (Markdown)</td>
                <td className="p-3">Personal knowledge management, technical documentation</td>
                <td className="p-3 text-teal-400 font-medium">Optional</td>
                <td className="p-3">Obsidian, Notion, Bear, GitHub</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Why MyTranscript */}
      <section className="space-y-4 pt-4">
        <h3 className="text-xl font-bold text-white">
          Why Use MyTranscript.pro Over Other Tools?
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
          Traditional YouTube downloaders force you to download massive multi-gigabyte video or audio files, only to require a secondary desktop transcription program. MyTranscript.pro handles everything in the cloud in under two seconds:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800 flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block">Zero Bandwidth Waste</strong>
              <span className="text-zinc-400">Extracts caption streams directly without downloading video frames.</span>
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800 flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block">AI Summaries Built-In</strong>
              <span className="text-zinc-400">Optionally generate executive bullet points and key takeaways in 1 click.</span>
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800 flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block">100% Private &amp; Secure</strong>
              <span className="text-zinc-400">Zero data retention. Your URLs and transcript queries are never stored.</span>
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800 flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block">No Ads or Paywalls</strong>
              <span className="text-zinc-400">Enjoy full-length video transcription with unlimited daily downloads.</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <GscLandingToolLayout
      slug="download-youtube-transcript"
      badge="Free Caption Downloader"
      badgeEmoji="📥"
      badgeHighlight="TXT · SRT · PDF"
      h1Prefix="Download"
      h1Highlight="YouTube Transcripts"
      h1Suffix="Online Free"
      subheadline="Export full YouTube video transcripts and closed captions in TXT, SRT, Markdown, or PDF format with synchronized timestamps and one-click copying."
      inputPlaceholder="Paste YouTube URL to download transcript (e.g. https://www.youtube.com/watch?v=...)"
      buttonLabel="Download Transcript"
      targetTab="transcript"
      features={FEATURES}
      articleContent={articleContent}
      faqs={FAQS}
      schemaData={SCHEMA_DATA}
    />
  );
}
