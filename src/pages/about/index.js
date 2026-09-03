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
          City, Utah, founded in 2024. <a href="https://www.linkedin.com/in/philiptranp/" className="underline underline-offset-2">Philip Phuong Tran</a>,
          CEO, spent fifteen years building distributed systems. Anh T Do, PhD,
          Research Director, holds a Master&apos;s in mathematics and statistics
          and taught statistics and research methods for eight years. The
          conclusion both arrived at: the hard problem in applied AI is not
          making models answer. It is knowing when an answer deserves to be
          trusted, and holding when it does not.
        </p>
      </section>


      {/* Products and the merchant of record */}
      <section className="max-w-3xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
          What we sell, and whose name is on the receipt
        </h2>
        <p className="mt-6 text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
          Our commercial product line is{" "}
          <a href="https://paragonreflex.com" className="underline underline-offset-2">Paragon Reflex</a>:
          a reflex layer and a planning LLM for autonomous machines that keep written rules and record
          every decision. Univault Technologies LLC is the merchant of record for every Paragon Reflex
          purchase, so the name on your card statement and your receipt is ours. The product's code lives
          under the <a href="https://github.com/paragonreflex" className="underline underline-offset-2">paragonreflex</a> and{" "}
          <a href="https://github.com/univault-org" className="underline underline-offset-2">univault-org</a> GitHub
          organizations, and the company is a registered federal vendor (
          <a href="https://govtribe.com/vendors/univault-technologies-llc" className="underline underline-offset-2">SAM.gov, UEI WJG2GXE99VM5, mirrored on GovTribe</a>; no federal awards to date).
          See <Link href="/paragon-reflex/" className="underline underline-offset-2">the Paragon Reflex entity page</Link>.
        </p>
      </section>

      {/* Why we exist */}
      <section className="max-w-3xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
          Why we exist
        </h2>
        <p className="mt-6 text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
          Machines are handed ever-bigger brains and no body, so nothing can
          license them to act. The world licenses bodies, not brains. We build
          the body: a reflex that holds when a written rule says hold, a
          planning layer that reads the rules back and answers or names the
          missing fact, and a record of every decision that leaves with the
          owner. What the body learns in the field never touches the part that
          decides, and anyone can check that with a hash. We prove it in public
          on the one desk where rules are strictest, so that a robot, a builder
          and a trader can trust the same body.
        </p>
      </section>

      {/* What we do */}
      <section className="max-w-3xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
          What we do
        </h2>
        <p className="mt-6 text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
          One product line, sold at{" "}
          <a href="https://paragonreflex.com" className="underline underline-offset-2">paragonreflex.com</a>:
          the Reflex Dev Kit, prepaid verdicts, operator reads for programs that
          run machines under written rules, and the public desk where we grade one
          famous trading rule a day. We run our own internal tools on the same
          discipline. Before anything is sold, we read your rules with you and
          show you the record.
        </p>
      </section>

      {/* Track record */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-center text-neutral-900 dark:text-neutral-100">
          The record behind it
        </h2>
        <div className="mt-10 grid md:grid-cols-1 gap-6 max-w-xl mx-auto">
          <div className="text-center p-6 rounded-xl border border-neutral-200 dark:border-neutral-700">
            <p className="text-2xl font-bold text-primary-500">22 + 1</p>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              22 US patent filings in 2026, the load-bearing ones on the
              reflex layer, field learning that leaves the released model
              unchanged, and the decision record; application numbers on
              request under NDA. One granted US patent (2016).
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 py-14 text-center">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
          Talk to us
        </h2>
        <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
          If you build, fly or run machines that must keep written rules, we
          should talk.
        </p>
        <p className="mt-4 text-base text-neutral-600 dark:text-neutral-400">
          Philip Phuong Tran, CEO: phil@univault.org &middot; or book twenty minutes at{" "}
          <a href="https://paragonreflex.com/read" className="underline underline-offset-2">paragonreflex.com/read</a>.
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
