import Head from "next/head";
import Link from "next/link";

// The ENTITY page, not a sales page: resolves "who is behind Paragon Reflex?" for a buyer holding a receipt.
export default function ParagonReflexEntity() {
  return (
    <>
      <Head>
        <title>Paragon Reflex, a product line of Univault Technologies LLC</title>
        <meta
          name="description"
          content="Paragon Reflex is built and sold by Univault Technologies LLC, Salt Lake City, Utah. Univault Technologies is the merchant of record on every Paragon Reflex receipt."
        />
        <meta property="og:title" content="Paragon Reflex, a product line of Univault Technologies LLC" />
        <meta property="og:url" content="https://univault.org/paragon-reflex/" />
      </Head>

      <section className="max-w-3xl mx-auto px-4 pt-20 pb-10">
        <p className="text-sm font-semibold tracking-widest uppercase text-primary-500">Paragon Reflex</p>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white leading-tight">
          A product line of Univault Technologies LLC
        </h1>
        <p className="mt-6 text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
          Paragon Reflex is a reflex layer and a planning LLM for autonomous machines: drones, robots and
          agents that must keep written rules, hold when they cannot tell, and leave a record of every
          decision. It is built and sold by Univault Technologies LLC, an AI research company in Salt Lake
          City, Utah. It is not related to Paragon 28 or its R3FLEX orthopaedic products.
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">On your receipt</h2>
        <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
          Univault Technologies LLC is the merchant of record for every Paragon Reflex purchase: the dev kit,
          the prepaid verdicts, and any invoiced work. The name on your card statement and your receipt is
          ours: Univault Technologies LLC, 1416 S 500 E, Salt Lake City, UT 84105, UEI WJG2GXE99VM5. Questions
          about a charge go to phil@univault.org or to the support address on the receipt.
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Where the work lives</h2>
        <ul className="mt-4 space-y-3 text-lg text-neutral-600 dark:text-neutral-300">
          <li>Product site: <a href="https://paragonreflex.com" className="underline underline-offset-2">paragonreflex.com</a></li>
          <li>Code: <a href="https://github.com/paragonreflex" className="underline underline-offset-2">github.com/paragonreflex</a> and <a href="https://github.com/univault-org" className="underline underline-offset-2">github.com/univault-org</a></li>
          <li>Company: <Link href="/about/" className="underline underline-offset-2">About Univault Technologies</Link>, and the <a href="https://govtribe.com/vendors/univault-technologies-llc" className="underline underline-offset-2">federal vendor listing</a></li>
        </ul>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-8 pb-20">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">What is measured, on the record</h2>
        <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
          The deciding parameter set of the reflex is byte-identical after 1,000 real field enrollments,
          checked by SHA-256 and reproducible by anyone; a decision takes about 27 microseconds on an NVIDIA
          Jetson Orin Nano over 10,000 queries. These are robotics measurements. No trading number exists,
          and none is claimed anywhere.
        </p>
      </section>
    </>
  );
}
