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
    const response = await fetch(oembedUrl, {
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) {
      throw new Error('Video not found or private');
    }
    const data = await response.json();

    let duration = '';
    try {
      const pageRes = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
          'Accept-Language': 'en-US,en;q=0.9',
          'Cookie': 'CONSENT=YES+1; SOCS=CAESEwgDEgk2MTQyODU3NDUaAmVuIAEaBgiA_LuuBg; GPS=1',
        },
        signal: AbortSignal.timeout(4000),
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

export function decodeHtmlEntities(str: string): string {
  if (!str) return '';
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => {
      try {
        return String.fromCodePoint(parseInt(hex, 16));
      } catch {
        return '';
      }
    })
    .replace(/&#(\d+);/g, (_, dec) => {
      try {
        return String.fromCodePoint(parseInt(dec, 10));
      } catch {
        return '';
      }
    });
}

/**
 * Universal caption parser supporting:
 * 1. JSON3 format ({ events: [ { tStartMs, dDurationMs, segs: [{utf8}] } ] })
 * 2. Modern YouTube srv3 format (<p t="ms" d="ms"><s>word</s></p>)
 * 3. Classic YouTube XML format (<text start="s" dur="s">content</text>)
 * 4. WebVTT format (WEBVTT \n 00:00.000 --> 00:02.000)
 */
export function parseTranscriptContent(rawText: string): TranscriptEntry[] {
  if (!rawText || rawText.trim().length === 0) return [];

  const trimmed = rawText.trim();

  // 1. JSON3 parser
  if (trimmed.startsWith('{') || trimmed.includes('"events":')) {
    try {
      const json = JSON.parse(trimmed);
      if (Array.isArray(json.events)) {
        const list: TranscriptEntry[] = [];
        for (const ev of json.events) {
          if (ev.segs && Array.isArray(ev.segs)) {
            const segText = ev.segs.map((s: any) => s.utf8 || '').join('');
            const cleanText = decodeHtmlEntities(segText).trim();
            if (cleanText && cleanText !== '\n') {
              list.push({
                offset: typeof ev.tStartMs === 'number' ? ev.tStartMs : parseInt(ev.tStartMs || '0', 10),
                duration: typeof ev.dDurationMs === 'number' ? ev.dDurationMs : parseInt(ev.dDurationMs || '0', 10),
                text: cleanText,
              });
            }
          }
        }
        if (list.length > 0) return list;
      }
    } catch {
      // Fall through to XML parsing
    }
  }

  // 2. Modern srv3 format (<p t="1360" d="1680">...</p>)
  const srv3Regex = /<p\s+t="(\d+)"\s+d="(\d+)"[^>]*>([\s\S]*?)<\/p>/g;
  const srv3Entries: TranscriptEntry[] = [];
  let match: RegExpExecArray | null;

  while ((match = srv3Regex.exec(rawText)) !== null) {
    const startMs = parseInt(match[1], 10);
    const durMs = parseInt(match[2], 10);
    const text = decodeHtmlEntities(match[3].replace(/<[^>]+>/g, '')).trim();
    if (text) {
      srv3Entries.push({
        offset: startMs,
        duration: durMs,
        text,
      });
    }
  }
  if (srv3Entries.length > 0) return srv3Entries;

  // 3. Classic YouTube XML format (<text start="1.36" dur="1.68">...</text>)
  const classicRegex = /<text\s+start="([^"]*)"\s+dur="([^"]*)"[^>]*>([\s\S]*?)<\/text>/g;
  const classicEntries: TranscriptEntry[] = [];

  while ((match = classicRegex.exec(rawText)) !== null) {
    const offset = Math.round(parseFloat(match[1]) * 1000);
    const duration = Math.round(parseFloat(match[2]) * 1000);
    const text = decodeHtmlEntities(match[3].replace(/<[^>]+>/g, '')).trim();
    if (text) {
      classicEntries.push({
        offset,
        duration,
        text,
      });
    }
  }
  if (classicEntries.length > 0) return classicEntries;

  // 4. WebVTT format fallback
  if (rawText.includes('WEBVTT') || rawText.includes('-->')) {
    const vttEntries: TranscriptEntry[] = [];
    const lines = rawText.split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      const timeMatch = line.match(
        /(?:(\d{2}):)?(\d{2}):(\d{2})[.,](\d{3})\s*-->\s*(?:(\d{2}):)?(\d{2}):(\d{2})[.,](\d{3})/
      );
      if (timeMatch) {
        const parseMs = (h: string | undefined, m: string, s: string, ms: string) => {
          const hours = h ? parseInt(h, 10) : 0;
          return (hours * 3600 + parseInt(m, 10) * 60 + parseInt(s, 10)) * 1000 + parseInt(ms, 10);
        };
        const start = parseMs(timeMatch[1], timeMatch[2], timeMatch[3], timeMatch[4]);
        const end = parseMs(timeMatch[5], timeMatch[6], timeMatch[7], timeMatch[8]);
        let cueText = '';
        while (i + 1 < lines.length && lines[i + 1].trim() && !lines[i + 1].includes('-->')) {
          i++;
          cueText += (cueText ? ' ' : '') + lines[i].trim().replace(/<[^>]+>/g, '');
        }
        cueText = decodeHtmlEntities(cueText).trim();
        if (cueText) {
          vttEntries.push({
            offset: start,
            duration: Math.max(0, end - start),
            text: cueText,
          });
        }
      }
    }
    if (vttEntries.length > 0) return vttEntries;
  }

  return [];
}

/**
 * Strategy 1: InnerTube ANDROID Client (Proven high reliability on serverless/datacenter IPs)
 * The Android client bypasses YouTube datacenter bot-blocking and returns signed timedtext tracks.
 */
async function fetchFromInnerTubeAndroid(videoId: string): Promise<TranscriptEntry[]> {
  const INNERTUBE_CLIENT_VERSION = '20.10.38';
  const body = {
    context: {
      client: {
        clientName: 'ANDROID',
        clientVersion: INNERTUBE_CLIENT_VERSION,
        androidSdkVersion: 34,
        hl: 'en',
        gl: 'US',
      },
    },
    videoId,
  };

  const response = await fetch('https://www.youtube.com/youtubei/v1/player?prettyPrint=false', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': `com.google.android.youtube/${INNERTUBE_CLIENT_VERSION} (Linux; U; Android 14)`,
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(6000),
  });

  if (!response.ok) {
    throw new Error(`InnerTube Android HTTP ${response.status}`);
  }

  const data = await response.json();
  const captionTracks = data?.captions?.playerCaptionsTracklistRenderer?.captionTracks;

  if (!Array.isArray(captionTracks) || captionTracks.length === 0) {
    throw new Error('No caption tracks returned by InnerTube Android');
  }

  // Prefer English or default to first available track
  const track =
    captionTracks.find((t: any) => t.languageCode === 'en' || t.vssId?.includes('.en')) ||
    captionTracks[0];

  if (!track?.baseUrl) {
    throw new Error('Track has no baseUrl');
  }

  const capRes = await fetch(track.baseUrl, {
    headers: {
      'User-Agent': `com.google.android.youtube/${INNERTUBE_CLIENT_VERSION} (Linux; U; Android 14)`,
    },
    signal: AbortSignal.timeout(6000),
  });

  if (!capRes.ok) {
    throw new Error(`Caption baseUrl HTTP ${capRes.status}`);
  }

  const rawXml = await capRes.text();
  const entries = parseTranscriptContent(rawXml);

  if (entries.length === 0) {
    throw new Error('Parsed 0 entries from Android track content');
  }

  return entries;
}

/**
 * Strategy 2: Official youtube-transcript NPM package
 */
async function fetchFromYoutubeTranscriptLib(videoId: string): Promise<TranscriptEntry[]> {
  const transcriptItems = await YoutubeTranscript.fetchTranscript(videoId);
  if (!transcriptItems || transcriptItems.length === 0) {
    throw new Error('Library returned empty transcript array');
  }

  return transcriptItems.map((item) => ({
    text: decodeHtmlEntities(item.text),
    offset: item.offset,
    duration: item.duration,
  }));
}

/**
 * Strategy 3: InnerTube TV/Embedded Client
 */
async function fetchFromInnerTubeTV(videoId: string): Promise<TranscriptEntry[]> {
  const body = {
    context: {
      client: {
        clientName: 'TVHTML5_SIMPLY_EMBEDDED_PLAYER',
        clientVersion: '2.0',
        hl: 'en',
        gl: 'US',
      },
      thirdParty: {
        embedUrl: 'https://www.youtube.com',
      },
    },
    videoId,
  };

  const response = await fetch('https://www.youtube.com/youtubei/v1/player?prettyPrint=false', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent':
        'Mozilla/5.0 (SMART-TV; LINUX; Tizen 6.0) AppleWebKit/537.36 (KHTML, like Gecko) Version/6.0 TV Safari/537.36',
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(6000),
  });

  if (!response.ok) {
    throw new Error(`InnerTube TV HTTP ${response.status}`);
  }

  const data = await response.json();
  const tracks = data?.captions?.playerCaptionsTracklistRenderer?.captionTracks;

  if (!Array.isArray(tracks) || tracks.length === 0) {
    throw new Error('InnerTube TV returned no caption tracks');
  }

  const track = tracks.find((t: any) => t.languageCode === 'en') || tracks[0];
  const capRes = await fetch(track.baseUrl, {
    signal: AbortSignal.timeout(6000),
  });

  if (!capRes.ok) {
    throw new Error(`InnerTube TV caption URL HTTP ${capRes.status}`);
  }

  const text = await capRes.text();
  const entries = parseTranscriptContent(text);
  if (entries.length === 0) {
    throw new Error('InnerTube TV parsed 0 entries');
  }

  return entries;
}

/**
 * Strategy 4: Watch Page HTML Scraping with Consent Cookies & Desktop UA
 */
async function fetchTranscriptFromHtml(videoId: string): Promise<TranscriptEntry[]> {
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const response = await fetch(watchUrl, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
      'Cookie': 'CONSENT=YES+1; SOCS=CAESEwgDEgk2MTQyODU3NDUaAmVuIAEaBgiA_LuuBg; GPS=1',
    },
    signal: AbortSignal.timeout(6000),
  });

  const html = await response.text();
  const splitted = html.split('"captionTracks":');
  if (splitted.length < 2) {
    throw new Error('No captionTracks found in video page HTML');
  }

  const rawJson = splitted[1].split(']')[0] + ']';
  const captionTracks = JSON.parse(rawJson);
  if (!Array.isArray(captionTracks) || captionTracks.length === 0) {
    throw new Error('Empty captionTracks in HTML');
  }

  const track = captionTracks.find((t: any) => t.languageCode === 'en') || captionTracks[0];
  if (!track?.baseUrl) {
    throw new Error('No baseUrl on caption track');
  }

  const transcriptRes = await fetch(track.baseUrl, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
    },
    signal: AbortSignal.timeout(6000),
  });

  const rawContent = await transcriptRes.text();
  const entries = parseTranscriptContent(rawContent);

  if (entries.length === 0) {
    throw new Error('Could not parse caption XML/JSON tags from HTML track');
  }

  return entries;
}

/**
 * Strategy 5: Direct YouTube TimedText API endpoints
 */
async function fetchFromTimedTextDirect(videoId: string): Promise<TranscriptEntry[]> {
  const candidates = [
    `https://www.youtube.com/api/timedtext?v=${videoId}&lang=en&fmt=json3`,
    `https://www.youtube.com/api/timedtext?v=${videoId}&lang=en&kind=asr&fmt=json3`,
    `https://www.youtube.com/api/timedtext?v=${videoId}&lang=en`,
    `https://www.youtube.com/api/timedtext?v=${videoId}&lang=en&kind=asr`,
  ];

  for (const url of candidates) {
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
        },
        signal: AbortSignal.timeout(3500),
      });

      if (res.ok) {
        const text = await res.text();
        if (text && text.length > 50) {
          const parsed = parseTranscriptContent(text);
          if (parsed.length > 0) {
            return parsed;
          }
        }
      }
    } catch {
      // Continue to next candidate
    }
  }

  throw new Error('TimedText direct endpoints returned no valid caption entries');
}

/**
 * Strategy 6: Public Mirror (Invidious) API fallback
 */
async function fetchFromPublicMirror(videoId: string): Promise<TranscriptEntry[]> {
  const mirrorBases = [
    'https://inv.nadeko.net',
    'https://invidious.nerdvpn.de',
    'https://vid.puffyan.us',
  ];

  for (const base of mirrorBases) {
    try {
      const listRes = await fetch(`${base}/api/v1/captions/${videoId}`, {
        signal: AbortSignal.timeout(4000),
      });

      if (!listRes.ok) continue;

      const data = await listRes.json();
      if (!Array.isArray(data.captions) || data.captions.length === 0) continue;

      const track =
        data.captions.find((c: any) => c.languageCode === 'en') || data.captions[0];

      const fullUrl = track.url.startsWith('http') ? track.url : `${base}${track.url}`;
      const capRes = await fetch(fullUrl, { signal: AbortSignal.timeout(4000) });

      if (!capRes.ok) continue;

      const capText = await capRes.text();
      if (capText && capText.length > 50) {
        const parsed = parseTranscriptContent(capText);
        if (parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Try next mirror
    }
  }

  throw new Error('All public mirrors failed or returned empty captions');
}

/**
 * Resilient multi-tier transcript fetcher with fallback chain:
 * 1. InnerTube Android API (Latest 20.10.38 - highest serverless success rate)
 * 2. YoutubeTranscript library
 * 3. InnerTube TV Embedded Client
 * 4. Watch Page Scraping (with consent cookies)
 * 5. Direct TimedText API
 * 6. Public Invidious mirror
 */
export async function getTranscript(videoId: string): Promise<TranscriptEntry[]> {
  const errors: string[] = [];

  // Strategy 1: InnerTube Android API
  try {
    const items = await fetchFromInnerTubeAndroid(videoId);
    if (items && items.length > 0) return items;
  } catch (err: any) {
    errors.push(`InnerTube Android: ${err.message || err}`);
  }

  // Strategy 2: YoutubeTranscript library
  try {
    const items = await fetchFromYoutubeTranscriptLib(videoId);
    if (items && items.length > 0) return items;
  } catch (err: any) {
    errors.push(`Library: ${err.message || err}`);
  }

  // Strategy 3: InnerTube TV Client
  try {
    const items = await fetchFromInnerTubeTV(videoId);
    if (items && items.length > 0) return items;
  } catch (err: any) {
    errors.push(`InnerTube TV: ${err.message || err}`);
  }

  // Strategy 4: Direct Watch Page Captions
  try {
    const items = await fetchTranscriptFromHtml(videoId);
    if (items && items.length > 0) return items;
  } catch (err: any) {
    errors.push(`HTML Scrape: ${err.message || err}`);
  }

  // Strategy 5: Direct TimedText API
  try {
    const items = await fetchFromTimedTextDirect(videoId);
    if (items && items.length > 0) return items;
  } catch (err: any) {
    errors.push(`TimedText Direct: ${err.message || err}`);
  }

  // Strategy 6: Public Mirror
  try {
    const items = await fetchFromPublicMirror(videoId);
    if (items && items.length > 0) return items;
  } catch (err: any) {
    errors.push(`Public Mirror: ${err.message || err}`);
  }

  throw new Error(
    `Unable to retrieve transcript for this video. YouTube may have blocked captions from this server IP, or captions are disabled. (Details: ${errors.join(' | ')})`
  );
}

export function formatTranscriptForAI(transcript: TranscriptEntry[], maxChars = 60000): string {
  if (!transcript || transcript.length === 0) return '';

  let formatted = '';
  // If transcript is very large (e.g. 3-4 hours), sample evenly so AI models don't time out
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
