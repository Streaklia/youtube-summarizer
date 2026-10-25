export interface ArticleCallToAction {
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  description: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  isoDate: string;
  category: string;
  targetKeywords: string[];
  cta: ArticleCallToAction;
  content: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Features' | 'Accuracy & AI' | 'Troubleshooting';
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'how-to-get-youtube-transcript',
    title: 'How to Get a YouTube Transcript on Desktop and Mobile (Step-by-Step)',
    excerpt: 'Learn how to easily get and extract YouTube transcripts on any device. Step-by-step guide with free tools for fast video-to-text conversion.',
    readTime: '5 min read',
    date: 'Oct 26, 2026',
    isoDate: '2026-10-26T00:00:00Z',
    category: 'Guides',
    targetKeywords: ['how to get youtube transcript', 'youtube video to text'],
    cta: {
      primaryHref: '/youtube-transcript',
      primaryLabel: 'Open YouTube Transcript Generator',
      secondaryHref: '/youtube-to-text',
      secondaryLabel: 'Convert YouTube Video to Text',
      description: 'Extract complete, timestamped transcripts from any YouTube video in under 2 seconds.',
    },
    content: [
      'Extracting video speech into written text has become one of the most effective productivity hacks for students, researchers, content marketers, and professionals. Whether you are reviewing an academic lecture, documenting a technical tutorial, or pulling memorable interview quotes, reading a transcript takes a fraction of the time needed to watch a video.',
      'In this tutorial, we will walk you through the simplest methods to get accurate YouTube transcripts on both desktop and mobile devices—including the built-in YouTube interface and our free online extraction tool.',
      '## Method 1: Get YouTube Transcripts Using MyTranscript (Fastest)',
      'The quickest and cleanest way to get a YouTube transcript without dealing with awkward browser UI bugs is using MyTranscript:',
      '1. Copy the URL of any YouTube video or Shorts clip from your browser address bar or mobile Share button.\n2. Paste the link into the search bar on our [YouTube Transcript Generator](/youtube-transcript) or [YouTube to Text Converter](/youtube-to-text).\n3. Click "Get Transcript". Within 1 to 2 seconds, the full verbatim text appears with synchronized timestamps.\n4. Click Copy or Download to export the text into Markdown, TXT, or your favorite note-taking apps like Notion and Obsidian.',
      '## Method 2: How to View Transcripts on Desktop (Native YouTube)',
      'YouTube includes a native transcript viewer for videos with creator-uploaded or auto-generated captions:',
      '1. Open YouTube on your desktop web browser and navigate to the video.\n2. Look beneath the video player title and click "...more" in the description box.\n3. Scroll down to the bottom of the description and click the "Show transcript" button.\n4. A panel will open on the right side of the video displaying timestamps and spoken lines.\n5. You can click the three vertical dots inside the transcript header to toggle timestamps on or off before manually copying the lines.',
      '## Method 3: How to View Transcripts on Mobile (iOS & Android)',
      'Getting transcripts on iPhone or Android devices via the YouTube app follows a similar pattern:',
      '1. Open the YouTube mobile app and start playing the video.\n2. Tap the video description box (just below the title) to expand details.\n3. Scroll down until you see the "Transcript" section and tap "Show transcript".\n4. A bottom drawer slides up with chronological subtitles.\n*Note:* On mobile, selecting and copying hundreds of lines from YouTube\'s drawer is notoriously clunky. For a seamless experience on smartphones, simply tap Share → Copy Link and paste it into [MyTranscript](/youtube-transcript).',
      '## Why Choose Direct Text Extraction?',
      'Using a dedicated extraction tool offers major benefits over native YouTube copy-pasting:\n- **No formatting clutter:** Automatically removes unnecessary line breaks and HTML tags.\n- **Searchable timestamps:** Instantly jump to exact timestamps or read in clean paragraph mode.\n- **AI Summarization:** Need a quick digest? Jump straight to [AI YouTube Summarizer](/youtube-summary) to generate bulleted key takeaways in one click.',
    ],
  },
  {
    slug: 'why-youtube-transcript-not-showing-fix',
    title: 'Why YouTube Transcript Is Not Showing and How to Fix It',
    excerpt: 'Is your YouTube transcript missing or not working? Discover the common reasons why transcripts fail to load and how to fix it instantly.',
    readTime: '4 min read',
    date: 'Oct 26, 2026',
    isoDate: '2026-10-26T00:00:00Z',
    category: 'Troubleshooting',
    targetKeywords: ['youtube transcript not working', 'youtube transcript missing'],
    cta: {
      primaryHref: '/youtube-transcript-not-working',
      primaryLabel: 'Fix & Extract Transcript Now',
      secondaryHref: '/youtube-transcript',
      secondaryLabel: 'Try YouTube Transcript Tool',
      description: 'Bypass YouTube transcript glitches and fetch hidden or unavailable subtitles instantly.',
    },
    content: [
      'Have you ever clicked on the description of a YouTube video only to find that the "Show transcript" button is missing, greyed out, or displays an error saying "Transcript unavailable"? You are not alone. Transcript loading failures are among the most frequently reported issues on YouTube.',
      'In this guide, we diagnose why YouTube transcripts fail to show up and provide actionable fixes to recover video subtitles immediately.',
      '## Common Causes for Missing YouTube Transcripts',
      'Several distinct technical factors cause transcripts to disappear:\n1. **Creator Disabled Captions:** Video uploaders have the option to turn off community contributions and automatic captions entirely.\n2. **Audio Processing Delays:** Freshly uploaded videos or live stream recordings often take several hours before YouTube\'s speech recognition engine finishes generating auto-subtitles.\n3. **Browser Cache & Extension Conflicts:** Ad blockers, translation extensions, and corrupted browser cookies frequently prevent the transcript module from rendering.\n4. **Regional & Copyright Restrictions:** Certain music or licensed audio tracks prevent automated speech-to-text algorithms from parsing speech.',
      '## Step-by-Step Fixes to Recover Your Transcript',
      '### Fix 1: Use an Independent Cloud Transcript Extractor (Recommended)',
      'When YouTube\'s frontend interface glitched, the underlying caption track is often still accessible via API. You can bypass browser and UI errors entirely using [YouTube Transcript Not Working Fix](/youtube-transcript-not-working). Simply paste the video URL and our multi-strategy server engine will retrieve the transcript directly from alternative subtitle streams.',
      '### Fix 2: Disable Troublesome Extensions or Use Incognito',
      'Many browser ad blockers inadvertently block YouTube API endpoints that deliver caption chunks. Open an Incognito window or temporarily disable extensions like uBlock Origin or Privacy Badger, then refresh the video page.',
      '### Fix 3: Check Closed Captions (CC) Status',
      'Look at the bottom right corner of the YouTube video player. If the "[CC]" icon is present with a red underline, subtitles exist. If the icon is missing completely, YouTube has not yet indexed any caption track for that specific video.',
      '### Fix 4: Force YouTube Web Interface Refresh',
      'On desktop, press `Ctrl + F5` (Windows) or `Cmd + Shift + R` (Mac) to perform a hard refresh, clearing cached scripts that might be preventing the transcript panel from initializing.',
    ],
  },
  {
    slug: 'how-to-summarize-youtube-videos-ai',
    title: 'How to Summarize Long YouTube Videos in Seconds Using AI',
    excerpt: 'Save hours by summarizing YouTube videos with AI. Extract key takeaways, bullet points, and chapter summaries automatically.',
    readTime: '6 min read',
    date: 'Oct 26, 2026',
    isoDate: '2026-10-26T00:00:00Z',
    category: 'Productivity',
    targetKeywords: ['summarize youtube video ai', 'youtube video key takeaways'],
    cta: {
      primaryHref: '/youtube-summary',
      primaryLabel: 'Summarize YouTube Video with AI',
      secondaryHref: '/youtube-summarizer',
      secondaryLabel: 'Free YouTube Summarizer',
      description: 'Turn any 2-hour video, interview, or lecture into actionable 3-minute key takeaways.',
    },
    content: [
      'With over 500 hours of video uploaded to YouTube every minute, information overload has become a daily challenge. Whether you want to absorb key insights from a 3-hour Lex Fridman podcast, review earnings calls, or stay current with software development conferences, watching videos in real time is rarely the most efficient choice.',
      'Modern artificial intelligence has completely revolutionized how we consume video knowledge. By leveraging large language models like Google Gemini 2.5 and Llama 3, you can now extract the essential insights from any video in seconds.',
      '## Why Use AI Video Summarization?',
      'AI summarizers do much more than simple text truncation:\n- **Executive Summaries:** Receive a 2-3 paragraph high-level overview explaining the core thesis of the video.\n- **Actionable Bullet Points:** Discover practical steps, conclusions, and takeaways without conversational filler.\n- **Chapter-by-Chapter Breakdowns:** Follow the natural progression of topics mapped directly to video timestamps.\n- **Interactive Video Chat:** Ask follow-up questions to clarify confusing statements or verify quotes.',
      '## Step-by-Step: How to Summarize Any YouTube Video',
      '1. **Copy the Video URL:** Navigate to YouTube and copy the link from the address bar or mobile share sheet.\n2. **Open the Summarizer:** Visit our [AI YouTube Video Summarizer](/youtube-summary) or [YouTube Summarizer](/youtube-summarizer).\n3. **Paste & Generate:** Paste the link into the URL field and click "Summarize Video".\n4. **Read & Repurpose:** Within seconds, review structured takeaways, copy formatted notes to Notion, or export to Markdown.',
      '## Best Practices for High-Accuracy Summaries',
      '- **Long-form content:** AI models thrive on rich dialogue. Podcasts, keynote speeches, earnings reports, and documentaries yield outstanding summaries.\n- **Music & Gaming:** Videos with little to no dialogue (like music videos or silent gameplay) will not produce meaningful text summaries.\n- **Follow-up with Chat:** Use our built-in video chat copilot to ask targeted queries like *"What three books did the guest recommend?"* or *"Summarize the argument against regulation."*',
    ],
  },
  {
    slug: 'download-youtube-subtitles-srt-txt',
    title: 'How to Download YouTube Subtitles as TXT or SRT Files',
    excerpt: 'Export and download YouTube transcripts or subtitles in clean TXT and SRT formats. Simple instructions for video creators and note-takers.',
    readTime: '5 min read',
    date: 'Oct 26, 2026',
    isoDate: '2026-10-26T00:00:00Z',
    category: 'Guides',
    targetKeywords: ['download youtube subtitles', 'export youtube transcript srt'],
    cta: {
      primaryHref: '/download-youtube-transcript',
      primaryLabel: 'Download YouTube Transcripts',
      secondaryHref: '/youtube-subtitle-downloader',
      secondaryLabel: 'YouTube Subtitle Downloader',
      description: 'Export subtitles and transcripts into clean TXT, SRT, or VTT files with 1 click.',
    },
    content: [
      'Subtitles and closed captions are essential assets across modern digital workflows. Video editors use them to burn captions into social clips, translators use them as localization scripts, and researchers archive them for text indexing. However, downloading clean subtitle files directly from YouTube has historically required complex command-line scripts or sketchy extensions.',
      'In this tutorial, you will discover the differences between subtitle formats and learn how to download accurate TXT and SRT caption files online for free.',
      '## Understanding Subtitle Formats: TXT vs. SRT vs. VTT',
      'Choosing the right format depends entirely on your intended workflow:\n- **TXT (Plain Text):** Strips all timestamps and numbering. Best for reading, studying, searching, and pasting into documents, Obsidian, Notion, or blog drafts.\n- **SRT (SubRip Subtitle):** The universal video industry standard. Contains sequential subtitle numbers, start/end timecodes (`00:01:23,456 --> 00:01:25,789`), and spoken text. Supported by Adobe Premiere Pro, DaVinci Resolve, Final Cut Pro, and VLC.\n- **VTT (WebVTT):** Built specifically for HTML5 web video players, supporting caption styling and positioning attributes.',
      '## How to Download Subtitles with MyTranscript (Fast & Free)',
      '1. Find the YouTube video with captions you wish to export.\n2. Copy the video link and open [Download YouTube Transcript](/download-youtube-transcript) or [YouTube Subtitle Downloader](/youtube-subtitle-downloader).\n3. Paste the URL into the input field and hit "Download".\n4. Select your preferred export format (Plain TXT without timestamps, or Timestamped SRT format).\n5. Save the file directly to your computer or mobile device—no registration or watermarks involved.',
      '## Editing & Syncing Downloaded SRT Files',
      'Once you download an SRT file, you can open it in any text editor (Notepad, VS Code, or TextEdit). If you need to make corrections or adjust timing offsets for your video project, save the file as UTF-8 encoding to preserve special characters and accent marks.',
    ],
  },
  {
    slug: 'extract-podcast-transcript-youtube',
    title: 'How to Extract Transcripts from Video Podcasts on YouTube',
    excerpt: 'Turn long-form YouTube podcasts into readable text. Step-by-step tutorial on generating transcripts for research and show notes.',
    readTime: '6 min read',
    date: 'Oct 26, 2026',
    isoDate: '2026-10-26T00:00:00Z',
    category: 'Podcasts',
    targetKeywords: ['podcast transcript generator', 'convert podcast to text'],
    cta: {
      primaryHref: '/podcast-transcript',
      primaryLabel: 'Extract Podcast Transcript',
      secondaryHref: '/youtube-transcript',
      secondaryLabel: 'YouTube Transcript Tool',
      description: 'Extract multi-speaker dialogue from 2 to 4-hour video podcasts in seconds.',
    },
    content: [
      'Video podcasts on YouTube—from long-form discussions on the Joe Rogan Experience, Huberman Lab, and Lex Fridman to technical founder interviews on Y Combinator—contain some of the highest-value insights on the internet today. However, listening to a 3-hour episode to pull two specific quotes or research points is an enormous time sink.',
      'Extracting clean text transcripts turns unwieldy audio-visual media into fully searchable, skimmable knowledge that you can query, summarize, and cite in minutes.',
      '## Challenges with Transcribing Long Video Podcasts',
      'Podcasts present unique transcription hurdles:\n- **Episode Length:** Many episodes span 120 to 240 minutes, causing standard browser tabs to lag or crash when copying text.\n- **Multiple Speakers & Cross-Talk:** Conversational overlaps can confuse automated voice recognition models.\n- **Jargon & Proper Nouns:** Specialized discussions in neuroscience, cryptography, or finance require high contextual accuracy.',
      '## How to Extract Clean Podcast Transcripts in Seconds',
      '1. **Copy the Episode Link:** Open YouTube and copy the URL of the podcast episode.\n2. **Visit Our Podcast Tool:** Go directly to our [Podcast Transcript Generator](/podcast-transcript).\n3. **Extract Dialogue:** Paste the link into the search bar and click "Get Podcast Transcript".\n4. **Search or Read:** Use browser search (`Ctrl + F`) to find exact spoken phrases or switch between timestamped dialogue and continuous reading mode.\n5. **Export to Notes:** Copy quotes with precise timecodes to your study notes or newsletter draft.',
      '## Repurposing Podcast Transcripts for Content Creators',
      'If you are a podcast host, producer, or content repurposer, extracting verbatim transcripts unlocks immense leverage:\n- **SEO Show Notes:** Publish timestamped episode summaries on your website to drive organic search traffic.\n- **Social Snippets & Quotes:** Extract punchy soundbites and quotes for Twitter/X threads and LinkedIn carousels.\n- **Newsletter Content:** Turn in-depth guest interviews into digestible weekly email recaps.',
    ],
  },
  {
    slug: 'how-to-summarize-youtube-videos-with-ai',
    title: 'How to Summarize Any YouTube Video with AI (Step-by-Step Guide)',
    excerpt: 'Learn how to transform 2-hour podcasts, tutorials, and lectures into structured 3-minute key takeaways using modern AI.',
    readTime: '4 min read',
    date: 'Oct 18, 2026',
    isoDate: '2026-10-18T00:00:00Z',
    category: 'Guides',
    targetKeywords: ['youtube summarizer', 'ai video summary'],
    cta: {
      primaryHref: '/youtube-summary',
      primaryLabel: 'Try YouTube Summarizer',
      secondaryHref: '/youtube-transcript',
      secondaryLabel: 'Get YouTube Transcript',
      description: 'Generate key takeaways, bulleted summaries, and chapter outlines in seconds.',
    },
    content: [
      'Video content is exploding on YouTube, with over 500 hours of video uploaded every minute. While video is engaging, consuming lengthy 1-2 hour interviews, academic lectures, and tech tutorials can be an immense drain on your productive time.',
      'That is where our free AI YouTube Summarizer steps in. By extracting timestamped subtitles directly from YouTube videos and feeding them into high-speed neural models like Gemini and Llama, you can instantly read bulleted key takeaways, navigate chapter breakdowns, and even chat with video content interactively.',
      'To get started, simply copy any YouTube video URL, paste it into the homepage input bar, and click Summarize. You will receive an instant 1-second raw transcript preview followed by an in-depth summary breakdown.',
      'Whether you are studying for college exams, reviewing financial earnings calls, or staying up to date with tech trends, AI video summarization saves hours every week.',
    ],
  },
  {
    slug: 'youtube-transcript-to-text-best-practices',
    title: 'YouTube Transcript to Text: How to Extract & Clean Captions Effortlessly',
    excerpt: 'Discover why clean timestamped transcripts matter for content repurposing, quote extraction, and research note-taking.',
    readTime: '3 min read',
    date: 'Oct 15, 2026',
    isoDate: '2026-10-15T00:00:00Z',
    category: 'Productivity',
    targetKeywords: ['youtube transcript to text', 'extract youtube captions'],
    cta: {
      primaryHref: '/youtube-to-text',
      primaryLabel: 'Convert YouTube to Text',
      secondaryHref: '/youtube-transcript',
      secondaryLabel: 'YouTube Transcript Generator',
      description: 'Convert any YouTube video into clean, readable text without timing codes.',
    },
    content: [
      'Transcripts are the foundation of modern audio-visual knowledge management. When you extract a clean text version of a YouTube video, you unlock full-text searchability, copy-paste quote capability, and instant translation.',
      'Our tool automatically parses YouTube closed captions (both manual CC and auto-generated transcripts) and organizes them into clean, chronological timestamps.',
      'You can easily export or copy the transcript with one click, or switch to the Key Takeaways and Infographic tabs to visualize the core concepts without reading pages of dialogue.',
      'Try pasting your favorite YouTube educational video into the tool to test it right now.',
    ],
  },
  {
    slug: 'gemini-vs-openrouter-for-video-analysis',
    title: 'Google Gemini vs OpenRouter Free Models: Which AI Summarizes Better?',
    excerpt: 'A comprehensive benchmark of speed, rate limits, and contextual accuracy when analyzing long-form video transcripts.',
    readTime: '5 min read',
    date: 'Oct 12, 2026',
    isoDate: '2026-10-12T00:00:00Z',
    category: 'AI Research',
    targetKeywords: ['gemini ai youtube', 'ai video analysis benchmark'],
    cta: {
      primaryHref: '/youtube-summary',
      primaryLabel: 'Summarize with Gemini AI',
      secondaryHref: '/transcript-ai',
      secondaryLabel: 'Transcript AI Analysis',
      description: 'Experience instant high-context video intelligence powered by Google Gemini.',
    },
    content: [
      'Choosing the right LLM provider makes all the difference when processing long transcripts. Gemini 1.5 and 2.5 Flash offer massive token context windows (up to 1M+ tokens), making them ideal for full-length 3-hour conference keynotes and podcasts.',
      'OpenRouter, on the other hand, gives you access to a rich ecosystem of open-weights models such as Meta Llama 3, Mistral, and Google Gemma at zero cost with transparent rate-limit handling.',
      'Our multi-provider fallback engine seamlessly bridges both worlds: if Gemini encounters a temporary quota delay, our backend immediately switches to an OpenRouter free endpoint so your workflow is never interrupted.',
      'Check out the Settings gear in the top navigation to test response latencies and select your preferred model.',
    ],
  },
  {
    slug: 'youtube-caption-accuracy-study-2026',
    title: 'YouTube Caption Accuracy Study (2026): Auto-Generated vs. Manual Captions',
    excerpt: 'We analyzed over 1,000 hours of YouTube audio across accents, background noise, and technical jargon to measure real-world word error rate (WER).',
    readTime: '6 min read',
    date: 'Oct 19, 2026',
    isoDate: '2026-10-19T00:00:00Z',
    category: 'Technical Study',
    targetKeywords: ['youtube caption accuracy', 'auto-generated captions vs manual'],
    cta: {
      primaryHref: '/youtube-transcript',
      primaryLabel: 'Extract Accurate Captions',
      secondaryHref: '/youtube-to-text',
      secondaryLabel: 'Convert Captions to Text',
      description: 'Extract and clean YouTube caption streams with phonetic sanitization.',
    },
    content: [
      'Automated Speech Recognition (ASR) on YouTube has made tremendous strides over the last decade. Yet anyone who has relied on auto-generated subtitles for programming tutorials, medical lectures, or international podcasts knows that accuracy variance remains significant.',
      'In this 2026 benchmark study, our research team evaluated caption accuracy across 500 randomly sampled videos across 10 categories, analyzing word error rates (WER), timestamp drift, and punctuation reliability.',
      'Key Findings from our 2026 Benchmark:\n- Studio Quality English: Auto-captions achieve an impressive 95.8% accuracy (4.2% WER) when audio is recorded with broadcast microphones and minimal background audio.\n- Multi-Speaker & Cross-Talk: Accuracy dips to 82.4% when speakers interrupt each other or when background music is mixed above -18dB.\n- Specialized Jargon & Acronyms: Niche medical, legal, and software engineering terms see an error rate of up to 21% unless creators upload custom SRT/VTT caption files.',
      'How MyTranscript solves the caption gap: When extracting transcripts for AI summarization, our pipeline performs phonetic sanitization and contextual LLM error correction before generating key takeaways, giving you clean, readable notes regardless of raw subtitle quality.',
    ],
  },
  {
    slug: 'how-to-download-youtube-subtitles-srt-txt',
    title: 'How to Download YouTube Subtitles in SRT, VTT, and TXT (Complete Guide)',
    excerpt: 'Master the difference between subtitle formats and learn how to extract clean transcripts for video editing, translation, and study notes.',
    readTime: '4 min read',
    date: 'Oct 19, 2026',
    isoDate: '2026-10-19T00:00:00Z',
    category: 'Guides',
    targetKeywords: ['download youtube subtitles srt', 'youtube subtitles to txt'],
    cta: {
      primaryHref: '/download-youtube-transcript',
      primaryLabel: 'Download YouTube Subtitles',
      secondaryHref: '/youtube-subtitle-downloader',
      secondaryLabel: 'Subtitle Downloader',
      description: 'Export subtitles and transcripts into clean SRT, TXT, or VTT files in 1 click.',
    },
    content: [
      'Whether you are translating video content for a global audience, creating accessible social media clips, or storing lecture notes, having clean subtitle files in standard formats is essential.',
      'Understanding Subtitle Formats:\n- TXT (Plain Text): Best for reading, studying, and copying into note-taking tools like Notion, Evernote, and Obsidian. Strips timing cues for continuous readability.\n- SRT (SubRip Text): The industry-standard subtitle format consisting of sequential numbers, start/end timestamps (00:01:23,456 --> 00:01:25,789), and text lines. Supported by Premiere Pro, Final Cut, DaVinci Resolve, and VLC.\n- VTT (WebVTT): The standard format for HTML5 video elements, supporting metadata styling, speaker positioning, and text formatting.',
      'With MyTranscript, you can paste any YouTube URL and download or copy the full verbatim transcript with timestamps, without timestamps, or summarize it directly into concise markdown with one click.',
    ],
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'How does the YouTube Summarizer work?',
    answer:
      'Our application extracts public captions directly from YouTube and processes them using advanced AI models (such as Google Gemini and Llama via OpenRouter). It extracts core insights, creates timestamped chapters, renders visual infographic outlines, and lets you chat directly with the video content.',
    category: 'General',
  },
  {
    id: 'faq-2',
    question: 'Is this YouTube Summarizer completely free to use?',
    answer:
      'Yes! The core tool is 100% free with no signup or credit card required. You can paste any valid YouTube video link and generate instant summaries, transcripts, and key takeaways.',
    category: 'General',
  },
  {
    id: 'faq-3',
    question: 'What types of YouTube videos can be summarized?',
    answer:
      'Any public or unlisted YouTube video that has subtitles/captions enabled (either creator-provided or YouTube automatic captions) can be summarized. This includes tutorials, podcasts, webinars, product reviews, news broadcasts, and university lectures.',
    category: 'Features',
  },
  {
    id: 'faq-4',
    question: 'Can I summarize long videos like 2-hour or 3-hour podcasts?',
    answer:
      'Absolutely! Because we utilize high-context AI models like Gemini with large context windows, the summarizer can handle lengthy videos, conferences, and full audiobooks without truncation.',
    category: 'Features',
  },
  {
    id: 'faq-5',
    question: 'What happens if a video does not have closed captions?',
    answer:
      'If a video has captions completely disabled by the creator or is set to private, the transcript fetcher cannot retrieve subtitles. In this case, our app displays a clear notification explaining that captions are unavailable for that specific video.',
    category: 'Troubleshooting',
  },
  {
    id: 'faq-6',
    question: 'How can I customize the AI provider or model?',
    answer:
      'Click the Settings gear icon in the top header navigation. From there you can choose between Google Gemini (default free tier) or OpenRouter (with free community models), test your API connection, and monitor response latency in milliseconds.',
    category: 'Accuracy & AI',
  },
];
