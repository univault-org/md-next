const fs = require('fs')
const globby = require('globby')

async function generateSitemap() {
  const pages = await globby([
    'src/pages/**/*.js',
    'content/**/*.md',
    '!src/pages/_*.js',
    '!src/pages/api',
  ])

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map((page) => {
          const path = page
            .replace('src/pages', '')
            .replace('content', '')
            .replace('.js', '')
            .replace('.md', '')
          const route = path === '/index' ? '' : path
          return `
            <url>
              <loc>https://Univault.org${route}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>weekly</changefreq>
            </url>
          `
        })
        .join('')}
    </urlset>
  `

  fs.writeFileSync('public/sitemap.xml', sitemap)
}

generateSitemap()