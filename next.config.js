/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static exports
  basePath: '/md-next', // GitHub Pages repository name
  images: {
    unoptimized: true, // Required for static export
  },
  // Disable server-side features
  experimental: {
    appDir: false,
  }
}

module.exports = nextConfig
