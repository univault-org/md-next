/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '',
  assetPrefix: '',
  images: {
    unoptimized: true,
    loader: 'custom',
    path: '',
  },
  trailingSlash: true,
}

module.exports = nextConfig
