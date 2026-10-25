export interface SlugSeoConfig {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  subheadline: string;
  badge: string;
  badgeEmoji: string;
  inputPlaceholder: string;
  buttonLabel: string;
  targetTab: 'summary' | 'transcript' | 'infographic' | 'chat' | 'takeaways';
  features: { icon: string; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
}

export const SLUG_CONFIGS: Record<string, SlugSeoConfig> = {
  'youtube-transcript': {
    slug: 'youtube-transcript',
    title: 'YouTube Transcript Generator – Free Online Video to Text',
    metaDescription: 'Extract and generate accurate YouTube transcripts instantly. Convert any YouTube video into clean, readable text.',
    h1: 'Free YouTube Transcript Generator',
    subheadline: 'Instantly extract full, timestamped transcripts from any YouTube video. Search spoken dialogue, copy text in one click, or export to notes.',
    badge: 'Instant Text Extraction',
    badgeEmoji: '📄',
    inputPlaceholder: 'Paste YouTube URL to generate transcript...',
    buttonLabel: 'Get Transcript',
    targetTab: 'transcript',
    features: [
      { icon: '⚡', title: 'Sub-2-Second Extraction', description: 'Fetch accurate transcripts directly from YouTube closed captions at lightning speed.' },
      { icon: '⏱️', title: 'Precise Timestamps', description: 'Every line is tagged with exact MM:SS video timestamps for seamless navigation.' },
      { icon: '📋', title: '1-Click Copy & Export', description: 'Easily copy formatted transcripts or export to Markdown, TXT, or documents.' },
    ],
    faqs: [
      { question: 'How do I extract a transcript from a YouTube video?', answer: 'Copy any YouTube video link, paste it into the field above, and click "Get Transcript". The complete text appears in seconds.' },
      { question: 'Does this work on auto-generated captions?', answer: 'Yes! It fully supports auto-generated subtitles, creator-uploaded captions, and multilingual CC.' },
      { question: 'Is the YouTube transcript generator free?', answer: 'Yes, 100% free with no sign-up or credit card required.' },
    ],
  },
  'youtube-transcript-generator': {
    slug: 'youtube-transcript-generator',
    title: 'YouTube Transcript Generator – Extract Accurate Video Captions Online',
    metaDescription: 'Generate clean transcripts and subtitles from YouTube videos online. Fast, accurate, and free caption extractor.',
    h1: 'Online YouTube Transcript Generator',
    subheadline: 'Convert YouTube speech to formatted text with exact timestamps. Perfect for students, researchers, and content creators.',
    badge: 'Caption Generator',
    badgeEmoji: '🎯',
    inputPlaceholder: 'Enter YouTube video link to extract subtitles...',
    buttonLabel: 'Generate Transcript',
    targetTab: 'transcript',
    features: [
      { icon: '🚀', title: 'Instant Processing', description: 'Direct serverless transcript retrieval without audio buffering delays.' },
      { icon: '🕒', title: 'Synchronized Offsets', description: 'Follow spoken dialogue word-for-word alongside original video timing.' },
      { icon: '📄', title: 'Export Ready', description: 'Clean text output stripped of unwanted noise and system tags.' },
    ],
    faqs: [
      { question: 'Can I generate transcripts for long videos?', answer: 'Yes, video podcasts, webinars, and lectures of any length are supported.' },
      { question: 'What formats can I copy or export?', answer: 'You can copy plain text, text with timestamps, or download formatted transcripts.' },
    ],
  },
  'youtube-summary': {
    slug: 'youtube-summary',
    title: 'AI YouTube Video Summarizer – Summarize YouTube Videos Fast',
    metaDescription: 'Get instant AI-powered YouTube video summaries, key takeaways, and bulleted chapter breakdowns in seconds.',
    h1: 'Summarize Any YouTube Video with AI',
    subheadline: 'Turn hours of video into minutes of reading. Get executive summaries, core concepts, actionable insights, and structured chapters.',
    badge: 'AI Summarizer',
    badgeEmoji: '🤖',
    inputPlaceholder: 'Paste YouTube URL to summarize with AI...',
    buttonLabel: 'Summarize Video',
    targetTab: 'summary',
    features: [
      { icon: '💡', title: 'Core Key Takeaways', description: 'Extract top actionable insights and conclusions without watching full videos.' },
      { icon: '📑', title: 'Chapterized Outlines', description: 'Logical chronological summaries broken down chapter-by-chapter.' },
      { icon: '🧠', title: 'Advanced AI Models', description: 'Powered by Gemini AI and deep language models for high contextual precision.' },
    ],
    faqs: [
      { question: 'How long does AI summarization take?', answer: 'Most video summaries are generated within 3 to 6 seconds.' },
      { question: 'Can I summarize 2-hour podcasts or lectures?', answer: 'Yes, our high-context AI models handle long-form videos with ease.' },
    ],
  },
  'youtube-summarizer': {
    slug: 'youtube-summarizer',
    title: 'YouTube Summarizer – Free AI Video Summary Tool',
    metaDescription: 'Summarize YouTube videos with AI. Instant takeaways, key highlights, and condensed notes from any YouTube link.',
    h1: 'Free AI YouTube Summarizer',
    subheadline: 'Save hours every day by converting long YouTube videos into concise, high-impact notes and structured key takeaways.',
    badge: 'Smart Summary',
    badgeEmoji: '⚡',
    inputPlaceholder: 'Paste YouTube link for fast AI summary...',
    buttonLabel: 'Get AI Summary',
    targetTab: 'summary',
    features: [
      { icon: '🔍', title: 'Executive Overviews', description: 'Get high-level summaries highlighting the most critical discussion points.' },
      { icon: '⏱️', title: 'Timestamped Highlights', description: 'Every key takeaway references the exact time in the YouTube video.' },
      { icon: '💬', title: 'Interactive Video Q&A', description: 'Ask questions directly to the video content after generating the summary.' },
    ],
    faqs: [
      { question: 'Is this YouTube summarizer free?', answer: 'Yes, completely free with no registration required.' },
      { question: 'Does it support YouTube Shorts?', answer: 'Yes, both regular videos and YouTube Shorts are supported.' },
    ],
  },
  'youtube-to-text': {
    slug: 'youtube-to-text',
    title: 'Convert YouTube Video to Text – Quick & Free Converter',
    metaDescription: 'Easily convert YouTube audio and video into clean plain text for notes, articles, or research.',
    h1: 'Convert YouTube Videos to Text',
    subheadline: 'Transform spoken video dialogue into clean, formatted text. Ideal for study notes, blog posts, newsletters, and quotations.',
    badge: 'Video to Text',
    badgeEmoji: '✍️',
    inputPlaceholder: 'Paste YouTube video URL to convert to text...',
    buttonLabel: 'Convert to Text',
    targetTab: 'transcript',
    features: [
      { icon: '📝', title: 'Clean Plain Text', description: 'Strips filler sounds and timing marks for smooth, continuous reading.' },
      { icon: '📚', title: 'Study & Repurposing', description: 'Paste video transcripts directly into Notion, Obsidian, Google Docs, or Word.' },
      { icon: '⚡', title: 'Zero Wait Time', description: 'Convert videos into text in seconds without waiting for manual transcription.' },
    ],
    faqs: [
      { question: 'How accurate is the text conversion?', answer: 'Captions are extracted directly from YouTube official subtitle streams for maximum fidelity.' },
      { question: 'Can I convert transcripts without timestamps?', answer: 'Yes, you can toggle between timestamped and clean continuous text.' },
    ],
  },
  'podcast-transcript': {
    slug: 'podcast-transcript',
    title: 'Podcast Transcript Generator – Convert Video Podcasts to Text',
    metaDescription: 'Generate clean transcripts for video podcasts on YouTube. Extract full audio transcripts effortlessly.',
    h1: 'Free Podcast Transcript Generator',
    subheadline: 'Extract verbatim dialogue, interview quotes, and discussion topics from any YouTube video podcast in seconds.',
    badge: 'Podcast Transcripts',
    badgeEmoji: '🎙️',
    inputPlaceholder: 'Paste YouTube podcast link to extract dialogue...',
    buttonLabel: 'Get Podcast Transcript',
    targetTab: 'transcript',
    features: [
      { icon: '🎙️', title: 'Multi-Speaker Support', description: 'Follow conversational flow across long interviews and panel discussions.' },
      { icon: '⏰', title: 'Long-Form Optimized', description: 'Engineered to handle 2 to 4-hour podcast episodes without truncation.' },
      { icon: '🔎', title: 'Search Spoken Quotes', description: 'Search specific words or phrases to jump straight to relevant segments.' },
    ],
    faqs: [
      { question: 'Can I extract transcripts from 3-hour podcasts like Joe Rogan or Lex Fridman?', answer: 'Yes! Simply paste the YouTube link and the full transcript will be retrieved.' },
      { question: 'Can I summarize the podcast after extracting transcripts?', answer: 'Yes, one click generates key takeaways, speaker highlights, and chapter outlines.' },
    ],
  },
  'youtube-transcript-chatbot': {
    slug: 'youtube-transcript-chatbot',
    title: 'Chat with YouTube Videos – AI YouTube Transcript Chatbot',
    metaDescription: 'Ask questions and chat directly with any YouTube video transcript using AI.',
    h1: 'Chat with Any YouTube Video',
    subheadline: 'Have an interactive conversation with any video. Ask specific questions, pull quotes, clarify complex topics, and explore ideas.',
    badge: 'AI Video Chat',
    badgeEmoji: '💬',
    inputPlaceholder: 'Enter YouTube URL to chat with video content...',
    buttonLabel: 'Start Chatting',
    targetTab: 'chat',
    features: [
      { icon: '💬', title: 'Context-Aware AI Chat', description: 'The AI reads the entire transcript to answer your questions with precise citations.' },
      { icon: '🔍', title: 'Fact & Quote Retrieval', description: 'Ask "what did the speaker say about X?" and get exact timestamps.' },
      { icon: '🧠', title: 'Deep Comprehension', description: 'Explain difficult tutorials, translate explanations, and simplify complex jargon.' },
    ],
    faqs: [
      { question: 'How does chatting with a YouTube video work?', answer: 'We extract the video transcript and feed it to Gemini AI so you can converse with its contents directly.' },
      { question: 'Do I need an API key to chat?', answer: 'No, free tier AI chat is built right into the platform.' },
    ],
  },
  'youtube-transcript-without-timestamps': {
    slug: 'youtube-transcript-without-timestamps',
    title: 'YouTube Transcript Without Timestamps – Clean Text Extractor',
    metaDescription: 'Extract YouTube transcripts with no timestamps. Get clean paragraphs of plain text ready to read, copy, and paste.',
    h1: 'YouTube Transcript Without Timestamps',
    subheadline: 'Strip all timing cues, numbers, and brackets. Get smooth, continuous text ready for note-taking, reading, or article drafts.',
    badge: 'Clean Text',
    badgeEmoji: '📖',
    inputPlaceholder: 'Paste YouTube URL to get clean text without timestamps...',
    buttonLabel: 'Extract Clean Text',
    targetTab: 'transcript',
    features: [
      { icon: '🧹', title: 'No Timestamps or Clutter', description: 'Removes 00:00 timecodes and brackets for a smooth reading experience.' },
      { icon: '📋', title: 'Ready to Copy', description: 'One-click copy into Notion, Word, Evernote, or your personal knowledge base.' },
      { icon: '⚡', title: 'Instant Plain Text', description: 'Generate formatted paragraphs ready for essays or study summaries.' },
    ],
    faqs: [
      { question: 'Why extract transcripts without timestamps?', answer: 'Without timestamps, text reads like a natural article or book chapter without timing interruptions.' },
      { question: 'Can I re-enable timestamps later?', answer: 'Yes, you can toggle timestamps on or off anytime with a single click.' },
    ],
  },
  'youtube-transcript-not-working': {
    slug: 'youtube-transcript-not-working',
    title: 'YouTube Transcript Not Working? Fix & Extract Captions Instantly',
    metaDescription: 'Fix YouTube transcript unavailable or not showing errors. Extract subtitles and captions with our reliable tool.',
    h1: 'Fix: YouTube Transcript Not Working',
    subheadline: 'Encountering missing captions or disabled transcripts on YouTube? Our multi-strategy extractor bypasses common player errors.',
    badge: 'Troubleshooter & Extractor',
    badgeEmoji: '🛠️',
    inputPlaceholder: 'Paste YouTube URL that has transcript issues...',
    buttonLabel: 'Fetch Transcript Now',
    targetTab: 'transcript',
    features: [
      { icon: '🛡️', title: 'Multi-Strategy Fallback', description: 'Connects directly to alternative subtitle streams when standard YouTube player fails.' },
      { icon: '🌐', title: 'Auto-Captions & Multilingual', description: 'Recovers automated speech tracks even if creator disabled user CC display.' },
      { icon: '⚡', title: 'Instant Recovery', description: 'No browser extensions or plugins needed — runs entirely in the cloud.' },
    ],
    faqs: [
      { question: 'Why does YouTube say "Transcript unavailable"?', answer: 'YouTube often hides transcripts on certain mobile apps or when creator settings glitch. Our tool accesses the raw subtitle stream directly.' },
      { question: 'Does this work on all public videos?', answer: 'It works on any public video that has auto-generated or manual subtitles available.' },
    ],
  },
  'download-youtube-transcript': {
    slug: 'download-youtube-transcript',
    title: 'Download YouTube Transcript – Export to TXT & SRT',
    metaDescription: 'Download and export YouTube transcripts in TXT, SRT, or VTT formats easily.',
    h1: 'Download YouTube Transcripts Free',
    subheadline: 'Export video transcripts and subtitle tracks in TXT, SRT, or Markdown formats for video editing, translation, or archives.',
    badge: 'Transcript Downloader',
    badgeEmoji: '📥',
    inputPlaceholder: 'Paste YouTube link to download transcript...',
    buttonLabel: 'Download Transcript',
    targetTab: 'transcript',
    features: [
      { icon: '💾', title: 'Multiple Formats', description: 'Download as clean TXT, industry-standard SRT subtitles, or Markdown notes.' },
      { icon: '🎬', title: 'Video Editor Friendly', description: 'Import SRT files directly into Premiere Pro, Final Cut, DaVinci Resolve, or VLC.' },
      { icon: '⚡', title: 'Free & Instant', description: 'No file size limits or wait times — downloads trigger immediately.' },
    ],
    faqs: [
      { question: 'What subtitle formats are supported?', answer: 'You can download transcripts as TXT, SRT, or copy directly to clipboard.' },
      { question: 'Can I download subtitles in other languages?', answer: 'Yes, if the YouTube video has multilingual captions, you can extract them.' },
    ],
  },
  'youtube-subtitle-downloader': {
    slug: 'youtube-subtitle-downloader',
    title: 'YouTube Subtitle Downloader – Download SRT, VTT & TXT Files',
    metaDescription: 'Download subtitles from YouTube videos online in SRT, VTT, or TXT. Free caption downloader with no registration.',
    h1: 'Free YouTube Subtitle Downloader',
    subheadline: 'Easily download closed captions and subtitles from any YouTube video. Clean files formatted for video players and editors.',
    badge: 'Subtitle Downloader',
    badgeEmoji: '🎞️',
    inputPlaceholder: 'Enter YouTube URL to download subtitle file...',
    buttonLabel: 'Download Subtitles',
    targetTab: 'transcript',
    features: [
      { icon: '🎬', title: 'Standard SRT & VTT', description: 'Universal subtitle formats compatible with all modern media players.' },
      { icon: '⏱️', title: 'Frame-Accurate Timestamps', description: 'Synchronized millisecond timing cues for professional video production.' },
      { icon: '🚀', title: 'Direct Cloud Fetch', description: 'Fast downloads with zero ads, captchas, or required software.' },
    ],
    faqs: [
      { question: 'How do I download SRT subtitles from YouTube?', answer: 'Paste the video URL, click Download, and choose your preferred subtitle format.' },
      { question: 'Does it support 4K and long videos?', answer: 'Yes, video duration and resolution do not affect subtitle extraction speed.' },
    ],
  },
  'youtube-infographic': {
    slug: 'youtube-infographic',
    title: 'YouTube to Infographic – Convert Video Ideas into Visual Outlines',
    metaDescription: 'Transform long YouTube videos into visual infographic outlines, conceptual workflows, and diagram prompts with AI.',
    h1: 'YouTube Video to Infographic Prompts',
    subheadline: 'Convert dense explanations and step-by-step tutorials into structured visual briefs, diagram blueprints, and infographic cards.',
    badge: 'Visual Summaries',
    badgeEmoji: '📊',
    inputPlaceholder: 'Paste YouTube video link to generate infographic outline...',
    buttonLabel: 'Generate Infographic',
    targetTab: 'infographic',
    features: [
      { icon: '📊', title: 'Visual Frameworks', description: 'Turns sequential speech into structured frameworks, tables, and workflows.' },
      { icon: '🎨', title: 'Ready for Canva & Midjourney', description: 'Generate structured prompts to create presentation slides and graphics.' },
      { icon: '💡', title: 'Fast Visual Learning', description: 'Understand complex concepts at a glance without reading walls of text.' },
    ],
    faqs: [
      { question: 'What is a video infographic summary?', answer: 'It is a structured conceptual outline designed for visual diagrams, flowcharting, and slide creation.' },
      { question: 'Can I export the visual outline?', answer: 'Yes, copy the structured markdown format directly into your design tools or notes.' },
    ],
  },
  'transcript-ai': {
    slug: 'transcript-ai',
    title: 'Transcript AI – Deep YouTube Video Intelligence & Synthesis',
    metaDescription: 'Next-generation AI video analysis. Synthesize video transcripts, extract citations, and generate research reports.',
    h1: 'Transcript AI: Intelligent Video Synthesis',
    subheadline: 'Uncover deep insights from long video content. Perform semantic analysis, extract key citations, and synthesize ideas with AI.',
    badge: 'Neural Video AI',
    badgeEmoji: '🧠',
    inputPlaceholder: 'Paste YouTube URL for deep AI intelligence synthesis...',
    buttonLabel: 'Analyze with AI',
    targetTab: 'takeaways',
    features: [
      { icon: '🔬', title: 'Deep Synthesis', description: 'Connects core arguments, methodologies, and thesis points across entire videos.' },
      { icon: '📑', title: 'Thematic Categorization', description: 'Groups discussions into logical thematic clusters rather than raw timeline text.' },
      { icon: '⚡', title: 'High-Speed Intelligence', description: 'Comprehensive multi-layer transcript comprehension in seconds.' },
    ],
    faqs: [
      { question: 'How does Transcript AI differ from a standard transcript?', answer: 'Transcript AI goes beyond verbatim captions to analyze context, tone, logic, and core arguments.' },
      { question: 'Can I export synthesized reports?', answer: 'Yes, copy structured markdown reports directly into Notion, Obsidian, or research notes.' },
    ],
  },
};

export function getSlugConfig(slug: string): SlugSeoConfig {
  if (SLUG_CONFIGS[slug]) {
    return SLUG_CONFIGS[slug];
  }
  // Fallback default
  return {
    slug,
    title: 'YouTube Transcript & AI Summarizer – MyTranscript',
    metaDescription: 'Extract transcripts and generate AI summaries from any YouTube video instantly for free.',
    h1: 'Free YouTube Transcript & AI Summarizer',
    subheadline: 'Extract clean transcripts and generate AI summaries in seconds. Free, instant, and privacy-friendly.',
    badge: 'AI Video Tool',
    badgeEmoji: '🚀',
    inputPlaceholder: 'Paste YouTube URL here...',
    buttonLabel: 'Process Video',
    targetTab: 'summary',
    features: [
      { icon: '⚡', title: 'Fast & Instant', description: 'Generate transcripts and summaries in 1-3 seconds.' },
      { icon: '🎯', title: 'High Accuracy', description: 'Powered by official caption data and advanced Gemini AI.' },
      { icon: '🔒', title: 'Privacy Friendly', description: 'No login, cookies, or extensions required.' },
    ],
    faqs: [
      { question: 'Is this tool free?', answer: 'Yes, completely free forever.' },
      { question: 'How do I use it?', answer: 'Simply paste any YouTube video link into the search box and press the button.' },
    ],
  };
}
