import { getMDXContent } from '@/lib/api'
import { MDXRemote } from 'next-mdx-remote'
import DeclarationLayout from '@/components/layout/DeclarationLayout'

export default function Declaration({ source, frontmatter }) {
  return (
    <DeclarationLayout>
      <div className="prose dark:prose-invert max-w-none">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{frontmatter.title}</h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400">
            {frontmatter.subtitle}
          </p>
        </header>
        
        <MDXRemote {...source} />
        
        <footer className="mt-12 text-center text-neutral-600 dark:text-neutral-400">
          <p className="italic">{frontmatter.author}</p>
          <p>Univault.org</p>
        </footer>
      </div>
    </DeclarationLayout>
  )
}

export async function getStaticProps() {
  const { source, frontmatter } = await getMDXContent('declaration/preamble.md')
  
  return {
    props: {
      source,
      frontmatter
    }
  }
}