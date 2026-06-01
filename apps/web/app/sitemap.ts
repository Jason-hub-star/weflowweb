import type { MetadataRoute } from 'next';
import { serverConfig as config } from '@/lib/server-config';

const STATIC_ROUTES = [
  '/',
  '/story',
  '/services',
  '/pricing',
  '/cases',
  '/reviews',
  '/blog',
  '/notice',
  '/faq',
  '/contact',
  '/contact/form',
  '/privacy',
  '/terms',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return STATIC_ROUTES.map((path) => ({
    url: `${config.site.url}${path}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: path === '/' ? 1 : 0.7,
  }));
}
