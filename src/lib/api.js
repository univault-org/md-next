import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'

const contentDirectory = path.join(process.cwd(), 'content')
const postsDirectory = path.join(contentDirectory, 'posts')
const pagesDirectory = path.join(contentDirectory, 'pages')

// Get MDX content for pages
export async function getMDXContent(filePath) {
  const fullPath = path.join(pagesDirectory, filePath)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  
  const { data: frontmatter, content } = matter(fileContents)
  const source = await serialize(content)

  return {
    source,
    frontmatter
  }
}

// Get all posts
export function getAllPosts() {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return []
    }

    const slugs = fs.readdirSync(postsDirectory)
      .filter((slug) => slug.endsWith('.md'))
      .map((slug) => slug.replace(/\.md$/, ''))

    const posts = slugs
      .map((slug) => {
        const fullPath = path.join(postsDirectory, `${slug}.md`)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data: frontmatter } = matter(fileContents)

        // Ensure date is serializable
        const date = frontmatter.date ? new Date(frontmatter.date).toISOString() : null

        return {
          slug,
          title: frontmatter.title || '',
          date,
          excerpt: frontmatter.excerpt || '',
          author: frontmatter.author || '',
          image: frontmatter.image || null,
          tags: frontmatter.tags || []
        }
      })
      .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))

    return posts
  } catch (error) {
    console.error('Error getting posts:', error)
    return []
  }
}

// Get a single post by slug
export async function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  
  const { data: frontmatter, content } = matter(fileContents)
  const source = await serialize(content)

  return {
    source,
    frontmatter: {
      ...frontmatter,
      slug,
    }
  }
}

// Get all post tags
export function getAllTags() {
  const posts = getAllPosts()
  const tags = new Set()
  
  posts.forEach(post => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach(tag => tags.add(tag))
    }
  })

  return Array.from(tags)
}

// Get posts by tag
export function getPostsByTag(tag) {
  const posts = getAllPosts()
  return posts.filter(post => post.tags && post.tags.includes(tag))
}

// Keep the original content processing function if needed
export async function getProcessedContent(filePath) {
  const fullPath = path.join(pagesDirectory, filePath)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  
  const { data: metadata, content } = matter(fileContents)

  const processedContent = {
    introduction: content.split('\n\n')[1],
    challenges: content.match(/- (.*)/g)?.map(item => item.replace('- ', '')) || [],
    features: metadata.features || [],
    vision: content.match(/## Vision\n([\s\S]*?)(?=\n##|$)/)?.[1]
      .split('\n')
      .filter(line => line.startsWith('- '))
      .map(line => line.replace('- ', '')) || [],
    research: metadata.research || []
  }

  return {
    content: processedContent,
    metadata
  }
}