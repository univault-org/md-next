/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static exports
  basePath: '/md-next', // GitHub Pages repository name
  images: {
    unoptimized: true, // Required for static export
  },
  // Disable any server-side features
  experimental: {
    appDir: false,
  },
  // Ensure trailing slashes for GitHub Pages
  trailingSlash: true,
}

module.exports = nextConfig
