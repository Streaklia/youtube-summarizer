import { NextRequest, NextResponse } from 'next/server';
import { regenerateSectionWithFallback } from '@/lib/aiFallback';

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const {
      section,
      transcript,
      provider,
      openrouterApiKey,
      openrouterModel,
      videoUrl,
      title,
    } = await req.json();

    const validSections = ['takeaways', 'chapters', 'summary', 'infographic'];
    if (!section || !validSections.includes(section)) {
      return NextResponse.json(
        { error: `Invalid section. Must be one of: ${validSections.join(', ')}` },
        { status: 400 }
      );
    }

    if (!transcript && !videoUrl) {
      return NextResponse.json(
        { error: 'Transcript or Video URL is required' },
        { status: 400 }
      );
    }

    const partial = await regenerateSectionWithFallback(
      section,
      transcript || '',
      videoUrl,
      title,
      {
        preferredProvider: provider,
        openrouterApiKey,
        openrouterModel,
      }
    );

    return NextResponse.json(partial);
  } catch (error: any) {
    console.error('Regeneration fallback chain error:', error);
    return NextResponse.json(
      { error: error.message || `Failed to regenerate section '${req.nextUrl.searchParams.get('section') || 'requested'}'` },
      { status: 500 }
    );
  }
}
