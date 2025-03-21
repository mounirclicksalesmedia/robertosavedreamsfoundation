/** @type {import('next').NextConfig} */

const nextConfig = {
  // Core settings
  reactStrictMode: true,
  
  // Ignore ESLint and TypeScript errors in production
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // Update to remotePatterns for images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  // Webpack configuration to fix clientModules issue in Next.js 15.2.0
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Basic fallbacks and module resolution
      config.resolve = {
        ...config.resolve,
        fallback: {
          ...config.resolve?.fallback,
          fs: false,
          path: false,
        }
      };

      // Ensure optimization configuration exists
      if (!config.optimization) {
        config.optimization = {};
      }

      // Ensure splitChunks configuration exists
      if (!config.optimization.splitChunks) {
        config.optimization.splitChunks = {};
      }

      // Fix for clientModules issue by ensuring cacheGroups exist
      config.optimization.splitChunks.cacheGroups = {
        ...(config.optimization.splitChunks.cacheGroups || {}),
        // This ensures clientModules property is defined
        defaultVendors: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
      };
    }
    return config;
  },
};

module.exports = nextConfig; 