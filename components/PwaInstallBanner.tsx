'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { X, Download, Share, PlusSquare, Sparkles, Check } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export function PwaInstallBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasNativePrompt, setHasNativePrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const deferredPromptRef = useRef<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    setIsMounted(true);

    if (typeof window === 'undefined') return;

    // Check if user already dismissed or installed the PWA banner
    const isDismissed = localStorage.getItem('mytranscript_pwa_dismissed') === 'true';
    const isInstalled = localStorage.getItem('mytranscript_pwa_installed') === 'true';

    // Check if running in standalone mode (already installed & opened from home screen)
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;

    if (isDismissed || isInstalled || isStandalone) {
      return;
    }

    // Detect iOS (iPhone / iPad / iPod)
    const ua = window.navigator.userAgent.toLowerCase();
    const isAppleDevice =
      /iphone|ipad|ipod/.test(ua) ||
      (window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1);
    setIsIOS(isAppleDevice);

    // Detect mobile / small screen
    const isMobileDevice =
      window.innerWidth < 840 ||
      /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua);

    // Only prompt mobile users
    if (!isMobileDevice) {
      return;
    }

    // 1. Capture native beforeinstallprompt for Android / Chromium browsers
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      deferredPromptRef.current = e as BeforeInstallPromptEvent;
      setHasNativePrompt(true);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // 2. Capture appinstalled event
    const handleAppInstalled = () => {
      localStorage.setItem('mytranscript_pwa_installed', 'true');
      setIsVisible(false);
      setShowIosGuide(false);
      deferredPromptRef.current = null;
    };
    window.addEventListener('appinstalled', handleAppInstalled);

    // Wait exactly 5 seconds before smoothly sliding in the banner
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setShowIosGuide(false);
    try {
      localStorage.setItem('mytranscript_pwa_dismissed', 'true');
    } catch {}
  };

  const handleInstallClick = async () => {
    // If native prompt is available (Android, Chrome, Edge), trigger it
    if (deferredPromptRef.current) {
      try {
        const promptEvent = deferredPromptRef.current;
        await promptEvent.prompt();
        const choice = await promptEvent.userChoice;
        if (choice.outcome === 'accepted') {
          localStorage.setItem('mytranscript_pwa_installed', 'true');
          setIsVisible(false);
        } else {
          localStorage.setItem('mytranscript_pwa_dismissed', 'true');
          setIsVisible(false);
        }
      } catch (err) {
        console.warn('PWA install prompt notice:', err);
      } finally {
        deferredPromptRef.current = null;
      }
      return;
    }

    // If on iOS or browsers without native prompt, display the friendly step-by-step guide
    if (isIOS || !hasNativePrompt) {
      setShowIosGuide(true);
    }
  };

  if (!isMounted || !isVisible) {
    return null;
  }

  return (
    <>
      {/* ─── Compact Floating Mobile PWA Banner ─── */}
      <aside
        aria-label="Install App"
        className="fixed bottom-4 left-3 right-3 sm:left-auto sm:right-5 sm:max-w-sm z-[99] transition-all duration-500 ease-out animate-fade-in-up"
      >
        <div className="relative overflow-hidden rounded-2xl bg-gray-950/95 border border-gray-800 p-3 sm:p-3.5 shadow-2xl shadow-black/90 backdrop-blur-2xl flex items-center justify-between gap-3">
          {/* Subtle ruby ambient accent */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FF2B4A]/10 blur-2xl rounded-full pointer-events-none" />

          {/* Left: App Icon & Copy */}
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <div className="relative w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 p-1 flex items-center justify-center flex-shrink-0 shadow-md">
              <Image
                src="/logo.png"
                alt="MyTranscript App"
                width={32}
                height={32}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white tracking-tight truncate">
                  MyTranscript
                </span>
                <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[9px] font-extrabold uppercase tracking-wide bg-[#FF2B4A]/15 text-[#FF2B4A] border border-[#FF2B4A]/30">
                  Free App
                </span>
              </div>
              <p className="text-[11px] text-gray-400 truncate leading-tight pt-0.5">
                Fast AI summaries on home screen
              </p>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              type="button"
              onClick={handleInstallClick}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FF2B4A] hover:bg-[#e02440] text-white text-xs font-semibold shadow-md shadow-[#FF2B4A]/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Get App</span>
            </button>

            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Dismiss install prompt"
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-900/80 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ─── Friendly iOS / Safari Step-by-Step Tooltip & Sheet ─── */}
      {showIosGuide && (
        <div className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center p-3 sm:p-4 animate-fade-in">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setShowIosGuide(false)}
          />

          {/* Modal Card */}
          <div className="relative w-full max-w-sm rounded-2xl bg-gray-950 border border-gray-800 p-5 shadow-2xl shadow-black/90 z-10 space-y-4 animate-fade-in-up">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center">
                  <Image src="/logo.png" alt="MyTranscript" width={20} height={20} />
                </div>
                <h3 className="text-sm font-bold text-white">Install on iPhone / iPad</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowIosGuide(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-900 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Instruction Steps */}
            <div className="space-y-3 text-xs text-gray-300">
              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-gray-900/60 border border-gray-800/80">
                <div className="w-6 h-6 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0 mt-0.5">
                  <Share className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-semibold text-white">1. Tap the Share button</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Tap the square share icon <span className="text-blue-400 font-semibold">[↑]</span> at the bottom of Safari.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-gray-900/60 border border-gray-800/80">
                <div className="w-6 h-6 rounded-lg bg-[#FF2B4A]/15 border border-[#FF2B4A]/30 flex items-center justify-center text-[#FF2B4A] flex-shrink-0 mt-0.5">
                  <PlusSquare className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-semibold text-white">2. Select &ldquo;Add to Home Screen&rdquo; 📲</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Scroll down through the share sheet and tap <span className="text-white font-medium">&ldquo;Add to Home Screen&rdquo;</span>.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-gray-900/60 border border-gray-800/80">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-semibold text-white">3. Tap &ldquo;Add&rdquo;</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Confirm in the top-right corner to launch directly from your home screen.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Dismiss */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => {
                  setShowIosGuide(false);
                  handleDismiss();
                }}
                className="w-full py-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-800 text-xs font-semibold text-white transition-colors"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
