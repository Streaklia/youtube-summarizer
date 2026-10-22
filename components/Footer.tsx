'use client';

import React from 'react';
import Link from 'next/link';
import { Youtube, Shield, FileText, Info, BookOpen, Mail, Copyright, AlertCircle } from 'lucide-react';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-zinc-900 bg-black/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-zinc-900">

          {/* Brand Column */}
          <div className="space-y-3">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="p-1.5 rounded-lg bg-red-600/10 border border-red-500/20 group-hover:bg-red-600/20 transition-colors">
                <Youtube className="w-5 h-5 text-red-500" />
              </div>
              <span className="font-bold text-white text-base tracking-tight">
                My<span className="text-red-500">Transcript</span>
              </span>
            </Link>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Free AI-powered YouTube transcript extractor and video summarizer. Get instant
              key takeaways and chapter breakdowns from any video.
            </p>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
              Resources
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/app/" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <Youtube className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Web App</span>
                </Link>
              </li>
              <li>
                <Link href="/articles/" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Articles &amp; Guides</span>
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-zinc-500" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
              Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/privacy-policy" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Terms of Service</span>
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Disclaimer</span>
                </Link>
              </li>
              <li>
                <Link href="/copyright-policy" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <Copyright className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Copyright Policy</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-1.5 text-zinc-400">
            <span>Powered by <strong className="text-zinc-300 font-medium">Cody</strong></span>
          </div>
          <div className="flex items-center gap-4 text-zinc-500 text-[11px]">
            <span>© {year} MyTranscript</span>
            <span>·</span>
            <Link href="/privacy-policy" className="hover:text-zinc-400 transition-colors">Privacy</Link>
            <span>·</span>
            <Link href="/terms-of-service" className="hover:text-zinc-400 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
