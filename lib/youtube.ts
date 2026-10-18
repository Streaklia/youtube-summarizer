import { VideoMetadata, TranscriptEntry } from './types';
import { YoutubeTranscript } from 'youtube-transcript';

export function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  // Handle case where user just pastes a video ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(url.trim())) {
    return url.trim();
  }

  return null;
}

export async function getVideoMetadata(videoId: string): Promise<VideoMetadata> {
  const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
  const response = await fetch(oembedUrl);

  if (!response.ok) {
    throw new Error(
      'Failed to fetch video metadata. The video may be private or does not exist.'
    );
  }

  const data = await response.json();

  // Try to extract duration from the YouTube page
  let duration = '';
  try {
    const pageRes = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
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
    // Duration extraction is best-effort
  }

  return {
    title: data.title,
    thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    channelName: data.author_name,
    duration,
    videoId,
  };
}

export async function getTranscript(videoId: string): Promise<TranscriptEntry[]> {
  try {
    const transcriptItems = await YoutubeTranscript.fetchTranscript(videoId);
    return transcriptItems.map((item) => ({
      text: item.text,
      offset: item.offset,
      duration: item.duration,
    }));
  } catch (error: any) {
    throw new Error(
      'Could not retrieve transcript. The video may have captions disabled, be private, or not exist.'
    );
  }
}

export function formatTranscriptForAI(transcript: TranscriptEntry[]): string {
  return transcript
    .map((entry) => {
      const totalSeconds = Math.floor(entry.offset / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      const timestamp = `${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`;
      return `[${timestamp}] ${entry.text}`;
    })
    .join('\n');
}
