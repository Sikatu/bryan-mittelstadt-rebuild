import { MetadataRoute } from 'next';
import { siteConfig } from '@/content/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.seo.siteUrl;
  
  // Base routes to include in the sitemap
  const routes = [
    '',
    '/acting',
    '/voice-over',
    '/music',
    '/writing-filmmaking',
    '/about',
    '/resume',
    '/headshots',
    '/contact',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
}
