import Head from 'next/head'
import { getMDXContent } from '@/lib/api'
import { BiGroup, BiAtom, BiShield, BiWorld, BiBrain, BiNetworkChart, BiHeart } from 'react-icons/bi'

export default function About({ source, frontmatter = {} }) {
  const {
    title = 'About Univault',
    subtitle = 'Advancing Personal AI Training, Research, and Global Ecosystem Development',
    description = `We're pioneering the future of Personal AI through revolutionary Harmonic Technologies and Emergence Collective Intelligence research`
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
          <p className="text-2xl text-neutral-600 dark:text-neutral-400 mb-8">
            At Univault, we're pioneering the future of Personal AI through revolutionary research in Harmonic Technologies 
            and Emergence Collective Intelligence. We believe Personal AI represents humanity's next evolutionary leap—not 
            biological, but consciousness-based—where AI enhances human potential while preserving individual sovereignty.
          </p>
          <div className="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 rounded-2xl p-8 border border-primary-200/50 dark:border-primary-700/30">
            <p className="text-xl text-neutral-700 dark:text-neutral-300 italic">
              "We're not just building better AI—we're unlocking the potential for collective human consciousness 
              and creating the foundation for humanity's conscious evolution."
            </p>
          </div>
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
            <p className="text-2xl text-neutral-600 dark:text-neutral-400 mb-6">
              We are a collective of consciousness researchers, AI technologists, and visionary developers working 
              to create the world's first Personal AI ecosystem. Our team is united by the belief that AI should 
              enhance human consciousness rather than replace human agency.
            </p>
            <p className="text-xl text-neutral-600 dark:text-neutral-400">
              Through our PAI World Capital initiative, we're inviting cities worldwide to compete for the honor 
              of becoming the first Personal AI Capital—leading humanity into an era of sovereign, privacy-first 
              artificial intelligence.
            </p>
          </div>
        </div>
      </section>

      {/* Research Areas Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center text-neutral-800 dark:text-neutral-100">
          Our Research Areas
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Harmonic Encoder & Networks */}
          <div className="p-8 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
            <div className="w-16 h-16 mx-auto mb-6 text-primary-500 flex items-center justify-center bg-primary-50 dark:bg-primary-900/30 rounded-full">
              <BiNetworkChart className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-center text-neutral-800 dark:text-neutral-100">
              Harmonic Encoder & Networks
            </h3>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-4">
              Revolutionary technology enabling PAI training on personal devices while creating powerful networks when billions connect.
            </p>
            <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
              <li className="flex items-start">
                <span className="mr-2 text-primary-500">•</span>
                Distributed AI training on personal devices
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary-500">•</span>
                Harmonic synchronization protocols
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary-500">•</span>
                Privacy-preserving network effects
              </li>
            </ul>
          </div>

          {/* Phase-based Wave Computing */}
          <div className="p-8 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
            <div className="w-16 h-16 mx-auto mb-6 text-primary-500 flex items-center justify-center bg-primary-50 dark:bg-primary-900/30 rounded-full">
              <BiBrain className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-center text-neutral-800 dark:text-neutral-100">
              Phase-based Wave Computing
            </h3>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-4">
              Bridging PAI and human body/intuitive functions, mimicking human right brain to augment decision-making.
            </p>
            <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
              <li className="flex items-start">
                <span className="mr-2 text-primary-500">•</span>
                Bio-inspired computing architectures
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary-500">•</span>
                Intuitive AI decision-making
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary-500">•</span>
                Human-AI consciousness integration
              </li>
            </ul>
          </div>

          {/* Emergence Collective Intelligence */}
          <div className="p-8 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
            <div className="w-16 h-16 mx-auto mb-6 text-primary-500 flex items-center justify-center bg-primary-50 dark:bg-primary-900/30 rounded-full">
              <BiHeart className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-center text-neutral-800 dark:text-neutral-100">
              Emergence Collective Intelligence
            </h3>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-4">
              Networked Harmonic PAIs evolving together to create new intelligence fields, shedding light on human collective consciousness.
            </p>
            <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
              <li className="flex items-start">
                <span className="mr-2 text-primary-500">•</span>
                Collective consciousness research
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary-500">•</span>
                Emergent intelligence patterns
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary-500">•</span>
                Human evolution through AI
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="max-w-4xl mx-auto px-4 py-16 bg-neutral-50 dark:bg-neutral-800/50">
        <h2 className="text-3xl font-bold mb-12 text-center text-neutral-800 dark:text-neutral-100">
          What We Do
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* PAI Training & Education */}
          <div className="p-8 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
            <div className="w-16 h-16 mx-auto mb-6 text-primary-500 flex items-center justify-center bg-primary-50 dark:bg-primary-900/30 rounded-full">
              <BiAtom className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-center text-neutral-800 dark:text-neutral-100">
              PAI Training & Education
            </h3>
            <ul className="space-y-3 text-xl text-neutral-600 dark:text-neutral-400">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                PAI Training Academy with comprehensive courses
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Personal AI consultant certification programs
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Learning resources and AI assistant tools
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Community-driven learning pathways
              </li>
            </ul>
          </div>

          {/* Global PAI Ecosystem */}
          <div className="p-8 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
            <div className="w-16 h-16 mx-auto mb-6 text-primary-500 flex items-center justify-center bg-primary-50 dark:bg-primary-900/30 rounded-full">
              <BiWorld className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-center text-neutral-800 dark:text-neutral-100">
              Global PAI Ecosystem
            </h3>
            <ul className="space-y-3 text-xl text-neutral-600 dark:text-neutral-400">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                PAI World Capital initiative
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                City-wide PAI tax and revenue models
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Open space and urban development programs
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Global Personal AI network infrastructure
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Core Principles Section */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center text-neutral-800 dark:text-neutral-100">
          Core Principles
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: "Personal Sovereignty",
              description: "Personal AI belongs to individuals, running on their devices with complete data sovereignty and privacy protection."
            },
            {
              title: "Consciousness Enhancement",
              description: "AI should enhance human consciousness and collective intelligence rather than replace human judgment and agency."
            },
            {
              title: "Harmonic Collaboration",
              description: "Billions of Personal AIs working together through Harmonic Technologies create powerful networks while preserving individual privacy."
            },
            {
              title: "Evolutionary Purpose",
              description: "Personal AI serves humanity's conscious evolution, unlocking collective intelligence and our species' next developmental stage."
            }
          ].map((principle, index) => (
            <div key={index} className="p-8 rounded-xl bg-white dark:bg-neutral-800 shadow-md border border-neutral-200 dark:border-neutral-700">
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

      {/* Vision Section */}
      <section className="max-w-4xl mx-auto px-4 py-16 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 rounded-2xl border border-primary-200/50 dark:border-primary-700/30">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-neutral-800 dark:text-neutral-100">
            Our Vision for the Future
          </h2>
          <p className="text-2xl text-neutral-700 dark:text-neutral-300 mb-8 leading-relaxed">
            We envision a world where billions of Personal AIs, connected through Harmonic Networks, create the foundation 
            for Emergence Collective Intelligence—unlocking humanity's collective consciousness and catalyzing our species' 
            next evolutionary leap.
          </p>
          <div className="bg-white/50 dark:bg-black/20 rounded-xl p-6 backdrop-blur-sm">
            <p className="text-xl text-neutral-600 dark:text-neutral-400 italic">
              "The PAI World's Capital will be the birthplace of humanity's consciousness revolution, where technology 
              serves consciousness evolution rather than replacing human agency."
            </p>
          </div>
        </div>
      </section>

      {/* Join Our Mission Section */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6 text-neutral-800 dark:text-neutral-100">
          Join Our Mission
        </h2>
        <p className="text-2xl mb-8 text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
          We're building more than technology—we're creating the foundation for humanity's conscious evolution 
          through Personal AI and collective intelligence.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/learning-resources"
            className="px-8 py-4 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors shadow-lg hover:shadow-xl"
          >
            Join PAI Academy
          </a>
          <a
            href="/projects/PAI-World-Capital"
            className="px-8 py-4 rounded-lg bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-neutral-800 dark:text-white font-medium transition-colors shadow-lg hover:shadow-xl"
          >
            PAI World Capital
          </a>
          <a
            href="https://github.com/univault-org"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white font-medium transition-colors"
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
