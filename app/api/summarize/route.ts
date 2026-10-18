import { NextRequest, NextResponse } from 'next/server';
import { generateSummary } from '@/lib/gemini';
import { generateSummaryOpenRouter } from '@/lib/openrouter';

export async function POST(req: NextRequest) {
  try {
    const { transcript, provider, openrouterApiKey, openrouterModel } =
      await req.json();

    if (!transcript) {
      return NextResponse.json(
        { error: 'Transcript is required' },
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
        transcript,
        openrouterApiKey,
        openrouterModel
      );
      return NextResponse.json(summary);
    }

    // Default: Gemini
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not configured. Please add it to .env.local' },
        { status: 500 }
      );
    }

    const summary = await generateSummary(transcript);
    return NextResponse.json(summary);
  } catch (error: any) {
    console.error('Summarization error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate summary' },
      { status: 500 }
    );
  }
}
