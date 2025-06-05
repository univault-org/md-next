import Head from 'next/head';
import { MDXRemote } from 'next-mdx-remote';
import { getAllInspirationSlugs, getInspirationBySlug } from '@/lib/api';
import { BiUser, BiCalendar, BiTime, BiArrowBack } from 'react-icons/bi';
import Link from 'next/link';
import { Highlight, themes } from 'prism-react-renderer';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const CustomCodeBlock = ({ children }) => {
  const { theme: activeTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // children is expected to be the <code /> element
  const codeProps = children.props;
  const language = (codeProps.className || '').replace('language-', '') || 'plaintext';
  const codeString = codeProps.children.trim();

  const prismTheme = activeTheme === 'dark' ? themes.oneDark : themes.oneLight;
  
  if (!mounted) {
    // Fallback for SSR/initial mount to avoid FOUC
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
          // Ensure our custom pre styles don't get hidden if blockClassName from Highlight has display:none or similar
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

// Custom components for MDX
const components = {
  pre: CustomCodeBlock, // Only override pre
  // Inline code will now use Tailwind Typography's default styling via prose-code: classes
  // You can add more custom components here, for example:
  // p: (props) => <p className="my-6 text-lg leading-relaxed" {...props} />,
  // blockquote: (props) => <blockquote className="my-6 p-4 border-l-4 border-primary-500 bg-primary-50 dark:bg-neutral-800 text-lg italic" {...props} />,
};

export default function InspirationArticlePage({ source, frontmatter }) {
  if (!frontmatter) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h1 className="text-4xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">Article Not Found</h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
          The inspiration article you're looking for doesn't exist or may have been moved.
        </p>
        <Link href="/paiTraining#trainer-resources" 
          className="inline-flex items-center px-6 py-3 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-semibold transition-colors duration-300">
            <BiArrowBack className="mr-2" />
          Go Back to PAI Training
        </Link>
      </div>
    );
  }

  const pageTitle = `${frontmatter.title} | PAI Training Inspiration`;
  const metaDescription = frontmatter.description || frontmatter.title;
  const metaKeywords = frontmatter.tags ? frontmatter.tags.join(', ') : '';

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        {metaKeywords && <meta name="keywords" content={metaKeywords} />}
      </Head>

      <div className="bg-neutral-50 dark:bg-neutral-900 min-h-screen">
        <article className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <header className="mb-12 border-b border-neutral-200 dark:border-neutral-700 pb-8">
            <div className="mb-6">
              <Link href="/paiTraining#trainer-resources" 
                className="inline-flex items-center text-sm text-primary-600 dark:text-primary-400 hover:underline mb-4 group">
                <BiArrowBack className="mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
                Back to PAI Training Resources
              </Link>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 mb-6 leading-tight">
              {frontmatter.title}
            </h1>
            <div className="flex flex-wrap items-center text-base text-neutral-600 dark:text-neutral-400 gap-x-6 gap-y-3">
              {frontmatter.author && (
                <div className="flex items-center">
                  <BiUser className="mr-2 text-lg text-primary-500" />
                  <span className="font-medium">{frontmatter.author}</span>
                </div>
              )}
              {frontmatter.date && (
                <div className="flex items-center">
                  <BiCalendar className="mr-2 text-lg text-primary-500" />
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
                  <BiTime className="mr-2 text-lg text-primary-500" />
                  <span className="font-medium">{frontmatter.duration}</span>
                </div>
              )}
            </div>
          </header>

          {frontmatter.image && (
            <div className="mb-12 aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-xl">
              <img
                src={frontmatter.image}
                alt={`Cover image for ${frontmatter.title}`}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          )}

          {/* Apply Tailwind Typography for MDX content styling, but override pre for custom highlighter */}
          <div className="prose prose-xl dark:prose-invert max-w-none 
                        prose-headings:font-bold prose-headings:text-neutral-800 dark:prose-headings:text-neutral-100 
                        prose-p:text-neutral-700 dark:prose-p:text-neutral-300 prose-p:leading-relaxed
                        prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-a:font-medium hover:prose-a:text-primary-700 dark:hover:prose-a:text-primary-500 prose-a:transition-colors
                        prose-blockquote:border-primary-500 prose-blockquote:bg-primary-50/50 dark:prose-blockquote:bg-neutral-800/50 prose-blockquote:text-neutral-700 dark:prose-blockquote:text-neutral-300 prose-blockquote:p-4 prose-blockquote:rounded-lg prose-blockquote:shadow-sm
                        prose-ul:list-disc prose-ul:ml-1 prose-ul:space-y-1 marker:text-primary-500
                        prose-ol:list-decimal prose-ol:ml-1 prose-ol:space-y-1 marker:text-primary-500
                        prose-code:text-primary-600 prose-code:dark:text-primary-400 prose-code:bg-neutral-100 prose-code:dark:bg-neutral-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:text-sm
                        prose-hr:border-neutral-300 dark:prose-hr:border-neutral-700 prose-hr:my-12
                        prose-pre:hidden /* Hide default pre styling as CustomCodeBlock handles it */
                        ">
            <MDXRemote {...source} components={components} />
          </div>
          
          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <footer className="mt-16 pt-10 border-t border-neutral-300 dark:border-neutral-700">
              <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4">Tags:</h3>
              <div className="flex flex-wrap gap-3">
                {frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 text-sm font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </footer>
          )}
        </article>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const slugs = getAllInspirationSlugs();
  const paths = slugs.map((slug) => ({
    params: { slug },
  }));
  return {
    paths,
    fallback: false, // Changed to blocking for better UX on new articles
  };
}

export async function getStaticProps({ params }) {
  const articleData = await getInspirationBySlug(params.slug);
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
    // revalidate: 60, // Optional: Revalidate the page every 60 seconds
  };
} 