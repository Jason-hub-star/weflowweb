import type { MetadataRoute } from 'next';
import { serverConfig as config } from '@/lib/server-config';

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
