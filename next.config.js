/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/md-next' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/md-next/' : '',
  images: {
    unoptimized: true,
    loader: 'custom',
    path: '/md-next',
  },
  trailingSlash: true,
}

module.exports = nextConfig
