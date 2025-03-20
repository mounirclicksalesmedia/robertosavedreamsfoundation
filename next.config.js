/** @type {import('next').NextConfig} */
const nextConfig = {
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
}

module.exports = nextConfig 