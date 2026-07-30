import type { MetadataRoute } from 'next';
import { siteConfig } from '@/content/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.seo.siteTitle,
    short_name: siteConfig.name,
    description: siteConfig.seo.siteDescription,
    start_url: '/',
    display: 'standalone',
    background_color: '#f8f7f3',
    theme_color: '#f8f7f3',
    lang: 'en-US',
    categories: ['entertainment', 'portfolio'],
  };
}
