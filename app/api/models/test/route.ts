import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  try {
    const { provider = 'gemini', model, apiKey, message } = await req.json();
    const promptMessage =
      message && typeof message === 'string' && message.trim().length > 0
        ? message.trim()
        : 'Hello! Please reply in one short sentence confirming you are working.';

    // =========================================================================
    // 1. Google Gemini Provider
    // =========================================================================
    if (provider === 'gemini') {
      const geminiKey = process.env.GEMINI_API_KEY;
      if (!geminiKey) {
        return NextResponse.json(
          {
            success: false,
            provider: 'gemini',
            error: 'GEMINI_API_KEY is missing on server. Check .env.local or production environment variables.',
            elapsedMs: Date.now() - startTime,
          },
          { status: 400 }
        );
      }

      const ai = new GoogleGenAI({ apiKey: geminiKey });
      const requestedModel = model || 'gemini-2.5-flash';

      try {
        const response = await ai.models.generateContent({
          model: requestedModel,
          contents: promptMessage,
        });

        const reply = response.text || 'OK (Gemini responded successfully)';
        const elapsedMs = Date.now() - startTime;

        return NextResponse.json({
          success: true,
          provider: 'gemini',
          model: requestedModel,
          reply: reply.trim(),
          elapsedMs,
        });
      } catch (geminiErr: any) {
        // Fallback to gemini-2.5-flash if a different model was requested and failed
        if (requestedModel !== 'gemini-2.5-flash') {
          try {
            const fallbackResp = await ai.models.generateContent({
              model: 'gemini-2.5-flash',
              contents: promptMessage,
            });
            const reply = fallbackResp.text || 'OK (Gemini responded via fallback)';
            const elapsedMs = Date.now() - startTime;
            return NextResponse.json({
              success: true,
              provider: 'gemini',
              model: 'gemini-2.5-flash (fallback)',
              reply: reply.trim(),
              elapsedMs,
            });
          } catch (fallbackErr: any) {
            return NextResponse.json(
              {
                success: false,
                provider: 'gemini',
                model: requestedModel,
                error: geminiErr.message || String(geminiErr),
                elapsedMs: Date.now() - startTime,
              },
              { status: 400 }
            );
          }
        }

        return NextResponse.json(
          {
            success: false,
            provider: 'gemini',
            model: requestedModel,
            error: geminiErr.message || String(geminiErr),
            elapsedMs: Date.now() - startTime,
          },
          { status: 400 }
        );
      }
    }

    // =========================================================================
    // 2. OpenRouter Provider
    // =========================================================================
    const key = apiKey || process.env.OPENROUTER_API_KEY;

    if (!key) {
      return NextResponse.json(
        {
          success: false,
          provider: 'openrouter',
          error: 'OpenRouter API key is required. Please paste your key in the OpenRouter API Key input.',
          elapsedMs: Date.now() - startTime,
        },
        { status: 400 }
      );
    }

    const openrouterModel = model || 'openrouter/free';

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://www.mytranscript.pro',
        'X-Title': 'MyTranscript API Playground',
      },
      body: JSON.stringify({
        model: openrouterModel,
        messages: [{ role: 'user', content: promptMessage }],
        max_tokens: 150,
      }),
    });

    const elapsedMs = Date.now() - startTime;

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const errorMsg =
        errData?.error?.message ||
        `OpenRouter responded with HTTP ${response.status}: ${response.statusText}`;

      return NextResponse.json(
        {
          success: false,
          provider: 'openrouter',
          model: openrouterModel,
          error: errorMsg,
          elapsedMs,
        },
        { status: 400 }
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'OK (OpenRouter responded)';

    return NextResponse.json({
      success: true,
      provider: 'openrouter',
      model: openrouterModel,
      reply: reply.trim(),
      elapsedMs,
    });
  } catch (error: any) {
    const elapsedMs = Date.now() - startTime;
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Internal error while testing AI model',
        elapsedMs,
      },
      { status: 500 }
    );
  }
}
