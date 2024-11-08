import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { getMDXContent } from "../lib/api";
import {
  BiLayer, // For organization - stacked layers
  BiGift, // For legacy/inheritance - gift/passing on
  BiShield, // For data protection/sovereignty
} from "react-icons/bi";

export default function Home({ content, metadata }) {
  const services = [
    {
      title: "Digital Organization",
      description:
        "Experience our 'Joyganize' approach to digital life. Transform how you manage files and memories with intuitive tools that make digital organization both enjoyable and efficient.",
      icon: <BiLayer className="text-3xl" />,
    },
    {
      title: "DA Legacy Planning",
      description:
        "Plan your Digital Asset (DA) future with eBequest. Our dedicated service helps preserve, protect, and pass on your digital assets to chosen inheritors, ensuring your digital legacy endures meaningfully.",
      icon: <BiGift className="text-3xl" />,
    },
    {
      title: "AI Data Sovereignty",
      description:
        "Stay in control of your digital identity. Our technology enables AI to learn and serve you better while keeping your data private and sovereign, creating truly personalized experiences.",
      icon: <BiShield className="text-3xl" />,
    },
  ];

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[500px] -mt-8 mb-16 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        </div>
        <div className="relative h-full max-w-4xl mx-auto px-4">
          <div className="h-full flex flex-col justify-center items-center text-center">
            <div className="space-y-6 max-w-3xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-800 to-neutral-600 dark:from-neutral-100 dark:to-neutral-300">
                {metadata.headline}
              </h1>
              <p className="text-2xl md:text-3xl text-neutral-600 dark:text-neutral-300">
                {metadata.subheadline}
              </p>
              <div className="flex gap-4 justify-center pt-4">
                <Link
                  href="/research"
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors"
                >
                  Explore Research
                  <i className="bi bi-arrow-right ml-2"></i>
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-100 font-medium transition-colors"
                >
                  Learn More
                  <i className="bi bi-info-circle ml-2"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-4 text-neutral-800 dark:text-neutral-100">
          Empowering Digital Lives
        </h2>
        <p className="text-center mb-12 text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          We provide comprehensive solutions for managing your digital presence,
          from daily organization to long-term legacy planning.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="text-center p-8 rounded-lg bg-white dark:bg-neutral-800 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-16 h-16 mx-auto mb-6 text-primary-500 flex items-center justify-center bg-primary-50 dark:bg-neutral-700 rounded-full">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-neutral-800 dark:text-neutral-100">
                {service.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Vision Section */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="rounded-lg bg-white dark:bg-neutral-800 shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-8 text-neutral-800 dark:text-neutral-100">
            Our Vision
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {content.vision.map((item, index) => (
              <div
                key={`vision-${index}`}
                className="flex items-start space-x-3"
              >
                <span className="text-primary-500">✨</span>
                <span className="text-neutral-600 dark:text-neutral-400">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-neutral-800 dark:text-neutral-100">
          Research Focus
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {content.research.map((area) => (
            <div
              key={area.title}
              className="text-center p-6 rounded-lg bg-white dark:bg-neutral-800 shadow-sm"
            >
              <div className="w-12 h-12 mx-auto mb-4 text-primary-500 flex items-center justify-center">
                {area.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-neutral-800 dark:text-neutral-100">
                {area.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                {area.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const { content, metadata } = await getMDXContent("home.md");
  return {
    props: { content, metadata },
  };
}
