import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

const contentDirectory = path.join(process.cwd(), 'content')
const postsDirectory = path.join(contentDirectory, 'posts')
const pagesDirectory = path.join(contentDirectory, 'pages')
const paiTrainingDirectory = path.join(process.cwd(), 'PAI_Training')

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

// Update serialize configuration to handle images
async function serializeContent(content, options = {}) {
  // Process image paths before serialization
  const processedContent = content.replace(
    /!\[(.*?)\]\((.*?)\)/g,
    (match, alt, src) => {
      const processedSrc = processImagePath(src)
      return `![${alt}](${processedSrc || src})`
    }
  )

  return serialize(processedContent, {
    mdxOptions: {
      remarkPlugins: [remarkMath],
      rehypePlugins: [[rehypeKatex, { 
        strict: false,
        trust: true,
        macros: {
          "\\eqref": "\\href{###1}{(\\text{#1})}",
          "\\ref": "\\href{###1}{\\text{#1}}",
          "\\label": "\\htmlId{#1}{}"
        }
      }]],
    },
    // Remove function from scope
    scope: {
      ...options.scope,
      // Don't include processImagePath in scope
    }
  })
}

// Get MDX content for pages
export async function getMDXContent(filePath) {
  const fullPath = path.join(pagesDirectory, filePath)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  
  const { data: frontmatter, content } = matter(fileContents)
  const source = await serializeContent(content)

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

// Update getPostBySlug to handle inline images
export async function getPostBySlug(slug) {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    
    const processedContent = fileContents
      .replace(/\\\[/g, '$$')
      .replace(/\\\]/g, '$$')
      .replace(/\\\(/g, '$')
      .replace(/\\\)/g, '$')
    
    const { data: frontmatter, content } = matter(processedContent)
    
    // Process all images before serialization
    const source = await serializeContent(content, {
      scope: frontmatter,
      parseFrontmatter: true
    })

    // Process frontmatter image
    const processedImage = processImagePath(frontmatter.image)
    const date = formatDate(frontmatter.date)

    return {
      source: {
        ...source,
        // Ensure no functions are included in the returned data
        scope: {} 
      },
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

// Generic function to get all content from a PAI Training subdirectory
function getAllPAITrainingContent(subDirectory) {
  const directory = path.join(paiTrainingDirectory, subDirectory)
  
  try {
    if (!fs.existsSync(directory)) {
      return []
    }

    let contentItems = []

    // Get direct markdown files in the subdirectory
    const directFiles = fs.readdirSync(directory)
      .filter((item) => {
        const itemPath = path.join(directory, item);
        return fs.statSync(itemPath).isFile() && item.endsWith('.md') && !item.toLowerCase().startsWith('readme');
      });

    for (const file of directFiles) {
      try {
        const filePath = path.join(directory, file);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data: frontmatter } = matter(fileContents);
        
        const filename = file.replace(/\.md$/, '');
        const processedImage = processImagePath(frontmatter.image);
        const date = formatDate(frontmatter.date);
        
        contentItems.push({
          slug: filename,
          title: frontmatter.title || filename,
          description: frontmatter.description || '',
          image: processedImage,
          date,
          category: 'General',
          ...frontmatter
        });
      } catch (error) {
        console.warn(`Error processing direct file ${file}:`, error);
      }
    }

    // Check for language-specific subfolders for Resources, Exercises, AND Programming_Language
    if (subDirectory === 'Resources' || subDirectory === 'Exercises' || subDirectory === 'Programming_Language') {
      const languageFolders = ['Python', 'CPlusPlus', 'JavaScript', 'JavaScript_Node'];
      
      for (const langFolder of languageFolders) {
        const langDirectory = path.join(directory, langFolder);
        if (fs.existsSync(langDirectory) && fs.statSync(langDirectory).isDirectory()) {
          // Recursively process nested directories for exercises
          const processDirectory = (dir, basePath = '') => {
            const items = fs.readdirSync(dir);
            let results = [];
            
            for (const item of items) {
              const itemPath = path.join(dir, item);
              const stat = fs.statSync(itemPath);
              
              if (stat.isDirectory()) {
                // Recursively process subdirectories
                const subResults = processDirectory(itemPath, basePath ? `${basePath}/${item}` : item);
                results.push(...subResults);
              } else if (item.endsWith('.md') && !item.toLowerCase().startsWith('readme')) {
                // Exclude README files
                const filename = item.replace(/\.md$/, '');
                const slug = basePath ? `${langFolder}/${basePath}/${filename}` : `${langFolder}/${filename}`;
                
                try {
                  const fileContents = fs.readFileSync(itemPath, 'utf8');
                  const { data: frontmatter } = matter(fileContents);
                  
                  const processedImage = processImagePath(frontmatter.image);
                  const date = formatDate(frontmatter.date);
                  
                  results.push({
                    slug,
                    title: frontmatter.title || filename,
                    description: frontmatter.description || '',
                    image: processedImage,
                    date,
                    language: langFolder,
                    category: basePath || 'General',
                    ...frontmatter
                  });
                } catch (error) {
                  console.warn(`Error processing ${itemPath}:`, error);
                }
              }
            }
            return results;
          };
          
          const langContentItems = processDirectory(langDirectory);
          contentItems.push(...langContentItems);
        }
      }
    }

    return contentItems.sort((item1, item2) => (item1.date > item2.date ? -1 : 1));

  } catch (error) {
    console.error(`Error getting content from ${subDirectory}:`, error)
    return []
  }
}

// Get all inspiration content
export function getAllInspirationContent() {
  return getAllPAITrainingContent('Inspiration');
}

// Get all resource content
export function getAllResourceContent() {
  return getAllPAITrainingContent('Resources');
}

// Get all theory content
export function getAllTheoryContent() {
  return getAllPAITrainingContent('Theory');
}

// Get all exercise content
export function getAllExerciseContent() {
  return getAllPAITrainingContent('Exercises');
}

// Generic function to get all slugs from a PAI Training subdirectory
function getAllPAITrainingSlugs(subDirectory) {
  const directory = path.join(paiTrainingDirectory, subDirectory);
  
  try {
    if (!fs.existsSync(directory)) {
      return [];
    }

    let slugs = [];

    // Get direct files in the subdirectory
    const items = fs.readdirSync(directory);
    for (const item of items) {
      const itemPath = path.join(directory, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isFile() && item.endsWith('.md') && !item.toLowerCase().startsWith('readme')) {
        const filename = item.replace(/\.md$/, '');
        slugs.push(filename);
      }
    }

    // Check for language-specific subfolders for Resources, Exercises, AND Programming_Language
    if (subDirectory === 'Resources' || subDirectory === 'Exercises' || subDirectory === 'Programming_Language') {
      const languageFolders = ['Python', 'CPlusPlus', 'JavaScript', 'JavaScript_Node'];
      
      for (const langFolder of languageFolders) {
        const langDirectory = path.join(directory, langFolder);
        if (fs.existsSync(langDirectory) && fs.statSync(langDirectory).isDirectory()) {
          // Recursively process nested directories for exercises
          const processDirectory = (dir, basePath = '') => {
            const items = fs.readdirSync(dir);
            let results = [];
            
            for (const item of items) {
              const itemPath = path.join(dir, item);
              const stat = fs.statSync(itemPath);
              
              if (stat.isDirectory()) {
                // Recursively process subdirectories
                const subResults = processDirectory(itemPath, basePath ? `${basePath}/${item}` : item);
                results.push(...subResults);
              } else if (item.endsWith('.md') && !item.toLowerCase().startsWith('readme')) {
                // Exclude README files
                const filename = item.replace(/\.md$/, '');
                const slug = basePath ? `${langFolder}/${basePath}/${filename}` : `${langFolder}/${filename}`;
                results.push(slug);
              }
            }
            return results;
          };
          
          const langSlugs = processDirectory(langDirectory);
          slugs.push(...langSlugs);
        }
      }
    }
    
    return slugs;
  } catch (error) {
    console.error(`Error getting slugs from ${subDirectory}:`, error);
    return [];
  }
}

export function getAllInspirationSlugs() {
  return getAllPAITrainingSlugs('Inspiration');
}

export function getAllResourceSlugs() {
  return getAllPAITrainingSlugs('Resources');
}

export function getAllTheorySlugs() {
  return getAllPAITrainingSlugs('Theory');
}

export function getAllExerciseSlugs() {
  return getAllPAITrainingSlugs('Exercises');
}

// Generic function to get content by slug from a PAI Training subdirectory
async function getPAITrainingContentBySlug(subDirectory, slug) {
  let fullPath;
  
  // Check if slug contains a subfolder (e.g., "Python/some-article" or "JavaScript/Fundamentals/async_pai_interactions")
  if (slug.includes('/')) {
    const parts = slug.split('/');
    const subfolder = parts[0]; // Language folder (Python, JavaScript, etc.)
    const nestedPath = parts.slice(1).join('/'); // Remaining path
    fullPath = path.join(paiTrainingDirectory, subDirectory, subfolder, `${nestedPath}.md`);
  } else {
    // Direct file in the subdirectory
    fullPath = path.join(paiTrainingDirectory, subDirectory, `${slug}.md`);
  }
  
  try {
    if (!fs.existsSync(fullPath)) {
      console.warn(`Content not found: ${subDirectory}/${slug}.md`);
      return null;
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const processedMdContent = fileContents
      .replace(/\\\[/g, '$$')
      .replace(/\\\]/g, '$$')
      .replace(/\\\(/g, '$')
      .replace(/\\\)/g, '$');

    const { data: frontmatter, content } = matter(processedMdContent);
    const source = await serializeContent(content, {
      scope: frontmatter,
      parseFrontmatter: true,
    });

    const processedImage = processImagePath(frontmatter.image);
    const date = formatDate(frontmatter.date);

    return {
      source: {
        ...source,
        scope: {},
      },
      frontmatter: {
        ...frontmatter,
        slug,
        date,
        image: processedImage,
      },
    };
  } catch (error) {
    console.error(`Error getting content by slug ${subDirectory}/${slug}:`, error);
    return null;
  }
}

export async function getInspirationBySlug(slug) {
  return getPAITrainingContentBySlug('Inspiration', slug);
}

export async function getResourceBySlug(slug) {
  return getPAITrainingContentBySlug('Resources', slug);
}

export async function getTheoryBySlug(slug) {
  return getPAITrainingContentBySlug('Theory', slug);
}

export async function getExerciseBySlug(slug) {
  return getPAITrainingContentBySlug('Exercises', slug);
}

// Function to process generic markdown content
export async function getProcessedContent(filePath) {
  const fullPath = path.join(pagesDirectory, filePath)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  
  const { data: metadata, content } = matter(fileContents)
  
  // Add math processing for processed content if needed
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

// Get PAI Training content by slug
export async function getPAITrainingBySlug(slug) {
  try {
    const fullPath = path.join(paiTrainingDirectory, `${slug}.md`)
    
    if (!fs.existsSync(fullPath)) {
      console.warn(`PAI Training content not found: ${slug}`)
      return null
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    
    const processedContent = fileContents
      .replace(/\\\[/g, '$$')
      .replace(/\\\]/g, '$$')
      .replace(/\\\(/g, '$')
      .replace(/\\\)/g, '$')
    
    const { data: frontmatter, content } = matter(processedContent)
    
    // Process all images before serialization
    const source = await serializeContent(content, {
      scope: frontmatter,
      parseFrontmatter: true
    })

    // Process frontmatter image
    const processedImage = processImagePath(frontmatter.image)
    const date = formatDate(frontmatter.date)

    return {
      source: {
        ...source,
        // Ensure no functions are included in the returned data
        scope: {} 
      },
      frontmatter: {
        ...frontmatter,
        slug,
        date,
        image: processedImage
      }
    }
  } catch (error) {
    console.error(`Error getting PAI Training content by slug ${slug}:`, error)
    return null
  }
}

// Get all Programming Language content
export function getAllProgrammingLanguageContent() {
  return getAllPAITrainingContent('Programming_Language');
}

// Get Programming Language content by slug
export async function getProgrammingLanguageBySlug(slug) {
  return getPAITrainingContentBySlug('Programming_Language', slug);
}

// Get all Programming Language slugs
export function getAllProgrammingLanguageSlugs() {
  return getAllPAITrainingSlugs('Programming_Language');
}

// Get content for a specific programming language
export function getProgrammingLanguageContentByLanguage(language) {
  try {
    const directory = path.join(paiTrainingDirectory, 'Programming_Language', language);
    
    if (!fs.existsSync(directory)) {
      return [];
    }

    const items = fs.readdirSync(directory);
    const contentItems = [];

    for (const item of items) {
      const itemPath = path.join(directory, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isFile() && item.endsWith('.md') && !item.toLowerCase().startsWith('readme')) {
        try {
          const fileContents = fs.readFileSync(itemPath, 'utf8');
          const { data: frontmatter } = matter(fileContents);
          
          const filename = item.replace(/\.md$/, '');
          const processedImage = processImagePath(frontmatter.image);
          const date = formatDate(frontmatter.date);
          
          contentItems.push({
            slug: `${language}/${filename}`,
            title: frontmatter.title || filename,
            description: frontmatter.description || '',
            image: processedImage,
            date,
            language,
            difficulty: frontmatter.difficulty || 'Intermediate',
            tags: frontmatter.tags || [],
            learning_objectives: frontmatter.learning_objectives || [],
            ...frontmatter
          });
        } catch (error) {
          console.warn(`Error processing ${itemPath}:`, error);
        }
      }
    }

    return contentItems.sort((item1, item2) => (item1.date > item2.date ? -1 : 1));
  } catch (error) {
    console.error(`Error getting content for language ${language}:`, error);
    return [];
  }
}