'use client';

import { useEffect } from 'react';
import { persistLanguage } from '@/lib/localizedUrl';

export function ArabicHtmlSync() {
  useEffect(() => {
    const html = document.documentElement;
    const prevLang = html.lang;
    const prevDir = html.dir;

    html.lang = 'ar';
    html.dir = 'rtl';
    persistLanguage('ar');

    return () => {
      html.lang = prevLang || 'en';
      html.dir = prevDir || 'ltr';
    };
  }, []);

  return null;
}
