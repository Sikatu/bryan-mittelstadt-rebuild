// ============================================================
// Bryan Mittelstadt — JSON-LD Structured Data
// Generates Person, WebSite, and VideoObject schemas.
// ============================================================

import { actingReels } from '@/content/media';
import { siteConfig } from '@/content/site';
import { resolveVideoUrl } from '@/lib/media';

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

/** VideoObject JSON-LD for the first approved acting reel. */
export function getReelVideoJsonLd() {
  const reel = actingReels.find(
    (item) => item.availability === 'available' && Boolean(item.url),
  );
  const resolved = resolveVideoUrl(reel?.url);

  if (!reel || !resolved?.embedUrl) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: `${siteConfig.name} — ${reel.title}`,
    description:
      reel.description ??
      `Acting reel for ${siteConfig.name}, featuring selected performance work.`,
    contentUrl: resolved.watchUrl,
    embedUrl: resolved.embedUrl,
    ...(reel.posterImage && { thumbnailUrl: reel.posterImage }),
  };
}
