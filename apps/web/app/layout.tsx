import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import { GeistMono } from 'geist/font/mono';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { config } from '@/lib/config';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { FloatingCTA } from '@/components/layout/FloatingCTA';
import { SmoothScrollProvider } from '@/components/motion/SmoothScrollProvider';
import { StickyHeaderWatcher } from '@/components/layout/StickyHeaderWatcher';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#f4f8ff',
};

export const metadata: Metadata = {
  metadataBase: new URL(config.site.url),
  title: {
    default: `${config.brand.name} — ${config.brand.slogan}`,
    template: `%s | ${config.brand.name}`,
  },
  description: config.brand.subSlogan,
  applicationName: config.brand.name,
  authors: [{ name: config.brand.name }],
  generator: 'Next.js',
  keywords: [
    '홈페이지 제작',
    '랜딩페이지 제작',
    '소상공인 홈페이지',
    '업종별 홈페이지',
    '광고 운영',
    '검색 등록',
    '운영 관리',
    '무료 진단',
    'WEFLOW',
    'WEFLOW CARE',
  ],
  openGraph: {
    type: 'website',
    locale: config.site.locale,
    url: config.site.url,
    siteName: config.brand.name,
    title: `${config.brand.name} — ${config.brand.slogan}`,
    description: config.brand.subSlogan,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${config.brand.name} — ${config.brand.slogan}`,
    description: config.brand.subSlogan,
  },
  verification: {
    google: config.seo.googleVerification,
    other: config.seo.naverVerification
      ? { 'naver-site-verification': [config.seo.naverVerification] }
      : undefined,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const enableVercelInsights = process.env.NEXT_PUBLIC_ENABLE_VERCEL_INSIGHTS === '1';

  return (
    <html lang={config.site.language} className={GeistMono.variable}>
      <body className="min-h-svh flex flex-col bg-bg text-text font-sans antialiased">
        <Suspense fallback={null}>
          <SmoothScrollProvider />
        </Suspense>
        <StickyHeaderWatcher />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <FloatingCTA />
        {enableVercelInsights ? (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        ) : null}
      </body>
    </html>
  );
}
