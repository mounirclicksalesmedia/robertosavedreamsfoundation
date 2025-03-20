// next.config.js
/** @type {import('next').NextConfig} */

const nextConfig = {
  // Core settings only
  reactStrictMode: true,
  // Ignore ESLint and TypeScript errors in production
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Update to remotePatterns instead of domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Configure Turbopack
  experimental: {
    turbo: {
      resolveAlias: {
        // Add module aliases if needed in the future
      },
      rules: {
        // Add any specific Turbopack rules if needed
      },
    },
  },
  // Add webpack config to fix clientModules issue
  webpack: (config, { isServer }) => {
    // Only apply this fix for client-side bundles
    if (!isServer) {
      // Make sure resolveOptions exists
      if (!config.resolve) {
        config.resolve = {};
      }
      
      // Add clientModules to resolve options
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
      
      // Ensure the modules field exists in resolve
      if (!config.resolve.modules) {
        config.resolve.modules = [];
      }
    }
    
    return config;
  }
};

module.exports = nextConfig;
