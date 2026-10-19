import { NextRequest, NextResponse } from 'next/server';
import { chatWithTranscriptWithFallback } from '@/lib/aiFallback';

export const maxDuration = 60; // Allow up to 60s for Vercel functions

export async function POST(req: NextRequest) {
  try {
    const {
      transcript,
      messages,
      provider,
      openrouterApiKey,
      openrouterModel,
      videoUrl,
    } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages are required and must be an array' },
        { status: 400 }
      );
    }

    const response = await chatWithTranscriptWithFallback(
      transcript || '',
      messages,
      videoUrl,
      {
        preferredProvider: provider,
        openrouterApiKey,
        openrouterModel,
      }
    );

    return NextResponse.json({ response });
  } catch (error: any) {
    console.error('Chat fallback chain error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate chat response across all fallback models' },
      { status: 500 }
    );
  }
}
