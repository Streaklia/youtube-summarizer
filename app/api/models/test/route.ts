import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  try {
    const { model, apiKey } = await req.json();
    const key = apiKey || process.env.OPENROUTER_API_KEY;

    if (!model) {
      return NextResponse.json({ error: 'Model ID is required' }, { status: 400 });
    }

    if (!key) {
      return NextResponse.json(
        { error: 'OpenRouter API key is required (set in .env or settings)' },
        { status: 400 }
      );
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://www.mytranscript.pro',
        'X-Title': 'YouTube Summarizer Test',
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: 'Reply with "OK" in 1 word.' }],
        max_tokens: 5,
      }),
    });

    const elapsedMs = Date.now() - startTime;

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          success: false,
          error: err.error?.message || `HTTP ${response.status}`,
          elapsedMs,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'OK';

    return NextResponse.json({
      success: true,
      model,
      reply: reply.trim(),
      elapsedMs,
    });
  } catch (error: any) {
    const elapsedMs = Date.now() - startTime;
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Test failed',
        elapsedMs,
      },
      { status: 500 }
    );
  }
}
