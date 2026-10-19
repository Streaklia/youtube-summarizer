import { NextRequest, NextResponse } from 'next/server';
import {
  DEFAULT_SITE_SEO_SETTINGS,
  DEFAULT_MONETIZATION_SETTINGS,
  DEFAULT_PAGES_AND_POSTS,
  DEFAULT_LANGUAGES,
  DEFAULT_KEYWORD_TOOLS,
  DEFAULT_TELEMETRY,
} from '@/lib/adminStore';

// In-memory cache for server runtime
let store = {
  seo: { ...DEFAULT_SITE_SEO_SETTINGS },
  monetization: { ...DEFAULT_MONETIZATION_SETTINGS },
  pages: [...DEFAULT_PAGES_AND_POSTS],
  languages: [...DEFAULT_LANGUAGES],
  tools: [...DEFAULT_KEYWORD_TOOLS],
  telemetry: { ...DEFAULT_TELEMETRY },
};

export async function GET(req: NextRequest) {
  const session = req.cookies.get('admin_session')?.value;
  if (session !== 'authenticated_user99_session') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json(store);
}

export async function POST(req: NextRequest) {
  const session = req.cookies.get('admin_session')?.value;
  if (session !== 'authenticated_user99_session') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { action, payload } = body;

    if (action === 'sync_defaults') {
      store = {
        seo: { ...DEFAULT_SITE_SEO_SETTINGS },
        monetization: { ...DEFAULT_MONETIZATION_SETTINGS },
        pages: [...DEFAULT_PAGES_AND_POSTS],
        languages: [...DEFAULT_LANGUAGES],
        tools: [...DEFAULT_KEYWORD_TOOLS],
        telemetry: { ...DEFAULT_TELEMETRY },
      };
      return NextResponse.json({ success: true, store, message: 'Defaults synchronized successfully' });
    }

    if (action === 'save_seo' && payload) {
      store.seo = { ...store.seo, ...payload };
    } else if (action === 'save_monetization' && payload) {
      store.monetization = { ...store.monetization, ...payload };
    } else if (action === 'save_pages' && payload) {
      store.pages = payload;
    } else if (action === 'save_languages' && payload) {
      store.languages = payload;
    } else if (action === 'save_tools' && payload) {
      store.tools = payload;
    }

    return NextResponse.json({ success: true, store, message: 'Settings saved successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to update settings' }, { status: 500 });
  }
}
