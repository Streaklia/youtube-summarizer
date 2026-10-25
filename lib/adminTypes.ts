export interface SiteSeoSettings {
  siteName: string;
  logoText: string;
  faviconUrl: string;
  openGraphImageUrl: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  headerScripts: string;
  footerScripts: string;
}

export interface MonetizationSettings {
  enableCountdownModal: boolean;
  countdownDuration: number;
  interstitialAdHtml: string;
  headerAdSlot: string;
  aboveResultsAdSlot: string;
  belowResultsAdSlot: string;
  footerAdSlot: string;
}

export interface PageOrPost {
  id: string;
  title: string;
  type: 'PAGE' | 'POST';
  route: string;
  menuPlacement: 'Header' | 'Footer' | 'Both' | 'None';
  status: 'Published' | 'Draft';
  content?: string;
  updatedAt?: string;
}

export interface LanguageSetting {
  code: string;
  name: string;
  flag: string;
  isDefault?: boolean;
  heroHeadline: string;
  heroGradient: string;
  heroSubtitle: string;
  ctaButtonText: string;
  metaTitle: string;
  metaDescription: string;
}

export interface KeywordToolPage {
  id: string;
  badge: string;
  slug: string;
  targetKeyword: string;
  englishTitle: string;
  description: string;
  status?: 'Active' | 'Paused';
}

export interface ActivityLog {
  id: string;
  userHandle: string;
  quality: string;
  format: string;
  country: string;
  countryCode: string;
  loggedTime: string;
  videoId?: string;
}

export interface TelemetryData {
  timeframe: string;
  uniqueVisitors: number;
  mediaExtractions: number;
  completedDownloads: number;
  conversionRate: number;
  trafficChannels: { channel: string; visitors: number; share: number }[];
  visitorCountries: { country: string; visitors: number; share: number; flag: string }[];
  languagePerformance?: { language: string; visits: number; convRate: number; flag: string }[];
  activityStream: ActivityLog[];
}
