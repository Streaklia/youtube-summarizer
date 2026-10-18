import { VideoMetadata, TranscriptEntry } from './types';
import { YoutubeTranscript } from 'youtube-transcript';

export function extractVideoId(url: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();

  // Handle direct 11-char video ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  const patterns = [
    /[?&]v=([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/live\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match) return match[1];
  }

  return null;
}

export async function getVideoMetadata(videoId: string): Promise<VideoMetadata> {
  const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
  
  try {
    const response = await fetch(oembedUrl);
    if (!response.ok) {
      throw new Error('Video not found or private');
    }
    const data = await response.json();

    let duration = '';
    try {
      const pageRes = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept-Language': 'en-US,en;q=0.9',
        },
      });
      const html = await pageRes.text();
      const durationMatch = html.match(/"lengthSeconds":"(\d+)"/);
      if (durationMatch) {
        const totalSeconds = parseInt(durationMatch[1], 10);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        duration =
          hours > 0
            ? `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
            : `${minutes}:${seconds.toString().padStart(2, '0')}`;
      }
    } catch {
      // Best-effort
    }

    return {
      title: data.title || 'YouTube Video',
      thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      channelName: data.author_name || 'YouTube Channel',
      duration,
      videoId,
    };
  } catch (err: any) {
    return {
      title: 'YouTube Video',
      thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      channelName: 'YouTube Channel',
      duration: '',
      videoId,
    };
  }
}

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(dec));
}

// Fallback 1: Extract captions from Watch page HTML directly
async function fetchTranscriptFromHtml(videoId: string): Promise<TranscriptEntry[]> {
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const response = await fetch(watchUrl, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9,ar;q=0.8,fr;q=0.7',
    },
  });

  const html = await response.text();
  const splitted = html.split('"captionTracks":');
  if (splitted.length < 2) {
    throw new Error('No captionTracks found in video page');
  }

  const rawJson = splitted[1].split(']')[0] + ']';
  const captionTracks = JSON.parse(rawJson);
  if (!captionTracks || captionTracks.length === 0) {
    throw new Error('Empty captionTracks');
  }

  // Find preferred language or use the first track
  const track = captionTracks[0];
  if (!track.baseUrl) {
    throw new Error('No baseUrl on caption track');
  }

  const transcriptRes = await fetch(track.baseUrl, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    },
  });

  const xml = await transcriptRes.text();
  const regex = /<text start="([^"]*)" dur="([^"]*)">([^<]*)<\/text>/g;
  const entries: TranscriptEntry[] = [];
  let match;

  while ((match = regex.exec(xml)) !== null) {
    entries.push({
      offset: parseFloat(match[1]) * 1000,
      duration: parseFloat(match[2]) * 1000,
      text: decodeHtmlEntities(match[3]).trim(),
    });
  }

  if (entries.length === 0) {
    throw new Error('Could not parse caption XML tags');
  }

  return entries;
}

// Fallback 2: InnerTube WEB client
async function fetchTranscriptFromInnerTube(videoId: string): Promise<TranscriptEntry[]> {
  const body = {
    context: {
      client: {
        hl: 'en',
        gl: 'US',
        clientName: 'WEB',
        clientVersion: '2.20240501.01.00',
      },
    },
    videoId,
  };

  const response = await fetch('https://www.youtube.com/youtubei/v1/player?prettyPrint=false', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  const tracks =
    data.captions?.playerCaptionsTracklistRenderer?.captionTracks;

  if (!tracks || tracks.length === 0) {
    throw new Error('InnerTube returned no caption tracks');
  }

  const captionUrl = tracks[0].baseUrl;
  const capRes = await fetch(captionUrl);
  const xml = await capRes.text();

  const regex = /<text start="([^"]*)" dur="([^"]*)">([^<]*)<\/text>/g;
  const entries: TranscriptEntry[] = [];
  let match;

  while ((match = regex.exec(xml)) !== null) {
    entries.push({
      offset: parseFloat(match[1]) * 1000,
      duration: parseFloat(match[2]) * 1000,
      text: decodeHtmlEntities(match[3]).trim(),
    });
  }

  if (entries.length === 0) {
    throw new Error('InnerTube caption XML empty');
  }

  return entries;
}

export async function getTranscript(videoId: string): Promise<TranscriptEntry[]> {
  const errors: string[] = [];

  // Strategy 1: YoutubeTranscript library
  try {
    const transcriptItems = await YoutubeTranscript.fetchTranscript(videoId);
    if (transcriptItems && transcriptItems.length > 0) {
      return transcriptItems.map((item) => ({
        text: decodeHtmlEntities(item.text),
        offset: item.offset,
        duration: item.duration,
      }));
    }
  } catch (err: any) {
    errors.push(`Library: ${err.message || err}`);
  }

  // Strategy 2: Direct Watch Page Captions
  try {
    const items = await fetchTranscriptFromHtml(videoId);
    if (items && items.length > 0) {
      return items;
    }
  } catch (err: any) {
    errors.push(`HTML Scrape: ${err.message || err}`);
  }

  // Strategy 3: InnerTube Web Player API
  try {
    const items = await fetchTranscriptFromInnerTube(videoId);
    if (items && items.length > 0) {
      return items;
    }
  } catch (err: any) {
    errors.push(`InnerTube: ${err.message || err}`);
  }

  throw new Error(
    `Unable to retrieve transcript for this video. YouTube may have blocked captions from this region, or captions are disabled. (Details: ${errors.join(' | ')})`
  );
}

export function formatTranscriptForAI(transcript: TranscriptEntry[], maxChars = 60000): string {
  let formatted = '';
  // If transcript is very large (e.g. 3-4 hours), sample evenly so Gemini doesn't time out
  const step = transcript.length > 1500 ? Math.ceil(transcript.length / 1500) : 1;

  for (let i = 0; i < transcript.length; i += step) {
    const entry = transcript[i];
    const totalSeconds = Math.floor(entry.offset / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const timestamp = `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
    const line = `[${timestamp}] ${entry.text}\n`;

    if (formatted.length + line.length > maxChars) {
      formatted += `\n[... Transcript sampled to fit AI processing limits ...]`;
      break;
    }
    formatted += line;
  }

  return formatted;
}
