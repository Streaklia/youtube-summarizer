import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  Clock,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Download,
  FileText,
  Headphones,
  Mic,
  Zap,
  Share2,
  HelpCircle,
  Layers,
  Video,
  ShieldCheck,
  Search,
  ExternalLink,
  ChevronRight,
  ListOrdered,
  FileCode,
} from 'lucide-react';

const SITE_URL = 'https://www.mytranscript.pro';
const ARTICLE_URL = `${SITE_URL}/articles/free-podcast-transcript-generator`;

export const metadata: Metadata = {
  title: 'Free Podcast Transcript Generator: Convert Audio & Video to Text | MyTranscript',
  description:
    'Convert video podcasts into accurate timestamped transcripts, export SRT captions, and distill key takeaways with free AI speech recognition. No signup required.',
  keywords: [
    'podcast transcript generator free',
    'podcast transcript ai',
    'free podcast transcript generator',
    'convert podcast audio to text',
    'podcast to text free',
    'free ai podcast transcript',
    'podcast srt downloader',
    'extract podcast transcript',
    'video podcast transcription free',
  ],
  alternates: {
    canonical: ARTICLE_URL,
  },
  openGraph: {
    title: 'Free Podcast Transcript Generator: Convert Audio & Video to Text',
    description:
      'Extract full transcripts, download .SRT subtitle files, and distill key takeaways from any video podcast or audio episode for free with AI.',
    url: ARTICLE_URL,
    type: 'article',
    publishedTime: '2026-11-05T00:00:00Z',
    modifiedTime: '2026-11-05T00:00:00Z',
    authors: ['MyTranscript Editorial Team'],
    images: [
      {
        url: `${SITE_URL}/podcast-workflow-guide.png`,
        width: 1024,
        height: 571,
        alt: 'Free podcast transcript generator workflow: convert podcast audio and video to text',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Podcast Transcript Generator: Convert Audio & Video to Text',
    description:
      'Generate 100% free podcast transcripts with timestamps, export .SRT subtitle files, and distill key takeaways with AI.',
    images: [`${SITE_URL}/podcast-workflow-guide.png`],
  },
};

const SCHEMA_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: 'Free Podcast Transcript Generator: Convert Audio & Video to Text',
      description:
        'A comprehensive guide to generating 100% free podcast transcripts with millisecond timestamps, speaker dialogue, AI key takeaways, and .SRT subtitle exports.',
      datePublished: '2026-11-05T00:00:00Z',
      dateModified: '2026-11-05T00:00:00Z',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': ARTICLE_URL,
      },
      url: ARTICLE_URL,
      author: {
        '@type': 'Organization',
        name: 'MyTranscript Editorial Team',
        url: SITE_URL,
      },
      publisher: {
        '@type': 'Organization',
        name: 'MyTranscript',
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/logo.png`,
        },
      },
      image: `${SITE_URL}/podcast-workflow-guide.png`,
      keywords:
        'podcast transcript generator free, podcast transcript ai, free podcast transcript generator, convert podcast audio to text, podcast to srt',
    },
    {
      '@type': 'HowTo',
      name: 'How to Generate a Free Podcast Transcript with AI',
      description:
        'Step-by-step instructions for extracting verbatim podcast dialogue, downloading timecoded SRT subtitles, and generating AI summaries with MyTranscript.',
      image: `${SITE_URL}/podcast-workflow-guide.png`,
      totalTime: 'PT1M',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Copy Your Video Podcast or YouTube Audio Link',
          text: 'Find your podcast episode on YouTube, Spotify video, or your RSS host and copy the episode link from your browser address bar or mobile Share button.',
          image: `${SITE_URL}/podcast-workflow-guide.png`,
          url: `${ARTICLE_URL}#step-1`,
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Paste Link into MyTranscript Podcast Generator',
          text: 'Paste the podcast URL into the Free Podcast Transcript Generator. Speech-to-text extraction begins immediately without waiting or account signup.',
          image: `${SITE_URL}/podcast-workflow-guide.png`,
          url: `${ARTICLE_URL}#step-2`,
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Export Clean Transcripts, SubRip (.SRT) Subtitles & AI Takeaways',
          text: 'Review the chronological subtitle lines synchronized with playback. Click "Download SRT" for video editors, "Download TXT" for show notes, or copy the automated AI Key Takeaways.',
          image: `${SITE_URL}/srt-subtitle-export.png`,
          url: `${ARTICLE_URL}#step-3`,
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SITE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Articles',
          item: `${SITE_URL}/articles`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Free Podcast Transcript Generator',
          item: ARTICLE_URL,
        },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Is this podcast transcript generator really free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! MyTranscript provides 100% free podcast transcription with no subscription, credit card, or account signup required. You can transcribe unlimited video podcast episodes and download clean SRT subtitles without limits.',
          },
        },
        {
          '@type': 'Question',
          name: 'How accurate is the AI podcast transcription?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Our AI transcription engine leverages high-context neural language models (including Whisper and Google Gemini) alongside synchronized caption streams to deliver 98%+ verbatim accuracy, even with technical terminology, industry jargon, and multi-speaker banter.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I export podcast transcripts to Premiere Pro, DaVinci Resolve, or Final Cut?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. By clicking "Download SRT", you receive a standard SubRip (.srt) caption file formatted with sequential numbering and millisecond timecodes (00:00:00,000 --> 00:00:00,000) ready for immediate drag-and-drop into any non-linear video editor.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I generate podcast transcripts without timestamps?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. MyTranscript allows you to copy or download continuous, clean prose transcripts without timestamps, perfect for pasting directly into ChatGPT, Claude, Notion, or blog articles.',
          },
        },
      ],
    },
  ],
};

export default function FreePodcastTranscriptGeneratorPage() {
  return (
    <article className="min-h-screen bg-[#090D16] text-gray-100 antialiased selection:bg-[#FF2B4A]/30 selection:text-white">
      {/* Inject Structured Data (Article, HowTo, BreadcrumbList, FAQPage) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_DATA) }}
      />

      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[400px] bg-gradient-to-b from-[#FF2B4A]/10 to-transparent blur-3xl opacity-75" />
        <div className="absolute top-[40%] -right-40 w-[500px] h-[500px] bg-teal-500/5 blur-[120px] rounded-full" />
        <div className="absolute top-[70%] -left-40 w-[450px] h-[450px] bg-[#FF2B4A]/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs text-gray-400">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li className="text-gray-600">/</li>
            <li>
              <Link href="/articles" className="hover:text-white transition-colors">
                Articles
              </Link>
            </li>
            <li className="text-gray-600">/</li>
            <li className="text-gray-300 font-medium truncate max-w-[200px] sm:max-w-none">
              Free Podcast Transcript Generator
            </li>
          </ol>
        </nav>

        {/* Header Hero Metadata */}
        <header className="space-y-4 mb-8">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-[#FF2B4A]/15 text-[#FF2B4A] border border-[#FF2B4A]/30">
              <Sparkles className="w-3 h-3" />
              <span>Flagship Guide</span>
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-gray-400">
              <Clock className="w-3.5 h-3.5" />
              <span>6 min read</span>
            </span>
            <span className="text-gray-600">•</span>
            <span className="inline-flex items-center gap-1 text-xs text-gray-400">
              <Calendar className="w-3.5 h-3.5" />
              <span>Updated November 2026</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Free Podcast Transcript Generator:{' '}
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Convert Audio &amp; Video to Text
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed pt-1">
            Looking for a reliable <strong className="text-white">free podcast transcript generator</strong>?
            Whether you host a show or listen to interviews, discover how our cutting-edge{' '}
            <strong className="text-white">podcast transcript AI</strong> converts 1-hour to 3-hour episodes
            into verbatim text, timestamped <code className="text-[#FF2B4A] font-mono text-xs bg-[#FF2B4A]/10 px-1.5 py-0.5 rounded">.SRT</code> files, and automated bulleted takeaways in under 3 seconds.
          </p>
        </header>

        {/* Hero Image 1: Podcast Workflow Guide (Priority = true, Quality = 80) */}
        <figure className="my-8 rounded-2xl overflow-hidden border border-gray-800 bg-gray-950/80 shadow-2xl relative group">
          <div className="relative aspect-[1024/571] w-full">
            <Image
              src="/podcast-workflow-guide.png"
              alt="Free podcast transcript generator workflow: paste a YouTube video or podcast RSS link to convert spoken audio to text"
              width={1024}
              height={571}
              priority
              quality={80}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
              sizes="(max-width: 768px) 100vw, 840px"
            />
          </div>
          <figcaption className="p-3 bg-gray-950/90 border-t border-gray-800/80 text-center text-xs text-gray-400 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span>
              Simple podcast transcription workflow: Copy any YouTube podcast link and paste into MyTranscript for instant text.
            </span>
          </figcaption>
        </figure>

        {/* Quick Value Callout Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-8">
          <div className="p-4 rounded-xl bg-gray-950/60 border border-gray-800/80 space-y-1.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white">Instant Speed</h3>
            <p className="text-xs text-gray-400 leading-snug">
              Transcribe 2+ hour podcast episodes in seconds without queue delays or limits.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gray-950/60 border border-gray-800/80 space-y-1.5">
            <div className="w-7 h-7 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <FileCode className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white">Full SRT &amp; TXT</h3>
            <p className="text-xs text-gray-400 leading-snug">
              Download standard SubRip (.srt) files for Premiere Pro, DaVinci Resolve, and CapCut clips.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gray-950/60 border border-gray-800/80 space-y-1.5">
            <div className="w-7 h-7 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white">100% Free &amp; Private</h3>
            <p className="text-xs text-gray-400 leading-snug">
              Zero login, no credit cards, and strict zero-data-retention privacy by design.
            </p>
          </div>
        </div>

        {/* Main Article Body */}
        <div className="prose prose-invert prose-base max-w-none space-y-8 text-gray-300 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight border-b border-gray-800/80 pb-3 flex items-center gap-2">
              <Headphones className="w-6 h-6 text-[#FF2B4A]" />
              <span>Why Every Podcaster &amp; Listener Needs an AI Podcast Transcript Generator</span>
            </h2>
            <p>
              Podcasting is experiencing an unprecedented boom. From conversational long-form interviews on the{' '}
              <em>Joe Rogan Experience</em>, <em>Huberman Lab</em>, and <em>Lex Fridman Podcast</em> to specialized
              business and tech roundtables, podcasts contain some of the deepest knowledge on the internet.
            </p>
            <p>
              However, audio and video formats suffer from a major limitation: <strong className="text-white">unsearchability</strong>.
              You cannot easily search for a specific quote, skim through an 80-minute discussion, or paste spoken arguments
              into your research notebook. That is why choosing the best{' '}
              <strong className="text-white">free podcast transcript generator</strong> is a game-changer:
            </p>
            <ul className="space-y-2 list-none pl-0">
              <li className="flex items-start gap-2.5">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#FF2B4A] flex-shrink-0" />
                <span>
                  <strong className="text-white">10x Faster Content Consumption:</strong> Reading an average episode transcript takes 7 to 10 minutes, compared to listening at 1x speed for 60 to 90 minutes.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#FF2B4A] flex-shrink-0" />
                <span>
                  <strong className="text-white">Explosive Search Engine Ranking (SEO):</strong> Search engine crawlers (Googlebot, Bing) cannot listen to audio. Publishing verbatim podcast transcripts provides thousands of indexable keywords for your website.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#FF2B4A] flex-shrink-0" />
                <span>
                  <strong className="text-white">Instant Social Media Repurposing:</strong> Extract viral quotes, create TikTok &amp; Shorts subtitles, and draft Twitter/X threads and LinkedIn carousels directly from the speaker text.
                </span>
              </li>
            </ul>
          </section>

          {/* Section 2: Step-by-Step Instructions */}
          <section id="step-by-step" className="space-y-6 pt-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight border-b border-gray-800/80 pb-3 flex items-center gap-2">
              <ListOrdered className="w-6 h-6 text-[#FF2B4A]" />
              <span>How to Generate a Free Podcast Transcript in 3 Simple Steps</span>
            </h2>
            <p>
              You do not need to install bulky desktop software, configure Python virtual environments, or buy expensive subscriptions.
              Follow this step-by-step walkthrough to get clean podcast dialogue in seconds:
            </p>

            {/* Step 1 */}
            <div id="step-1" className="p-5 rounded-2xl bg-gray-950/80 border border-gray-800 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <span className="w-6 h-6 rounded-full bg-[#FF2B4A] text-white flex items-center justify-center text-xs">
                  1
                </span>
                <span>Step 1: Copy Your Video Podcast or YouTube Audio Link</span>
              </div>
              <p className="text-sm text-gray-300">
                Open YouTube on your computer or mobile app and locate your video podcast episode.
                Click the address bar to copy the full URL, or tap the <strong className="text-white">Share</strong> button and choose{' '}
                <strong className="text-white">Copy Link</strong>. Our tool supports standard watch links, shortened{' '}
                <code className="text-xs bg-gray-900 px-1.5 py-0.5 rounded text-gray-300">youtu.be</code> links, YouTube Shorts, and embedded links.
              </p>
            </div>

            {/* Step 2 */}
            <div id="step-2" className="p-5 rounded-2xl bg-gray-950/80 border border-gray-800 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <span className="w-6 h-6 rounded-full bg-[#FF2B4A] text-white flex items-center justify-center text-xs">
                  2
                </span>
                <span>Step 2: Paste into MyTranscript Podcast Generator</span>
              </div>
              <p className="text-sm text-gray-300">
                Navigate to our{' '}
                <Link href="/podcast-transcript" className="text-[#FF2B4A] hover:underline font-semibold">
                  Podcast Transcript Tool
                </Link>{' '}
                or paste the link into the hero field on our homepage. Our system resolves the audio stream and extracts the verbatim subtitles instantly in parallel with the video player.
              </p>
            </div>

            {/* Step 3 */}
            <div id="step-3" className="p-5 rounded-2xl bg-gray-950/80 border border-gray-800 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <span className="w-6 h-6 rounded-full bg-[#FF2B4A] text-white flex items-center justify-center text-xs">
                  3
                </span>
                <span>Step 3: Export Clean Transcripts, SubRip (.SRT) Subtitles &amp; AI Takeaways</span>
              </div>
              <p className="text-sm text-gray-300">
                Once the transcript generates, you can toggle between timestamped segments and clean continuous paragraphs.
                Click <strong className="text-white">Download SRT</strong> to export captions with millisecond timecodes, or click{' '}
                <strong className="text-white">Download TXT</strong> for raw prose.
              </p>
            </div>
          </section>

          {/* =========================================================================
              HIGH-CONVERTING MID-ARTICLE VISUAL CTA BOX
             ========================================================================= */}
          <aside className="my-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-gray-900/90 via-gray-950 to-black border-2 border-[#FF2B4A]/40 shadow-2xl shadow-[#FF2B4A]/10 text-center space-y-5 relative overflow-hidden not-prose">
            {/* Ambient ruby glow */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-32 bg-[#FF2B4A]/20 blur-3xl rounded-full pointer-events-none" />

            <div className="relative z-10 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FF2B4A]/20 text-[#FF2B4A] border border-[#FF2B4A]/40">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Try It Right Now · 100% Free</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Transcribe Any Podcast Episode in Seconds
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">
                Paste any YouTube podcast or video URL below. Get complete verbatim subtitles, timecoded SRT downloads, and automated AI takeaways with zero signup.
              </p>
            </div>

            {/* Interactive CTA Action Bar */}
            <div className="relative z-10 max-w-lg mx-auto">
              <div className="flex flex-col sm:flex-row items-center gap-2 p-1.5 rounded-2xl bg-black/80 border border-gray-800 shadow-inner">
                <div className="flex items-center gap-2 px-3 py-2 w-full text-xs text-gray-400 min-w-0">
                  <Search className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <span className="truncate text-gray-500 font-mono">
                    https://www.youtube.com/watch?v=...
                  </span>
                </div>
                <Link
                  href="/podcast-transcript"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3 rounded-xl bg-[#FF2B4A] hover:bg-[#e02440] text-white text-xs font-bold shadow-lg shadow-[#FF2B4A]/30 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
                >
                  <span>Transcribe Free</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 text-[11px] text-gray-400 pt-1">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>No Account Required</span>
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Instant .SRT &amp; .TXT Export</span>
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>AI Key Takeaways</span>
              </span>
            </div>
          </aside>

          {/* Section 3: Subtitles and SRT Export */}
          <section className="space-y-4 pt-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight border-b border-gray-800/80 pb-3 flex items-center gap-2">
              <FileCode className="w-6 h-6 text-[#FF2B4A]" />
              <span>Exporting SubRip (.SRT) Subtitles for Video Editors &amp; Social Clips</span>
            </h2>
            <p>
              Creating short vertical clips for YouTube Shorts, Instagram Reels, and TikTok has become the primary growth
              engine for podcast channels. However, burned-in captions are mandatory—over 80% of mobile users watch social
              video clips with the audio muted.
            </p>
            <p>
              Our <strong className="text-white">free podcast transcript generator</strong> formats your dialogue into
              compliant SubRip (<code className="text-[#FF2B4A] font-mono text-xs bg-[#FF2B4A]/10 px-1.5 py-0.5 rounded">.srt</code>)
              files containing millisecond-accurate timestamps:
            </p>
          </section>

          {/* Image 2: SRT Subtitle Export (Quality = 80) */}
          <figure className="my-8 rounded-2xl overflow-hidden border border-gray-800 bg-gray-950/80 shadow-2xl relative group not-prose">
            <div className="relative aspect-[1024/571] w-full">
              <Image
                src="/srt-subtitle-export.png"
                alt="Free podcast transcript generator SRT subtitle export showing timestamped dialogue and Download SRT buttons"
                width={1024}
                height={571}
                quality={80}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
                sizes="(max-width: 768px) 100vw, 840px"
              />
            </div>
            <figcaption className="p-3 bg-gray-950/90 border-t border-gray-800/80 text-center text-xs text-gray-400 flex items-center justify-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>
                Export millisecond-accurate SubRip (.SRT) subtitle files ready for direct import into Adobe Premiere, DaVinci Resolve, or CapCut.
              </span>
            </figcaption>
          </figure>

          {/* Section 4: AI Key Takeaways */}
          <section className="space-y-4 pt-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight border-b border-gray-800/80 pb-3 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-[#FF2B4A]" />
              <span>AI-Powered Key Takeaways &amp; Chapter Breakdown for Podcasts</span>
            </h2>
            <p>
              Raw transcript text is invaluable, but reading through 25,000 words of conversational dialogue can still take
              time. That is why our <strong className="text-white">podcast transcript AI</strong> includes intelligent
              distillation features powered by high-context language models:
            </p>
            <ul className="space-y-2 list-none pl-0">
              <li className="flex items-start gap-2.5">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#FF2B4A] flex-shrink-0" />
                <span>
                  <strong className="text-white">Bulleted Key Takeaways:</strong> Synthesizes core arguments, controversial viewpoints, and actionable steps into 5 to 10 executive bullet points.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#FF2B4A] flex-shrink-0" />
                <span>
                  <strong className="text-white">Timestamped Chapters:</strong> Automatically groups topic changes into clear scene titles and time markers for description boxes and YouTube timeline scrubbers.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#FF2B4A] flex-shrink-0" />
                <span>
                  <strong className="text-white">Executive Summaries:</strong> Generates cohesive, multi-paragraph written summaries suitable for newsletter digests and blog posts.
                </span>
              </li>
            </ul>
          </section>

          {/* Image 3: Key Takeaways Preview (Quality = 80) */}
          <figure className="my-8 rounded-2xl overflow-hidden border border-gray-800 bg-gray-950/80 shadow-2xl relative group not-prose">
            <div className="relative aspect-[1024/571] w-full">
              <Image
                src="/key-takeaways-preview.png"
                alt="AI podcast transcript generator Key Takeaways bulleted summary preview with one-click copy button"
                width={1024}
                height={571}
                quality={80}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
                sizes="(max-width: 768px) 100vw, 840px"
              />
            </div>
            <figcaption className="p-3 bg-gray-950/90 border-t border-gray-800/80 text-center text-xs text-gray-400 flex items-center justify-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>
                Automated AI Key Takeaways: Get high-impact bulleted summaries and core takeaways with a single click.
              </span>
            </figcaption>
          </figure>

          {/* Section 5: Comparison Table */}
          <section className="space-y-4 pt-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight border-b border-gray-800/80 pb-3 flex items-center gap-2">
              <Layers className="w-6 h-6 text-[#FF2B4A]" />
              <span>Comparing Transcription Methods: Manual vs Paid Software vs MyTranscript</span>
            </h2>
            <p>
              How does our online generator compare to traditional transcription workflows? Here is a breakdown of speed,
              accuracy, and pricing across the industry:
            </p>

            <div className="overflow-x-auto my-6 not-prose">
              <table className="w-full text-left text-xs sm:text-sm border-collapse rounded-2xl overflow-hidden border border-gray-800">
                <thead>
                  <tr className="bg-gray-900/80 text-gray-200 border-b border-gray-800">
                    <th className="p-3 font-semibold">Method</th>
                    <th className="p-3 font-semibold">Speed</th>
                    <th className="p-3 font-semibold">Cost</th>
                    <th className="p-3 font-semibold">SRT Export</th>
                    <th className="p-3 font-semibold">AI Summaries</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60 bg-gray-950/60 text-gray-300">
                  <tr className="bg-[#FF2B4A]/5 font-medium text-white border-l-2 border-[#FF2B4A]">
                    <td className="p-3 flex items-center gap-1.5 font-bold text-white">
                      <span>MyTranscript.pro</span>
                      <span className="text-[10px] text-[#FF2B4A] bg-[#FF2B4A]/10 px-1.5 py-0.5 rounded">Free</span>
                    </td>
                    <td className="p-3 text-emerald-400">1 to 3 seconds</td>
                    <td className="p-3 text-emerald-400 font-bold">$0 (100% Free)</td>
                    <td className="p-3 text-emerald-400">✓ Yes (Instant)</td>
                    <td className="p-3 text-emerald-400">✓ Included</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-gray-200">Manual Human Typing</td>
                    <td className="p-3 text-red-400">4 to 6 hours</td>
                    <td className="p-3 text-red-400">$60 - $150 / hr</td>
                    <td className="p-3">Requires formatting</td>
                    <td className="p-3 text-gray-500">✗ Manual work</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-gray-200">Paid Transcription SaaS</td>
                    <td className="p-3 text-amber-400">5 to 15 minutes</td>
                    <td className="p-3 text-amber-400">$15 - $35 / mo</td>
                    <td className="p-3">Behind paywall</td>
                    <td className="p-3 text-amber-400">Extra token fees</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 6: FAQs */}
          <section className="space-y-6 pt-4 not-prose">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight border-b border-gray-800/80 pb-3 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-[#FF2B4A]" />
              <span>Frequently Asked Questions About Free Podcast Transcription</span>
            </h2>

            <div className="space-y-3">
              <details className="group rounded-2xl bg-gray-950/80 border border-gray-800 p-4 transition-all">
                <summary className="flex items-center justify-between font-semibold text-white text-sm cursor-pointer list-none">
                  <span>Is this podcast transcript generator really free?</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-400 leading-relaxed">
                  Yes, MyTranscript provides 100% free podcast transcription with no subscription fees, credit cards, or account registrations. You can transcribe unlimited video podcast episodes and download clean SRT subtitles without artificial word limits.
                </p>
              </details>

              <details className="group rounded-2xl bg-gray-950/80 border border-gray-800 p-4 transition-all">
                <summary className="flex items-center justify-between font-semibold text-white text-sm cursor-pointer list-none">
                  <span>How accurate is the AI podcast transcription?</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-400 leading-relaxed">
                  Our system achieves 98%+ verbatim accuracy by combining neural speech recognition models with synchronized audio caption alignment. Technical vocabulary, guest names, and rapid multi-speaker conversations are captured with proper punctuation and capital letters.
                </p>
              </details>

              <details className="group rounded-2xl bg-gray-950/80 border border-gray-800 p-4 transition-all">
                <summary className="flex items-center justify-between font-semibold text-white text-sm cursor-pointer list-none">
                  <span>Can I import the downloaded SRT file into Adobe Premiere or DaVinci Resolve?</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-400 leading-relaxed">
                  Yes. The generated .SRT file uses the official SubRip standard with precise sequential line indexing and millisecond timecodes (00:00:00,000 --&gt; 00:00:00,000), allowing you to drag and drop subtitles directly onto your video timeline.
                </p>
              </details>

              <details className="group rounded-2xl bg-gray-950/80 border border-gray-800 p-4 transition-all">
                <summary className="flex items-center justify-between font-semibold text-white text-sm cursor-pointer list-none">
                  <span>Can I convert podcast audio into plain text without timestamps?</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-gray-400 leading-relaxed">
                  Yes! You can use our dedicated{' '}
                  <Link href="/youtube-to-text-no-timestamps" className="text-[#FF2B4A] hover:underline font-medium">
                    YouTube to Text without Timestamps
                  </Link>{' '}
                  mode to get continuous, clean reading paragraphs with zero time markers, ideal for pasting directly into ChatGPT, Claude, or Word documents.
                </p>
              </details>
            </div>
          </section>

          {/* Bottom Footer CTA Box */}
          <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gray-950 border border-gray-800 text-center space-y-4 not-prose">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Ready to Transcribe Your First Podcast Episode?
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 max-w-lg mx-auto leading-relaxed">
              Experience the fastest, most accurate <strong className="text-white">free podcast transcript generator</strong> online. No registration required.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/podcast-transcript"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FF2B4A] hover:bg-[#e02440] text-white text-xs sm:text-sm font-bold shadow-lg shadow-[#FF2B4A]/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Launch Podcast Transcriber</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/youtube-to-srt"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-800 text-white text-xs sm:text-sm font-medium transition-colors"
              >
                <span>Convert to SRT</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
