import { useState } from "react";
import Head from "next/head";
import { getMDXContent } from "@/lib/api";
import Link from "next/link";
import {
  BiTestTube,
  BiShield,
  BiLinkExternal,
  BiCheckCircle,
  BiBrain,
  BiGroup,
  BiDollar,
  BiRightArrowAlt,
} from "react-icons/bi";

export default function Home() {
  const [showDemoForm, setShowDemoForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    company_size: '',
    message: ''
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setFormError('');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError('');

    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://bagle-api.amitacompany.workers.dev';
      const response = await fetch(`${API_BASE_URL}/api/demo-requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'univault-org-homepage'
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit request');
      }

      setFormSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        company_size: '',
        message: ''
      });
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to submit request. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Univault Research Lab — The Tool and The Network for the Health Economy</title>
        <meta name="description" content="Univault builds BAGLE, the universal health signal encoder, and ParagonDAO, the governance network that validates health models. Your research becomes a product." />
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
                We Build the Tool and the Network for the Health Economy
              </h1>
              <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300">
                Any health signal in. 128 numbers out. Your model on the network.<br />
                Your research becomes a product.
              </p>
              <div className="flex gap-4 justify-center pt-4">
                <a
                  href="https://bagle.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors"
                >
                  See the Models
                  <BiLinkExternal className="ml-2" />
                </a>
                <a
                  href="https://paragondao.org/whitepaper"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-100 font-medium transition-colors"
                >
                  Read the Whitepaper
                  <BiLinkExternal className="ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Two Products Section */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-4 text-neutral-800 dark:text-neutral-100">
          Two Products. One Mission.
        </h2>
        <p className="text-center mb-12 text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
          The tool without governance is dangerous — unvalidated health models loose in the world.
          The governance without the tool is just a committee with nothing to govern.
          We built both.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* BAGLE Card */}
          <a
            href="https://bagle.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 rounded-xl bg-white dark:bg-neutral-800
              shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]
              dark:shadow-[0_2px_15px_-3px_rgba(0,0,0,0.2)]
              border-2 border-neutral-200 dark:border-neutral-700
              hover:border-primary-500 dark:hover:border-primary-500
              transition-all duration-300 cursor-pointer"
          >
            <div className="w-16 h-16 mx-auto mb-6 text-primary-500 flex items-center justify-center bg-primary-50 dark:bg-neutral-700 rounded-full shadow-md">
              <BiTestTube className="text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-center mb-2 text-neutral-800 dark:text-neutral-100">
              BAGLE <BiLinkExternal className="inline-block ml-1 text-sm text-neutral-400" />
            </h3>
            <p className="text-center text-lg font-medium text-primary-600 dark:text-primary-400 mb-4">
              The Lab Equipment
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 text-center mb-6">
              The universal encoder. Send any health signal — breathing, heart rate, voice, EEG, biosensor output — and get back 128 numbers.
              Train a classifier on those numbers. That&apos;s your model.
            </p>
            <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
              <li className="flex items-start">
                <BiCheckCircle className="text-primary-500 mt-0.5 mr-2 flex-shrink-0" />
                6 published health models live now
              </li>
              <li className="flex items-start">
                <BiCheckCircle className="text-primary-500 mt-0.5 mr-2 flex-shrink-0" />
                27.5% better than competition benchmarks
              </li>
              <li className="flex items-start">
                <BiCheckCircle className="text-primary-500 mt-0.5 mr-2 flex-shrink-0" />
                API opens April 2026 — build Model #7
              </li>
            </ul>
          </a>

          {/* ParagonDAO Card */}
          <a
            href="https://paragondao.org"
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 rounded-xl bg-white dark:bg-neutral-800
              shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]
              dark:shadow-[0_2px_15px_-3px_rgba(0,0,0,0.2)]
              border-2 border-neutral-200 dark:border-neutral-700
              hover:border-primary-500 dark:hover:border-primary-500
              transition-all duration-300 cursor-pointer"
          >
            <div className="w-16 h-16 mx-auto mb-6 text-primary-500 flex items-center justify-center bg-primary-50 dark:bg-neutral-700 rounded-full shadow-md">
              <BiShield className="text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-center mb-2 text-neutral-800 dark:text-neutral-100">
              ParagonDAO <BiLinkExternal className="inline-block ml-1 text-sm text-neutral-400" />
            </h3>
            <p className="text-center text-lg font-medium text-primary-600 dark:text-primary-400 mb-4">
              The Peer Review Board
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 text-center mb-6">
              The governance network. Validates models before patients rely on them. Certifies builders.
              Ensures quality across every health application on the network.
            </p>
            <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
              <li className="flex items-start">
                <BiCheckCircle className="text-primary-500 mt-0.5 mr-2 flex-shrink-0" />
                Published whitepaper: The Health Economy
              </li>
              <li className="flex items-start">
                <BiCheckCircle className="text-primary-500 mt-0.5 mr-2 flex-shrink-0" />
                HF-Auth continuous security layer
              </li>
              <li className="flex items-start">
                <BiCheckCircle className="text-primary-500 mt-0.5 mr-2 flex-shrink-0" />
                10% network fee funds the mission — preventing loss of life
              </li>
            </ul>
          </a>
        </div>
      </section>

      {/* Published Models — Proof It Works */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-4 text-neutral-800 dark:text-neutral-100">
          Models Built on GLE
        </h2>
        <p className="text-center mb-12 text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
          Each model was built the same way: health signal in, 128 coefficients out, classifier trained. These are the first. Yours is next.
        </p>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            {
              title: "EEG Consciousness",
              accuracy: "97.65%",
              samples: "1,000+",
              desc: "Real-time consciousness state classification from brain signals",
              tags: ["Competition Benchmark", "Subject-Invariant"],
              color: "from-violet-500 to-purple-600",
              flagship: true,
            },
            {
              title: "Type 2 Diabetes",
              accuracy: "94.67%",
              samples: "300",
              desc: "Metabolomics-based screening using serum biomarkers",
              tags: ["LOOCV Gold Standard"],
              color: "from-blue-500 to-cyan-600",
            },
            {
              title: "Parkinson's & Alzheimer's",
              accuracy: "91.45%",
              samples: "1,751",
              desc: "Saliva-based Raman spectroscopy for neurodegenerative screening",
              tags: ["5-Fold CV"],
              color: "from-emerald-500 to-teal-600",
            },
            {
              title: "COVID-19 Detection",
              accuracy: "86.35%",
              samples: "4,200+",
              desc: "Real-time Raman-based detection from saliva. No reagents required",
              tags: ["Multi-Seed Ensemble"],
              color: "from-orange-500 to-red-600",
            },
            {
              title: "Breathing Patterns",
              accuracy: "88.97%",
              samples: "2,693",
              desc: "Audio-based breathing pattern classification with <0.5s latency",
              tags: ["Real-Time"],
              color: "from-sky-500 to-indigo-600",
            },
          ].map((model) => (
            <a
              key={model.title}
              href="https://bagle.com/resources/clinical-validation/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative p-5 rounded-xl bg-white dark:bg-neutral-800
                shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]
                dark:shadow-[0_2px_15px_-3px_rgba(0,0,0,0.2)]
                border border-neutral-200 dark:border-neutral-700
                hover:border-primary-500 dark:hover:border-primary-500
                hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              {model.flagship && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-xs font-bold px-2 py-0.5 rounded-full bg-primary-500 text-white whitespace-nowrap">
                  FLAGSHIP
                </span>
              )}
              <div className={`text-3xl font-bold text-center mb-1 bg-clip-text text-transparent bg-gradient-to-r ${model.color}`}>
                {model.accuracy}
              </div>
              <p className="text-xs text-center text-neutral-500 dark:text-neutral-500 mb-3">
                {model.samples} samples validated
              </p>
              <h4 className="font-semibold text-sm text-center mb-2 text-neutral-800 dark:text-neutral-100">
                {model.title}
              </h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center mb-3">
                {model.desc}
              </p>
              <div className="flex flex-wrap gap-1 justify-center">
                {model.tags.map((tag) => (
                  <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400">
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>

        <p className="text-center mt-8 text-neutral-500 dark:text-neutral-400">
          <a href="https://bagle.com/resources/clinical-validation/" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-600 font-medium">
            View full validation details on BAGLE <BiLinkExternal className="inline-block ml-1" />
          </a>
        </p>
      </section>

      {/* How It Works — Builder Journey */}
      <section className="max-w-5xl mx-auto px-4 py-16 bg-neutral-50 dark:bg-neutral-900 rounded-2xl">
        <h2 className="text-3xl font-bold text-center mb-4 text-neutral-800 dark:text-neutral-100">
          From Researcher to Founder
        </h2>
        <p className="text-center mb-12 text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
          You bring the biology and the data. We bring the math. You keep 90% of every classification.
        </p>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              step: "1",
              icon: <BiTestTube className="text-2xl" />,
              title: "Collect Signals",
              desc: "Breathing recordings, biosensor readings, voice samples, molecular data — whatever you study."
            },
            {
              step: "2",
              icon: <BiBrain className="text-2xl" />,
              title: "Encode",
              desc: "Send signals to BAGLE API. Get back 128 numbers per signal. The hard math is done."
            },
            {
              step: "3",
              icon: <BiGroup className="text-2xl" />,
              title: "Train & Validate",
              desc: "Train a classifier on those 128 numbers. ParagonDAO validates accuracy before patients rely on it."
            },
            {
              step: "4",
              icon: <BiDollar className="text-2xl" />,
              title: "Ship & Earn",
              desc: "Your model becomes a screening tool anyone can use. A patient breathes into their phone — your model answers."
            }
          ].map((item) => (
            <div key={item.step} className="text-center p-6 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
              <div className="w-10 h-10 mx-auto mb-3 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                {item.step}
              </div>
              <div className="w-12 h-12 mx-auto mb-3 text-primary-500 flex items-center justify-center">
                {item.icon}
              </div>
              <h4 className="font-semibold mb-2 text-neutral-800 dark:text-neutral-100">{item.title}</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Research Videos Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-4 text-neutral-800 dark:text-neutral-100">
          Research Behind the Encoder
        </h2>
        <p className="text-center mb-12 text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
          The General Learning Encoder (GLE) is a foundation model for frequency-domain health intelligence
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Video 1: Breathing Authentication */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg overflow-hidden border border-neutral-200 dark:border-neutral-700">
            <div className="aspect-video bg-neutral-900">
              <video
                className="w-full h-full"
                controls
                poster="/bagle-breathing-ai-video-cover-image.png"
              >
                <source src="/passive-authentication-quicktime.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-neutral-800 dark:text-neutral-100">
                Breathing as Biometric Identity
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                96.8% identification accuracy across 97 participants using nasal airflow patterns alone.
                The same encoder that classifies disease also verifies identity — zero additional power.
              </p>
            </div>
          </div>

          {/* Video 2: GLE Technology */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg overflow-hidden border border-neutral-200 dark:border-neutral-700">
            <div className="aspect-video bg-neutral-900">
              <video
                className="w-full h-full"
                controls
                poster="/bagle-breathing-ai-video-cover-image.png"
              >
                <source src="/breathing-first-personalization.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-neutral-800 dark:text-neutral-100">
                GLE: Universal Health Signal Encoder
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                27.5% better than competition-winning solutions on subject-invariant health prediction.
                Works on new users immediately — no calibration, no retraining.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Mission */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="rounded-xl bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-200 dark:border-primary-800 p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-neutral-800 dark:text-neutral-100">
            The Mission
          </h2>
          <p className="text-lg text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto mb-6">
            10% of all network fees fund one thing: <strong>preventing loss of life.</strong> 988 crisis detection, community health screening, free GLE access for crisis organizations.
            The tool without the mission is just technology. The mission without the tool is just hope.
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="https://bagle.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors"
            >
              Explore BAGLE
              <BiLinkExternal className="ml-2" />
            </a>
            <button
              onClick={() => setShowDemoForm(true)}
              className="inline-flex items-center px-6 py-3 rounded-lg bg-white dark:bg-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-100 font-medium transition-colors border border-neutral-300 dark:border-neutral-600"
            >
              Join the Founding Builder List
            </button>
          </div>
        </div>
      </section>

      {/* Latest Post */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <Link
          href="/updates/why-not-monopoly"
          className="block rounded-xl overflow-hidden bg-white dark:bg-neutral-800
            shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]
            dark:shadow-[0_2px_15px_-3px_rgba(0,0,0,0.2)]
            border border-neutral-200 dark:border-neutral-700
            hover:border-primary-500 dark:hover:border-primary-500
            hover:shadow-lg transition-all duration-300"
        >
          <div className="md:flex">
            <div className="md:w-1/3">
              <img
                src="/paragon-frog-breathing.gif"
                alt="Why Not Just Train All the Models Ourselves?"
                className="w-full h-48 md:h-full object-cover"
              />
            </div>
            <div className="p-6 md:w-2/3 flex flex-col justify-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary-500 mb-2">
                Latest Update
              </p>
              <h3 className="text-xl font-bold mb-2 text-neutral-800 dark:text-neutral-100">
                Why Not Just Train All the Models Ourselves?
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                The investment community and partners challenge us on why a health AI model verification network like ParagonDAO needs thousands of builders — why not just train every model ourselves and own the space? The answer reveals why the health economy must be a network, and why this architecture delivers more stable, compounding returns than the monopoly play.
              </p>
              <span className="inline-flex items-center text-sm font-medium text-primary-500 hover:text-primary-600">
                Read the full post <BiRightArrowAlt className="ml-1" />
              </span>
            </div>
          </div>
        </Link>
      </section>

      {/* Demo Request Modal */}
      {showDemoForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
                  Join the Founding Builder List
                </h2>
                <button
                  onClick={() => {
                    setShowDemoForm(false);
                    setFormSubmitted(false);
                    setFormError('');
                  }}
                  className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                The BAGLE API opens April 2026. Founding builders get early access, direct support, and their models featured on the network. Tell us what health signal you work with.
              </p>

              {formSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100 mb-2">
                    Welcome to the founding cohort.
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    We&apos;ll be in touch before the API opens. In the meantime, explore the 6 published models at bagle.com.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1 font-sans">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-neutral-300 dark:border-neutral-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-neutral-700 dark:text-white px-3 py-2 font-sans"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1 font-sans">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-neutral-300 dark:border-neutral-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-neutral-700 dark:text-white px-3 py-2 font-sans"
                      placeholder="you@company.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1 font-sans">
                      Organization <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-neutral-300 dark:border-neutral-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-neutral-700 dark:text-white px-3 py-2 font-sans"
                      placeholder="University, company, or lab"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1 font-sans">
                      What health signal do you work with? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-neutral-300 dark:border-neutral-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-neutral-700 dark:text-white px-3 py-2 font-sans"
                      placeholder="e.g., respiratory biosignals, voice biomarkers, EEG, molecular sensor data, cardiac signals..."
                    />
                  </div>

                  {formError && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
                      <p className="text-sm text-red-600 dark:text-red-400">{formError}</p>
                    </div>
                  )}

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowDemoForm(false);
                        setFormError('');
                      }}
                      className="flex-1 px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={formLoading}
                      className="flex-1 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {formLoading ? 'Submitting...' : 'Join Founding Builders'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </>
  );
}

export async function getStaticProps() {
  try {
    const { content, metadata } = await getMDXContent("pages/home.md");

    return {
      props: {
        content: content || null,
        metadata: metadata || {},
      },
    };
  } catch (error) {
    console.error("Error loading home content:", error);
    return {
      props: {
        content: null,
        metadata: {},
      },
    };
  }
}
