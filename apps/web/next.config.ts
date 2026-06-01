import type { NextConfig } from 'next';
import { withBotId } from 'botid/next/config';

const config: NextConfig = {
  cacheComponents: true,
  reactStrictMode: true,
  transpilePackages: ['@weflow/tokens'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['framer-motion', '@weflow/tokens'],
  },
};

export default withBotId(config);
