/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // This will ignore ESLint errors during build
  },
  images: {
    domains: ['images.unsplash.com'],
  },
}

module.exports = nextConfig 