import { NextRequest, NextResponse } from 'next/server';
import { regenerateSectionWithFallback } from '@/lib/aiFallback';

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
      section,
    } = await req.json();

    if (!transcript && !videoUrl) {
      return NextResponse.json(
        { error: 'Transcript or Video URL is required' },
        { status: 400 }
      );
    }

    // Default to 'takeaways' only — never generate all 4 tabs simultaneously
    const sectionToGen = section || 'takeaways';

    const partial = await regenerateSectionWithFallback(
      sectionToGen,
      transcript || '',
      videoUrl,
      title,
      {
        preferredProvider: provider,
        openrouterApiKey,
        openrouterModel,
      }
    );

    return NextResponse.json({
      keyTakeaways: [],
      chapterSummaries: [],
      fullSummary: '',
      infographic: null,
      ...partial,
    });
  } catch (error: any) {
    console.error('Summarization fallback chain error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate summary across all fallback models' },
      { status: 500 }
    );
  }
}
