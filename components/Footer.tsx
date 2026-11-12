'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Shield, FileText, Info, BookOpen, Mail, Copyright, AlertCircle, Layout } from 'lucide-react';

export function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname() || '/';
  const isArabic = pathname === '/ar' || pathname.startsWith('/ar/');

  return (
    <footer dir={isArabic ? 'rtl' : 'ltr'} className="mt-20 border-t border-zinc-900 bg-black/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-zinc-900">

          {/* Brand Column with Logo */}
          <div className="space-y-3">
            <Link href={isArabic ? '/ar' : '/'} className="inline-flex items-center gap-2.5 group">
              <div className="relative w-7 h-7 flex-shrink-0 transition-transform group-hover:scale-105 duration-200">
                <Image
                  src="/logo.png"
                  alt="mytranscript.pro logo"
                  width={28}
                  height={28}
                  className="w-full h-full object-contain"
                />
              </div>
              <span dir="ltr" className="font-bold text-white text-base tracking-tight">
                My<span className="text-red-500">Transcript</span><span className="text-zinc-400 font-normal">.pro</span>
              </span>
            </Link>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {isArabic
                ? 'أداة ذكاء اصطناعي مجانية لتفريغ فيديوهات يوتيوب إلى نص، تحميل ملفات الترجمة SRT، واستخراج الملخصات وأهم الأفكار فوراً بدون تسجيل.'
                : 'Free AI-powered YouTube transcript extractor and video summarizer. Get instant key takeaways, transcripts, and chapter breakdowns from any video.'}
            </p>
          </div>

          {/* Tools & Core Variations */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
              {isArabic ? 'الأدوات والمميزات' : 'Tools & Features'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href={isArabic ? '/ar/youtube-transcript' : '/youtube-transcript'} className="text-zinc-400 hover:text-white transition-colors">
                  {isArabic ? 'تفريغ فيديو يوتيوب' : 'YouTube Transcript'}
                </Link>
              </li>
              <li>
                <Link href={isArabic ? '/ar/youtube-summary' : '/youtube-summary'} className="text-zinc-400 hover:text-white transition-colors">
                  {isArabic ? 'تلخيص فيديوهات يوتيوب' : 'YouTube Summary'}
                </Link>
              </li>
              <li>
                <Link href={isArabic ? '/ar/youtube-to-srt' : '/youtube-to-text'} className="text-zinc-400 hover:text-white transition-colors">
                  {isArabic ? 'تحميل ترجمة يوتيوب SRT' : 'YouTube to Text'}
                </Link>
              </li>
              <li>
                <Link href={isArabic ? '/ar/podcast-transcript' : '/podcast-transcript'} className="text-zinc-400 hover:text-white transition-colors">
                  {isArabic ? 'تفريغ حلقات البودكاست' : 'Podcast Transcripts'}
                </Link>
              </li>
              <li>
                <Link href={isArabic ? '/ar/youtube-transcript-chatbot' : '/download-youtube-transcript'} className="text-zinc-400 hover:text-white transition-colors">
                  {isArabic ? 'الدردشة مع الفيديو' : 'Download Transcripts'}
                </Link>
              </li>
              <li>
                <Link href="/youtube-subtitle-downloader" className="text-zinc-400 hover:text-white transition-colors">
                  {isArabic ? 'أداة استخراج الترجمات' : 'Subtitle Downloader'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
              {isArabic ? 'المصادر والشركة' : 'Resources & Company'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href={isArabic ? '/ar' : '/'} className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <Layout className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{isArabic ? 'تطبيق الويب' : 'Web App'}</span>
                </Link>
              </li>
              <li>
                <Link href={isArabic ? '/ar/articles' : '/articles'} className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{isArabic ? 'المقالات والأدلة' : 'Articles Index'}</span>
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{isArabic ? 'من نحن' : 'About Us'}</span>
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{isArabic ? 'اتصل بنا' : 'Contact Us'}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Canonical Legal Pages */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
              {isArabic ? 'السياسات والشروط' : 'Legal & Policies'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/privacy-policy" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{isArabic ? 'سياسة الخصوصية' : 'Privacy Policy'}</span>
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{isArabic ? 'شروط الاستخدام' : 'Terms of Service'}</span>
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{isArabic ? 'إخلاء المسؤولية' : 'Disclaimer'}</span>
                </Link>
              </li>
              <li>
                <Link href="/copyright-policy" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <Copyright className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{isArabic ? 'حقوق الملكية الفكرية' : 'Copyright Policy'}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-1.5 text-zinc-400">
            <span>{isArabic ? 'مدعوم بواسطة' : 'Powered by'} <strong className="text-zinc-300 font-medium">Cody</strong></span>
          </div>
          <div className="flex items-center gap-4 text-zinc-500 text-[11px]">
            <span>© {year} MyTranscript</span>
            <span>·</span>
            <Link href="/privacy-policy" className="hover:text-zinc-400 transition-colors">{isArabic ? 'الخصوصية' : 'Privacy Policy'}</Link>
            <span>·</span>
            <Link href="/terms-of-service" className="hover:text-zinc-400 transition-colors">{isArabic ? 'الشروط' : 'Terms of Service'}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
