import type { NextConfig } from "next";

const config: NextConfig = {
  // Core settings only
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  // Essential experimental features for Next.js 15.2 with React 19
  experimental: {
    // Enable module optimization for React 19
    optimizePackageImports: ['@heroicons/react', 'lucide-react', 'framer-motion'],
    // This ensures proper client/server boundary
    clientRouterFilter: true,
    // Allow React 19's RSC features to work properly
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Very minimal webpack configuration
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Node polyfills for client-side code
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      };
    }
    return config;
  },
};

export default config; 