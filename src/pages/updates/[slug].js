import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote'
import { getPostBySlug, getAllPosts } from '@/lib/api'
import { format } from 'date-fns'
import { BiArrowBack, BiTime, BiUser, BiTag } from 'react-icons/bi'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

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
  )
}

// Custom Error Hook
function useErrorHandler() {
  const [error, setError] = useState(null)
  
  useEffect(() => {
    if (error) {
      console.error('Post Error:', error)
    }
  }, [error])

  return [error, setError]
}

// Custom components for MDX
const components = {
  h1: (props) => <h1 {...props} className="text-5xl font-bold mt-12 mb-6" />,
  h2: (props) => <h2 {...props} className="text-4xl font-bold mt-10 mb-5" />,
  h3: (props) => <h3 {...props} className="text-3xl font-bold mt-8 mb-4" />,
  p: (props) => {
    const isImageOnly = React.Children.count(props.children) === 1 && 
      React.isValidElement(props.children) && 
      props.children.type === 'img'

    if (isImageOnly) {
      return <div className="my-12">{props.children}</div>
    }

    return <p {...props} className="mb-6 text-xl leading-relaxed text-neutral-700 dark:text-neutral-300" />
  },
  img: (props) => (
    <img {...props} className="rounded-xl w-full" />
  ),
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
    <li {...props} className="text-xl leading-relaxed pl-2 text-neutral-700 dark:text-neutral-300">
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
      <table {...props} className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700" />
    </div>
  ),
  th: (props) => (
    <th {...props} className="px-6 py-4 text-left text-lg font-semibold text-neutral-900 dark:text-neutral-100 bg-neutral-50 dark:bg-neutral-800" />
  ),
  td: (props) => (
    <td {...props} className="px-6 py-4 text-lg text-neutral-600 dark:text-neutral-300" />
  ),
}

export default function Post({ post }) {
  const router = useRouter()
  const [error, setError] = useErrorHandler()

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
    )
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
    )
  }

  // Handle error state
  if (error) {
    return <ErrorFallback error={error} resetErrorBoundary={() => setError(null)} />
  }

  try {
    return (
      <>
        <Head>
          <title>{post?.frontmatter?.title || 'Post'} - Univault</title>
          <meta 
            name="description" 
            content={post?.frontmatter?.excerpt || 'Read our latest updates'} 
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
                        {format(new Date(post?.frontmatter?.date), 'MMMM d, yyyy')}
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
    )
  } catch (err) {
    setError(err)
    return null
  }
}

export async function getStaticProps({ params }) {
  try {
    const post = await getPostBySlug(params.slug)
    if (!post) {
      return {
        notFound: true,
      }
    }
    return {
      props: {
        post: JSON.parse(JSON.stringify(post))
      }
    }
  } catch (error) {
    console.error('Error in getStaticProps:', error)
    return {
      notFound: true
    }
  }
}

export async function getStaticPaths() {
  try {
    const posts = getAllPosts()
    return {
      paths: posts.map((post) => ({
        params: {
          slug: post.slug
        }
      })),
      fallback: false
    }
  } catch (error) {
    console.error('Error in getStaticPaths:', error)
    return {
      paths: [],
      fallback: false
    }
  }
}
