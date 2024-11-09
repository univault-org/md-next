import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'

const contentDirectory = path.join(process.cwd(), 'content')

export async function getMDXContent(filePath) {
  const fullPath = path.join(contentDirectory, 'pages', filePath)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  
  // Use gray-matter to parse the post metadata section
  const { data: frontmatter, content } = matter(fileContents)

  // Serialize the content for MDX
  const source = await serialize(content)

  return {
    source,
    frontmatter
  }
}

// Keep the original content processing function if needed
export async function getProcessedContent(filePath) {
  const fullPath = path.join(contentDirectory, 'pages', filePath)
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