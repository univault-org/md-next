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
    name: "Reflex Dev Kit",
    href: "https://paragonreflex.com/kit",
    what: "Bring your own two Jetson boards and two cameras; we flash the reflex layer and ship to order. $449. A full kit with the boards is $999.",
    honest: "What it learns in the field never touches the part that decides. Verifiable by hash with standard tooling.",
    status: "Buy the Reflex Dev Kit",
  },
  {
    icon: BiReceipt,
    name: "Verdicts",
    href: "https://paragonreflex.com/verdict/",
    what: "Write a rule in plain English. It reads the rule back, then answers allowed, not allowed, or cannot tell, naming the missing fact. Every answer is a record you keep.",
    honest: "$25 for 2,500 verdicts. No subscription. Rules, not advice.",
    status: "Run one verdict free",
  },
  {
    icon: BiUserCheck,
    name: "Operator reads",
    href: "https://paragonreflex.com/uas",
    what: "For programs that fly or run machines under written rules: we read your manual, compile the rules that gate a mission, and show you the record.",
    honest: "Twenty minutes, no charge. Seats are invoiced, never carded. The pilot in command decides.",
    status: "Book a 20-minute operator read",
  },
  {
    icon: BiServer,
    name: "The proving ground (public)",
    href: "https://paragonreflex.com/verdict/desk/",
    what: "Our proving ground, in public: one famous trading rule a day, compiled and graded, one cent each. Nowhere are the rules stricter, the truth faster, or the cheating more visible than a trading desk.",
    honest: "We grade rule-keeping, never outcomes. No profit figure, ever.",
    status: "Watch the daily desk",
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
        <title>Univault Technologies LLC | Builders of Paragon Reflex, Salt Lake City, Utah</title>
        <meta
          name="description"
          content="Univault Technologies is an AI research company in Salt Lake City, Utah. We build AI infrastructure that asks instead of guesses, and help teams apply it to work where 'probably' isn't good enough."
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "Organization", "name": "Univault Technologies LLC", "legalName": "Univault Technologies LLC", "alternateName": "Univault", "url": "https://univault.org", "address": {"@type": "PostalAddress", "addressLocality": "Salt Lake City", "addressRegion": "UT", "addressCountry": "US"}, "founder": {"@type": "Person", "name": "Philip Luu-Phuong Tran"}, "brand": {"@type": "Brand", "name": "Paragon Reflex", "url": "https://paragonreflex.com"}, "sameAs": ["https://github.com/univault-org", "https://github.com/paragonreflex", "https://govtribe.com/vendors/univault-technologies-llc", "https://www.linkedin.com/in/philiptranp/"]}) }} />
      </Head>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 pt-20 pb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 dark:text-white leading-tight">
          Univault Technologies builds{" "}
          <span className="text-primary-500">Paragon Reflex.</span>
        </h1>
        <p className="mt-8 text-lg md:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed text-left md:text-center">
          Paragon Reflex is a reflex layer, a planning LLM and a decision record
          for robots and physical AI that must keep written rules. It holds when
          it cannot tell, names the missing fact, and writes every decision down.
          We prove the same discipline in public on a trading desk, where a
          broken rule shows the same day.
        </p>
        <p className="mt-4 text-base text-neutral-500 dark:text-neutral-400">
          Two founders. Salt Lake City, Utah. Univault Technologies LLC is the name on every receipt.
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

      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white text-center">
          What stands, measured
        </h2>
        <p className="mt-4 text-center text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Every number here comes from a committed script on pinned inputs and
          was rerun on 2026-09-03. These are robotics measurements. No trading
          number exists, and none is claimed.
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
              Field learning that does not move the model
            </p>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              The SHA-256 digest of the released 941,316-parameter model,
              unchanged after 1,000 field enrollments while the learned pattern
              store changed at every one &mdash; verifiable by the operator
              with standard tooling.
            </p>
          </div>
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 p-6">
            <p className="text-2xl font-bold text-primary-500">1 paying account</p>
            <p className="mt-2 font-semibold text-neutral-900 dark:text-white">
              Revenue is small and real
            </p>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              One paying account today, with checkout live for the kit and for
              verdicts. Univault Technologies LLC is the merchant of record; the
              ledger is available to a serious investor on request.
            </p>
          </div>
        </div>
        <p className="mt-8 text-center">
          <a
            href="/paragon-reflex/"
            className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 font-medium"
          >
            The entity page: who is behind Paragon Reflex <BiRightArrowAlt className="text-xl" />
          </a>
        </p>
      </section>

      {/* Three releases */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white text-center">
          What we sell, at <a href="https://paragonreflex.com" className="underline underline-offset-4 decoration-primary-500">paragonreflex.com</a>
        </h2>
        <p className="mt-4 text-center text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          One product line, four doors, and the Hive that answers behind every
          one of them. Every door keeps the same discipline: when the system
          cannot tell, it holds, names the missing fact, and writes it down.
          Partners can buy the Hive directly, per account, at{" "}
          <a href="https://hive.paragonreflex.com" className="underline underline-offset-2">hive.paragonreflex.com</a>.
          Univault Technologies LLC is the merchant of record on every receipt.
        </p>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                {r.href ? <a href={r.href} className="underline underline-offset-2">{r.status}</a> : r.status}
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
            Before anything is sold, we read your rules with you and show you
            the record. A builder runs one rule for free. An operator gets a
            twenty-minute read of their manual, no charge. A partner or investor
            gets the measured numbers and the files behind them, nothing more
            and nothing less.
          </p>
          <p className="mt-4 text-neutral-600 dark:text-neutral-300 leading-relaxed">
            If you build, fly, or run machines that must keep written rules,
            or you want to put capital behind the body that lets them, we
            should talk.
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

      {/* The Hive */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="rounded-xl border-2 border-primary-500/40 bg-primary-500/5 p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">
            The Hive answers behind every door
          </h2>
          <p className="mt-4 text-neutral-600 dark:text-neutral-300 leading-relaxed">
            The Hive is the answering layer inside Paragon Reflex: it runs the
            routine parts of an agent&apos;s work on a panel of small models and
            calls in a frontier model only when the work demands it. Every
            request is metered and recorded. Partners can buy it directly, per
            named account.
          </p>
          <p className="mt-4 text-neutral-600 dark:text-neutral-300 leading-relaxed">
            The bees are the local checkers that read an answer against your
            rules on a computer you trust. They never write the answer.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="https://hive.paragonreflex.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors"
            >
              The Hive, partner accounts <BiRightArrowAlt className="text-xl" />
            </a>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              Access is by named account; the{" "}
              <a href="#contact" className="text-primary-500 hover:text-primary-600">
                contact form
              </a>{" "}
              works too.
            </span>
          </div>
        </div>
      </section>

      {/* Selected research results */}
    </>
  );
}
