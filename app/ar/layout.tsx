import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import { ArabicHtmlSync } from '@/components/ArabicHtmlSync';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-cairo',
});

export const metadata: Metadata = {
  openGraph: {
    locale: 'ar_AR',
  },
};

export default function ArabicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      dir="rtl"
      lang="ar"
      className={`${cairo.className} ${cairo.variable} min-h-screen bg-[#040200] text-gray-100 antialiased selection:bg-[#E02440]/35 selection:text-white`}
    >
      <ArabicHtmlSync />
      {children}
    </div>
  );
}
