import type { Metadata } from 'next';
import { HomeClient } from '@/components/HomeClient';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.mytranscript.pro/',
    languages: {
      en: 'https://www.mytranscript.pro/',
      ar: 'https://www.mytranscript.pro/ar',
      'x-default': 'https://www.mytranscript.pro/',
    },
  },
};

export default function Home() {
  return <HomeClient />;
}
