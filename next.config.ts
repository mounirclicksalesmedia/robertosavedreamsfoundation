import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // This will ignore ESLint errors during build
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors during build
  },
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: true, // For better static export compatibility
  },
  experimental: {
    // These settings can help with client component issues
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Increase build timeout for large applications
  staticPageGenerationTimeout: 180,
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
  // Force dynamic rendering for route groups with authentication
  async headers() {
    return [
      {
        source: '/(auth)/:path*',
        headers: [
          {
            key: 'x-nextjs-page-render-mode',
            value: 'dynamic',
          },
        ],
      },
      {
        source: '/(public)/:path*',
        headers: [
          {
            key: 'x-nextjs-page-render-mode',
            value: 'dynamic',
          },
        ],
      },
    ]
  }
};

export default config; 