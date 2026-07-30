import { MetadataRoute } from 'next';
import { siteConfig } from '@/content/site';
import { isSearchIndexingAllowed } from '@/lib/deployment';

export default function robots(): MetadataRoute.Robots {
  if (!isSearchIndexingAllowed) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: `${siteConfig.seo.siteUrl}/sitemap.xml`,
  };
}
