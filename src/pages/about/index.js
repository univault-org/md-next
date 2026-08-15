import Head from "next/head";
import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";

export default function About() {
  return (
    <>
      <Head>
        <title>About | Univault Technologies</title>
        <meta
          name="description"
          content="Univault Technologies is an AI research company in Salt Lake City, Utah. We build AI infrastructure that knows when it can't answer, and help teams apply it to real work."
        />
        <meta property="og:title" content="About | Univault Technologies" />
        <meta
          property="og:description"
          content="An AI research company built on one conviction: AI you can rely on must know when it can't answer."
        />
        <meta property="og:url" content="https://univault.org/about/" />
      </Head>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 pt-20 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white">
          About Univault Technologies
        </h1>
        <p className="mt-6 text-xl md:text-2xl text-neutral-600 dark:text-neutral-300">
          Built on one conviction: AI you can rely on must know when it
          can&apos;t answer.
        </p>
      </section>

      {/* Who we are */}
      <section className="max-w-3xl mx-auto px-4 py-10">
        <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
          Univault Technologies LLC is an AI research company in Salt Lake
          City, Utah, founded in 2024 by Philip Phuong Tran (CEO) and Anh T Do,
          PhD (Research Director). Behind it are fifteen years of building
          distributed systems, a Master&apos;s in mathematics and statistics,
          eight years of teaching statistics and research methods &mdash; and a
          conclusion that took all of that to earn: the hard problem in
          applied AI is not making models answer. It is knowing when an answer
          deserves to be trusted.
        </p>
      </section>

      {/* Why we exist */}
      <section className="max-w-3xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
          Why we exist
        </h2>
        <p className="mt-6 text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
          Today&apos;s AI tools fail real work in the worst way: not by being
          wrong, but by being wrong <em>with confidence</em>. A finance record
          that says &quot;probably&quot; is not a record. A hiring judgment
          that guesses about a person is not a judgment. Most of the industry
          answers this with bigger models. We answer it with measurement:
          infrastructure that evaluates its own answers, refuses the ones it
          cannot stand behind, and brings a person in &mdash; while the
          automation keeps running.
        </p>
      </section>

      {/* What we do */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-center text-neutral-900 dark:text-neutral-100">
          What we do
        </h2>
        <div className="mt-10 grid md:grid-cols-3 gap-8">
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 p-6">
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
              Run the infrastructure
            </h3>
            <p className="mt-3 text-neutral-600 dark:text-neutral-300 leading-relaxed">
              A multi-model inference platform for AI agent workloads,
              operated in production for a paying customer &mdash; with
              evaluation gates deciding what serves traffic, metered cost
              governance, and an auditable record of every request.
            </p>
          </div>
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 p-6">
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
              Ship it into real work
            </h3>
            <p className="mt-3 text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Releases for the work where confident wrong answers cost the
              most &mdash; expenses and hiring &mdash; each carrying the same
              rule: when the system is not sure, it asks a person instead of
              guessing.
            </p>
          </div>
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 p-6">
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
              Help teams first
            </h3>
            <p className="mt-3 text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Before anything is sold, we map where this class of AI holds up
              in a team&apos;s work and where it fails quietly. A small number
              of engagements at a time, and you keep the map either way.
            </p>
          </div>
        </div>
      </section>

      {/* Track record */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-center text-neutral-900 dark:text-neutral-100">
          The record behind it
        </h2>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 rounded-xl border border-neutral-200 dark:border-neutral-700">
            <p className="text-2xl font-bold text-primary-500">22 + 1</p>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              22 patent-pending US filings (2026) spanning multi-model
              inference, autonomous-systems safety, federated learning and ML
              fairness &mdash; and a granted US patent (2016).
            </p>
          </div>
          <div className="text-center p-6 rounded-xl border border-neutral-200 dark:border-neutral-700">
            <p className="text-2xl font-bold text-primary-500">42 / 42</p>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Privacy-preserving encoding research independently re-verified,
              42 of 42 checks passing at a different random seed.
            </p>
          </div>
          <div className="text-center p-6 rounded-xl border border-neutral-200 dark:border-neutral-700">
            <p className="text-2xl font-bold text-primary-500">Federal</p>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              A Department of Transportation SBIR Phase I proposal under
              evaluation, built on public data with the evaluation discipline
              we apply to our own work.
            </p>
          </div>
        </div>
        <p className="mt-8 text-center text-neutral-500 dark:text-neutral-400">
          Every claim on this site is audited against our own evaluation
          record before it is published &mdash; including the ones we had to
          retire.
        </p>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 py-14 text-center">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
          Talk to us
        </h2>
        <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
          If your team runs work where a confident wrong answer costs real
          money &mdash; or real trust &mdash; we should talk.
        </p>
        <div className="mt-8">
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors"
          >
            Contact us <BiRightArrowAlt className="text-xl" />
          </Link>
        </div>
      </section>
    </>
  );
}
