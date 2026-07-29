// ============================================================
// Bryan Mittelstadt — Metadata Factory
// Generates consistent Next.js Metadata for every route.
// ============================================================

import type { Metadata } from 'next';
import { siteConfig } from '@/content/site';

interface PageMetadataOptions {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export function createPageMetadata({
  title,
  description,
  path = '',
  ogImage,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const { seo } = siteConfig;
  const url = `${seo.siteUrl}${path}`;
  const image = ogImage ?? seo.ogImage;

  return {
    title,
    description,
    ...(noIndex && { robots: { index: false, follow: false } }),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: 'website',
      locale: 'en_US',
      ...(image && {
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: `${siteConfig.name} — ${siteConfig.titles.join(', ')}`,
          },
        ],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(image && { images: [image] }),
    },
  };
}
