import { NextRequest, NextResponse } from 'next/server';
import { generateSummary } from '@/lib/gemini';
import { generateSummaryOpenRouter } from '@/lib/openrouter';

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

    if (provider === 'openrouter') {
      if (!openrouterApiKey || !openrouterModel) {
        return NextResponse.json(
          { error: 'OpenRouter API key and model are required' },
          { status: 400 }
        );
      }
      const summary = await generateSummaryOpenRouter(
        transcript || '',
        openrouterApiKey,
        openrouterModel,
        videoUrl,
        title
      );
      return NextResponse.json(summary);
    }

    // Default: Gemini
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not configured. Please add it in project settings.' },
        { status: 500 }
      );
    }

    const summary = await generateSummary(transcript || '', videoUrl, title);
    return NextResponse.json(summary);
  } catch (error: any) {
    console.error('Summarization error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate summary' },
      { status: 500 }
    );
  }
}
