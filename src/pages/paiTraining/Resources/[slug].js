import Head from 'next/head';
import { MDXRemote } from 'next-mdx-remote';
import { getAllResourceSlugs, getResourceBySlug } from '@/lib/api';
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

// AI Learning Assistant Component
const AILearningAssistant = ({ isOpen, onToggle, content, onAskQuestion }) => {
  const [question, setQuestion] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAskQuestion = async () => {
    if (!question.trim()) return;
    
    setIsProcessing(true);
    const userMessage = { type: 'user', content: question, timestamp: Date.now() };
    setConversation(prev => [...prev, userMessage]);
    
    // Simulate AI response (in real implementation, this would call your AI service)
    setTimeout(() => {
      const aiResponse = {
        type: 'ai',
        content: `Great question! Based on the content you're reading, here's my analysis: ${question.includes('PAI') ? 'Personal AI systems work by...' : 'Let me explain this concept in more detail...'}`,
        timestamp: Date.now()
      };
      setConversation(prev => [...prev, aiResponse]);
      setIsProcessing(false);
    }, 1500);
    
    setQuestion('');
  };

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed right-6 bottom-6 bg-primary-500 hover:bg-primary-600 text-white p-4 rounded-full shadow-lg z-50 transition-all duration-200 hover:scale-105"
      >
        <span className="text-xl">💬</span>
      </button>
    );
  }

  return (
    <div
      className={`fixed right-6 bottom-6 top-6 w-96 bg-white dark:bg-neutral-800 rounded-lg shadow-2xl border border-neutral-200 dark:border-neutral-700 z-50 flex flex-col transition-all duration-300 ${
        isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center space-x-2">
          <span className="text-primary-500">💡</span>
          <h3 className="font-semibold text-neutral-800 dark:text-neutral-100">AI Learning Assistant</h3>
        </div>
        <button
          onClick={onToggle}
          className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation.length === 0 && (
          <div className="text-center text-neutral-500 py-8">
            <span className="text-3xl mx-auto mb-2 opacity-50 block">💬</span>
            <p className="text-sm">Ask me anything about this resource!</p>
            <div className="mt-4 space-y-2 text-xs">
              <button 
                onClick={() => setQuestion("What are the key concepts in this article?")}
                className="block w-full text-left p-2 rounded bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
              >
                What are the key concepts?
              </button>
              <button 
                onClick={() => setQuestion("How can I apply this to my own PAI project?")}
                className="block w-full text-left p-2 rounded bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
              >
                How can I apply this?
              </button>
            </div>
          </div>
        )}
        
        {conversation.map((message, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg transition-all duration-200 ${
              message.type === 'user'
                ? 'bg-primary-100 dark:bg-primary-900/30 ml-4'
                : 'bg-neutral-100 dark:bg-neutral-700 mr-4'
            }`}
          >
            <p className="text-sm text-neutral-700 dark:text-neutral-300">{message.content}</p>
          </div>
        ))}
        
        {isProcessing && (
          <div className="bg-neutral-100 dark:bg-neutral-700 mr-4 p-3 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="animate-spin w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full"></div>
              <span className="text-sm text-neutral-600 dark:text-neutral-400">Thinking...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-neutral-200 dark:border-neutral-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAskQuestion()}
            placeholder="Ask a question about this resource..."
            className="flex-1 px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
          />
          <button
            onClick={handleAskQuestion}
            disabled={!question.trim() || isProcessing}
            className="px-4 py-2 bg-primary-500 hover:bg-primary-600 disabled:bg-neutral-400 text-white rounded-lg text-sm transition-colors"
          >
            Ask
          </button>
        </div>
      </div>
    </div>
  );
};

// Smart Whiteboard Component
const SmartWhiteboard = ({ isOpen, onToggle }) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-4 bg-white dark:bg-neutral-800 rounded-lg shadow-2xl border border-neutral-200 dark:border-neutral-700 z-40 flex flex-col transition-all duration-300 ${
        isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center space-x-2">
          <span>⭐</span>
          <h3 className="font-semibold text-neutral-800 dark:text-neutral-100">Smart Whiteboard</h3>
          <span className="text-xs text-neutral-500 bg-neutral-100 dark:bg-neutral-700 px-2 py-1 rounded">
            Draw diagrams, take notes, visualize concepts
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            className="p-2 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded transition-colors"
            title="Clear whiteboard"
          >
            ↻
          </button>
          <button
            onClick={onToggle}
            className="p-2 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded transition-colors"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-neutral-50 dark:bg-neutral-900 relative">
        <div className="text-center text-neutral-500">
          <span className="text-4xl block mb-2">⭐</span>
          <h3 className="text-lg font-medium mb-2">Interactive Whiteboard</h3>
          <p className="text-sm">Excalidraw integration coming soon!</p>
          <p className="text-xs mt-2 opacity-75">This will allow you to draw diagrams, take notes, and visualize concepts while learning.</p>
        </div>
      </div>
    </div>
  );
};

// Reading Progress Component
const ReadingProgress = ({ progress }) => (
  <div className="sticky top-0 z-30 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm border-b border-neutral-200 dark:border-neutral-700 transition-all duration-300">
    <div className="max-w-4xl mx-auto px-4 py-3">
      <div className="flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-400">
        <span>Reading Progress</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2 mt-2 overflow-hidden">
        <div
          className="bg-primary-500 h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  </div>
);

// Enhanced MDX Components
const createEnhancedMDXComponents = (onConceptClick) => ({
  pre: CustomCodeBlock,
  h2: ({ children, ...props }) => (
    <h2
      className="group transition-all duration-200"
      {...props}
    >
      {children}
      <button
        onClick={() => onConceptClick(children)}
        className="ml-2 opacity-0 group-hover:opacity-100 text-primary-500 hover:text-primary-600 transition-opacity"
        title="Add to whiteboard"
      >
        <span className="inline text-sm">→</span>
      </button>
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="group transition-all duration-200"
      {...props}
    >
      {children}
      <button
        onClick={() => onConceptClick(children)}
        className="ml-2 opacity-0 group-hover:opacity-100 text-primary-500 hover:text-primary-600 transition-opacity"
        title="Add to whiteboard"
      >
        <span className="inline text-sm">→</span>
      </button>
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p className="transition-opacity duration-200" {...props}>
      {children}
    </p>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-4 border-primary-500 bg-primary-50/50 dark:bg-primary-900/20 p-4 my-6 rounded-r-lg relative group transition-all duration-200"
      {...props}
    >
      <span className="absolute top-4 right-4 text-primary-500">💡</span>
      {children}
    </blockquote>
  ),
});

export default function EnhancedResourceArticlePage({ source, frontmatter }) {
  const [readingProgress, setReadingProgress] = useState(0);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [isWhiteboardOpen, setIsWhiteboardOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [highlightedText, setHighlightedText] = useState([]);
  const articleRef = useRef(null);

  // Calculate reading progress
  useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current) return;
      
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleConceptClick = (concept) => {
    console.log('Adding concept to whiteboard:', concept);
    // In a real implementation, this would add the concept to the Excalidraw canvas
  };

  const components = createEnhancedMDXComponents(handleConceptClick);

  if (!frontmatter) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h1 className="text-4xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">Resource Not Found</h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
          The learning resource you're looking for doesn't exist or may have been moved.
        </p>
        <Link href="/paiTraining#trainer-resources" 
          className="inline-flex items-center px-6 py-3 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-semibold transition-colors duration-300">
            <span className="mr-2">←</span>
            Go Back to PAI Training
        </Link>
      </div>
    );
  }

  const pageTitle = `${frontmatter.title} | PAI Learning Resource`;
  const metaDescription = frontmatter.description || frontmatter.title;
  const metaKeywords = frontmatter.tags ? frontmatter.tags.join(', ') : '';

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        {metaKeywords && <meta name="keywords" content={metaKeywords} />}
      </Head>

      <ReadingProgress progress={readingProgress} />

      {/* Learning Toolbar */}
      <div className="fixed top-20 right-6 z-40 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 p-2 space-y-2 transition-all duration-300">
        <button
          onClick={() => setIsWhiteboardOpen(true)}
          className="flex items-center space-x-2 w-full p-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded transition-colors"
          title="Open Whiteboard"
        >
          ⭐
          <span>Whiteboard</span>
        </button>
        <button
          onClick={() => setIsAIAssistantOpen(!isAIAssistantOpen)}
          className="flex items-center space-x-2 w-full p-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded transition-colors"
          title="AI Assistant"
        >
          <span className="text-primary-500">💬</span>
          <span>AI Help</span>
        </button>
        <button
          className="flex items-center space-x-2 w-full p-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded transition-colors"
          title="Bookmark"
        >
          <span className="text-primary-500">🔖</span>
          <span>Bookmark</span>
        </button>
      </div>

      <div className="bg-neutral-50 dark:bg-neutral-900 min-h-screen">
        <article ref={articleRef} className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          {/* Enhanced Header */}
          <header className="mb-12 border-b border-neutral-200 dark:border-neutral-700 pb-8 transition-all duration-300">
            <div className="mb-6">
              <Link href="/paiTraining#trainer-resources" 
                className="inline-flex items-center text-sm text-primary-600 dark:text-primary-400 hover:underline mb-4 group">
                <span className="mr-2 group-hover:-translate-x-1 transition-transform duration-200">←</span>
                Back to PAI Training Resources
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
                  {frontmatter.duration && (
                    <div className="flex items-center">
                      <span className="mr-2 text-lg text-primary-500">⏱</span>
                      <span className="font-medium">{frontmatter.duration}</span>
                    </div>
                  )}
                </div>

                {/* Learning Objectives */}
                {frontmatter.objectives && (
                  <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4 mb-6 transition-all duration-300">
                    <h3 className="font-semibold text-primary-800 dark:text-primary-200 mb-2 flex items-center">
                      <span className="mr-2">🎯</span>
                      Learning Objectives
                    </h3>
                    <ul className="text-sm text-primary-700 dark:text-primary-300 space-y-1">
                      {frontmatter.objectives.map((objective, index) => (
                        <li key={index} className="flex items-center">
                          <span className="mr-2 text-primary-500">🏆</span>
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

            {/* Learning Completion */}
            <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-6 transition-all duration-300">
              <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-4 flex items-center">
                ⭐
                Complete Your Learning
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="flex items-center justify-center space-x-2 p-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors">
                  <span className="text-primary-500">🔖</span>
                  <span>Save Resource</span>
                </button>
                <button className="flex items-center justify-center space-x-2 p-3 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded-lg transition-colors">
                  <span className="text-primary-500">🔗</span>
                  <span>Share Notes</span>
                </button>
                <button className="flex items-center justify-center space-x-2 p-3 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded-lg transition-colors">
                  <span className="text-primary-500">💾</span>
                  <span>Export Summary</span>
                </button>
              </div>
            </div>
          </footer>
        </article>
      </div>

      {/* AI Learning Assistant */}
      <AILearningAssistant
        isOpen={isAIAssistantOpen}
        onToggle={() => setIsAIAssistantOpen(!isAIAssistantOpen)}
        content={source}
      />

      {/* Smart Whiteboard */}
      {isWhiteboardOpen && (
        <SmartWhiteboard
          isOpen={isWhiteboardOpen}
          onToggle={() => setIsWhiteboardOpen(false)}
        />
      )}
    </>
  );
}

export async function getStaticPaths() {
  const slugs = getAllResourceSlugs();
  const paths = slugs.map((slug) => ({
    params: { slug },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const articleData = await getResourceBySlug(params.slug);
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