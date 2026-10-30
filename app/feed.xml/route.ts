import { NextResponse } from 'next/server';
import { BLOG_POSTS } from '@/lib/contentData';

const BASE_URL = 'https://www.mytranscript.pro';

export const dynamic = 'force-static';

function toRfc822Date(dateString: string): string {
  const parsed = new Date(dateString);
  return Number.isNaN(parsed.getTime())
    ? new Date().toUTCString()
    : parsed.toUTCString();
}

export function GET() {
  const buildDate = new Date().toUTCString();

  const toolItems = [
    {
      title: 'Download YouTube Transcript – Free Export to TXT, SRT & PDF',
      url: `${BASE_URL}/download-youtube-transcript`,
      desc: 'Instantly download and export full YouTube video transcripts in TXT, SRT, or PDF format with one click. Free online caption downloader with accurate timestamps.',
      category: 'Tools',
    },
    {
      title: 'YouTube to SRT Converter – Free Online Subtitle Extractor (.srt)',
      url: `${BASE_URL}/youtube-to-srt`,
      desc: 'Convert YouTube videos to standard SRT subtitle files online. Extract timed captions and download .srt files for Premiere Pro, DaVinci Resolve, Final Cut & VLC.',
      category: 'Tools',
    },
    {
      title: 'YouTube to Text Without Timestamps – Clean Plain Text Transcript',
      url: `${BASE_URL}/youtube-to-text-no-timestamps`,
      desc: 'Extract clean YouTube transcripts without timestamps or timecodes. Convert video dialogue to continuous readable text for ChatGPT, Claude, notes, and articles.',
      category: 'Tools',
    },
  ];

  const toolXmlItems = toolItems.map((item) => `    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.url}</link>
      <guid isPermaLink="true">${item.url}</guid>
      <description><![CDATA[${item.desc}]]></description>
      <pubDate>${buildDate}</pubDate>
      <category><![CDATA[${item.category}]]></category>
    </item>`).join('\n');

  const articleItems = BLOG_POSTS.map((post) => {
    const articleUrl = `${BASE_URL}/articles/${post.slug}`;
    const pubDate = toRfc822Date(post.isoDate || post.date);

    return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${articleUrl}</link>
      <guid isPermaLink="true">${articleUrl}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${pubDate}</pubDate>
      <category><![CDATA[${post.category}]]></category>
    </item>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>MyTranscript.pro Articles &amp; Tools</title>
    <link>${BASE_URL}</link>
    <description>Practical guides, tools, and benchmarks on automated YouTube transcription, plain-text extraction, subtitle downloads, and AI video summarization.</description>
    <language>en-US</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${toolXmlItems}
${articleItems}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=43200, s-maxage=43200',
    },
  });
}
