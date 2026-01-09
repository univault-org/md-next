import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { getMDXContent } from "@/lib/api";
import {
  BiLayer, // For organization - stacked layers
  BiGift, // For legacy/inheritance - gift/passing on
  BiShield, // For data protection/sovereignty
  BiAtom,        // For quantum computing
  BiSignal5,       // For AI/ML
  BiFingerprint,
  BiLinkExternal,
  BiChip, // For AI/brain
  BiTestTube, // For research/GLE
  BiCloud, // For breathing
  BiLock,
  BiFile, // For documents
  BiBroadcast // For satellite/communication
} from "react-icons/bi";

export default function Home({ content, metadata }) {
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
  const researchAreas = [
    {
      category: "Consciousness & AI Research",
      items: [
        {
          title: "Complete AI Architecture",
          description: "Dual-brain system (GPT + Harmonic Frequency - HF Models + Adapter) enabling consciousness-aware AI that understands brain signals directly",
          icon: <BiChip className="text-3xl" />,
        },
        {
          title: "General Learning Encoder (GLE)",
          description: "Pre-trained foundation model for frequency-domain processing, enabling subject-invariant EEG intelligence across multiple applications",
          icon: <BiTestTube className="text-3xl" />,
        },
        {
          title: "Breathing Authentication",
          description: "Research on breathing-based biometric identification with 96.8% accuracy, published in Current Biology (2025)",
          icon: <BiCloud className="text-3xl" />,
        },
      ]
    },
    {
      category: "Data Sovereignty Research",
      items: [
        {
          title: "Personal AI Systems",
          description: "Research on AI systems that understand individuals personally while maintaining data sovereignty and privacy",
          icon: <BiShield className="text-3xl" />,
        },
        {
          title: "Privacy Architecture",
          description: "Developing robust privacy-preserving systems for personal data management",
          icon: <BiLock className="text-3xl" />,
        },
        {
          title: "Data Standards",
          description: "Creating universal data interchange formats for personal data sovereignty",
          icon: <BiFile className="text-3xl" />,
        },
      ]
    },
    {
      category: "Protocol & Security Research",
      items: [
        {
          title: "Satellite Data Protocol (SRPT)",
          description: "Developing SRPT protocol for efficient global transfer of large AI models and datasets via satellite networks",
          icon: <BiBroadcast className="text-3xl" />,
        },
        {
          title: "Quantum-Safe Privacy",
          description: "Developing post-quantum cryptographic solutions to ensure long-term data protection",
          icon: <BiAtom className="text-3xl" />,
        },
      ]
    }
  ];

  const applications = [
    {
      title: "Bagle.com",
      description: "Hardware-to-AI transformation platform powered by GLE. Transform your devices into complete AI infrastructure.",
      url: "https://bagle.com",
      icon: <BiTestTube className="text-3xl" />,
    },
    {
      title: "MirrorAI",
      description: "Complete AI applications enabling consciousness-aware AI for mental coaching and personal development.",
      url: "#",
      icon: <BiChip className="text-3xl" />,
    },
    {
      title: "RIIF",
      description: "Audio player platform for personalized content delivery powered by consciousness-aware AI.",
      url: "#",
        icon: <BiSignal5 className="text-3xl" />,
      },
  ];


  // Add null checks for content
  const visionItems = content?.vision || [];
//   const researchAreas = content?.research || [];
  const pageMetadata = {
    headline: metadata?.headline || "Univault Research Lab",
    subheadline:
      metadata?.subheadline || "Advancing Personal Data Sovereignty & Consciousness-Aware AI",
    title: metadata?.title || "Univault Research Lab - Advancing Personal Data Sovereignty & Consciousness-Aware AI",
    description:
      metadata?.description ||
      "Research lab developing technologies across multiple domains: consciousness research, data sovereignty, hardware-to-AI transformation, and secure protocols",
  };

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
                {pageMetadata.headline}
              </h1>
              <p className="text-2xl md:text-2xl text-neutral-600 dark:text-neutral-300">
                {pageMetadata.subheadline}
              </p>
              <div className="flex gap-4 justify-center pt-4">
                <Link
                  href="/research"
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors"
                >
                  Explore Research
                  <i className="bi bi-arrow-right ml-2"></i>
                </Link>
                <button
                  onClick={() => setShowDemoForm(true)}
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-100 font-medium transition-colors"
                >
                  Request Demo
                  <i className="bi bi-info-circle ml-2"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Videos Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-4 text-neutral-800 dark:text-neutral-100">
          Research Demonstrations
        </h2>
        <p className="text-center mb-12 text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
          Watch our latest research findings and technology demonstrations
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
                Breathing Authentication Research
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                Revolutionary research from Current Biology (2025) reveals that breathing patterns are unique biometric identifiers—more accurate than voice recognition and perfectly suited for wearable devices.
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-500">
                <strong>Key Finding:</strong> 96.8% identification accuracy across 97 participants using nasal airflow patterns alone.
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
                GLE Technology Overview
              </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              General Learning Encoder (GLE) serves as the foundation for subject-invariant pattern recognition, enabling models to work on new users immediately without calibration.
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-500">
              <strong>Key Finding:</strong> Verified against competition benchmarks: 27.5% better performance than winning solution on subject-invariant mental health prediction tasks.
            </p>
            </div>
          </div>
        </div>
      </section>

      {/* Research Areas Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-4 text-neutral-800 dark:text-neutral-100">
          Our Research Areas
        </h2>
        <p className="text-center mb-12 text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
          We research, develop, and publish technologies across multiple domains
        </p>
        
        {researchAreas.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-12">
            <h3 className="text-2xl font-semibold mb-6 text-neutral-700 dark:text-neutral-300">
              {category.category}
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {category.items.map((area, index) => (
                <div
                  key={index}
                  className="text-center p-6 rounded-xl dark:bg-neutral-800 
                shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]
                dark:shadow-[0_2px_15px_-3px_rgba(0,0,0,0.2)] 
                border-2 border-neutral-200 dark:border-neutral-700
                hover:border-neutral-300 dark:hover:border-neutral-600
                transition-all duration-300"
            >
              <div
                    className="w-16 h-16 mx-auto mb-4 text-primary-500 
                    flex items-center justify-center 
                    bg-white dark:bg-neutral-700 
                    rounded-full 
                    shadow-md"
                  >
                    {area.icon}
                  </div>
                  <h4 className="text-lg font-semibold mb-2 text-neutral-800 dark:text-neutral-100">
                    {area.title}
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {area.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Applications Section */}
      <section className="max-w-5xl mx-auto px-4 py-16 bg-neutral-50 dark:bg-neutral-900 rounded-2xl">
        <h2 className="text-3xl font-bold text-center mb-4 text-neutral-800 dark:text-neutral-100">
          Applications of Our Research
        </h2>
        <p className="text-center mb-12 text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
          Our research leads to practical applications and platforms
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {applications.map((app) => (
            <a
              key={app.title}
              href={app.url}
              target={app.url.startsWith('http') ? "_blank" : undefined}
              rel={app.url.startsWith('http') ? "noopener noreferrer" : undefined}
              className="text-center p-6 rounded-xl dark:bg-neutral-800 
                shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]
                dark:shadow-[0_2px_15px_-3px_rgba(0,0,0,0.2)] 
                border-2 border-neutral-200 dark:border-neutral-700
                hover:border-primary-500 dark:hover:border-primary-500
                transition-all duration-300 cursor-pointer"
            >
              <div
                className="w-16 h-16 mx-auto mb-4 text-primary-500 
                flex items-center justify-center 
                bg-white dark:bg-neutral-700 
                rounded-full 
                shadow-md"
              >
                {app.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-neutral-800 dark:text-neutral-100">
                {app.title}
                {app.url.startsWith('http') && (
                  <BiLinkExternal className="inline-block ml-2 text-sm" />
                )}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {app.description}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* Vision Section */}
      {visionItems.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 py-16">
          <div className="rounded-lg bg-white dark:bg-neutral-800 shadow-sm p-8">
            <h2 className="text-2xl font-bold mb-8 text-neutral-800 dark:text-neutral-100">
              Our Vision
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {visionItems.map((item, index) => (
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
      )}

      {/* Demo Request Modal */}
      {showDemoForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
                  Request Demo
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

              {formSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100 mb-2">
                    Thank You!
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    We've received your demo request. Our team will review it and get back to you soon.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        company: '',
                        company_size: '',
                        message: ''
                      });
                    }}
                    className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
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
                      Company/Organization <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-neutral-300 dark:border-neutral-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-neutral-700 dark:text-white px-3 py-2 font-sans"
                      placeholder="Your company or organization"
                    />
                  </div>

                  <div>
                    <label htmlFor="company_size" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1 font-sans">
                      Company Size (optional)
                    </label>
                    <select
                      id="company_size"
                      name="company_size"
                      value={formData.company_size}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-neutral-300 dark:border-neutral-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-neutral-700 dark:text-white px-3 py-2 font-sans"
                    >
                      <option value="">Select company size (optional)</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-1000">201-1000 employees</option>
                      <option value="1000+">1000+ employees</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1 font-sans">
                      Message (optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-neutral-300 dark:border-neutral-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-neutral-700 dark:text-white px-3 py-2 font-sans"
                      placeholder="Tell us about your research interests or collaboration opportunities..."
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
                      {formLoading ? 'Submitting...' : 'Submit Request'}
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
    // or just 'home.md' depending on how getMDXContent is configured

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
