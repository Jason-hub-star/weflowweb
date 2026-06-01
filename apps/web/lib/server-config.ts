import { publicConfig } from './public-config';

/**
 * Server-only runtime config.
 *
 * Import this from Server Components, route handlers, metadata, robots,
 * sitemap, and OG generation. Client Components must use public-config.
 */
export const serverConfig = {
  ...publicConfig,
  seo: {
    googleVerification: process.env.GOOGLE_SITE_VERIFICATION,
    naverVerification: process.env.NAVER_SITE_VERIFICATION,
  },
  email: {
    from: process.env.RESEND_FROM_EMAIL ?? publicConfig.contact.email,
    to: process.env.OWNER_EMAIL ?? '#TODO_OWNER_EMAIL',
  },
} as const;

export const isProduction = process.env.NODE_ENV === 'production';
