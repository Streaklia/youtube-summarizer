import { Metadata } from 'next';
import { GscLandingToolLayout } from '@/components/GscLandingToolLayout';
import { FileCode, Clock, Download, CheckCircle, Video, Layers, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'YouTube to SRT Converter – Free Online Subtitle Extractor (.srt)',
  description:
    'Convert YouTube videos to standard SRT subtitle files online. Extract timed captions and download .srt files for Premiere Pro, DaVinci Resolve, Final Cut & VLC.',
  keywords: [
    'youtube to srt',
    'convert youtube to srt',
    'youtube srt downloader',
    'extract srt from youtube',
    'youtube subtitles srt',
    'download srt youtube',
    'free srt generator',
    'youtube caption to srt converter',
  ],
  alternates: {
    canonical: 'https://www.mytranscript.pro/youtube-to-srt',
  },
  openGraph: {
    title: 'YouTube to SRT Converter – Free Online Subtitle Extractor (.srt)',
    description:
      'Extract timed captions and convert YouTube videos to standard SubRip (.srt) subtitle files in seconds. 100% free.',
    url: 'https://www.mytranscript.pro/youtube-to-srt',
    siteName: 'MyTranscript',
    type: 'website',
    images: [
      {
        url: 'https://www.mytranscript.pro/logo.png',
        width: 800,
        height: 600,
        alt: 'YouTube to SRT Converter - MyTranscript.pro',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YouTube to SRT Converter – Free Online Subtitle Extractor (.srt)',
    description:
      'Generate and download .srt subtitle files from any YouTube video. Clean timecodes for video editing.',
    images: ['https://www.mytranscript.pro/logo.png'],
  },
};

const SCHEMA_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'MyTranscript YouTube to SRT Subtitle Converter',
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
        ratingCount: '2190',
        bestRating: '5',
        worstRating: '1',
      },
      featureList: [
        'Converts YouTube spoken dialogue into SubRip (.srt) subtitle files',
        'Millisecond-accurate timecodes (HH:MM:SS,mmm)',
        'Direct import support for Premiere Pro, DaVinci Resolve, and Final Cut',
        'Automatic line-break formatting for readable on-screen text',
        'Extracts from creator subtitles and auto-generated captions',
      ],
      description:
        'Free online tool to convert YouTube video dialogue and captions into standard .SRT subtitle files ready for video editors, social media clips, and media players.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I convert a YouTube video to an SRT file?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Copy the YouTube link, paste it into the field above on MyTranscript.pro, and click Convert to SRT. The tool extracts the exact caption timestamps and generates an instant .srt file download.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I import the downloaded SRT file into Premiere Pro or DaVinci Resolve?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! The generated .srt file uses standard SubRip formatting with sequential numbering and millisecond timecodes (00:00:00,000 --> 00:00:00,000), making it 100% compatible with Adobe Premiere, DaVinci Resolve, Final Cut Pro, CapCut, and VLC.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does YouTube to SRT work on videos without manual subtitles?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! MyTranscript automatically accesses YouTube’s auto-generated speech recognition captions and structures them into properly formatted SRT blocks.',
          },
        },
      ],
    },
  ],
};

const FEATURES = [
  {
    icon: <FileCode className="w-5 h-5 text-[#FF2B4A]" />,
    title: 'Standard SubRip (.SRT) Format',
    desc: 'Generates standard subtitle blocks with sequential indexes, millisecond time offsets, and properly wrapped caption dialogue.',
    highlight: 'Standard .SRT',
  },
  {
    icon: <Video className="w-5 h-5 text-teal-400" />,
    title: 'Editor-Ready Compatibility',
    desc: 'Seamlessly drag and drop into Adobe Premiere Pro, DaVinci Resolve, CapCut, Final Cut Pro, or VLC media player.',
    highlight: 'Premiere & Resolve',
  },
  {
    icon: <Clock className="w-5 h-5 text-rose-400" />,
    title: 'Millisecond Timing Accuracy',
    desc: 'Every caption cue is synchronized down to the exact millisecond so on-screen captions match spoken words without drift.',
    highlight: 'Zero Drift',
  },
];

const FAQS = [
  {
    q: 'How do I convert a YouTube video to an SRT file?',
    a: 'Copy the YouTube video link from your browser or mobile app, paste it into the search box above, and click "Convert to SRT". Your formatted .srt file is generated and ready to download in under 2 seconds.',
  },
  {
    q: 'Can I import the downloaded SRT file into Adobe Premiere or DaVinci Resolve?',
    a: 'Yes! The downloaded file is 100% compliant with the official SubRip specification. Simply drag the .srt file into your editor timeline and it will automatically align with your video footage.',
  },
  {
    q: 'Does this tool work on auto-generated captions?',
    a: 'Yes, if the creator did not upload custom subtitles, our system automatically retrieves the auto-generated captions and formats them into clean, timed SRT cue cards.',
  },
  {
    q: 'Are there any watermarks or character limits?',
    a: 'No! MyTranscript does not add any watermarks, advertisements, or metadata tags into your SRT files. The download is clean, private, and unlimited.',
  },
];

export default function YoutubeToSrtPage() {
  const articleContent = (
    <div className="space-y-10 text-zinc-300 leading-relaxed">
      <header className="space-y-3 pb-6 border-b border-zinc-800">
        <span className="text-xs font-bold text-teal-400 tracking-wider uppercase">Video Editing &amp; Captioning Guide</span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          How to Convert YouTube Videos to Standard SRT Subtitle Files
        </h2>
        <p className="text-sm text-zinc-400">
          SubRip (.SRT) is the most widely supported subtitle format in video production. Learn how to convert any YouTube video dialogue into timed SRT caption blocks for video editors, translation workflows, and social media repurposing.
        </p>
      </header>

      {/* Step by step */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-[#FF2B4A]/20 text-[#FF2B4A] text-xs font-mono font-bold flex items-center justify-center">1</span>
          3 Steps to Extract and Download an SRT File from YouTube
        </h3>
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <li className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
            <span className="text-xs font-mono font-bold text-teal-400">STEP 1</span>
            <h4 className="font-bold text-white text-sm mt-1">Copy YouTube Video URL</h4>
            <p className="text-xs text-zinc-400 mt-1">
              Find the video on YouTube. Click <strong>Share</strong> and copy the URL link to your clipboard.
            </p>
          </li>
          <li className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
            <span className="text-xs font-mono font-bold text-teal-400">STEP 2</span>
            <h4 className="font-bold text-white text-sm mt-1">Paste &amp; Convert</h4>
            <p className="text-xs text-zinc-400 mt-1">
              Paste the link above and click <strong>Convert to SRT</strong>. The caption track is converted to timed blocks.
            </p>
          </li>
          <li className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
            <span className="text-xs font-mono font-bold text-teal-400">STEP 3</span>
            <h4 className="font-bold text-white text-sm mt-1">Download &amp; Import</h4>
            <p className="text-xs text-zinc-400 mt-1">
              Click <strong>Download .SRT</strong>. Import the file directly into Premiere, DaVinci, CapCut, or VLC.
            </p>
          </li>
        </ol>
      </section>

      {/* Anatomy of an SRT file */}
      <section className="space-y-4 pt-4">
        <h3 className="text-xl font-bold text-white">
          Anatomy of a Properly Formatted SRT File
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400">
          A valid SubRip (.srt) file consists of four critical components per caption block:
        </p>
        <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs text-zinc-300 space-y-1">
          <div className="text-teal-400 font-bold">1</div>
          <div className="text-[#FF2B4A]">00:00:01,250 --&gt; 00:00:04,800</div>
          <div className="text-white">Welcome back to another episode of our podcast!</div>
          <div className="text-zinc-600"> </div>
          <div className="text-teal-400 font-bold">2</div>
          <div className="text-[#FF2B4A]">00:00:05,000 --&gt; 00:00:09,120</div>
          <div className="text-white">Today we are discussing AI video transcription and SEO.</div>
        </div>
        <p className="text-xs text-zinc-400 leading-relaxed">
          MyTranscript.pro automatically validates every cue timing interval and removes overlapping timestamps, preventing caption glitching or text collisions in your video editing timeline.
        </p>
      </section>

      {/* Editor Guide */}
      <section className="space-y-4 pt-4">
        <h3 className="text-xl font-bold text-white">
          How to Import Your SRT File into Video Editors
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 space-y-2">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              Adobe Premiere Pro
            </h4>
            <p className="text-zinc-400 leading-relaxed">
              Drag the downloaded .srt file into your Project Panel, then drag it onto a new track above your video clip in the Sequence timeline. Use the <em>Captions and Graphics</em> workspace to customize fonts and colors.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 space-y-2">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF2B4A]" />
              DaVinci Resolve
            </h4>
            <p className="text-zinc-400 leading-relaxed">
              In the Edit page, drag the .srt file directly from your media pool into the timeline. DaVinci Resolve creates a dedicated <em>Subtitle Track</em> where you can modify styles globally or per caption.
            </p>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <GscLandingToolLayout
      slug="youtube-to-srt"
      badge="Subtitle Extractor"
      badgeEmoji="🎬"
      badgeHighlight="SubRip .SRT"
      h1Prefix="Convert"
      h1Highlight="YouTube to SRT"
      h1Suffix="Subtitles Online"
      subheadline="Extract synchronized closed captions from any YouTube video and convert them into standard .SRT subtitle files for Premiere Pro, DaVinci Resolve, Final Cut, and CapCut."
      inputPlaceholder="Paste YouTube URL to convert to SRT (e.g. https://www.youtube.com/watch?v=...)"
      buttonLabel="Convert to SRT"
      targetTab="transcript"
      features={FEATURES}
      articleContent={articleContent}
      faqs={FAQS}
      schemaData={SCHEMA_DATA}
    />
  );
}
