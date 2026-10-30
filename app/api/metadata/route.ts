import { NextRequest, NextResponse } from 'next/server';
import { extractVideoId, getVideoMetadata } from '@/lib/youtube';

export const maxDuration = 15;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const rawInput = searchParams.get('videoId') || searchParams.get('url');

    if (!rawInput) {
      return NextResponse.json({ error: 'Video ID or URL is required' }, { status: 400 });
    }

    const videoId = extractVideoId(rawInput);
    if (!videoId) {
      return NextResponse.json({ error: 'Invalid YouTube video ID or URL' }, { status: 400 });
    }

    const metadata = await getVideoMetadata(videoId);
    return NextResponse.json(
      { metadata },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to fetch metadata' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rawInput = body.videoId || body.url;

    if (!rawInput) {
      return NextResponse.json({ error: 'Video ID or URL is required' }, { status: 400 });
    }

    const videoId = extractVideoId(rawInput);
    if (!videoId) {
      return NextResponse.json({ error: 'Invalid YouTube video ID or URL' }, { status: 400 });
    }

    const metadata = await getVideoMetadata(videoId);
    return NextResponse.json({ metadata });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to fetch metadata' }, { status: 500 });
  }
}
