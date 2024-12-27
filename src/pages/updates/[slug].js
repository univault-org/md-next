import React from "react";
import Head from "next/head";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote";
import { getPostBySlug, getAllPosts } from "@/lib/api";
import { format } from "date-fns";
import { BiArrowBack, BiTime, BiUser, BiTag } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { parseISO } from "date-fns";
import 'katex/dist/katex.min.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

// Error Fallback Component
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="text-center py-12">
      <p className="text-xl text-neutral-600 dark:text-neutral-400">
        Something went wrong loading this content.
      </p>
      <Link
        href="/updates"
        className="inline-block mt-4 px-6 py-3 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors"
      >
        Return to Updates
      </Link>
    </div>
  );
}

// Custom Error Hook
function useErrorHandler() {
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) {
      console.error("Post Error:", error);
    }
  }, [error]);

  return [error, setError];
}

// Enhanced custom components for MDX
const components = {
  h1: (props) => <h1 {...props} className="text-5xl font-bold mt-12 mb-6" />,
  h2: (props) => <h2 {...props} className="text-4xl font-bold mt-10 mb-5" />,
  h3: (props) => <h3 {...props} className="text-3xl font-bold mt-8 mb-4" />,
  p: (props) => {
    const isImageOnly =
      React.Children.count(props.children) === 1 &&
      React.isValidElement(props.children) &&
      props.children.type === "img";

    const hasMath = 
      typeof props.children === 'string' && 
      (props.children.includes('$$') || props.children.includes('$'));

    if (isImageOnly) {
      return <div className="my-12">{props.children}</div>;
    }

    if (hasMath) {
      return (
        <div
          className="mb-6 text-xl leading-relaxed text-neutral-700 dark:text-neutral-300"
          dangerouslySetInnerHTML={{ __html: props.children }}
        />
      );
    }

    return (
      <p
        {...props}
        className="mb-6 text-xl leading-relaxed text-neutral-700 dark:text-neutral-300"
      />
    );
  },
  
  // Enhanced code block components
  pre: (props) => <div className="my-8 overflow-hidden" {...props} />,
  
  code: ({ className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');
    const lang = match ? match[1] : '';
    const isOm = lang === 'om';
    const fileName = className?.includes(':') ? className.split(':')[1] : null;

    return (
      <div className="relative group rounded-xl overflow-hidden">
        {/* File name header if present */}
        {fileName && (
          <div className="bg-neutral-800 px-4 py-2 text-neutral-400 text-sm font-mono border-b border-neutral-700">
            {fileName}
          </div>
        )}
        
        {/* Language badge */}
        <div className="absolute right-4 top-4 px-2 py-1 text-sm font-mono text-neutral-400 bg-neutral-800/75 rounded-md backdrop-blur-sm">
          {isOm ? 'Om' : lang || 'text'}
        </div>

        <SyntaxHighlighter
          language={isOm ? 'javascript' : (lang || 'text')}
          style={atomDark}
          customStyle={{
            background: isOm ? '#1a1b26' : '#282c34',
            padding: '1.5rem',
            margin: 0,
            borderRadius: fileName ? '0' : '0.75rem',
            fontSize: '0.95rem',
            lineHeight: '1.5',
          }}
          className="font-mono scrollbar-thin scrollbar-thumb-neutral-600 scrollbar-track-neutral-800"
          showLineNumbers={true}
          wrapLines={true}
          {...props}
        >
          {children}
        </SyntaxHighlighter>
      </div>
    );
  },

  // Enhanced inline code
  inlineCode: (props) => (
    <code
      {...props}
      className="px-2 py-1 font-mono text-sm bg-neutral-100 dark:bg-neutral-800 rounded text-primary-600 dark:text-primary-400"
    />
  ),

  img: (props) => <img {...props} className="rounded-xl w-full" />,
  ul: (props) => (
    <ul {...props} className="my-6 space-y-3 list-disc pl-8">
      {props.children}
    </ul>
  ),
  ol: (props) => (
    <ol {...props} className="my-6 space-y-3 list-decimal pl-8">
      {props.children}
    </ol>
  ),
  li: (props) => (
    <li
      {...props}
      className="text-xl leading-relaxed pl-2 text-neutral-700 dark:text-neutral-300"
    >
      {props.children}
    </li>
  ),
  blockquote: (props) => (
    <blockquote
      {...props}
      className="border-l-6 border-primary-500 pl-6 my-8 italic text-2xl text-neutral-600 dark:text-neutral-300"
    />
  ),
  table: (props) => (
    <div className="overflow-x-auto my-12">
      <table
        {...props}
        className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700"
      />
    </div>
  ),
  th: (props) => (
    <th
      {...props}
      className="px-6 py-4 text-left text-lg font-semibold text-neutral-900 dark:text-neutral-100 bg-neutral-50 dark:bg-neutral-800"
    />
  ),
  td: (props) => (
    <td
      {...props}
      className="px-6 py-4 text-lg text-neutral-600 dark:text-neutral-300"
    />
  ),
  math: ({ children }) => (
    <div className="my-4 overflow-x-auto">
      <div dangerouslySetInnerHTML={{ __html: children }} />
    </div>
  ),
  inlineMath: ({ children }) => (
    <span dangerouslySetInnerHTML={{ __html: children }} />
  ),
};

export default function Post({ post }) {
  const router = useRouter();
  const [error, setError] = useErrorHandler();

  // Create title string once
  const pageTitle = post?.frontmatter?.title
    ? `${post.frontmatter.title} - Univault`
    : "Univault";

  // Handle loading state
  if (router.isFallback) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-xl text-neutral-600 dark:text-neutral-400">
            Loading post...
          </p>
        </div>
      </div>
    );
  }

  // Handle 404
  if (!post && !router.isFallback) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
            Post Not Found
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8">
            The post you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/updates"
            className="px-6 py-3 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors"
          >
            Return to Updates
          </Link>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <ErrorFallback error={error} resetErrorBoundary={() => setError(null)} />
    );
  }

  try {
    return (
      <>
        <Head>
          <title>{pageTitle}</title>
          <meta
            name="description"
            content={post?.frontmatter?.excerpt || "Read our latest updates"}
          />
        </Head>

        {/* Hero Section with Image */}
        {post?.frontmatter?.image && (
          <div className="relative h-[60vh] min-h-[500px] w-full">
            <div className="absolute inset-0">
              <img
                src={post?.frontmatter?.image}
                alt={post?.frontmatter?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-12">
              <div className="max-w-5xl mx-auto">
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                  {post?.frontmatter?.title}
                </h1>
                <div className="flex flex-wrap items-center gap-6 text-neutral-200 text-xl">
                  {post?.frontmatter?.date && (
                    <div className="flex items-center gap-2">
                      <BiTime className="w-5 h-5" />
                      <time dateTime={post?.frontmatter?.date}>
                        {format(
                          parseISO(post?.frontmatter?.date), // Use parseISO instead of new Date()
                          "MMMM d, yyyy"
                        )}
                      </time>
                    </div>
                  )}
                  {post?.frontmatter?.author && (
                    <div className="flex items-center gap-2">
                      <BiUser className="w-5 h-5" />
                      <span>{post?.frontmatter?.author}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <article className="max-w-5xl mx-auto px-6 py-20">
          {/* Back to Updates */}
          <Link
            href="/updates"
            className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400 mb-8"
          >
            <BiArrowBack className="w-5 h-5" />
            <span>Back to Updates</span>
          </Link>

          {/* Tags */}
          {post?.frontmatter?.tags && post?.frontmatter?.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              <BiTag className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
              {post?.frontmatter?.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Main Content */}
          <div className="prose prose-xl dark:prose-invert prose-neutral max-w-none prose-headings:font-bold prose-p:text-xl prose-p:leading-relaxed prose-li:text-xl prose-img:rounded-xl">
            <MDXRemote {...post?.source} components={components} />
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-700">
            <div className="flex flex-col md:flex-row justify-end items-center gap-4">
              <Link
                href="/updates"
                className="px-6 py-3 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors"
              >
                Read More Articles
              </Link>
            </div>
          </footer>
        </article>
      </>
    );
  } catch (err) {
    setError(err);
    return null;
  }
}

export async function getStaticProps({ params }) {
  try {
    const post = await getPostBySlug(params.slug);
    if (!post) {
      return {
        notFound: true,
      };
    }

    // Add special handling for math content
    if (post.source && post.source.compiledSource) {
      // Ensure math expressions are properly escaped
      post.source.compiledSource = post.source.compiledSource
        .replace(/\\\[/g, '$$')
        .replace(/\\\]/g, '$$')
        .replace(/\\\(/g, '$')
        .replace(/\\\)/g, '$');
    }

    return {
      props: {
        post: JSON.parse(JSON.stringify(post)),
      },
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths() {
  try {
    const posts = getAllPosts();
    return {
      paths: posts.map((post) => ({
        params: {
          slug: post.slug,
        },
      })),
      fallback: false,
    };
  } catch (error) {
    console.error("Error in getStaticPaths:", error);
    return {
      paths: [],
      fallback: false,
    };
  }
}
