/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static HTML export
  images: {
    unoptimized: true // For static export
  },
  trailingSlash: true, // Better for static hosting
}

module.exports = nextConfig
