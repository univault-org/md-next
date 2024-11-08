import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), 'content')

export async function getMDXContent(filePath) {
  const fullPath = path.join(contentDirectory, 'pages', filePath)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  
  // Use gray-matter to parse the post metadata section
  const { data: metadata, content } = matter(fileContents)

  // Process the content
  const processedContent = {
    introduction: content.split('\n\n')[1], // Get the first paragraph after frontmatter
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