import type { MetadataRoute } from 'next';
import { config } from '@/lib/config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/mockup/', '/hero-lab/', '/kit'],
    },
    sitemap: `${config.site.url}/sitemap.xml`,
  };
}
