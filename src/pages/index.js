import { useState } from "react";
import Head from "next/head";
import {
  BiServer,
  BiReceipt,
  BiUserCheck,
  BiRightArrowAlt,
} from "react-icons/bi";

const CONTACT_ENDPOINT =
  "https://paragon-inbox-worker.amitacompany.workers.dev/contact/univault";

const releases = [
  {
    icon: BiServer,
    name: "Inference Gateway",
    what: "A production gateway for AI agent workloads, operated under live traffic for a paying customer.",
    honest:
      "When it is not sure enough to stand behind an answer, it refuses and says so explicitly — a signal an integrating team cannot silently ignore.",
    status: "In production",
  },
  {
    icon: BiReceipt,
    name: "Expenses",
    what: "Say one sentence about a purchase. It comes back as a determined, filed, defensible record, checked against your own policy.",
    honest:
      "When it is not sure which clause applies, it asks a person instead of guessing. A finance record that says \"probably\" is not a record.",
    status: "Early access, by invitation",
  },
  {
    icon: BiUserCheck,
    name: "Roles",
    what: "Hiring claims checked against evidence, clause by clause, before anyone acts on them.",
    honest:
      "\"Cannot tell\" is a first-class answer. The system would rather admit silence in the evidence than manufacture a judgment about a person.",
    status: "Early access, by invitation",
  },
];

export default function Home() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "", website: "" });
  const [formState, setFormState] = useState("idle"); // idle | sending | sent | error

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormState("sending");
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error("failed");
      setFormState("sent");
    } catch {
      setFormState("error");
    }
  };

  return (
    <>
      <Head>
        <title>Univault Technologies | AI that admits what it doesn&apos;t know</title>
        <meta
          name="description"
          content="Univault Technologies is an AI research company in Salt Lake City, Utah. We build AI infrastructure that asks instead of guesses, and help teams apply it to work where 'probably' isn't good enough."
        />
        <meta property="og:title" content="Univault Technologies | AI that admits what it doesn't know" />
        <meta
          property="og:description"
          content="AI infrastructure that asks instead of guesses. Built in Utah, applied help-first to finance, hiring, and operations."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Univault Technologies LLC",
              url: "https://univault.org",
              email: "phil@univault.org",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Salt Lake City",
                addressRegion: "UT",
                addressCountry: "US",
              },
              description:
                "AI research company building infrastructure that admits what it doesn't know, and helping teams apply it to real work.",
            }),
          }}
        />
      </Head>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 pt-20 pb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 dark:text-white leading-tight">
          AI that admits what it{" "}
          <span className="text-primary-500">doesn&apos;t know.</span>
        </h1>
        <p className="mt-8 text-lg md:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed text-left md:text-center">
          Univault Technologies is an AI research company in Salt Lake City,
          Utah. We have spent years on the failure that matters most in real
          work: AI that is wrong <em>with confidence</em>. What came out of that
          work is infrastructure that asks instead of guesses &mdash; and we
          help teams put it to work where &quot;probably&quot; isn&apos;t good
          enough: finance, hiring, operations.
        </p>
        <div className="mt-10">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors"
          >
            Talk to us <BiRightArrowAlt className="text-xl" />
          </a>
        </div>
      </section>

      {/* Three releases */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white text-center">
          Three releases, one principle
        </h2>
        <p className="mt-4 text-center text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Everything we ship carries the same discipline: when the system is not
          sure, it says so &mdash; to a person, before anyone relies on the
          answer.
        </p>
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {releases.map((r) => (
            <div
              key={r.name}
              className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800/50 p-6 flex flex-col"
            >
              <r.icon className="text-3xl text-primary-500" />
              <h3 className="mt-4 text-xl font-semibold text-neutral-900 dark:text-white">
                {r.name}
              </h3>
              <p className="mt-3 text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {r.what}
              </p>
              <p className="mt-3 text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {r.honest}
              </p>
              <p className="mt-auto pt-4 text-sm font-medium text-primary-500">
                {r.status}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How we work + contact form */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50 p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">
            How we work: help first
          </h2>
          <p className="mt-4 text-neutral-600 dark:text-neutral-300 leading-relaxed">
            Before anything is sold, we sit with your team and map where this
            class of AI genuinely holds up in your work &mdash; and where it
            fails quietly. You leave with that map either way. We take on a
            small number of these engagements at a time.
          </p>
          <p className="mt-4 text-neutral-600 dark:text-neutral-300 leading-relaxed">
            If your team runs work where a confident wrong answer costs real
            money &mdash; or real trust &mdash; we should talk.
          </p>
          <div id="contact" className="mt-10 scroll-mt-24">
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
              Talk to us
            </h3>
            {formState === "sent" ? (
              <div
                role="status"
                className="rounded-lg border border-primary-500/40 bg-primary-500/5 p-6 text-neutral-700 dark:text-neutral-200"
              >
                Got it &mdash; your message went through. When we reply, it
                will come from phil@univault.org.
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={onChange}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />
                <input
                  type="text"
                  name="name"
                  required
                  maxLength={120}
                  placeholder="Your name"
                  aria-label="Your name"
                  value={form.name}
                  onChange={onChange}
                  className="rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-4 py-3 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-primary-500"
                />
                <input
                  type="email"
                  name="email"
                  required
                  maxLength={254}
                  placeholder="Email"
                  aria-label="Email"
                  value={form.email}
                  onChange={onChange}
                  className="rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-4 py-3 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-primary-500"
                />
                <input
                  type="text"
                  name="company"
                  maxLength={160}
                  placeholder="Company (optional)"
                  aria-label="Company (optional)"
                  value={form.company}
                  onChange={onChange}
                  className="md:col-span-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-4 py-3 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-primary-500"
                />
                <textarea
                  name="message"
                  required
                  maxLength={4000}
                  rows={4}
                  placeholder="Where does a confident wrong answer cost you? Tell us about the work."
                  aria-label="Where does a confident wrong answer cost you? Tell us about the work."
                  value={form.message}
                  onChange={onChange}
                  className="md:col-span-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-4 py-3 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-primary-500"
                />
                <div className="md:col-span-2 flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={formState === "sending"}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-500 hover:bg-primary-600 disabled:opacity-60 text-white font-medium transition-colors"
                  >
                    {formState === "sending" ? "Sending..." : "Send"}
                    <BiRightArrowAlt className="text-xl" />
                  </button>
                  {formState === "error" && (
                    <p role="alert" className="text-sm text-red-500">
                      Your message didn&apos;t send &mdash; email us directly at{" "}
                      <a href="mailto:phil@univault.org" className="underline">
                        phil@univault.org
                      </a>
                      .
                    </p>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Bees — partner access */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="rounded-xl border-2 border-primary-500/40 bg-primary-500/5 p-8 md:p-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-500">
            Now open to selected partners
          </p>
          <h2 className="mt-2 text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">
            The gateway has a name: Bees
          </h2>
          <p className="mt-4 text-neutral-600 dark:text-neutral-300 leading-relaxed">
            We have run Bees for a while &mdash; behind our own releases, and
            behind our first paying customer. It runs the routine parts of an
            agent&apos;s work on a hive of small models, and calls in the
            frontier only when the work demands it. For teams whose automation
            is hungry for tokens, that is real money on the line &mdash; and
            every request is metered, so the savings are yours to verify, not
            ours to claim.
          </p>
          <p className="mt-4 text-neutral-600 dark:text-neutral-300 leading-relaxed">
            The field is arriving at the same conclusion from the opposite
            direction: specialists beat one generalist. The difference is where
            the specialists live. Others keep theirs inside one building. We
            think they belong spread out &mdash; because the future of
            automation is not just cheaper tokens. It is accountability: AI
            that knows its limits, keeps an auditable record of every request,
            and brings a person in while the automation keeps running.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="https://bees.riif.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors"
            >
              Request access at bees.riif.com <BiRightArrowAlt className="text-xl" />
            </a>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              Access is by invitation; the{" "}
              <a href="#contact" className="text-primary-500 hover:text-primary-600">
                contact form
              </a>{" "}
              works too.
            </span>
          </div>
        </div>
      </section>

      {/* Selected research results */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white text-center">
          The research underneath
        </h2>
        <p className="mt-4 text-center text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Measurement research backs every release above. A few results, each
          one audited against our own evaluation discipline before it was
          allowed on this page:
        </p>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 p-6">
            <p className="text-2xl font-bold text-primary-500">26.86 &micro;s</p>
            <p className="mt-2 font-semibold text-neutral-900 dark:text-white">
              Real-time reflex perception
            </p>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Constant-time perception query at p50, measured over 10,000
              queries on NVIDIA Jetson embedded hardware, in a fixed-size store
              that does not grow with what it learns.
            </p>
          </div>
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 p-6">
            <p className="text-2xl font-bold text-primary-500">0 bits changed</p>
            <p className="mt-2 font-semibold text-neutral-900 dark:text-white">
              Certification-preserving field learning
            </p>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              The SHA-256 digest of a certified 941,316-parameter model,
              unchanged after 1,000 field enrollments while the learned pattern
              store changed at every one &mdash; verifiable by the operator
              with standard tooling.
            </p>
          </div>
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 p-6">
            <p className="text-2xl font-bold text-primary-500">42 / 42 checks</p>
            <p className="mt-2 font-semibold text-neutral-900 dark:text-white">
              De-identification, independently re-verified
            </p>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Encodings not invertible to the person: speaker identification at
              0.00 percent against 1,306 speakers, genomic identification
              exactly at chance &mdash; re-verified end to end at a different
              seed.
            </p>
          </div>
        </div>
        <p className="mt-8 text-center">
          <a
            href="/research"
            className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 font-medium"
          >
            More in Research <BiRightArrowAlt className="text-xl" />
          </a>
        </p>
      </section>
    </>
  );
}
