import { NextRequest, NextResponse } from 'next/server';
import { generateSummaryWithFallback } from '@/lib/aiFallback';

export const maxDuration = 60; // Allow up to 60s for Vercel functions

export async function POST(req: NextRequest) {
  try {
    const {
      transcript,
      provider,
      openrouterApiKey,
      openrouterModel,
      videoUrl,
      title,
    } = await req.json();

    if (!transcript && !videoUrl) {
      return NextResponse.json(
        { error: 'Transcript or Video URL is required' },
        { status: 400 }
      );
    }

    const summary = await generateSummaryWithFallback(
      transcript || '',
      videoUrl,
      title,
      {
        preferredProvider: provider,
        openrouterApiKey,
        openrouterModel,
      }
    );

    return NextResponse.json(summary);
  } catch (error: any) {
    console.error('Summarization fallback chain error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate summary across all fallback models' },
      { status: 500 }
    );
  }
}
