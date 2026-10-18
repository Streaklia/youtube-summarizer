import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { apiKey } = await req.json();

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is required' },
        { status: 400 }
      );
    }

    const response = await fetch('https://openrouter.ai/api/v1/models', {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch models. Check your API key.' },
        { status: response.status }
      );
    }

    const data = await response.json();

    const models = (data.data || [])
      .map((m: any) => ({
        id: m.id,
        name: m.name || m.id,
        isFree:
          parseFloat(m.pricing?.prompt || '1') === 0 &&
          parseFloat(m.pricing?.completion || '1') === 0,
        contextLength: m.context_length || 0,
      }))
      .sort((a: any, b: any) => {
        // Free models first, then alphabetically
        if (a.isFree && !b.isFree) return -1;
        if (!a.isFree && b.isFree) return 1;
        return a.name.localeCompare(b.name);
      });

    return NextResponse.json({ models });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch models' },
      { status: 500 }
    );
  }
}
