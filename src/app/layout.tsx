import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import SkipLink from '@/components/SkipLink';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { siteConfig } from '@/content/site';
import { isSearchIndexingAllowed } from '@/lib/deployment';
import { getPersonJsonLd, getWebSiteJsonLd } from '@/lib/structured-data';
import './globals.css';

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});


export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f8f7f3',
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.seo.siteTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.seo.siteDescription,
  metadataBase: new URL(siteConfig.seo.siteUrl),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: isSearchIndexingAllowed,
    follow: isSearchIndexingAllowed,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary font-sans">
        <SkipLink />
        <SiteHeader />
        <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getPersonJsonLd()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getWebSiteJsonLd()),
          }}
        />
      </body>
    </html>
  );
}
