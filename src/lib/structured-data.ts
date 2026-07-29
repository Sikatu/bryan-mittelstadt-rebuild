// ============================================================
// Bryan Mittelstadt — JSON-LD Structured Data
// Generates Person, WebSite, and VideoObject schemas.
// ============================================================

import { siteConfig } from '@/content/site';

/** Person JSON-LD for Bryan Mittelstadt. */
export function getPersonJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    url: siteConfig.seo.siteUrl,
    jobTitle: siteConfig.titles.join(', '),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Los Angeles',
      addressRegion: 'CA',
      addressCountry: 'US',
    },
    ...(siteConfig.seo.ogImage && { image: siteConfig.seo.ogImage }),
    description: siteConfig.seo.siteDescription,
    knowsAbout: [
      'Acting',
      'Film',
      'Television',
      'Voice-Over',
      'Music',
      'Screenwriting',
      'Theatre',
    ],
    memberOf: [
      { '@type': 'Organization', name: 'SAG-AFTRA' },
      { '@type': 'Organization', name: "Actors' Equity Association" },
    ],
  };
}

/** WebSite JSON-LD. */
export function getWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.seo.siteTitle,
    url: siteConfig.seo.siteUrl,
    description: siteConfig.seo.siteDescription,
  };
}

/** VideoObject JSON-LD for the acting reel. */
export function getReelVideoJsonLd() {
  if (!siteConfig.reelUrl) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: `${siteConfig.name} — ${siteConfig.reelYear ?? ''} Acting Reel`,
    description: `Acting reel for ${siteConfig.name}, featuring selected work across film, television, and stage.`,
    contentUrl: `https://www.youtube.com/watch?v=${siteConfig.reelUrl}`,
    embedUrl: `https://www.youtube.com/embed/${siteConfig.reelUrl}`,
    ...(siteConfig.seo.ogImage && { thumbnailUrl: siteConfig.seo.ogImage }),
    ...(siteConfig.reelUploadDate && { uploadDate: siteConfig.reelUploadDate }),
  };
}
