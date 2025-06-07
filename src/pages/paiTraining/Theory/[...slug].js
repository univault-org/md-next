import Head from 'next/head';
import { MDXRemote } from 'next-mdx-remote';
import { getAllTheorySlugs, getTheoryBySlug } from '@/lib/api';
import Link from 'next/link';
import { Highlight, themes } from 'prism-react-renderer';
import { useTheme } from 'next-themes';
import { useEffect, useState, useRef } from 'react';
import 'katex/dist/katex.min.css';

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

// Mathematical Visualization Component for Theory articles
const MathVisualizer = ({ isOpen, onToggle }) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-4 bg-white dark:bg-neutral-800 rounded-lg shadow-2xl border border-neutral-200 dark:border-neutral-700 z-40 flex flex-col transition-all duration-300 ${
        isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center space-x-2">
          <span>∑</span>
          <h3 className="font-semibold text-neutral-800 dark:text-neutral-100">Mathematical Visualizer</h3>
          <span className="text-xs text-neutral-500 bg-neutral-100 dark:bg-neutral-700 px-2 py-1 rounded">
            Visualize mathematical concepts and equations
          </span>
        </div>
        <button
          onClick={onToggle}
          className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
        >
          ✕
        </button>
      </div>
      <div className="flex-1 p-6">
        <div className="text-center text-neutral-500 py-8">
          <span className="text-3xl mx-auto mb-2 opacity-50 block">📊</span>
          <p className="text-sm">Mathematical visualization tools coming soon...</p>
        </div>
      </div>
    </div>
  );
};

const ReadingProgress = ({ progress }) => (
  <div className="fixed top-0 left-0 w-full h-1 bg-neutral-200 dark:bg-neutral-700 z-50">
    <div 
      className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-150 ease-out" 
      style={{ width: `${progress}%` }}
    />
  </div>
);

const createEnhancedMDXComponents = (onConceptClick) => ({
  pre: CustomCodeBlock,
  // Enhanced mathematical notation support
  InlineEquation: ({ children }) => (
    <span className="inline-block mx-1 px-2 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded font-mono text-sm">
      {children}
    </span>
  ),
  // Math equation renderer using KaTeX (like updates route)
  math: ({ children }) => (
    <div className="my-4 overflow-x-auto">
      <div dangerouslySetInnerHTML={{ __html: children }} />
    </div>
  ),
  inlineMath: ({ children }) => (
    <span dangerouslySetInnerHTML={{ __html: children }} />
  ),
  // Duality concept highlighter
  DualityPair: ({ yin, yang, description }) => (
    <div className="my-6 p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
      <div className="flex items-center justify-center mb-3">
        <div className="flex items-center space-x-4">
          <div className="bg-black text-white px-3 py-1 rounded-full text-sm font-medium">陰 {yin}</div>
          <div className="text-2xl">☯</div>
          <div className="bg-white text-black border-2 border-black px-3 py-1 rounded-full text-sm font-medium">陽 {yang}</div>
        </div>
      </div>
      {description && <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">{description}</p>}
    </div>
  ),
  // Mathematical concept highlighter
  MathConcept: ({ title, children }) => (
    <div className="my-4 p-4 border-l-4 border-primary-500 bg-primary-50 dark:bg-primary-900/20 rounded-r-lg">
      <h4 className="font-semibold text-primary-800 dark:text-primary-200 mb-2">{title}</h4>
      <div className="text-primary-700 dark:text-primary-300">{children}</div>
    </div>
  ),
});

export default function EnhancedTheoryArticlePage({ source, frontmatter }) {
  const [readingProgress, setReadingProgress] = useState(0);
  const [isMathVisualizerOpen, setIsMathVisualizerOpen] = useState(false);
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

  return (
    <>
      <Head>
        <title>{frontmatter.title} | PAI Training Theory</title>
        <meta name="description" content={frontmatter.description || frontmatter.excerpt || ''} />
        <meta name="author" content={frontmatter.author || ''} />
        
        {/* Open Graph */}
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={frontmatter.description || frontmatter.excerpt || ''} />
        <meta property="og:type" content="article" />
        {frontmatter.image && <meta property="og:image" content={frontmatter.image} />}
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={frontmatter.title} />
        <meta name="twitter:description" content={frontmatter.description || frontmatter.excerpt || ''} />
        {frontmatter.image && <meta name="twitter:image" content={frontmatter.image} />}
      </Head>

      <ReadingProgress progress={readingProgress} />

      {/* Enhanced Action Menu */}
      <div className="fixed left-6 top-1/2 transform -translate-y-1/2 bg-white dark:bg-neutral-800 rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-700 p-2 space-y-2 z-40">
        <button
          onClick={() => setIsMathVisualizerOpen(!isMathVisualizerOpen)}
          className="flex items-center space-x-2 w-full p-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded transition-colors"
          title="Mathematical Visualizer"
        >
          <span className="text-primary-500">∑</span>
          <span>Math Tools</span>
        </button>
        <button
          className="flex items-center space-x-2 w-full p-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded transition-colors"
          title="Theory Navigator"
        >
          <span className="text-primary-500">🧭</span>
          <span>Navigate</span>
        </button>
        <button
          className="flex items-center space-x-2 w-full p-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded transition-colors"
          title="Bookmark"
        >
          <span className="text-primary-500">🔖</span>
          <span>Bookmark</span>
        </button>
      </div>

      <div className="bg-neutral-50 dark:bg-neutral-900 min-h-screen pb-20">
        <article ref={articleRef} className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          {/* Enhanced Header */}
          <header className="mb-12 border-b border-neutral-200 dark:border-neutral-700 pb-8 transition-all duration-300">
            <div className="mb-6">
              <Link href="/paiTraining#trainer-resources" 
                className="inline-flex items-center text-sm text-primary-600 dark:text-primary-400 hover:underline mb-4 group">
                <span className="mr-2 group-hover:-translate-x-1 transition-transform duration-200">←</span>
                Back to PAI Training Theory
              </Link>
            </div>
            
            <div className="flex items-start justify-between">
              <div className="flex-1">
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
                  {frontmatter.difficulty && (
                    <div className="flex items-center">
                      <span className="mr-2 text-lg text-primary-500">🎯</span>
                      <span className="font-medium">{frontmatter.difficulty}</span>
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
                        prose-hr:border-neutral-300 dark:prose-hr:border-neutral-700 prose-hr:my-12
                        prose-pre:hidden"
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

            {/* Theory Navigation */}
            <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-6 transition-all duration-300">
              <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-4 flex items-center">
                ∑ Continue Your Theory Journey
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="flex items-center justify-center space-x-2 p-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors">
                  <span>🔖</span>
                  <span>Save Theory</span>
                </button>
                <button className="flex items-center justify-center space-x-2 p-3 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded-lg transition-colors">
                  <span>🧮</span>
                  <span>Practice Math</span>
                </button>
                <button className="flex items-center justify-center space-x-2 p-3 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded-lg transition-colors">
                  <span>📊</span>
                  <span>Visualize</span>
                </button>
              </div>
            </div>
          </footer>
        </article>
      </div>

      {/* Mathematical Visualizer */}
      {isMathVisualizerOpen && (
        <MathVisualizer
          isOpen={isMathVisualizerOpen}
          onToggle={() => setIsMathVisualizerOpen(false)}
        />
      )}
    </>
  );
}

export async function getStaticPaths() {
  const slugs = getAllTheorySlugs();
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
  
  const articleData = await getTheoryBySlug(slug);
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