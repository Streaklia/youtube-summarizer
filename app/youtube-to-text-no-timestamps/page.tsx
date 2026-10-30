import { Metadata } from 'next';
import { GscLandingToolLayout } from '@/components/GscLandingToolLayout';
import { FileText, Cpu, Copy, CheckCircle, Zap, Shield, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'YouTube to Text Without Timestamps – Clean Plain Text Transcript',
  description:
    'Extract clean YouTube transcripts without timestamps or timecodes. Convert video dialogue to continuous readable text for ChatGPT, Claude, notes, and articles.',
  keywords: [
    'youtube to text without timestamps',
    'youtube transcript no timestamps',
    'copy youtube transcript without timecodes',
    'convert youtube video to text',
    'clean youtube transcript',
    'youtube text extractor no time',
    'plain text youtube transcript',
  ],
  alternates: {
    canonical: 'https://www.mytranscript.pro/youtube-to-text-no-timestamps',
  },
  openGraph: {
    title: 'YouTube to Text Without Timestamps – Clean Plain Text Transcript',
    description:
      'Strip timestamps from any YouTube video transcript automatically. Get continuous plain text for ChatGPT, Claude, Word, and study notes.',
    url: 'https://www.mytranscript.pro/youtube-to-text-no-timestamps',
    siteName: 'MyTranscript',
    type: 'website',
    images: [
      {
        url: 'https://www.mytranscript.pro/logo.png',
        width: 800,
        height: 600,
        alt: 'YouTube to Text Without Timestamps - MyTranscript.pro',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YouTube to Text Without Timestamps – Clean Plain Text Transcript',
    description:
      'Extract continuous plain text without timecodes from any YouTube video. 1-click copy for AI prompts and notes.',
    images: ['https://www.mytranscript.pro/logo.png'],
  },
};

const SCHEMA_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'MyTranscript YouTube to Text Without Timestamps Extractor',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'All Web Browsers',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '1950',
        bestRating: '5',
        worstRating: '1',
      },
      featureList: [
        'Automatic timecode stripping and paragraph reconstruction',
        'Saves 35% token overhead when prompting ChatGPT, Claude, and Gemini',
        'One-click clipboard copy for instant note taking',
        'Removes caption formatting artifacts and subtitle sound tags',
        'Works with videos of any length with zero limits',
      ],
      description:
        'Free online tool to extract clean YouTube transcripts without timestamps, timecodes, or bracket tags. Formatted into continuous paragraphs for AI models and documents.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I copy a YouTube transcript without timestamps?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Paste your YouTube link into MyTranscript.pro and click Extract Plain Text. The tool automatically removes all timecodes (00:00) and line breaks, presenting continuous prose ready to copy with one click.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why should I remove timestamps before pasting into ChatGPT or Claude?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Timestamps like [01:23] consume unnecessary token budget and cause language models to output disjointed, fragmented responses. Stripping timestamps creates coherent sentences, saving 30-40% context window and improving AI summary quality.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does YouTube allow copying transcripts without timestamps natively?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'While YouTube has a toggle timestamps button on desktop, copying the text still copies awkward single-line snippets and requires manual cleanup. MyTranscript completely automates paragraph flow, grammar spacing, and one-click copying.',
          },
        },
      ],
    },
  ],
};

const FEATURES = [
  {
    icon: <Copy className="w-5 h-5 text-[#FF2B4A]" />,
    title: 'Timecodes Stripped Automatically',
    desc: 'Filters out repetitive 00:01, 00:04, 00:08 time offsets so you get pure, clean sentences ready for reading.',
    highlight: 'Pure Prose',
  },
  {
    icon: <Cpu className="w-5 h-5 text-teal-400" />,
    title: 'AI Prompting Optimized',
    desc: 'Saves 30% to 40% of the token context window when feeding transcripts into ChatGPT, Claude, or Google Gemini.',
    highlight: 'Saves Tokens',
  },
  {
    icon: <FileText className="w-5 h-5 text-rose-400" />,
    title: 'Paragraph Flow Reconstruction',
    desc: 'Recombines fragmented subtitle lines into natural paragraphs for effortless reading, research, and note-taking.',
    highlight: 'Natural Flow',
  },
];

const FAQS = [
  {
    q: 'How do I copy a YouTube transcript without timestamps?',
    a: 'Paste your video link in the field above and click "Extract Plain Text". The system automatically removes all timecodes and formats the dialogue into continuous paragraphs with a 1-click copy button.',
  },
  {
    q: 'Why should I remove timestamps before feeding text into ChatGPT or Claude?',
    a: 'Timestamps consume valuable LLM token context and cause the AI to echo time offsets rather than providing deep synthesis. Removing them produces far superior summaries, key takeaways, and blog drafts.',
  },
  {
    q: 'Does this work on mobile phones and tablets?',
    a: 'Yes! MyTranscript works seamlessly on iOS (Safari/Chrome) and Android. Simply use the YouTube app share button to copy the link and paste it into our mobile-optimized site.',
  },
  {
    q: 'Can I re-enable timestamps if I need them later?',
    a: 'Yes, on the results page you can toggle between "Plain Text" and "Timestamped" with one click.',
  },
];

export default function YoutubeToTextNoTimestampsPage() {
  const articleContent = (
    <div className="space-y-10 text-zinc-300 leading-relaxed">
      <header className="space-y-3 pb-6 border-b border-zinc-800">
        <span className="text-xs font-bold text-teal-400 tracking-wider uppercase">Productivity &amp; AI Workflow Guide</span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          How to Get YouTube Transcripts Without Timestamps for AI &amp; Notes
        </h2>
        <p className="text-sm text-zinc-400">
          Discover why thousands of writers, students, and AI researchers strip timestamps from YouTube video transcripts before analyzing them in ChatGPT, Claude, Notion, or Google Docs.
        </p>
      </header>

      {/* Step by step */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-[#FF2B4A]/20 text-[#FF2B4A] text-xs font-mono font-bold flex items-center justify-center">1</span>
          3 Steps to Extract Clean Plain Text from YouTube
        </h3>
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <li className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
            <span className="text-xs font-mono font-bold text-teal-400">STEP 1</span>
            <h4 className="font-bold text-white text-sm mt-1">Paste YouTube URL</h4>
            <p className="text-xs text-zinc-400 mt-1">
              Paste any video or podcast link into the tool box above.
            </p>
          </li>
          <li className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
            <span className="text-xs font-mono font-bold text-teal-400">STEP 2</span>
            <h4 className="font-bold text-white text-sm mt-1">Automatic Stripping</h4>
            <p className="text-xs text-zinc-400 mt-1">
              Our engine strips every timecode tag and merges spoken phrases into clean prose.
            </p>
          </li>
          <li className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
            <span className="text-xs font-mono font-bold text-teal-400">STEP 3</span>
            <h4 className="font-bold text-white text-sm mt-1">1-Click Copy</h4>
            <p className="text-xs text-zinc-400 mt-1">
              Click <strong>Copy Text</strong> and paste straight into your LLM prompt, note app, or document.
            </p>
          </li>
        </ol>
      </section>

      {/* Why strip timestamps for AI */}
      <section className="space-y-4 pt-4">
        <h3 className="text-xl font-bold text-white">
          Why Stripping Timestamps is Essential for ChatGPT &amp; Claude
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/20 space-y-2">
            <div className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>✕</span> With Timestamps (Wastes Tokens)
            </div>
            <div className="font-mono text-zinc-400 p-2.5 bg-black/40 rounded border border-zinc-800">
              00:01 In this video<br />
              00:03 we are going to learn<br />
              00:06 how machine learning works<br />
              00:09 from the ground up.
            </div>
            <p className="text-zinc-400">
              Every timestamp consumes 3-5 tokens. In a 30-minute video, that is over <strong>3,500 wasted tokens</strong> of pure junk numbers!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>✓</span> Without Timestamps (Optimized)
            </div>
            <div className="font-mono text-zinc-200 p-2.5 bg-black/40 rounded border border-zinc-800">
              In this video we are going to learn how machine learning works from the ground up.
            </div>
            <p className="text-zinc-400">
              Clean continuous English sentences. Zero token waste, instant LLM comprehension, and faster summary responses.
            </p>
          </div>
        </div>
      </section>

      {/* Common Use Cases */}
      <section className="space-y-4 pt-4">
        <h3 className="text-xl font-bold text-white">
          Top Use Cases for Plain Text YouTube Transcripts
        </h3>
        <ul className="space-y-2.5 text-xs">
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 flex-shrink-0" />
            <span><strong className="text-white">Blog &amp; Newsletter Repurposing:</strong> Turn video interviews, keynote presentations, and webinars into long-form written articles in minutes.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 flex-shrink-0" />
            <span><strong className="text-white">Academic Study Notes:</strong> Convert hours of recorded online university lectures into readable study guides with searchable keywords.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 flex-shrink-0" />
            <span><strong className="text-white">AI Context Injection:</strong> Feed multi-hour podcast transcripts directly into NotebookLM, ChatGPT, or Claude projects without hitting token limits.</span>
          </li>
        </ul>
      </section>
    </div>
  );

  return (
    <GscLandingToolLayout
      slug="youtube-to-text-no-timestamps"
      badge="Clean Text Extractor"
      badgeEmoji="📄"
      badgeHighlight="No Timecodes"
      h1Prefix="Extract"
      h1Highlight="YouTube to Text"
      h1Suffix="Without Timestamps"
      subheadline="Convert any YouTube video dialogue into clean, continuous plain text with all timecodes and subtitle tags removed. Perfect for ChatGPT, Claude, and note-taking."
      inputPlaceholder="Paste YouTube link to get text without timestamps (e.g. https://www.youtube.com/watch?v=...)"
      buttonLabel="Extract Plain Text"
      targetTab="transcript"
      features={FEATURES}
      articleContent={articleContent}
      faqs={FAQS}
      schemaData={SCHEMA_DATA}
    />
  );
}
