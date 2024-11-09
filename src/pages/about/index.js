import Head from 'next/head'
import { getMDXContent } from '@/lib/api'
import { BiGroup, BiAtom, BiShield, BiWorld } from 'react-icons/bi'

export default function About({ source, frontmatter = {} }) {
  const {
    title = 'About Univault',
    subtitle = 'Pioneering Digital Identity Sovereignty',
    description = `We're building the foundation for personal data sovereignty in the AI era`
  } = frontmatter

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-neutral-800 to-neutral-600 dark:from-neutral-100 dark:to-neutral-300">
            {title}
          </h1>
          <p className="text-2xl md:text-3xl text-center text-neutral-600 dark:text-neutral-300">
            {subtitle}
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-neutral-800 dark:text-neutral-100">
            Our Mission
          </h2>
          <p className="text-2xl text-neutral-600 dark:text-neutral-400">
            At Univault, we're pioneering the future of personal data sovereignty in the age of artificial intelligence. 
            We believe that every individual should have complete control over their digital identity, just as they have 
            autonomy over their physical selves.
          </p>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="max-w-4xl mx-auto px-4 py-16 bg-neutral-50 dark:bg-neutral-800/50">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/3">
            <div className="w-24 h-24 mx-auto text-primary-500 flex items-center justify-center bg-white dark:bg-neutral-700 rounded-full shadow-md">
              <BiGroup className="w-12 h-12" />
            </div>
          </div>
          <div className="md:w-2/3">
            <h2 className="text-3xl font-bold mb-6 text-neutral-800 dark:text-neutral-100">
              Who We Are
            </h2>
            <p className="text-2xl text-neutral-600 dark:text-neutral-400">
              We are a collective of researchers, technologists, and digital rights advocates working 
              to create a universal standard for personal data management. Our team is united by the belief 
              that personal data sovereignty is a fundamental right in the digital age.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center text-neutral-800 dark:text-neutral-100">
          What We Do
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Research & Development */}
          <div className="p-8 rounded-xl border-2 border-neutral-200 dark:border-neutral-700">
            <div className="w-16 h-16 mx-auto mb-6 text-primary-500 flex items-center justify-center bg-white dark:bg-neutral-700 rounded-full shadow-md">
              <BiAtom className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-center text-neutral-800 dark:text-neutral-100">
              Research & Development
            </h3>
            <ul className="space-y-3 text-xl text-neutral-600 dark:text-neutral-400">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Universal access to personal data for AI training
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Secure data storage and processing
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Individual control over data sharing
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Long-term preservation of digital identity
              </li>
            </ul>
          </div>

          {/* Digital Rights Advocacy */}
          <div className="p-8 rounded-xl border-2 border-neutral-200 dark:border-neutral-700">
            <div className="w-16 h-16 mx-auto mb-6 text-primary-500 flex items-center justify-center bg-white dark:bg-neutral-700 rounded-full shadow-md">
              <BiShield className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-center text-neutral-800 dark:text-neutral-100">
              Digital Rights Advocacy
            </h3>
            <ul className="space-y-3 text-xl text-neutral-600 dark:text-neutral-400">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Data Ownership
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Privacy Protection
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Security Standards
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Access Rights
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Core Principles Section */}
      <section className="max-w-4xl mx-auto px-4 py-16 bg-neutral-50 dark:bg-neutral-800/50">
        <h2 className="text-3xl font-bold mb-12 text-center text-neutral-800 dark:text-neutral-100">
          Core Principles
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: "Ownership",
              description: "We believe personal data belongs to individuals, giving them complete control over how it's used, shared, and preserved."
            },
            {
              title: "Privacy",
              description: "Like DNA passed through generations, personal data carries unique information that defines us and must be protected accordingly."
            },
            {
              title: "Security",
              description: "We implement robust security measures to protect personal data at every stage—from generation to storage."
            },
            {
              title: "Universal Access",
              description: "We ensure personal data can be accessed securely by authorized AI systems and services while maintaining individual control."
            }
          ].map((principle, index) => (
            <div key={index} className="p-8 rounded-xl bg-white dark:bg-neutral-800 shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-neutral-800 dark:text-neutral-100">
                {principle.title}
              </h3>
              <p className="text-xl text-neutral-600 dark:text-neutral-400">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Join Our Mission Section */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6 text-neutral-800 dark:text-neutral-100">
          Join Our Mission
        </h2>
        <p className="text-2xl mb-8 text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
          We're building more than technology—we're creating a new paradigm for personal data management in the AI era.
        </p>
        <div className="inline-flex gap-4">
          <a
            href="https://github.com/univault-org"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors"
          >
            Join on GitHub
          </a>
        </div>
      </section>
    </>
  )
}

export async function getStaticProps() {
  try {
    const { source, frontmatter } = await getMDXContent('about.md')
    return {
      props: {
        source,
        frontmatter: frontmatter || {},
      },
    }
  } catch (error) {
    console.error('Error loading about content:', error)
    return {
      props: {
        source: null,
        frontmatter: {},
      },
    }
  }
}
