import { MetadataRoute } from 'next';
import { siteConfig } from '@/content/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.seo.siteUrl;
  const lastModified = new Date(`${siteConfig.seo.lastUpdated}T00:00:00.000Z`);
  
  // Base routes to include in the sitemap
  const routes = [
    '',
    '/acting',
    '/voice-over',
    '/music',
    '/writing-filmmaking',
    '/lmntl-studios',
    '/about',
    '/resume',
    '/headshots',
    '/contact',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
}
