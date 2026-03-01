import Head from 'next/head'
import { getMDXContent } from '@/lib/api'
import { BiTestTube, BiShield, BiHeart, BiWorld } from 'react-icons/bi'

export default function About() {
  return (
    <>
      <Head>
        <title>About Univault — The Tool and The Network</title>
        <meta name="description" content="Univault builds BAGLE (the encoder) and ParagonDAO (the governance network). The lab equipment and the peer review board for the health economy." />
      </Head>

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-neutral-800 to-neutral-600 dark:from-neutral-100 dark:to-neutral-300">
            About Univault
          </h1>
          <p className="text-xl md:text-2xl text-center text-neutral-600 dark:text-neutral-300">
            We build the tool and the network for the health economy.
          </p>
        </div>
      </section>

      {/* Why We Exist */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-neutral-800 dark:text-neutral-100">
            Why We Exist
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-4">
            Every health researcher has data that could help patients — but no way to turn it into a product without building an entire company.
            Every patient has health signals their phone could read — but no models trained to interpret them.
          </p>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Univault exists to close that gap. We built the universal encoder that turns any health signal into math,
            and the governance network that ensures the math is accurate before patients depend on it.
          </p>
        </div>
      </section>

      {/* Two Products */}
      <section className="max-w-4xl mx-auto px-4 py-16 bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl">
        <h2 className="text-3xl font-bold mb-12 text-center text-neutral-800 dark:text-neutral-100">
          Two Products. One Architecture.
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 rounded-xl bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700">
            <div className="w-16 h-16 mx-auto mb-6 text-primary-500 flex items-center justify-center bg-primary-50 dark:bg-neutral-700 rounded-full shadow-md">
              <BiTestTube className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-center text-neutral-800 dark:text-neutral-100">
              BAGLE
            </h3>
            <p className="text-center text-lg font-medium text-primary-600 dark:text-primary-400 mb-4">
              The Lab Equipment
            </p>
            <p className="text-neutral-600 dark:text-neutral-400">
              Brain-AI General Learning Encoder. The universal health signal encoder powered by DCT-II frequency-domain processing.
              Any signal in — breathing, cardiac, EEG, voice, molecular sensors — 128 coefficients out.
              Builders train classifiers on those coefficients. The encoder does the hard math.
              6 models published. API opens April 2026.
            </p>
          </div>

          <div className="p-8 rounded-xl bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700">
            <div className="w-16 h-16 mx-auto mb-6 text-primary-500 flex items-center justify-center bg-primary-50 dark:bg-neutral-700 rounded-full shadow-md">
              <BiShield className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-center text-neutral-800 dark:text-neutral-100">
              ParagonDAO
            </h3>
            <p className="text-center text-lg font-medium text-primary-600 dark:text-primary-400 mb-4">
              The Peer Review Board
            </p>
            <p className="text-neutral-600 dark:text-neutral-400">
              The governance network that validates health models before patients rely on them.
              Certifies builders. Ensures quality. Manages the security layer (HF-Auth continuous authentication).
              10% of all network fees fund one mission: preventing loss of life.
              Published whitepapers, open standard.
            </p>
          </div>
        </div>

        <div className="mt-8 p-6 rounded-xl bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 text-center">
          <p className="text-lg text-neutral-700 dark:text-neutral-300">
            <strong>Why both?</strong> Because the tool without governance is dangerous — unvalidated health models loose in the world.
            And the governance without the tool is just a committee with nothing to govern.
          </p>
        </div>
      </section>

      {/* The Model */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center text-neutral-800 dark:text-neutral-100">
          The Builder Economy
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              icon: <BiWorld className="w-8 h-8" />,
              title: "Not One Company with 1,000 Employees",
              description: "Thousands of founders building on one protocol. Each brings domain expertise in their health vertical. The encoder handles the math. ParagonDAO validates the quality."
            },
            {
              icon: <BiHeart className="w-8 h-8" />,
              title: "The Mission Fund",
              description: "10% of all network fees fund crisis detection, community health screening, and free GLE access for crisis organizations. 988 suicide prevention. Community health workers. The reason the network exists."
            }
          ].map((item, index) => (
            <div key={index} className="p-8 rounded-xl bg-white dark:bg-neutral-800 shadow-md">
              <div className="w-12 h-12 mb-4 text-primary-500 flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-neutral-800 dark:text-neutral-100">
                {item.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-4 text-center text-neutral-800 dark:text-neutral-100">
          The Team
        </h2>
        <p className="text-center mb-12 text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          A husband-and-wife research team building the infrastructure for population-scale health AI.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Philip */}
          <div className="p-8 rounded-xl bg-white dark:bg-neutral-800 border-2 border-primary-200 dark:border-primary-800 shadow-md">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100">
                Philip Phuong Tran
              </h3>
              <p className="text-sm font-semibold text-primary-600 dark:text-primary-400 mt-1">
                Founder &amp; CEO
              </p>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              Architect of the GLE (General Learning Encoder) framework and the subject invariance methodology.
              Named inventor on the GLE patent application (rights assigned to Univault Technologies LLC).
              Based in Salt Lake City, Utah.
            </p>
            <div className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-700/50 border border-neutral-200 dark:border-neutral-600">
              <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                Applied Mathematics &amp; Signal Processing
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                Master&apos;s in Mathematics and Statistics. Former lecturer at California State University.
                GLE&apos;s DCT-II frequency-domain architecture is grounded in this mathematical foundation.
              </p>
            </div>
          </div>

          {/* Anh */}
          <div className="p-8 rounded-xl bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 shadow-md">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100">
                Anh T Do, PhD
              </h3>
              <p className="text-sm font-semibold text-primary-600 dark:text-primary-400 mt-1">
                Co-founder &amp; Research Director
              </p>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              PhD researcher. Lead author of <em>Tín Hiệu và Hệ Thống</em> (Signals and Systems),
              a signal and control theory textbook for Hanoi University of Science and Technology (HUST),
              Vietnam&apos;s leading engineering institution.
              Based in Salt Lake City, Utah.
            </p>
            <div className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-700/50 border border-neutral-200 dark:border-neutral-600">
              <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                Signal &amp; Control Theory
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                Her academic foundation in signal processing directly underpins GLE&apos;s
                convex optimization methods for subject-invariant biosignal encoding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Research Foundation */}
      <section className="max-w-4xl mx-auto px-4 py-16 bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-neutral-800 dark:text-neutral-100">
          Research Foundation
        </h2>
        <p className="text-center mb-8 text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
          Everything we build is grounded in published research and verified benchmarks.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "GLE Encoder",
              stat: "Over 13× improvement",
              desc: "over next best team at NeurIPS 2025 EEG Foundation Model Challenge — over a thousand competing teams"
            },
            {
              title: "Breathing Biometrics",
              stat: "96.8% accuracy",
              desc: "identification across 97 participants using nasal airflow patterns alone"
            },
            {
              title: "Patent Portfolio",
              stat: "2 provisionals filed",
              desc: "GLE universal encoder + piezoelectric textile biosignal system with continuous authentication"
            }
          ].map((item, index) => (
            <div key={index} className="text-center p-6 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
              <h4 className="font-semibold mb-2 text-neutral-800 dark:text-neutral-100">{item.title}</h4>
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-2">{item.stat}</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">{item.desc}</p>
            </div>
          ))}
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
