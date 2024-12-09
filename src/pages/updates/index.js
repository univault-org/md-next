import Head from "next/head";
import Link from "next/link";
import { getAllPosts } from "@/lib/api";
import { parseISO, format } from 'date-fns' 

export default function Updates({ posts }) {
  return (
    <>
      <Head>
        <title>News & Updates - Univault</title>
        <meta
          name="description"
          content="Latest news, research updates, and announcements from Univault"
        />
      </Head>

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-neutral-800 to-neutral-600 dark:from-neutral-100 dark:to-neutral-300">
            News & Updates
          </h1>
          <p className="text-2xl md:text-3xl text-center text-neutral-600 dark:text-neutral-300">
            Latest developments in personal data sovereignty
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/updates/${post.slug}`}
              className="group"
            >
              <article className="p-6 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 hover:border-primary-500 dark:hover:border-primary-500 transition-colors">
                {post.image && (
                  <div className="aspect-video mb-4 rounded-lg overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      {format(parseISO(post.date), "MMMM d, yyyy")}
                    </p>
                    {post.author && (
                      <>
                        <span className="text-neutral-400">•</span>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                          {post.author}
                        </p>
                      </>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 group-hover:text-primary-500 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {post.excerpt}
                  </p>
                  {post.tags && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-sm rounded-full bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();

  return {
    props: {
      posts: posts || [],
    },
  };
}
