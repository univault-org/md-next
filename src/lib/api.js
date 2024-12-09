import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'

const contentDirectory = path.join(process.cwd(), 'content')
const postsDirectory = path.join(contentDirectory, 'posts')
const pagesDirectory = path.join(contentDirectory, 'pages')

// Helper function to validate and format image path
function processImagePath(imagePath) {
  if (!imagePath) return null;
  
  // Check if it's an external URL
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Handle local images from public folder
  if (imagePath.startsWith('/')) {
    // Remove leading slash if present to normalize path
    const normalizedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    
    // Verify if file exists in public folder
    const publicPath = path.join(process.cwd(), 'public', normalizedPath);
    if (fs.existsSync(publicPath)) {
      return normalizedPath;
    } else {
      console.warn(`Warning: Image file not found in public directory: ${normalizedPath}`);
      return null;
    }
  }
  
  // If path doesn't start with '/' or 'http', assume it's relative to public folder
  const normalizedPath = `/${imagePath}`;
  const publicPath = path.join(process.cwd(), 'public', normalizedPath);
  if (fs.existsSync(publicPath)) {
    return normalizedPath;
  }
  
  console.warn(`Warning: Image file not found: ${imagePath}`);
  return null;
}

// Helper function to handle date formatting consistently
function formatDate(dateString) {
  if (!dateString) return null;
  
  try {
    // Create date object and force UTC to avoid timezone issues
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.warn(`Warning: Invalid date format: ${dateString}`);
      return null;
    }
    
    // Format in UTC to avoid timezone shifts
    return date.toISOString().split('T')[0];
  } catch (error) {
    console.warn(`Error processing date: ${dateString}`, error);
    return null;
  }
}

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

        // Use the new date formatting function
        const date = formatDate(frontmatter.date);

        // Process image path
        const processedImage = processImagePath(frontmatter.image)

        return {
          slug,
          title: frontmatter.title || '',
          date,
          excerpt: frontmatter.excerpt || '',
          author: frontmatter.author || '',
          image: processedImage,
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
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    
    const { data: frontmatter, content } = matter(fileContents)
    const source = await serialize(content)

    // Process image path
    const processedImage = processImagePath(frontmatter.image)
    
    // Format the date consistently
    const date = formatDate(frontmatter.date);

    return {
      source,
      frontmatter: {
        ...frontmatter,
        slug,
        date,
        image: processedImage
      }
    }
  } catch (error) {
    console.error(`Error getting post by slug ${slug}:`, error)
    return null
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