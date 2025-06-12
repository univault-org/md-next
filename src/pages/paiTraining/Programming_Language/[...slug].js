import Head from 'next/head';
import { MDXRemote } from 'next-mdx-remote';
import { getAllProgrammingLanguageSlugs, getProgrammingLanguageBySlug } from '@/lib/api';
import Link from 'next/link';
import { Highlight, themes } from 'prism-react-renderer';
import { useTheme } from 'next-themes';
import { useEffect, useState, useRef } from 'react';

const CustomCodeBlock = ({ children }) => {
  const { theme: activeTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const codeProps = children.props;
  const language = (codeProps.className || '').replace('language-', '') || 'plaintext';
  const codeString = codeProps.children.trim();

  const prismTheme = activeTheme === 'dark' ? themes.oneDark : themes.oneLight;
  
  if (!mounted) {
    return (
      <pre className={`language-${language} p-4 rounded-lg bg-neutral-100 dark:bg-neutral-800 overflow-x-auto shadow-md my-6 text-sm`}>
        <code className={`language-${language}`}>{codeString}</code>
      </pre>
    );
  }

  return (
    <Highlight
      theme={prismTheme}
      code={codeString}
      language={language}
    >
      {({ className: blockClassName, style, tokens, getLineProps, getTokenProps }) => (
        <pre 
          className={`${blockClassName} p-4 rounded-lg overflow-x-auto shadow-md my-6 text-sm`}
          style={{...style, display: 'block'}} 
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i }) }>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key }) } />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

// Reading Progress Component
const ReadingProgress = ({ progress }) => (
  <div className="fixed top-0 left-0 w-full h-1 bg-neutral-200 dark:bg-neutral-700 z-50">
    <div 
      className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-300 ease-out"
      style={{ width: `${progress}%` }}
    />
  </div>
);

// Custom components for MDX
const createEnhancedMDXComponents = (onConceptClick) => ({
  pre: CustomCodeBlock,
  // Enhanced headings with anchor links
  h1: (props) => (
    <h1 {...props} className="text-4xl font-bold mt-12 mb-6 text-neutral-800 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-700 pb-4" />
  ),
  h2: (props) => (
    <h2 {...props} className="text-3xl font-bold mt-10 mb-5 text-neutral-800 dark:text-neutral-100" />
  ),
  h3: (props) => (
    <h3 {...props} className="text-2xl font-semibold mt-8 mb-4 text-neutral-800 dark:text-neutral-100" />
  ),
  // Enhanced paragraphs - let prose handle the sizing
  // p: (props) => (
  //   <p {...props} className="my-6 text-lg leading-relaxed text-neutral-700 dark:text-neutral-300" />
  // ),
  // Enhanced lists
  ul: (props) => (
    <ul {...props} className="my-6 space-y-2 text-neutral-700 dark:text-neutral-300" />
  ),
  ol: (props) => (
    <ol {...props} className="my-6 space-y-2 text-neutral-700 dark:text-neutral-300" />
  ),
  li: (props) => (
    <li {...props} className="flex items-start">
      <span className="text-primary-500 mr-2 mt-1">•</span>
      <span>{props.children}</span>
    </li>
  ),
  // Enhanced blockquotes
  blockquote: (props) => (
    <blockquote {...props} className="my-8 p-6 border-l-4 border-primary-500 bg-primary-50/50 dark:bg-neutral-800/50 rounded-r-lg italic text-neutral-700 dark:text-neutral-300" />
  ),
  // Enhanced links
  a: (props) => (
    <a {...props} className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium underline decoration-primary-300 hover:decoration-primary-500 transition-colors" />
  ),
});

export default function ProgrammingLanguageArticlePage({ source, frontmatter }) {
  const [readingProgress, setReadingProgress] = useState(0);
  const articleRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (articleRef.current) {
        const scrolled = window.scrollY;
        const maxHeight = articleRef.current.scrollHeight - window.innerHeight;
        const progress = Math.min((scrolled / maxHeight) * 100, 100);
        setReadingProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleConceptClick = (concept) => {
    console.log('Concept clicked:', concept);
  };

  const components = createEnhancedMDXComponents(handleConceptClick);

  if (!frontmatter) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h1 className="text-4xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">Article Not Found</h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
          The programming language article you're looking for doesn't exist or may have been moved.
        </p>
        <Link href="/paiTraining/programming-languages" 
          className="inline-flex items-center px-6 py-3 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-semibold transition-colors duration-300">
          Go Back to Programming Languages
        </Link>
      </div>
    );
  }

  const pageTitle = `${frontmatter.title} | PAI Programming Languages`;
  const metaDescription = frontmatter.description || frontmatter.title;
  const metaKeywords = frontmatter.tags ? frontmatter.tags.join(', ') : '';

  // Determine language info for styling
  const getLanguageInfo = (slug) => {
    if (slug.includes('JavaScript') || slug.includes('javascript')) {
      return { name: 'JavaScript', icon: '🌐', color: 'from-yellow-500 to-orange-500' };
    } else if (slug.includes('Python') || slug.includes('python')) {
      return { name: 'Python', icon: '🐍', color: 'from-green-500 to-emerald-500' };
    } else if (slug.includes('CPlusPlus') || slug.includes('cpp')) {
      return { name: 'C++', icon: '🚀', color: 'from-blue-500 to-indigo-500' };
    }
    return { name: 'Programming', icon: '💻', color: 'from-purple-500 to-pink-500' };
  };

  const languageInfo = getLanguageInfo(frontmatter.slug);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        {metaKeywords && <meta name="keywords" content={metaKeywords} />}
        
        {/* Open Graph */}
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="article" />
        {frontmatter.image && <meta property="og:image" content={frontmatter.image} />}
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={frontmatter.title} />
        <meta name="twitter:description" content={metaDescription} />
        {frontmatter.image && <meta name="twitter:image" content={frontmatter.image} />}
      </Head>

      <ReadingProgress progress={readingProgress} />

      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-blue-50/30 to-purple-50/30 dark:from-neutral-900 dark:via-blue-900/10 dark:to-purple-900/10">
        <article ref={articleRef} className="max-w-5xl mx-auto px-6 py-20">
          {/* Back Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link
              href="/paiTraining/programming-languages"
              className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400"
            >
              <span>←</span>
              <span>Back to Programming Languages</span>
            </Link>
            <Link
              href="/paiTraining"
              className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400"
            >
              <span>📚</span>
              <span>PAI Training Hub</span>
            </Link>
          </div>

          {/* Article Header */}
          <header className="mb-12">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
              <div className="flex-1">
                {/* Language Badge */}
                <div className="flex items-center gap-3 mb-6">
                  <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${languageInfo.color} text-white shadow-lg`}>
                    <span className="mr-2">{languageInfo.icon}</span>
                    {languageInfo.name}
                  </span>
                  {frontmatter.difficulty && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                      {frontmatter.difficulty}
                    </span>
                  )}
                </div>

                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 mb-6 leading-tight">
                  {frontmatter.title}
                </h1>
                
                <div className="flex flex-wrap items-center text-base text-neutral-600 dark:text-neutral-400 gap-x-6 gap-y-3 mb-6">
                  {frontmatter.author && (
                    <div className="flex items-center">
                      <span className="mr-2 text-lg text-primary-500">👤</span>
                      <span className="font-medium">{frontmatter.author}</span>
                    </div>
                  )}
                  {frontmatter.date && (
                    <div className="flex items-center">
                      <span className="mr-2 text-lg text-primary-500">📅</span>
                      <time dateTime={frontmatter.date} className="font-medium">
                        {new Date(frontmatter.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                    </div>
                  )}
                </div>

                {/* Learning Objectives */}
                {frontmatter.learning_objectives && (
                  <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4 mb-6 transition-all duration-300">
                    <h3 className="font-semibold text-primary-800 dark:text-primary-200 mb-2 flex items-center">
                      <span className="mr-2">🎯</span>
                      Learning Objectives
                    </h3>
                    <ul className="text-sm text-primary-700 dark:text-primary-300 space-y-1">
                      {frontmatter.learning_objectives.map((objective, index) => (
                        <li key={index} className="flex items-center">
                          <span className="mr-2 text-primary-500">🎓</span>
                          {objective}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </header>

          {frontmatter.image && (
            <div className="mb-12 aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-xl transition-all duration-500">
              <img
                src={frontmatter.image}
                alt={`Cover image for ${frontmatter.title}`}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          )}

          {/* Enhanced Content */}
          <div className="prose prose-xl dark:prose-invert max-w-none
                        prose-headings:font-bold prose-headings:text-neutral-800 dark:prose-headings:text-neutral-100 
                        prose-p:text-neutral-700 dark:prose-p:text-neutral-300 prose-p:leading-relaxed
                        prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-a:font-medium hover:prose-a:text-primary-700 dark:hover:prose-a:text-primary-500 prose-a:transition-colors
                        prose-blockquote:border-primary-500 prose-blockquote:bg-primary-50/50 dark:prose-blockquote:bg-neutral-800/50 prose-blockquote:text-neutral-700 dark:prose-blockquote:text-neutral-300 prose-blockquote:p-4 prose-blockquote:rounded-lg prose-blockquote:shadow-sm
                        prose-ul:list-disc prose-ul:ml-1 prose-ul:space-y-1 marker:text-primary-500
                        prose-ol:list-decimal prose-ol:ml-1 prose-ol:space-y-1 marker:text-primary-500
                        prose-code:text-primary-600 prose-code:dark:text-primary-400 prose-code:bg-neutral-100 prose-code:dark:bg-neutral-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:text-sm
                        prose-hr:border-neutral-300 dark:prose-hr:border-neutral-700 prose-hr:my-12"
          >
            <MDXRemote {...source} components={components} />
          </div>

          {/* Enhanced Footer */}
          <footer className="mt-16 pt-10 border-t border-neutral-300 dark:border-neutral-700 transition-all duration-300">
            {frontmatter.tags && frontmatter.tags.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4">Tags:</h3>
                <div className="flex flex-wrap gap-3">
                  {frontmatter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 text-sm font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Programming Language Navigation */}
            <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-6 transition-all duration-300">
              <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-4 flex items-center">
                <span className="mr-2">{languageInfo.icon}</span>
                More {languageInfo.name} Articles
              </h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/paiTraining/programming-languages"
                  className="flex items-center justify-center space-x-2 p-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                >
                  <span>📚</span>
                  <span>View All Languages</span>
                </Link>
                <Link
                  href="/paiTraining"
                  className="flex items-center justify-center space-x-2 p-3 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                >
                  <span>🏠</span>
                  <span>PAI Training Hub</span>
                </Link>
              </div>
            </div>
          </footer>
        </article>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const slugs = getAllProgrammingLanguageSlugs();
  const paths = slugs.map((slug) => ({
    params: { 
      slug: slug.includes('/') ? slug.split('/') : [slug]
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Handle catch-all route - slug is an array
  const slugArray = params.slug;
  const slug = Array.isArray(slugArray) ? slugArray.join('/') : slugArray;
  
  const articleData = await getProgrammingLanguageBySlug(slug);
  if (!articleData) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      source: articleData.source,
      frontmatter: articleData.frontmatter,
    },
  };
} 