import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { getMDXContent } from "@/lib/api";
import {
  BiChip,
  BiTestTube,
  BiCloud,
  BiShield,
  BiLock,
  BiFile,
  BiBroadcast,
  BiAtom,
  BiLinkExternal,
} from "react-icons/bi";

export default function Research({ researchContent }) {
  const researchAreas = [
    {
      category: "Reliable AI & Measurement Research",
      items: [
        {
          title: "Real-Time Reflex Perception",
          description: "A constant-time perception layer for embodied systems: query measured at 26.86 microsecond p50 over 10,000 queries on NVIDIA Jetson embedded hardware, in a fixed-size store that does not grow with what it learns.",
          icon: <BiChip className="text-3xl" />,
          link: "#reflex",
        },
        {
          title: "Certification-Preserving Field Learning",
          description: "Learning in the field without touching the certified artifact: the SHA-256 digest of a 941,316-parameter certified model unchanged after 1,000 field enrollments, verifiable by the operator with standard tooling.",
          icon: <BiTestTube className="text-3xl" />,
          link: "#certified-learning",
        },
        {
          title: "Provable De-Identification",
          description: "Encodings whose transmitted payload is not invertible to the person: speaker identification at 0.00 percent against 1,306 speakers, genomic identification exactly at chance against 2,504 individuals \u2014 independently re-verified, 42 of 42 checks.",
          icon: <BiLock className="text-3xl" />,
          link: "#deidentification",
        },
        {
          title: "Evaluation Integrity",
          description: "The discipline under everything we ship: leakage-controlled splits, permutation controls, published null results, and a dated register of retired claims \u2014 run against our own work first.",
          icon: <BiShield className="text-3xl" />,
          link: "#evaluation",
        },
      ]
    },
    {
      category: "Earlier and exploratory work",
      items: [
        {
          title: "Personal AI Systems",
          description: "Research on AI systems that understand individuals personally while maintaining data sovereignty and privacy",
          icon: <BiShield className="text-3xl" />,
          link: "#personal-ai",
        },
        {
          title: "Privacy Architecture",
          description: "Developing robust privacy-preserving systems for personal data management",
          icon: <BiLock className="text-3xl" />,
          link: "#privacy",
        },
        {
          title: "Data Standards",
          description: "Creating universal data interchange formats for personal data sovereignty",
          icon: <BiFile className="text-3xl" />,
          link: "#data-standards",
        },
        {
          title: "Satellite Data Protocol (SRPT)",
          description: "Developing SRPT protocol for efficient global transfer of large AI models and datasets via satellite networks",
          icon: <BiBroadcast className="text-3xl" />,
          link: "https://github.com/univault-org/srpt-protocol",
          external: true,
        },
        {
          title: "Quantum-Safe Privacy",
          description: "Developing post-quantum cryptographic solutions to ensure long-term data protection",
          icon: <BiAtom className="text-3xl" />,
          link: "#quantum-safe",
        },
      ]
    }
  ];

  return (
    <>
      <Head>
        <title>Research | Univault Technologies</title>
        <meta name="description" content="Reliable AI and measurement research: real-time reflex perception, certification-preserving field learning, provable de-identification, and evaluation integrity." />
        <meta property="og:title" content="Research | Univault Technologies" />
        <meta property="og:description" content="Reliable AI and measurement research: real-time reflex perception, certification-preserving field learning, provable de-identification, and evaluation integrity." />
        <meta property="og:url" content="https://univault.org/research/" />
      </Head>

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-neutral-800 to-neutral-600 dark:from-neutral-100 dark:to-neutral-300">
            Research Areas
          </h1>
          <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
            We research, develop, and publish across reliable AI, measurement, data sovereignty, and secure protocols &mdash; and we run every claim against our own evaluation discipline first.
          </p>
        </div>
      </section>

      {/* Research Areas */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        {researchAreas.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-neutral-800 dark:text-neutral-100">
              {category.category}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((area, index) => {
                const content = (
                  <div
                    className="p-6 rounded-xl dark:bg-neutral-800 
                      shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]
                      dark:shadow-[0_2px_15px_-3px_rgba(0,0,0,0.2)] 
                      border-2 border-neutral-200 dark:border-neutral-700
                      hover:border-primary-500 dark:hover:border-primary-500
                      transition-all duration-300 h-full flex flex-col"
                  >
                    <div
                      className="w-16 h-16 mb-4 text-primary-500 
                      flex items-center justify-center 
                      bg-white dark:bg-neutral-700 
                      rounded-full 
                      shadow-md"
                    >
                      {area.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-neutral-800 dark:text-neutral-100 flex items-center">
                      {area.title}
                      {area.external && (
                        <BiLinkExternal className="ml-2 text-sm" />
                      )}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed flex-grow">
                      {area.description}
                    </p>
                  </div>
                );

                if (area.external) {
                  return (
                    <a
                      key={index}
                      href={area.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      {content}
                    </a>
                  );
                }

                return (
                  <div key={index}>
                    {content}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {/* Publications Section */}
      <section className="max-w-4xl mx-auto px-4 py-16 bg-neutral-50 dark:bg-neutral-900 rounded-2xl">
        <h2 className="text-3xl font-bold mb-8 text-center text-neutral-800 dark:text-neutral-100">
          Findings
        </h2>
        <div className="space-y-6">
          <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
            <h3 className="text-xl font-semibold mb-2 text-neutral-800 dark:text-neutral-100">
              A controlled null result, submitted on purpose
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              Prepared for submission to Stanford Precision Mental Health 2026: a stress
              detector whose accuracy does not beat its majority baseline, with
              a permutation control in which 60 percent of label-shuffled runs
              matched or beat the observed effect &mdash; and a worked demonstration
              that single-split evaluation of the same data manufactures a
              spurious 4.9 point gain. Publishing what does not work, with the
              method that proves it, is the same discipline we sell.
            </p>
          </div>
          <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-neutral-200 dark:border-neutral-700">
            <h3 className="text-xl font-semibold mb-2 text-neutral-800 dark:text-neutral-100">
              Independently re-verified de-identification
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              Our privacy-preserving encoding work was re-verified at a
              different random seed by an independent check suite: 42 of 42
              checks passed, including recomputing the transform from raw
              genotype files to a maximum difference of zero.
            </p>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4 text-neutral-800 dark:text-neutral-100">
          Collaborate With Us
        </h2>
        <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8">
          If your team runs work where a confident wrong answer costs real
          money, we should talk.
        </p>
        <a
          href="/#contact"
          className="inline-flex items-center px-6 py-3 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors"
        >
          Talk to us
        </a>
      </section>
    </>
  );
}

export async function getStaticProps() {
  try {
    const researchContent = await getMDXContent("pages/research.md").catch(() => null);

    return {
      props: {
        researchContent: researchContent || null,
      },
    };
  } catch (error) {
    console.error("Error loading research content:", error);
    return {
      props: {
        researchContent: null,
      },
    };
  }
}
