import React from "react";
import Head from "next/head";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote";
import { getPostBySlug, getAllPosts } from "@/lib/api";
import { format } from "date-fns";
import { BiArrowBack, BiTime, BiUser, BiTag, BiBook } from "react-icons/bi";
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
        href="/research"
        className="inline-block mt-4 px-6 py-3 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors"
      >
        Return to Research
      </Link>
    </div>
  );
}

// Custom Error Hook
function useErrorHandler() {
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) {
      console.error("Research Post Error:", error);
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
  code: ({ children, className, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : '';
    
    if (language) {
      return (
        <SyntaxHighlighter
          style={atomDark}
          language={language}
          PreTag="div"
          className="rounded-lg"
          customStyle={{
            padding: '1.5rem',
            fontSize: '0.9rem',
            lineHeight: '1.5',
          }}
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      );
    }

    // Inline code
    return (
      <code
        className="px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-800 text-sm font-mono text-primary-600 dark:text-primary-400"
        {...props}
      >
        {children}
      </code>
    );
  },
  
  // Enhanced list components
  ul: (props) => <ul {...props} className="mb-6 space-y-2" />,
  ol: (props) => <ol {...props} className="mb-6 space-y-2 list-decimal list-inside" />,
  li: (props) => <li {...props} className="text-xl leading-relaxed text-neutral-700 dark:text-neutral-300" />,
  
  // Enhanced blockquote
  blockquote: (props) => (
    <blockquote
      {...props}
      className="border-l-4 border-primary-500 pl-6 my-8 italic text-xl text-neutral-600 dark:text-neutral-400"
    />
  ),
  
  // Enhanced table components
  table: (props) => (
    <div className="overflow-x-auto my-8">
      <table {...props} className="min-w-full border border-neutral-200 dark:border-neutral-700" />
    </div>
  ),
  th: (props) => (
    <th
      {...props}
      className="px-4 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-left font-semibold"
    />
  ),
  td: (props) => (
    <td
      {...props}
      className="px-4 py-2 border border-neutral-200 dark:border-neutral-700"
    />
  ),
  
  // Enhanced link component
  a: (props) => (
    <a
      {...props}
      className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 underline"
    />
  ),
  
  // Enhanced image component
  img: (props) => (
    <img
      {...props}
      className="rounded-lg shadow-lg max-w-full h-auto mx-auto"
    />
  ),
};

export default function ResearchPost({ post }) {
  const router = useRouter();
  const [error, setError] = useErrorHandler();

  // Create title string once
  const pageTitle = post?.frontmatter?.title
    ? `${post.frontmatter.title} - Research | Univault`
    : "Research - Univault";

  // Handle loading state
  if (router.isFallback) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-xl text-neutral-600 dark:text-neutral-400">
            Loading research content...
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
            Research Content Not Found
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8">
            The research content you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/research"
              className="px-6 py-3 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors"
            >
              Return to Research
            </Link>
            <Link
              href="/paiTraining"
              className="px-6 py-3 rounded-lg bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-300 font-medium transition-colors"
            >
              Browse PAI Training
            </Link>
          </div>
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
            content={post?.frontmatter?.excerpt || "Read our latest research content"}
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
                <div className="flex items-center mb-4">
                  <BiBook className="w-6 h-6 text-primary-400 mr-2" />
                  <span className="text-primary-400 font-medium">Research Content</span>
                </div>
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
          {/* Back Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link
              href="/research"
              className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400"
            >
              <BiArrowBack className="w-5 h-5" />
              <span>Back to Research</span>
            </Link>
            <Link
              href="/paiTraining"
              className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400"
            >
              <BiBook className="w-5 h-5" />
              <span>PAI Training Hub</span>
            </Link>
          </div>

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
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/research"
                  className="px-6 py-3 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors"
                >
                  Explore More Research
                </Link>
                <Link
                  href="/paiTraining"
                  className="px-6 py-3 rounded-lg bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-300 font-medium transition-colors"
                >
                  Continue PAI Training
                </Link>
              </div>
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